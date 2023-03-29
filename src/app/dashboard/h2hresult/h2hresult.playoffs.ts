import { TeamRanking } from '../team.ranking';
import { H2hResultMatchup } from '../h2hresult/h2hresult.matchup';
import * as Enumerable from "linq-es2015"; 
import { Draft } from './../draft';
import { DraftResult } from './../draft.result/draft.result';
import { H2HResult } from './h2hresult';
import { H2HResultMatchupCalculator } from '../h2hresult/h2hresult.matchup.calculator';

export class H2HResultPlayoffs {
    playoffMatchups: Array<H2hResultMatchup> = new Array<H2hResultMatchup>();
    playoffTree: Array<H2hResultMatchup> = new Array<H2hResultMatchup>();
    h2HResultMatchupCalculator: H2HResultMatchupCalculator = new H2HResultMatchupCalculator();

    public GetPlayoffMatchups(standings: Array<TeamRanking>, playoffSize: number, week: number, draft: Draft) {
        var treeSize = 2;
        while (treeSize < playoffSize) { treeSize = treeSize * 2 }
        var tree = new Array<H2hResultMatchup>(treeSize/2);

        standings = Enumerable.AsEnumerable(standings).OrderByDescending(x => x.totalPoints).ToArray();

        var teamstats = new Object();

        draft.categories.forEach(element => {
            teamstats[element.name] = 0;
        });

        if (tree.length == 2) {
            tree[0] = new H2hResultMatchup(
                JSON.parse(JSON.stringify(teamstats)), 
                JSON.parse(JSON.stringify(teamstats)),
                + standings[0].team.id,
                + standings[3].team.id, week, + standings[0].totalPoints, + standings[3].totalPoints);

                tree[1] = new H2hResultMatchup(
                    JSON.parse(JSON.stringify(teamstats)), 
                    JSON.parse(JSON.stringify(teamstats)),
                    + standings[2].team.id,
                    + standings[1].team.id, week, + standings[2].totalPoints, + standings[1].totalPoints);
        }
        else {
            tree[0] = new H2hResultMatchup(
                JSON.parse(JSON.stringify(teamstats)), 
                JSON.parse(JSON.stringify(teamstats)),
                + standings[0].team.id,
                null, week, +standings[0].totalPoints, 0);

                tree[1] = new H2hResultMatchup(
                    JSON.parse(JSON.stringify(teamstats)), 
                    JSON.parse(JSON.stringify(teamstats)),
                    + standings[3].team.id,
                    + standings[4].team.id, week, + standings[3].totalPoints, + standings[4].totalPoints);

                tree[2] = new H2hResultMatchup(
                    JSON.parse(JSON.stringify(teamstats)), 
                    JSON.parse(JSON.stringify(teamstats)),
                    + standings[2].team.id,
                    + standings[5].team.id, week, + standings[2].totalPoints, + standings[5].totalPoints);

                tree[3] = new H2hResultMatchup(
                    JSON.parse(JSON.stringify(teamstats)), 
                    JSON.parse(JSON.stringify(teamstats)),
                    null, + standings[1].team.id,  week, 0, + standings[1].totalPoints);

            if (playoffSize == 8) {
                tree[0].team2 = + standings[7].team.id;
                tree[3].team1 = + standings[6].team.id;
            }
        }
        return tree;
    }

    public GetPlayoffTreeRound(week: number, weeklyProduction: Array<DraftResult>, standings: Array<TeamRanking>, playoffSize: number, draft: Draft, projectedPck: boolean){
        var previousRound = this.playoffTree.filter(x => x.week == week-1);
        if(!previousRound && this.playoffTree){
            console.log("error while building a playoff tree. No previous round calculated");
            return;
        }
        var tree = (previousRound && previousRound.length) ? this.GetPreviousRoundWinners(previousRound, draft) : this.GetPlayoffMatchups(standings, playoffSize, week, draft);
        tree.forEach(matchup => { matchup = this.h2HResultMatchupCalculator.UpdateMatchupProduction(matchup, weeklyProduction, draft.categories, projectedPck); });

        this.playoffTree = this.playoffTree.concat(tree);
    }

    public GetPreviousRoundWinners(previousRound: Array<H2hResultMatchup>, draft: Draft){
        var teamstats = new Object();

        draft.categories.forEach(element => {
            teamstats[element.name] = 0;
        });

        var winners = new Array<H2hResultMatchup>();
        var week = previousRound[0].week +1 ;
        for(var i=0; i<previousRound.length; i = i+2){
            var m1winner = previousRound[i].team1score> previousRound[i].team2score 
                || previousRound[i].team1score == previousRound[i].team2score
                && previousRound[i].team1standing > previousRound[i].team2standing ? 
                    previousRound[i].team1 : previousRound[i].team2;
            var m1winnerRS = previousRound[i].team1score > previousRound[i].team2score 
                    || previousRound[i].team1score == previousRound[i].team2score
                    && previousRound[i].team1standing > previousRound[i].team2standing ? 
                        previousRound[i].team1standing : previousRound[i].team2standing;
 
            var m2winner = previousRound[i+1].team1score > previousRound[i+1].team2score 
                    || previousRound[i+1].team1score == previousRound[i+1].team2score
                    && previousRound[i+1].team1standing > previousRound[i+1].team2standing ? 
                        previousRound[i+1].team1 : previousRound[i+1].team2;
            var m2winnerRS = previousRound[i+1].team1score > previousRound[i+1].team2score 
                        || previousRound[i+1].team1score == previousRound[i+1].team2score
                        && previousRound[i+1].team1standing > previousRound[i+1].team2standing ? 
                            previousRound[i+1].team1standing : previousRound[i+1].team2standing;
    

                    winners.push(
                        new H2hResultMatchup(
                            JSON.parse(JSON.stringify(teamstats)), 
                            JSON.parse(JSON.stringify(teamstats)), m1winner, m2winner, week, m1winnerRS, m2winnerRS));
                        }
                        
        return winners;
    }
}