//create a action 
//to create action just do 

const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/users');

//module.exports.actionName = function(req, res){ //write the function }


//async await applied here
module.exports.home = async function(req, res){  //aysnc for telling this si async await func.
    // console.log(req.cookies);

    //to show the post on homepage
    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: "Codeial | home",
    //         posts: posts
    //     }); 
    // });


    //populate the whole user object from each post
    try{

        //by this we get the all posts from DB
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path:'user'
        },
        //populate the likes for each post and comment
        populate: {
            path:'likes'
        }
    }).populate('likes');

    let users =  await User.find({}); //await is used for telling wait for the upper then execute it
   
            return res.render('home',{    
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        }catch(err){
            console.log('Error', err);
            return;
        }
    }
//we use (try catch) for the error detection in code, we just use it once in code     

    
    // return res.end('<h1> Express is up for Codeial! </h1>');


