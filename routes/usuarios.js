const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarToken, getUsuario);
router.post('/', [
    check('nombre', 'el nombre no ha sido enviado').not().isEmpty(),
    check('password', 'el password no ha sido enviado').not().isEmpty(),
    check('email', 'el email no ha sido enviado').isEmail(),
    validarCampos,
    ],
    crearUsuario
);
router.put('/:id', [
    validarToken,
    check('nombre', 'el nombre no ha sido enviado').not().isEmpty(),
    check('role', 'el role no ha sido enviado').not().isEmpty(),
    check('email', 'el email no ha sido enviado').isEmail(),
    validarCampos,
    ], 
    actualizarUsuario
);
router.delete('/:id', [
    validarToken
    ],
    borrarUsuario
);

module.exports = router;