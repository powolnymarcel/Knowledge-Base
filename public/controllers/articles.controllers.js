angular.module('knowledgebase')



    //[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ AFFICHER LES ARTICLES ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]*
    // On a besoin du SCOPE, du http pour pouvoir faire des requetes GET et la fonction : Attention bien faire passer les parametres de la fn dans le meme ordre
        //Utilisation du $rootScope pour avoir le nombre d'articles dans le nav, car le nav est en dehors du ng-view'
    .controller('ArticlesCtrl',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

        // viendra de notre BACKEND nodejs ou plutot ira sur le backend node chercher les data
        $http.get('/articles').success(function(data){
            //Assigner une variable scope categories qui contiendra les data DONC les data seront dispo dans la vue !
            $rootScope.articles = data;
        })
    }])

    //[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ AFFICHER LES ARTICLES PAR CATEGORIES ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]*
    // Usage de $routeParams car on a besoin de récup des infos de l'url, dans ce cas ci on récupere la catégorie
    .controller('ArticlesCategoryCtrl',['$scope','$http','$routeParams','$rootScope',function($scope,$http,$routeParams,$rootScope){
                                                // LE 'categorySlug' viens de la fn getArticlesByCategory du fichier articles.js dans la dossier routes
        $http.get('/articles/category/'+$routeParams.categorySlug).success(function(data){
            // Ici on sait que ce sont les articles DE LA catégorie
            $rootScope.catArticles = data;
            // on récupère juste le nom de la categorie
            $scope.category= $routeParams.categorySlug;
        })
    }])

    //[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ AFFICHER LES DETAILS DE 1 ARTICLE]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]*
    .controller('ArticleDetailsCtrl',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location){
        $http.get('/articles/details/'+$routeParams.id).success(function(data){
            $scope.article = data;
        })

           $scope.removeArticle=function(){

               if(confirm('Etes-vous certain de vouloir supprimer l\'article :')){

                   $http.delete('/articles/'+$routeParams.id).success(function(data){
                    console.log(data);
                       console.log('article supprimé')
                   });
                   $location.path('/articles');
               };
           }

    }])
    //[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ AJOUTER DE 1 ARTICLE ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]*

    .controller('ArticleCreateCtrl',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location){
      // d'abord on recupere les catégories'
        $http.get('/categories').success(function(data){
            $scope.categories = data;
        });

        $scope.addArticle=function(){
            var cat= $scope.category.toLowerCase();
            var data = {
                title:$scope.title,
                category:$scope.category,
                body:$scope.body,
                categorySlug:cat
            };
            console.log(data);
            // On communique avec NodeJS
            $http.post('/articles',data).success(function(data,status){
                console.log(data);
                console.log(status);
            });
           // $http.get('/articles').success(function(data){
           //     $scope.articles = data +1;
           // });

            $http.get('/articles').success(function(data){
                $scope.articles = data
            });
            $location.path('/articles')
        }

    }])
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ Editer  1 ARTICLE ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]*
    .controller('ArticleEditCtrl',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location){

        // d'abord on recupere les catégories
        $http.get('/categories').success(function(data){
            $scope.categories = data;

        });
        // Ensuite  on recupere l'ARTICLE

        $http.get('/articles/details/'+$routeParams.id).success(function(data){
            $scope.article = data;
        });
            // MAINTENANT LE FORM EDIT EST A JOUR CAR LE SCOPE EST PRESENT ET l'ATTRIBUT NG MODEL EST CORRECT

        // Une fois que le USER clique sur Submit, il lance la fn ci dessous.
        $scope.updateArticle=function(){
            // De part la construction de la DB, le slug est créer via le select pour la categorie
            var cat=            $scope.article.category.toLowerCase();

            // On crée l'objet data qui est en fait les nouvelles data de l'article
            var data =
            {
                id:             $routeParams.id,
                title:          $scope.article.title,
                category:       $scope.article.category,
                body:           $scope.article.body,
                categorySlug:   cat
            };

            // On communique avec NodeJS en PUT pour un update et Node fais le reste VOIR articles.js et ensuite le modele article.js
            $http.put('/articles',data).success(function(data,status){
            });

        // on redirect vers les articles
            $location.path('/articles')
        }

    }])