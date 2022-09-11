import { WorkerPoolService } from './lib/service/worker-pool.service';
import { start } from './server';

start({services: [WorkerPoolService]});