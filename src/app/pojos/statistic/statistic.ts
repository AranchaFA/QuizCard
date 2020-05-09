export class Statistic {
    ////////////////
    // ATTIRBUTES //
    ////////////////
    userID: string; // It could be User object ?¿
    answered: number;
    success: number;

    /////////////
    // METHODS //
    /////////////
    // We will assign userID after instantiate
    constructor() { }

    initAttributes(userID: string) {
        this.userID = userID;
        this.answered = 0;
        this.success = 0;
    }

    getSuccessPercentage(): number {
        return this.answered > 0 ? this.success / this.answered : 0;
    }
}
