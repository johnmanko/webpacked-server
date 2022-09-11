import Lab from '@hapi/lab';
import Code from '@hapi/code';
import { init } from '../src/server';
import { WorkerPoolService } from '../src/lib/service/worker-pool.service';
import { CalcWorkerDataResult, OPERATOR } from '../src/lib/util/thread-workers/worker.model';

export const lab = Lab.script();

const API = {
    GET_CALC: '/api/1/calc'
};

const validatePayload = (res, expectedValue: number) => {
    let payload: CalcWorkerDataResult = JSON.parse(res.payload);
    Code.expect(payload).to.be.an.object();
    Code.expect(payload.result.z).to.equal(expectedValue);
};

lab.experiment('Test Calc', () => {

    let server;

    lab.before(async () => {
        server = await init({services: [WorkerPoolService]});
    });

    lab.after(async () => {
        await server.stop();
    });

    lab.test(`Add numbers 2 and 6 ${API.GET_CALC}`, async () => {
        const res = await server.inject({
            method: 'get',
            url: API.GET_CALC.concat(`?x=2&y=6&op=${OPERATOR.ADD}`)
        });
        Code.expect(res.statusCode).to.equal(200);
        validatePayload(res, 8);
    });

});

