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
        required: true, 
        maxlength: 20

    }, 
    price: {
        type: Number, 
        required: true, 
        min: [0, 'that price is too low!!!']
    }, 
    onSale: {
        type: Boolean, 
        default: false
    }, 
    categories: {
        type: [String]
    }, 
    qty: {
        online:{
            type: Number, 
            default: 0
        }, 
        inStore: {
            type: Number, 
            default: 0
        }
    }, 
    size: {
        type: String, 
        enum: ['S', 'M', 'L']
    }
    
});

productSchema.methods.greet = function() {
    console.log("hey hey hey bitches how you doing???")
}

const Product = mongoose.model('Product', productSchema);

// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 30, size: 'M'}, {new: true, runValidators: true })

// // const bike = new Product({
// //     name: 'Tire Pump', 
// //     price: 20, 
// //     categories: ['cycling', 'wheels']
    
// // })

// // bike.save()
// .then(data => {
//     console.log('------It worked!!!!-----')
//     console.log(data)
// })
// .catch(err => {
//     console.log('NOT WORKING!!!')
//     console.log(err)
// })