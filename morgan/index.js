const express = require('express')
const morgan = require('morgan')
const app = express();

//  app.use(morgan('common'))

// app.use((req, res, next)=>{
//     console.log('making my middleware!!!')
//     next();
//     console.log('call after middleware')
// });
// app.use((req, res, next)=>{
//     console.log('Thisis my 2nd middleware!!!')
//     next();
// });

app.use('/dogs', (req, res, next)=>{
    req.requestTime = Date.now();
    console.log(req.requestTime)
return next()
})

const verifyPassword = (req, res, next) => {
    if(req.query.password === '1234'){
        console.log('this is the secret page')
        next();
    }
    else{
        res.send('you cant know the secret!!!!')
    }
   
}

app.get('/', (req, res) =>{
    res.send(`HOME PAGE`)
})

app.get('/secret', verifyPassword, (req, res) =>{
    res.send(`This is the secret page`)
})

app.get('/dogs', (req, res) =>{
    res.send('WOOF WOOF')
})

app.use((req, res)=>{
    res.send('page not found')
})

app.listen(3000, ()=>{
    console.log('listening on 3000')
})