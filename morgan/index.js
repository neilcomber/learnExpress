const express = require('express')
const morgan = require('morgan')
const app = express();

app.use(()=>{
    console.log('making my middleware!!!')
    next();
});

app.get('/', (req, res) =>{
    res.send('HOME PAGE')
})

app.get('/dogs', (req, res) =>{
    res.send('WOOF WOOF')
})

app.listen(3000, ()=>{
    console.log('listening on 3000')
})