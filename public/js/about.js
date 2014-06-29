window.app.about = ( function( $ ) {
  var Row = function( el ) {
    this.$el = $( el );
    this.$icon = this.$el.find( '.icon' );
    this.$content = this.$el.find( '.content' );

    this.attachListeners();
    this.setHeight();
  };

  Row.prototype.attachListeners = function() {
    var that = this;
    $( window ).on( 'scroll', function( e ) {
      if( that.inView( $( this ).scrollTop() ) ) {
        $( this ).on( 'scroll', function( e ) { return false; } );
        that._transition();
      }
    });
    $( window ).on( 'resize', function( e ) {
      that.setHeight();
    });
  };

  Row.prototype.inView = function( px ) {
    return 0 >= app.viewport.getHeight( 'about' ) - ( app.viewport.height + px );
  };

  Row.prototype.setHeight = function() {
    this.$icon.css( 'height', this.$content.innerHeight() + 'px' );
  };

  Row.prototype._transition = function() {
    this.$icon.find( 'h4' ).addClass( 'transition' );
  };

  function init() {
    var $rows = $( '#about > div' );

    Array.prototype.slice.call( $rows ).forEach( function( el ) {
      new Row( el );
    });
  }

  return { init: init }
})( $ );
