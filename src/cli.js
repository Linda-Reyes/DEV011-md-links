const { validateLinks } = require('./functions');
const mdLinks = require('./index');
const fs = require('fs');

const userPath = 'test/prueba.md';
const [validateArg] = process.argv;

// Convierte el string 'true' a un valor booleano
const validate = validateArg === 'true';

// Lee el contenido del archivo como texto
const fileContent = fs.readFileSync(userPath, 'utf-8');

mdLinks(fileContent, validate)
  .then((res) => {
    console.log("Esta es la respuesta", res);
  })
  .catch((err) => {
    console.error("Este es el error", err);
  });