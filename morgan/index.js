const express = require('express')
const morgan = require('morgan')
const app = express();
const AppError = require('./AppError');


app.use('/dogs', (req, res, next)=>{
    req.requestTime = Date.now();
    console.log(req.requestTime)
return next()
})

const verifyPassword = (req, res, next) => {
    if(req.query.password === '1234'){
        
        next();
    }
    else{
        res.status(401)
       throw new AppError('You need a password!', 401)
    }
   
}

app.get('/', (req, res) =>{
    res.send(`HOME PAGE`)
})

app.get('/error', (req, res)=> {
    chicken.fly()
})

app.get('/secret', verifyPassword, (req, res) =>{
    res.send(`This is the secret page`)
})

app.get('/dogs', (req, res) =>{
    res.send('WOOF WOOF')
})

app.get('/admin', (req, res) =>{
    throw new AppError('YOU ARE NOT AN ADMIN!!!!', 403)
})

app.use((req, res)=>{
    res.send('page not found')
})

app.use((err, req, res, next)=>{
   const { status = 500 } = err;
   const { message = 'something went Wrong'} = err;
   res.status(status).send(message)
    next()
})

app.listen(3000, ()=>{
    console.log('listening on 3000')
})