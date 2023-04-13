import express from "express";
import { config } from "dotenv";
import userRouter from "./routers/userRouter";

config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (_, res) => {
  res.json({ payload: "Hello world" });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}!`);
});
