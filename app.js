var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes/index'),
  user = require('./routes/rest/user'),
  room = require('./routes/rest/room'),
  track = require('./routes/rest/track'),
  playlist = require('./routes/rest/playlist'),
  http = require('http'),
  path = require('path'),
    db = require('./database');


var app = module.exports = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routes
 */

app.get('/', routes.index);

// Services REST
app.post('/rest/user', user.create);
app.get('/rest/user', user.getAll);
app.get('/rest/user/:idUser', user.getOne);
//app.delete('/rest/user/:idUser', user.delete);

app.post('/rest/login', user.login);

app.get('/rest/room', room.getAll);
app.post('/rest/room', room.create);
app.get('/rest/room/:idRoom', room.getOne);
app.delete('/rest/room/:idRoom', room.delete);
app.get('/rest/roomsInfo', room.getInfo);

app.get('/rest/tracks/:idRoom', track.getAll);
app.patch('/rest/tracks/:idRoom/search', track.pathSearch);

app.post('/rest/playlist/:idRoom', playlist.addTrack);
app.get('/rest/playlist/:idRoom', playlist.getAll);
app.get('/rest/playlist/:idRoom/first', playlist.getFirst);
app.post('/rest/playlist/:idRoom/delFirst', playlist.delFirst);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
