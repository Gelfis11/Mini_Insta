const insertPostQuery = require('../../db/queries/posts/insertPostQuery');

const { generateError, saveImg } = require('../../helpers');

const newPost = async (req, res, next) => {
    try {
        let image ;
        if(req.files?.image){
            image = await saveImg(req.files.image, 500);
        }else {
            generateError('Tienes que subir una imagen', 400);
        }
        const {text} = req.body;

        const post = await insertPostQuery(image, text, req.user.id);

        res.send ({
            status: 'ok',
            data: {
                post,
            }
        })
        
    } catch (err) {
        next(err);
    }
}
module.exports = newPost;