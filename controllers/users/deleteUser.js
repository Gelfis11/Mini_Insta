const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');
const deleteUserQuery = require('../../db/queries/users/deleteUserQuery');
const {deleteImg} = require('../../helpers');
const deletePostQuery = require('../../db/queries/posts/deletePostQuery');

const deleteUser = async (req, res, next) => {
    try {
        const user = await selectUserByIdQuery(req.user.id);

        

        if (user.avatar !== 'default.jpg') {
            await deleteImg(user.avatar);
        }

        await deletePostQuery(req.user.id);

        await deleteUserQuery(req.user.id);

        res.send({
            status: 'ok',
            message: 'usuario eliminado',
        });
    } catch (err) {
        next(err);
    }
}
module.exports = deleteUser