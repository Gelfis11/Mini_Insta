const newPost = require('../posts/newPost');
const listPosts = require('../posts/listPosts');
const getPost = require('../posts/getPost');
const newLike = require('../posts/newLike')
const deleteLike = require('../posts/deleteLike');
const deletePost = require('../posts/deletePost');
const newComment = require('../posts/newComment');
const deleteComment = require('../posts/deleteComment');



module.exports = {
    newPost,
    listPosts,
    getPost,
    newLike,
    deleteLike,
    deletePost,
    newComment,
    deleteComment,
}