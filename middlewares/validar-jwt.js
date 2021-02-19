const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarToken = (req, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const {iud} = jwt.verify(token,process.env.JWT_SECRET) ;
        req.iud = iud;
        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }
}

module.exports = {
    validarToken
}