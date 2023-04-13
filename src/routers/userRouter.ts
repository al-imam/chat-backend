import express from "express";

const userRouter = express.Router();

userRouter.post("/", (req, res) => {
  res.send("Singup successful!");
});

userRouter.post("/login", (req, res) => {
  res.send("Login successful!");
});

export default userRouter;
