const bcrypt = require('bcrypt');

const encryptPass = (pass) => {
    const newPass = bcrypt.hashSync(pass, 10);
    return newPass;
}

const validPass = (pass, hash) => {
    const comparePass = bcrypt.compareSync(pass, hash);
    return comparePass;
}

module.exports = {
    encryptPass,
    validPass,
};