const selectPostByIdQuery = require('../../db/queries/posts/selectPostByIdQuery');
const insertCommentQuery = require('../../db/queries/posts/insertCommentQuery');

const newComment = async (req, res, next) => {
    try {
        const {id_post} = req.params;

        const {comment} = req.body;

        await selectPostByIdQuery(id_post);

        await insertCommentQuery(id_post, req.user.id, comment);

        res.send({
            status:'ok',
            message: 'Comentario agregado'
        })
        } catch (err) {
        next(err);
    }
};
module.exports = newComment;