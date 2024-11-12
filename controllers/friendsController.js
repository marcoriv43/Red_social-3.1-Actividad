const friends = require('../models/friendsModel');

class friendsController{

    async getFriendsOK(req, res) {
        let err ="";
        let data = [];
        try {
            const ActualUser = req.session.userId;     
            let buscarFriends = await friends.friends(ActualUser);                                                      
            let FriendsOK = new Set();
            buscarFriends.forEach(row =>{                                       
                if (row.id_users_friend1 !== parseInt(ActualUser) && row.status_friends==1) {
                    FriendsOK.add(row.id_users_friend1);
                }
                if (row.id_users_friend2 !== parseInt(ActualUser) && row.status_friends==1) {
                    FriendsOK.add(row.id_users_friend2);
                }
            });
            FriendsOK = Array.from(FriendsOK);            
            if (FriendsOK.length>0) {
                let buscarFriendsOK = await friends.friendsOK(FriendsOK);                                                      
                data = buscarFriendsOK;
                return res(err != '' ? new Error(err):null, data); 
            } else {
                data = [];
                return res(err != '' ? new Error(err):null, data); 
            }
        } catch (error) {
            console.error(error);
            err += error;
            return res(err != '' ? new Error(err):null, data);
        }
    }

    async getFriendsWait(req, res) {
        let err ="";
        let data = [];
        try {
            const ActualUser = req.session.userId;     
            let buscarFriends = await friends.friends(ActualUser);                                                      
            let friendsWait = new Set();
            buscarFriends.forEach(row =>{                                       
                if (row.id_users_friend2 !== parseInt(ActualUser) && row.status_friends==0) {
                    friendsWait.add(row.id_users_friend2);
                }
            });
            friendsWait = Array.from(friendsWait);
            if (friendsWait.length>0) {
                let buscarFriendsWait = await friends.friendsWait(friendsWait);                                                      
                data = buscarFriendsWait;
                return res(err != '' ? new Error(err):null, data); 
            } else {
                data = [];
                return res(err != '' ? new Error(err):null, data); 
            }
        } catch (error) {
            console.error(error);
            err += error;
            return res(err != '' ? new Error(err):null, data);
        }  
    }

    async getFriendsAccept(req, res) {
        let err ="";
        let data = [];
        try {
            const ActualUser = req.session.userId;     
            let buscarFriends = await friends.friends(ActualUser);                                                      
            let friendsAccept = new Set();
            buscarFriends.forEach(row =>{                                       
                if (row.id_users_friend1 !== parseInt(req) && row.status_friends==0) {
                    friendsAccept.add(row.id_users_friend1);
                }
            });
            friendsAccept = Array.from(friendsAccept);
            if (friendsAccept.length>0) {
                let buscarFriendsAccept = await friends.friendsAccept(friendsAccept);                                                      
                data = buscarFriendsAccept;
                return res(err != '' ? new Error(err):null, data); 
            } else {
                data = [];
                return res(err != '' ? new Error(err):null, data); 
            }
        } catch (error) {
            console.error(error);
            err += error;
            return res(err != '' ? new Error(err):null, data);
        }    
    }

    async getFriendsNot(req, res) {
        let err ="";
        let data = [];
        try {
            const ActualUser = req.session.userId;     
            let buscarFriends = await friends.friends(ActualUser);                                                      
            let friendsNot = new Set();
            buscarFriends.forEach(row =>{                                       
                if (row.id_users_friend1 !== parseInt(ActualUser)) {
                    friendsNot.add(row.id_users_friend1);
                }
                if (row.id_users_friend2 !== parseInt(ActualUser)) {
                    friendsNot.add(row.id_users_friend2);
                }
            });                 
            friendsNot = Array.from(friendsNot);                                                                                           
            if (friendsNot[0]==null) {                                    
                friendsNot = [parseInt(ActualUser)];
            } else {
                friendsNot.push(parseInt(ActualUser));                      
            }                                
            if (friendsNot.length>0) {
                let buscarFriendsNot = await friends.friendsNot(friendsNot);                                                      
                data = buscarFriendsNot;
                return res(err != '' ? new Error(err):null, data); 
            } else {
                data = [];
                return res(err != '' ? new Error(err):null, data); 
            }
        } catch (error) {
            console.error(error);
            err += error;
            return res(err != '' ? new Error(err):null, data);
        }      
    }

    async addFriends(req, res) {
        let err ="";
        let data=[];
        try {                       
            const ActualUser = req.session.userId;     
            const newFriend = {
                "id_users_friend1": ActualUser,
                "id_users_friend2": req.params.id,
                "status_friends": 0
            }
            let agregarAmistad = await friends.newFriends(newFriend);
            return res(err != '' ? new Error(err):null, data=agregarAmistad);                   
        } catch (error) {                        
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }                 
    }

    async declineFriends(req, res) {
        let err ="";
        let data=[];
        try {                       
            const ActualUser = req.session.userId;     
            const id = req.params.id;
            let borrarAmistad = await friends.declineFriends(ActualUser, id);
            return res(err != '' ? new Error(err):null, data=borrarAmistad);                   
        } catch (error) {                        
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }     
    }

    async acceptFriends(req, res) {
        let err ="";
        let data=[];
        try {                       
            const ActualUser = req.session.userId;     
            const id = req.params.id;
            const accept = {
                "status_friends": 1
            }
            let newAmistad = await friends.acceptFriends(ActualUser, id, accept);
            return res(err != '' ? new Error(err):null, data=newAmistad);                   
        } catch (error) {                        
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        } 
    }
}

module.exports = new friendsController();