#!/usr/bin/env node

const { getStats } = require('./functions');
const mdLinks = require('./index');
const args = process.argv.slice(2);
//console.log('Args:', args); 
const userPath = args[0];
const validate = args.includes('--validate');
const stats = args.includes('--stats');

mdLinks(userPath, { validate: validate, stats: stats })
  .then((result) => {
    if (stats) {
      const resultStats = getStats ( result, validate )
      console.log ( "Estas son las estadísticas", resultStats );
    }else {
      console.log("Esta es la respuesta", result);
    }
  })
  .catch((err) => {
    console.error("Este es el error", err);
  });

