export class LeagueCalendarGame {
    team1: string;
    team2: string;
    date: Date;
    week: number;

    constructor(date: Date, team1: string, team2: string, week: number) {
        this.date = date;
        this.team1 = team1;
        this.team2 = team2;
        this.week = week;
    }
}