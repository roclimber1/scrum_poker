import type { Move, PlayerBase, GameRoomBase, SetIgnoreHostFlagData, SetPlayerNameData } from './interfaces'





export class Player implements PlayerBase {

    public name: string = ''
    public move: number = 0

    public id: string


    constructor(
        id: string
    ) {
        this.id = id
    }


    public setName(name: string) {

        this.name = name
    }
}




class GameRoom implements GameRoomBase {

    public players: Array<PlayerBase> = []

    public id: string = ''

    public ignoreHost: boolean = false
    public hostId: string = ''


    public ready: boolean = false
    public average: number = 0


    public coherence: number = 0



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


    public calculateCoherence() {

        let previous = 0
        let index = 0

        let condition = true


        this.coherence = 1


        for (const player of this.players) {

            if (index > 0) {

                condition = (previous == player.move)
            }

            if (!condition) {

                this.coherence = 0

                break
            }

            previous = player.move || 0
            index++
        }

    }


    public removePlayer(id: string) {

        this.players = this.players.filter(item => item.id != id)
    }


    public calculateAverage(move: Move) {

        const { playerId, value } = move

        let sum = 0
        let amount = 0
        let length = 0

        this.players = this.players.map(item => {

            if (item.id == playerId) {

                item.move = value
            }

            const condition: boolean = (this.ignoreHost && (this.hostId != item.id)) || !this.ignoreHost

            if (condition) {

                sum += item.move || 0
                amount += item.move ? 1 : 0

                length++
            }

            return item
        })


        if (amount == length) {

            this.ready = true
        }

        this.average = sum / (length || 1)
    }


    public clearResults() {

        this.players = this.players.map(item => {

            item.move = 0

            return item
        })

        this.ready = false

        this.average = 0
        this.coherence = 0
    }


    public setHostId(id: string) {

        if (!this.hostId && id) {

            this.hostId = id
        }
    }


    public setIgnoreHostFlag(data: SetIgnoreHostFlagData) {

        const { value, id } = data


        this.ignoreHost = value

        this.setHostId(id)
    }


    public setPlayerName(data: SetPlayerNameData) {

        const { id, name } = data


        this.players = this.players.map(item => {

            if (item.id == id) {

                item.name = name
            }

            return item
        })
    }


    public getGameRoomData(): GameRoomBase {

        return {
            average: this.average,
            coherence: this.coherence,
            hostId: this.hostId,
            id: this.id,
            ignoreHost: this.ignoreHost,
            players: this.players,
            ready: this.ready
        }
    }
}



export default GameRoom
