const post = require('../models/postModel');

class PostController {

    // Listar todas las publicaciones
    async getPosts(req, res) {
        let err ="";
        let data = [];                        
        try {                       
            const ActualUser = req.session.userId;     
            let buscarFriends = await post.obtenerFriends(ActualUser);                               
            let buscarPost = await post.obtenerPosts(buscarFriends);
            return res(err != '' ? new Error(err):null, data=buscarPost);                   
        } catch (error) {                        
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }       
    }

    // Crear una nueva publicación
    async createPost(req, res) {
        let err ="";
        let data=[];
        try {
            const { title, description, url } = req.body;        
            const ActualUser = req.session.userId;
            let newPost = {
            "title_post": title,
            "description_post": description,
            "url_post": url,
            "id_users_post": ActualUser
            }
            let crearPost = await post.crearPosts(newPost);
            return res(err != '' ? new Error(err):null, data=crearPost);                   
        } catch (error) {
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }                
    }

    
    // Editar una publicación
    async getUpdatePost(req, res) {
        let err = "";
        let data = [];
        try {                       
            const id = req.params.id;            
            let buscarPost = await post.editarPosts(id);
            return res(err != '' ? new Error(err):null, data=buscarPost);                   
        } catch (error) {                        
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }                             
    }

    // Editar una publicación
    async updatePost(req, res) {
        let err = "";
        let data = [];
        try {
            const id = req.params.id;
            const {title, description, url} = req.body;
            let newPost = {
                "title_post": title,
                "description_post": description,
                "url_post": url
            }         
            let actualizarPost = await post.actualizarPosts(newPost,id);
            return res(err != '' ? new Error(err):null, data=actualizarPost);                   
        } catch (error) {
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }           
    }

    // Eliminar una publicación
    async deletePost(req, res) {
        let err ="";
        let data=[];
        try {
            const id = req.params.id;
            let borrarPost = await post.borrarPosts(id);
            return res(err != '' ? new Error(err):null, data=borrarPost);                   
        } catch (error) {
            console.error(error);
            err += error;
            res(err != '' ? new Error(err):null, data);
        }           
    }

}

module.exports = new PostController();