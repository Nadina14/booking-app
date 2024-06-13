import jwt from "jsonwebtoken";

function checkAuth(req, res, next){
    const tokenJWT = req.cookies.tokenJWT;
    if (!tokenJWT) return res.status(401).send("You are not authenticated!");
    try {
        const payload = jwt.verify(tokenJWT, process.env.JWT_KEY);
        next();
    }catch (err){
        res.status(401).send("The token is not valid");
    };
};

export default checkAuth;