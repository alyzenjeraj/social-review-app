import React from 'react'
import { Container } from '@material-ui/core';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';




import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';

// import useStyles from './styles'
import Auth from './components/Auth/Auth';

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));

    
    
    return (
        <BrowserRouter>

            
            <Container maxWidth='xl'>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Navigate to='/posts' />} />
                    <Route path='/posts' exact element={<Home />} />
                    <Route path='/posts/search' exact element={<Home />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path='/auth' exact element={(!user ? <Auth /> : <Navigate to='/posts' /> )} />
                </Routes>
            </Container>
           
            
        </BrowserRouter>
        
    )
}

export default App





// import React, { useEffect, useState } from 'react'
// import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
// import { useDispatch } from 'react-redux'
// import { getPosts } from './actions/posts'
// import memories from './images/memories.png'
// import Posts from './components/Posts'
// import Form from './components/Form'

// const App = () => {
//     const [currentId, setCurrentId] = useState(null)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getPosts())
//     }, [dispatch, currentId])

//     return (
//         <Container maxwidth='lg'>
//             <AppBar position='static' color='inherit'>
//                 <Typography variant='h2' align='center'>Memories</Typography>
//                 <img src={memories} alt='memories' height='60'/>
                
//             </AppBar>
//             <Grow in>
//                 <Container >
//                     <Grid className='mainContainer' container justifyContent='space-between' alignItems='stretch' spacing={3}>
//                         <Grid item xs={12} sm={7}>
//                             <Posts setCurrentId={setCurrentId}/>
//                         </Grid>
//                         <Grid item xs={12} sm={4}>
//                             <Form currentId={currentId} setCurrentId={setCurrentId} />
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </Grow>
//         </Container>
//     )
// }

// export default App
