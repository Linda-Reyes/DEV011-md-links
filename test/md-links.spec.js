const mdLinks = require('../src/index');
const path = require('path');
const {
  isAbsolutePath,
  convertAbsolute,
  pathExists,
  validMdextension,
} = require('../src/functions');



describe('mdLinks', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('debería devolver una promesa', () => {
    const filePath = 'test/prueba.md';
    const result = mdLinks(filePath);
    expect(result).toBeInstanceOf(Promise);
  }); 
    
  it('Debería retornar una promesa que resuelve a un array de links', () => {
    const path = 'test/prueba.md';

    return mdLinks(path).then((links) => {
      expect(links).toEqual(expect.any(Array));
    });
  });

  it('Debería retornar una promesa que resuelve a un array de links con validación', () => {
    const path = 'test/prueba.md';

    return mdLinks(path, true).then((links) => {
      expect(links).toEqual(expect.any(Array));
    });
  });
});

describe('isAbsolutePath', () => {
  test('Debería retornar true para rutas absolutas', () => {
    const result = isAbsolutePath('C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md');
    expect(result).toBe(true);
  });

  test('Debería retornar false para rutas relativas', () => {
    const result = isAbsolutePath('test/prueba.md');
    expect(result).toBe(false);
  });
});

describe('convertAbsolute', () => {
  test('Debería retornar la ruta absoluta si ya es absoluta', () => {
    const ruta = 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/test/prueba.md';
    const result = convertAbsolute(ruta);
    expect(result).toBe(ruta);
  });

  test('Debería retornar la ruta convertida a absoluta si es relativa', () => {
    const rutaRelativa = 'test/prueba.md';
    const rutaAbsoluta = path.resolve(rutaRelativa);
    const result = convertAbsolute(rutaRelativa);
    expect(result).toBe(rutaAbsoluta);
  });
});

describe('pathExists', () => {
  test('Debería resolver para rutas existentes', () => {
    const rutaExistente = 'test/prueba.md';
    return expect(pathExists(rutaExistente)).resolves.toBe('La ruta existe');
  });

  test('Debería rechazar para rutas que no existen', () => {
    const rutaNoExistente = 'test/prueba.xyz';
    return expect(pathExists(rutaNoExistente)).rejects.toThrow('La ruta no existe');
  });
});

describe('validMdextension', () => {
  test('Debería resolver para archivos Markdown válidos', () => {
    const archivoMd = 'test/prueba.md';
    return expect(validMdextension(archivoMd)).resolves.toBe('Es un archivo Markdown');
  });

  test('Debería rechazar para archivos que no son Markdown', () => {
    const archivoNoMd = 'archivo.txt';
    return expect(validMdextension(archivoNoMd)).rejects.toThrow('No es un archivo Markdown');
  });
});


