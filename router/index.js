const express = require("express");
const authRouter = require("./Auth");
const appDataRouter = require('./AppData');
const playStorAppRouter = require('./PlayStorApps');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/', playStorAppRouter);
router.use('/', appDataRouter);

module.exports = router;