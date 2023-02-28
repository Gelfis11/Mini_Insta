const getDB = require('../../getDB');

const {generateError} = require('../../../helpers');

const deleteLikeQuery = async (id_post, id_user) => {
    let connection;

    try {
        connection = await getDB();

        const [likes] = await connection.query(
            `
            SELECT id FROM likes WHERE id_post = ? AND id_user =?
            `, [id_post, id_user]
        );
        if(likes.length < 1){
            generateError('Like no encontrado', 404);
        }

        await connection.query(
            `
            DELETE FROM likes WHERE id_post = ? AND id_user = ?
            `, [id_post, id_user]
        );
    } finally{
        if(connection) connection.release();
    }
};
module.exports = deleteLikeQuery;