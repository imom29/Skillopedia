const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const user = require("./routes/auth");
const cookieparser = require("cookie-parser");
const cors = require('cors')

dotenv.config({ path: "./config/config.env" });

connectDb();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cookieparser());

app.use(cors());

app.listen(PORT, console.log(`Connected to port = ${PORT}`));

app.use("/api/auth", user);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // server.close(()=> process.exit(1));
});
