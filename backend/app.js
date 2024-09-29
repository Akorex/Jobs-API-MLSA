import express from 'express'
import connectDB from './config/db.js'
import { port } from './config/db.js'
import jobRouter from './routes/jobs.js'
import errorHandler from './middlewares/errorHandler/index.js'
import authRouter from './routes/auth.js'
import logger from './utils/logger.js'
import notFound from './middlewares/notFound.js'

const app = express()
app.use(express.json())


app.use('/jobs', jobRouter)
app.use('/auth', authRouter)

// middlewares
app.use(notFound)
app.use(errorHandler)



app.listen(port, async () => {
    await connectDB()
    logger.info(`Server started. Listening on http://localhost:${port}`)
})