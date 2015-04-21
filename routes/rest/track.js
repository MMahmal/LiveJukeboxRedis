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

    }
};

