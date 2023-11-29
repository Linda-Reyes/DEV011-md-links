const fs = require('fs');
const path = require('path');


// -----funcion es una ruta absoluta(booleano)-----
const isAbsolutePath = (route) => path.isAbsolute(route);

// -----funcion convertir ruta a absoluta-----
const convertAbsolute = (route) => {
    return isAbsolutePath(route) ? route : path.resolve(route);
};

// -----funcion path existe-----
function pathExists(path) {
   return new Promise((resolve, reject) => {
   if (!fs.existsSync(path)) {  
      reject(new Error('La ruta no existe'))
   }else {
      resolve('La ruta existe')
   }
});
}

// -----funcion extension MD valida-----
function validMdextension(extension) {
   return new Promise((resolve, reject) => {
      const mdExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
      const pathExtension= path.extname(extension);
   if (!mdExtensions.includes(pathExtension.toLowerCase())){
      reject(new Error('No es un archivo Markdown'))
    }else {
      resolve ('Es un archivo Markdown');
    }
});
}
// -----funcion leer file-----
function readFileMd(validPath) {
   return new Promise((resolve, reject) => {
     fs.readFile(validPath, 'utf-8', (err, data) => {
       if (err) {
         reject(err);
         return;
       }
        resolve(data);
     });
   });
 }

 module.exports = {
    isAbsolutePath,
    convertAbsolute,
    pathExists,
    validMdextension,
    readFileMd,   
 };