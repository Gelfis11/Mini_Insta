const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const insertCommentQuery = async (id_post, id_user, comment) => {
    let connection;

    try {
        connection = await getDB();

     
        const [comments] = await connection.query(
            `SELECT comment FROM comments WHERE id_post = ? AND id_user = ?`,
            [id_post, id_user]
        );

       
        if (comments.length > 2) {
            generateError('El usuario ya ha comentado 3 veces este post', 403);
        }

        await connection.query(
            `INSERT INTO comments (id_post, id_user, comment) VALUES (?, ?, ?)`,
            [id_post, id_user, comment]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertCommentQuery;