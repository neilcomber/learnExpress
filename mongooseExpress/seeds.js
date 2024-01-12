const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmShop')
.then(()=>{
    console.log('connected to database')
})
.catch(err => {
    console.log('all gone to shit', err)
})

// const p = new Product({
//     name: 'Ruby Grapefruit', 
//     price: 2, 
//     category: 'fruit'
// })

// p.save().then(p => console.log(p)).catch(e=>console.log(e))

Product.insertMany([
    {name: 'Fairy Eggplant', price: 1.00, category: 'veg'},
    {name: 'Organic Goddess Melon', price: 4.99, category: 'fruit'},
    {name: 'Watermelon', price: 3.99, category: 'fruit'},
    {name: 'Organic Celery', price: 1.50, category: 'veg'},
    {name: 'Chocolate Whole Milk', price: 2.69, category: 'dairy'},
] 
).then(res=> console.log(res)).catch(e=> console.log(e))