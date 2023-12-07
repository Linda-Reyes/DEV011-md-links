const {
  convertAbsolute,
  pathExists,
  validMdextension,
  readFileMd,
  findLinks,
  validateLinks,
} = require('./functions');

function mdLinks(userPath, validate = false) {
  return new Promise((resolve, reject) => {
    const absolutePath = convertAbsolute(userPath);
    pathExists(absolutePath)
      .then(() => validMdextension(absolutePath))
      .then(() => readFileMd(absolutePath))
      .then(fileContent => findLinks(fileContent, absolutePath))
      .then(links => {
        if (validate) {
          return validateLinks(links).then(result => resolve(result));
        } else {
          resolve(links);
        }
      })
      .catch(error => reject(error));
  });
}

module.exports = mdLinks;
