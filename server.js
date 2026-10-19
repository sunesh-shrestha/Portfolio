import config from "./server/config/config.js";
import app from "./server/express.js";
import router from "./server/assets-router.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to the database!"));
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.use("/src", router);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.info("Server started on port %s.", config.port);
});

export default app;