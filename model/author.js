const db = require('../util/database');

module.exports = class Product {
    constructor(title, name, email) {

        this.title = title;
        this.name = name;
        this.email = email;
    }

    // save() {
    //     return db.execute(
    //         'INSERT INTO artikel ( title, content, image, created_at, author_id, category_id) VALUES (?,?,?,?,?,?)',
    //         [
    //             this.title,
    //             this.content,
    //             this.image,
    //             this.created_at,
    //             this.author_id,
    //             this.category_id
    //         ]

    //     );
    // }

    // static deleteById(id) { }

    // static fetchAll() {
    //     return db.execute('SELECT * FROM artikel');
    // }

    static findById(id) {
        return db.execute('SELECT * FROM author WHERE author.id = ?', [id]);
    }
};
