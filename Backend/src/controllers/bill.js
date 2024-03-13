const { updateStock } = require("../helpers/updateStock");
const { sequelize, Bill, Product, Bill_Details } = require("../models");
const { userExists } = require("../helpers/userExist");

const createBill = async (req, res) => {
    const { id } = req.decode;
    const { products } = req.body;

    const transaction = await sequelize.transaction();

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        // Check products existence and length
        if (!products || products.length === 0) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'To perform billing, at least 1 product is required' });
        }

        // Check product validity & build product map for efficiency
        const productsMap = {};
        let productsCount = 0;

        for (const productId of products) {
            const productExisting = await Product.findOne({
                where: { id: productId, state: 1 }
            });

            if (productExisting) {
                if (productExisting.stock <= 0) {
                    await transaction.rollback();

                    return res.status(404).json({ msg: 'There is no stock available for this product' });
                }
                await updateStock(productId);
                productsMap[productsCount] = productExisting;
                productsCount++;
            }
        }

        if (productsCount !== products.length) {
            await transaction.rollback();

            return res.status(400).json({ msg: "There are invalid products" });
        }

        // Calculate total price & create bill
        let total_price = 0;
        for (const product_id in productsMap) {
            total_price = productsMap[product_id].price + total_price;
        }

        const newBill = await Bill.create({
            id_client: id,
            total_products: productsCount,
            total_price,
        });

        // Create bill details based on products
        const billDetails = products.map((product) => ({
            id_bill: newBill.id,
            id_product: product,
        }));

        await Bill_Details.bulkCreate(billDetails);

        await transaction.commit();

        res.status(200).json({ bill: newBill });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllBillsByclient = async (req, res) => {
    const { id } = req.decode;

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Brings all client bills
        const bills = await Bill.findAll({
            where: { id_client: id },
        });

        if (!bills || bills.length === 0) {
            return res.status(404).json({ msg: 'The customer has not made any purchases so far' });
        }

        res.status(200).json({ bills });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const getBillByclient = async (req, res) => {
    const { id } = req.decode;
    const { bill_id } = req.params;

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Brings Bill Details By Client ID and Bill ID
        const bills = await Bill.findOne({
            where: { id_client: id, id: bill_id },
            include: [
                {
                    model: Bill_Details,
                    attributes: { exclude: ['id_bill', 'id_product'] },
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
            ],
        });

        if (!bills) {
            return res.status(404).json({ msg: 'The customer has not made any purchases so far' });
        }

        res.status(200).json({ bill: bills });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllBills = async (req, res) => {
    const { id } = req.decode;

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Brings all client bills
        const bills = await Bill.findAll();

        if (!bills || bills.length === 0) {
            return res.status(404).json({ msg: 'No invoices have been made so far' });
        }

        res.status(200).json({ bills });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const getBillById = async (req, res) => {
    const { id } = req.decode;
    const { bill_id } = req.params;

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Brings Bill Details By Bill ID
        const bills = await Bill.findOne({
            where: { id: bill_id },
            include: [
                {
                    model: Bill_Details,
                    attributes: { exclude: ['id_bill', 'id_product'] },
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
            ],
        });

        if (!bills) {
            return res.status(404).json({ msg: 'Bill not found' });
        }

        res.status(200).json({ bill: bills });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    createBill,
    getAllBillsByclient,
    getBillByclient,
    getAllBills,
    getBillById,
};