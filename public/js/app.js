window.app = ( function() {
  var app = {
    init: function() {
      this.viewport.init();
      this.about.init();
      this.services.init();
      this.contact.init();
    }
  };

  return app;
})();
