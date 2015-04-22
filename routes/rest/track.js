/**
 * Created by MhD on 20/04/15.
 */
var db = require('../../database');


var data = {};


module.exports = {
    getAll: function (req, res) {
        var key = "idRoom:" + req.params.idRoom;

        db.clientSub.hget(db.TRACKS, key, function (err, obj) {

            var jsonUser = JSON.parse(obj);
            return res.json(jsonUser);
        });

    },
    pathSearch: function(req, res){

        var tracksList = [];

        var body = req.body;
        var setName = db.TRACK + ":" + req.params.idRoom;

        for (var trackIndex in body){
            tracksList.push(body[trackIndex]);
        }

        db.clientPub.set(setName, tracksList);
        return res.json(tracksList);

    },
    postSearch: function(req, res){
        //console.log("Body: ", req.body);
        //var setName = db.TRACK + ":" + req.params.idRoom;


    },
    getSearch: function(req, res){
        //console.log("Body: ", req.params.tracksResult);

        //return res.json(req.params.tracksResult);
    }
};

