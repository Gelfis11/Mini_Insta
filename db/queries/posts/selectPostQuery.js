const getDB = require('../../getDB');

const selectPostQuery = async (id_user, keyword = '') => {
    let connection; 
    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
            SELECT 
                    P.*,
                    BIT_OR(L.id_user = ?) AS likedByMe,
                    U.name AS user,
                    IFNULL(P.id_user = ?, 0) AS owner
                FROM posts P
                INNER JOIN users U ON U.id = P.id_user
                LEFT JOIN likes L ON L.id_post = P.id
                LEFT JOIN comments C ON C.id_post = P.id
                WHERE P.text LIKE ?
                GROUP BY P.id
                ORDER BY P.created_at DESC
            `,
            [id_user, id_user, `%${keyword}%`]
        );

        for (const post of posts) {
            const [likes] = await connection.query(
                `
                SELECT
                id_user AS LikedByUser
                FROM likes 
                WHERE id_post = ?
                GROUP BY id_user
                `,
                [id_user]
            );
    
            const [comments] = await connection.query(
                `
                SELECT
                id_user AS CommentedByUser,
                comment FROM comments WHERE id_post = ?
                `,
                [id_user]
            );

            
            post.likes = likes
            post.comments = comments
        }

        

        
        return {
            posts,
            
        };
    } finally {
        if(connection) connection.release();
    }
};
module.exports = selectPostQuery;