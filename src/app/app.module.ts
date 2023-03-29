import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Location } from '@angular/common';
import { DashboardComponent } from './app.component';


import { DraftResultService } from './dashboard/draft.result/draft.result.service';
import { PlayerService } from './dashboard/player/player.service';
import { PlayerUnknownService } from './dashboard/player/player.unknown.service';
import { DraftService } from './dashboard/draft.service';
import { LeaqueModelService } from './dashboard/leaque.model/leaque.model.service';
import { LeagueCalendarService } from './dashboard/league.calendar/league.calendar.service';
import { PositiveNumberPipe } from './positive.number.filter'
import { PlayerFilter } from './player.filter';
import { OrderByPipe } from './orderBy';
import { StandingsComponent } from './components/standings/standings.component';
import { MyTeamComponent } from './components/my-team/my-team.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    PositiveNumberPipe,
    OrderByPipe,
    PlayerFilter,
    StandingsComponent,
    MyTeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PlayerService, DraftService, LeaqueModelService, LeagueCalendarService, DraftResultService, PlayerUnknownService],
  bootstrap: [DashboardComponent],
  exports: [StandingsComponent]
})
export class AppModule { }
