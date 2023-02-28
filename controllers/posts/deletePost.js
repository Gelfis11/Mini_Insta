const selectPostByIdQuery = require('../../db/queries/posts/selectPostByIdQuery');
const deletePostQuery = require('../../db/queries/posts/deletePostQuery');

const { generateError, deleteImg } = require('../../helpers');

const deletePost = async (req, res, next) => {
    try {
        const {id_post} = req.params;

        const post = await selectPostByIdQuery(id_post);
console.log(post.image)
        if(post.id_user !== req.user.id){
            generateError('No tienes suficientes permisos', 401);
        }
        if(post.image){
            await deleteImg(post.image);
        }

        await deletePostQuery(id_post);

        res.send({
            status:'ok',
            message: 'Post eliminado'
        })
    } catch (err) {
        next(err)
    }

};
module.exports = deletePost;