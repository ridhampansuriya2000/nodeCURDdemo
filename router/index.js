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
const path = require('path');

// Read the Swagger JSON file
// const filePath = path.join("router", './../swagger.json');
// const swaggerFile = fs.readFileSync(filePath, 'utf8');
const data = require('../swagger.json');
const swaggerData = JSON.parse(JSON.stringify(data));

const options = {
    swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
};

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
swaggerUi.setup(specs, { customCssUrl: CSS_URL })

// Serve Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData, options));

module.exports = router;