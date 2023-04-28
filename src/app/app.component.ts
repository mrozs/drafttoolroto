
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Player } from './dashboard/player/player'
import { Draft } from './dashboard/draft'
import { PuntCategories } from './dashboard/punt.categories';
import { RateValue } from './dashboard/rate.value'
import { PlayerService } from './dashboard/player/player.service';
import { DraftService } from './dashboard/draft.service';
import { DraftResultService } from './dashboard/draft.result/draft.result.service';
import { DraftResults } from './dashboard/draft.result/draft.results'
import { DraftResult } from './dashboard/draft.result/draft.result'
import { LeaqueModelService } from './dashboard/leaque.model/leaque.model.service';
import { LeagueCalendarService } from './dashboard/league.calendar/league.calendar.service';
import { TeamRankingCalculator } from './dashboard/team.ranking.calculator';
import { PlayerCombinations } from './dashboard/combination/player.combinations';
import { TeamRanking } from './dashboard/team.ranking';
import { TeamPlayers } from './dashboard/team.players';
import { Team } from './dashboard/team';
import { TeamDefinition } from './dashboard/team.definition'
import * as RankingCombinationCalculator from 'worker-loader!./../web-workers/web-worker.bundle.js';
import { Cookie } from 'ng2-cookies';
import * as Enumerable from "linq-es2015"; 

import { H2HResult } from './dashboard/h2hresult/h2hresult';
import { ScheduleWeek } from './dashboard/h2hresult/h2hresult.schedule.week';
import { LeagueCalendarGame } from './dashboard/league.calendar/league.calendar.game';
import { LeaguePlayoffCalculator } from './dashboard/h2hresult/league.playoff.calculator';
import { LeagueModelTeam } from './dashboard/leaque.model/league.model.team';
import { PlayerUnknownService } from './dashboard/player/player.unknown.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html'
})

export class DashboardComponent {
  @ViewChild('standingsMenuOption') el:ElementRef;

  expires = new Date();

  targetPlayersChecked;
  excludePlayersChecked;
  includeMyProjectionsChecked;
  puntCategoriesChecked = new PuntCategories();

  targetPlayers;
  includeMyProjections;
  excludePlayers;
  puntCategories = new PuntCategories();

  teams: Array<Team>;
  playersToPick: Player[];
  unknownPlayers: Player[];
  selectedTeamPlayers: Player[];
  selectedTeamAverages: Object = new Object();
  selectedTeamAverageRanks: Object = new Object();
  selectedTeamAverageMatchupResults: Object = new Object();
  myTeamPlayers: Player[];
  myTeamAverages: Object = new Object();
  myTeamAverageRanks: Object = new Object();
  myTeamAverageMatchupResults: Object = new Object();
  internalRankings: Array<Team>;
  
  h2hResult: H2HResult = new H2HResult();
  myMatchups: Array<ScheduleWeek> = new Array<ScheduleWeek>();
  leagueModel: LeagueModelTeam[];

  teamsDefinitionToSelect = new Array<TeamDefinition>();
  selectedTeamDefinition: TeamDefinition = new TeamDefinition(null, null);
  selectedTeam: Team = new Team(new Array<Player>(), new TeamRanking());
  selectedInternalRanking: Team = new Team(new Array<Player>(), new TeamRanking());

  myTeamDefinition: TeamDefinition = new TeamDefinition(null, null);
  myTeam: Team = new Team(new Array<Player>(), new TeamRanking());
  myInternalRanking: Team = new Team(new Array<Player>(), new TeamRanking());

  draft: Draft = new Draft();
  playerCombinations = new PlayerCombinations();
  rateValue = new RateValue();
  teamPlayers: TeamPlayers;
  draftResults = new DraftResults();
  draftResult = new Array<DraftResult>();
  rankingCombinationCalculator;
  calendarAggregated: Array<LeagueCalendarGame>;
  playoffCalculator: LeaguePlayoffCalculator = new LeaguePlayoffCalculator();
  teamRankingCalculator: TeamRankingCalculator;
  teamPlayoffGames: Object;
  teamPlayoffGameAverage: number;

