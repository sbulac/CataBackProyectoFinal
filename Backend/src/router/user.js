const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const { validationsBodyNotRequire } = require('../middlewares/validationsBody');
const { deleteAccount, updateProfile } = require('../controllers/user');

module.exports = (app) => {
    const router = express.Router();
    app.use('/user', router);

    const regex_U_Profile = {
        name: /^[a-zA-Z\s]+$/,
        email: /^(([^<>()\[\]\\.,;:\s@\”]+(\.[^<>()\[\]\\.,;:\s@\”]+)*)|(\”.+\”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
        password: /.{8,}/,
    };

    //? PUT
    //* update user profile
    router.put(
        '/profile',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
            (req, res, next) => validationsBodyNotRequire(req, res, next, regex_U_Profile)
        ],
        updateProfile
    );

    //? DELETE
    //* delete account
    router.delete(
        '/profile',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
        ],
        deleteAccount
    );
}