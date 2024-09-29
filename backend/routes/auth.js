import { Router } from "express";
import { loginAccount, registerAccount } from "../controllers/auth.js";


const authRouter = Router()

authRouter.post('/register', registerAccount)
authRouter.post('/login', loginAccount)


export default authRouter