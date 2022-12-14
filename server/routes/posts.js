import express from 'express' 
import { commentPost, getPosts, getPost, createPost, updatePost, deletePost, likePost, getPostsBySearch } from '../controllers/posts.js'

const router = express.Router();

import auth from '../middleware/auth.js'

router.get('/search',getPostsBySearch)
router.get('/:id', getPost)
router.get('/',getPosts)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', commentPost)

export default router;