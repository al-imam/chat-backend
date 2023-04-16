import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";
import getAllChatByID from "../controller/getAllChatById";
import validateProperties from "../middleware/validateProperties";
import parseUsersArray from "../middleware/parseUsersArray";

const chatRouter = express.Router();

chatRouter.post(
  "/",
  validateProperties(["id"]),
  filterAuthenticateUser,
  openChat
);

chatRouter.get("/", filterAuthenticateUser, getAllChatByID);

chatRouter.post(
  "/group",
  validateProperties(["userArray", "groupName"]),
  parseUsersArray,
  filterAuthenticateUser
);

export default chatRouter;
