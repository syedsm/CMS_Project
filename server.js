const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();
const userrouter = require('./routers/userrouter');
const adminrouter = require('./routers/adminrouter');
const session = require('express-session');
const mongoose = require('mongoose');

function db() {
    mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => console.error("DB Connection Error: ", error.message));
}

db();

app.use(session({
    secret: process.env.SECRET_KEY ,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

app.use(userrouter);
app.use('/admin', adminrouter);

app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
