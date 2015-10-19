//Une fois les routes faites, il faudra créer les controlleurs et les lier au modele POUR ALLER chercher en DB les DATA
// Ensuite Construire les FORM pour ajouter des articles à la DB

//Créer/ instancier son app dans la variable app
var  app = angular.module('knowledgebase',['ngRoute']);

//Ici on défini nos routes, on injecte le $routeProvider
app.config(['$routeProvider',function($routeProvider){
    //********************************************************************ROUTES CATEGORIES
    $routeProvider.
        // Chaque route ue l'on fera aura besoin de sa fonction when(), dans laquelle on ajoute le PATH
            //'categories' sera la landing page
        when('/categories',{
            // ici on a besoin de nos options - templateUrl pour la vue à envoyer - controller pour le Ctrl à utiliser
            templateUrl:'views/Categories/categories.view.html',
            // Cette vue sera la landing page, elle aura la liste des catégories qui viendra du controlleur ci dessous
            // Ainsi que une liste des derniers articles, cette liste viendra du controlleur "ArticlesCtrl"
            controller: 'CategoriesCtrl'
        }).
        when('/categories/add',{
            templateUrl:'views/Categories/add_category.view.html',
            controller: 'CategoriesCreateCtrl'
        }).
        when('/categories/edit/:id',{
            templateUrl:'views/Categories/edit_category.view.html',
            controller: 'CategoriesEditCtrl'
        }).
        //********************************************************************ROUTES ARTICLES
        when('/articles',{
            templateUrl:'views/Articles/articles.view.html',
            controller: 'ArticlesCtrl'
        }).
        when('/articles/details/:id',{
            templateUrl:'views/Articles/article_details.view.html',
            controller: 'ArticleDetailsCtrl'
        }).
        when('/articles/category/:categorySlug',{
            templateUrl:'views/Articles/cat_articles.view.html',
            controller: 'ArticlesCategoryCtrl'
        }).
        when('/articles/add',{
            templateUrl:'views/Articles/add_article.view.html',
            controller: 'ArticleCreateCtrl'
        }).
        when('/articles/edit/:id',{
            templateUrl:'views/Articles/edit_article.view.html',
            controller: 'ArticleEditCtrl'
        }).
        //Si aucunes route alors redirige vers
        otherwise({redirectTo: '/categories'});
}]);