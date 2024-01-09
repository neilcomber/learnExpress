const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>{
    console.log('connected to database')
})
.catch(err => {
    console.log('all gone to shit', err)
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }
    
})

const Product = mongoose.model('Product', productSchema);

const bike = new Product({
    name: 'Mountain Bike', 
    price: 99, 
    color: 'red'
})

bike.save()
.then(data => {
    console.log('It worked')
    console.log(data)
})
.catch(err => {
    console.log('NOT WORKING!!!')
    console.log(err)
})