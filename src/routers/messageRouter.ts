import express from "express";
import validateProperties from "../middleware/validateProperties";
import validateObjectId from "../middleware/validateObjectId";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import sendMessage from "../controller/sendMessage";

const messageRouter = express.Router();

messageRouter.post(
  "/",
  validateProperties(["chatId", "message"]),
  validateObjectId(["chatId"]),
  filterAuthenticateUser,
  sendMessage
);

export default messageRouter;
