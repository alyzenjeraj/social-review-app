// import React, { useState, useEffect } from 'react'
// import { TextField, Button, Typography, Paper } from '@material-ui/core';
// import FileBase from 'react-file-base64'
// import { useDispatch, useSelector } from 'react-redux'
// import { createPost, updatePost } from '../actions/posts'

// const Form = ({ currentId, setCurrentId}) => {

//     const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

//     const [postData, setPostData] = useState({
//         creator: '',
//         title: '',
//         mmessage: '',
//         tags: '',
//         selectedFile:'',
//     })

//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (post) setPostData(post);
//     }, [post])

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if(currentId) {
//             dispatch(updatePost(currentId, postData))
//         } else {
//             dispatch(createPost(postData))
//         }

//         clear();
        
//     }

//     const clear = () => {
//         setCurrentId(null);
//         setPostData({
//             creator: '',
//             title: '',
//             mmessage: '',
//             tags: '',
//             selectedFile:'',
//         })
//     }


//     // return (
//     //     <Paper>
//     //         <form autoComplete='off' noValidate  onSubmit={handleSubmit}>
//     //             <Typography variant='h6'>Create a Post!</Typography>
//     //             <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})} />
//     //             <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
//     //             <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
//     //             <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})} />
//     //             <div>
//     //                 <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64}) } />
//     //             </div>
//     //             <Button variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
//     //             <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
//     //         </form>
//     //     </Paper>
//     // )

//     return (
//         <Paper className='p-4' >
//           <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
//             <Typography className='' variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
//             <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
//             <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
//             <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
//             <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
//             <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
//             <Button  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
//             <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
//           </form>
//         </Paper>
//       );
// }

// export default Form


import React, { useState, useEffect } from 'react'

import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../actions/posts';




const Form = ({currentId, setCurrentId}) => {
    
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

//     const [postData, setPostData] = useState({
//         creator: '',
//         title: '',
//         mmessage: '',
//         tags: '',
//         selectedFile:'',
//     })

//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (post) setPostData(post);
//     }, [post])

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if(currentId) {
//             dispatch(updatePost(currentId, postData))
//         } else {
//             dispatch(createPost(postData))
//         }

//         clear();
        
//     }

//     const clear = () => {
//         setCurrentId(null);
//         setPostData({
//             creator: '',
//             title: '',
//             mmessage: '',
//             tags: '',
//             selectedFile:'',
//         })
//     }

    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('test');
        if(currentId) {
            console.log('before dispatch')
            dispatch(updateRestaurant(currentId, {...restaurantData, userName: user?.result?.name}))
            console.log('hello')
        } else {
            console.log('else statement');
            console.log(user?.result?.name)
            dispatch(createRestaurant({...restaurantData, userName: user?.result?.name}))
        }
        clear();
        
    } 

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} >
                <Typography variant='h6' align='center'>
                    Please Sign In to add your restaurant reviews and like other's!
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setRestaurantData(
            { 
                
                title: '', 
                desc: '', 
                tags: '', 
                selectedFile: '' 
            }
        )
    }

    

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjYyZjE3MWNkMjI3MzQ3MjM2MzAzNDQ4MiIsImlhdCI6MTY2MDA1Njc3OSwiZXhwIjoxNjYwMDYwMzc5fQ.1c-dtl9nJeANlBBAnj3h3R1c_UnkVU5MSXMzJidPuoc

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjYyZjE3MWNkMjI3MzQ3MjM2MzAzNDQ4MiIsImlhdCI6MTY2MDA1NTUzNSwiZXhwIjoxNjYwMDU5MTM1fQ.3oQpiZOIOYeVYqhUvqUsT-LRkV_dTGcOpull4Hj9eDM
    
    // yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAdC5jb20iLCJpZCI6IjYyZjI3NWI2Y2RlYzg2YmJiNzlmYmMxYyIsImlhdCI6MTY2MDA1NzAxNCwiZXhwIjoxNjYwMDYwNjE0fQ.Q-EHYSmcGZOwmSgjZvooNP-0h_TWMRoDb9Dk71vcU_c

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAdC5jb20iLCJpZCI6IjYyZjI3NWI2Y2RlYzg2YmJiNzlmYmMxYyIsImlhdCI6MTY2MDA1NzAxNCwiZXhwIjoxNjYwMDYwNjE0fQ.Q-EHYSmcGZOwmSgjZvooNP-0h_TWMRoDb9Dk71vcU_c
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Edit' : 'Add'} A Restaurant</Typography> 
                {/* <TextField name='name' variant='outlined' label ='Name' fullWidth value={restaurantData.name} onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})} /> */}
                <TextField name='title' variant='outlined' label ='Title' fullWidth value={restaurantData.title} onChange={(e) => setRestaurantData({...restaurantData, title: e.target.value})} />
                <TextField name='description' variant='outlined' label ='Description' fullWidth value={restaurantData.desc} onChange={(e) => setRestaurantData({...restaurantData, desc: e.target.value})} />
                <TextField name='tags' variant='outlined' label ='Tags' fullWidth value={restaurantData.tags} onChange={(e) => setRestaurantData({...restaurantData, tags: e.target.value.split(',')})} />
                <div className={classes.fileInput}>
                    <FileBase  type='file' multiple={false} onDone={({base64}) => setRestaurantData({ ...restaurantData, selectedFile: base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form