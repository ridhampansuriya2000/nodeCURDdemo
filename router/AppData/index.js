const express = require("express");
const appData = require("./controller");
const appDataRouter = express.Router();
const {tokenVerify} = require("../../Middleware")

appDataRouter.route('/add').post(tokenVerify , appData.addAppData);
appDataRouter.route('/getList/:createdBy').get(tokenVerify, appData.getAppsData);
appDataRouter.route('/get/:_id').get(tokenVerify, appData.getAppData);
appDataRouter.route('/update/:id').post(tokenVerify, appData.updateData);
appDataRouter.route('/delete/:id').delete(tokenVerify, appData.deleteAppData);

module.exports = appDataRouter;