const selectPostQuery = require('../../db/queries/posts/selectPostQuery');

const listPosts = async (req, res, next) => {
    try {
        const {search} = req.query;

        console.log(search)
        
        const posts = await selectPostQuery(req.user?.id, search);

    res.send({
        status: 'ok',
        data:{
            posts,
        }
    })
    } catch (err) {
        next(err)
    }
}

module.exports = listPosts; 