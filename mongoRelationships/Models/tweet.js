const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(()=>{
    console.log('database connected by neil!')
}).catch(err => console.log('its gone wrong', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');

}


const userSchema = new Schema({
    username: String, 
    age: Number
})

const tweetSchema = new Schema({
    text: String, 
    likes: Number, 
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}) 

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async()=> {
//     // const user = new User({username: 'neil', age: 39});
//     const user = await User.findOne({username: 'neil'})
//     const tweet2 = new Tweet({text: 'I not know what to say', likes: 4442})
//     tweet2.user = user;
//     await tweet2.save();
// }

// makeTweets()

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t)
}

findTweet();