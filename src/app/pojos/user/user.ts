import { Statistic } from '../statistic/statistic';

export class User {
    ////////////////
    // ATRIBUTTES //
    ////////////////
    id: string;
    avatarURL: string;
    lastLogging: Date;
    dateRegistry: Date;
    statistic: Statistic;
    // Maybe puntuation, global statistics, ...

    /////////////
    // METHODS //
    /////////////
    constructor() { }

    initAttributes(id:string){
        // Take here timestamp for dateRegistry
        // First time, lastLogging=dateRegistry
        // By default, we assign a standard avatar to every new user
        this.id=id;
        this.statistic=new Statistic();
        this.statistic.initAttributes(this.id);
    }
}
