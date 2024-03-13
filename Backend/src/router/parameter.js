const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const { validationsBody, validationsBodyNotRequire } = require('../middlewares/validationsBody');
const {
    createParameter,
    getAllParameters,
    getAllParametersByState,
    deleteParameter,
    updateParameter,
} = require('../controllers/parameter');

module.exports = (app) => {
    const router = express.Router();
    app.use('/parameter', router);

    const regex_C_Parameter = {
        parameter_name: /^[a-zA-ZáéíóúüñÑ]+$/,
    };
    
    const regex_U_Parameter = {
        parameter_name: /^[a-zA-ZáéíóúüñÑ]+$/,
        state: /^[0-9]+$/,
    };

    //? POST
    //* create parameter
    router.post(
        '/create',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_C_Parameter),
        ],
        createParameter
    );

    //? GET
    //* bring all existing parameters
    router.get(
        '/all',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getAllParameters
    );

    //* bring all parameters by state code
    router.get(
        '/:state_code',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getAllParametersByState
    );

    //? PUT
    //* update parameter
    router.put(
        '/updateState/:id_parameter',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBodyNotRequire(req, res, next, regex_U_Parameter),
        ],
        updateParameter
    );

    //? DELETE
    //* delete parameter
    router.delete(
        '/:id_parameter',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        deleteParameter
    );
}