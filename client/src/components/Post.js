import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../actions/posts'


const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    return (
        <Card>
            <CardMedia component='img' image={post.selectedFile} title={post.title}/>
            <div>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div>
                <Button style={{color: 'black'}} size='small' onClick={() => {setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize='medium'/>
                </Button>
            </div>
            <div>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            <CardContent>
            <Typography color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize='small' /> 
                    Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' /> 
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
