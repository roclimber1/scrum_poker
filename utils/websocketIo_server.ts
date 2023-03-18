
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

            this.io.to(this.roomId).emit('playerJoinedTheRoom', { id, room, players: this.players })
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

            this.io.to(this.roomId).emit('moveHadBeenMade', move)
        })


        this.socket && this.socket.on('resultsVisibility', (value: boolean) => {

            this.io.to(this.roomId).emit('gameResultsVisibility', value)
        })


        this.socket && this.socket.on('clearResults', () => {

            this.io.to(this.roomId).emit('gameResultsClear')
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
