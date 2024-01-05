const express = require('express');
const path = require('path');
const app = express();
const methodOveride = require('method-override')
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOveride('_method'))

app.set('views', path.join(__dirname, 'views'))


app.set('view engine', 'ejs')
let comments = [
    {   
        id: uuid(),
        username: 'Todd', 
        comment: 'lol that is funny'
    }, 
    {   
        id: uuid(),
        username: 'Ben', 
        comment: 'i not like that'
    }, 
    {   
        id: uuid(),
        username: 'Tamsin', 
        comment: 'I like dripping'
    }, 
    {   
        id: uuid(),
        username: 'Jude', 
        comment: 'Woopsidasie'
    }
        
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})


app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment,  id: uuid() })
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id)
    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText
    res.redirect('/comments')
})


app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter (c=>c.id !== id)
    res.redirect('/comments')
})

app.get('/tacos', (req, res)=>{
    res.send("Get /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Ok, Here are your ${qty} ${meat} tacos.`)
})

app.listen(3000, () => {
    console.log("on port 3000")
}); 