  currentSortProperty: string = "value"
  currentSortOrder: string = "-";
  searchPhrase: string;
  myTeamPlace: number = 1;
  myTeamResult: string = "0-0-0";

  loading: boolean = true;
  showWelcome: boolean = false;
  draftFinished: boolean = false;

  constructor(private playerService: PlayerService, private draftService: DraftService, 
    private playerUnknownService: PlayerUnknownService, private leaqueModelService: LeaqueModelService, 
    private leagueCalendarService: LeagueCalendarService, private draftResultService: DraftResultService, private ngZone: NgZone) {

    this.expires.setFullYear(this.expires.getFullYear() + 5);

    this.targetPlayers = this.targetPlayersChecked = false;
    this.excludePlayers = this.excludePlayersChecked = false;
    this.includeMyProjections = this.includeMyProjectionsChecked = false;

    // this.rankingCombinationCalculator = new RankingCombinationCalculator();
    /* this.rankingCombinationCalculator.onmessage = (event) => {
      this.ngZone.run(() => {
//        this.loading = true;
        // this.playerCombinations = PlayerCombinationsAdapter.adapt(event.data.combinations);
        
        this.teams = event.data.teams as Array<Team>;
        this.myMatchups = event.data.myMatchups;        
        this.h2hResult = event.data.h2hresult;
        this.teamPlayoffGameAverage = this.h2hResult.teamPlayoffGameAverage ? 
          this.h2hResult.teamPlayoffGameAverage : this.teamPlayoffGameAverage;
        this.teamPlayoffGames = this.h2hResult.teamPlayoffGames ? 
          this.h2hResult.teamPlayoffGames : this.teamPlayoffGames;

          this.playersToPick.forEach(player => {
            if(this.h2hResult.teamPlayoffGames){    
              player.playoffGames = this.teamPlayoffGames[player.team.toUpperCase()] ? 
                this.teamPlayoffGames[player.team.toUpperCase()]["total"]: 0;
              player.playoffGamesText = this.teamPlayoffGames[player.team.toUpperCase()] ? 
                this.teamPlayoffGames[player.team.toUpperCase()]["text"] : '';
            }

            var playerRecalculated = event.data.combinations.filter(x => x.id == player.id);
            if(playerRecalculated){
              player.projectedResult = playerRecalculated[0].projectedResult;
              player.projectedResultCalculated = player.projectedResult > 0;
            }
          });

        this.h2hResult.playoffMatchups.forEach(m => {
          let t1 = this.h2hResult.ranking.filter(r => +r.team.id == m.team1)[0];
          let t2 = this.h2hResult.ranking.filter(r => +r.team.id == m.team2)[0];
  
          if(t1) m.team1name = t1.team.name;
          if(t2) m.team2name = t2.team.name;
          if(t1) m.team1place = t1.place;
          if(t2) m.team2place = t2.place;
        });
        this.internalRankings = event.data.interalTeamRankings as Array<Team>;

        this.refreshTeam();

        var myTeamRanking = this.h2hResult.ranking.filter(r => +r.team.id == +this.draft.teamId)[0];
        this.myTeamPlace = myTeamRanking.place;
        this.myTeamResult = myTeamRanking.wins["total"].toString() + "-" + myTeamRanking.loses["total"].toString() + "-" + myTeamRanking.ties["total"].toString();

      this.myTeamPlayers = Enumerable.asEnumerable(this.draftResult).Where(r => r.teamDefinition.id == this.draft.teamId )
        .Select(t => t.player ).ToArray();
      this.myTeamAverages = this.teamRankingCalculator.calculateAverages(this.myTeamPlayers);

        this.draft.categories.forEach(c => {
          this.myTeamAverageMatchupResults[c.name] = 
            myTeamRanking.wins[c.name].toString() + "-" + myTeamRanking.loses[c.name].toString() + "-" + myTeamRanking.ties[c.name].toString();
            if(!c.negative)
              this.myTeamAverageRanks[c.name] = this.h2hResult.ranking.filter(r => r.totals[c.name] > myTeamRanking.totals[c.name]).length + 1;
            else   
              this.myTeamAverageRanks[c.name] = this.h2hResult.ranking.filter(r => r.totals[c.name] < myTeamRanking.totals[c.name]).length + 1;
        });

        this.loading = false;

        if(this.draftResult.filter(r => r.teamDefinition).length >= (this.draft.leagueSize * this.draft.teamSize) ){
          this.draftFinished = true;
          //$("#standingsMenuOption").click();
          this.el.nativeElement.click();
        }
      });
    }; */

    this.initialize();
  }


