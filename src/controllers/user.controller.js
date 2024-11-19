const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

class UserController {
    async getToken(req, res){
        try {
            const authHeader = req.headers.authorization;

            if(!authHeader){
                return res.status(400).json({ error: 'Authorization header not found'});
            }

            const [basic, credentials] = authHeader.split(' ');

            if(basic !== 'Basic' || !credentials){
                return res.status(401).json({ error: 'Invalid auth format'});
            }

            const decodedCredentials = Buffer.from(credentials, 'base64').toString();

            const [nickname, password] = decodedCredentials.split(':');

            const user = await userModel.getUserByNickname(nickname);

            if(!user){
                return res.status(404).json({error: `user with nickname ${nickname} not found`})
            }   
            
            
            //ESTA ES LA LINEA QUE NO ANDA:
            //En javascript se usan los hashes asi $2b$ y no asi $2y$ si no la comparacion de contraseñas tira error usando bcrypt
            const validPassword = await bcrypt.compare(password, user.password);

            if(!validPassword){
                return res.status(400).json({ error: `Incorrect password`});
            }

            const token = jwt.sign({
                sub: user.id,
                nickname: user.nickname,
                role: 'admin',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 300
            }, JWT_SECRET);

            return res.json({ token: token });
        } catch (error) {
            return res.status(500).json({ error: 'could not create token' })
        }
    }
}

module.exports = new UserController();