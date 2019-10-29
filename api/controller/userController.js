var mongoose = require('mongoose')
var User = mongoose.model('User')

exports.create_a_user = async (req, res) => {
    const user = await new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.login = async (req, res) => {
    
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
}

exports.get_info_login = async (req, res) => {
    console.log(req.token)
    res.send(req.user)
}

exports.get_all = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err)
        res.json(user)
    })
}


exports.log_out_all = async (req, res) => {
    try {
        req.user.tokens = []
        console.log(req.user.tokens)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }   
}

exports.log_out = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

exports.update_user = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
        
    } catch (e) {
    
    }
}