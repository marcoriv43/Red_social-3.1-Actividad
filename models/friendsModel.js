const conexion = require('../db/database');

class friend {
    friends(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users LEFT JOIN friends ON id_users = id_users_friend1 OR id_users = id_users_friend2 WHERE id_users=?', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    resolve(results);
                }                
            });                        
        });    
    }

    friendsOK(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE id_users IN (?)', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    resolve(results);
                }                
            });                        
        });  
    }

    friendsWait(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE id_users IN (?)', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    resolve(results);
                }                
            });                        
        });  
    }

    friendsAccept(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE id_users IN (?)', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    resolve(results);
                }                
            });                        
        });  
    }

    friendsNot(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE id_users NOT IN (?)', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {            
                    resolve(results);
                }                
            });                        
        });  
    }

    newFriends(req, res){
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO friends set ?', [req], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {               
                    resolve(results);               
                }
            });
        });   
    }

    declineFriends(user, id, res){
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM friends WHERE id_users_friend1 = ? AND id_users_friend2 = ?', [id, user], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {               
                    resolve(results);               
                }
            });
        });   
    }

    acceptFriends(user, id, accept, res){
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE friends SET ? WHERE id_users_friend1 = ? AND id_users_friend2 = ?', [accept,id, user], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {               
                    resolve(results);               
                }
            });
        });   
    }
}

module.exports = new friend();