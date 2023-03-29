import { DraftResults } from '../draft.result/draft.results'
import { DraftResult } from '../draft.result/draft.result'
import * as Enumerable from "linq-es2015"; 
import { Player } from '../player/player';
import { DraftResultItem } from '../draft.result/draft.result.item';
import { Team } from '../team';

export class H2HResultCatCalculator {
    public JoinStatLines(baseLine: Player, addedLine: Player){
        baseLine.statistics.M = (baseLine.statistics.M | 0) + (addedLine.statistics.M | 0);
        baseLine.statistics.FGM = (baseLine.statistics.FGM | 0) + (addedLine.statistics.FGM | 0);
        baseLine.statistics.FGA = (baseLine.statistics.FGA | 0) + (addedLine.statistics.FGA | 0);
        baseLine.statistics.C3PA = (baseLine.statistics.C3PA | 0) + (addedLine.statistics.C3PA | 0);
        baseLine.statistics.FGMS = (baseLine.statistics.FGMS | 0) + (addedLine.statistics.FGMS | 0);
        baseLine.statistics.C3PM48 = (baseLine.statistics.C3PM48 | 0) + (addedLine.statistics.C3PM48 | 0);
        baseLine.statistics.C3PM = (baseLine.statistics.C3PM | 0) + (addedLine.statistics.C3PM | 0);
        baseLine.statistics.C3PMS = (baseLine.statistics.C3PMS | 0) + (addedLine.statistics.C3PMS | 0);
        baseLine.statistics.FTA = (baseLine.statistics.FTA | 0) + (addedLine.statistics.FTA | 0);
        baseLine.statistics.FTM = (baseLine.statistics.FTM | 0) + (addedLine.statistics.FTM | 0);
        baseLine.statistics.FTMS = (baseLine.statistics.FTMS | 0) + (addedLine.statistics.FTMS | 0);
        baseLine.statistics.NETFT = (baseLine.statistics.NETFT | 0) + (addedLine.statistics.NETFT | 0);
        baseLine.statistics.C2PA = (baseLine.statistics.C2PA | 0) + (addedLine.statistics.C2PA | 0);
        baseLine.statistics.C2PM = (baseLine.statistics.C2PM | 0) + (addedLine.statistics.C2PM | 0);

        baseLine.statistics.REB = (baseLine.statistics.REB | 0) + (addedLine.statistics.REB | 0);
        baseLine.statistics.OREB = (baseLine.statistics.OREB | 0) + (addedLine.statistics.OREB | 0);
        baseLine.statistics.DREB = (baseLine.statistics.DREB | 0) + (addedLine.statistics.DREB | 0);
        baseLine.statistics.BLK = (baseLine.statistics.BLK | 0) + (addedLine.statistics.BLK | 0);
        baseLine.statistics.SB = (baseLine.statistics.SB | 0) + (addedLine.statistics.SB | 0);
        baseLine.statistics.PTS48 = (baseLine.statistics.PTS48 | 0) + (addedLine.statistics.PTS48 | 0);
        baseLine.statistics.DPG = (baseLine.statistics.DPG | 0) + (addedLine.statistics.DPG | 0);
        baseLine.statistics.A_TO = (baseLine.statistics.A_TO | 0) + (addedLine.statistics.A_TO | 0);
        baseLine.statistics.TO = (baseLine.statistics.TO | 0) + (addedLine.statistics.TO | 0);
        baseLine.statistics.AST = (baseLine.statistics.AST | 0) + (addedLine.statistics.AST | 0);
        baseLine.statistics.STL = (baseLine.statistics.STL | 0) + (addedLine.statistics.STL | 0);
        baseLine.statistics.TRN48 = (baseLine.statistics.TRN48 | 0) + (addedLine.statistics.TRN48 | 0);
        baseLine.statistics.PF = (baseLine.statistics.PF | 0) + (addedLine.statistics.PF | 0);
        baseLine.statistics.PTS = (baseLine.statistics.PTS | 0) + (addedLine.statistics.PTS | 0);
        baseLine.statistics.T = (baseLine.statistics.T | 0) + (addedLine.statistics.T | 0);
        baseLine.statistics.DD = (baseLine.statistics.DD | 0) + (addedLine.statistics.DD | 0);
        baseLine.statistics.TD = (baseLine.statistics.TD | 0) + (addedLine.statistics.TD | 0);
        baseLine.statistics.EJ = (baseLine.statistics.EJ | 0) + (addedLine.statistics.EJ | 0);
        baseLine.statistics.FL = (baseLine.statistics.FL | 0) + (addedLine.statistics.FL | 0);
        baseLine.statistics.GS = (baseLine.statistics.GS | 0) + (addedLine.statistics.GS | 0);
   
        return baseLine;
    }
    public MultiplyRankingValues(rankingList) {
        let rankingPlayer = rankingList.result.player;
        let ranking = rankingPlayer.statistics;

        if (ranking.M) ranking.M = ranking.M * rankingList.slots;
        if (ranking.C3PA) ranking.C3PA = Math.round(ranking.C3PA * rankingList.slots);
        else { ranking.C3PA = Math.round(ranking.FGA * ranking.C3PA_FGA); }
        if (ranking.FGA) ranking.FGA = Math.round(ranking.FGA * rankingList.slots);
        if (ranking.FGM) ranking.FGM = Math.round(ranking.FGM * rankingList.slots);
        else if (ranking.FG_) { ranking.FGM = Math.round(ranking.FGA * ranking.FG_); }
        if (ranking.FGMS) ranking.FGMS = Math.round(ranking.FGMS * rankingList.slots);
        if (ranking.C3PM48) ranking.C3PM48 = Math.round(ranking.C3PM48 * rankingList.slots);
        if (ranking.C3PM) ranking.C3PM = Math.round(ranking.C3PM * rankingList.slots);
        else { ranking.C3PM = Math.round(ranking.C3PA * ranking.C3P_); }
        if (ranking.C3PMS) ranking.C3PMS = Math.round(ranking.C3PMS * rankingList.slots);
        if (ranking.FTA) ranking.FTA = Math.round(ranking.FTA * rankingList.slots);
        if (ranking.FTM) ranking.FTM = Math.round(ranking.FTM * rankingList.slots);
        else ranking.FTM = Math.round(ranking.FTA * ranking.FT_);
        if (ranking.FTMS) ranking.FTMS = Math.round(ranking.FTMS * rankingList.slots);
        if (ranking.NETFT) ranking.NETFT = Math.round(ranking.NETFT * rankingList.slots);
        if (ranking.C2PA) ranking.C2PA = Math.round(ranking.C2PA * rankingList.slots);
        if (ranking.C2PM) ranking.C2PM = Math.round(ranking.C2PM * rankingList.slots);
        else ranking.C2PM = Math.round(ranking.C2PA * ranking.C2P_);
        if (ranking.REB) ranking.REB = Math.round(ranking.REB * rankingList.slots);
        if (ranking.OREB) ranking.OREB = Math.round(ranking.OREB * rankingList.slots);
        if (ranking.DREB) ranking.DREB = Math.round(ranking.DREB * rankingList.slots);
        if (ranking.BLK) ranking.BLK = Math.round(ranking.BLK * rankingList.slots);
        if (ranking.SB) ranking.SB = Math.round(ranking.SB * rankingList.slots);
        if (ranking.PTS48) ranking.PTS48 = Math.round(ranking.PTS48 * rankingList.slots);
        if (ranking.DPG) ranking.DPG = Math.round(ranking.DPG * rankingList.slots);
        if (ranking.A_TO) ranking.A_TO = Math.round(ranking.A_TO * rankingList.slots);
        if (ranking.TO) ranking.TO = Math.round(ranking.TO * rankingList.slots);
        if (ranking.AST) ranking.AST = Math.round(ranking.AST * rankingList.slots);
        else { ranking.AST = Math.round(ranking.TO * ranking.ATO); }
        if (ranking.STL) ranking.STL = Math.round(ranking.STL * rankingList.slots);
        else { ranking.STL = Math.round(ranking.TO * ranking.S_TO); }
        if (ranking.TRN48) ranking.TRN48 = Math.round(ranking.TRN48 * rankingList.slots);
        if (ranking.PF) ranking.PF = Math.round(ranking.PF * rankingList.slots);
        if (ranking.PTS) ranking.PTS = Math.round(ranking.PTS * rankingList.slots);
        if (ranking.T) ranking.T = Math.round(ranking.T * rankingList.slots);
        if (ranking.DD) ranking.DD = Math.round(ranking.DD * rankingList.slots);
        if (ranking.TD) ranking.TD = Math.round(ranking.TD * rankingList.slots);
        if (ranking.EJ) ranking.EJ = Math.round(ranking.EJ * rankingList.slots);
        if (ranking.FL) ranking.FL = Math.round(ranking.FL * rankingList.slots);
        if (ranking.GS) ranking.GS = Math.round(ranking.GS * rankingList.slots);
        if (ranking.FO) ranking.FO = Math.round(ranking.FO * rankingList.slots);

        return rankingPlayer;
    }

