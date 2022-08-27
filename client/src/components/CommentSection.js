import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { commentPost } from '../actions/posts'



const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const commentsRef = useRef()

    const handleClick = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments)
        setComment('')

        commentsRef.current.scrollIntoView({ behaviour: 'smooth'})
    }

    return (
        <div>
            <div>
                <div>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(': ')[0]}:</strong> 
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                <div style={{width: '70%'}} >
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField fullWidth minRows={4} variant='outlined' label='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                    <Button style={{margintop: '10px'}} fullWidth  disabled={!comment} variant='contained' color='primary' onClick={handleClick}>
                        Comment!
                    </Button>
                </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection
