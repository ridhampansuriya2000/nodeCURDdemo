const {Router} = require('express');

const {login, signup, logout, userMe} = require('./controller.js')
const {tokenVerify} = require("../../Middleware/index.js")

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/signup').post(signup);
authRouter.use(tokenVerify).route('/logout').get(logout);
authRouter.use(tokenVerify).route('/user/me').get(userMe);

module.exports = authRouter;