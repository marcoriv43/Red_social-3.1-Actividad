const User = require('../models/userModel');

class userController{

    async createUsers(req, res) {
        let err = "";
        let data = [];
        try {            
            let crearUsuario = await User.crearUsers(req);
            return res(err != '' ? new Error(err):null, data=crearUsuario);            
        } catch (error) {                        
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }                            
    }

    async login (req, res) {
        let err = "";
        let data = [];
        try {
            const {username, password} = req.body;

            // Buscar el usuario
            let user = await User.BuscarUsuario(username);                        
            if (!user.length) {
                err = "El usuario no existe";
                return res(err != '' ? new Error(err):null, data);
            }

            // Comprobrar contraseña
            let contraseñaValida = await User.CompararContraseña(password, user[0].password_users);
            if (!contraseñaValida) {
                err = "La contraseña es incorrecta";
                return res(err != '' ? new Error(err):null, data);
            }

            //Generar el tokenID del acceso del usuario
            let newToken = await User.generateToken(user[0]);                                    
            return res(err != '' ? new Error(err):null, data=[user[0], newToken]);            
        } catch (error) {                        
            console.error(error);
            err += error;
            return res(err != '' ? new Error(err):null, data);
        }                                  
    }
}

module.exports = new userController();