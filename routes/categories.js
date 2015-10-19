// COTE SERVEUR POUR categories

var express = require('express');
var router = express.Router();

//Ce fichier, cette variable plutot, permet d'avoir acces à l'objet Article(modele)
var Category = require('../modeles/category')


// Pas besoin de préciser /categories car on est dans le fichier categories.js
router.get('/', function(req, res, next) {
    Category.getCategories(function(err,categories){
        if(err){
            console.log(err);
        }
        else{
            res.json(categories);
        }
    })
});

// On ne met pas /article/:id car on est dans le fichier articles e
router.get('/:id', function(req, res, next) {
    // req.params.id pour récuperer l'id ou AUTRE CHOSE tant que la clé existe
    Category.getCategoryById(req.params.id,function(err,category){
        if(err){
            console.log(err);
        }
        else{
            res.json(category);
        }
    })
});

//***********************************************Route une fois que le POST est initié, ajoute une categorie DONC la route une fois la categorie ajoutée sera 'categories' donc post('/')
router.post('/', function (req,res,next) {
    // recuperer les valeurs du formulaire
    var name = req.body.name;
    var description = req.body.description;
    var slug = req.body.slug;

    // on doit construire l'objet categorie
    var newCategory = new Category({
        name : name,
        description:description,
        slug:slug
    });

    // Appeller la méthode pour créer la categorie dans le modèle

    Category.createCategory(newCategory,function(err,category){
        if(err){
            console.log(err);
        }
        res.location('/categories');
        res.redirect('/categories');
    });
});


//***********************************************Route une fois que le PUT est initié via l'envoi du form, mets à jour une categorie
router.put('/',function(req,res,next){
    // l'id viendra d'un champs caché dans le form
    var id = req.body.id;
    //On rempli l'objet data avec les données qui vienne du FORM
    var data = {
        name:req.body.name,
        description:req.body.description,
        slug:req.body.slug
    };

    //Créer la catégorie en appelant la méthode updateCategory du modèle Category
    Category.updateCategory(id,data,function(err,category){
        if(err){
            console.log(err);
        }
        res.location('/categories');
        res.redirect('/categories');
    });
});

//***********************************************Route pour SUPPRIMER une categorie
// on passe l'id pour savoir quel article supprimer
router.delete('/:id',function(req,res,next){
    var id = req.params.id;

    //Supprimer la catégorie' en appelant la méthode removeCategory du modèle Category
    Category.removeCategory(id, function(err,category){
        if(err){
            console.log(err)
        }
        res.location('/categories');
        res.redirect('/categories');
    });
});



module.exports = router;