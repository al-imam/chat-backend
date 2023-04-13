import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.json({ payload: "Hello world" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}!`);
});
