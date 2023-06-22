const express = require("express");
const appData = require("./controller");
const appDataRouter = express.Router();
const {tokenVerify} = require("../../Middleware")

appDataRouter.use(tokenVerify).post('/add', appData.addAppData);
appDataRouter.use(tokenVerify).get('/getList/:createdBy', appData.getAppsData);
appDataRouter.use(tokenVerify).get('/get/:_id', appData.getAppData);
appDataRouter.use(tokenVerify).post('/update/:id', appData.updateData);
appDataRouter.use(tokenVerify).delete('/delete/:id', appData.deleteAppData);


module.exports = appDataRouter;