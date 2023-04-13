import express from "express";
import userModel from "../models/userModel";
import userExist from "../middleware/userExist";
import asyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post(
  "/",
  userExist,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const newUser = await userModel
      .create({
        email,
        password,
        profile: req.body?.picture,
      })
      .catch((e) => res.status(500).send("something went wrong!"));

    res.status(201).json(newUser);
  })
);

userRouter.post("/login", (req, res) => {
  res.send("Login successful!");
});

export default userRouter;
