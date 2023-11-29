const mdLinks = require('../src/index');


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
