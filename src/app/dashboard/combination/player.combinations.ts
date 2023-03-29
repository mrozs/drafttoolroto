import { Player } from './../player/player'
import { PlayerCombination } from './player.combination';

export class PlayerCombinations {
    public projectedResult = {};

    public combinations = new Array<PlayerCombination>();

    hasCombinations(player: Player) {
        return this.combinations.some(x => x.for == player.id);
    }

    combinationsFor(player: Player) {
        return this.combinations.filter(x => x.for == player.id).sort((c1, c2) => c2.gain - c1.gain);
    }

    numberOfCombinationsFor(player: Player) {
        return this.combinations.filter(x => x.for == player.id).length;
    }

    add(combination: PlayerCombination) {
        this.combinations.push(combination);
    }

    existFor(player: Player, combination: PlayerCombination) {
        const combinationsFor = this.combinationsFor(player);
        for(let existingCombination of combinationsFor) {
            if (existingCombination.for == combination.for){//existingCombination.isEqual(combination)){
                return true;
            }
        }

        return false;
    }


    // szczegóły h2h do dodania?

    hasCalculatedProjectedResult(id: number) {
        return this.projectedResult.hasOwnProperty(id);
    }

    projectedResultFor(id: number) {
        if (this.projectedResult[id]) {
            return this.projectedResult[id];
        }

        return 0;
    }
}
