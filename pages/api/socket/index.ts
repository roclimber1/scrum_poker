
import { WebSocketIoServer } from '@/utils/WebSocketIoServer'


import type { NextApiRequest, NextApiResponse } from 'next'




export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query

    const instance: WebSocketIoServer = WebSocketIoServer.getInstance(res.socket.server, id as string)

    res.socket.server.io = instance.io


    res.end()
}
