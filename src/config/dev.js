'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  signalr: 'http://localhost:18939/signalr',
  service: 'http://localhost:18939/api/opc'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
