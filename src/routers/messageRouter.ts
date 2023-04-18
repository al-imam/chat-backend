import express from "express";
import validateProperties from "../middleware/validateProperties";
import validateObjectId from "../middleware/validateObjectId";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import sendMessage from "../controller/sendMessage";
import getAllMessageByChatId from "../controller/getAllMessageByChatId";

const messageRouter = express.Router();

messageRouter.post(
  "/",
  validateProperties(["chatId", "message"]),
  validateObjectId(["chatId"]),
  filterAuthenticateUser,
  sendMessage
);

messageRouter.get(
  "/",
  validateProperties(["chatId"]),
  validateObjectId(["chatId"]),
  filterAuthenticateUser,
  getAllMessageByChatId
);

export default messageRouter;
