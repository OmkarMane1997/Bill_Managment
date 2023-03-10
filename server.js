require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const path = require("path");

// port
const PORT = process.env.PORT;
// ref
const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.TOKEN_SECRET));
//middleware
app.use(cors());
//  // route modules
const UserReg = require("./route/UserReg");
// primary Router
app.use(`/api/v1`, UserReg);
// default route
app.all(`*`, (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: `the Request route path Not Found` });
});

const start = async () => {
  try {
    // await connection;

    app.listen(PORT, () => {
      console.log(`server is listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message });
  }
};

start();
