const createUserQuery = require("../../db/queries/users/createUserQuery");

const { generateError } = require("../../helpers");


const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      generateError("Faltan campos", 400);
    }

    await createUserQuery(name, email, password);

    res.send({
      code: 200,
      status: "ok",
      message: "Usuario creado.",
    });

  } catch (err) {
    next(err);
  }
};

module.exports = createUser;
