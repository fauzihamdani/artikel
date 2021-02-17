const Auth = require('../model/auth');
const Author = require('../model/author');


exports.getlogin = (req, res, next) => {
    res.render('auth/login', {
        errorMessage: '',
        oldInput: {
            errorMessage: '',
            email: '',
            password: '',
        }
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        errorMessage: '',
        oldInput: {
            errorMessage: '',
            email: '',
            password: '',
        }
    });
};


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Auth.findByOne(email)
        .then((user) => {
            if (password === user[0][0].password) {
                req.session.isLoggedIn = true;
                req.session.user = user[0][0];
                return req.session.save((err) => {
                    res.redirect('/');
                });
            } else {
                return res.status(422).render('auth/login', {
                    errorMessage: 'Invalid Email or Password',
                    oldInput: {
                        email: email,
                        password: password,
                    },
                });
            }

        })
        .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const auth = new Auth(null, name, email, password, 'images/profile.svg');
    auth.save()
        .then(() => {
            res.redirect('/');
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};
