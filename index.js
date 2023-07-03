const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const router = require("./router");

// database connection
require('./mongo');

// swagger ------------------
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

// Read the Swagger JSON file
const swaggerFile = fs.readFileSync('swagger.json', 'utf8');
const swaggerData = JSON.parse(swaggerFile);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData));

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

const port = 8080;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});