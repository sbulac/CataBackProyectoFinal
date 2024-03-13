const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const { validateNewBill } = require('../middlewares/validateNewBill');
const {
    createBill,
    getAllBillsByclient,
    getBillByclient,
    getAllBills,
    getBillById
} = require('../controllers/bill');

module.exports = (app) => {
    const router = express.Router();
    app.use('/bill', router);

    //? POST
    //* create bill
    router.post(
        '/new',
        [
            (req, res, next) => validHeaders(req, res, next, 'Client'),
            validateNewBill,
        ],
        createBill
    );

    //? GET
    //* get all bills by client
    router.get(
        '/all',
        [
            (req, res, next) => validHeaders(req, res, next, 'Client'),
        ],
        getAllBillsByclient
    );

    //* get bill by client
    router.get(
        '/:bill_id',
        [
            (req, res, next) => validHeaders(req, res, next, 'Client'),
        ],
        getBillByclient
    );

    //* get all bills
    router.get(
        '/admin/all',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getAllBills
    );

    //* get bill by id
    router.get(
        '/admin/:bill_id',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getBillById
    );
}