  initialize() {
    this.draftService.getDraft().then(draft => {
      if(draft.teamId.split("t.").length>1){
        draft.teamId = draft.teamId.split("t.")[1];
      }
      this.draft = draft;

      if(this.playersToPick){
        this.loading = false;
        return;
      }

      this.showWelcome = !this.userClosedWelcomeScreen();
      this.includeMyProjections = this.includeMyProjectionsChecked = this.draft.includeProjections;

      const playersPromise = this.playerService.getPlayes(this.draft, this.puntCategories);
      const leaqueCalendarPromise = this.leagueCalendarService.getLeagueCalendar();
      const leaqueModelPromise = this.leaqueModelService.getLeagueModel(this.draft);

      Promise.all([playersPromise, leaqueCalendarPromise, leaqueModelPromise]).then(result => {
        this.draftResults.initialize(this.draft.teamSize, this.draft.leagueSize);

        const calendar = result[1];        
        this.leagueModel = result[2];

        this.teamRankingCalculator = new TeamRankingCalculator(this.leagueModel, this.draft);

            var resultHome = calendar.map(x => {
              return new LeagueCalendarGame(x.data, x.home, '', x.weekno); 
         });
         var resultAway = calendar.map(x => {
             return new LeagueCalendarGame(x.data, x.away, '', x.weekno); 
         });
         var calendarAggregated = resultHome.concat(resultAway);

         this.playoffCalculator.CalculatePlayoffWeeks(draft.endWeek, draft.playoffSize);
         this.playoffCalculator.CalculateTeamPlayoffGames(calendarAggregated);

        this.rankingCombinationCalculator.postMessage({
          command: 'initialize',
          leagueCalendar: calendarAggregated,
          draft: this.draft
        });
        this.playersToPick = result[0];
        if (draft.custom) {
          this.playersToPick.forEach(x => x.price = null);
        }

        this.teamPlayers = new TeamPlayers(this.playersToPick);
        if(this.draft.teamDefinitions && this.draft.teamDefinitions[0].id.toString().indexOf(this.draft.leagueKey + '.t.') == 0){
//          this.draft.teamId = this.draft.leagueKey + '.t.' + this.draft.teamId;
          this.draft.teamDefinitions.forEach(x => x.id = x.id.replace(this.draft.leagueKey + '.t.', ''));

        }
        this.myTeamDefinition = this.selectedTeamDefinition = this.draft.teamDefinitions.filter(x => x.id == this.draft.teamId)[0];
        
        

        if (!this.draft.custom) {
          timer(0, 120000).subscribe(() => {
            if (!this.draftFinished)
              this.refreshDraftResult();
          });
        }
        else if(this.draft.leagueKey != "custom" && this.draft.leagueKey.indexOf("custom") == 0) {
            this.getCustomDraftResult();
        }
        else {
          this.recalculate();
        }
      });
    });

    this.restoreSettings();
  }

