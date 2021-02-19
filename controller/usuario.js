const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuario = async(req, res) => {
    
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
};

const crearUsuario = async(req, res = response) => {
    const {password, email} = req.body;
    
    try {
        const correoExist = await Usuario.findOne({email});
        if(correoExist){
            return res.status(500).json({
                ok: false,
                msg: 'Correo ya esta registrado'
            });
        }
        const usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);
        const token = await generarJWT(usuario.id);

        await usuario.save();

        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
    
};

const actualizarUsuario = async(req, res = response) => {
    const iud = req.params.id;
    try{
        const usuarioBD = await Usuario.findById(iud);

        if(!usuarioBD){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }
        
        const {password, google, email,...campo} = req.body;
        if(usuarioBD.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campo.email = email;
        const actualizarUsuario = await Usuario.findByIdAndUpdate(iud, campo, {new: true});

        res.json({
            ok: true,
            actualizarUsuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

};

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try{
        const usuarioBD = await Usuario.findById(uid);

        if(!usuarioBD){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }
        
        const eliminarUsuario = await Usuario.findOneAndDelete(uid);

        res.json({
            ok: true,
            eliminarUsuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

};        

module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} 