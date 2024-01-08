const express = require('express')
const path = require('path');
const app = express();
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


let posts = [
    {
        id: uuid(), 
        post: 'Stick it up your bum', 
        author: 'Neil'
    }, 
    {
        id: uuid(), 
        post: 'Stick it up your bum', 
        author: 'Neil'
    }, 
    {
        id: uuid(), 
        post: 'wheres cake?', 
        author: 'Jude'
    }, 
    {
        id: uuid(), 
        post: 'I made you cake', 
        author: 'Ben'
    }, 
    {
        id: uuid(), 
        post: 'I want vongole', 
        author: 'Tamsin'
    }
]

app.get('/posts', (req, res) => {
    res.render('index', { posts } )
})

app.get('/posts/new', (req, res) => {
    res.render('new')
})

app.post('/posts', (req, res) => {
    const { author, post } = req.body;
    posts.push({post, author, id: uuid()})
    res.redirect('/posts')
})

app.get('/posts/:id', (req, res) => {
    const {id} = req.params
    const thisPost = posts.find(post => post.id === id)
    res.render('soloPost', { thisPost })
})

app.get('/posts/:id/edit', (req, res) => {
    const {id} = req.params
    const thisPost = posts.find(post => post.id === id)
    res.render('edit', { thisPost })
})

app.patch('/posts/:id', (req, res) => {
    const { id } = req.params
    const { post, author } = req.body
    const foundPost = posts.find(p => p.id === id)
    foundPost.post = post

    res.redirect('/posts')
})

app.delete('/posts/:id/delete', (req, res) => {
    const { id } = req.params
    posts  = posts.filter(p => p.id !== id)
    res.redirect('/posts')
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})