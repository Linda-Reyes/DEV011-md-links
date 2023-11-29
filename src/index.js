const { 
  convertAbsolute,
  pathExists,
  validMdextension,
  readFileMd,
} = require('./functions');

function mdLinks(path) {
 return new Promise((resolve, reject) => {
  //-----identifica si la ruta es adsoluta, sino la convierte-----
  const absolutePath = convertAbsolute(path);
  // -----identifica si la ruta existe-----
  pathExists(absolutePath)
     .then(() => validMdextension(absolutePath))
     .then(() => readFileMd(absolutePath))
     .then(fileContent => {
      resolve(fileContent);
    })
     .catch((error) => {
        reject(error)
     });
});
};

module.exports = mdLinks;
