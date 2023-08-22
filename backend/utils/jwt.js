const jwt = require('jsonwebtoken')
const secretKey = "MY_SECRET_KEY"

const createAuthorizationToken = (user) => jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: { email: user.email, id: user.userId }
}, secretKey);

const verifyToken = (req) => {
    try {
        const auth = req.headers.authorization;
        if (auth) {
            const authToken = auth.split('Bearer ')[1];
            jwt.verify(authToken, secretKey);
            return true;
        } else {
            console.log("Authorization header missing");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = ({
    verifyToken, createAuthorizationToken
})