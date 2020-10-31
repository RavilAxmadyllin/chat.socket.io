import {Button, Card, CardContent, FormControl, Grid, Paper, TextField, Typography} from '@material-ui/core'
import React, {useEffect, useRef, useState} from 'react'
import {useStyles} from '../App'
import {useDispatch, useSelector} from 'react-redux'
import {clientTyping, sentMessage} from '../reducer/chat-reducer'
import {AppStateType} from '../bll/store'

export const Cards = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const user = useSelector((state: AppStateType) => state.chat.userType)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const classes = useStyles()

    const sendMessageHandler = () => {
        dispatch(sentMessage({message: value}))
        setValue('')
    }
    const clientTypingHandler = () => {
        dispatch(clientTyping())
    }

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    return (
        <Grid item xs={12}>
            <Paper className={classes.wrapper}>

                <Card className={classes.content}>
                    <CardContent>
                        {messages.map((m, i) => <Typography
                            key={new Date().getTime().toString() + i}
                            className={classes.messageBlock}
                            variant={'subtitle2'}
                            gutterBottom>
                            <b>{m.user.name} </b>: {m.message}</Typography>
                        )}
                        <div ref={messagesAnchorRef}></div>
                    </CardContent>
                </Card>

                {user.map((u) => <Typography
                    variant={'body2'}
                    className={classes.typeUser}>{u.name} typing...</Typography>)}

                <FormControl fullWidth style={{flexDirection: 'row'}}>
                    <TextField variant={'filled'} style={{flexGrow: 1}}
                               onChange={(event) => setValue(event.currentTarget.value)} value={value}
                               onKeyPress={clientTypingHandler}/>
                    <Button color={'primary'} onClick={sendMessageHandler}>send</Button>
                </FormControl>
            </Paper>
        </Grid>
    )
}
