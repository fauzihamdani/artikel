const db = require('../util/database');

module.exports = class Category {
    constructor(name) {

        this.name = name;
    }

    save() {
        return db.execute(
            'INSERT INTO category ( name) VALUES (?)',
            [
                this.name
            ]

        );
    }

    // static deleteById(id) { } 

    static fetchAll() {
        return db.execute(`select * from category;`);
        // return db.execute('SELECT a.name "author"');
    }

    // static findById(id) {
    //     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    // }
};
