const { response } = require('express');
const Usuarios = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const {email, password} = req.body;
    try {
        const usuarioDB = await Usuarios.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'El email no existe en base de datos'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'El password no coincide'
            });
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error consulte al administrador'
        })
    }
}

module.exports = {
    login
}