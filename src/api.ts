import io from 'socket.io-client'

export const socketAPI = {
    socket: null as null | SocketIOClient.Socket,
    createConnection() {
        this.socket = io('https://chat-server-io.herokuapp.com')
    },
    subscribe(
        initMessagesHandler: (messages: any) => void,
        newMessageHandler: (message: any) => void,
        clientTypeHandler: (user: any) => void) {
        this.socket?.on('init-messages-published', initMessagesHandler)
        this.socket?.on('new-message-sent', newMessageHandler)
        this.socket?.on('user-typing', clientTypeHandler)

    },
    sentName(name: string) {
        this.socket?.emit('client-name-sent', name)
    },
    sentMessage(message: string) {
        this.socket?.emit('client-message-sent', message)
    },
    clientType() {
        this.socket?.emit('client-typed')
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    }

}
