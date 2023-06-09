import express from "express";
import filterAuthenticateUser from "../middleware/filterAuthenticateUser";
import openChat from "../controller/openChat";
import getAllChatByID from "../controller/getAllChatById";
import validateProperties from "../middleware/validateProperties";
import parseUsersArray from "../middleware/parseUsersArray";
import createGroupChat from "../controller/createGroupChat";
import renameGroup from "../controller/renameGroup";
import filterAdmin from "../middleware/filterAdmin";
import addUserToGroup from "../controller/addUserToGroup";
import removeUserToGroup from "../controller/removeUserToGroup";
import validateObjectId from "../middleware/validateObjectId";
import userExistAndNotAlreadyAdded from "../middleware/userExistAndNotAlreadyAdded";

const chatRouter = express.Router();

chatRouter.post(
  "/",
  validateProperties(["userId"]),
  validateObjectId(["userId"]),
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

chatRouter.post(
  "/group/rename",
  validateProperties(["groupId", "updatedGroupName"]),
  validateObjectId(["groupId"]),
  filterAuthenticateUser,
  renameGroup
);

chatRouter.post(
  "/group/add",
  validateProperties(["groupId", "userId"]),
  validateObjectId(["groupId", "userId"]),
  filterAuthenticateUser,
  userExistAndNotAlreadyAdded,
  filterAdmin,
  addUserToGroup
);

chatRouter.post(
  "/group/remove",
  validateProperties(["groupId", "userId"]),
  validateObjectId(["groupId", "userId"]),
  filterAuthenticateUser,
  filterAdmin,
  removeUserToGroup
);

export default chatRouter;
