
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Player } from './player';

import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base.service';

@Injectable()
export class PlayerUnknownService extends BaseService {
  constructor(private http: HttpClient) {
    super();
   }

  getPlayerDetails(playerId: number): Promise<Player> {
    let url = this.GetBaseUrl()    +  `/players/getplayerdetails?nbaplayerid=${playerId}`;

    return this.http
      .get(url).pipe(
      map((res: Response) => {
               
        let player = new Player();

            player.id = playerId;
            let rawPlayer = JSON.parse(res["_body"]);
            
            player.name = rawPlayer["name"];
            player.team = rawPlayer["teamShort"].toUpperCase();

            player.statistics = {
                M: 0,
                FG_: 0,
                C3PA_FGA: 0,
                FGM: 0,
                FGA: 0,
                FGMS: 0,
                C3PM: 0,
                C3PM48: 0,
                C3PA: 0,
                C3PMS: 0,
                C3P_: 0,
                C2P_: 0,
                AFG_: 0,
                FT_: 0,
                FTM: 0,
                FTA: 0,
                FTMS: 0,
                NETFT: 0,
                C2PM: 0,
                C2PA: 0,
                OREB: 0,
                DREB: 0,
                REB: 0,
                AST: 0,
                STL: 0,
                BLK: 0,
                SB: 0,
                PTS48: 0,
                DPG: 0,
                ATO: 0,
                A_TO: 0,
                S_TO: 0,
                TO: 0,
                TRN48: 0,
                PF: 0,
                PTS: 0,
                PPG: 0,
                T: 0,
                DD: 0,
                TD: 0,
                EJ: 0,
                FL: 0,
                GS: 0
              }

        return player;
      }))
      .toPromise();
  }
}