const { encryptPass } = require("../helpers/bcryptPass");
const { userExists } = require("../helpers/userExist");
const { sequelize, User } = require("../models");

const updateProfile = async (req, res) => {
    const { id } = req.decode;
    const { name, email, password } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) {
            const emailExist = await User.findOne({
                where: { email: email },
            });

            if (emailExist) {
                await transaction.rollback();
                return res.status(404).json({ msg: 'This email is being used' });
            }

            updateFields.email = email;
        };
        if (password) updateFields.password = encryptPass(password);

        await User.update(updateFields, { where: { id: id } });

        const userUpdated = await User.findOne({
            where: { id: id },
            attributes: { exclude: ['password', 'state'] },
            raw: true,
        });

        await transaction.commit();

        userUpdated.role = userUpdated.role === 1 ? 'Admin' : 'Client';

        res.status(200).json({
            msg: 'Profile updated successfully',
            user: userUpdated,
        });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const deleteAccount = async (req, res) => {
    const { id } = req.decode;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        await User.update({ state: 1 }, { where: { id: id } });

        await transaction.commit();

        res.status(200).json({ msg: 'User removed correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    updateProfile,
    deleteAccount,
};