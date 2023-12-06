#!/usr/bin/env node
const mdLinks = require ('./index');
const [, , path, validateArg] = process.argv;

// Convierte el string 'true' a un valor booleano
const validate = validateArg === 'true';

mdLinks(path, validate)
   .then((res) => console.log("Esta es la respuesta", res))
   .catch((err) => console.log("Este es el error", err));



   
   
   
   
   mdLinks(path, validate)
     .then((res) => {
       console.log("Esta es la respuesta", res);
     })
     .catch((err) => {
       console.error("Este es el error", err);
     });