    public GroupWeeklyProduction(ranking: DraftResultItem[]) { // : DraftResults
        var retValue = Enumerable.asEnumerable(ranking).GroupBy(r => r.result.teamDefinition.id, r => r, (team, results) => {
            var teamPlayers = Enumerable.asEnumerable(results).Select(r => r.result.player);
            var basePlayer = teamPlayers.First();
            var basePick = results[0].result;

            if(teamPlayers.Count() > 1){
                if(basePlayer.statistics.M != null) basePlayer.statistics.M = teamPlayers.Sum(p => p.statistics.M || 0);
                if(basePlayer.statistics.FGM != null) basePlayer.statistics.FGM = teamPlayers.Sum(p => p.statistics.FGM || 0);
                if(basePlayer.statistics.FGA != null) basePlayer.statistics.FGA = teamPlayers.Sum(p => p.statistics.FGA || 0);
                if(basePlayer.statistics.C3PA != null) basePlayer.statistics.C3PA = teamPlayers.Sum(p => p.statistics.C3PA || 0);
                if(basePlayer.statistics.FGMS != null) basePlayer.statistics.FGMS = teamPlayers.Sum(p => p.statistics.FGMS || 0);
                if(basePlayer.statistics.C3PM48 != null) basePlayer.statistics.C3PM48 = teamPlayers.Sum(p => p.statistics.C3PM48 || 0);
                if(basePlayer.statistics.C3PM != null) basePlayer.statistics.C3PM = teamPlayers.Sum(p => p.statistics.C3PM || 0);
                if(basePlayer.statistics.C3PMS != null) basePlayer.statistics.C3PMS = teamPlayers.Sum(p => p.statistics.C3PMS || 0);
                if(basePlayer.statistics.FTA != null) basePlayer.statistics.FTA = teamPlayers.Sum(p => p.statistics.FTA || 0);
                if(basePlayer.statistics.FTM != null) basePlayer.statistics.FTM = teamPlayers.Sum(p => p.statistics.FTM || 0);
                if(basePlayer.statistics.FTMS != null) basePlayer.statistics.FTMS = teamPlayers.Sum(p => p.statistics.FTMS || 0);
                if(basePlayer.statistics.C2PM != null) basePlayer.statistics.C2PM = teamPlayers.Sum(p => p.statistics.C2PM || 0);
                if(basePlayer.statistics.REB != null) basePlayer.statistics.REB = teamPlayers.Sum(p => p.statistics.REB || 0);
                if(basePlayer.statistics.OREB != null) basePlayer.statistics.OREB = teamPlayers.Sum(p => p.statistics.OREB || 0);
                if(basePlayer.statistics.DREB != null) basePlayer.statistics.DREB = teamPlayers.Sum(p => p.statistics.DREB || 0);
                if(basePlayer.statistics.C2PA != null) basePlayer.statistics.C2PA = teamPlayers.Sum(p => p.statistics.C2PA || 0);
                if(basePlayer.statistics.BLK != null) basePlayer.statistics.BLK = teamPlayers.Sum(p => p.statistics.BLK || 0);
                if(basePlayer.statistics.NETFT != null) basePlayer.statistics.NETFT = teamPlayers.Sum(p => p.statistics.NETFT || 0);
                if(basePlayer.statistics.SB != null) basePlayer.statistics.SB = teamPlayers.Sum(p => p.statistics.SB || 0);
                if(basePlayer.statistics.PTS48 != null) basePlayer.statistics.PTS48 = teamPlayers.Sum(p => p.statistics.PTS48 || 0);
                if(basePlayer.statistics.DPG != null) basePlayer.statistics.DPG = teamPlayers.Sum(p => p.statistics.DPG || 0);
                if(basePlayer.statistics.A_TO != null) basePlayer.statistics.A_TO = teamPlayers.Sum(p => p.statistics.A_TO || 0);
                if(basePlayer.statistics.TO != null) basePlayer.statistics.TO = teamPlayers.Sum(p => p.statistics.TO || 0);
                if(basePlayer.statistics.AST != null) basePlayer.statistics.AST = teamPlayers.Sum(p => p.statistics.AST || 0);
                if(basePlayer.statistics.STL != null) basePlayer.statistics.STL = teamPlayers.Sum(p => p.statistics.STL || 0);
                if(basePlayer.statistics.TRN48 != null) basePlayer.statistics.TRN48 = teamPlayers.Sum(p => p.statistics.TRN48 || 0);
                if(basePlayer.statistics.PF != null) basePlayer.statistics.PF = teamPlayers.Sum(p => p.statistics.PF || 0);
                if(basePlayer.statistics.PTS != null) basePlayer.statistics.PTS = teamPlayers.Sum(p => p.statistics.PTS || 0);
                if(basePlayer.statistics.T != null) basePlayer.statistics.T = teamPlayers.Sum(p => p.statistics.T || 0);
                if(basePlayer.statistics.DD != null) basePlayer.statistics.DD = teamPlayers.Sum(p => p.statistics.DD || 0);
                if(basePlayer.statistics.TD != null) basePlayer.statistics.TD = teamPlayers.Sum(p => p.statistics.TD || 0);
                if(basePlayer.statistics.EJ != null) basePlayer.statistics.EJ = teamPlayers.Sum(p => p.statistics.EJ || 0);
                if(basePlayer.statistics.FL != null) basePlayer.statistics.FL = teamPlayers.Sum(p => p.statistics.FL || 0);
                if(basePlayer.statistics.GS != null) basePlayer.statistics.GS = teamPlayers.Sum(p => p.statistics.GS || 0);
            }

            return new DraftResult(basePick.pickNumber, basePlayer, basePick.teamDefinition, basePick.price); //{ picknumber: basePick.pickNumber, player: basePlayer, teamDefinition: team, price: null };// 
                
        });

        //return retValue.Select(r => r.);

        var weekByTeamTS = new Array();

        retValue.ToArray().forEach(res => {
            weekByTeamTS.push(res);
        });

        // ranking.forEach(element => {
        //     var currentDraftResult = Enumerable.asEnumerable(weekByTeamTS)
        //         .FirstOrDefault(r => r.teamDefinition.name == element.result.teamDefinition.name);
        //     if(!currentDraftResult){
        //         currentDraftResult = element.result;
        //         //currentDraftResult.player = this.MultiplyRankingValues(currentDraftResult);
        //         weekByTeamTS.push(currentDraftResult);
        //     }
        //     else {
        //         currentDraftResult.player = this.JoinStatLines(
        //             currentDraftResult.player,
        //             //this.MultiplyRankingValues(
        //                 element.result.player//)
        //         );
        //     }
        // });

        return weekByTeamTS;
        
    }
}