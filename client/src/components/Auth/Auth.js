import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input';
// import { GoogleLogin } from 'react-google-login';

import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signin, signup } from '../../actions/auth'



import Icon from './Icon';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {



    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [ isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))

        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevSignUp) => !prevSignUp)
        setShowPassword(false)
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const googleSuccess = async (res) => {
        console.log(res)
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log('Google Sign In Failed. Try Again Later.')
    }

    const handleCallbackResponse = (res) => {
        console.log('Encoded JWT ID Token: ' + res.credential)
        var result = jwt_decode(res.credential)
        console.log(result)

        dispatch({type: 'AUTH', data: {result}})
        navigate('/')
    }
/* global google */  
    useEffect(() => {
        
        google.accounts.id.initialize({
            client_id: "288470372258-ef5basn7ks089883sk9sia6im416s6ub.apps.googleusercontent.com",
            callback: handleCallbackResponse 
        })  ;

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme: 'outline', size: 'large'}

        )
    }, [])

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus  half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange}  half />
                                    
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' /> }
                    </Grid>
                    
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <div id='signInDiv'></div> */}
                    {/* <GoogleLogin render={(renderProps) => (
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained' >Google Sign In</Button>
                    )} onSuccess={googleSuccess} onError={googleFailure} cookiePolicy='single_host_origin' /> */}
                    {/* <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    /> */}

                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up!'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
