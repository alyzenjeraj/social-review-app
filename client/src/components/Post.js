import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
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
            <Typography variant='h5' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions>
                <Button size='small' color='primary' onClick={() => {}}>
                    <ThumbUpAltIcon fontSize='small' /> 
                    Like
                    {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => {}}>
                    <DeleteIcon fontSize='small' /> 
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
