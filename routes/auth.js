const {Router} = require('express');
const { login } = require('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/',[
        check('email','email no valido').isEmail(),
        check('password','password no valido').not().isEmpty(),
        validarCampos
    ],  
    login
);

module.exports = router;