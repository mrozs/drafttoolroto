import { Draft } from '../app/dashboard/draft';
import { H2HResult } from '../app/dashboard/h2hresult/h2hresult';
import { H2HResultCalculator } from '../app/dashboard/h2hresult/h2hresult.calculator';
import { Schedule } from '../app/dashboard/h2hresult/h2hresult.schedule';
import { ScheduleWeek } from '../app/dashboard/h2hresult/h2hresult.schedule.week';
import { LeagueCalendarGame } from '../app/dashboard/league.calendar/league.calendar.game';
import { Team } from '../app/dashboard/team';
import { TeamPlayersAdapter } from '../app/dashboard/team.players.adapter';
import { TeamRankingCalculator } from '../app/dashboard/team.ranking.calculator';

const customPostMessage: any = postMessage;

//let combinationFinder: PlayerCombinationsFinder;
let teamRankingCalculator: TeamRankingCalculator;
let h2HResultCalculator: H2HResultCalculator;
let leagueCalendar: Array<LeagueCalendarGame>;
let draft: Draft;
let h2hResult: H2HResult;
let myMatchups: Array<ScheduleWeek>;

onmessage = function (event: any) {
    if (event.data.command == "initialize") {
        leagueCalendar = //LeagueCalendarAdapter.adapt(
            event.data.leagueCalendar; //);
        h2HResultCalculator = new H2HResultCalculator(leagueCalendar);
        draft = event.data.draft;
    }

    if (event.data.command == "recalculate") {
        console.time("combination calculations");

        // we need: calendar, team list, player rankings, 

        const teamPlayers = TeamPlayersAdapter.adapt(event.data.teamPlayers);
        const selectedTeamPlayers = teamPlayers.playersOf(event.data.selectedTeamDefinitionId);

        const playersToPick = event.data.playersToPick;
        const puntCategories = event.data.puntCategories;
        const calculateFor = event.data.calculateFor;
        const draftResults = event.data.draftResults;
        //let combinations = combinationFinder.combine(playersToPick, selectedTeamPlayers, puntCategories, calculateFor);


        const teams = Array<Team>();
        event.data.teamDefinitions.forEach(teamDefinition => {
            //const players = teamPlayers.playersOf(teamDefinition.id);
            //const teamRanking = teamRankingCalculator.calculate(players, puntCategories);
            var team =new Team(null, null);
            team.id = teamDefinition.id;
            team.name = teamDefinition.name;
            teams.push(team);
            
        });

            // calculate current standings

            h2hResult = h2HResultCalculator.calculateH2HResult(
                event.data.teamDefinitions, 
                null, 
                leagueCalendar, 
                JSON.parse(JSON.stringify(draftResults)),
                event.data.selectedTeamDefinitionId, draft);

            myMatchups = (new Schedule()).CreateSchedule(h2hResult, +draft.teamId, teams);

                // // we need to add h2h rankings to each (or top 100?) players from the ranking
                 let limit: number = 20;
                 let calculatedPlayers: number = 0; 
        for(var i = 0; i < playersToPick.length; i ++){
                if(playersToPick[i].picked || playersToPick[i].exclude //|| !playersToPick[i].seasonScoreProjections
                    ) {
                        playersToPick[i].h2hResult = null;
                        playersToPick[i].projectedResult = null;
                        continue;
                    }
                 calculatedPlayers++;
                 if(calculatedPlayers > limit && !playersToPick[i].target) continue;

                    playersToPick[i].h2hResult = h2HResultCalculator.calculateH2HResult(
                event.data.teamDefinitions, 
                playersToPick[i], 
                leagueCalendar, 
                JSON.parse(JSON.stringify(draftResults)),
                event.data.selectedTeamDefinitionId, draft);
        }

        //let interalTeamRankings = teamRankingCalculator.calculateInternal(teams, puntCategories);
        //interalTeamRankings = interalTeamRankings.sort((t1, t2) => t2.ranking.totalPoints - t1.ranking.totalPoints);
        
        // teams.sort((t1, t2) => t1.ranking.place - t2.ranking.place).forEach((team, index) => {
        //     if (!index) return;

        //     if (teams[index].ranking.place <= teams[index - 1].ranking.place) {
        //          teams[index].ranking.place = teams[index - 1].ranking.place + 1;
        //     }
        // });

        console.timeEnd("combination calculations");
        customPostMessage({
            combinations: playersToPick,
            myMatchups: myMatchups,
            h2hresult: h2hResult,
            teams: teams
        });
    }
};