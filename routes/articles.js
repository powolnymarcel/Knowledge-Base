// COTE SERVEUR POUR ARTICLES

var express = require('express');
var router = express.Router();

//Ce fichier, cette variable plutot, permet d'avoir acces à l'objet Article(modele)
var Article = require('../modeles/article');

//***********************************************Route GET pour recup tous les articles
// Pas besoin de préciser /articles car on est dans le fichier articles.js
router.get('/', function(req, res, next) {
                            // convention : function err = erreur et res = resources   dans ce cas ci on met "articles" c'est pareil...
  Article.getArticles(function(err,articles){
    if(err){
      console.log(err);
    }
    else{
      // Si pas d'erreur on veut UNIQUEMENT RECUPERER DU JSON, on est dans le back end et dans le FRONT ANGULAR FERA LE BOULOT, surtout moi ^^...
      res.json(articles);
    }
  })
});

//***********************************************Route GET pour recup l'article via ID
// On ne met pas /article/:id car on est dans le fichier articles e
router.get('/details/:id', function(req, res, next) {
                        // req.params.id pour récuperer l'id ou AUTRE CHOSE tant que la clé existe
  Article.getArticleById(req.params.id,function(err,article){
    if(err){
      console.log(err);
    }
    else{
      res.json(article);
    }
  })
});

//***********************************************Route GET pour recup les articles via catégories
router.get('/category/:categorySlug', function(req, res, next) {
  Article.getArticlesByCategory(req.params.categorySlug,function(err,articles){
    if(err){
      console.log(err);
    }
    else{
      res.json(articles);
    }
  })
});

//***********************************************Route une fois que le POST est initié, ajoute un article DONC la route une fois l'article ajouté sera 'articles' donc post('/')
router.post('/', function (req,res,next) {
  // recuperer les valeurs du formulaire
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var categorySlug = req.body.categorySlug;

  // on doit construire l'objet article
  var newArticle = new Article({
    title : title,
    category:category,
    body:body,
    categorySlug:categorySlug
  });

 // Appeller la méthode pour créer l'article dans le modèle

  Article.createArticle(newArticle,function(err,article){
    if(err){
      console.log(err);
    }
    res.location('/articles');
    res.redirect('/articles');
  });
});


//***********************************************Route une fois que le PUT est initié via l'envoi du form, mets à jour un article

router.put('/',function(req,res,next){
   // viendra d'un champs caché dans le form
  var id = req.body.id;
  //On rempli l'objet data avec les données qui vienne du FORM'
  var data = {
    title:req.body.title,
    category:req.body.category,
    body:req.body.body,
    categorySlug:req.body.categorySlug
  };

  //Créer l'article en appelant la méthode updateArticle du modèle Article
  Article.updateArticle(id,data,function(err,article){
    if(err){
      console.log(err);
    }
    res.location('/articles');
    res.redirect('/articles');
  });
});

//***********************************************Route pour SUPPRIMER un article
// on passe l'id pour savoir quel article supprimer
router.delete('/:id',function(req,res,next){
  var id = req.params.id;

  //Supprimer l'article' en appelant la méthode removeArticle du modèle Article
  Article.removeArticle(id, function(err,articles){
    if(err){
      console.log(err)
    }
    res.location('/articles');
    res.redirect('/articles');
  });
});



module.exports = router;
