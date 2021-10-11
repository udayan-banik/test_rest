const { Router } = require('express')
const express = require('express')
const router = express.Router()
const User = require("../models/user")

// router.post('/sign')

//post
router.post('/api/sign_up', async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(201).json({"success": true})
    } catch (err) {
        res.status(400).json({"success": false})
    }
})

router.post('/api/sign_in', getUser, async (req,res) => {
    const usertest = await User.find({email: req.body.email, password: req.body.password})
    if (usertest == null)
        return res.status(400).json({"success": 'false'})
    else
        return res.status(200).json({"success": 'true'})

})


//delete all
router.post('/api/clean', async (req,res) => {
    try {
        db.orders.deleteMany( { "client" : "Microsoft" } );
        res.status(200).json({"success": true})
     } catch (err) {
        console.log(err);
     }
})

async function getUser(req,res, next) {
    let user
    try {
        user = await User.find({email: req.params.email, password: req.params.password})
        if(user == null) //check if subscriber exists or here doesnot exist
            return res.status(404).json({message: 'Cannot find user'}) //return used 'cause we immediately wanna escape out if there is no subscriber
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router