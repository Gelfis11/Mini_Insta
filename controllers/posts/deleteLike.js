const selectPostByIdQuery = require('../../db/queries/posts/selectPostByIdQuery');
const deleteLikeQuery = require('../../db/queries/posts/deleteLikeQuery');

const deleteLike = async (req, res, next) =>{
    try {
        const {id_post} = req.params;

        await selectPostByIdQuery(id_post);

        await deleteLikeQuery(id_post, req.user.id);

        res.send({
            setatus: 'ok',
            message: 'Like eliminado'
        })
    } catch (err) {
        next(err);
    }
};
module.exports = deleteLike;