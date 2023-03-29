import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Draft } from '../draft';
import { BaseService } from '../../base.service';

@Injectable()
export class LeaqueModelService extends BaseService {
  constructor(private http: Http) { 
    super();
  }

  getLeagueModel(draft: Draft): Promise<any> {
    let url = this.GetBaseUrl() +  `/league/leagueModel?` +
      `ActiveTeamSize=${draft.activeTeamSize}&` +
      `LeagueSize=${draft.leagueSize}&` +
      `Cats=${draft.categoriesFlags}&` +
      `AddPoints=true`;

    return this.http
      .get(url)
      .map((res: Response) => {
        return res.json();
      })
      .toPromise();
  }
}