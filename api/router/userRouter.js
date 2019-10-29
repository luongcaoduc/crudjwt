const express = require('express')
const router = new express.Router()
const User = require('../model/userModel')
const userController = require('../controller/userController')
var auth = require('../auth/auth')

router.get('/users', userController.get_all)
router.post('/users', userController.create_a_user)


router.post('/users/login', userController.login)
router.get('/users/me', auth, userController.get_info_login)
router.post('/users/logout', auth, userController.log_out)
// router.post('/users/logout', auth, async (req, res) => {

// })

router.post('/users/logoutAll',auth, userController.log_out_all)


router.patch('/users/me', auth, userController.update_user)

module.exports = router