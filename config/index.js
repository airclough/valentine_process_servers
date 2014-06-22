'use strict';

var path = require( 'path' );
var ejs = require( 'ejs' );
var express = require( 'express' );
var bodyParser = require( 'body-parser' );

module.exports = function( app ) {
  app.set( 'view engine', 'ejs' );
  app.set( 'views', path.resolve( __dirname, '../app/views' ) );
  app.engine( 'ejs', ejs.__express );
  app.use( bodyParser.json() );
  app.use( express.static( path.resolve( __dirname, '../public' ) ) );
};
