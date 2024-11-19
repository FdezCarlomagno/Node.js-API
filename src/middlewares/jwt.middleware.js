const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

function jwt_middleware(req, res, next){
    const auth_header = req.headers.authorization;

    if(!auth_header){
        req.user = null;
        return next();
    }

    const [bearer, token] = auth_header.split(' ');

    if(bearer !== 'Bearer' || !token){
        req.user = null;
        return next();
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
    } catch (error) {
        req.user = null;
    }

 

    next();
}

module.exports = jwt_middleware;