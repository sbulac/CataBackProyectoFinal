const { userExists } = require('../helpers/userExist');
const { sequelize, Product, Parameter_Values } = require('../models');

const getProductTypes = async (req, res) => {
    const { id } = req.decode;
    
    try {
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const product_types = await Parameter_Values.findAll({
            where: { parameter_id: 2, state: 1 },
            attributes: { exclude: ['parameter_id', 'state'] },
        });

        if (product_types.length === 0) {
            return res.status(404).json({ msg: 'There are no product types yet' });
        }

        res.status(200).json({ product_types });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllProducts = async (req, res) => {
    const { id } = req.decode;

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const products = await Product.findAll({
            where: { state: 1 },
            attributes: { exclude: ['state'] },
        });

        if (products.length === 0) {
            return res.status(404).json({ msg: 'There are no products yet' });
        }

        res.status(200).json({ products });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.decode;
    const { product_id } = req.params;

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const productData = await Product.findOne({
            where: { id: product_id, state: 1 },
            attributes: { exclude: ['state'] },
        });

        if (!productData) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.status(200).json({ product: productData });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const createProduct = async (req, res) => {
    const { id } = req.decode;
    const { name, description, price, pv_product_type, stock } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        const productExist = await Product.findOne({
            where: { name: name },
        });

        if (productExist) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'This product already exists' });
        }

        if (typeof price !== 'number' || typeof pv_product_type !== 'number' || typeof stock !== 'number') {
            await transaction.rollback();

            return res.status(400).json({ msg: 'The fields price, pv_product_type and stock must be of numerical type' });
        }

        const productTypeExist = await Parameter_Values.findOne({
            where: { id: pv_product_type },
        });

        if (!productTypeExist) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'This type of product does not exist' });
        }

        if (stock === 0) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'There must be at least 1 product in stock' });
        }

        await Product.create({
            name,
            description,
            price,
            pv_product_type,
            stock
        });

        await transaction.commit();

        res.status(200).json({ msg: 'Successfully created product' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.decode;
    const { product_id } = req.params;
    const { name, description, price, pv_product_type, stock } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        const productExist = await Product.findOne({
            where: { id: product_id, state: 1 },
        });

        if (!productExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'Product not found' });
        }

        const updateFields = {};

        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (typeof price === 'number') updateFields.price = price;
        if (typeof pv_product_type === 'number') {
            const product_types = await Parameter_Values.findOne({
                where: { id: pv_product_type, state: 1 },
            });

            if (!product_types) {
                return res.status(404).json({ msg: `Product type '${pv_product_type}' not found` });
            }

            updateFields.pv_product_type = pv_product_type;
        }
        if (typeof stock === 'number') updateFields.stock = stock;

        await Product.update(updateFields, { where: { id: product_id } });

        await transaction.commit();

        res.json({ msg: 'Product updated correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.decode;
    const { product_id } = req.params;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        const productExist = await Product.findOne({
            where: { id: product_id },
        });

        if (!productExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'Product not found' });
        }

        await Product.update({ state: 0 }, { where: { id: product_id } });

        await transaction.commit();

        res.json({ msg: 'Product removed correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    getProductTypes,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};