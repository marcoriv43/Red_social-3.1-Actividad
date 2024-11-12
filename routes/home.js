const express = require('express');
const app = require('../app');
const session = require('express-session');
const router = express.Router();

const  usersController = require('../controllers/usersController');

router.get('/', (req, res, next)=>{
    res.render('home/home');
});

router.post('/', (req, res, next)=>{
    new Promise((resolve, reject) => {
        usersController.login(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{                                 
        req.session.token = data[1];
        const userId = data[0].id_users;                                
        req.session.userId = userId; // Guarda el id del usuario en la sesión
        const typeUser = data[0].type_users;
        req.session.typeUser = typeUser; // Guarda el tipo de usuario en la sesión
        res.redirect('/post');  
                        
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.get('/crearUsuario', (req, res, next)=>{    console.log(1);    
    res.render('home/newUser');
});

router.post('/crearUsuario', (req, res, next)=>{
    new Promise((resolve, reject) => {
        usersController.createUsers(req.body, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        });
    }).then((data)=>{
        res.redirect('/');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

module.exports = router;