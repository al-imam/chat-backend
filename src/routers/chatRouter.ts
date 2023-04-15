import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";

const chatRouter = express.Router();

chatRouter.post("/:userId", filterAuthenticateUser, openChat);

export default chatRouter;
