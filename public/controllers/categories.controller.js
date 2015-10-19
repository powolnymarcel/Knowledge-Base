angular.module('knowledgebase')


    // On a besoin du SCOPE, du http pour pouvoir faire des requetes GET et la fonction : Attention bien faire passer les parametres de la fn dans le meme ordre
        .controller('CategoriesCtrl',['$scope','$http','$routeParams','$rootScope','$location',function($scope,$http,$routeParams,$rootScope,$location){

        // viendra de notre BACKEND nodejs ou plutot ira sur le backend node chercher les data
        $http.get('/categories').success(function(data){
            //Assigner une variable scope categories qui contiendra les data DONC les data seront dispo dans la vue !
            $rootScope.categories = data;


            // On récup les objets catégories
            var recupLesCategories = data;
            console.log(data);

            //on crée un tableau vide
            var nombreArticleDansLaCategorie = [];

            // On boucle sur les objets catégories
            for (var i=0; i<recupLesCategories.length;i++){

                // Ici on récupère la catégorie unique, la variable contient le slug de la catégorie
                var laCategorieUnique = recupLesCategories[i].slug;

                console.log(laCategorieUnique);
                console.log("**********************"+ i);
                $http.get('/articles/category/'+laCategorieUnique).success(function(data){
                    nombreArticleDansLaCategorie.push(data.length);
                    $rootScope.nombreArticleDansLaCategorie=nombreArticleDansLaCategorie;
                })
            }

        });

    //FROM STACKOVERFLOW
        //Fiend told me that Angular makes 'sub scope' for each ng-repeat - therefore this binding without {{}} is possible. – Paweł Szymański Jun 11 '13 at 19:30

        $scope.removeCategory=function(id){

            if(confirm('Etes-vous certain de vouloir supprimer la categorie ?')){

                $http.delete('/categories/'+id).success(function(data){
                    console.log(data);
                    console.log('categorie supprimée')
                });
                $location.path('/tutu')
            };
        }
    }])


    //[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ AJOUTER DE 1 CATEGORIE ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]*

    .controller('CategoriesCreateCtrl',['$scope','$http','$routeParams','$rootScope','$location',function($scope,$http,$routeParams,$rootScope,$location){

        $scope.addCategory=function(){


            var slug= $scope.name.toLowerCase();
            var data = {
                name:$scope.name,
                description:$scope.description,
                slug:slug
            };
            console.log(data);
            // On communique avec NodeJS
            $http.post('/categories',data).success(function(data,status){
                console.log(data);
                console.log(status);
            });
            // $http.get('/articles').success(function(data){
            //     $scope.articles = data +1;
            // });

            $http.get('/categories').success(function(data){
                $rootScope.categories = data
            });
            $location.path('/categories')
        }
    }])
    //[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ Editer 1 CATEGORIE ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]*

    .controller('CategoriesEditCtrl',['$scope','$http','$routeParams','$rootScope','$location',function($scope,$http,$routeParams,$rootScope,$location){
        // d'abord on recupere les catégories
        $http.get('/categories/'+$routeParams.id).success(function(data){
            $scope.category = data;
        });

        $scope.updateCategory=function(){
            var slug=            $scope.category.name.toLowerCase();

            // On crée l'objet data qui est en fait les nouvelles data de la categorie
            var data =
            {
                id:             $routeParams.id,
                name:          $scope.category.name,
                description:       $scope.category.description,
                slug:           slug
            };
            // On communique avec NodeJS en PUT pour un update et Node fais le reste VOIR categories.js et ensuite le modele category.js
            $http.put('/categories',data).success(function(data,status){
            });


           // On réhydrate le scope avec les NOUVELLES INFOS
            $http.get('/categories').success(function(data) {
                console.log('_______________________');
                console.log(data);
                console.log('_______________________');
                //Assigner une variable scope categories qui contiendra les data DONC les data seront dispo dans la vue !
                $rootScope.categories = data;
            })
            // on redirect vers les articles
            $location.path('/categories')
        }



        }])











