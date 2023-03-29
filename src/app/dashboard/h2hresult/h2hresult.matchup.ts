import { H2HResult } from "./h2hresult";
import { TeamRanking } from "../team.ranking";

export class H2hResultMatchup {
    team1: number;
    team2: number;
    teamStats1: Object;
    teamStats2: Object;
    teamTotals1: Object;
    teamTotals2: Object;
    team1RatioElements: Object;
    team2RatioElements: Object;
    week: number;
    team1standing: number;
    team2standing: number;
    team1score: number;
    team2score: number;
    team1name: string;
    team2name: string;
    team1place: number;
    team2place: number;

    constructor(teamStats1: Object, teamStats2: Object, team1: number, team2: number, week: number, team1standing: number, team2standing: number) {
        this.teamStats1 = teamStats1;
        this.teamStats2 = teamStats2;
        this.team1 = team1;
        this.team2 = team2;
        this.week = week;
        this.team1standing = team1standing;
        this.team2standing = team2standing;
    }

}