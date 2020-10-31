import {socketAPI} from '../api'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Message, UserType} from '../utils-type/utils-type'

export const createConnectionSocket = createAsyncThunk('chat/create-socket', (param, thunkAPI) => {
    socketAPI.createConnection()

    socketAPI.subscribe((messages) => {
        thunkAPI.dispatch(messagesReceived({messages}))
    }, (message) => {
        thunkAPI.dispatch(newMessageReceived({message}))
    }, (user) => {
        thunkAPI.dispatch(userTyping({user}))
    })
})
export const destroyConnectionSocket = createAsyncThunk('chat/destroy-socket', () => {
    socketAPI.destroyConnection()
})
export const sentName = createAsyncThunk('chat/sentName', (param: { name: string }) => {
    socketAPI.sentName(param.name)
})
export const clientTyping = createAsyncThunk('chat/clientTyping', () => socketAPI.clientType())
export const sentMessage = createAsyncThunk('chat/sentMessage', (param: { message: string }) => {
    socketAPI.sentMessage(param.message)
})
const initialState = {
    messages: [] as Array<Message>,
    userType: [] as Array<UserType>
}
const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        messagesReceived: ((state, action) => {
            state.messages = action.payload.messages
        }),
        newMessageReceived: ((state, action) => {
            state.messages.push(action.payload.message)
            state.userType = state.userType.filter((u: any) => u.id !== action.payload.message.user.id)
        }),
        userTyping: ((state, action) => {
            state.userType.push(action.payload.user)
        })
    }
})
const {messagesReceived, newMessageReceived, userTyping} = slice.actions
export const chatReducer = slice.reducer




