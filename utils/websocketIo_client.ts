
'use client'


import { io } from 'socket.io-client'

import GameRoom, { Player } from './game_room'



import type { Socket } from 'socket.io-client'
import type { GameRoomBase, Move } from './interfaces'

import type { PlayerBase } from '@/utils/interfaces'




export type Message = {
    author: string,
    message: string,
    timestamp?: string
}


export interface BaseProps {
    socketInstance: WebSocketIoClient
}


// eslint-disable-next-line no-unused-vars
export type OptionsCallback = (data: any) => void


interface Options {
    callback: OptionsCallback,
    roomId: string
}


export type RoomData = GameRoomBase & {
    currentPlayer: PlayerBase | null,
    gameRoom: GameRoom | null,
    messages: Array<Message>,
    show: boolean
}



export class WebSocketIoClient {

    public socket: Socket | null = null

    public roomData: RoomData = {
        average: 0,
        coherence: 0,
        currentPlayer: null,
        gameRoom: null,
        hostId: '',
        id: '',
        ignoreHost: false,
        messages: [],
        players: [],
        ready: false,
        show: false
    }


    public roomId: string = ''


    private static instance: WebSocketIoClient


    private constructor(options: Options) {

        this.init(options)
    }


    private async init(options: Options) {

        const { callback, roomId } = options


        await fetch(`/api/socket/${roomId}`)

        this.socket = io()




        this.socket.on('connect', () => {

            this.roomId = roomId

            this.roomData.id = roomId
            this.roomData.currentPlayer = new Player(this.socket?.id as string)


            this.setMessageHandler(callback)
        })
    }


    public static getInstance(options: Options): WebSocketIoClient {

        if (!WebSocketIoClient.instance) {

            WebSocketIoClient.instance = new WebSocketIoClient(options)
        }

        return WebSocketIoClient.instance
    }


    private checkIfCurrentPlayer(id: string): boolean {

        const state: boolean = this.roomData.currentPlayer ? (this.roomData.currentPlayer?.id == id) : false

        return state
    }


    public setMessageHandler(callback: OptionsCallback) {

        this.socket && this.socket.on('newIncomingMessage', (message: Message) => {

            this.roomData.messages.push(message)

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('moveHadBeenMade', (data) => {

            const { average, players, ready, coherence } = data

            this.roomData.players = players
            this.roomData.average = average

            this.roomData.ready = ready
            this.roomData.coherence = coherence


            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('playerJoinedTheRoom', (data) => {

            const { players, ignoreHost, hostId } = data

            this.roomData.players = players

            this.roomData.ignoreHost = ignoreHost
            this.roomData.hostId = hostId

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('playerLeftTheRoom', (data) => {

            const { players } = data

            this.roomData.players = players

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('gameResultsVisibility', (value: boolean) => {

            this.roomData.show = value

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('gameResultsClear', (data) => {

            const { players } = data

            this.roomData.players = players
            this.roomData.average = 0
            this.roomData.coherence = 0

            this.roomData.ready = false
            this.roomData.show = false


            if (this.roomData.currentPlayer) {

                this.roomData.currentPlayer.move = 0
            }

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('setPlayerName', (data) => {

            const { id, name, players } = data

            this.roomData.players = players


            if (this.checkIfCurrentPlayer(id) && this.roomData.currentPlayer) {

                this.roomData.currentPlayer.name = name
            }

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('updateIgnoreHostFlag', (data) => {

            const { hostId, ignoreHost } = data

            this.roomData.ignoreHost = ignoreHost
            this.roomData.hostId = hostId

            callback && callback(this.roomData)
        })
    }



    public sendMessage(message: Message) {

        this.socket && this.socket.emit('createMessage', { message, roomId: this.roomId })
    }


    public makeMove(value: number) {

        const move: Move = {
            playerId: this.socket?.id as string,
            value
        }

        if (this.checkIfCurrentPlayer(this.socket?.id as string) && this.roomData.currentPlayer) {

            this.roomData.currentPlayer.move = value
        }


        this.socket && this.socket.emit('newMove', { move, roomId: this.roomId })
    }


    public showHideResults(value: boolean) {

        this.socket && this.socket.emit('resultsVisibility', { value, roomId: this.roomId })
    }


    public clearResults() {

        this.socket && this.socket.emit('clearResults', { roomId: this.roomId })
    }


    public setName(name: string) {

        this.socket && this.socket.emit('setName', {
            id: this.socket.id,
            name,
            roomId: this.roomId
        })
    }


    public setIgnoreHostFlag(value: boolean) {

        this.socket && this.socket.emit('setIgnoreHostFlag', {
            id: this.socket.id,
            roomId: this.roomId,
            value
        })
    }
}
