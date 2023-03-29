import { Player } from './player/player'
import { Category } from './category'
import { Team } from './team'

export class CategoryValue {
    constructor(public category: Category, public value: number) { }
}

export class TeamRanking {
    totalPoints: number;
    place: number;
    wins: Object;
    loses: Object;
    ties: Object;
    cats: Object;
    totals: Object;
    ratioElements: Object;

    percentage: number;

    team: Team;

    // average: CategoryValue[] = new Array<CategoryValue>();
    // projectedFantasyPoints: CategoryValue[] = new Array<CategoryValue>();


}