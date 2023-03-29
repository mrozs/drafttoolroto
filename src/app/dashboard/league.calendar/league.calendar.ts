

import { LeagueCalendarGame } from '../league.calendar/league.calendar.game';


export class LeagueCalendar {
    public games = new Array<LeagueCalendarGame>();

    addGame(game: LeagueCalendarGame) {
        this.games.push(game);
    }

    gameDay(team: string, gameDate: Date): LeagueCalendarGame {
        var todaysGame = this.games.filter(function (el){
            return el.date == gameDate && (el.team1 == team || el.team2 == team);
        });
        
        return todaysGame ? todaysGame[0]: null;
    }
}