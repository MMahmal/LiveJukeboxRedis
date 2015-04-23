var db = require('../../database');

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
            if(obj !== null)
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

                return res.json(ListRooms);

        });
    },
    create: function(req, res){
        var room = {};

        room.idRoom = "idRoom:" + req.body.userAdmin + ":" + req.body.roomName;
        room.Name = req.body.roomName;
        room.Admin = req.body.userAdmin;

        var hash = {};

        hash = db.ROOM + ":" + room.Admin + ":" + room.Name;
        var data = '{"roomName":' + '"' + room.Name + '"' +',"userAdmin":' + '"' + room.Admin + '"}';

        db.clientPub.hmset(db.ROOMS,room.idRoom, data);
        db.clientPub.hmset(hash, "roomName", room.Name,"userAdmin", room.Admin);

        res.sendStatus(200, 'OK');
    },
    delete: function(req, res){

        var key = '"' + "idRoom:" + req.params.idRoom + '"';

        db.clientPub.del(key, function(err, rows){

        });

    }

};