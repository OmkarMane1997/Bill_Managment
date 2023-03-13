const route = require("express").Router();
const Product = require("../controller/Product");
const auth = require("../middleware/auth");
route.post(`/AddProduct`, auth,Product.AddProduct);
route.get(`/GetAllProduct`, auth, Product.GetAllProduct);
route.get(`/SingleProduct/:id`, auth, Product.SingleProduct);
route.patch(`/UpdateProduct/:id`, auth, Product.UpdateProduct);
module.exports = route;
