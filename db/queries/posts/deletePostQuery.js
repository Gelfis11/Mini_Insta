const getDB = require('../../getDB');

const deletePostQuery = async (id_post) => {
    let connection;
    try {
        connection = await getDB();

        await connection.query(
            `
            DELETE FROM likes WHERE id_post = ?
            `,[id_post]
        );

        await connection.query(
            `
            DELETE FROM comments WHERE id_post = ?
            `,[id_post]
        );

        await connection.query(
            `
            DELETE FROM posts WHERE id = ?
            `, [id_post]
        )
    } finally {
        if(connection) connection.release();
    }
};
module.exports = deletePostQuery;