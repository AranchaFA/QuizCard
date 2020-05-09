import { Statistic } from '../statistic/statistic';
import { Card } from '../card/card';

export class Deck {
    ////////////////
    // ATTIRBUTES //
    ////////////////
    id: string;
    name: string;
    native_language: string;
    target_language: string;
    size: number;
    totalUsers: number;
    cardIDs: Array<string>;
    userIDs: Array<string>;

    /////////////
    // METHODS //
    /////////////
    // We will assign attributes after instantiate (add a statistic for each user!)
    constructor() { }

    // We won't initialize arrays, because it would be persisted as empty arrays on Firestore, and they will be sub-collections
    initAttributes(id: string, name: string, native_language: string, target_language: string, userIDs: string[]) {
        this.id = id;
        this.name = name;
        this.native_language = native_language;
        this.target_language = target_language;
        this.size = 0;
        this.totalUsers = 1; // A deck will be created by a single user
        this.userIDs = userIDs;
        this.cardIDs = new Array<string>();
    }

}
