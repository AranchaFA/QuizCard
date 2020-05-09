import { Statistic } from '../statistic/statistic';

export class Card {
    ////////////////
    // ATTIRBUTES //
    ////////////////
    id: string;
    question: string;
    answer: string;

    /////////////
    // METHODS //
    /////////////
    // We will assign attributes after instantiate (add a statistic for each user!)
    constructor() { }

    initAttributes(id: string, question: string, answer: string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }

}
