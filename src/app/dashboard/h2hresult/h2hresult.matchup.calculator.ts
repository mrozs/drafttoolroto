import { H2hResultMatchup } from './h2hresult.matchup';
import { Draft } from './../draft';
import { DraftResult } from './../draft.result/draft.result';
import * as Enumerable from "linq-es2015"; 
import { Category } from './../category';
import { Categories } from './../categories';

export class H2HResultMatchupCalculator {

    public GetOpponentId(week, teamId, leagueSize){
        var interval = leagueSize - 1;
        var weekInterval = week % interval;

        if(teamId == leagueSize){
            return ((weekInterval % 2) == 1) ? 
                leagueSize / 2 + (weekInterval + 1)/2 :
                (weekInterval + 2)/2; 
        }

        var opponentId = (2 + weekInterval) % (interval) - teamId;

        while(opponentId <= 0){
            opponentId += interval;
        }
        if(opponentId == teamId) {
            return +leagueSize;
        }
        return opponentId;
    }

    public GetMatchupWeek(week: number, leagueSize: number, draft: Draft){
        var taken = new Array<number>();
        var matchups = new Array<H2hResultMatchup>();

        for(var i = 1; i <= leagueSize; i++){
            if(taken.includes(i)) continue;

            var opponent = this.GetOpponentId(week, i, leagueSize);
            taken.push(opponent);
            taken.push(i);

            var team1stats = new Object();
            var team2stats = new Object();

            draft.categories.forEach(element => {
                team1stats[element.name] = 0;
                team2stats[element.name] = 0;
            });

            var matchup = new H2hResultMatchup(team1stats, team2stats, i, opponent, week, 0, 0) ;
            matchups.push(matchup);
        }

        return matchups;
    }

