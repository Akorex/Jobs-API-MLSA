import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'
import { configDotenv } from 'dotenv';


configDotenv()
const { genSaltSync, hashSync, compareSync } = bcryptjs;
const {sign, verify} = jsonwebtoken
const jwt_secret = process.env.JWT_SECRET
const jwt_lifetime = process.env.jwt_lifetime




export const generateSecurePassword = (value) => {
    // salt
    // hash password based on salt

    const salt = genSaltSync(10)
    return hashSync(value, salt)
}

export const checkValidity = (value, otherValue) => {
    return compareSync(value, otherValue)
}



export const createAccessToken = (id) => {
    const token = sign({id}, jwt_secret, {expiresIn: jwt_lifetime})

    return token
}

export const isTokenValid = (token) => {
    return verify(token, jwt_secret)
}