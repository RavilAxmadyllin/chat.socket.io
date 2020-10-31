import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {chatReducer} from '../reducer/chat-reducer'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({chat: chatReducer})
export type AppStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

