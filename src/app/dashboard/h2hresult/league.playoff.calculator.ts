import { LeagueCalendarGame } from "../league.calendar/league.calendar.game";
import { Team } from "../team";

export class LeaguePlayoffCalculator {
    playoffWeekNumbers: Object;
    teamPlayoffGames: Object;

    public CalculatePlayoffWeeks(lastWeek: number, playoffSpots: number){
        this.playoffWeekNumbers = new Object();
        this.playoffWeekNumbers["f"] = (playoffSpots>0) ? +lastWeek: -1;
        this.playoffWeekNumbers["s"] = (playoffSpots>2) ? lastWeek-1: -1;
        this.playoffWeekNumbers["q"] = (playoffSpots>4) ? lastWeek-2: -1;
    }

    public CalculateTeamPlayoffGames(calendar: Array<LeagueCalendarGame>){
        this.teamPlayoffGames = new Object();
        if(this.playoffWeekNumbers["q"] > -1){
            calendar.filter(c => c.week == this.playoffWeekNumbers["q"]).forEach(team => {
                if(!this.teamPlayoffGames[team.team1]) {
                    this.teamPlayoffGames[team.team1] = new Object();
                }
                if(!this.teamPlayoffGames[team.team1]["q"]){
                    this.teamPlayoffGames[team.team1]["q"] = 1;
                }
                else {
                    this.teamPlayoffGames[team.team1]["q"]++;
                }
            });
        }

        if(this.playoffWeekNumbers["s"] > -1){
            calendar.filter(c => c.week == this.playoffWeekNumbers["s"]).forEach(team => {
                if(!this.teamPlayoffGames[team.team1]) {
                    this.teamPlayoffGames[team.team1] = new Object();
                }
                if(!this.teamPlayoffGames[team.team1]["s"]){
                    this.teamPlayoffGames[team.team1]["s"] = 1;
                }
                else {
                    this.teamPlayoffGames[team.team1]["s"]++;
                }
            });
        }

        if(this.playoffWeekNumbers["f"] > -1){
            calendar.filter(c => c.week == this.playoffWeekNumbers["f"]).forEach(team => {
                if(!this.teamPlayoffGames[team.team1]) {
                    this.teamPlayoffGames[team.team1] = new Object();
                }
                if(!this.teamPlayoffGames[team.team1]["f"]){
                    this.teamPlayoffGames[team.team1]["f"] = 1;
                }
                else {
                    this.teamPlayoffGames[team.team1]["f"]++;
                }
            });
        }
    }
}