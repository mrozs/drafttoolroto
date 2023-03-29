import { ScheduleWeek } from './h2hresult.schedule.week';
import { H2HResult } from './h2hresult';
import { Team } from './../team';
import * as Enumerable from "linq-es2015"; 

export class Schedule {
    weeks: Array<ScheduleWeek>;

    public CreateSchedule(h2hResult: H2HResult, myTeam: number, teams: Array<Team>){
        this.weeks = Enumerable.asEnumerable(h2hResult.rsMatchups)
        .Where(m => m.team1 == myTeam || m.team2 == myTeam).OrderBy(m => m.week)
        .Select(m => 
            new ScheduleWeek(m.team1, m.team2, m.team1score, m.team2score, m.week, myTeam, teams)
        ).ToArray()
        .concat(
            Enumerable.asEnumerable(h2hResult.playoffMatchups)
            .Where(m => (m.team1 == myTeam || m.team2 == myTeam) && m.team1 != null && m.team2 !=null).OrderBy(m => m.week).Select(m => 
                new ScheduleWeek(m.team1, m.team2, m.team1score, m.team2score, m.week, myTeam, teams)
            ).ToArray()
        );

        return this.weeks;
    }
}