import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// 0: Connecting
// 1: Open (The only state where you can safely use .send())
// 2: Closing
// 3: Closed

// Connection Event
wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on('message', (rawData) => {
        const message = rawData.toString()
        console.log({rawData})

        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) client.send(`Server Broadcast: ${message}`)
        })
    })

    socket.on('error', (error) => {
        console.error(`Error message from ${ip}:`, error.message)
    })

    socket.on('close', () => {
        console.log(`Client ${ip} disconnected`)
    })

});

console.log('WebSocket server running on ws://localhost:8080');