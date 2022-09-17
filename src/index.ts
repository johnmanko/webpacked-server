import * as Schmervice from '@hapipal/schmervice';
import { WorkerPoolService } from './lib/service/worker-pool.service';
import { start } from './server';

start({
    services: [
        Schmervice.withName('workerPoolService', WorkerPoolService)
    ]
});