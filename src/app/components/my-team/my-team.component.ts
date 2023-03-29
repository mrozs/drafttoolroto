import { Component, OnInit, Input } from '@angular/core';
import { TeamDefinition } from '../../dashboard/team.definition';
import { Draft } from '../../dashboard/draft';
import { Team } from '../../dashboard/team';
import { Player } from '../../dashboard/player/player';
import { TeamRanking } from '../../dashboard/team.ranking';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  @Input() draft: Draft;
  @Input() selectedTeamPlayers: Array<Player>;
  @Input() selectedTeamAverages: Array<Player>;
  @Input() selectedTeamAverageMatchupResults: Object;
  @Input() selectedTeamAverageRanks: Object;

  constructor() {
  }

  ngOnInit() {
    
  }

}
