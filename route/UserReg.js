const route = require("express").Router();
const userReg = require("../controller/UserReg");
const auth = require("../middleware/auth");

route.post(`/login`, userReg.login);
route.get(`/logout`, userReg.logout);
route.post(`/refreshToken`, userReg.refreshToken);
route.post(`/resetPassword`, auth, userReg.resetPassword);
route.get(`/profile`, auth, userReg.profile);
route.post(`/UserRegister`, auth, userReg.register);
route.get(`/GetAllUser`, auth, userReg.getAllUser);

route.get(`/ReadUser/:id`, auth, userReg.readUser);
route.patch(`/UpdateUser/:id`, auth, userReg.UpdateUser);
module.exports = route;
