import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";
import getAllChatByID from "../controller/getAllChatById";

const chatRouter = express.Router();

chatRouter.post("/", filterAuthenticateUser, openChat);
chatRouter.get("/", filterAuthenticateUser, getAllChatByID);

export default chatRouter;
