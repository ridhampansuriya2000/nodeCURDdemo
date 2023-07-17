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

// swagger ------------------
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

// Read the Swagger JSON file
const swaggerFile = fs.readFileSync('swagger.json', 'utf8');
const swaggerData = JSON.parse(swaggerFile);

const options = {
    swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
};

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData, options));

module.exports = router;