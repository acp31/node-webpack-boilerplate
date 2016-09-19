var express     = require("express");
var fs          = require("fs");
var bodyParser  = require('body-parser');
var path        = require('path');
var webpack     = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware')
var config      = require('./webpack.config');
var app     = express(); 
var compiler = webpack(config);

var port = process.env.PORT || config.devPort;
var address = config.devAddress;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('morgan')('short'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.use(express.static(__dirname + '/src'));
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});