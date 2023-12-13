const fs = require('fs');
const path = require('path');
const axios = require('axios');
const userPath = 'test/prueba.md';


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

// -----funcion extraer link y crear array-----
function findLinks(content, filePath) {
   return new Promise((resolve, reject) => {
     const links = [];
     const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
     let match;

     while ((match = regex.exec(content)) !== null) {
        links.push({
           text: match[1],
           href: match[2],
           file: filePath,
        });
     }

     resolve(links);
  });
}

function validateLinks(links, validate, stats) {
  const linkPromises = links.map((link, index) => { // Agregué el parámetro 'index'
    return axios.head(link.href)
      .then(response => {
        const validationResult = {
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
        };

        return validationResult;
      })
      .catch(error => {
        const validationResult = {
          href: link.href,
          text: link.text,
          file: link.file,
          status: error.response ? error.response.status : 404,
          ok: 'fail',
        };

        console.error(`Error enlace (${index + 1}):`, validationResult);

        return validationResult;
      });
  });

  return Promise.all(linkPromises);
}

function getStats(links, includeBroken = false) {
  const totalLinks = links.length;
  const uniqueLinks = [...new Set(links.map(link => link.href))].length;

  const stats = {
    total: totalLinks,
    unique: uniqueLinks,
  };

  if (includeBroken) {
    const brokenLinks = links.filter(link => link.ok === 'fail').length;
    stats.broken = brokenLinks;
  }

  return stats;
}

 module.exports = {
   isAbsolutePath,
   convertAbsolute,
   pathExists,
   validMdextension,
   readFileMd,
   findLinks,
   validateLinks,
   getStats
 };

 