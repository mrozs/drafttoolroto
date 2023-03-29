import { Category } from './Category';
import { TeamRanking, CategoryValue } from './team.ranking';
import { LeaqueModel } from './leaque.model/leaque.model';
import { LeaqueModelCategoryRank } from './leaque.model/leaque.model.category.rank';
import { Player } from './player/player';
import { Draft } from './draft';
import { PuntCategories } from './punt.categories';
import { Team } from './team';
import * as Enumerable from "linq-es2015"; 
import { Categories } from './categories';
import { LeagueModelTeam } from './leaque.model/league.model.team';

export class TeamRankingCalculator {
    modelArray: Array<Object>;

    constructor(private leagueModel: LeagueModelTeam[], private draft: Draft) { }

    public calculateAverages(players: Array<Player>){
        var averages = new Object();
        this.draft.categories.forEach(c => {
            if(c.name == "FG%"){
                averages["FG%"] = !Enumerable.asEnumerable(players).Average(p => p.statistics.FGA) ? 0 :
                 Math.round(100*  Enumerable.asEnumerable(players).Average(p => p.statistics.FGA*p.statistics.FG_) / 
                 Enumerable.asEnumerable(players).Average(p => p.statistics.FGA) )/100;
            }
            else if(c.name == "FT%"){
                averages["FT%"] = !Enumerable.asEnumerable(players).Average(p => p.statistics.FTA) ? 0 :
                 Math.round(100*  Enumerable.asEnumerable(players).Average(p => p.statistics.FTA*p.statistics.FT_) / 
                 Enumerable.asEnumerable(players).Average(p => p.statistics.FTA) )/100;
            }
            else if(c.name == "ATO"){
                averages["ATO"] = !Enumerable.asEnumerable(players).Average(p => p.statistics.TO) ? 0 :
                 Math.round(100*  Enumerable.asEnumerable(players).Average(p => p.statistics.ATO*p.statistics.TO) / 
                 Enumerable.asEnumerable(players).Average(p => p.statistics.TO) )/100;
            }
            else { 
                var catTranslateKey = Enumerable.asEnumerable(Categories.list)
                    .FirstOrDefault(cat => cat.name == c.name).property;
                averages[c.name] = Math.round(100*Enumerable.asEnumerable(players).Average(p => p.statistics[catTranslateKey]))/100; 
            }
            var cat = Enumerable
                .asEnumerable(this.leagueModel)
                .Where(m => Enumerable.asEnumerable(m.Cats)
                .Any(ct=>ct.CatId == c.id && ((ct.Value < averages[c.name]) && c.negative != true || (ct.Value > averages[c.name]) && c.negative)))
                .Count() - this.draft.leagueSize/2;
            
            if(cat>7) averages[c.name + "class"] = "over100";
            else if(cat<-7) averages[c.name + "class"] = "under100";
            else if(cat>6) averages[c.name + "class"] = "over80";
            else if(cat<-6) averages[c.name + "class"] = "under80";
            else if(cat>5) averages[c.name + "class"] = "over60";
            else if(cat<-5) averages[c.name + "class"] = "under60";
            else if(cat>4) averages[c.name + "class"] = "over40";
            else if(cat<-4) averages[c.name + "class"] = "under40";
            else if(cat>3) averages[c.name + "class"] = "over20";
            else if(cat<-3) averages[c.name + "class"] = "under20";
            else if(cat>2) averages[c.name + "class"] = "over10";
            else if(cat<-2) averages[c.name + "class"] = "under10";
        });
        return averages;
    }


    calculateInternal(teams: Array<Team>, puntCategories: PuntCategories = new PuntCategories()) {
        const leaqueModel = new LeaqueModel();
        for (let category of this.draft.categories) {
            if (!leaqueModel.hasCategory(category)) {
                leaqueModel.addCategory(category);
            }

            teams.forEach(team => {
                let categoryAverageValue = this.calculateAverageValueFor(team.players, category);
                leaqueModel.addRank(category, new LeaqueModelCategoryRank(categoryAverageValue.value));
            })
        }

        const teamWithInternalRankings = new Array<Team>();
        const teamRankings = new Array<TeamRanking>();
        teams.forEach(team => {
            const teamRanking = new TeamRanking();
            // for (let category of this.draft.categories) {
            //     let categoryAverageValue = team.ranking.average.filter(x => x.category.id == category.id)[0];
            //     let leagueModelCategory = leaqueModel.getLeagueCategory(categoryAverageValue.category.id);
            //     let points = new CategoryValue(categoryAverageValue.category, leagueModelCategory.place(categoryAverageValue.value));

            //     teamRanking.average.push(categoryAverageValue);
            //     teamRanking.projectedFantasyPoints.push(points);
            // }
            // teamRanking.projectedFantasyPoints.forEach(x => {
            //     if (!puntCategories.categories.some(pc => pc.id == x.category.id)) {
            //         teamRanking.totalPoints += x.value
            //     }
            // });
            teamRankings.push(teamRanking);

            let internalRankingTeam = new Team(team.players, teamRanking);
            internalRankingTeam.name = team.name;
            internalRankingTeam.id = team.id;

            teamWithInternalRankings.push(internalRankingTeam);
        });

        teamRankings.forEach(x => leaqueModel.addTotalPoints(x.percentage));
        teamRankings.forEach(x => x.place = leaqueModel.place(x.percentage));


        return teamWithInternalRankings;

    }

    calculate(team: Array<Player>, puntCategories: PuntCategories = new PuntCategories()): TeamRanking {
        const teamRanking = new TeamRanking();

        // for (let category of this.draft.categories) {
        //     let averageCategoryValue = this.calculateAverageValueFor(team, category);
        //     let points = this.calculatePoints(averageCategoryValue);

        //     teamRanking.average.push(averageCategoryValue);
        //     teamRanking.projectedFantasyPoints.push(points);
        // }

        // teamRanking.projectedFantasyPoints.forEach(x => {
        //     if (!puntCategories.categories.some(pc => pc.id == x.category.id)) {
        //         teamRanking.totalPoints += x.value
        //     }
        // });
        //teamRanking.place = this.leagueModel.place(50); //teamRanking.totalPoints);

        return new TeamRanking();// teamRanking;
    }

    calculateAverageValueFor(team: Array<Player>, category: Category): CategoryValue {
        let averageCategoryValue = 0;
        team.forEach(x => averageCategoryValue += x.statistics[category.property]);
        if (team.length) {
            averageCategoryValue /= team.length;
        }


        return new CategoryValue(category, averageCategoryValue);
    }

    // calculatePoints(average: CategoryValue): CategoryValue {
    //     let leagueModelCategory = this.leagueModel.getLeagueCategory(average.category.id);

    //     return new CategoryValue(average.category, leagueModelCategory.place(average.value));
    // }
}