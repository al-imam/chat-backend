import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";
import getAllChatByID from "../controller/getAllChatById";

const chatRouter = express.Router();

chatRouter.post("/:userId", filterAuthenticateUser, openChat);
chatRouter.get("/:userId", filterAuthenticateUser, getAllChatByID);

export default chatRouter;
