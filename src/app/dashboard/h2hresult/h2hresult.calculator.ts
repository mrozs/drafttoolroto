import * as Enumerable from 'linq-es2015';
import { Category } from '../category';
import { DraftResultItem } from '../draft.result/draft.result.item';
import { H2HResultCatCalculator } from '../h2hresult/h2hresult.cat.calculator';
import { H2hResultMatchup } from '../h2hresult/h2hresult.matchup';
import { H2HResultMatchupCalculator } from '../h2hresult/h2hresult.matchup.calculator';
import { H2HResultPlayoffs } from '../h2hresult/h2hresult.playoffs';
import { LeagueCalendarGame } from '../league.calendar/league.calendar.game';
import { TeamRanking } from '../team.ranking';
import { Draft } from './../draft';
import { DraftResult } from './../draft.result/draft.result';
import { DraftResults } from './../draft.result/draft.results';
import { Slot } from './../h2hresult/h2hresult.slot';
import { Player } from './../player/player';
import { Team } from './../team';
import { H2HResult } from './h2hresult';

export class H2HResultCalculator {
    h2HResultCatCalculator: H2HResultCatCalculator;
    h2HResultMatchupCalculator: H2HResultMatchupCalculator;
    draft: Draft;

    constructor(private leagueCalendar: Array<LeagueCalendarGame>) { 
        this.h2HResultCatCalculator = new H2HResultCatCalculator();
        this.h2HResultMatchupCalculator = new H2HResultMatchupCalculator();
    }

    calculateH2HResult(
        teams: Array<Team>, 
        player: Player, 
        calendarAggregated: Array<LeagueCalendarGame>, 
        draftResults: DraftResults,
        myTeamId: string,
        draftData: Draft    
    ) 
    {
       // console.log(player.name + ' ' + new Date());

        let h2HResultPlayoffs = new H2HResultPlayoffs();

        if(!draftData.endWeek) draftData.endWeek = 24;
        if(!draftData.playoffSize) draftData.playoffSize  = 6;

            let calculationWeek = 1;
            let playoffSize = draftData.playoffSize || 6;
            let playoffsWeeks = (playoffSize > 4 ? 3 : (playoffSize > 2 ? 2 : 1)) || 3;
            let leagueLastRsWeek = ((draftData.endWeek || 24) - playoffsWeeks) ;
            let matchupList = new Array<H2hResultMatchup>();
            let result = new H2HResult();

            this.draft = draftData;
            
            // if calculating result for a free player - adding him to my team
            let myTeam = teams.filter(x => x.id == myTeamId)[0];
            var projectedDraftResult: DraftResult;
            if(player != null){
                
                if(myTeam.players == null) {
                    myTeam.players = new Array<Player>();
                }
                myTeam.players.push(player);

                projectedDraftResult = new DraftResult(
                    draftResults.results.length + 1,
                    player,
                    myTeam, 0
                );
                draftResults.results.push(projectedDraftResult);
            }

            teams.forEach(rankingTeam => {
                let t = new TeamRanking();
                t.loses = new Object();
                t.wins = new Object();
                t.ties = new Object();
                t.totals = new Object();

                t.loses["total"] = 0;
                t.wins["total"] = 0;
                t.ties["total"] = 0;

                this.draft.categories.forEach(c => {
                    t.loses[c.name] = 0;
                    t.wins[c.name] = 0;
                    t.ties[c.name] = 0;
                    t.totals[c.name] = 0;
                });
                
                t.team = rankingTeam;
                result.ranking.push(t);           
            });

            while (calculationWeek <= leagueLastRsWeek) {
                var weekMatchups = this.h2HResultMatchupCalculator.GetMatchupWeek(
                    calculationWeek, this.draft.leagueSize, this.draft);

                // get total weekly ranks
                try {

                    let weeklyProduction = this.GetWeeklyProduction(
                        JSON.parse(JSON.stringify(draftResults.results)),
                        //this.circularJson.parse(this.circularJson.stringify(draftResults)),
                        calendarAggregated.filter(c => c.week == calculationWeek),
                        calculationWeek, this.draft.categories
                    );


                                        // // calculate matchup results
                                        for (var i = 0; i < weekMatchups.length; i++) {
                                            weekMatchups[i] = this.h2HResultMatchupCalculator.UpdateMatchupProduction(
                                                weekMatchups[i], 
                                                weeklyProduction, 
                                                this.draft.categories, (player != null));
                                            matchupList.push(weekMatchups[i]);
                                        }
                
                                calculationWeek++;
                }
                catch(e){
                    console.log(e + ' ' + calculationWeek);
                }


            }

            result.CalculateStandings(matchupList, this.draft);

            if(player != null){
                var myTeamResult = result.ranking.filter(x => x.team.id == myTeamId)[0].totalPoints;
                player.projectedResult = myTeamResult;
                player.projectedResultCalculated = true;
                myTeam.players.splice(myTeam.players.findIndex(x => x.id == player.id), 1);
                draftResults.results.splice(draftResults.results.findIndex(r => r == projectedDraftResult), 1);
            }
            else {
                result.playerResult = 999;

                                // add playoffs
                h2HResultPlayoffs = new H2HResultPlayoffs();
                let teamPlayoffGames = new Object();
                let teamPlayoffsGameAvg: number = 0;

                for( i = 0; i < playoffsWeeks; i++){
                    let playoffWeeklyCalendar = calendarAggregated.filter(c => c.week == calculationWeek);
                    let weeklyProduction = this.GetWeeklyProduction(
                        JSON.parse(JSON.stringify(draftResults.results)),
                        //draftResults,
                        playoffWeeklyCalendar,
                        calculationWeek, this.draft.categories
                    );
                    h2HResultPlayoffs.GetPlayoffTreeRound(
                        calculationWeek, 
                        weeklyProduction, 
                        result.ranking, 
                        playoffSize, 
                        this.draft,
                        player != null
                    );

                    Enumerable.asEnumerable(playoffWeeklyCalendar)
                            .GroupBy(c => c.team1).ToArray().forEach(t => {
                                if(!teamPlayoffGames[t.key]){
                                    teamPlayoffGames[t.key] = new Object();
                                    teamPlayoffGames[t.key]["text"] = "";
                                    teamPlayoffGames[t.key]["total"] = 0;
                                }

                                teamPlayoffGames[t.key][calculationWeek] = t["length"];
                                teamPlayoffGames[t.key]["total"] += t["length"];
                                teamPlayoffGames[t.key]["text"] = teamPlayoffGames[t.key]["text"] + "week: " 
                                    + calculationWeek + " - " + t["length"] + " games / ";
                                    teamPlayoffsGameAvg += t["length"]
                            });

                        calculationWeek++;
                    }


                    result.teamPlayoffGameAverage = teamPlayoffsGameAvg / 30;
                    result.teamPlayoffGames = teamPlayoffGames;

                    result.playoffMatchups = h2HResultPlayoffs.playoffTree;
                }
            return result;
    }

