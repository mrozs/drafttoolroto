import { Component, Input } from '@angular/core';
import { Draft } from '../../dashboard/draft';
import { Player } from '../../dashboard/player/player';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent  {
  @Input() draft: Draft;
  @Input() selectedTeamPlayers: Array<Player>;
  @Input() selectedTeamAverages: Array<Player>;
  @Input() selectedTeamAverageMatchupResults: Object;
  @Input() selectedTeamAverageRanks: Object;

  constructor() {
  }

  
}
