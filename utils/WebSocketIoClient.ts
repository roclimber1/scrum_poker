
'use client'


import { io } from 'socket.io-client'



import type { Socket } from 'socket.io-client'
import { Player, PlayerBase } from './GameRoom'




export type Message = {
    author: string,
    message: string,
    timestamp?: string
}


export interface Move {
    playerId: string,
    value: number
}



export type OptionsCallback = (data: any) => void


interface Options {
    callback: OptionsCallback,
    roomId: string
}


export type RoomData = {
    currentPlayer: PlayerBase | null,
    id: string,
    messages: Array<Message>,
    players: Array<PlayerBase>,
    show: boolean
}



export class WebSocketIoClient {

    public socket: Socket | null = null

    public roomData: RoomData = {
        currentPlayer: null,
        id: '',
        messages: [],
        players: [],
        show: true
    }


    private static instance: WebSocketIoClient


    private constructor(options: Options) {

        this.init(options)
    }


    private async init(options: Options) {

        const { callback, roomId } = options


        await fetch(`/api/socket/${roomId}`)

        this.socket = io()


        console.debug('socket', this.socket)



        this.socket.on('connect', () => {

            console.debug('>> connected')


            this.roomData.id = roomId
            this.roomData.currentPlayer = new Player(this.socket.id)

            this.addPlayer(this.socket.id)


            this.setMessageHandler(callback)
        })
    }


    public static getInstance(options: Options): WebSocketIoClient {

        if (!WebSocketIoClient.instance) {

            WebSocketIoClient.instance = new WebSocketIoClient(options)
        }

        return WebSocketIoClient.instance
    }


    private addPlayer(id: string) {

        const player = this.roomData.players.find(item => item.id == id)


        if (!player) {

            this.roomData.players.push(new Player(id))
        }
    }


    public setMessageHandler(callback: OptionsCallback) {

        this.socket && this.socket.on('newIncomingMessage', (message: Message) => {

            this.roomData.messages.push(message)

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('moveHadBeenMade', (move: Move) => {

            // this.move = move

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('playerJoinedTheRoom', (data) => {

            const { id } = data

            this.addPlayer(id)

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('playerLeftTheRoom', (data) => {

            const { id } = data

            this.roomData.players = this.roomData.players.filter(item => item.id != id)

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('gameResultsVisibility', (value: boolean) => {

            this.roomData.show = value

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('gameResultsClear', () => {

            this.roomData.players = this.roomData.players.map(item => {

                item.move = '0'

                return item
            })

            callback && callback(this.roomData)
        })


        this.socket && this.socket.on('setPlayerName', (data) => {

            const { id, name } = data

            this.roomData.players = this.roomData.players.map(item => {

                if (item.id == id) {

                    item.name = name
                }

                return item
            })

            if (this.roomData.currentPlayer && (this.roomData.currentPlayer?.id == id)) {

                this.roomData.currentPlayer.name = name
            }

            callback && callback(this.roomData)
        })
    }



    public sendMessage(message: Message) {

        this.socket && this.socket.emit('createMessage', message)
    }


    public makeMove(value: number) {

        const move: Move = {
            playerId: this.socket?.id,
            value
        }


        this.socket && this.socket.emit('newMove', move)
    }


    public showHideResults(value: boolean) {

        this.socket && this.socket.emit('resultsVisibility', value)
    }


    public clearResults() {

        this.socket && this.socket.emit('clearResults')
    }


    public setName(name: string) {

        this.socket && this.socket.emit('setName', {
            id: this.socket.id,
            name
        })
    }
}