    private GetWeeklyProduction(
        draftResults: Array<DraftResult>,
        innerCalendarAggregated: LeagueCalendarGame[],
        leagueCurrentWeek: number,
        cats: Category[]
    ){

        let gamesPlayed = 0;
        let startDate = new Date();
        let endDate = this.nextDay(new Date(), 0);
        let slots = new Array<Slot>();
        let resultList = new Array<DraftResultItem>();
        let weeklyRankings = new Array();

        draftResults.forEach((result, index) => {
            resultList.push( new DraftResultItem(result, 0, 0));
        });

                // opty
                // if(draftResults){
                // return draftResults;
                // }
        let newDate = new Date(endDate.toDateString());

        if (innerCalendarAggregated != null && innerCalendarAggregated.length > 0) {
            startDate = Enumerable.asEnumerable(innerCalendarAggregated).OrderBy(cal => cal.date).First().date;
            endDate = Enumerable.asEnumerable(innerCalendarAggregated).OrderBy(cal => cal.date).Last().date;
        }
        if (startDate < new Date() && endDate >= newDate) {
            startDate = newDate;
        }
        while (new Date(startDate) <= new Date(endDate)) {
            slots.length = 0;
    
            for (var i = 0; i < resultList.length ; i++) {
                var p = resultList[i].result.player;
                if (this.CheckIfTeamPlays(p.team, startDate, innerCalendarAggregated) 
                && this.CheckSlotLimit(resultList[i].result.teamDefinition.name, slots, this.draft.activeTeamSize)) {
                    resultList[i].slots = resultList[i].slots + 1;
                }
            }
            startDate = this.addDays(startDate, 1);
        }
    
        for (var i = 0; i < resultList.length ; i++) {
            resultList[i].week = leagueCurrentWeek;
            resultList[i].result.player = this.h2HResultCatCalculator.MultiplyRankingValues(resultList[i]);
        }
    
        weeklyRankings.push(resultList);
    
        //console.time("group weekly");
        var grouped = this.h2HResultCatCalculator.GroupWeeklyProduction(resultList);
        //console.timeEnd("group weekly");
    
        return grouped;
    }

    
    private CheckIfTeamPlays(team, dt, innerCalendarAggregated: LeagueCalendarGame[]) {
        var retValue = Enumerable.asEnumerable(innerCalendarAggregated)
            .Where(c=> c.team1.toUpperCase() == team.toUpperCase() && new Date(c.date).getTime() == new Date(dt).getTime());
        return retValue.Any();
    }

    private nextDay(d, dow) {
        d.setDate(d.getDate() + (dow + (7 - d.getDay())) % 7);
        return d;
    }

    private addDays = function (date, days) {
        var dat = new Date(date.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    public CheckSlotLimit(o, slots: Array<Slot>, activeTeamSize: number) {
        var slot = Enumerable.asEnumerable(slots).Where(row => row.team == o);
        if (!slot.Any()) {
            var ob = { team: o, count: 1 };
            slots.push(ob);
            return true;
        }
    
        slot.First().count = slot.First().count + 1;
        return slot.First().count <= activeTeamSize;
    }

    public GroupBy (xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
}