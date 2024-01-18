const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('<h1>The Home Page !!!</h1>')
})

app.get('/r/:subreddit', (req, res)=>{
    const { subreddit } = req.params
    res.send(`<h1>This is a subreedit of ${subreddit}!</h1>`)
})
app.get('/r/:subreddit/:postId', (req, res)=>{
    const { subreddit, postId } = req.params
    res.send(`<h1>This is a subreedit of ${subreddit} with postId of ${postId}!</h1>`)
})

app.get('/cats', (req, res)=>{
    res.send('MEOW')
})

app.get('/search', (req, res)=>{
    const { color } = req.query;
    console.log(req.query);
    console.log(color);
    res.send(`<h1>Search results for ${color}</h1>`)
})

app.get('/dogs', (req, res)=>{
    res.send('woof')
})
app.get('*', (req,res)=>{
    res.send('i dont know what that is!')
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})