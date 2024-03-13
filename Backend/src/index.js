// Imports
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Config
dotenv.config();
const { port } = require('./config');

// Routes
const authAPI = require('./router/auth');
const userAPI = require('./router/user');
const productAPI = require('./router/product');
const billAPI = require('./router/bill');
const parameterAPI = require('./router/parameter');
const parameter_valuesAPI = require('./router/parameter_values');

// Constants
const app = express();

// App Use
app.use(bodyParser.json());
app.use(cors());

// App Routes
authAPI(app);
userAPI(app);
productAPI(app);
billAPI(app);
parameterAPI(app);
parameter_valuesAPI(app);

// Listening app
app.listen(port, () => {
    console.log('is working on port: ' + port);
});