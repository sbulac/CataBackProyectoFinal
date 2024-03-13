// const validateNewBill = (req, res, next) => {
//     const { products } = req.body;
//     const allowedFields = ['id', 'price'];

//     if (Object.keys(req.body).length > 1) {
//         return res.status(400).json({ msg: 'Too many fields were sent' });
//     }

//     if (!products || products.length === 0) {
//         return res.status(400).json({ msg: 'The products field is required' });
//     }

//     // Check for extra fields in the request body
//     const extraFields = Object.keys(products).filter(field => !allowedFields.includes(field));
//     if (extraFields.length > 0) {
//         return res.status(400).json({
//             msg: `Only the following fields are allowed: ${allowedFields.join(', ')}. Extra fields sent: ${extraFields.join(', ')}`,
//         });
//     }

//     for (const product of products) {
//         if (typeof product !== 'object' || product === null) {
//             return res.status(400).json({ msg: 'Products must be objects' });
//         }

//         if (!product.hasOwnProperty('id') || typeof product.id !== 'number') {
//             return res.status(400).json({ msg: 'Product ID required' });
//         }

//         if (!product.hasOwnProperty('price') || typeof product.price !== 'number') {
//             return res.status(400).json({ msg: 'Product price required' });
//         }

//         if (Object.keys(product).length > 2) {
//             return res.status(400).json({
//                 msg: 'Each product object should only contain "id" and "price" fields',
//             });
//         }
//     }

//     next();
// }

// module.exports = { validateNewBill };

const validateNewBill = (req, res, next) => {
    const { products } = req.body;

    if (Object.keys(req.body).length > 1) {
        return res.status(400).json({ msg: 'Too many fields were sent' });
    }

    if (!products || products.length === 0) {
        return res.status(400).json({ msg: 'To perform billing, at least 1 product is required' });
    }

    const productsIDs = products.filter((elemento) => !isNaN(elemento));
    const productsIDsNum = productsIDs.every((numero) => Number.isInteger(numero));

    if (!productsIDsNum) {
        res.status(400).json({ msg: 'Product IDs must be sent' });
    }

    next();
}

module.exports = { validateNewBill };