import React, { useState, useEffect} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import Posts from '../Posts'
import Form from '../Form'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getPosts, getPostBySearch } from '../../actions/posts'
import useStyles from './styles'
import Pagesfeature from '../Pagesfeature'
import ChipInput from 'material-ui-chip-input'


const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery();
    const navigate= useNavigate();
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 ) {
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]) 

    const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete))

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery?=${search || 'none' }&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    return (
        <Grow in>
                <Container maxWidth='xl'>
                    <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={9} >
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <AppBar position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Seach Reviews' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                            <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label='Search Tags' variant='outlined' />
                            <Button onClick={searchPost} variant='contained' color='primary'>Search</Button>
                        </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <Paper elevation={6} >
                                <Pagesfeature page={page} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
