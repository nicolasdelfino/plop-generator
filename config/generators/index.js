/**
* generator/index.js
*
* Exports the generators so plop knows them
*/

const fs = require('fs');
const path = require('path');
const generator = require('./components/index.js');

module.exports = (plop) => {
  plop.setGenerator('the generator', generator);
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../../app/components/${comp}`), fs.F_OK);
      return `components/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
