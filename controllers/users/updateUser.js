const updateUserQuery = require ('../../db/queries/users/updateUserQuery');
const { generateError } = require ('../../helpers');

const updateUser = async (req, res, next) => {
    try {
        let { name, email} = req.body; 
        if (!name && !email) {
            generateError('Faltan campos', 400);
        }

        await updateUserQuery( name, email, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado'
        });

    } catch (err) {
        next(err); 
    }
}
module.exports = updateUser;