import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Draft } from '../draft';
import { BaseService } from '../../base.service';

@Injectable()
export class LeagueCalendarService extends BaseService {
  constructor(private http: Http) { 
    super();
  }

  getLeagueCalendar(): Promise<any> {
    let url = this.GetBaseUrl() +  `/H2HTools/GetH2HCalendar`;

    return this.http
      .get(url)
      .map((res: Response) => {
        return res.json();
      })
      .toPromise();
  }
}