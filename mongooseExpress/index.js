const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmShop')
.then(()=>{
    console.log('connected to database')
})
.catch(err => {
    console.log('all gone to shit', err)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) =>{
    const { name, price, category } = req.body
    const newProduct = new Product({
        name, price, category
    })
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id',  async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show', {product})
})



app.listen(3000, () => console.log('---Listening on 3000---'))

//