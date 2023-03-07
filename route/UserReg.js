const route= require('express').Router();
const userReg = require('../controller/UserReg')
const auth = require('../middleware/auth')

route.post(`/UserRegister`,userReg.register);
route.post(`/login`,userReg.login);
route.get(`/logout`,userReg.logout);
route.post(`/refreshToken`,userReg.refreshToken );
route.post(`/resetPassword`,auth, userReg.resetPassword);
route.get(`/profile`,auth, userReg.profile);
module.exports = route;