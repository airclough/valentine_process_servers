'use strict';

var contactController = require( '../controllers/contact' );

module.exports = function( app ) {
  app.post( '/contact', contactController.create );
  app.get( '*', function( req, res ) {
    res.render( 'index' );
  });
};
