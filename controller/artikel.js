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
    console.log(artikelId);
    Artikel.findById(artikelId.artikelId)
        .then((artikel) => {

            Category.fetchAll().then(([categoryRows]) => {
                console.log(artikel[0]);
                res.render('artikel/edit-article', {
                    artikel: artikel[0],
                    categories: categoryRows
                });
            });



        }
        )
        .catch(err => console.log(err));
};

// Author.findById(artikelrows.author_id)
//                 .then(resultUser){
//                 res.render('artikel/artikel-list', {
//                     user: resultUser,
//                     articles: artikelrows,
//                     pageTitle: 'All Articles',
//                 });
//                 console.log(artikelrows);


//             }

    // res.render('artikel/artikel-list', {
    //      user: resultUser,
    //      articles: artikelrows,
    //      pageTitle: 'All Articles',
    //      });

    // res.render('shop/product-detail', {
    //     product: product[0],
    //     pageTitle: product.title,
    //     path: '/products'
    //   });