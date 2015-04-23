var db = require('../../database');

module.exports = {
    addTrack: function (req, res) {

        var list = db.PLAYLIST + ":" + req.params.idRoom;
        var key = req.body;

        db.clientPub.rpush(list, JSON.stringify(key));

        res.sendStatus(200, 'OK');

    },
    getAll: function(req, res){

        var list = db.PLAYLIST + ":" + req.params.idRoom;

        db.clientSub.lrange(list, 0, -1, function(err, obj){
            if(obj !== null) {
                var listPlaylistTrack = [];
                obj.forEach(function (trackIn) {
                    var jsonTrack = JSON.parse(trackIn);
                    listPlaylistTrack.push(jsonTrack);

                })

                return res.json(listPlaylistTrack);
            }

        });
    },
    getFirst: function(req, res){

        var list = db.PLAYLIST + ":" + req.params.idRoom;

        db.clientSub.lindex(list, 0, function(err, obj){
            return res.json(JSON.parse(obj));

        });
    },
    delFirst: function(req, res){

        var list = db.PLAYLIST + ":" + req.params.idRoom;

        db.clientPub.lpop(list);
    }
};

