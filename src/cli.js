const { validateLinks } = require('./functions');
const mdLinks = require('./index');

const userPath = 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/test/prueba.md';

// Convierte el string 'true' a un valor booleano
const validateArg = process.argv.includes('--validate');
const validate = validateArg;

mdLinks(userPath, validate)
  .then((res) => {
    console.log("Esta es la respuesta", res);
  })
  .catch((err) => {
    console.error("Este es el error", err);
  });
