const axios = require('axios');
const mdLinks = require('./index');
const { validateLinks } = require('./functions');

jest.mock('axios');

describe('validateLinks', () => {
  it('should validate links', async () => {
    const links = [
      { href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      file: 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md'
      },
    ];

    const expectedResults = [
      { href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      file: 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md',
      status: 200,
      ok: 'ok' },
    ];

    expectedResults.forEach((result, index) => {
      axios.head.mockResolvedValue({ status: result.status });
    });

    const results = await validateLinks(links);

    expect(results).toEqual(expectedResults);
  });

  it('should handle errors', async () => {
    const links = [
      { href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md' },
    ];

    const expectedResults = [
      { href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'C:/Users/juan/Desktop/LABORATORIA/DEV011-md-links/README.md',
      status: 404,
      ok: 'fail' },
    ];

    expectedResults.forEach((result, index) => {
      axios.head.mockResolvedValue({ status: result.status });
    });

    const results = await validateLinks(links);

    expect(results).toEqual(expectedResults);
  });
});