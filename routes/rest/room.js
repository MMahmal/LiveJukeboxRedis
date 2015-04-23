/***
 * API Rest pour FrontEnd AngularJS
 *
 */


var db = require('../../database');

var redis = require('redis');
var data = {};


module.exports = {
    getAll: function(req, res){
        db.clientSub.hgetall(db.ROOMS, function (err, obj) {
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
            console.log("obj :", obj);
            if(obj !== null)
                var StringRooms = JSON.stringify(obj);
                //console.log("StringRooms : ", StringRooms);
                var rooms = JSON.parse(StringRooms);
                //console.log("rooms JSON :", rooms);

                var ListRooms = [];

                for(var i=0; i < (rooms.length);i++){

                    var parse = rooms[i];
                    //console.log("current Parse : ",parse);

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

                return res.json(ListRooms);

        });
    },
    create: function(req, res){
        var room = {};

        //console.log("Body:", req.body);

        room.idRoom = "idRoom:" + req.body.userAdmin + ":" + req.body.roomName;
        room.Name = req.body.roomName;
        room.Admin = req.body.userAdmin;

        var hash = {};

        //console.log("Room DATA : ", room);
        hash = db.ROOM + ":" + room.Admin + ":" + room.Name;
        //console.log("Hash :",hash);
        var data = '{"roomName":' + '"' + room.Name + '"' +',"userAdmin":' + '"' + room.Admin + '"}';
        //console.log("Data :",data);
        db.clientPub.hmset(db.ROOMS,room.idRoom, data);

        db.clientPub.hmset(hash, "roomName", room.Name,"userAdmin", room.Admin);

        res.sendStatus(200, 'OK');
    },
    delete: function(req, res){
        console.log("idRoom Get:", req.params.idRoom);

        var key = '"' + "idRoom:" + req.params.idRoom + '"';

        var hash = '"' + db.ROOMS + ":" + key + '"';

        console.log("Key :", key);

        //db.clientPub.hdel(db.ROOMS, key, redis.print);
        //db.clientPub.send_command("hdel", [ db.ROOMS, key ] , redis.print );
        db.clientPub.del(key, function(err, rows){

        });

    }

};