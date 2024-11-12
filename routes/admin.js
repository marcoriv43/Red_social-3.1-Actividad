const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');
const adminController = require('../controllers/adminController');

// Rutas de usuario
router.get('/', auth.verifyToken, auth.verifyType, (req, res, next) => { 
  new Promise((resolve, reject) =>{        
    adminController.getUsers(req, (error, data)=>{        
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }).then((data)=>{
    const ActualUser  = req.session.userId;  
    const typeUser = req.session.typeUser;
    res.render('admin/admin', { data, ActualUser, typeUser });                    
  }).catch((error)=>{
    res.render('layouts/error', {error});
  });  
});

router.post('/banear/:id', auth.verifyToken, auth.verifyType, (req, res, next)=>{
  new Promise((resolve, reject) =>{        
    adminController.banearUsers(req, (error, data)=>{        
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }).then((data)=>{
    res.redirect('/admin');
  }).catch((error)=>{
    res.render('layouts/error', {error});
  });
});

router.post('/desbanear/:id', auth.verifyToken, auth.verifyType, (req, res, next)=>{
  new Promise((resolve, reject) =>{        
    adminController.desBanearUsers(req, (error, data)=>{        
      if (error) {
        reject(error);
      } else {
        resolve(data);  
      }
    });
  }).then((data)=>{
    res.redirect('/admin');
  }).catch((error)=>{
    res.render('layouts/error', {error});
  });
});

module.exports = router;