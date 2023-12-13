const {
  convertAbsolute,
  pathExists,
  validMdextension,
  readFileMd,
  findLinks,
  validateLinks,
  getStats
} = require('./functions');

function mdLinks(userPath, options = {}) {
  const { validate = false, stats = false } = options;

  return new Promise((resolve, reject) => {
    const absolutePath = convertAbsolute(userPath);

    pathExists(absolutePath)
      .then(() => validMdextension(absolutePath))
      .then(() => readFileMd(absolutePath))
      .then(fileContent => findLinks(fileContent, absolutePath))
      .then(links => {
        if (validate) {
          return validateLinks(links, validate, stats);
        } else {
          return links;
        }
      })
      .then(result => {
        if (stats) {
          const statistics = getStats(result, validate);
          resolve(statistics);
        } else {
          resolve(result);
        }
      })
      .catch(error => reject(error));
  });
}


module.exports = mdLinks;