    public UpdateMatchupProduction(weeklyMatchup: H2hResultMatchup, weeklyProduction: Array<DraftResult>, categories: Array<Category>,
        projectedPick: boolean) {
        var weeklyProductionFiltered = Enumerable.asEnumerable(weeklyProduction)
            .Where(p => + p.teamDefinition.id == + weeklyMatchup.team1);

        weeklyMatchup.team1score = 0; 
        weeklyMatchup.team2score = 0;

        weeklyMatchup.team1RatioElements = new Object();
        weeklyMatchup.team2RatioElements = new Object();

        if (weeklyProductionFiltered.Any()) {
            for (let key in weeklyMatchup.teamStats1) {
                //console.log(key);
                var translatedKey = Enumerable.asEnumerable(Categories.list).FirstOrDefault(c => c.name == key).property;
                if (weeklyProductionFiltered.First().player.statistics[translatedKey]) {
                    weeklyMatchup.teamStats1[key] = weeklyProductionFiltered.First().player.statistics[translatedKey];
                }
            }
            
            weeklyMatchup.team1RatioElements["FG"] = weeklyProductionFiltered.First().player.statistics["FGM"] || 
            (weeklyProductionFiltered.First().player.statistics["FGA"] * weeklyProductionFiltered.First().player.statistics["FG"]);
            weeklyMatchup.team1RatioElements["FGA"] = weeklyProductionFiltered.First().player.statistics["FGA"];
            weeklyMatchup.team1RatioElements["FT"] = weeklyProductionFiltered.First().player.statistics["FTM"] || 
            (weeklyProductionFiltered.First().player.statistics["FTA"] * weeklyProductionFiltered.First().player.statistics["FT"]);
            weeklyMatchup.team1RatioElements["FTA"] = weeklyProductionFiltered.First().player.statistics["FTA"];
            weeklyMatchup.team1RatioElements["AST"] = weeklyProductionFiltered.First().player.statistics["AST"] ||  
            (weeklyProductionFiltered.First().player.statistics["TO"] * weeklyProductionFiltered.First().player.statistics["ATO"]);
            weeklyMatchup.team1RatioElements["TO"] = weeklyProductionFiltered.First().player.statistics["TO"];
        }

        weeklyProductionFiltered = Enumerable.asEnumerable(weeklyProduction)
            .Where(p => +p.teamDefinition.id == weeklyMatchup.team2);
    
            for (let key in weeklyMatchup.teamStats2) {
                //console.log(key);
                var translatedKey = Enumerable.asEnumerable(Categories.list).FirstOrDefault(c => c.name == key).property;
                
                if (weeklyProductionFiltered.Any() && weeklyProductionFiltered.First().player.statistics[translatedKey]) {
                    weeklyMatchup.teamStats2[key] = weeklyProductionFiltered.First().player.statistics[translatedKey];
                }
            }
            // if( weeklyMatchup.team1score > 4 && weeklyMatchup.team1score < 7 || weeklyMatchup.team1score > 4 && weeklyMatchup.team1score < 7){
            //     // debug
            //     console.log(weeklyMatchup.team1score);
            //     console.log(weeklyMatchup.team2score);
            // }
            if (weeklyProductionFiltered.Any()) {
                

                weeklyMatchup.team2RatioElements["FG"] = weeklyProductionFiltered.First().player.statistics["FGM"] || 
                    (weeklyProductionFiltered.First().player.statistics["FGA"] * weeklyProductionFiltered.First().player.statistics["FG"]);
                weeklyMatchup.team2RatioElements["FGA"] = weeklyProductionFiltered.First().player.statistics["FGA"];
                weeklyMatchup.team2RatioElements["FT"] = weeklyProductionFiltered.First().player.statistics["FTM"] || 
                (weeklyProductionFiltered.First().player.statistics["FTA"] * weeklyProductionFiltered.First().player.statistics["FT"]);
                weeklyMatchup.team2RatioElements["FTA"] = weeklyProductionFiltered.First().player.statistics["FTA"];
                weeklyMatchup.team2RatioElements["AST"] = weeklyProductionFiltered.First().player.statistics["AST"] ||  
                (weeklyProductionFiltered.First().player.statistics["TO"] * weeklyProductionFiltered.First().player.statistics["ATO"]);
                weeklyMatchup.team2RatioElements["TO"] = weeklyProductionFiltered.First().player.statistics["TO"];
                weeklyMatchup.team2RatioElements["C3PM"] = weeklyProductionFiltered.First().player.statistics["C3PM"];
                weeklyMatchup.team2RatioElements["C3PA"] = weeklyProductionFiltered.First().player.statistics["C3PMA"];

                weeklyMatchup.team2RatioElements["STL"] = weeklyProductionFiltered.First().player.statistics["STL"];
                weeklyMatchup.team2RatioElements["C2PM"] = weeklyProductionFiltered.First().player.statistics["C2PM"];
                weeklyMatchup.team2RatioElements["C2PA"] = weeklyProductionFiltered.First().player.statistics["C2PMA"];
            }

            weeklyMatchup = this.SetRatios(weeklyMatchup);

            for (let key in weeklyMatchup.teamStats2) {
                var cat = categories.filter(c => c.name == key)[0];
                    if(weeklyMatchup.teamStats2[key] == weeklyMatchup.teamStats1[key]){
                        if(projectedPick){
                            weeklyMatchup.team1score = weeklyMatchup.team1score + 0.5;
                            weeklyMatchup.team2score = weeklyMatchup.team2score + 0.5;
                        }
                    }
                    else if(((weeklyMatchup.teamStats2[key] < weeklyMatchup.teamStats1[key]) && cat.negative == false)
                        || ((weeklyMatchup.teamStats2[key] > weeklyMatchup.teamStats1[key]) && cat.negative == true)
                    ){
                        weeklyMatchup.team1score ++;
                    }
                    else {
                        weeklyMatchup.team2score ++;
                    }
                }

            return weeklyMatchup;
    }

