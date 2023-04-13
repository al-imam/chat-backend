import express from "express";
import userExist from "../middleware/userExist";
import singup from "../controller/singup";
import validateBody from "../middleware/validateBody";

const userRouter = express.Router();

userRouter.post("/", validateBody, userExist, singup);

userRouter.post("/login", (req, res) => {
  res.send("Login successful!");
});

export default userRouter;
