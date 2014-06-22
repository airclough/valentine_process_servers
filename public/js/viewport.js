window.app.viewport = ( function( $ ) {
  var viewport = {
    init: function() {
      this.height = $( window ).height();

      this._cacheSelectors()
        .setHeights();
    },

    _cacheSelectors: function() {
      this.$elems = $( 'body > div, body > section, body > footer' );
      return this;
    },

    setHeights: function() {
      var elHeights = {};
      var total = 0;

      Array.prototype.slice.call( this.$elems ).forEach( function( el, i ) {
        var $el = $( el );

        elHeights[ $el.attr( 'id' ) ] = total;
        total += $el.innerHeight();
      });

      this.elHeights = elHeights;
    },

    getHeight: function( id ) {
      return this.elHeights[ id ];
    }
  };

  return viewport;
})( $ );
