const { isAbsolutePath } = require('./functions');

describe('isAbsolutePath', () => {
  test('Debería retornar true para rutas absolutas', () => {
    const result = isAbsolutePath('C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md');
    expect(result).toBe(true);
  });

  test('Debería retornar false para rutas relativas', () => {
    const result = isAbsolutePath('README.md');
    expect(result).toBe(false);
  });
});

const { convertAbsolute } = require('./functions');
const path = require('path');

describe('convertAbsolute', () => {
  test('Debería retornar la ruta absoluta si ya es absoluta', () => {
    const ruta = 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md';
    const result = convertAbsolute(ruta);
    expect(result).toBe(ruta);
  });

  test('Debería retornar la ruta convertida a absoluta si es relativa', () => {
    const rutaRelativa = 'README.md';
    const rutaAbsoluta = path.resolve(rutaRelativa);
    const result = convertAbsolute(rutaRelativa);
    expect(result).toBe(rutaAbsoluta);
  });
});

const { pathExists } = require('./functions');

describe('pathExists', () => {
  test('Debería resolver para rutas existentes', () => {
    const rutaExistente = 'README.md';
    return expect(pathExists(rutaExistente)).resolves.toBe('La ruta existe');
  });

  test('Debería rechazar para rutas que no existen', () => {
    const rutaNoExistente = '.README.xyz';
    return expect(pathExists(rutaNoExistente)).rejects.toThrow('La ruta no existe');
  });
});

const { validMdextension } = require('./functions');

describe('validMdextension', () => {
  test('Debería resolver para archivos Markdown válidos', () => {
    const archivoMd = 'README.md';
    return expect(validMdextension(archivoMd)).resolves.toBe('Es un archivo Markdown');
  });

  test('Debería rechazar para archivos que no son Markdown', () => {
    const archivoNoMd = 'archivo.txt';
    return expect(validMdextension(archivoNoMd)).rejects.toThrow('No es un archivo Markdown');
  });
});

const { readFileMd } = require('./functions');

describe('readFileMd', () => {
  test('Debería resolver con el contenido del archivo', () => {
    const archivoContenido = 'Contenido del archivo';
    const archivoMock = {
      readFile: jest.fn((path, encoding, callback) => {
        callback(null, archivoContenido);
      }),
    };

    return expect(readFileMd(archivoMock)).resolves.toBe(archivoContenido);
  });

  test('Debería rechazar si hay un error al leer el archivo', () => {
    const archivoMock = {
      readFile: jest.fn((path, encoding, callback) => {
        callback(new Error('Error de lectura'));
      }),
    };

    return expect(readFileMd(archivoMock)).rejects.toThrow('Error de lectura');
  });
});

const { findLinks } = require('./functions');

describe('findLinks', () => {
  test('Debería encontrar y devolver un array de links', () => {
    const contenido = '[Link 1](http://example.com) [Link 2](http://example2.com)';
    const rutaArchivo = '/ruta/absoluta/ejemplo';
    const result = findLinks(contenido, rutaArchivo);
    const expectedLinks = [
      { text: 'Link 1', href: 'http://example.com', file: rutaArchivo },
      { text: 'Link 2', href: 'http://example2.com', file: rutaArchivo },
    ];
    expect(result).toEqual(expectedLinks);
  });
});

