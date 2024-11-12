const conexion = require('../db/database');

class post {
    obtenerFriends(req, res) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users LEFT JOIN friends ON id_users = id_users_friend1 OR id_users = id_users_friend2 WHERE id_users=?', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    let friends = new Set();
                    friends.add(req);
                    results.forEach(row =>{                                       
                        if (row.id_users_friend1 !== parseInt(req)) {
                            friends.add(row.id_users_friend1);
                        }
                        if (row.id_users_friend2 !== parseInt(req)) {
                            friends.add(row.id_users_friend2);
                        }
                    });                 
                    friends = Array.from(friends); 
                    resolve(friends);               
                }                
            });                        
        });    
    }

    obtenerPosts(req, res) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM `post` LEFT JOIN `users` ON `id_users_post`=id_users WHERE id_users_post IN (?) ORDER BY id_post DESC;', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {             
                    if (results[0].id_post==null) {
                        results = [];
                    }
                    resolve(results);               
                }
            });
        });        
    }

    crearPosts(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO `post` set ?', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {             
                    resolve(results);               
                }
            });
        });        
    }

    editarPosts(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM `post` WHERE `id_post` = ?', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);               
                }
            });
        });  
    }

    actualizarPosts(newPost, id, res){
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE `post` set ? WHERE `id_post`=?',[newPost, id], (error, results, fields) => {
                if (error) {                    
                    reject(error);
                } else {                                   
                    resolve(results);               
                }
            });
        });  
    }

    borrarPosts(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM `post` WHERE `id_post` = ?', [req], (error, results, fields) => {
                if (error) {                    
                    reject(error);
                } else {                     
                    resolve(results);               
                }
            });            
        });   
    }
}

module.exports = new post();