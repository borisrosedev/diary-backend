import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"
dotenv.config({
    path: path.resolve("../../.env")
})

export default (req, res, next) => {
    
    const { authorization } = req.headers

    if( !("authorization" in req.headers) ) {
        return res.status(403).json({ message: 'Restricted Access'})
    }

    console.log( req.headers )
    const token = authorization.split(" ")[1]
    const decodedToken = jwt.decode(token, process.env.TOKEN_KEY)
    const { email } = decodedToken
    if( !email ) {
        return res.status(403).json({ message: 'Restricted Access'})
    }

    req.auth = email
    next()


}