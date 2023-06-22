const express = require("express");
const appData = require("./controller");
const appDataRouter = express.Router();
const {tokenVerify} = require("../../Middleware")

appDataRouter.get('/app/appDetails/:_id', appData.getAppData);
// appDataRouter.get('/app/playStore/appDetails', appData.getPlayStoreAppData);
// appDataRouter.get('/app/playStore/appDetails2', appData.getPlayStoreAppData2);
appDataRouter.use(tokenVerify).post('/register', appData.addAppData);
appDataRouter.use(tokenVerify).get('/posts/:createdBy', appData.getAppsData);
appDataRouter.use(tokenVerify).get('/appDetails/:_id', appData.getAppData);
appDataRouter.use(tokenVerify).post('/update/:id', appData.updateData);
appDataRouter.use(tokenVerify).delete('/appDetails/delete/:id', appData.deleteAppData);


module.exports = appDataRouter;