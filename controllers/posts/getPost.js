const selectPostByIdQuery = require('../../db/queries/posts/selectPostByIdQuery');

const getPost = async (req, res, next) => {
    try {
        const {id_post} = req.params;

        const post = await selectPostByIdQuery (id_post, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                post
            }
        })
    } catch (err) {
        next(err);
    }
};
module.exports = getPost;