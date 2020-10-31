import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core'
import PolymerOutlinedIcon from '@material-ui/icons/PolymerOutlined'
import React from 'react'

export const Header:React.FC<PropsType> = ({style}) => {
    return (
        <AppBar position='static' className={style}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <PolymerOutlinedIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit">
                    socket.io
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
type PropsType = {
    style: string

}
