#!/usr/bin/env node
const {
  convertAbsolute,
  pathExists,
  validMdextension,
  readFileMd,
  findLinks,
  validateLinks,
} = require('./functions');

function mdLinks(userPath, options = {}) {
  const { validate = false } = options;

  return new Promise((resolve, reject) => {
    const absolutePath = convertAbsolute(userPath);

    pathExists(absolutePath)
      .then(() => validMdextension(absolutePath))
      .then(() => readFileMd(absolutePath))
      .then(fileContent => findLinks(fileContent, absolutePath))
      .then(links => {
        if (validate) {
          resolve (validateLinks(links, validate ));
        } else {
          resolve (links);
        }
      })
      
      .catch(error => reject(error));
  });
}

module.exports = mdLinks;
