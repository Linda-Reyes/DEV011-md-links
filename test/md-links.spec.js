const mdLinks = require('../src/index');
const {
  convertAbsolute,
  pathExists,
  validMdextension,
  readFileMd,
  findLinks,
} = require('./functions');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
});

describe('mdLinks', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('debería devolver una promesa', () => {
    const filePath = 'README.md';
    const result = mdLinks(filePath);
    expect(result).toBeInstanceOf(Promise);
  }); 
    
  it('debe rechazar cuando el path no existe ', () => {
    //expect(typeof mdLinks).toBe('Promise');
    return mdLinks('/documentos/prueba/noexiste.md').catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });
});



describe('mdLinks', () => {
  test('Debería retornar una promesa que resuelve a un array de links', () => {
    // Puedes realizar pruebas aquí para mdLinks sin validar los enlaces
    const path = 'README.md';

    return mdLinks(path).then((links) => {
      expect(links).toEqual(expect.any(Array));
      // Añade más aserciones según tus necesidades
    });
  });

  test('Debería retornar una promesa que resuelve a un array de links con validación', () => {
    // Puedes realizar pruebas aquí para mdLinks con validación de enlaces
    const path = 'README.md';

    return mdLinks(path, true).then((links) => {
      expect(links).toEqual(expect.any(Array));
    });
  });

});
