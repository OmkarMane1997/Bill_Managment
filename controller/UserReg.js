const { StatusCodes } = require("http-status-codes");
const validator = require("validator");
const DBconnection = require("../db/db");
const bcrypt = require("bcryptjs");
const { createAccessToken, decodeToken } = require("../util/util");
const jwt = require("jsonwebtoken");
const UserReg = {
  register: async (req, res) => {
    try {
      const { name, email, phone, password, role } = req.body;
      // console.log(req.body);

      const encPassword = await bcrypt.hash(password, 10);
      const date = new Date();
      let date2 = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
      //  where check the email is in DB or not.

      // Validation of Name
      if (validator.isLength(name, { min: 2 }) == false) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "" });
      }
      // Validation of Email
      if (validator.isEmail(email) == false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Valid Email" });
      }

      if (validator.isMobilePhone(phone) == false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Valid Mobile" });
      }
      // PassWord Validation and Return Password Score.
      if (
        validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }) == false
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: `minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1`,
        });
      }

      if (validator.isLength(role, { min: 1 }) === false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: ` Enter Role of User` });
      }

      // console.log(req.body);

      let findData = `SELECT * FROM user_master WHERE email='${email}'`;
      //   console.log(findData)
      let exitID = await DBconnection(findData);
      //   console.log(exitID)
      if (exitID.length == 0) {
        //   Insert Query
        let insertData = `INSERT INTO user_master (name, email,phone, password,role,created_date) VALUES ("${name}","${email}","${phone}","${encPassword}","${role}","${date2}")`;
        //   console.log(insertData);
        let result = await DBconnection(insertData);
        //   console.log(result.insertId);
        return res
          .status(StatusCodes.OK)
          .json({ msg: " Registration SuccessFull" });
      } else {
        // console.log('No')
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Email id is already Exits!" });
      }
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body)
      if (validator.isEmail(email) == false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Valid Email" });
      }
      // PassWord Validation and Return Password Score.
      if (
        validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }) == false
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: `minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1`,
        });
      }

      let findUser = `SELECT * FROM user_master WHERE email='${email}' AND is_active = 1`;
      const result = await DBconnection(findUser);
      // console.log(result);
      // finding user in DB .
      if (result.length > 0) {
        //  console.log(result[0].password)
        // checking the Password
        const isMatch = await bcrypt.compare(password, result[0].password);
        if (!isMatch) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Password Did not Match" });
        }
        const userRole = result[0].role;
        const accessToken = createAccessToken({
          id: result[0].id,
          role: userRole,
        });

        res.cookie("refreshToken", accessToken, {
          httpOnly: true,
          signed: true,
          path: "/api/v1/refreshToken",
          maxAge: 1 * 2 * 60 * 60 * 1000,
        });
        return res
          .status(StatusCodes.OK)
          .json({ msg: " Login SuccessFull", accessToken, userRole });
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "User Doesn't exists.." });
      }
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("loginToken", { path: "/api/v1/loginToken" });
      res.status(StatusCodes.OK).json({ msg: "Logout Successful" });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rfToken = req.body;
      console.log(rfToken);

      if (!rfToken.token) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Session Expired , Login Again.." });
      }
      jwt.verify(rfToken.token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Invalid Access Token.. Login again" });
        } else {
          res.status(StatusCodes.OK).json({ msg: "ok" });
        }
      });
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      res.status(StatusCodes.OK).json({ msg: "resetPassword Successful" });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  profile: async (req, res) => {
    try {
      let id = req.user.id;
      let findUser = `SELECT id,name,email,phone,role,created_date FROM user_master WHERE id='${id}' AND is_active = 1`;
      let result = await DBconnection(findUser);
      console.log(result);
      res.status(StatusCodes.OK).json({ result });
      //  res.status(StatusCodes.OK).json({ msg: "Profile Successful" })
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
};

module.exports = UserReg;
