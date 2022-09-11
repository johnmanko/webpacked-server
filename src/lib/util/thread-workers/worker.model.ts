export enum OPERATOR {
    ADD = 'ADD',
    SUBTRACT = 'SUBTRACT',
    MULTIPLE = 'MULTIPLE',
    DIVIDE = 'DIVIDE'
}

export class CalcWorkerData {
    x: number;
    y: number;
    op: OPERATOR;
}

export interface CalcResult {
    z: number
}

export class CalcWorkerDataResult {
    result: CalcResult;
    request: CalcWorkerData;
}