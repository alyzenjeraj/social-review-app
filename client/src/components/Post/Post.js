import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../actions/posts'
import { useNavigate } from 'react-router';


import useStyles from './styles';



const Post = ({ post, setCurrentId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'))
    const [likes, setLikes] = useState(post?.likes)
    const classes = useStyles();

    const hasLikedPost = post?.likes?.find((like) => like === (user?.result?.googleId || user?.result?._id))
    
    const Likes = () => {
        
        

        if (post?.likes?.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openPost = () => navigate(`/posts/${post._id}`)

    const handleLike = () => {
        dispatch(likePost(post._id))

        if(hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== (user?.result.googleId || user?.result?._id)))
        } else {

        }

    }

    return (
        <Card raised elevation={6} className={classes.card}>
        <ButtonBase onClick={openPost} component='span' className={classes.cardAction}>
            <CardMedia className={classes.media} component='img' image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            </ButtonBase>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
                <Button onClick={() => setCurrentId(post._id)} style={{ color: 'black' }} size="small">
                <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            )}
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            <CardContent>
            <Typography color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />
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
