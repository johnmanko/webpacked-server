import Hapi, { ServerOptions } from '@hapi/hapi';
import Blipp from 'blipp';
import Schmervice from '@hapipal/schmervice';
import { Configuration } from './config';
import Routes from './routes/routes';

export interface BootOptions {
  services: Schmervice.Service[]
}

let server = Hapi.server(<ServerOptions>Configuration.server.connection);

const internals: any = {};

internals.logError = (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
}
internals.prepare = async (options: BootOptions) => {

  await server.register([
    { plugin: Schmervice.plugin},
    { plugin: Blipp },
  ]);

  server['registerService'](options.services);
  server.route(Routes);

}

export let init = async (options: BootOptions) => {
  await internals.prepare(options);
  await server.initialize();
  return server;
};

export let start = async (options: BootOptions) => {
  await internals.prepare(options);
  await server.start().catch(internals.logError);
  console.log('Server running at:', server.info.uri);
  console.log('process.cwd = :', process.cwd());
};