  refreshDraftResult() {
    if(this.draft.leagueSize > this.draft.teamDefinitions.length){
      this.initialize();
      return;
    }

    this.draftResultService.getDraftResult(this.draft, this.playersToPick, this.draft.teamDefinitions)
      .then(draftResult => {
        //this.loading = true;
        if(draftResult && draftResult.length> 0){
          this.draftResult = draftResult;
          var unknowns = this.draftResult.filter(r => !r.player.name);
          unknowns.forEach(r=> {
            if(!this.unknownPlayers){
              this.unknownPlayers = new Array<Player>();
            }
              var unknownPlayersFiltered = this.unknownPlayers.filter(p => p.id == r.player.id);
              if(unknownPlayersFiltered.length > 0){
                r.player = unknownPlayersFiltered[0];
              }
              else {
                this.playerUnknownService.getPlayerDetails(r.player.id).then(player => {
                r.player = player;
                this.unknownPlayers.push(player);

                if(unknowns.length <= this.unknownPlayers.length){
                    this.recalculate();
                }
              });
            }
          });
        }
        if(!unknowns || unknowns.length == 0) { 
          this.recalculate();
        }

      })
      .catch(() => {
          this.loading = false;
          console.log("error during fetching draft results");
        });
  }

  getCustomDraftResult() {
    this.draftResultService.getCustomDraftResult(this.draft, this.playersToPick, this.draft.teamDefinitions)
      .then(draftResult => {
        //this.loading = true;
        this.draftResult = draftResult;
        this.recalculate();
      })
      .catch(() => {
          this.loading = false;
          console.log("error during fetching draft results");
        });
  }

  search(phrase) {
    this.ngZone.run(() => {
      this.searchPhrase = phrase;
    });
  }

  userClosedWelcomeScreen() {
    return false;//Cookie.check("dtfs");
  }

  closeWelcomeScreen() {
    Cookie.set("dtfs", "1", this.expires);
  }

  selectPlayer(player: Player, teamDefinition: TeamDefinition) {
    //this.loading = true;

    if (!this.draftResult.some(x => x.player.id == player.id)) {
      this.draftResult.push(new DraftResult(this.draftResult.length + 1, player, teamDefinition, player.price));
    } else {
      this.draftResult.find(x => x.player.id == player.id).teamDefinition = teamDefinition;
    }
    this.draftResults.refresh(this.draftResult);

    // save draft results
    this.draftResultService.saveCustomDraftPick(this.draftResult.length, teamDefinition, player, this.draft);

    this.recalculate();
  }

  removePlayer(player: Player) {
    //this.loading = true;

    player.picked = false;
    this.draftResult.splice(this.draftResult.findIndex(x => x.player.id == player.id), 1);
    this.draftResults.refresh(this.draftResult);
    
    // save draft results
    this.draftResultService.saveCustomDraftPick(this.draftResult.length, null, player, this.draft);

    this.recalculate();
  }

  selectTeam(teamDefinition) {
    this.selectedTeamDefinition = teamDefinition;
    this.refreshTeam();
  }

  refreshTeam() {
    //this.myInternalRanking =  this.internalRankings.filter(x => x.id == this.draft.teamId)[0];
    this.myTeam = this.teams.filter(x => x.id == this.draft.teamId)[0];

    this.teamsDefinitionToSelect = this.draft.teamDefinitions.filter(x => x.id != this.selectedTeamDefinition.id);
    this.selectedTeam = this.teams.filter(x => x.id == this.selectedTeamDefinition.id)[0];

    this.selectedTeamPlayers = Enumerable.asEnumerable(this.draftResult).Where(r => r.teamDefinition.id == this.selectedTeam.id )
      .Select(t => t.player ).ToArray();
    this.selectedTeamAverages = this.teamRankingCalculator.calculateAverages(this.selectedTeamPlayers);
    var selectedTeamRanking = this.h2hResult.ranking.filter(r => +r.team.id == +this.selectedTeam.id)[0];
    this.draft.categories.forEach(c => {
      this.selectedTeamAverageMatchupResults[c.name] = 
        selectedTeamRanking.wins[c.name].toString() + "-" + selectedTeamRanking.loses[c.name].toString() + "-" + selectedTeamRanking.ties[c.name].toString();

        if(!c.negative)
          this.selectedTeamAverageRanks[c.name] = this.h2hResult.ranking.filter(r => r.totals[c.name] > selectedTeamRanking.totals[c.name]).length + 1;
        else    
          this.selectedTeamAverageRanks[c.name] = this.h2hResult.ranking.filter(r => r.totals[c.name] < selectedTeamRanking.totals[c.name]).length + 1;

    });  
  }

