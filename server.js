const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

// load env vars
dotenv.config({ path: "./config/config.env" });

// Server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `);
});