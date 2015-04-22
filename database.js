/**
 * Created by MhD on 17/03/15.
 */
var redis = require("redis");

var clientSub = redis.createClient("6379", "chmaks.me");

var clientPub = redis.createClient("6379", "chmaks.me");

//Connection Redis
clientSub.on('error', function() {
    console.log('Client Sub not Connected');
}).on('connect', function(){
    console.log('Connected to Redis Database with Client Sub');
});

clientPub.on('error', function() {
    console.log('Client Pub not Connected');
}).on('connect', function(){
    console.log('Connected to Redis Database with Client Pub');
});


var database = {

    USER: "USER",
    CONNECTED: "CONNECTEDUSER",
    ROOM: "ROOM",
    ROOMS: "ROOMS",
    TRACK: "TRACK",
    TRACKS: "TRACKS",
    PLAYLIST: "PLAYLIST",

    clientSub : clientSub,
    clientPub : clientPub

};

module.exports = database;