  recalculate() {
    this.teamPlayers.refreshPicks(this.draftResult);
    this.draftResults.refresh(this.draftResult);
    this.playersToPick.
      filter(x => this.teamPlayers.pickedPlayerIds.includes(x.id)).
      forEach(x => x.picked = true);

    this.rankingCombinationCalculator.postMessage({
      command: 'recalculate',
      selectedTeamDefinitionId: this.selectedTeamDefinition.id,
      puntCategories: this.puntCategories,
      playersToPick: this.playersToPick,
      teamPlayers: this.teamPlayers,
      teamDefinitions: this.draft.teamDefinitions,
      calculateFor: this.draft.teamSize * this.draft.leagueSize,
      draftResults: this.draftResults
    });
  }

  sortBy(property: string, defaultOrder = "-") {
    if (this.currentSortProperty == property) {
      this.currentSortOrder = this.currentSortOrder == "" ? "-" : "";
    } else {
      this.currentSortOrder = defaultOrder;
    }

    this.currentSortProperty = property;
  }

  valueRate(value) {
    return this.rateValue.valueRate(value);
  }

  playOffGameClass(delta){
      if(delta<-1) return 'under60';
      if(delta>1) return 'over60';
      if(delta<0) return 'under20';
      return 'over20';
  }

  applySettings() {
    this.loading = true;
    this.targetPlayers = this.targetPlayersChecked;
    this.excludePlayers = this.excludePlayersChecked;
    this.includeMyProjections = this.includeMyProjectionsChecked;
    this.puntCategories.categories = this.puntCategoriesChecked.copyCategories();

    this.draft.includeProjections = this.includeMyProjections;
    const playersPromise = this.playerService.getPlayes(this.draft, this.puntCategories);
    playersPromise.then(players => {
      this.teamPlayers.players.forEach((player, index) => {
        let refreshedPlayer = players.filter(x => x.id == player.id)[0];
        refreshedPlayer.exclude = player.exclude;
        refreshedPlayer.showCombinations = player.showCombinations;
        refreshedPlayer.target = player.target;
        refreshedPlayer.price = player.price;
        refreshedPlayer.picked = player.picked;
        if (!player.isEqual(refreshedPlayer)) {
          this.teamPlayers.players[index] = refreshedPlayer;
        }
      })

      this.recalculate();
      this.loading = false;

      this.storeSettings();
    });
  }

  storeTargetedExcludedPlayers(){
   // Cookie.set("targetedExcludedPlayers", JSON.stringify(this.playersToPick.filter(x => x.exclude || x.target)), this.expires);
  }

  restoreSettings(){

  }

  storeSettings(){
    /*Cookie.set("targetPlayers", this.targetPlayers, this.expires);
    Cookie.set("excludePlayers", this.excludePlayers, this.expires);
    Cookie.set("includeMyProjections", this.includeMyProjections, this.expires);
    Cookie.set("puntCategories", JSON.stringify(this.puntCategories.categories), this.expires);*/
  }

  cancelSettings() {
    this.targetPlayersChecked = this.targetPlayers;
    this.excludePlayersChecked = this.excludePlayers;
    this.includeMyProjectionsChecked = this.includeMyProjections;
    this.puntCategoriesChecked.categories = this.puntCategories.copyCategories();

    this.storeSettings();
  }

  ChangeSeasonScoreProjections(player: Player){
    console.log(player.name);
  }

  Sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
}
