import {timeUpadte} from "../constant";

export class HashGenerator{
    private  hashList: string[] = []
    static TYPES: tableType[] = ['CIRCLE', 'SQUARE']
    static POSSIBLE: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


    constructor(){

    }

    public getNewHash(): string{
        let hash = '';
        for (let i = 0; i < 32; i++) {
            hash += '' + HashGenerator.POSSIBLE[this.getRandom(0, 61, true)];
        }
        if (-1 < this.hashList.indexOf[hash]) {
            return this.getNewHash()
        }
        return hash;
    }

    public getName(): string{
        let name = '';
        for(let i = 0; i < 4; i++){
            name += HashGenerator.POSSIBLE[this.getRandom(0, 26, true)]
        }
        return name
    }
    public getType(): tableType{
        return   HashGenerator.TYPES[this.getRandom(0, 1, true)]
    }

    public getPlayers(max: number){
        return this.getRandom(0, max, true)
    }

    public getMaxPlayer(): number{
        return this.getRandom(1, 10, true)
    }

    private getRandom(min: number, max: number, int: boolean): number {
        let rand = min + Math.random() * (max - min);
        if (int) {
            rand = Math.round(rand)
        }
        return rand;
    }

    getTimeUpdate(){
        return this.getRandom(timeUpadte.min,timeUpadte.max, true)
    }


}