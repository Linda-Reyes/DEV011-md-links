const axios = require('axios');
const mdLinks = require('../src/index');
const { validateLinks, getStats } = require('../src/functions');
const path = require('path');

jest.mock('axios');

describe('validateLinks', () => {
  it('deberia validar links', () => {
    const links = [
      {
        href: 'https://www.google.com',
        text: 'enlace a Google',
        file: 'test/prueba.md',
      },
    ];

    const expectedResults = [
      {
        href: 'https://www.google.com',
        text: 'enlace a Google',
        file: 'test/prueba.md',
        status: 200,
        ok: 'ok',
      },
    ];

    axios.head.mockResolvedValue({ status: 200 });

    return validateLinks(links).then(results => {
      expect(results).toEqual(expectedResults);
    });
  });

  it('debería manejar errores', () => {
    const links = [
      {
        href: 'http://www.ejemplo-invalido.com',
        text: 'enlace a ejemplo-invalido.com',
        file: 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/test/prueba.md',
      },
    ];

    const expectedResults = [
      {
        href: 'http://www.ejemplo-invalido.com',
        text: 'enlace a ejemplo-invalido.com',
        file: 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/test/prueba.md',
        status: 404,
        ok: 'fail',
      },
    ];

    axios.head.mockRejectedValue({ response: { status: 404 } });

    return validateLinks(links).then(results => {
      expect(results).toEqual(expectedResults);
    });
  });
});

describe('getStats', () => {
  it('Debería calcula la estadística correctamente', () => {
      const links = [
          { href: 'https://www.google.com'},
          { href: 'https://github.com'},
      ];
      const stats = getStats(links);
      expect(stats).toEqual({ total: 2, unique: 2 });
  });
});