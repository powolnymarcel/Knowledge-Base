// BACKEND
var mongoose= require('mongoose');

var articleSchema = mongoose.Schema({
    title:{
        type : String,
        index : true,
        required:true
    },
    body:{
        type: String,
        required:true
    },
    category:{
        type: String,
        index: true,
        require:true
    },
    categorySlug:{
        type: String,
        index: true,
        require:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

//Permet d'acceder à l'objet Article dans l'app via le fichier de routing par ex.'
var Article = module.exports = mongoose.model('Article', articleSchema);


// Dans le fichier de routing on va appeler les methodes find, save, ... de ce fichier.

//Un callback car on veut creer un callback dans le fichier routing et le passer à cette fonction

//***********************************************Avoir la liste des articles
module.exports.getArticles = function(callback){
        Article.find(callback);
};

//***********************************************Avoir la l'article par ID
module.exports.getArticleById = function(id,callback){
    Article.findById(id,callback);
};


//***********************************************Avoir la l'article par categorie
module.exports.getArticlesByCategory = function(slug,callback){
    var query = {categorySlug:slug};
    Article.find(query, callback);
};


//***********************************************Creer  l'article
module.exports.createArticle = function(newArticle,callback){
    newArticle.save(callback);
}

//***********************************************Mettre à jour l'article
module.exports.updateArticle = function(id,data,callback){
    var title    = data.title;
    var body     = data.body;
    var category = data.category;
    var categorySlug = data.categorySlug;

    var query = {_id:id};
// On a besoin d'un callback pour trouver l'article
    Article.findById(id,function(err,article){
        if(!article){
            return next(new Error('Impossible de trouver l\'article'))
        }
        else{
            //Ici on a trouvé l'article et on hydrate les variables
            article.title= title;
            article.body= body;
            article.category= category;
            article.categorySlug= categorySlug;

            article.save(callback);
        }
    })
};


//***********************************************SUPPRIMER  l'article
module.exports.removeArticle = function(id,callback){
    Article.find({_id:id}).remove(callback);
}





























