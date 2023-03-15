

export interface PlayerBase {
    id: string,
    move?: string,
    name?: string
}


export class Player implements PlayerBase {

    public name: string = ''
    public move: string = '1'


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
        rooms: Map<string, Set<string>>,
        id: string
    ) {

        this.id = id

        this.updatePlayers(rooms)
    }



    public updatePlayers(rooms: Map<string, Set<string>>) {

        const playersSet = rooms.get(this.id)


        playersSet?.forEach((value) => {

            if (!this.players.find(item => item.id == value)) {

                this.players.push(new Player(value))
            }
        })
    }


    public getRoomData(): GameRoomBase {


        return {
            id: this.id,
            players: this.players.map((item) => ({
                id: item.id,
                name: item.name
            }))
        }
    }
}



export default GameRoom
