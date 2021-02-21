const { promiseImpl } = require('ejs');
const Artikel = require('../model/artikel');
const Author = require('../model/author');
const Category = require('../model/category');


exports.getArticles = (req, res, next) => {
    Artikel.fetchAll()
        .then(([artikelrows, fieldData]) => {

            res.render('artikel/artikel-list', {
                articles: artikelrows,
                pageTitle: 'All Articles',
            });
        }
        )
        .catch(err => console.log(err));
};

exports.getAddArticle = (req, res, next) => {
    Category.fetchAll()
        .then(([categoryRows, fieldData]) => {
            res.render('artikel/add-article', {
                categories: categoryRows,
            });

        }
        )
        .catch(err => console.log(err));
};

exports.postAddArticle = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.file;
    const category = req.body.category;
    const created_at = new Date();
    const categoryId = parseInt(category);
    const imageUrl = image.path;
    console.log(categoryId);

    const artikel = new Artikel(null, title, content, imageUrl, '4564', 4, categoryId);

    artikel.save()
        .then(() => {

            res.redirect('/');
        }
        )
        .catch(err => console.log(err));
};


exports.getArticle = (req, res, next) => {
    const artikelId = req.params;


    Artikel.findById(artikelId.artikelId)
        .then((artikel) => {

            Category.fetchAll().then(([categoryRows]) => {
                res.render('artikel/edit-article', {
                    artikel: artikel[0],
                    categories: categoryRows
                });
            });


        }
        )
        .catch(err => console.log(err));

};


// Artikel.findById(artikelId.artikelId)
// .then((artikel) => {

//     Category.fetchAll().then(([categoryRows]) => {
//         res.render('artikel/edit-article', {
//             artikel: artikel[0],
//             categories: categoryRows
//         });
//     });


// }
// )
// .catch(err => console.log(err));