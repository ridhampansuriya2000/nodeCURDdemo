const express = require("express");
const playStorApps = require("./controller");
const playStorAppRouter = express.Router();

playStorAppRouter.get('/app/playStore/appDetails', playStorApps.getPlayStoreAppData);
playStorAppRouter.get('/app/playStore/appDetails2', playStorApps.getPlayStoreAppData2);


module.exports = playStorAppRouter;