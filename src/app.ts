import express from "express";
import { config } from "dotenv";
import connectMongoDB from "./config/db";
import userRouter from "./routers/userRouter";
import chatRouter from "./routers/chatRouter";
import messageRouter from "./routers/messageRouter";

config();
connectMongoDB(process.env.MONGODB_URL);
const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ payload: "Hello world" });
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}!`);
});
