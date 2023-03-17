const { StatusCodes } = require("http-status-codes");
const validator = require("validator");
const DBconnection = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = {
  AddProduct: async (req, res) => {
    try {
      const { productName, productSubName, rate, description, status } =
        req.body;

      if (validator.isAlpha(productName, "en-US", { ignore: " " }) == false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Character Product Name " });
      }

      if (
        validator.isAlphanumeric(productSubName, "en-US", { ignore: " " }) ==
        false
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Character Product Sub Name " });
      }

      if (validator.isNumeric(rate) == false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Numeric Product Rate " });
      }

      if (
        validator.isAlphanumeric(description, "en-US", { ignore: " " }) == false
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Character Description " });
      }

      let findData = `SELECT * FROM product_master WHERE productName='${productName}'`;
      //   console.log(findData)
      let exitID = await DBconnection(findData);

      if (exitID.length == 0) {
        //   Insert Query
        const date = new Date();
        let date2 = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0];

        let insertData = `INSERT INTO product_master (productName, productSubName, rate, description, status,created_date) VALUES ("${productName}","${productSubName}","${rate}","${description}","${status}","${date2}")`;
        console.log(insertData);
        let result = await DBconnection(insertData);
        return res
          .status(StatusCodes.OK)
          .json({ msg: " Product Add Successfully" });
      } else {
        // console.log('No')
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Product  is already Exits!" });
      }
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  GetAllProduct: async (req, res) => {
    try {
      let getAllData = `Select id,productName, productSubName, rate, description,status from product_master WHERE is_active=1`;
      let result = await DBconnection(getAllData);
      // console.log(result);
      let length = result.length;
      res.status(StatusCodes.OK).json({ result, length });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
    // return res.status(StatusCodes.OK).json({ msg: "GetAllProduct" });
  },
  SingleProduct: async (req, res) => {
    let id = req.params.id;
    // console.log("id", id);
    let findData = `SELECT id,productName, productSubName, rate, description, status FROM product_master WHERE id='${id}' AND  is_active=1`;
    // console.log(findData);
    let exitsID = await DBconnection(findData);
    // console.log(exitsID);
    if (exitsID == 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: " User Id not Found" });
    } else {
      // console.log('data',exitsID)
      return res.status(StatusCodes.OK).json({ exitsID });
    }
  },

  UpdateProduct: async (req, res) => {
    try {
      let id = req.params.id;
      const { productName, productSubName, rate, description, status } =
        req.body;
      // console.log(typeof String(rate));

      if (validator.isAlpha(productName, "en-US", { ignore: " " }) == false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Character Product Name " });
      }

      if (
        validator.isAlphanumeric(productSubName, "en-US", { ignore: " " }) ==
        false
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Character Product Sub Name " });
      }

      let patternRate = /^[0-9]+(\.[0-9]{1,2})?$/g;
      if (validator.matches(String(rate), patternRate) === false) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Numeric Product Rate " });
      }

      if (
        validator.isAlphanumeric(description, "en-US", { ignore: " " }) == false
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: " Enter Only Character Description " });
      }

      const date = new Date();
      let date2 = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

      let findData = `SELECT * FROM product_master WHERE id='${id}'`;
      // console.log(findData)
      let exitsID = await DBconnection(findData);

      if (exitsID.length == 0) {
        return res.status(StatusCodes.OK).json({
          msg: "Unable to Update Data, Provide id doesn't exists",
          id,
        });
      } else {
        // Update Query productName, productSubName, rate, description, status
        let UpdateQuery = `UPDATE product_master SET productName="${productName}",productSubName="${productSubName}",rate="${rate}",description="${description}",status="${status}",modified_date="${date2}" WHERE id="${id}"`;
        // console.log(UpdateQuery);
        let result = await DBconnection(UpdateQuery);
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Data Update Successfully", id });
      }
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  ProductInfo: async (req, res) => {
    try {
      let getAllData = `Select id ,  productName from product_master WHERE is_active=1 AND status="Active"  ORDER BY id ASC`;
      let result = await DBconnection(getAllData);
      // console.log(result);
      let length = result.length;
      res.status(StatusCodes.OK).json({ result, length });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
};

module.exports = Product;
