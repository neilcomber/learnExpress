const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>{
    console.log('connected to database')
})
.catch(err => {
    console.log('all gone to shit', err)
})

const personSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }
})

personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

personSchema.pre('save', function () {
    this.firstName = 'YO';
    this.lastName = 'Mamma';
    console.log('about to save!!!!')
})
personSchema.post('save', function () {
    console.log('----THis has just saved---------!')
})

const Person = mongoose.model('Person', personSchema);

