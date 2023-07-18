const express = require("express");
const radheKrishna = require('./RadheKrishna');
const authRouter = require("./Auth");
const router = express.Router();
const appDataRouter = require('./AppData');

/*----------initial HTML page---------*/
router.use('/', radheKrishna);

/*---------------other routes------------------*/
router.use('/auth', authRouter);
router.use('/product', appDataRouter);

// swagger ------------------
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');


// Read the Swagger JSON file
const filePath = path.join("router", '../swagger.json');
const swaggerFile = fs.readFileSync(filePath, 'utf8');
const swaggerData = JSON.parse(swaggerFile);

const options = {
    swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
};

// Serve Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData, options));

module.exports = router;