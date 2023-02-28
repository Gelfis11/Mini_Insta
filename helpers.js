const nodemailer = require("nodemailer");
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

const { SMTP_USER, SMTP_PASS, UPLOADS_DIR } = process.env;

const transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

/**
 * ###############
 * ## Send Mail ##
 * ###############
 */

const sendMail = async (to, subject, text) => {
  try {
    await transport.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error(err);
    generateError("Error al enviar el email de verificación");
  }
};
/**
 * ################
 * ## Save Image ##
 * ################
 */
const saveImg = async(img, resizePx) => {
  //ruta absoluta para las imgs
  const uploadsPath = path.join(__dirname, UPLOADS_DIR);

  try {
    //acceder al directorio
    await fs.access(uploadsPath)
  } catch {
    //si no, crear el directorio
    await fs.mkdir(uploadsPath);
  }

  const sharpImg = sharp(img.data); // por que el .data?
  sharpImg.resize(resizePx);

  //nombre unico 
  const imgName = `${uuid()}.jpg`;
  //ruta absoluta para la imagen
  const imgPath = path.join(uploadsPath, imgName);
  // guardar imagen en le directorio
  await sharpImg.toFile(imgPath);

  return imgName;
}

/**
 * ##################
 * ## delete Image ##
 * ##################
 */

const deleteImg = async (imgName) => {
  try {


    const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);
    console.log(imgPath)

    await fs.unlink(imgPath);

    } catch (error) {
      generateError('Error al eliminar la imagen del servidor')
  }
};

module.exports = {
  generateError,
  sendMail,
  saveImg,
  deleteImg,
};
