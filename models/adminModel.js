const conexion = require('../db/database');

class admin {
    obtenerUsuarios(req, res) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE type_users NOT IN (?) ', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    resolve(results);
                }                
            });                        
        });      
    }

    modificarUsuarios(id, type, res) {
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE users SET type_users=? WHERE id_users=?', [type, id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    resolve(results);
                }                
            });                        
        });      
    }

}

module.exports = new admin();