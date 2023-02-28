const getDB = require('../../getDB');
const {generateError} = require('../../../helpers');

const inserLikeQuery = async (id_post, id_user) => {
    let connection;
    try {
        connection = await getDB();
        const [likes] = await connection.query(
            `
            SELECT id FROM likes WHERE id_post = ? AND id_user = ?
            `, [id_post, id_user]
        );

        if(likes.length > 0) {
            generateError('El usuario ya ha dado like a este post', 403);
        }
    
        await connection.query(
            `
            INSERT INTO likes (id_post, id_user) VALUES (?, ?)
            `, [id_post, id_user]
        )
    } finally {
        if(connection) connection.release();
    }
}
module.exports = inserLikeQuery;