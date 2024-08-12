const jwt = require('jsonwebtoken');

const JWT_SECRET = "thisIsaJWTwebtoken1231"

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    }


}

module.exports = fetchuser;