'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  signalr: '/signalr',
  service: '/api/opc'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
