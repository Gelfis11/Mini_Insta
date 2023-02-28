const selectPostByidQuery = require('../../db/queries/posts/selectPostByIdQuery');

const inserLikeQuery = require('../../db/queries/posts/insertLikeQuery');

const newLike = async (req, res, next) => {
    try {
        const { id_post } = req.params; 

        await selectPostByidQuery(id_post);

        await inserLikeQuery(id_post, req.user.id);

        res.send({
            status: 'ok',
            message: 'Like agregado'
        })
    } catch (err) {
        next(err);
    }
};

module.exports = newLike;