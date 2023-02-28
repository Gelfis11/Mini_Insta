const selectPostByIdQuery = require('../../db/queries/posts/selectPostByIdQuery');
const deleteCommentQuery = require('../../db/queries/posts/deleteCommentQuery');

const deleteComment = async (req, res, next) =>{
    try {
        const {id_post} = req.params;

        await selectPostByIdQuery(id_post);

        await deleteCommentQuery(id_post, req.user.id);

        res.send({
            setatus: 'ok',
            message: 'Comentario eliminado'
        })
    } catch (err) {
        next(err);
    }
};
module.exports = deleteComment;