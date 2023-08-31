const reg = require('../models/reg')
const bcrypt = require('bcrypt');
const session = require('express-session');
const nodemailer = require("nodemailer");

exports.login = (req, res) => {
    try {
        res.render('login.ejs', { message: '' })
    } catch (error) {
        console.log(error)
    }
}
exports.signup = (req, res) => {
    try {
        res.render('signupform.ejs', { message: '' })
    } catch (error) {
        console.log(error)
    }
}

exports.usercreation = async (req, res) => {
    try {

        const { email, pass } = req.body
        const emailcheck = await reg.findOne({ email: email })
        // console.log(emailcheck)
        if (emailcheck == null) {

            const convertedpass = await bcrypt.hash(pass, 10)
            const record = new reg({ email: email, password: convertedpass })
            record.save()
            res.render('signupform.ejs', { message: "Account has been created Successfully" })
        } else {
            res.render('signupform.ejs', { message: "Account has been alreday created " })
        }
    } catch (error) {
        console.log(error)
    }
    // console.log(record)
}
exports.logincheck = async (req, res) => {
    try {

        // console.log(req.body)
        const { email, pass } = req.body
        const emailcheck = await reg.findOne({ email: email })

        //    console.log(emailcheck)
        if (emailcheck !== null) {
            const passwordcomapred = await bcrypt.compare(pass, emailcheck.password)
            //    console.log(passwordcomapred)
            if (passwordcomapred) {
                req.session.isAuth = true
                req.session.loginemail = email
                req.session.role = emailcheck.role
                if (emailcheck.email == 'admin@gmail.com') {
                    res.redirect('/admin/dashboard')
                } else {
                    res.redirect('/usersprofiles')
                }

            } else {
                res.render('login.ejs', { message: 'Wrong Credinatles' })
            }
        } else {
            res.render('login.ejs', { message: 'Wrong Credinatles' })

        }

    }
    catch (error) {
        console.log(error)
    }
}
exports.dashboard = (req, res) => {

    const loginemail = req.session.loginemail

    res.render('admin/dashboard.ejs', { loginemail })
}
exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}
exports.userdetails = async (req, res) => {
    const loginemail = req.session.loginemail
    const record = await reg.find()
    res.render('admin/users.ejs', { loginemail, record })
}
exports.forgotpasswordform = async (req, res) => {
    res.render('forgotpasswordform.ejs', { message: '' })
}
exports.forgotpasswordlinksent = async (req, res) => {
    // console.log(req.body)
    const { email } = req.body
    const record = await reg.findOne({ email: email })
    // console.log(record)
    if (record == null) {
        res.render('forgotpasswordform.ejs', { message: 'Email not Found' })
    } else {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'smsyed123786@gmail.com', // generated ethereal user
                pass: 'yvpfsmnzwjwyycbx', // generated ethereal password
            },
        });
        console.log("connected to smtp Server")
        let info = await transporter.sendMail({
            from: 'smsyed123786@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Forgot Password Link- CMS Prject', // Subject line
            text: 'Click to reset the password', // plain text body
            html: ` <a href=http://localhost:5000/forgotlink/${email}>click to reset the password</a>`, // html body
            // attachments:[{
            //     path:filepath
            // }]
        });
        console.log('Email Sent Successfully')
        res.render('forgotpasswordform.ejs', { message: 'Link successfully delivered in registered Email id ' })
    }
}
exports.forgotlink = (req, res) => {
    const email = req.params.email
    res.render('forgotlink.ejs', { email })
}
exports.forgotpasswordupdate = async (req, res) => {
    // console.log(req.body)
    const { pass } = req.body
    const convertedpass = await bcrypt.hash(pass, 10)
    // console.log(req.params.email)
    const email = req.params.email
    const record = await reg.findOne({ email: email })
    // console.log(record)

    const id = record.id
    await reg.findByIdAndUpdate(id, { password: convertedpass })
    res.render('forgotmessage.ejs')
}
exports.userprofiles = async (req, res) => {

    const loginemail = req.session.loginemail
    const record = await reg.find({ img: { $nin: ['user.png'] } })
    res.render('usersprofile.ejs', { loginemail, record })
}
exports.profileform = async (req, res) => {
    try {

        const loginemail = req.session.loginemail
        const record = await reg.findOne({ email: loginemail })
        const id = record.id
        // console.log(record)
        res.render('profileform.ejs', { loginemail, record, message: '' })
    } catch (error) {
        console.log(error)
    }
}
exports.profileupdate = async (req, res) => {
    const filename = req.file.filename
    const { fname, lname, number, about } = req.body
    const loginemail = req.session.loginemail
    const record = await reg.findOne({ email: loginemail })
    const id = record.id
    if (req.file) {
        const filename = req.file.filename
        await reg.findByIdAndUpdate(id, { firstname: fname, lastname: lname, mobile: number, desc: about, img: filename })
        // res.render('/profileform', { loginemail, record, message: 'SucessFully Profile Has been Updated ' })
    } else {
        await reg.findByIdAndUpdate(id, { firstname: fname, lastname: lname, mobile: number, desc: about })

    }
    res.redirect('/profile')

}
exports.contact = async (req, res) => {
    const loginemail = req.session.loginemail
    const id = req.params.id
    const record = await reg.findById(id)
    res.render("contactdetails.ejs", { loginemail, record })
}

exports.roleupdate = async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    const record = await reg.findById(id)
    let newrole = null
    if (record.role == 'public') {
        newrole = 'pvt'
    } else {
        newrole = 'public'
    }
    await reg.findByIdAndUpdate(id, { role: newrole })
    res.redirect('/admin/users')
}
exports.changepasswordform = (req, res) => {
    const loginemail = req.session.loginemail
    res.render('passwordchangeform.ejs', { loginemail, message: '' })
}
exports.passwordupdate = async (req, res) => {
    const loginemail = req.session.loginemail
    const { email, cpass, npass } = req.body
    const record = await reg.findOne({ email: email })
    // console.log(record)
    const id = record.id
    const passwordcompare = await bcrypt.compare(cpass, record.password)
    console.log(passwordcompare)
    if (passwordcompare) {
        const newpass = await bcrypt.hash(npass, 10)
        await reg.findByIdAndUpdate(id, { password: newpass })
        req.session.destroy()
        res.render('forgotmessage.ejs', { loginemail, message: 'Successfully Updated pls Login Again' })
    } else {
        res.render('passwordchangeform.ejs', { loginemail, message: 'password not matched ' })
    }
}
exports.delete=async(req,res)=>{
    // console.log(req.params.id)
    const id =req.params.id
    await reg.findByIdAndDelete(id)
    res.redirect('/admin/users')
}