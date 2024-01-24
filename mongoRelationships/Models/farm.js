const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(()=>{
    console.log('database connected by neil!')
}).catch(err => console.log('its gone wrong', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');

}


const productSchema = new Schema({
    name: String, 
    price: Number, 
    season: {
        type: String, 
        enum: ['Spring', 'Summer', 'Autumn', 'Winter']
    }

})

const farmSchema = new Schema({
    name: String, 
    city: String, 
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
}) 

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer'},
//     { name: 'Asparagus', price: 3.99, season: 'Spring'},
// ])

const updateFarm = async () => {
    const farm = await Farm.findOne({name: 'Full Belly Farm'})
    const watermelon = await Product.findOne({name: 'Sugar Baby Watermelon'});
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
}

// updateFarm()

Farm.findOne({name: 'Full Belly Farm'})
.populate('products')
.then(farm => console.log(farm))