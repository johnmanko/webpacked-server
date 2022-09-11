import { RouteBuilder } from '../../../lib/interfaces/route-builder.interface';
import CalcPushOptions from './calc-post';

const basePath = "/api/1";

const routes: RouteBuilder = new RouteBuilder([
  {
    method: 'GET',
    path: "/calc",
    options: CalcPushOptions
  }
]);

export default RouteBuilder.buildAll(basePath, routes);
