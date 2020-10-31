import {socketAPI} from './api'

const initialState = {
    messages: [] as Array<any>,
    userType: []  as Array<any>,
    users: [] as Array<string>
}
export const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'messages-received': {
            return {...state, messages: action.messages}
        }
        case 'message-received': {
            return {
                ...state,
                messages: [...state.messages, action.message],
                userType: state.userType.filter((u: any) => u.id !== action.message.user.id)
            }
        }
        case 'user-typing': {
            return {
                ...state,
                userType: [...state.userType.filter((u: any) => u.id !== action.user.id), action.user]
            }
        }
        case 'add-user': {
            return {
                ...state,
                users: action.user
            }
        }
        default:
            return state
    }
}
export const messagesReceived = (messages: any) => ({type: 'messages-received', messages})
export const newMessageReceived = (message: any) => ({type: 'message-received', message})
export const userTyping = (user: any) => ({type: 'user-typing', user})
export const addUser = (user: any) => ({type: 'add-user', user})
export const createConnectionSocket = () => (dispatch: any) => {
    socketAPI.createConnection()

    socketAPI.subscribe((messages) => {
        dispatch(messagesReceived(messages))
    }, (message) => {
        dispatch(newMessageReceived(message))
    }, (user) => {
        dispatch(userTyping(user))
    },(user) => {
        debugger
        dispatch(addUser(user))
    })
}

export const sentName = (name: string) => (dispatch: any) => {
    socketAPI.sentName(name)
}
export const clientTyping = () => (dispatch: any) => {
    socketAPI.clientType()
}
export const sentMessage = (message: string) => (dispatch: any) => {
    socketAPI.sentMessage(message)
}
export const destroyConnectionSocket = () => (dispatch: any) => {
    socketAPI.destroyConnection()

}
