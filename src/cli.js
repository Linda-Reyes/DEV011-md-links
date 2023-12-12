#!/usr/bin/env node
const { validateLinks } = require('./functions');
const mdLinks = require('./index');
//const userPath = 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md';
const args = process.argv.slice(2); // Obtén los argumentos de la línea de comandos
const userPath = args[0];
const validate = args.includes('--validate');

mdLinks(userPath, validate)
  .then((res) => {
    console.log("Esta es la respuesta", res);
  })
  .catch((err) => {
    console.error("Este es el error", err);
  });