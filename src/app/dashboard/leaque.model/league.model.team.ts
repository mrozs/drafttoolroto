import { LeagueModelCat } from './league.model.cat'

export class LeagueModelTeam {
    TeamId: number;
    Total: number;
    Cats: Array<LeagueModelCat>;
}