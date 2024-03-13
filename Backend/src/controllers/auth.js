const jwt = require('jsonwebtoken');
const { encryptPass, validPass } = require('../helpers/bcryptPass');
const { sequelize, User } = require('../models');
const { token_key } = require('../config');

const register = async (req, res) => {
    const { name, role, email, password } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await User.findOne({
            where: { email: email },
        });

        if (userExist) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'This email is being used by another user, please change it' });
        }

        if (role !== 'Admin' && role !== 'Client') {
            await transaction.rollback();

            return res.status(400).json({ msg: 'The role provided is invalid' });
        }

        const dbRole = role === 'Admin' ? 1 : 2;
        const dbPassword = encryptPass(password);

        await User.create({
            name: name,
            role: dbRole,
            email: email,
            password: dbPassword,
        });

        await transaction.commit();

        res.status(200).json({ msg: 'Registered successfully' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await User.findOne({
            where: { email: email },
        });

        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!validPass(password, userExist.password)) {
            return res.status(404).json({ msg: 'Incorrect password' });
        }

        const encryptData = jwt.sign({
            id: userExist.id,
            role: userExist.role,
        }, token_key);

        const userData = await User.findOne({
            where: { id: userExist.id },
            attributes: { exclude: ['password', 'state'] },
            raw: true,
        });

        userData.role = userData.role === 1 ? 'Admin' : 'Client';

        res.status(200).json({
            msg: 'Access granted',
            access_token: encryptData,
            user: userData,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    register,
    login
};