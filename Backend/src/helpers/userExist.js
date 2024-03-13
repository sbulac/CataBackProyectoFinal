const { User } = require('../models');

const userExists = async (id) => {
    const user = await User.findOne({ where: { id }, state: 1 });
    
    return !!user;
};

module.exports = { userExists };