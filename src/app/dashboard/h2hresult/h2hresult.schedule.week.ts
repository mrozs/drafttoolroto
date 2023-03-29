import { Team } from './../team';
import * as Enumerable from "linq-es2015"; 

export class ScheduleWeek {
    opponent: string;
    myScore: number;
    opponentScore: number;
    week: number;
    result: string;

    constructor(team1: number, team2: number, team1score: number, team2score: number, week: number, myTeam: number, teams: Array<Team>){
        this.week = week;
        this.myScore = (team1 == myTeam) ? team1score: team2score;
        this.opponentScore = (team1 != myTeam) ? team1score: team2score;
        this.opponent =    (team1 == myTeam) ? 
            Enumerable.asEnumerable(teams).First(t => +t.id == team2).name  :
                Enumerable.asEnumerable(teams).Any(t => +t.id == team1) ?
                Enumerable.asEnumerable(teams).First(t => +t.id == team1).name :
                    null ;  
        this.result = (this.myScore > this.opponentScore) ? 'Win':
            (this.myScore < this.opponentScore) ? 'Loss': 'Tie';
    }
}