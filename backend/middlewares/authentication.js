import ApiError from "./errorHandler/api-error.js"
import { isTokenValid } from "../utils/auth.js"

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers['authorization']


    if (!authHeader){
        return next(ApiError.badRequest('unauthorized'))
    }

    if (authHeader.startsWith('Bearer')){

        const token = authHeader.split(' ')[1]

        try{
            const payload = isTokenValid(token)
            req.user = {userId: payload.id}
            next()
        }catch(error){
            return next(ApiError.badRequest('Authentication failed'))
        }
    }else{
        return next(ApiError.badRequest('Invalid authorization header'))
    }
}

export default isLoggedIn
