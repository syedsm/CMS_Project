const router = require('express').Router()
const regc = require('../controllers/regcontroller')
const multer = require('multer')
function handlelogin(req, res, next) {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/')
    }
}
function handlerole(req, res, next) {
    if (req.session.role == 'pvt') {
        next()
    } else {
        res.send('You Dont Rights To see The Contact Detail please Subscribe')
    }

}
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profileimages')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 4 }
})


router.get('/', regc.login)
router.post('/', regc.logincheck)
router.get('/signup', regc.signup)
router.post('/signup', regc.usercreation)
router.get('/logout', regc.logout)
router.get('/forgot', regc.forgotpasswordform)
router.post('/forgot', regc.forgotpasswordlinksent)
router.get('/forgotlink/:email', regc.forgotlink)
router.post('/forgotlink/:email', regc.forgotpasswordupdate)
router.get('/usersprofiles', handlelogin, regc.userprofiles)
router.get('/profile', regc.profileform)
router.post('/profile', upload.single('img'), regc.profileupdate)
router.get('/contactdetails/:id', handlelogin,handlerole,regc.contact)
router.get('/passwordchange',regc.changepasswordform)
router.post('/passwordchange',regc.passwordupdate)


module.exports = router