import React, {useEffect, useState} from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import {createConnectionSocket, destroyConnectionSocket, sentName} from './reducer/chat-reducer'
import {Button, Container, FormControl, Grid, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {Cards, Header} from './components'


function App() {
    const [chatActive, setChatActive] = useState(false)
    const [name, setName] = useState('')
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(createConnectionSocket())
        return () => {
            dispatch(destroyConnectionSocket())
        }
    }, [dispatch])

    const setNameHandler = () => {
        if (name.trim()) {
            dispatch(sentName(name))
            setChatActive(true)
            setName('')
        }
    }
    return (
        <>
            <Header style={classes.root}/>
            <Container maxWidth={'md'}>
                <Grid container justify='center'>
                    {!chatActive ?
                        <FormControl variant={'outlined'}>
                            <TextField label='name' type='text' value={name} required
                                       onChange={e => setName(e.currentTarget.value)}/>
                            <Button size={'small'} variant={'contained'} color={'primary'}
                                    onClick={setNameHandler}>sendName</Button>
                        </FormControl> :
                        <Cards/>}
                </Grid>
            </Container>

        </>
    )
}

export default App
export const useStyles = makeStyles({
    root: {
        marginBottom: '40px'
    },
    wrapper: {
        position: 'relative',
    },
    content: {
        height: '50vh',
        overflowY: 'auto',
        marginBottom: '30px'
    },
    messageBlock: {
        padding: '15px 5px',
        wordBreak: 'break-all'
    },
    typeUser: {
        position: 'absolute',
        bottom: '12%',
        left: '1%'
    }
})
