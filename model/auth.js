const db = require('../util/database');

module.exports = class Auth {
    constructor(id, name, email, password, userImage) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.userImage = userImage;
    }

    save() {
        return db.execute(
            'INSERT INTO author ( name,email,password,user_image) VALUES (?,?,?,?)',
            [
                this.name,
                this.email,
                this.password,
                this.userImage
            ]
        );
    }

    static findByOne(email) {
        return db.execute('SELECT * FROM author WHERE author.email = ?', [email]);
    }

    static findById(id) {
        return db.execute('SELECT * FROM author WHERE author.id = ?', [id]);
    }

    static findToLoggedIn(email) {
        return db.execute('SELECT COUNT(*) FROM author WHERE author.email = ?', [data]);
    }

    static loginAuthor(email, password) {
        return db.execute('SELECT * FROM author WHERE email = ? AND password = ?', [email, password]);
    }
};

// SELECT COUNT(*) FROM author WHERE author.email = ?;

// SELECT * FROM author WHERE author.email = ?