import { Service } from '@hapipal/schmervice';
import Piscina from 'piscina';
import { CalcWorkerData, CalcWorkerDataResult } from '../util/thread-workers/worker.model';

export class WorkerPoolService extends Service {

    private pool: Piscina;

    initialize() {
        this.pool = new Piscina({
            filename: new URL("../util/thread-workers/worker", import.meta.url).href
        });
    }

    async run(data: CalcWorkerData): Promise<CalcWorkerDataResult> {
        return this.pool.run(data);
    }

    teardown() {
        return this.pool.destroy();
    }

}