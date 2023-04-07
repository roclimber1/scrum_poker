
export interface Move {
    playerId: string,
    value: number
}


export interface PlayerBase {
    id: string,
    move?: number,
    name?: string
}


export interface GameRoomBase {
    average: number,
    coherence: number,
    hostId: string,
    id: string,
    ignoreHost: boolean,
    players: Array<PlayerBase>,
    ready: boolean
}


export type WithRoomId<Data = unknown> = Data & {
    roomId: string
}


export type SetIgnoreHostFlagData = {
    id: string,
    value: boolean
}


export type SetPlayerNameData = {
    id: string,
    name: string
}
