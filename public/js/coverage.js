window.app.coverage = ( function( $ ) {
  var h = 400;
  var w = $( window ).width();

  var projection = d3.geo.albersUsa();
  projection
    .scale( 1280 )
    .translate( [ w / 2, h / 2 ] );

  var path = d3.geo.path();
  path.projection( projection );

  var svg = d3.select( '#coverage .map' ).append( 'svg' );
  svg
    .attr( 'height', h )
    .attr( 'width', w );

  function init() {
    //
  }

  return { init: init };
})( $ );
