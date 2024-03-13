const validationsBody = (req, res, next, regex) => {
    const { body, method } = req;

    if (method === 'PATCH') {
        return res.status(500).json({ msg: "Invalid 'PATCH' method" });
    }

    if (Object.keys(body).length > Object.keys(regex).length) {
        return res.status(400).json({ msg: 'Se enviaron campos demas' });
    }

    for (let value in regex) {
        if (!body[value]) {
            return res.status(400).json({ msg: `Es requerido el campo ${value}` });
        }

        if (!regex[value].test(body[value])) {
            return res.status(400).json({ msg: `El campo ${value} esta erroneo` });
        }
    }

    next();
}

const validationsBodyNotRequire = (req, res, next, regex) => {
    const { body, method } = req;

    if (method === 'PATCH') {
        return res.status(500).json({ msg: "Invalid 'PATCH' method" });
    }

    if (Object.keys(body).length > Object.keys(regex).length) {
        return res.status(400).json({ msg: 'Se enviaron campos demas' });
    }

    if (Object.keys(body).length === 0) {
        return res.status(400).json({ msg: 'Se require al menos un campo para poder actualizar' });
    }

    for (let value in body) {
        const regexKeys = Object.keys(regex);
        if (!regexKeys.includes(value)) {
            return res.status(400).json({ msg: `El campo ${value} esta erroneo` });
        }

        if (!regex[value].test(body[value])) {
            return res.status(400).json({ msg: `El campo ${value} esta erroneo` });
        }
    }

    next();
}

module.exports = {
    validationsBody,
    validationsBodyNotRequire,
};