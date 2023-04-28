import { Injectable } from '@angular/core';
import { Draft } from './draft';
import { TeamDefinition } from './team.definition';
import { Categories } from './categories';
import { Category } from './category'
import { Cookie } from 'ng2-cookies';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';
import { BaseService } from '../base.service';

@Injectable()
export class DraftService extends BaseService {
  constructor(private http: HttpClient) {
    super();
   }

  getDraft(): Promise<Draft> {
    return this.load();
  }

  public load(): Promise<Draft> {
    let promises = [];

    let jsonParemtersRepresentation = JSON.parse(this.readCookie());
    let startParameters = new Draft();

    startParameters.seasonFilter = jsonParemtersRepresentation.seasonFilter ? jsonParemtersRepresentation.seasonFilter : 20192;
    startParameters.period = jsonParemtersRepresentation.period;
    startParameters.periodFilter = startParameters.period;
    if (startParameters.period == 0) {
      startParameters.seasonFilter = 99999;
    }
    if (startParameters.period == 1) {
      startParameters.periodFilter = 0;
    }
    if(jsonParemtersRepresentation.teamBudget){
      startParameters.budget = jsonParemtersRepresentation.teamBudget;
    }

    startParameters.includeProjections = jsonParemtersRepresentation.includeProjections == true;

    if (jsonParemtersRepresentation.LeagueKey.indexOf("custom") == 0) {
      startParameters.custom = true;
      startParameters.leagueSize = jsonParemtersRepresentation.leagueSize;
      startParameters.teamSize = Number(jsonParemtersRepresentation.teamSize);
      startParameters.teamBudget = jsonParemtersRepresentation.teamBudget;
      startParameters.leagueName = jsonParemtersRepresentation.customLeagueName;
      startParameters.leagueKey = jsonParemtersRepresentation.LeagueKey;
      startParameters.categoriesFlags = jsonParemtersRepresentation.categories;
      
      startParameters.teamId = "1";

      if (startParameters.budget > 0) {
        startParameters.showDraftResultPrice = startParameters.showRankingPrice = true;
      }
      if (jsonParemtersRepresentation.scoringType == 0) {
        startParameters.endWeek = jsonParemtersRepresentation.endWeek || 24;
        startParameters.playoffSize = jsonParemtersRepresentation.playoffSize;
      }

      startParameters.teamDefinitions = new Array<TeamDefinition>();
      jsonParemtersRepresentation.teams.forEach((name, index) => {
        var teamId = index + 1;
        startParameters.teamDefinitions.push(new TeamDefinition(teamId, name));
      });

      startParameters.categories = this.getCategories(jsonParemtersRepresentation.categories);
      startParameters.valueCategories = this.getValueCategories(startParameters.categories);

      let benchPositionCount = jsonParemtersRepresentation.positions.filter(x => x.name == "B")[0].count;
      startParameters.activeTeamSize = startParameters.teamSize - benchPositionCount;

      return Promise.resolve(startParameters);
    } else if (jsonParemtersRepresentation.LeagueKey === "mock") {
      const promises = [];
      const windowUrl = jsonParemtersRepresentation.windowURL;
      const parametersQuery = queryString.extract(jsonParemtersRepresentation.windowURL);
      const windowUrlParameters = queryString.parse(parametersQuery);

      if (windowUrl.includes('espn')) {
        startParameters.type = "espn-mock";
        startParameters.teamId = windowUrlParameters.teamId;
        startParameters.leaqueId = windowUrlParameters.leagueId;

        return new Promise<Draft>(resolve => {
          const leagueTeamsUrl = this.GetBaseUrl() +  `/LeagueList/LeagueTeams?`
            + `leagueKey=${startParameters.leaqueId}&teamId=${startParameters.teamId}&providerType=2`;
          const leagueTeamsPromise = this.http
            .get(leagueTeamsUrl, { withCredentials: true })
            .toPromise();

          const leagueSettingsUrl = this.GetBaseUrl() +  `/LeagueList/LeagueSettings?`
            + `leagueKey=${startParameters.leaqueId}&teamId=${startParameters.teamId}&providerType=2`;
          const leagueSettingsPromise = this.http
            .get(leagueSettingsUrl, { withCredentials: true })
            .toPromise();

          Promise.all([leagueSettingsPromise, leagueTeamsPromise]).then((results: any) => {
            const leagueSettings = results[0].json();
            startParameters.activeTeamSize = leagueSettings.rosterActive;
            startParameters.teamSize = leagueSettings.rosterActive + leagueSettings.rosterBench;
            startParameters.leagueKey = leagueSettings.LeagueKey;
            startParameters.leagueName = leagueSettings.Name;
            startParameters.categoriesFlags = leagueSettings.settings;
            startParameters.categories = this.getCategories(leagueSettings.settings);
            startParameters.valueCategories = this.getValueCategories(startParameters.categories);
            startParameters.budget = 0;
            startParameters.custom = false;

            if (jsonParemtersRepresentation.scoringType == 0) {
              startParameters.endWeek = jsonParemtersRepresentation.endWeek || 24;
              startParameters.playoffSize = jsonParemtersRepresentation.playoffSize;
            }

            
            if (leagueSettings.auction == true)
            {
                startParameters.showDraftResultPrice = true;
    
                if (leagueSettings.draft_type != 'live') {
                startParameters.showRankingPrice = true;
              }
            }

            const leagueTeams = results[1].json();
            leagueTeams.forEach(x => startParameters.teamDefinitions.push(new TeamDefinition(x.TeamKey, x.TeamName)));
            startParameters.leagueSize =  leagueSettings.LeagueSize || leagueTeams.length;

            resolve(startParameters);
          })
        });
      } else {
        startParameters.type = "yahoo-mock";
        if (windowUrl.includes("mlid")) {
          startParameters.leaqueId = windowUrlParameters.mlid;
        } else {
          const parts = windowUrl.split('/');
          startParameters.leaqueId = parts[parts.length - 2];
        }
        startParameters.gameId = jsonParemtersRepresentation.GameId;
        startParameters.teamId = jsonParemtersRepresentation.teamId;
        startParameters.leagueKey = `${startParameters.gameId}.l.${startParameters.leaqueId}`;
        const leagueTeamsUrl = this.GetBaseUrl() +  `/LeagueList/LeagueTeams?leagueKey=${startParameters.leagueKey}&providerType=1&teamId=${startParameters.teamId}`;
        const leagueSettingsUrl = this.GetBaseUrl() +  `/LeagueList/LeagueSettings?leagueKey=${startParameters.leagueKey}&providerType=1`;

        const leagueSettingsPromise = this.http
          .get(leagueSettingsUrl, { withCredentials: true })
          .toPromise();
        const leagueTeamsPromise = this.http
          .get(leagueTeamsUrl, { withCredentials: true })
          .toPromise();

        return new Promise<Draft>(resolve => {
          Promise.all([leagueSettingsPromise, leagueTeamsPromise]).then((results: any) => {
            const leagueSettings = results[0].json();
            startParameters.activeTeamSize = leagueSettings.rosterActive;
            startParameters.teamSize = leagueSettings.rosterActive + leagueSettings.rosterBench;
            startParameters.leagueKey = leagueSettings.LeagueKey;
            startParameters.leagueName = leagueSettings.Name;
            startParameters.categoriesFlags = leagueSettings.settings;
            startParameters.categories = this.getCategories(leagueSettings.settings);
            startParameters.valueCategories = this.getValueCategories(startParameters.categories);
            startParameters.budget = 0;
            startParameters.custom = false;

            if (leagueSettings.draft_type == 'live' && leagueSettings.auction == true) {
              startParameters.showDraftResultPrice = true;
              startParameters.budget = 200;
            }

            if (leagueSettings.ScoringType == 'head') {
              startParameters.endWeek = leagueSettings.end_week || 24;
              startParameters.playoffSize = leagueSettings.num_playoff_teams || 6;
            }

            const leagueTeams = results[1].json();
            leagueTeams.forEach(x => startParameters.teamDefinitions.push(
              new TeamDefinition(
                x.TeamKey.split("t.").length>1 ? x.TeamKey.split("t.")[1] : x.TeamKey
                , x.TeamName)));
            startParameters.leagueSize = leagueSettings.LeagueSize || leagueTeams.length;

            startParameters.teamId = leagueTeams.filter(x => x.UserTeam)[0].TeamKey;

            resolve(startParameters);
          })
        });
      }
    } else {
      startParameters.leagueKey = jsonParemtersRepresentation.LeagueKey;
      const leagueTeamsUrl = this.GetBaseUrl() +  `/LeagueList/LeagueTeams?leagueKey=${startParameters.leagueKey}`;
      const leagueSettingsUrl = this.GetBaseUrl() +  `/LeagueList/LeagueSettings?leagueKey=${startParameters.leagueKey}`;

      const leagueSettingsPromise = this.http
        .get(leagueSettingsUrl, { withCredentials: true })
        .toPromise();
      const leagueTeamsPromise = this.http
        .get(leagueTeamsUrl, { withCredentials: true })
        .toPromise();

      return new Promise<Draft>(resolve => {
        Promise.all([leagueSettingsPromise, leagueTeamsPromise]).then((results: any) => {
          const leagueSettings = results[0].json();
          startParameters.leagueName = leagueSettings.Name;
          startParameters.categoriesFlags = leagueSettings.settings;
          startParameters.activeTeamSize = leagueSettings.rosterActive;
          startParameters.teamSize = leagueSettings.rosterActive + leagueSettings.rosterBench;
          startParameters.categories = this.getCategories(leagueSettings.settings);
          startParameters.valueCategories = this.getValueCategories(startParameters.categories);
          if(!startParameters.budget) startParameters.budget = 0;
          startParameters.custom = leagueSettings.draft_type != "live";
          startParameters.type = startParameters.leagueKey.toLowerCase().indexOf('e') == 0 ? 'espn-custom' : 'yahoo-custom';

          if (leagueSettings.draft_type == 'self' && leagueSettings.auction == true) {
            startParameters.showDraftResultPrice = startParameters.showRankingPrice = true;
          }

          if (leagueSettings.draft_type == 'live' && leagueSettings.auction == true) {
            startParameters.showDraftResultPrice = true;
          }

          if (leagueSettings.ScoringType == 'head') {
            startParameters.endWeek = leagueSettings.end_week || 24;
            startParameters.playoffSize = leagueSettings.num_playoff_teams || 6;
          }

          const leagueTeams = results[1].json();
          leagueTeams.forEach(x => startParameters.teamDefinitions.push(new TeamDefinition(x.TeamKey, x.TeamName)));
          startParameters.leagueSize = leagueSettings.LeagueSize || leagueTeams.length;

          startParameters.teamId = leagueTeams.filter(x => x.UserTeam)[0].TeamKey;

          resolve(startParameters);
        })
      });
    }
  }

