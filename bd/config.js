const mongoose = require('mongoose');
//iyz2RaOjhkbOMwco
//user_mean

const dbConnection = async() => {
    
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('BD Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar BD');
    }


}

module.exports = {
    dbConnection
}