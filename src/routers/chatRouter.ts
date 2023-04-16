import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";
import getAllChatByID from "../controller/getAllChatById";
import validateProperties from "../middleware/validateProperties";

const chatRouter = express.Router();

chatRouter.post(
  "/",
  validateProperties(["id"]),
  filterAuthenticateUser,
  openChat
);

chatRouter.get("/", filterAuthenticateUser, getAllChatByID);

export default chatRouter;
