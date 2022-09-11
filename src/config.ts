import DotEnv from 'dotenv';

const ENV_VARIABLES = {
  NODE_ENV: 'NODE_ENV',
  SERVER_HOST: 'SERVER_HOST',
  SERVER_PORT: 'SERVER_PORT',
  DOTENV_PATH: 'DOTENV_PATH'
}

const nodeEnv = process.env[ENV_VARIABLES.NODE_ENV];

if (nodeEnv === 'development' || nodeEnv === 'test') {
  DotEnv.config({ path: process.env[ENV_VARIABLES.DOTENV_PATH]});
  console.log(process.env);
}

const ENV_VALUES = {
  NODE_ENV: process.env[ENV_VARIABLES.NODE_ENV],
  SERVER_HOST: process.env[ENV_VARIABLES.SERVER_HOST] || 'localhost',
  SERVER_PORT: process.env[ENV_VARIABLES.SERVER_PORT] || 3000
}

/**  HELPER FUNCTIONS **/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe?
    return val;
  }

  return (port >= 0) ? port : 0;
}

/**  SETUP **/
const dirname = process.cwd();

export const Configuration = {
  server: {
    connection: {
      host: ENV_VALUES.SERVER_HOST,
      port: normalizePort(ENV_VALUES.SERVER_PORT),
    },
  },
  app: {}
};
