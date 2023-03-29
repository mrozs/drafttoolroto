
import { TeamRanking } from '../team.ranking';
import { H2hResultMatchup } from './h2hresult.matchup';
import { DraftResult } from '../draft.result/draft.result';
import * as Enumerable from "linq-es2015"; 
import { Draft } from '../draft';

export class H2HResult {
    public ranking: Array<TeamRanking > = new Array<TeamRanking >();
    public rsMatchups: Array<H2hResultMatchup> = new Array<H2hResultMatchup>();
    public playoffMatchups: Array<H2hResultMatchup> = new Array<H2hResultMatchup>();
    public playerResult: number = 0;
    public teamPlayoffGames: Object;
    public teamPlayoffGameAverage: number;

    public CalculateStandings(matchups: Array<H2hResultMatchup>, draft: Draft){
        // odpalamy z zerami, potem uzupelniamy po kolei kategorie i totals, idąc po matchupach

        this.rsMatchups = matchups;
        matchups.forEach(m => {
                var team1 = Enumerable.asEnumerable(this.ranking).FirstOrDefault(r => r.team.id == m.team1.toString());
                var team2 = Enumerable.asEnumerable(this.ranking).FirstOrDefault(r => r.team.id == m.team2.toString());

                team1.ratioElements = team1.ratioElements || new Object();
                team2.ratioElements = team2.ratioElements || new Object();

                draft.categories.forEach(e => {
                    if(!team1.totals) team1.totals = new Object();
                    if(!team1.totals[e.name]) team1.totals[e.name] = m.teamStats1[e.name];
                    else team1.totals[e.name] += m.teamStats1[e.name]

                    if(!team2.totals) team1.totals = new Object();
                    if(!team2.totals[e.name]) team2.totals[e.name] = m.teamStats2[e.name];
                    else team2.totals[e.name] += m.teamStats2[e.name]

                    try {
                        if(m.teamStats1[e.name] == m.teamStats2[e.name]){
                            team1.ties[e.name]++; 
                            team2.ties[e.name]++; 
                            team1.ties["total"]++; 
                            team2.ties["total"]++; 
                        }
                        else if((m.teamStats1[e.name] > m.teamStats2[e.name] && !e.negative)
                        || (m.teamStats1[e.name] < m.teamStats2[e.name] && e.negative))
                        {
                            team1.wins[e.name]++; 
                            team2.loses[e.name]++; 
                            team1.wins["total"]++; 
                            team2.loses["total"]++; 
                        }
                        else {
                            team1.loses[e.name]++; 
                            team2.wins[e.name]++; 
                            team1.loses["total"]++; 
                            team2.wins["total"]++; 
                        }
                    }
                    catch(err){
                        console.log(err);
                        console.log(m.team1);
                        console.log(m.team2);
                    }
                });

                team1.ratioElements["FG"] = (team1.ratioElements["FG"] || 0) + m.team1RatioElements["FG"];
                team1.ratioElements["FGA"] = (team1.ratioElements["FGA"] || 0) + m.team1RatioElements["FGA"];
                team1.ratioElements["FT"] = (team1.ratioElements["FT"] || 0) + m.team1RatioElements["FT"];
                team1.ratioElements["FTA"] = (team1.ratioElements["FTA"] || 0) + m.team1RatioElements["FTA"];
                team1.ratioElements["AST"] = (team1.ratioElements["AST"] || 0) + m.team1RatioElements["AST"];
                team1.ratioElements["TO"] = (team1.ratioElements["TO"] || 0) + m.team1RatioElements["TO"];

                team2.ratioElements["FG"] = (team2.ratioElements["FG"] || 0) + m.team2RatioElements["FG"];
                team2.ratioElements["FGA"] = (team2.ratioElements["FGA"] || 0) + m.team2RatioElements["FGA"];
                team2.ratioElements["FT"] = (team2.ratioElements["FT"] || 0) + m.team2RatioElements["FT"];
                team2.ratioElements["FTA"] = (team2.ratioElements["FTA"] || 0) + m.team2RatioElements["FTA"];
                team2.ratioElements["AST"] = (team2.ratioElements["AST"] || 0) + m.team2RatioElements["AST"];
                team2.ratioElements["TO"] = (team2.ratioElements["TO"] || 0) + m.team2RatioElements["TO"];
           
        });

        this.ranking.forEach(r => {
            r.totalPoints = (r.wins["total"] + r.ties["total"]/2);
            r.percentage = Math.round( r.totalPoints / (r.wins["total"] + r.ties["total"] + r.loses["total"]) * 100) / 100; 

            if(r.totals["FG%"]) {
                r.totals["FG%"] = !r.ratioElements["FGA"] ? 0 : Math.round(100*  r.ratioElements["FG"] / r.ratioElements["FGA"] )/100;
            }
            if(r.totals["FT%"]) {
                r.totals["FT%"] = !r.ratioElements["FTA"] ? 0 : Math.round(100*  r.ratioElements["FT"] / r.ratioElements["FTA"] )/100;
            }
            if(r.totals["ATO"]) {
                r.totals["ATO"] = !r.ratioElements["TO"] ? 0 : Math.round(100*  r.ratioElements["AST"] / r.ratioElements["TO"] )/100;
            }
        });

        this.ranking = this.ranking.sort(function(a,b) {return b.percentage - a.percentage });

        var place = 0;
        this.ranking.forEach(r => {
            r.place = ++place; 
        });

    }
}
