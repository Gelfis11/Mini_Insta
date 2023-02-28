const getDB = require('../../getDB');
const {generateError} = require('../../../helpers');

const updateUserQuery = async ( name,  email, id_user) => {
    let connection;
    try {
        connection = await getDB();
        if(name){
            const [users] = await connection.query(
                `SELECT id FROM users WHERE name = ? `,
                [name]
            );
            if(users.length > 0){
                generateError('Nombre de usuario no disponible', 403);
            }
            await connection.query(`UPDATE users SET name = ? WHERE id = ?`,[
                name,
                id_user,
            ]);

        }

        if(email){
            const [users] = await connection.query(
                `SELECT id FROM users WHERE email = ?`,
                [email]
            );
            if(users.length > 0){
                generateError('Email no disponible', 403);
            }
            await connection.query(`UPDATE users SET email = ? WHERE id = ?`, [
                email,
                id_user,
            ]);
        }
        
    } finally {
        if(connection) connection.release();
    }
}
module.exports = updateUserQuery;