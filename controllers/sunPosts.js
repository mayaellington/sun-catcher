const SunPost = require('../models/sunPost');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3();

module.exports = {
    create,
    index,
    deleteSunPost
}

function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, ' from aws')
            const sunPost = await SunPost.create({
                location: req.body.location, 
                date: req.body.date, 
                description: req.body.description, 
                sunQuote: req.body.sunQuote, 
                postType: req.body.postType, 
                user: req.user, 
                photoUrl: data.Location
            });
            console.log(sunPost)

            await sunPost.populate('user');
		
            res.status(201).json({sunPost: sunPost})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function index(req, res){
    try {
        const sunPosts = await SunPost.find({}).populate('user').exec()

        //counts number of posts per user and passes to json - FAVORITE
        const sunTokens = sunPosts.length
        res.status(200).json({sunPosts, sunTokens})
        
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}



async function deleteSunPost(req, res) {
    try {
        const sunPost = await SunPost.findOneAndDelete({_id: req.params.id, user: req.user._id});
        console.log(sunPost, " <-= post in delete!")
        res.json({data: 'post removed'})
    } catch(err){
        res.status(400).json({err})
    }
    
}
