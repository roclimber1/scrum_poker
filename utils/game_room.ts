

export interface PlayerBase {
    id: string,
    move?: number,
    name?: string
}


export class Player implements PlayerBase {

    public name: string = ''
    public move: number = 1


    constructor(
        public id: string
    ) {}


    public setName(name: string) {

        this.name = name
    }
}


export interface GameRoomBase {
    id: string,
    players: Array<PlayerBase>
}


class GameRoom implements GameRoomBase {

    public players: Array<PlayerBase> = []

    public id: string = ''




    constructor(
        id: string
    ) {

        this.id = id
    }



    public addPlayer(id: string) {

        const player = this.players.find(item => item.id == id)


        if (!player) {

            this.players.push(new Player(id))
        }
    }
}



export default GameRoom
