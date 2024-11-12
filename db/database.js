const mysql = require ('mysql');
const {promisify} = require('util');

const {database} = require('./keys');
const conexion = mysql.createPool(database);

conexion.getConnection((err)=>{
    if (err) {
        console.error(err);
    } else {
        console.log('db esta funcionando');
    } 
});

module.exports = conexion;