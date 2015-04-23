var db = require('../../database');

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

        user.id = "idUser:" + req.body.user;
        user.data = "[{"+ '"username":' + '"' + req.body.user + '"' +"," + '"mail":' + '"' + req.body.mail + '"'
        + "," + '"password":' + '"' + req.body.password + '"' + "}]";


        db.clientPub.hmset(db.USER, user.id, user.data);

        var hash = db.USER + ":" + req.body.user;

        db.clientPub.hmset(hash, "username", req.body.user, "mail", req.body.mail, "password", req.body.password);

        res.sendStatus(200, 'OK');
    },
    login: function(req, res){
        var user = {
            username: req.body.user,
            password: req.body.password
        };

        var key = "idUser:" + req.body.user;

        db.clientSub.hget(db.USER, key, function (err, obj) {
            var jsonUser = JSON.parse(obj);

            if(jsonUser.username === user.username && jsonUser.password === user.password)

                db.clientPub.lpush(db.CONNECTED, user.username);

                return res.sendStatus(200);

        });
    }
};