import { Injectable } from '@angular/core';
import { Player } from './player';
import { Draft } from '../draft';
import { Http, Response } from '@angular/http';
import { PuntCategories } from '../punt.categories';
import { PlayerAdapter } from './player.adapter';
import 'rxjs/add/operator/map';
import { BaseService } from '../../base.service';

@Injectable()
export class PlayerService extends BaseService {
  constructor(private http: Http) { 
    super();
  }

  getPlayes(draft: Draft, puntCategories: PuntCategories): Promise<Player[]> {
    let url = this.GetBaseUrl() +  `/Ranking/GetRankForLeagueParams` +
      `?leagueSize=${draft.leagueSize}&teamSize=${draft.teamSize}&cats=${draft.categoriesFlags}&budget=${draft.budget}&` +
      `seasonFilter=${draft.seasonFilter}&periodFilter=${draft.periodFilter}&withNinjaProjections=1&` +
      `withMyProjections=${draft.includeProjections}&puntCats=${puntCategories.puntCategoriesFlags()}`;

    return this.http
      .get(url)
      .map((res: Response) => {
        
        let players = new Array<Player>();
        let rawPlayers = JSON.parse(res.json());
        for (let rankResult of rawPlayers) {
          let rawPlayer = rankResult.RankResult;  
          var player = PlayerAdapter.adapt(rawPlayer, rankResult.IncludingUserProjections, rankResult.PuntValue);
          players.push(player);
        }

        return players;
      })
      .toPromise();
  }
}