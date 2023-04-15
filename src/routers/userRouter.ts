import express from "express";
import userExist from "../middleware/userExist";
import singup from "../controller/singup";
import login from "../controller/login";
import searchUser from "../controller/searchUsers";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import validateProperties from "../middleware/validateProperties";

const userRouter = express.Router();

userRouter.get("/", filterAuthenticateUser, searchUser);

userRouter.post(
  "/singup",
  validateProperties(["email", "password"]),
  userExist,
  singup
);

userRouter.post("/login", validateProperties(["email", "password"]), login);

export default userRouter;