    private SetRatios(matchup) {
        if(matchup.teamStats1["FG%"]) { matchup.teamStats1["FG%"] = !matchup.team1RatioElements.FGA ? 0 : matchup.team1RatioElements.FG / matchup.team1RatioElements.FGA;
        }
        if(matchup.teamStats1["FT%"]) { matchup.teamStats1["FT%"] = !matchup.team1RatioElements.FTA ? 0 : matchup.team1RatioElements.FT / matchup.team1RatioElements.FTA;
        }  
        // matchup.teamStats1.ATO = !matchup.team1RatioElements.TO ? 0 : matchup.team1RatioElements.AST / matchup.team1RatioElements.TO;
        // matchup.teamStats1.AFG_ = !matchup.team1RatioElements.FGA || !matchup.team1RatioElements.C3PM ? 0 : (matchup.team1RatioElements.FG + 0.5 * matchup.team1RatioElements.C3PM) / matchup.team1RatioElements.FGA;
        // matchup.teamStats1.C3PA_FGA = !matchup.team1RatioElements.FGA || !matchup.team1RatioElements.C3PA ? 0 : matchup.team1RatioElements.C3PA / matchup.team1RatioElements.FGA;
        // matchup.teamStats1.C3P_ = !matchup.team1RatioElements.C3PA || !matchup.team1RatioElements.C3PM ? 0 : matchup.team1RatioElements.C3PM / matchup.team1RatioElements.C3PA;
        // matchup.teamStats1.C2P_ = !matchup.team1RatioElements.C2PA || !matchup.team1RatioElements.C2PM ? 0 : matchup.team1RatioElements.C2PM / matchup.team1RatioElements.C2PA;
        // matchup.teamStats1.S_TO = !matchup.team1RatioElements.TO ? 0 : matchup.team1RatioElements.STL / matchup.team1RatioElements.TO;
    
        if(matchup.teamStats2["FG%"]) { matchup.teamStats2["FG%"] = !matchup.team2RatioElements.FGA ? 0 : matchup.team2RatioElements.FG / matchup.team2RatioElements.FGA;
        }
        if(matchup.teamStats2["FT%"]) { matchup.teamStats2["FT%"] = !matchup.team2RatioElements.FTA  ? 0 : matchup.team2RatioElements.FT / matchup.team2RatioElements.FTA;
        }  
    

        // matchup.teamStats2.FG_ = !matchup.team2RatioElements.FGA ? 0 : matchup.team2RatioElements.FG / matchup.team2RatioElements.FGA;
        // matchup.teamStats2.AFG_ = !matchup.team2RatioElements.FGA || !matchup.team2RatioElements.C3PM ? 0 : (matchup.team2RatioElements.FG + 0.5 * matchup.team2RatioElements.C3PM) / matchup.team2RatioElements.FGA;
        // matchup.teamStats2.C3PA_FGA = !matchup.team2RatioElements.FGA || !matchup.team2RatioElements.C3PA ? 0 : matchup.team2RatioElements.C3PA / matchup.team2RatioElements.FGA;
        // matchup.teamStats2.C3P_ = !matchup.team2RatioElements.C3PA || !matchup.team2RatioElements.C3PM ? 0 : matchup.team2RatioElements.C3PM / matchup.team2RatioElements.C3PA;
        // matchup.teamStats2.FT_ = !matchup.team2RatioElements.FTA || !matchup.team2RatioElements.FTM ? 0 : matchup.team2RatioElements.FTM / matchup.team2RatioElements.FTA;
        // matchup.teamStats2.C2P_ = !matchup.team2RatioElements.C2PA || !matchup.team2RatioElements.C2PM ? 0 : matchup.team2RatioElements.C2PM / matchup.team2RatioElements.C2PA;
        // matchup.teamStats2.ATO = !matchup.team2RatioElements.TO ? 0 : matchup.team2RatioElements.AST / matchup.team2RatioElements.TO;
        // matchup.teamStats2.S_TO = !matchup.team2RatioElements.TO ? 0 : matchup.team2RatioElements.STL / matchup.team2RatioElements.TO;
        return matchup;
    }
}