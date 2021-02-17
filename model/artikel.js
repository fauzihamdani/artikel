const db = require('../util/database');

module.exports = class Artikel {
    constructor(id, title, content, image, created_at, author_id, category_id) {

        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.created_at = created_at;
        this.author_id = author_id;
        this.category_id = category_id;
    }

    save() {
        return db.execute(
            'INSERT INTO artikel ( title, content, image, created_at, author_id, category_id) VALUES (?,?,?,?,?,?)',
            [
                // this.id ,
                this.title,
                this.content,
                this.image,
                this.created_at,
                this.author_id,
                this.category_id
            ]

        );
    }

    // static deleteById(id) { }

    static fetchAll() {
        return db.execute(`select * from artikel inner join author on artikel.author_id = author.id inner join category on artikel.category_id = category.id;
        `);
        // return db.execute('SELECT a.name "author"');
    }

    static findById(id) {
        return db.execute('SELECT * FROM artikel inner join author on artikel.author_id = author.id inner join category on artikel.category_id = category.id WHERE artikel.id_artikel = ?', [id]);
    }
};
