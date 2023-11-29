#!/usr/bin/env node
const mdLinks = require ('./index');

mdLinks('README.md')
   .then((res) => console.log("Esta es la respuesta", res))
   .catch((err) => console.log("Este es el error", err));


