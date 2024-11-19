function authMiddleware(req, res, next){
    const user = req.headers.authorization;

    if(!user){
        return res.status(401).json({ error: "User not authorized" });
    }

    if(req.user.exp < Math.floor(Date.now() / 1000)){
        req.user = null;
    }

    req.user = user;
    next();
}

module.exports = authMiddleware;