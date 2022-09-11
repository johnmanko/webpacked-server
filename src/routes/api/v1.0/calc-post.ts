import Joi from 'joi';
import Hapi from '@hapi/hapi';
import { WorkerPoolService } from '../../../lib/service/worker-pool.service';
import { CalcWorkerData, OPERATOR } from '../../../lib/util/thread-workers/worker.model';

let handler: Hapi.Lifecycle.Method = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {

  const calcRequest: CalcWorkerData = <any>request.query;

  const { workerPoolService } = request['services']();

  return (<WorkerPoolService>workerPoolService).run(calcRequest);

};

let validate: Hapi.RouteOptionsValidate = {
  query: Joi.object({
    x: Joi.number().min(1).required(),
    y: Joi.number().min(1).required(),
    op: Joi.string().allow(OPERATOR.ADD, OPERATOR.DIVIDE, OPERATOR.MULTIPLE, OPERATOR.SUBTRACT).required()
  })
};

let options: Hapi.RouteOptions = {
  description: "Calculate",
  cors: true,
  validate: validate,
  handler: handler
};

export default options;