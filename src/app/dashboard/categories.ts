import { Category } from './category'

export class Categories {
    static valueList = Array<any>(
        {categoryName: "PTS", valueName: "vPts", valueProperty: "vPts"},
        {categoryName: "3P", valueName: "v3P", valueProperty: "vC3PM"},
        {categoryName: "REB", valueName: "vREB", valueProperty: "vReb"},
        {categoryName: "AST", valueName: "vAST", valueProperty: "vAst"},
        {categoryName: "STL", valueName: "vSTL", valueProperty: "vStl"},
        {categoryName: "BLK", valueName: "vBLK", valueProperty: "vBlk"},
        {categoryName: "FG%", valueName: "vFG%", valueProperty: "vFg"},
        {categoryName: "FT%", valueName: "vFT%", valueProperty: "vFt"},
        {categoryName: "TO", valueName: "vTO", valueProperty: "vTo"},
        {categoryName: "A/TO", valueName: "vA/TO", valueProperty: "vAto"},
    );

    static list = Array<Category>(
        { id: 1, name: "PTS",   description: "Points", property: "PTS", negative: false, ratio: false },
        { id: 2, name: "3P", description: "3 pointers made", property: "C3PM", negative: false, ratio: false },
        { id: 3, name: "REB", description: "Rebounds", property: "REB", negative: false, ratio: false },
        { id: 4, name: "AST", description: "Assists", property: "AST", negative: false, ratio: false },
        { id: 5, name: "STL", description: "Steals", property: "STL", negative: false, ratio: false },
        { id: 6, name: "BLK", description: "Blocks", property: "BLK", negative: false, ratio: false },
        { id: 7, name: "FG%", description: "Field Goal %", property: "FG_", negative: false, ratio: true },
        { id: 8, name: "FT%", description: "Free Throw %", property: "FT_", negative: false, ratio: true },
        { id: 9, name: "TO", description: "Turnovers", property: "TO", negative: true, ratio: false },
        { id: 10, name: "3P%", description: "Threes %", property: "C3P_", negative: false, ratio: true },
        { id: 11, name: "2P%", description: "Twos %", property: "C2P_", negative: false, ratio: true },
        { id: 12, name: "AFG%", description: "Adjusted FG%", property: "AFG_", negative: false, ratio: true },
        { id: 13, name: "DREB", description: "Defensive Rebounds", property: "DREB", negative: false, ratio: false },
        { id: 14, name: "OREB", description: "Offensive Rebounds", property: "OREB", negative: false, ratio: false },
        { id: 15, name: "DD", description: "Double Doubles", property: "DD", negative: false, ratio: false },
        { id: 16, name: "TD", description: "Triple Doubles", property: "TD", negative: false, ratio: false  },
        { id: 17, name: "FG", description: "Field goals made", property: "FGM", negative: false, ratio: false  },
        { id: 18, name: "FGA", description: "Field goals attempted", property: "FGA", negative: false, ratio: false  },
        { id: 19, name: "FGM", description: "Field goals missed", property: "FGMS", negative: false, ratio: false  },
        { id: 20, name: "PF", description: "Fouls", property: "PF", negative: true, ratio: false },
        { id: 21, name: "FT", description: "Free throws made", property: "FTM", negative: false, ratio: false },
        { id: 22, name: "FTA", description: "Free throws attempted", property: "FTA", negative: false, ratio: false  },
        { id: 23, name: "FTM", description: "Free throws missed", property: "FTMS", negative: false, ratio: false  },
        { id: 24, name: "MIN", description: "Minutes", property: "M", negative: false, ratio: false  },
        { id: 25, name: "3PA", description: "3 pointers attempted", property: "FG3A", negative: false, ratio: false  },
        { id: 26, name: "3PM", description: "3 pointers missed", property: "FG3MS", negative: true, ratio: false },
        { id: 27, name: "2P", description: "2 pointers made", property: "FG2M", negative: false , ratio: false },
        { id: 28, name: "2PA", description: "2 pointers attempted", property: "FG2A", negative: false , ratio: false },
        { id: 29, name: "A/TO", description: "Assist to Turnovers", property: "ATO", negative: false , ratio: true },
        { id: 30, name: "NFT", description: "Net Free Throws", property: "NETFT", negative: false , ratio: false },
        { id: 31, name: "TO/48", description: "Turnovers/48", property: "TRN48", negative: true, ratio: false },
        { id: 32, name: "PT3/48", description: "Threes/48", property: "C3PM48", negative: false , ratio: false },
        { id: 33, name: "DPG", description: "DPG (blk+stl+dr)", property: "DPG" , negative: false , ratio: false},
        { id: 34, name: "PPG", description: "PPG", property: "PTS", negative: false  , ratio: false},
        { id: 35, name: "S+B", description: "Steals+Blocks", property: "S_B", negative: false , ratio: false },
        { id: 36, name: "PTS/48", description: "Points/48", property: "PTS48", negative: false , ratio: false },
        { id: 37, name: "S/T", description: "Steals to Turnvers", property: "S_TO", negative: false , ratio: false },
        { id: 38, name: "A-TO", description: "Assists - Turnovers", property: "A_TO", negative: false , ratio: false },
        { id: 39, name: "TECH", description: "Technicals", property: "T", negative: true , ratio: false},
        { id: 40, name: "PT3A/FGA", description: "3a/fga", property: "C3PA_FGA", negative: false , ratio: true },
        { id: 41, name: "GS", description: "Games started", property: "GS", negative: false , ratio: false },
        { id: 42, name: "FO", description: "Fouled out", property: "FO", negative: false , ratio: false },
        { id: 43, name: "EJECT", description: "Ejections", property: "EJ", negative: true, ratio: false },
        { id: 44, name: "FL", description: "Flagrants", property: "FL", negative: true, ratio: false },
        { id: 45, name: "MPG", description: "Minutes per game", property: "MINS_strng", negative: true, ratio: false }
    );

    static filter(id: number): Category {
        return this.list.filter(x => x.id == id)[0];
    }

    static hasValue(category: Category) {
        return this.valueList.some(x => x.categoryName == category.name);
    }

    static value(category: Category) {
        return this.valueList.filter(x => x.categoryName == category.name)[0];
    }
}