const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

app.use(express.json());
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/stores", require("./routes/stores"));



// Server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `);
});