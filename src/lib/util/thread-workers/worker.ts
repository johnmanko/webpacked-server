import { CalcUtility } from '../calc-util';
import { CalcWorkerData, CalcWorkerDataResult } from './worker.model';

export default async function run(data: CalcWorkerData): Promise<CalcWorkerDataResult> {
  
  let result: CalcWorkerDataResult = {
    result: {
      z: 0
    },
    request: data
  }

  result.result.z = CalcUtility.calc(data);

  return result;

}