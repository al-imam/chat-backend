import { connect } from "mongoose";

function connectMongoDB(url = "") {
  return connect(url)
    .then(() => console.log(`mongodb connected to ${url}`))
    .catch((e) => {
      console.log(`mongodb connection failed ${e}`);
      process.exit();
    });
}

export default connectMongoDB;
