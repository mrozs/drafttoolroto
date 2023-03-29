import { Player } from './../player/player'
import { Category } from './../category'
import { Categories } from './../categories';
import { H2HResult } from './../h2hresult/h2hresult';

export class PlayerCombination {
    for: number;
    players: Array<Player> = new Array<Player>();
    gain: number;
    result: H2HResult;

    //averageValue: number;

    // average(category: Category) {
    //     let sum = 0;
    //     this.players.forEach(x => sum += x.statistics[category.property]);
    //     return  sum /= this.players.length;
    // }

    // valueAverage(property: string) {
    //     let sum = 0;
    //     this.players.forEach(x => sum += x.valueStatistics[property]);
    //     return  sum /= this.players.length;
    // }

    // isEqual(playerCombination: PlayerCombination) {
    //     for(let player of this.players) {
    //         if (!playerCombination.players.some(x => x.id == player.id)){
    //             return false;
    //         }
    //     }
        
    //     return true;
    // }
}
