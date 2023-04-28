
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from '../../base.service';

@Injectable()
export class LeagueCalendarService extends BaseService {
  constructor(private http: HttpClient) { 
    super();
  }

  getLeagueCalendar(): Promise<any> {
    let url = this.GetBaseUrl() +  `/H2HTools/GetH2HCalendar`;

    return this.http
      .get(url).pipe(
      map((res: Response) => {
        return res.json();
      }))
      .toPromise();
  }
}