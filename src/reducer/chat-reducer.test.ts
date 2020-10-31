import {Message, UserType} from '../utils-type/utils-type'
import {chatReducer, newMessageReceived, userTyping, messagesReceived} from './chat-reducer'

let startState = {
    messages: [] as Array<Message>,
    userType: [] as Array<UserType>
}

beforeEach(() => {
    startState = {
        messages: [
            {message: 'hello', user: {id: '1604184925961', name: 'petya'}},
            {message: 'how are u', user: {id: '1604184925961', name: 'vlad'}},
        ],
        userType: [
            {id: '1604184925961', name: 'vlad'}
        ]
    }
})

test('correct message should be added', () => {
   const newMessage =  {message: 'norm', user: {id: '1604184925961', name: 'vlad'}}
    const endState = chatReducer(startState, newMessageReceived(newMessage))
    expect(endState.messages.length).toBe(3)
    expect(endState.messages[2]).toBe('norm')
})
test('correct user type should be added', () => {
    const newUserType =  {id: '2', name: 'petya'}
    const endState = chatReducer(startState, userTyping({user:newUserType}))
    expect(endState.userType.length).toBe(2)
    expect(endState.userType[1].name).toBe('petya')
})
test('correct user type should be added', () => {
    const newMessages = [
        {message: 'hello', user: {id: '1604184925961', name: 'petya'}},
        {message: 'how are u', user: {id: '1604184925961', name: 'vlad'}},
        {message: 'hello', user: {id: '1604184925961', name: 'vlad'}},
    ]
    const endState = chatReducer(startState, messagesReceived({messages: newMessages}))
    expect(endState.messages.length).toBe(3)
})




