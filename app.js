var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes/index'),
  user = require('./routes/rest/user'),
  room = require('./routes/rest/room'),
  track = require('./routes/rest/track'),
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

var env = process.env.NODE_ENV || 'development';


// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

app.get('/', routes.index);

// Services REST
app.post('/rest/user', user.create);
app.get('/rest/user', user.getAll);
app.get('/rest/user/:idUser', user.getOne);
app.delete('/rest/user/:idUser', user.delete);

app.post('/rest/login', user.login);
app.get('/rest/connected/:idUser', user.isConnected);


app.get('/rest/room', room.getAll);
app.post('/rest/room', room.create);
app.get('/rest/room/:idRoom', room.getOne);
app.get('/rest/roomsInfo', room.getInfo);

app.get('/rest/tracks/:idRoom', track.getAll);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
