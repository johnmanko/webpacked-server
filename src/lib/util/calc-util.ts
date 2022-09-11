import { CalcWorkerData, OPERATOR } from './thread-workers/worker.model';

export class CalcUtility {

    static calc(input: CalcWorkerData): number {
        switch (input.op) {
            case OPERATOR.ADD:
                return input.x + input.y;
            case OPERATOR.DIVIDE:
                return input.x / input.y;
            case OPERATOR.MULTIPLE:
                return input.x * input.y;
            case OPERATOR.SUBTRACT:
                return input.x - input.y;
        }
    }

}