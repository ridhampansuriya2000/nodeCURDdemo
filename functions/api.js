const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const serverless = require('serverless-http');

const router = require("./../router");

// database connection
require('./mongo');

// -------------------swagger ------------------//
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./../swagger.yaml');

//--------------------Customization-------------------//
const CustomizationOption = {
    // customCss: `img {content:url(\'../logo.svg\'); height:auto;} `,
    // customfavIcon: "../favicon.ico",
    customSiteTitle: "Code Improve API Doc",
};

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,CustomizationOption));

const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(router);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
module.exports.handler = serverless(app);

const port = 8080;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});
