import express from "express";
import userExist from "../middleware/userExist";
import singup from "../controller/singup";
import validateBody from "../middleware/validateBody";
import login from "../controller/login";

const userRouter = express.Router();

userRouter.post("/", validateBody, userExist, singup);

userRouter.post("/login", validateBody, login);

export default userRouter;
