const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load User module
 User = require('../../models/User');

 router.use(function(req, res, next) {
    //res.send(__dirname + 'index.html')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//@route        GET api/users/test
//@description: TEST PROFILE ROUTE
//@access       Public
router.get('/test', (req, res, next) => res.json({ msg: 'Users Works!'}));


//@route        POST api/users/add
//@description: TEST PROFILE ROUTE
//@access       Public
router.post('/add', (req, res, next) => {
    User.findOne({ phone: req.body.phone})
        .then(user => {
           // if(user){
                //errors.phone = 'Phone number already exists'
               // return res.status(400).json({phone: 'Phone number already exists'})
            //}else{
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone
                  
                });

                newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
            //}
           
        })
});

//@route GET api/users/:_id
//@desc GET USERS_ID
//@access PUBLIC
router.get('/:_id', (req, res, next) =>{
    User.findById({'_id': req.params._id})
     .then(user => {
        if(!user){
            res.status(404).json({user: 'There is no ID for this user'})
        }

        res.json(user)
    })
    .catch(err => res.status(404).json({user: 'There is no ID for this user'}))
})



//@route GET api/users/
//@desc GET ALL 
//@access PUBLIC
router.get('/', (req, res, next) => {
    User.find()
    .then(users => {
        if(!users) {
            return res.status(404).json({users: 'There a no users'});
        }
        res.json(users)
    })
    .catch(err => res.status(404).json({users: 'There a no users'}))
})

//@route DELETE api/users
//@desc DELETE USER 
//@access PRIVATE
router.delete('/:_id', (req, res, next) => {
    
    User.findOneAndRemove({'_id': req.params._id})
        .then(() => {
            User.findOneAndRemove({'_id': req.params._id}).then(()=>{
                res.json({success: true})
            })
        })
});

module.exports = router;