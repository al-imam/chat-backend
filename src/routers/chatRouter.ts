import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";
import getAllChatByID from "../controller/getAllChatById";
import validateProperties from "../middleware/validateProperties";
import parseUsersArray from "../middleware/parseUsersArray";
import createGroupChat from "../controller/createGroupChat";

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
  filterAuthenticateUser,
  parseUsersArray,
  createGroupChat
);

export default chatRouter;
