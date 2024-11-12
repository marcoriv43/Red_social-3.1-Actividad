const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');
const friendsController = require('../controllers/friendsController');

router.get('/', auth.verifyToken, (req, res, next)=>{
    let promesas = [];
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsOK(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsWait(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsAccept(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsNot(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));
    
    Promise.all(promesas).then((data)=>{
        const typeUser = req.session.typeUser;
        const ActualUser = req.session.userId;            
        let friendsOK = data[0];        
        let friendsWait = data[1];
        let friendsAccept = data[2];   
        let friendsNot = data[3];
        res.render('friends/friends', {friendsOK, friendsWait, friendsAccept, friendsNot, ActualUser, typeUser});                        
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/add/:id', auth.verifyToken, (req, res, next)=>{
    new Promise((resolve, reject) => {
        friendsController.addFriends(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/friends');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/accept/:id', (req, res, next)=>{
    new Promise((resolve, reject) => {
        friendsController.acceptFriends(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/friends');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});


router.post('/decline/:id', auth.verifyToken, (req, res, next)=>{
    new Promise((resolve, reject) => {
        friendsController.declineFriends(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/friends');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

module.exports = router;