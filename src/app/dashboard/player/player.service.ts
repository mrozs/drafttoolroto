
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Draft } from '../draft';
import { PuntCategories } from '../punt.categories';
import { Player } from './player';
import { PlayerAdapter } from './player.adapter';

import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base.service';

@Injectable()
export class PlayerService extends BaseService {
  constructor(private http: HttpClient) { 
    super();
  }

  getPlayes(draft: Draft, puntCategories: PuntCategories): Promise<Player[]> {
    let url = this.GetBaseUrl() +  `/Ranking/GetRankForLeagueParams` +
      `?leagueSize=${draft.leagueSize}&teamSize=${draft.teamSize}&cats=${draft.categoriesFlags}&budget=${draft.budget}&` +
      `seasonFilter=${draft.seasonFilter}&periodFilter=${draft.periodFilter}&withNinjaProjections=1&` +
      `withMyProjections=${draft.includeProjections}&puntCats=${puntCategories.puntCategoriesFlags()}`;

    return this.http
      .get(url).pipe(
      map((res: any) => {
        
        let players = new Array<Player>();
        let rawPlayers = JSON.parse(res.json());
        for (let rankResult of rawPlayers) {
          let rawPlayer = rankResult.RankResult;  
          var player = PlayerAdapter.adapt(rawPlayer, rankResult.IncludingUserProjections, rankResult.PuntValue);
          players.push(player);
        }

        return players;
      }))
      .toPromise();
  }
}