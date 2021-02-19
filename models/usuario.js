const { Schema, model } = require("mongoose")

const usuarioShema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true, // llave
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false,
    }
});

//Cambiar el nombre del id que viene por defecto en mongoose
usuarioShema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', usuarioShema);