  private getCategories(categoriesFlags: string): Array<Category> {
    const categories = new Array<Category>();
    categoriesFlags.split('').forEach((isEnabled, index) => {
      if (isEnabled === "1") {
        categories.push(Categories.list[index]);
      }
    });

    return categories;
  }

  private getValueCategories(categories: Array<Category>) {
    let valueCategories = Array<any>();
    categories.forEach(x => {
      if (Categories.hasValue(x)) {
        valueCategories.push(Categories.value(x));
      }
    });
    return valueCategories;
  }

  private readCookie(): string {
    if (Cookie.check("draftParamsCookie")) {
      return Cookie.get("draftParamsCookie");
    }

    /*
 return '{"LeagueKey":"364.l.30354","period":"3"}';
 
 return '{"LeagueKey":"mock","period":"2","windowURL":"http://games.espn.com/fba/draft/external/draft?leagueId=15833&teamId=3&userProfileId=160144887","GameId":"364"}';
        */

    return '{"LeagueKey":"custom", "period":"1", "leagueSize":"12", "teamSize":"13", "teamBudget":"20",'
      + '"categories":"111111111000000000000000000000000000000000000", "includeProjections": "true",'
      + '"teams":["My team\'s name", "Team 2 choleranie dluga nazwa tralala", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8", "Team 9", "Team 10", "Team 11", "Team 12"],'
      + '"positions":[{ "name": "PG", "count": 1, "$$hashKey": "object:9" }, { "name": "SG", "count": 1, "$$hashKey": "object:10" },'
      + '{ "name": "G", "count": 1, "$$hashKey": "object:11" }, { "name": "SF", "count": 1, "$$hashKey": "object:12" },'
      + '{ "name": "PF", "count": 1, "$$hashKey": "object:13" }, { "name": "F", "count": 1, "$$hashKey": "object:14" },'
      + '{ "name": "C", "count": 2, "$$hashKey": "object:15" }, { "name": "U", "count": 2, "$$hashKey": "object:16" },'
      + '{ "name": "B", "count": 3, "$$hashKey": "object:17" }], "customeLeagueName":"Moja liga testowa"}';

  }
}