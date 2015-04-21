/***
 * API Rest pour FrontEnd AngularJS
 *
 */


var db = require('../../database');


var data = {};


module.exports = {
    getAll: function(req, res){
        db.clientSub.hgetall(db.ROOMS, function (err, obj) {

            //var jsonUser = JSON.parse(obj);

            return res.json(obj);
        });

    },
    getOne: function(req, res){

        var hash = db.ROOM + ":" + req.params.idRoom;

        db.clientSub.hgetall(hash, function (err, obj) {

            return res.json(obj);
        });
    },
    getInfo: function(req, res){

        db.clientSub.hvals(db.ROOMS, function (err, obj) {

            var StringRooms = JSON.stringify(obj);

            var rooms = JSON.parse(StringRooms);

            var ListRooms = [];

            for(var i=0; i < (rooms.length);i++){

                var parse = rooms[i];

                try {
                    var partialParse = JSON.parse(parse);
                } catch(err) {
                    console.log(err);
                }

                var objPush = {
                    Name: partialParse.roomName,
                    Admin: partialParse.userAdmin
                }
                ListRooms.push(objPush);
            }

            console.log(ListRooms);

            res.json(ListRooms);

        });
    },

    /** TODO CREATE, DELETE
     *
     * CREATE in Hash ROOMS and Hash ROOM
     * **/
    create: function(req, res){
        var user = {};

        console.log(req.body.user);
        console.log(req.body.mail);
        console.log(req.body.password);


        user.id = "idUser:" + req.body.user;
        user.data = "{"+ '"username":' + '"' + req.body.user + '"' +"," + '"mail":' + '"' + req.body.mail + '"'
        + "," + '"password":' + '"' + req.body.password + '"' + "}";


        db.clientPub.hmset(db.USER, user.id, user.data);

        res.sendStatus(200, 'OK');
    },
    delete: function(req, res){

    }

};