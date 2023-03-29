import { DraftResult } from './draft.result';

export class DraftResultItem {
    constructor(public result: DraftResult, public slots: number, public week: number) {
    }
}