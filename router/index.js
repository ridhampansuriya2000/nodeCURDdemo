const express = require("express");
const radheKrishna = require('./RadheKrishna');
const authRouter = require("./Auth");
const appDataRouter = require('./AppData');
const router = express.Router();

/*----------initial HTML page---------*/
router.use('/', radheKrishna);

/*---------------other routes------------------*/
router.use('/auth', authRouter);
router.use('/product', appDataRouter);

module.exports = router;