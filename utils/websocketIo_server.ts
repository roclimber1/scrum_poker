
import { Server } from 'socket.io'
import { Player } from './game_room'




import type { ServerOptions, Socket } from 'socket.io'

import type { Message } from '@/utils/websocketIo_client'
import type { PlayerBase } from './game_room'





export class WebSocketIoServer {

    public io: Server
    public socket: Socket | null = null

    private static instance: WebSocketIoServer


    public players: Array<PlayerBase> = []

    public serverOptions: ServerOptions
    public roomId: string

    public ignoreHost: boolean = false
    public hostId: string = ''


    private constructor(
        serverOptions: ServerOptions,
        roomId: string
    ) {

        this.serverOptions = serverOptions
        this.roomId = roomId


        this.io = new Server(this.serverOptions)

        this.init()
    }


    private init() {

        this.io.on('connection', (socket: Socket) => {

            this.socket = socket

            this.addPlayer(this.socket.id)

            this.initRoom()
            this.setMessageHandler()
        })
    }


    private addPlayer(id: string) {

        const player = this.players.find(item => item.id == id)


        if (!player) {

            this.players.push(new Player(id))
        }
    }


    private initRoom() {

        this.socket && this.socket.join(this.roomId)

        console.log('this.roomId', this.roomId)


        this.io.of('/').adapter.on('join-room', (room, id) => {

            console.log(`socket ${id} has joined room ${room}`)

            this.addPlayer(id)

            this.io.to(this.roomId).emit('playerJoinedTheRoom', { id, room, players: this.players, ignoreHost: this.ignoreHost, hostId: this.hostId })
        })


        this.io.of('/').adapter.on('leave-room', (room, id) => {

            console.log(`socket ${id} has joined room ${room}`)

            this.players = this.players.filter(item => item.id != id)

            this.io.to(this.roomId).emit('playerLeftTheRoom', { id, room, players: this.players })
        })

    }


    public static getInstance(serverOptions: ServerOptions, roomId: string): WebSocketIoServer {

        if (!WebSocketIoServer.instance) {

            WebSocketIoServer.instance = new WebSocketIoServer(serverOptions, roomId)
        }

        return WebSocketIoServer.instance
    }



    public setMessageHandler() {

        this.socket && this.socket.on('createMessage', (message: Message) => {

            this.io.to(this.roomId).emit('newIncomingMessage', message)
        })


        this.socket && this.socket.on('newMove', (move) => {

            const { playerId, value } = move

            let sum = 0
            let amount = 0
            let ready = false
            let length = 0

            this.players = this.players.map(item => {

                if (item.id == playerId) {

                    item.move = value
                }

                const ignoreHostCondition: boolean = this.ignoreHost && (this.hostId == item.id)

                if (!ignoreHostCondition) {

                    sum += item.move || 0
                    amount += item.move ? 1 : 0

                    length++
                }

                return item
            })

            if (amount == length) {

                ready = true
            }

            const average = sum / (length || 1)


            this.io.to(this.roomId).emit('moveHadBeenMade', { average, players: this.players, ready })
        })


        this.socket && this.socket.on('resultsVisibility', (value: boolean) => {

            this.io.to(this.roomId).emit('gameResultsVisibility', value)
        })


        this.socket && this.socket.on('setIgnoreHostFlag', (data) => {

            const { value, id } = data

            this.hostId = id
            this.ignoreHost = value

            this.io.to(this.roomId).emit('updateIgnoreHostFlag', { hostId: id, ignoreHost: value })
        })


        this.socket && this.socket.on('clearResults', () => {

            this.players = this.players.map(item => {

                item.move = 0

                return item
            })

            this.io.to(this.roomId).emit('gameResultsClear', { players: this.players })
        })


        this.socket && this.socket.on('setName', (data) => {

            const { id, name } = data

            this.players = this.players.map(item => {

                if (item.id == id) {

                    item.name = name
                }

                return item
            })

            this.io.to(this.roomId).emit('setPlayerName', { id, name, players: this.players })
        })
    }
}
