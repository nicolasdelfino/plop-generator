/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'add derp',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['type 1', 'type 2', 'type 3'],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantSpecial',
    default: true,
    message: 'Do you the special function?',
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'type 1': {
        componentTemplate = './components/templates/type1.js.hbs';
        break;
      }
      case 'type 2': {
        componentTemplate = './components/templates/type2.js.hbs';
        break;
      }
      case 'type 3': {
        componentTemplate = './components/templates/type3.js.hbs';
        break;
      }
      default: {
        componentTemplate = './components/templates/type1.js.hbs';
      }
    }

    const actions = [{
      type: 'add',
      path: '../../app/components/{{properCase name}}/index.js',
      templateFile: componentTemplate,
      abortOnFail: true,
    }];

    // If they some special feature
    if (data.wantSpecial) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/special.js',
        templateFile: './templates/special.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
