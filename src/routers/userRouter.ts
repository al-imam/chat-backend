import express from "express";
import userExist from "../middleware/userExist";
import singup from "../controller/singup";
import validateBody from "../middleware/validateBody";
import login from "../controller/login";
import searchUser from "../controller/searchUsers";

const userRouter = express.Router();

userRouter.get("/", searchUser);

userRouter.post("/singup", validateBody, userExist, singup);

userRouter.post("/login", validateBody, login);

export default userRouter;
