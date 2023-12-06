const { 
  convertAbsolute,
  pathExists,
  validMdextension,
  readFileMd,
  findLinks,
  validateLinks,
} = require('./functions');

function mdLinks(path, validate = false) {
  return new Promise((resolve, reject) => {
  //-----identifica si la ruta es adsoluta, sino la convierte-----
  const absolutePath = convertAbsolute(path);
  // -----identifica si la ruta existe-----
  pathExists(absolutePath)
    .then(() => validMdextension(absolutePath)) 
    .then(() => readFileMd(absolutePath))
    .then(fileContent => findLinks(fileContent, absolutePath))
    //.then(links => {
    //resolve(links);
    //})
    findLinks(fileContent, absolutePath)
      .then(links => {
        if (validate) {
          // Si validate es true, realizar validación de los enlaces
          return validateLinks(links);
        } else {
          // Si validate es false, resolver la promesa con los enlaces sin validar
          resolve(links);
        }
      })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
}

module.exports = mdLinks;
