
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from '../../base.service';
import { Draft } from '../draft';

@Injectable()
export class LeaqueModelService extends BaseService {
  constructor(private http: HttpClient) { 
    super();
  }

  getLeagueModel(draft: Draft): Promise<any> {
    let url = this.GetBaseUrl() +  `/league/leagueModel?` +
      `ActiveTeamSize=${draft.activeTeamSize}&` +
      `LeagueSize=${draft.leagueSize}&` +
      `Cats=${draft.categoriesFlags}&` +
      `AddPoints=true`;

    return this.http
      .get(url).pipe(
      map((res: Response) => {
        return res.json();
      }))
      .toPromise();
  }
}