const { validateLinks } = require('./functions');
const mdLinks = require('README.md');

const userPath = 'src/index.js';

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
