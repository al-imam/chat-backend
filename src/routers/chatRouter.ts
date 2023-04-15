import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";
import getAllChatByID from "../controller/getAllChatById";
import checkId from "../middleware/checkId";

const chatRouter = express.Router();

chatRouter.post("/", filterAuthenticateUser, checkId, openChat);
chatRouter.get("/", filterAuthenticateUser, checkId, getAllChatByID);

export default chatRouter;
