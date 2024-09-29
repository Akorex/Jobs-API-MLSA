import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobs.js";
import isLoggedIn from "../middlewares/authentication.js";

const jobRouter = Router()
jobRouter.post('/', isLoggedIn, createJob)
jobRouter.get('/',isLoggedIn, getAllJobs)
jobRouter.get('/:id',isLoggedIn, getJob)
jobRouter.patch('/:id',isLoggedIn, updateJob)
jobRouter.delete('/:id', isLoggedIn, deleteJob)


// change 3

// if you want to chain these, you could do
// jobRouter.route('/').post(createJob).get(getAllJobs)
// jobRouter.route('/:id).get(getJob).patch(updateJob).delete(deleteJob)

// REST specification




export default jobRouter