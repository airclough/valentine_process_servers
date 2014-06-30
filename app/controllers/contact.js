'use strict';

var nodemailer = require( 'nodemailer' );

// create transport
var transport = nodemailer.createTransport( 'Direct', { debug: true } );

module.exports = ( function() {
  function create( req, res ) {
    var msg = {
      from: req.body.name + ' <' + req.body.email + '>',
      to: '"Paul Valentine" <pvalentine84@gmail.com>',
      subject: 'VPS Contact Form',
      text: req.body.msg,
      html: ''
        + '<p>' + req.body.msg + '</p>'
        + '<p><strong>' + req.body.name + '</strong></p>'
        + '<p>' + req.body.firm + '</p>'
        + '<p>email: ' + req.body.email + '</p>'
        + '<p>phone: ' + req.body.phone + '</p>'
    };

    transport.sendMail( msg, function( err ) {
      return err
        ? res.json( { error: true } )
        : res.json( { error: false, name: req.body.name } );
    });
  }

  return { create: create };
})();
