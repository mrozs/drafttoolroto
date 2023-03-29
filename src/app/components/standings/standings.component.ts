import { Component, OnInit, Input } from '@angular/core';
import { TeamRanking } from '../../dashboard/team.ranking';
import { Category } from '../../dashboard/category';
import { ScheduleWeek } from '../../dashboard/h2hresult/h2hresult.schedule.week';
import { H2hResultMatchup } from '../../dashboard/h2hresult/h2hresult.matchup';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  @Input() ranking: Array<TeamRanking>;
  @Input() myTeam: number;
  @Input() cats: Array<Category>;
  @Input() myMatchups: Array<ScheduleWeek>;
  @Input() playoffMatchups: Array<H2hResultMatchup>;
  @Input() playoffWeeks: Object;

  currentSortProperty: string = "place"
  currentSortOrder: string = "";

  constructor() { }

  ngOnInit() {
  }

  sortBy(property: string, defaultOrder = "-") {
    if (this.currentSortProperty == property) {
      this.currentSortOrder = this.currentSortOrder == "" ? "-" : "";
    } else {
      this.currentSortOrder = defaultOrder;
    }

    this.currentSortProperty = property;
  }

}
