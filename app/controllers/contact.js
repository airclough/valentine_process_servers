'use strict';

module.exports = ( function() {
  function create( req, res ) {
    console.log( req.body );

    res.json( { name: req.body.name } );
  }

  return { create: create };
})();
