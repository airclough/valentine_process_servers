'use strict';

var http = require( 'http' );
var express = require( 'express' );
var config = require( './config' );
var routes = require( './app/routes' );

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// configure app
config( app );

// wire up routes
routes( app );

var port = process.env.PORT || 6969;
var server = http.createServer( app );

server.listen( port, function() {
  console.log( 'node.js running on port ' + port );
});
