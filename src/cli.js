const mdLinks = require('./index');
const args = process.argv.slice(2);
//console.log('Args:', args); 
const userPath = args[0];
const validate = args.includes('--validate');
const stats = args.includes('--stats');

mdLinks(userPath, { validate: validate, stats: stats })
  .then((result) => {
    console.log("Esta es la respuesta", result);
  })
  .catch((err) => {
    console.error("Este es el error", err);
  });

