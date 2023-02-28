const getDB = require('../../getDB');
const {generateError} = require('../../../helpers');

const selectPostByIdQuery = async (id_post, id_user) => {
    let connection;

    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
            SELECT
            P.*,
            U.name AS user,
            IFNULL(P.id_user = ?, 0) AS owner
            FROM posts P
            INNER JOIN users U ON U.id = P.id_user
            LEFT JOIN likes L ON L.id_post = P.id
            LEFT JOIN comments C ON C.id_post = P.id
            WHERE P.id = ?
            GROUP BY P.id
            `,
            [id_user, id_post]
        );

        if(posts.length < 1){
            generateError('Post no encontrado', 404);
        }
        const [likes] = await connection.query(
            `
            SELECT
            id_user AS LikedByUser
            FROM likes 
            WHERE id_post = ?
            GROUP BY id_user
            `,
            [id_post]
        );
        
        const [comments] = await connection.query(
            `
            SELECT
            id_user AS CommentedByUser,
            comment  FROM comments WHERE id_post = ?
            `,
            [id_post]
        );

        return {
            ...posts[0],
            comments,
            likes
        }
    } finally {
        if (connection) connection.release();
    }
};
module.exports = selectPostByIdQuery ;