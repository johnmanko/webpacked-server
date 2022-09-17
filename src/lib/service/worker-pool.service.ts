import { Service } from '@hapipal/schmervice';
import Piscina from 'piscina';
import { CalcWorkerData, CalcWorkerDataResult } from '../util/thread-workers/worker.model';
import WORKER_PATH from '../util/thread-workers/worker-path.config';

export class WorkerPoolService extends Service {

    private pool: Piscina;

    initialize() {
        let url = `${WORKER_PATH}`;
        this.pool = new Piscina({
            filename: new URL(url, import.meta.url).href
        });
    }

    async run(data: CalcWorkerData): Promise<CalcWorkerDataResult> {
        return this.pool.run(data);
    }

    teardown() {
        return this.pool.destroy();
    }

}