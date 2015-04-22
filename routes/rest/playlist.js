var db = require('../../database');

module.exports = {
    addTrack: function (req, res) {
        var key = "idRoom:" + req.params.idRoom;

        db.clientSub.hget(db.TRACKS, key, function (err, obj) {

            var jsonUser = JSON.parse(obj);
            return res.json(jsonUser);
        });

    },
    getAll: function(req, res){

    },
    getFirst: function(req, res){

    },
    delFirst: function(req, res){
        
    }
};

