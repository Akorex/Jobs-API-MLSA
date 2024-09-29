import Jobs from '../models/jobs.js'
import { successResponse, errorResponse } from '../utils/responses.js'
import {StatusCodes} from 'http-status-codes'
import logger from '../utils/logger.js'


// change 2 -> 

export const createJob = async (req, res, next) => {
    try{
        logger.info(`START: Create Job Service`)
        const {company, position} = req.body
        const userId = req.user.userId

        if (!company || !position){
            logger.info(`END: Create Job Service`)
            return errorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, 'missing parameters for job creation')
        }
    
        const newJob = await Jobs.create({company, position, createdBy: userId})

        logger.info(`END: Create Job Service`)
        successResponse(res, StatusCodes.CREATED, 'successfully created new job', newJob)
    }catch(error){
       console.log(error)
       next(error)
    }


}


export const getJob = async (req, res, next) => {
    try{
        logger.info(`START: Get Job Service`)
        const jobId = req.params.id
        const userId = req.user.userId

        const job = await Jobs.findOne({_id: jobId, createdBy: userId})
    
        if (!job){
            logger.info(`END: Get Job Service`)
            return errorResponse(res, StatusCodes.NOT_FOUND, 'That job doesnt exist')
        }
        logger.info(`END: Get Job Service`)
        successResponse(res, StatusCodes.OK, 'successfully found job', job)
    }catch(error){
        logger.error(error)
        next(error)
    }

}

export const getAllJobs = async (req, res, next) => {
    try{
        const jobId = req.params.id
        const userId = req.user.userId

        const job = await Jobs.findOne({_id: jobId, createdBy: userId})
    
        if (!job){
            return errorResponse(res, StatusCodes.NOT_FOUND, 'That job doesnt exist')
        }
    
        successResponse(res, StatusCodes.OK, 'successfully found job', job)

    }catch(error){
        console.log(error)
        next(error)
    }

}


export const deleteJob = async (req, res, next) => {
    try{
        const jobId = req.params.id
        const userId = req.user.userId

        const job = await Jobs.findOne({_id: jobId, createdBy: userId})
    
        if (!job){
            return errorResponse(res, StatusCodes.BAD_REQUEST, `job does not exist`)
        }
    
        await Jobs.deleteOne({_id: jobId})
    
        successResponse(res, StatusCodes.OK, `successfully deleted a job`, null)

    }catch(error){
        console.log(error)
        next(error)
    }

}


export const updateJob = async (req, res, next) => {
    try{
        const jobId = req.params.id
        const {position} = req.body
        const userId = req.user.userId
        
        const updatedJob = await Jobs.findOneAndUpdate({_id: jobId, createdy:userId}, 
            {position: position},
             {new: true, runValidators: true})
    
        if (!updatedJob){
            return errorResponse(res, StatusCodes.BAD_REQUEST, `job does not exist`)
        }
    
        successResponse(res, StatusCodes.OK, 'successfully updated job details', updatedJob)

    }catch(error){
        console.log(error)
        next(error)
    }

}



// winston -> logging 
// try - catch
// API error 
// validators -> zod