const fs = require('fs');
const path = require('path'); 

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // identifica si la ruta existe
    if (fs.existsSync(path)) {


      // Resuelve la promesa con algún resultado
      resolve(/* resultado */);
    }else {
      // si no existe la Ruta rechaza la promesa con un mensaje error
      reject('La ruta no existe')
    }
  })
}

module.exports = mdLinks;
