// require("../Modal/appData2");
const express = require("express");
const appData2 = require("../controller/controller");
const authRouter = require("./Auth");
const router = express.Router();
const {tokenVerify} = require("../Middleware/index.js")

router.use('/auth', authRouter);
router.get('/app/appDetails/:_id', appData2.getAppData);
router.get('/app/playStore/appDetails', appData2.getPlayStoreAppData);
router.get('/app/playStore/appDetails2', appData2.getPlayStoreAppData2);
router.use(tokenVerify).post('/register', appData2.addAppData);
router.use(tokenVerify).get('/posts/:createdBy', appData2.getAppsData);
router.use(tokenVerify).get('/appDetails/:_id', appData2.getAppData);
router.use(tokenVerify).post('/update/:id', appData2.updateData);
router.use(tokenVerify).delete('/appDetails/delete/:id', appData2.deleteAppData);


module.exports = router;