import express from "express";
import userRouter from "./routers/userRouter";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (_, res) => {
  res.json({ payload: "Hello world" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}!`);
});
