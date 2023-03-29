import { Injectable } from '@angular/core';
import { DraftResult } from './draft.result';
import { Player } from '../player/player';
import { TeamDefinition } from '../team.definition';
import { Http, Response } from '@angular/http';
import { Draft } from '../draft';
import { TeamPlayers } from '../team.players';
import { BaseService } from '../../base.service';


@Injectable()
export class DraftResultService extends BaseService {
    private draftResults = new Array<DraftResult>();
    constructor(private http: Http) { 
        super();
    }

    saveCustomDraftPick(pickNo: number, teamDefinition: TeamDefinition, player: Player, draft: Draft): any{
        let url;
        let pickDTO = { PickNumber: pickNo, PlayerId: player.id, Cost: player.price, Team: teamDefinition ? teamDefinition.id : "" };
        let body = {pick: pickDTO, leagueName: draft.leagueName};
        url = this.GetBaseUrl()  +  `/Draft/SaveCustomDraftPick`;

        return this.http
        .post(url, body)
        .map((res: Response) => {
            return res;
        }).subscribe();
    }

    getCustomDraftResult(draft: Draft, players: Array<Player>, teamDefinitions: Array<TeamDefinition>): Promise<Array<DraftResult>> {
        let url;

        url = this.GetBaseUrl() +  `/Draft/GetCustomLeagueDraftResults?leagueKey=${draft.leagueName}`;
       
        return this.http
        .get(url)
        .map((res: Response) => {
            let unknownPlayers = new Array<number>();
            let picks = new Array<DraftResult>();
            for (let pick of res.json()) {
                let player = players.filter(x => x.id == pick.PlayerId)[0];
                let team = teamDefinitions.filter(x => x.id == pick.Team)[0];
                if (!player) {
                    unknownPlayers.push(pick.PlayerId);
                    continue;
                } else {
                    player.price = pick.Cost;
                    player.picked = true;
                }

                let draftResult = new DraftResult(pick.PickNumber, player, team)
                draftResult.price = pick.Cost;
                picks.push(draftResult);
            }
            if (unknownPlayers.length) {
                console.log(`brak graczy ${unknownPlayers}`)
            }
            
            return picks;
        }).
        toPromise();
    }

    getDraftResult(draft: Draft, players: Array<Player>, teamDefinitions: Array<TeamDefinition>): Promise<Array<DraftResult>> {
        let url;
        let unknownPlayerUrl;

        if (draft.type == 'espn-custom') {
            let leagueKey = draft.leagueKey.split('.')[2];
            let teamId = draft.teamId.split('.')[4];
            url = this.GetBaseUrl() +  `/leaguelist/GetDraftData?leagueKey=${leagueKey}&teamId=${teamId}&providerType=2`;
        }
        if (draft.type == 'yahoo-custom') {
            let teamId = draft.teamId.split('.')[4];
            url = this.GetBaseUrl() + `/leaguelist/GetDraftData?leagueKey=${draft.leagueKey}&teamId=${teamId}&providerType=1`;
        }
        if (draft.type == "espn-mock") {
            url = this.GetBaseUrl() +  `/leaguelist/GetDraftData?leagueKey=${draft.leaqueId}&teamId=${draft.teamId}&providerType=2`;
        }
        if (draft.type == "yahoo-mock") {
            url = this.GetBaseUrl() +  `/leaguelist/GetDraftData?leagueKey=${draft.leagueKey}&teamId=${draft.teamId}&providerType=1`;
        }

        unknownPlayerUrl = this.GetBaseUrl() +  '/players/getplayerdetails?nbaplayerid=';

        return this.http
            .get(url)
            .map((res: Response) => {
                let unknownPlayers = new Array<number>();
                let picks = new Array<DraftResult>();
                //console.log(res["_body"]);
                if(!res["_body"] || res["_body"] == "[]" || res["_body"] == "Yahoo! connection problem"){
                    return picks;
                }
                for (let pick of res.json()) {
                    if(draft.type.indexOf("yahoo")>-1 && pick.Team){
                        pick.Team = pick.Team.split("t.")[1];
                    }

                    let player = players.filter(x => x.id == pick.PlayerId)[0];
                    let team = teamDefinitions.filter(x => x.id == pick.Team)[0];
                    if (!player) {
                        player = new Player();
                        player.id = pick.PlayerId;
                        player.picked = true;
                        if(pick.PlayerName){
                            player.name = pick.PlayerName;
                            player.team = pick.NbaTeam;
                            player.statistics = {
                                M: 0, FG_: 0, C3PA_FGA: 0, FGM: 0, FGA: 0,FGMS: 0,C3PM: 0,C3PM48: 0,C3PA: 0,C3PMS: 0,C3P_: 0,C2P_: 0,AFG_: 0,FT_: 0,
                                FTM: 0,FTA: 0,FTMS: 0,NETFT: 0,C2PM: 0,C2PA: 0,OREB: 0,DREB: 0,REB: 0,AST: 0,STL: 0,BLK: 0,SB: 0,PTS48: 0,DPG: 0,ATO: 0,
                                A_TO: 0,S_TO: 0,TO: 0,TRN48: 0,PF: 0,PTS: 0,PPG: 0,T: 0,DD: 0,TD: 0,EJ: 0,FL: 0,GS: 0
                              }
                        }
                    } else {
                        player.price = pick.Cost;
                        player.picked = true;
                    }

                    let draftResult = new DraftResult(pick.PickNumber, player, team)
                    draftResult.price = pick.Cost;
                    picks.push(draftResult);
                }
                if (unknownPlayers.length) {
                    console.log(`brak graczy ${unknownPlayers}`)
                }
                
                return picks;
            }).
            toPromise();
    }
}