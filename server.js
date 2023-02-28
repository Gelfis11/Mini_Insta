require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());


/**
 * ##############################
 * ## Controladores de Usuario ##
 * ##############################
 */

const { createUser, loginUser, getOwnUser, updateUser, deleteUser } = require("./controllers/users");

const {newPost, listPosts, getPost, newLike, deleteLike, deletePost, newComment, deleteComment} = require('./controllers/posts');

const isAuth = require("./middlewares/isAuth");
const isAuthOptional = require("./middlewares/isAuthOptional");


// ENDPONITS USER
app.post("/users", createUser);

app.post("/users/login", loginUser);
app.get("/users", isAuth, getOwnUser);
app.put("/users/profile", isAuth, updateUser);
app.delete("/users", isAuth, deleteUser);

//ENDPONITS POST
app.post('/posts', isAuth, newPost);
app.get('/posts', isAuthOptional, listPosts);
app.get('/posts/:id_post', isAuthOptional, getPost);
app.post('/posts/:id_post/like', isAuth, newLike);
app.delete('/posts/:id_post/like', isAuth, deleteLike);
app.delete('/posts/:id_post', isAuth, deletePost);
app.post('/posts/:id_post/comment', isAuth, newComment);
app.delete('/posts/:id_post/comment', isAuth, deleteComment);





// Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });
});
// Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
