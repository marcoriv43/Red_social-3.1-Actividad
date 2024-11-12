const admin = require('../models/adminModel');

class adminController {

    async getUsers(req, res) {
        let err ="";
        let data = []; 
        try {
            const ActualUser = req.session.typeUser;
            let obtenerUsuarios = await admin.obtenerUsuarios(ActualUser);
            return res(err != '' ? new Error(err):null, data=obtenerUsuarios); 
        } catch (error) {
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }
    }

    async banearUsers(req, res) {
        let err ="";
        let data = []; 
        try {
            const id = req.params.id;            
            let BenearUsuario = await admin.modificarUsuarios(id, "banned");
            return res(err != '' ? new Error(err):null, data=BenearUsuario); 
        } catch (error) {
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }
    }

    async desBanearUsers(req, res) {
        let err ="";
        let data = []; 
        try {
            const id = req.params.id;
            let desBenearUsuario = await admin.modificarUsuarios(id, "client");
            return res(err != '' ? new Error(err):null, data=desBenearUsuario); 
        } catch (error) {
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }
    }
}


module.exports = new adminController();