const getDB = require('../../getDB');
const {generateError} = require('../../../helpers');

const deleteLikeQuery = async (id_post, id_user) => {
    let connection;

    try {
        connection = await getDB();

        const [comments] = await connection.query(
            `
            SELECT id FROM comments WHERE id_post = ? AND id_user =?
            `, [id_post, id_user]
        );
        if(comments.length < 1){
            generateError('Comentario no encontrado', 404);
        }

        await connection.query(
            `
            DELETE FROM comments WHERE id_post = ? AND id_user = ?
            `, [id_post, id_user]
        );
    } finally{
        if(connection) connection.release();
    }
};
module.exports = deleteLikeQuery;