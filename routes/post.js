const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');
const postController = require('../controllers/postController');

// Rutas de usuario
router.get('/', auth.verifyToken, (req, res, next)=>{
    new Promise((resolve, reject) =>{        
        postController.getPosts(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        const typeUser = req.session.typeUser;
        const ActualUser = req.session.userId;                                
        res.render('feed/feed', {data, ActualUser, typeUser});                        
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/', auth.verifyToken, (req, res, next)=>{
    new Promise((resolve, reject) => {
        postController.createPost(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/post');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.get('/edit/:id', auth.verifyToken, (req, res, next)=>{
    new Promise((resolve, reject) =>{        
        postController.getUpdatePost(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{        
        data = data[0]
        const ActualUser = req.session.userId;    
        res.render('feed/feedEdit', {data, ActualUser});
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/edit/:id', auth.verifyToken, (req, res, next)=>{
    new Promise((resolve, reject) =>{        
        postController.updatePost(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/post');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.get('/delete/:id', auth.verifyToken, (req, res, next)=>{
    new Promise((resolve, reject) => {
        postController.deletePost(req, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/post');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

module.exports = router;