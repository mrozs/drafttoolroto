import { Player } from './../player/player'
import { Team } from './../team'
import { TeamRanking } from '../team.ranking';
import { H2hResultMatchup } from '../h2hresult/h2hresult.matchup';

export class CombinationResult {
    constructor(public standings: Array<TeamRanking>, public matchups: Array<H2hResultMatchup>) { }
}