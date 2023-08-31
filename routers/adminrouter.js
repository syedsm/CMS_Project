const router = require('express').Router()

const regc = require('../controllers/regcontroller')
const { route } = require('./userrouter')

function handlelogin(req, res, next) {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/')
    }
}


router.get('/dashboard', handlelogin, regc.dashboard)
router.get('/users', handlelogin, regc.userdetails)
router.get('/roleupdate/:id',regc.roleupdate)
router.get('/delete/:id',regc.delete)


module.exports = router
