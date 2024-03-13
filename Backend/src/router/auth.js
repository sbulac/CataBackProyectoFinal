const express = require('express');
const { validationsBody } = require('../middlewares/validationsBody');
const { register, login } = require('../controllers/auth');

module.exports = (app) => {
    const router = express.Router();
    app.use('/auth', router);

    const regex_C_Register = {
        name: /^[a-zA-Z\s]+$/,
        role: /^(Admin|Client)$/,
        email: /^(([^<>()\[\]\\.,;:\s@\”]+(\.[^<>()\[\]\\.,;:\s@\”]+)*)|(\”.+\”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
        password: /.{8,}/,
    };

    const regex_P_Login = {
        email: /^(([^<>()\[\]\\.,;:\s@\”]+(\.[^<>()\[\]\\.,;:\s@\”]+)*)|(\”.+\”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
        password: /.{8,}/,
    };

    //? POST
    //* register user
    router.post(
        '/register',
        [
            (req, res, next) => validationsBody(req, res, next, regex_C_Register),
        ],
        register
    );

    //* login user
    router.post(
        '/login',
        [
            (req, res, next) => validationsBody(req, res, next, regex_P_Login),
        ],
        login
    );
}