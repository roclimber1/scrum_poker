
import { Server } from 'socket.io'

import GameRoom from '@/utils/GameRoom'

// import { v4 as uuidv4 } from 'uuid'



import type { ServerOptions, Socket } from 'socket.io'
import type { GameRoomBase } from '@/utils/GameRoom'

import type { Message } from '@/utils/WebSocketIoClient'





export class WebSocketIoServer {

    public io: Server
    public socket: Socket | null = null

    private static instance: WebSocketIoServer



    private constructor(
        public serverOptions: ServerOptions,
        public roomId: string
    ) {

        this.io = new Server(this.serverOptions)

        this.init()
    }


    private init() {

        this.io.on('connection', (socket: Socket) => {

            this.socket = socket

            this.initRoom()
            this.setMessageHandler()
        })
    }


    private initRoom() {

        this.socket && this.socket.join(this.roomId)

        console.log('this.roomId', this.roomId)


        this.io.of('/').adapter.on('join-room', (room, id) => {

            console.log(`socket ${id} has joined room ${room}`)

            this.io.to(this.roomId).emit('playerJoinedTheRoom', { id, room })
        })


        this.io.of('/').adapter.on('leave-room', (room, id) => {

            console.log(`socket ${id} has joined room ${room}`)

            this.io.to(this.roomId).emit('playerLeftTheRoom', { id, room })
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

            this.io.to(this.roomId).emit('setPlayerName', data)
        })
    }
}
