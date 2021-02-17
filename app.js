const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const Author = require('./model/author');
const multer = require('multer');
const fs = require('fs');
const db = require('./util/database');


const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir('images', (err => cb(null, 'image')));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
    session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();

    }
    Author.findById(req.session.user.id)
        .then((user) => {
            if (!user) {
                next();
            }
            req.user = user;
            next();
        });



});

const artikelRoutes = require('./routes/artikel-route');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(artikelRoutes);
app.use(authRoutes);



app.listen(3033);