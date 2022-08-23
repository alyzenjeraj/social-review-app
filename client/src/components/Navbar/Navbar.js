import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles'
import restoRev from '../../images/restoreview.png';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';



const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // const user = null

    const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))

    console.log(user)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({type: 'LOGOUT' })
        history.push('/auth')
        setUser(null)
    }

    return (
        <div>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <div>
                    <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Resto-Reviews</Typography> 
                    <img className={classes.image} src={restoRev} alt='restorev' height='60' />
                </div>
                <Toolbar className={classes.toolbar}>

                </Toolbar>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary' >Sign In</Button>
                    )}
                 </AppBar>
        </div>
    )
}

export default Navbar
