window.app.services = ( function( $ ) {
  var controller;

  var content = {
    init: function() {
      this.$el = $( '#services .content' );
      this.h = this.$el.height();

      this._cacheSelectors()
        ._attachListeners();
    },

    _cacheSelectors: function() {
      var that = this;
      var $lis = that.$el.find( 'li' );

      that.selectors = {};

      Array.prototype.slice.call( $lis ).forEach( function( el ) {
        var $el = $( el );

        that.selectors[ '$' + $el.data( 'service' ) ] = $el;
      });

      return that;
    },

    _attachListeners: function() {
      var that = this;

      for( var prop in that.selectors ) {
        ( function( prop ) {
          that.selectors[ prop ].on( 'click', function( e ) {
            controller.pause( prop );
          });
        })( prop );
      }
    },

    toggleClass: function( el, bool ) {
      this.selectors[ '$' + el ].toggleClass( 'active', bool );
    }
  };

  var info = {
    init: function( h ) {
      this.$el = $( '#services .info' );

      this.setHeight( h );
    },

    setHeight: function( h ) {
      this.$el.height( h + 'px' );
    }
  };

  var Service = function( el, i ) {
    this.$el = $( el );
    this.i = i;
  };

  Service.prototype.activate = function() {
    var that = this;
    var to = setTimeout( function() {
      that.$el.addClass( 'active' );
      content.toggleClass( that.$el.data( 'service' ), true );
      clearTimeout( to );
    }, 1000 );
  };

  Service.prototype.deactivate = function() {
    this.$el.removeClass( 'active' );
    content.toggleClass( this.$el.data( 'service' ), false );
  };

  var Controller = function( services ) {
    this.services = services;
    this.l = services.length;
    this.i = 0;
  };

  Controller.prototype.slide = function() {
    var that = this;
    that.to = setTimeout( function() {
      that.services[ that.i ].deactivate();
      if( ++that.i === that.l ) that.i = 0;
      that.services[ that.i ].activate();
      clearTimeout( that.to );
      that.slide();
    }, 5000 );
  };

  Controller.prototype.pause = function( id ) {
    var that = this;

    if( that.to ) {
      clearTimeout( that.to );
      that.to = null;
    }

    that.services[ that.i ].deactivate();
    that.services.forEach( function( service, i ) {
      if( id === '$' + service.$el.data( 'service' ) ) {
        that.i = i;
        service.activate();
      }
    });
  };

  function init() {
    content.init();
    info.init( content.h );

    var $serviceElems = $( '.service' );
    var services = [];

    Array.prototype.slice.call( $serviceElems ).forEach( function( el, i ) {
      services.push( new Service( el, i ) );
    });

    controller = new Controller( services );
    controller.slide();
  }

  return { init: init };
})( $ );
