const jwt = require('jsonwebtoken')
const secretKey = "MY_SECRET_KEY"

const createAuthorizationToken = (user) => jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: { email: user.email, id: user.userId }
}, secretKey);

const verifyToken = (req) => {
    try {

        const auth = req.headers.authorization
        const authToken = auth.split('Bearer ')[1]
        console.log(authToken)
        jwt.verify(authToken, secretKey)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}
module.exports = ({
    verifyToken, createAuthorizationToken
})