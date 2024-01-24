const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const AppError = require('./AppError');

const Product = require('./models/product');
const Farm = require('./models/farm');

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

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

// Farm Routes

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({})
    res.render('farms/index', {farms})
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.post('/farms', async (req, res) => {
    const newFarm = new Farm(req.body)
    await newFarm.save()
    res.redirect('/farms')
})

app.get('/farms/:id', async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id).populate('products');
    res.render('farms/show', {farm})
})

app.get('/farms/:id/products/new', async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id)
    res.render('products/new', { categories, id, farm})
})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const product =  new Product(req.body);
    farm.products.push(product)
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`)
})

app.delete('/farms/:id', async (req, res) => {
    try{
    console.log('deleting')
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.send('/farms')
} catch(e) {
    console.log(e)
}
})

// Product routes

const categories = ['fruit', 'veg', 'dairy', 'fish']



function wrapAsync(fn) {
    return function (req, res, next) {
    fn(req, res, next).catch(e=> next(e))
}
}

app.get('/products', wrapAsync(async (req, res, next) => {
        const { category } = req.query;
        if(category){
            const products = await Product.find({category})
            res.render('products/index', {products, category})
        }
        else {
            const products = await Product.find({})
            res.render('products/index', {products, category: 'All'})
        }   
}))

app.get('/products/new', (req, res) => {
    
    res.render('products/new', {categories})
})


app.post('/products', wrapAsync(async (req, res, next) =>{
    const { name, price, category } = req.body
        const newProduct = new Product({
            name, price, category
        })
        await newProduct.save()
        res.redirect(`/products/${newProduct._id}`)
    }
))



app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product){
        throw new AppError('There is no product with that id', 400);
     }
    res.render('products/edit', {product, categories})
    
}))


app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { name, price, category } = req.body
    const { id } = req.params
   
    const product = await Product.findByIdAndUpdate(id, { name, price, category}, { runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
}))

app.get('/products/:id', wrapAsync( async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id).populate('farm', 'name');
    console.log(product)
    if(!product){
       throw new AppError('There is no product with that id', 400);
    }
    res.render('products/show', {product})

}))

app.delete('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)

    res.redirect('/products')
}))

const handleValidationError = err => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name)
    if (err.name === 'ValidationError') err = handleValidationError(err)
    if (err.name === 'CastError') err = handleValidationError(err)
    next(err);
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);

})

app.listen(3000, () => console.log('---Listening on 3000---'))

//