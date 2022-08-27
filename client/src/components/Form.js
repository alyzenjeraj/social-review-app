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
import { useNavigate } from 'react-router';




const Form = ({currentId, setCurrentId}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)

    const [postData, setPostData] = useState({
        // creator: '',
        title: '',
        mmessage: '',
        tags: '',
        selectedFile:'',
    })


    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
            
        } else {
            
             dispatch(createPost({...postData, name: user?.result?.name}, navigate))
        }
        navigate('/posts')
        clear();
        
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            // creator: '',
            title: '',
            mmessage: '',
            tags: '',
            selectedFile:'',
        })
    }

    

    


    if (!user?.result?.name) {
        return (
            <Paper >
                <Typography variant='h6' align='center'>
                    Please Sign In to add your restaurant reviews and like other's!
                </Typography>
            </Paper>
        )
    }


    return (
                <Paper className='p-4' >
                  <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
                    <Typography className='' variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                    {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                    <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                    <Button  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                  </form>
                </Paper>
              );

    
    
}

export default Form