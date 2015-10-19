# KnowledgeBase
Site web avec articles et catégories
<hr>
AngularJS - NodeJS - MongoDB - Express - MongoLab - Heroku - Github - Bootstrap
<hr>
<img src="http://ondego.be/divers/kbapp.png"/>

<hr>

Requis :
<hr>
<ul>
<li>NodeJS</li>
<li>MongoDB</li>
</ul>
<hr>
# Utiliser les JSON pour populer la BDD<br><br>
Rappel : export <br>
mongoexport --db test --collection traffic --out traffic.json<br><br>
Rappel : import <br>
You must use mongoimport while connected to a mongod instance. <br>
mongoimport -d test -c collectionTest test.json <br>
<hr>

#Pour tester avec votre MongoLab

<ul>
<li>Commenter la ligne 19 du fichier racine app.js</li>
<li>Décommenter la ligne 24 sur fichier racine app.js</li>
</ul>
<hr>

Lancer via (local):
* Lancer "mongod" 
* npm start
* Voir résultat sur http://localhost:3000

#Divers
<hr>
Usage de https://bootswatch.com/


#A voir ici (DEMO)
<hr>
Heroku + Mongolab.
https://pure-waters-1996.herokuapp.com/#/categories