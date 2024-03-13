const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const { validationsBody, validationsBodyNotRequire } = require('../middlewares/validationsBody');
const {
    getProductTypes,
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} = require('../controllers/product');

module.exports = (app) => {
    const router = express.Router();
    app.use('/product', router);

    const regex_C_Product = {
        name: /.*/s,
        description: /.*/s,
        price: /^[0-9]+$/,
        pv_product_type: /^[0-9]+$/,
        stock: /^[0-9]+$/,
    };

    const regex_U_Product = {
        name: /.*/s,
        description: /.*/s,
        price: /^[0-9]+$/,
        pv_product_type: /^[0-9]+$/,
        stock: /^[0-9]+$/,
    };

    //? GET
    //* bring product types
    router.get(
        '/types',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
        ],
        getProductTypes
    );

    //* bring all products
    router.get(
        '/',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
        ],
        getAllProducts
    );

    //* bring product by id
    router.get(
        '/:product_id',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
        ],
        getProductById
    );

    //? POST
    //* create product
    router.post(
        '/create',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_C_Product)
        ],
        createProduct
    );

    //? PUT
    //* update product info
    router.put(
        '/:product_id',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBodyNotRequire(req, res, next, regex_U_Product)
        ],
        updateProduct
    )

    //? DELETE
    //* delete product
    router.delete(
        '/:product_id',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        deleteProduct
    );
}