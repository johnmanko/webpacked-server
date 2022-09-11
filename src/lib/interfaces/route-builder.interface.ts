import Hapi from '@hapi/hapi';

export class RouteBuilder {

  routes: Hapi.ServerRoute[];
 
  constructor(routes: Hapi.ServerRoute[]) {
    this.routes = routes;
  }

  build(basePath: string): RouteBuilder {
    this.routes.forEach((value: Hapi.ServerRoute) => {
      value.path = basePath.concat(value.path);
    });
    return this;
  }

  public static buildAll = (path: string, ...builders: RouteBuilder[]):Hapi.ServerRoute[] => builders.flatMap(b => b.build(path).routes);   
  
  public static merge(path: string, ...builders: RouteBuilder[]): RouteBuilder {
    let routes: RouteBuilder = new RouteBuilder([]);
    builders.forEach((builder) => routes.routes.push(...builder.routes));
    return routes.build(path);
  }

}