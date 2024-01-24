const mongoose = require('mongoose');

main().then(()=>{
    console.log('database connected by neil!')
}).catch(err => console.log('its gone wrong', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');

}

const userSchema = new mongoose.Schema({
    first: String, 
    last: String, 
    addresses: [
        {
            _id: {_id: false}, 
            street: String,
            city: String, 
            state: String, 
            country: String
            
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry', 
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame Street', 
        city: 'New York', 
        state: 'NY', 
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async(id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: '1 5th Avenue', 
        city: 'Las Vegas', 
        state: 'NV', 
        country: 'USA'
    })
    const res = await user.save()
    console.log(res)
}

addAddress('65ae3bfc19165121a0c4d875');