
import { Server } from 'socket.io'

import GameRoom from './game_room'



import type { ServerOptions, Socket } from 'socket.io'

import type { Message } from '@/utils/websocketIo_client'
import type { Move, GameRoomBase, SetIgnoreHostFlagData, SetPlayerNameData, WithRoomId } from './interfaces'





export class WebSocketIoServer {

    public io: Server
    public socket: Socket | null = null

    private static instance: WebSocketIoServer


    private rooms: Map<string, GameRoom> = new Map<string, GameRoom>()


    public serverOptions: ServerOptions
    private static roomId: string



    private constructor(
        serverOptions: ServerOptions
    ) {

        this.serverOptions = serverOptions


        this.io = new Server(this.serverOptions)

        this.init()
    }


    private getRoomById(roomId: string): GameRoom {

        let gameRoom: GameRoom | undefined = this.rooms.get(roomId)


        if (!gameRoom) {

            gameRoom = new GameRoom(roomId)

            this.rooms.set(roomId, gameRoom)
        }

        return gameRoom
    }


    private static updateCurrentRoomId(roomId: string) {

        this.roomId = roomId
    }


    private init() {

        this.io.on('connection', (socket: Socket) => {

            this.socket = socket


            const gameRoom = this.getRoomById(WebSocketIoServer.roomId)

            gameRoom.addPlayer(this.socket.id)


            this.initRoom(WebSocketIoServer.roomId)
            this.setMessageHandler()
        })
    }



    private initRoom(roomId: string) {

        this.socket && this.socket.join(roomId)

        console.log('roomId', roomId)


        this.io.of('/').adapter.on('join-room', (room, id) => {

            console.log(`socket ${id} has joined room ${room}`)

            const gameRoom = this.getRoomById(room)

            gameRoom.addPlayer(id)


            this.io.to(room).emit('playerJoinedTheRoom', { id, room, players: gameRoom.players, ignoreHost: gameRoom.ignoreHost, hostId: gameRoom.hostId })
        })


        this.io.of('/').adapter.on('leave-room', (room, id) => {

            console.log(`socket ${id} has joined room ${room}`)

            const gameRoom = this.getRoomById(room)

            gameRoom.removePlayer(id)

            this.io.to(room).emit('playerLeftTheRoom', { id, room, players: gameRoom.players })
        })

    }


    public static getInstance(serverOptions: ServerOptions, roomId: string): WebSocketIoServer {

        if (!WebSocketIoServer.instance) {

            WebSocketIoServer.instance = new WebSocketIoServer(serverOptions)

        }

        WebSocketIoServer.updateCurrentRoomId(roomId)


        return WebSocketIoServer.instance
    }



    public setMessageHandler() {


        this.socket && this.socket.on('createMessage', (data: WithRoomId<{ message: Message }>) => {

            const { message, roomId } = data

            this.io.to(roomId).emit('newIncomingMessage', message)
        })



        this.socket && this.socket.on('newMove', (data: WithRoomId<{ move: Move }>) => {

            const { move, roomId } = data
            const gameRoom = this.getRoomById(roomId)

            gameRoom.calculateAverage(move)

            const roomData: GameRoomBase = gameRoom.getGameRoomData()


            this.io.to(roomId).emit('moveHadBeenMade', roomData)
        })



        this.socket && this.socket.on('resultsVisibility', (data: WithRoomId<{ value: boolean }>) => {

            const { value, roomId } = data

            this.io.to(roomId).emit('gameResultsVisibility', value)
        })



        this.socket && this.socket.on('setIgnoreHostFlag', (data: WithRoomId<SetIgnoreHostFlagData>) => {

            const { roomId } = data
            const gameRoom = this.getRoomById(roomId)

            gameRoom.setIgnoreHostFlag(data)

            this.io.to(roomId).emit('updateIgnoreHostFlag', { hostId: gameRoom.hostId, ignoreHost: gameRoom.ignoreHost })
        })



        this.socket && this.socket.on('clearResults', (data: WithRoomId) => {

            const { roomId } = data
            const gameRoom = this.getRoomById(roomId)

            gameRoom.clearResults()

            this.io.to(roomId).emit('gameResultsClear', { players: gameRoom.players })
        })



        this.socket && this.socket.on('setName', (data: WithRoomId<SetPlayerNameData>) => {

            const { id, name, roomId } = data
            const gameRoom = this.getRoomById(roomId)

            gameRoom.setPlayerName(data)

            this.io.to(roomId).emit('setPlayerName', { id, name, players: gameRoom.players })
        })
    }
}
