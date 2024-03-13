const { Op } = require("sequelize");
const { userExists } = require("../helpers/userExist");
const { Parameter, sequelize } = require("../models");

const createParameter = async (req, res) => {
    const { id } = req.decode;
    const { parameter_name } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        const parameterExist = await Parameter.findOne({
            where: { parameter_name: parameter_name },
        });

        if (parameterExist) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'The parameter already exists' });
        }

        await Parameter.create({ parameter_name });

        await transaction.commit();

        res.json({ msg: 'The parameter was added correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllParameters = async (req, res) => {
    const { id } = req.decode;

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const parameters = await Parameter.findAll({
            where: { state: 1 }
        });

        if (parameters.length === 0) {
            return res.status(404).json({ msg: 'There are no parameters yet' });
        }

        res.status(200).json({ parameters: parameters });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllParametersByState = async (req, res) => {
    const { id } = req.decode;
    const { state_code } = req.params

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const parameters = await Parameter.findAll({
            where: { state: state_code },
        });

        if (parameters.length === 0) {
            return res.status(404).json({ msg: `There are still no parameters with the state ${state_code}` });
        }

        res.status(200).json({ parameters: parameters });
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Server error' });
    }
}

const updateParameter = async (req, res) => {
    const { id } = req.decode;
    const { id_parameter } = req.params;
    const { parameter_name, state } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        const parameterExist = await Parameter.findOne({
            where: { id: id_parameter },
        });

        if (!parameterExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'Parameter not found' });
        }

        if (!parameter_name) {
            await Parameter.update({ state: state }, { where: { id: id_parameter } });
        }

        await Parameter.update({ parameter_name: parameter_name }, { where: { id: id_parameter } });

        await transaction.commit();

        res.status(200).json({ msg: 'Parameter updated correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const deleteParameter = async (req, res) => {
    const { id } = req.decode;
    const { id_parameter } = req.params;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        const parameterExist = await Parameter.findOne({
            where: { id: id_parameter, state: { [Op.ne]: 0, } },
        });

        if (!parameterExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'Parameter not found' });
        }

        await Parameter.update({ state: 0 }, { where: { id: id_parameter } });

        await transaction.commit();

        res.json({ msg: 'Parameter removed correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    createParameter,
    getAllParameters,
    getAllParametersByState,
    updateParameter,
    deleteParameter,
};