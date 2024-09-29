import { StatusCodes } from "http-status-codes";
import User from "../models/auth.js";
import logger from "../utils/logger.js";
import { errorResponse, successResponse } from "../utils/responses.js";
import { generateSecurePassword } from "../utils/auth.js";
import { checkValidity, createAccessToken } from "../utils/auth.js";

export const registerAccount = async (req, res, next) => {
    try{
        logger.info(`START: Register Account Service`)

        const {firstName, lastName, email, username, password, gender} = req.body

        const existingUser = await User.findOne({email})

        if (existingUser){
            logger.info(`END: Register Account Service`)
            return errorResponse(res, StatusCodes.BAD_REQUEST, `User already exists. Log in instead`)
        }

        const newUser = await User.create({
            firstName, 
            lastName,
            email,
            username,
            password: generateSecurePassword(password),
            gender
        })

        const accessToken = createAccessToken(newUser._id)

        logger.info(`END: Register Account Service`)
        successResponse(res, StatusCodes.CREATED, `successfully created account`, {user:newUser, token:accessToken})


    }catch(error){
        console.log(error)
        next(error)
    }
}


export const loginAccount = async (req, res, next) => {
    try{
        logger.info(`START: Login Account Service`)


        const header = req.headers['authorization']
        console.log(header)
        const {username, password} = req.body

        if (!username || !password){
            return errorResponse(res, StatusCodes.BAD_REQUEST, `missing required auth parameters`)
        }

        const user = await User.findOne({username})

        if (!user){
            return errorResponse(res, StatusCodes.NOT_FOUND, `This account does not exist. Please signup instead`)
        }

        // check if password matches with stored password in database
        if (!checkValidity(password, user.password)){
            return errorResponse(res, StatusCodes.BAD_REQUEST, `You have entered a wrong username/password`)
        }

        const accessToken = createAccessToken(user._id)

        logger.info(`END: Login Account Service`)
        successResponse(res, StatusCodes.OK, `successfully logged in`, {user, token:accessToken})

    }catch(error){
        logger.error(error)
        next(error)
    }
}




//registeraccount
//loginaccount
//forgetpassword
//verifyaccount
//delete account
//change password
//