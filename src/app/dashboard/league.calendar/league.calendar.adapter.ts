import { LeagueCalendar } from './league.calendar';
import { LeagueCalendarGame } from './league.calendar.game';

export class LeagueCalendarAdapter {

     static adapt(leagueCalendarJsonRepresentation: any[]): LeagueCalendar {
        const leagueCalendar = new LeagueCalendar();       
        for (let game of leagueCalendarJsonRepresentation) {
            leagueCalendar.addGame(new LeagueCalendarGame(game.data, game.home, game.away, game.weekno));
        }

        return leagueCalendar;
     }
}