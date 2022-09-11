## Build & Run dev server

```
npm i
npm run build
npm run start
```

## Testing

```
$ curl -X GET "http://localhost:3000/api/1/calc?x=92&y=67&op=ADD" | jq '.'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    57  100    57    0     0   5838      0 --:--:-- --:--:-- --:--:-- 28500
{
  "result": {
    "z": 159
  },
  "request": {
    "x": 92,
    "y": 67,
    "op": "ADD"
  }
}
```

## Docker

### Build Docker image

```
docker build -t webpacked-server:0.5.0 --no-cache --progress plain -f Dockerfile ./
```
### Run docker server

```
docker run --rm -p 3000:3000 --env-file .env-docker  webpacked-server:0.5.0
```
### Run (interactive shell)
```
docker run --rm -it --entrypoint sh -p 3000:3000 --env-file .env-docker  webpacked-server:0.5.0
```

Inspecting image
```
$ docker run --rm -it --entrypoint sh -p 3000:3000 --env-file .env-docker  webpacked-server:0.5.0
/app $ ls
d935069d9ae629f24d29.ts  index.bundle.mjs         node_modules
/app $ cd node_modules/
/app/node_modules $ ls
piscina
/app/node_modules $ cd ..
/app $ ls
d935069d9ae629f24d29.ts  index.bundle.mjs         node_modules
/app $ ls -al
total 3216
drwxr-xr-x    1 root     root          4096 Sep 11 20:22 .
drwxr-xr-x    1 root     root          4096 Sep 11 20:23 ..
-rw-r--r--    1 node     node           247 Sep 11 20:22 d935069d9ae629f24d29.ts
-rw-r--r--    1 node     node       3276531 Sep 11 20:22 index.bundle.mjs
drwxr-xr-x    3 node     node          4096 Sep 11 20:22 node_modules
/app $ more d935069d9ae629f24d29.ts
import { CalcUtility } from '../calc-util';
export default async function run(data) {
    let result = {
        result: {
            z: 0
        },
        request: data
    };
    result.result.z = CalcUtility.calc(data);
    return result;
}
/app $ 
```

Runnning images:
```
$ docker run --rm -p 3000:3000 --env-file .env-docker  webpacked-server:0.5.0
{
  NODE_VERSION: '18.3.0',
  HOSTNAME: 'a618450fe91e',
  YARN_VERSION: '1.22.19',
  SHLVL: '1',
  HOME: '/home/node',
  PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
  SERVER_HOST: '0.0.0.0',
  PWD: '/app',
  SERVER_PORT: '3000',
  NODE_ENV: 'development'
}
http://0.0.0.0:3000
method  path         description
------  -----------  -----------
GET     /api/1/calc  Calculate  

Server running at: http://0.0.0.0:3000
process.cwd = : /app

node:internal/event_target:908
  process.nextTick(() => { throw err; });
                           ^
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /app/d935069d9ae629f24d29.ts
    at new NodeError (node:internal/errors:377:5)
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:80:11)
    at defaultGetFormat (node:internal/modules/esm/get_format:122:38)
    at defaultLoad (node:internal/modules/esm/load:21:20)
    at ESMLoader.load (node:internal/modules/esm/loader:431:26)
    at ESMLoader.moduleProvider (node:internal/modules/esm/loader:350:22)
    at new ModuleJob (node:internal/modules/esm/module_job:66:26)
    at #createModuleJob (node:internal/modules/esm/loader:369:17)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:328:34)
    at async Promise.all (index 0)
Emitted 'error' event on Piscina instance at:
    at EventEmitterReferencingAsyncResource.runInAsyncScope (node:async_hooks:202:9)
    at Piscina.emit (/app/node_modules/piscina/node_modules/eventemitter-asyncresource/dist/src/index.js:30:35)
    at Worker.<anonymous> (/app/node_modules/piscina/dist/src/index.js:471:38)
    at Worker.emit (node:events:527:28)
    at [kOnErrorMessage] (node:internal/worker:289:10)
    at [kOnMessage] (node:internal/worker:300:37)
    at MessagePort.<anonymous> (node:internal/worker:201:57)
    at [nodejs.internal.kHybridDispatch] (node:internal/event_target:639:20)
    at exports.emitMessage (node:internal/per_context/messageport:23:28) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}

Node.js v18.3.0
```