// BACKEND
// MODELE CATEGORY

// On a besoin du module mongoos pour determiner des regles du modele
var mongoose= require('mongoose');




var categorySchema = mongoose.Schema({
    name:{
        type : String,
        index : true,
        required:true
    },description:{
        type : String,
        required:true
    },slug:{
        type : String
    }
});
// Cette regle force la taille de la description entre  30 et 140 caractères
categorySchema.path('description').validate(function (v) {
    if(v.length < 30 || v.length > 140){
        return false;
    }
    else{
        return true;
    }
    //On console log pour savoir l'erreur'
}, 'Doit etre + de 30 et moins de 140');

//Permet d'acceder à l'objet Category dans l'app via le fichier de routing par ex.'
var Category = module.exports = mongoose.model('Category', categorySchema);


// Dans le fichier de routing on va appeler les methodes find, save, ... de ce fichier.

//Un callback car on veut creer un callback dans le fichier routing et le passer à cette fonction

//***********************************************Avoir la liste des articles
module.exports.getCategories = function(callback){
    Category.find(callback);
}

//***********************************************Avoir la l'article par ID
module.exports.getCategoryById = function(id,callback){
    Category.findById(id,callback);
}


//***********************************************Avoir la l'article par categorie
module.exports.getArticlesByCategory = function(category,callback){
    var query = {category:category};
    Article.find(query, callback);
}

//***********************************************Creer un categorie

module.exports.createCategory = function(newCategory,callback){
    newCategory.save(callback);
}


//***********************************************Mettre à jour la categorie
module.exports.updateCategory = function(id,data,callback){
    var name    = data.name;
    var description     = data.description;
    var slug     = data.slug;

    var query = {_id:id};

// On a besoin d'un callback pour trouver la categorie
    Category.findById(id,function(err,category){
        if(!category){
            return next(new Error('Impossible de trouver la categorie'))
        }
        else{
            //Ici on a trouvé l'categorie et on hydrate les variables
            category.name= name;
            category.description= description;
            category.slug= slug;

            category.save(callback);
        }
    })
};

//***********************************************SUPPRIMER  la categorie
module.exports.removeCategory = function(id,callback){
    Category.find({_id:id}).remove(callback);
}

























