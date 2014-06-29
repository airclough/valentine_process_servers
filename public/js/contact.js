window.app.contact = ( function( $ ) {
  var contactForm = {
    init: function() {
      this.$form = $( '#contact form' );
      this.$submit = $( '#contact form .submit' );

      this
        ._cacheSelectors()
        ._attachListeners();
    },

    _cacheSelectors: function() {
      this.formSelectors = {
        $name : this.$form.find( '#name' ),
        $firm : this.$form.find( '#firm' ),
        $msg  : this.$form.find( '#msg' ),
        $email: this.$form.find( '#email' ),
        $phone: this.$form.find( '#phone' )
      };

      return this;
    },

    _attachListeners: function() {
      var that = this;
      that.$submit.on( 'click', function( e ) {
        that.$submit.unbind( 'click' );
        that._onClick();
      });
    },

    _onClick: function() {
      if( this._validate() ) {
        this.$submit.toggleClass( 'faded', true );
        this.$submit.html( '<span class="icon-spinner rotate"></span>' );

        var that = this;
        var req = $.ajax({
          type       : 'POST',
          url        : '/contact',
          contentType: 'application/json',
          data       : JSON.stringify( that.formData ),
          dataType   : 'json'
        });

        req.done( function( data ) {
          that._renderThanks( data );
        });

        req.fail( function( jqXHR, textStatus ) {
          console.log( textStatus );
        });

        req.always( function() {
          that.$submit.toggleClass( 'faded', false );
          that.$submit.html( 'submit' );
        });
      } else {
        this._attachListeners();
      }
    },

    _validate: function() {
      this.formData = {};

      var emptyString = new RegExp( '^$' );
      var email = new RegExp( '^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$' );

      for( var prop in this.formSelectors ) {
        switch( prop ) {
          case '$name':
          case '$msg':
            if( emptyString.test( this.formSelectors[ prop ].val() ) ) {
              this._displayError( prop, true );
              return false;
            }
            break;
          case '$email':
            if( !email.test( this.formSelectors[ prop ].val() ) ) {
              this._displayError( prop, true );
              return false;
            }
            break;
        }

        this._displayError( prop, false );
        this.formData[ this.formSelectors[ prop ].attr( 'name' ) ] = this.formSelectors[ prop ].val();
      }

      return true;
    },

    _displayError: function( el, bool ) {
      this.formSelectors[ el ].toggleClass( 'error', bool );
    },

    _renderThanks: function( data ) {
      console.log( data );
    }
  };

  function init() {
    contactForm.init();
  }

  return { init: init };
})( $ );
