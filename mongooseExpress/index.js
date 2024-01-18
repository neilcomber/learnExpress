const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const AppError = require('./AppError');

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
app.use(methodOverride('_method'))

const categories = ['fruit', 'veg', 'dairy', 'fish']

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/products', async (req, res, next) => {
    try{
        const { category } = req.query;
        if(category){
            const products = await Product.find({category})
            res.render('products/index', {products, category})
        }
        else {
            const products = await Product.find({})
            res.render('products/index', {products, category: 'All'})
        }
    } catch (e) {
        next(e)
    }
   
    
    
})

app.get('/products/new', (req, res) => {
    
    res.render('products/new', {categories})
})


app.post('/products', async (req, res, next) =>{
    const { name, price, category } = req.body
    try{
        const newProduct = new Product({
            name, price, category
        })
        await newProduct.save()
        res.redirect(`/products/${newProduct._id}`)
    }
    catch(err){
        next(err)
    }
    
    
})

app.get('/products/:id/edit', async (req, res, next) => {

    try{
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product){
        throw new AppError('There is no product with that id', 400);
     }
    res.render('products/edit', {product, categories})
    } catch(e) {
        next(e)
    }
})


app.put('/products/:id', async (req, res, next) => {
    const { name, price, category } = req.body
    const { id } = req.params
    try {
    const product = await Product.findByIdAndUpdate(id, { name, price, category}, { runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
    } catch(e) {
        next(e)
    }
})

app.get('/products/:id',  async (req, res, next) => {
    try {
    const { id } = req.params
    const product = await Product.findById(id)
    if(!product){
       throw new AppError('There is no product with that id', 400);
    }
    res.render('products/show', {product})
} catch(e) {
    next(e)
}
})

app.delete('/products/:id', async (req, res, next) => {
    try{
    const { id } = req.params
    await Product.findByIdAndDelete(id)

    res.redirect('/products')
} catch(e){
    next(e)
}
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);

})

app.listen(3000, () => console.log('---Listening on 3000---'))

//