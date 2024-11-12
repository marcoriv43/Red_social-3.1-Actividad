const conexion = require('../db/database');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class users {
    BuscarUsuario = (req) => {
        let err = "";
        let data = [];
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE username_users = ?', [req], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;                      
                    resolve(data);               
                }
            });
            setTimeout(()=>{
                (err != '' ? new Error(err):null, data);
            },250);
        });  
    }

    CompararContraseña = (password, passwordDB) => {        
        return new Promise((resolve, reject) => {
            bcryptjs.compare(password, passwordDB, (error, results, fields) => {
                if (error) {                    
                    reject(error);
                } else {                            
                    resolve(results);               
                }
            });            
        });  
    }

    generateToken(user) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '1234', {
          expiresIn: '1h'
        });
        return token;
    }
    
    async crearUsers(req){
        const { username, password, email } = req; 
        const incriptado = await bcryptjs.hash(password, 10);       
        let crearUsuario = {
            "username_users": username,
            "password_users": incriptado,
            "email_users": email,
            "type_users": "client"
        }
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO users set ?', [crearUsuario], (error, results, fields) => {
                if (error) {                    
                    reject(error);
                } else {            
                    resolve(results);               
                }
            });
        });
    }
}

module.exports = new users();