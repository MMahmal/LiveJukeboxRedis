/***
 * API Rest pour FrontEnd AngularJS
 *
 */


var db = require('../../database');


var data = {};


module.exports = {
    getAll: function(req, res){
        db.clientSub.hgetall(db.USER, function (err, obj) {

            return res.json(obj);
        });

    },
    getOne: function(req, res){

        var key = "idUser:" + req.params.idUser;

        db.clientSub.hget(db.USER, key, function (err, obj) {

            var jsonUser = JSON.parse(obj);
            return res.json(jsonUser);
        });
    },
    create: function(req, res){
        var user = {};

        console.log(req.body.user);
        console.log(req.body.mail);
        console.log(req.body.password);


        user.id = "idUser:" + req.body.user;
        user.data = "[{"+ '"username":' + '"' + req.body.user + '"' +"," + '"mail":' + '"' + req.body.mail + '"'
        + "," + '"password":' + '"' + req.body.password + '"' + "}]";


        db.clientPub.hmset(db.USER, user.id, user.data);

        res.sendStatus(200, 'OK');
    },
    login: function(req, res){
        var user = {
            username: req.body.user,
            password: req.body.password
        };

        console.log(user);

        var key = "idUser:" + req.body.user;

        db.clientSub.hget(db.USER, key, function (err, obj) {

            console.log(obj);

            var jsonUser = JSON.parse(obj);

            if(jsonUser.username === user.username && jsonUser.password === user.password)

                db.clientPub.lpush(db.CONNECTED, user.username);

                return res.sendStatus(200);


        });
    },
    isConnected: function(req, res){

        console.log(req.params.idUser);

        db.clientSub.get(db.CONNECTED, function (err, obj) {

            console.log(res.json(obj));

            return res.json(obj);

        });

    },
    delete: function(req, res){

    }

};