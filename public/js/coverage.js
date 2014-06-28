window.app.coverage = ( function( $ ) {
  var h = 400;
  var w = $( window ).width();

  var projection = d3.geo.albersUsa();
  projection
    .scale( 1 )
    .translate( [ 0, 0 ] );

  var path = d3.geo.path();
  path.projection( projection );

  var svg = d3.select( '#coverage .map' ).append( 'svg' );
  svg
    .attr( 'height', h )
    .attr( 'width', w );

  var counties = [
    36087, 36119, 36071, 36079, 36105, 36111, 36027, 36005, 36061, 36047, 36081, 36059, 36103
  ];

  var countiesMap = {
    'rockland': 36087,
    'westchester': 36119
  };

  d3.json( '/js/us.json', function( err, us ) {
    if( err ) return console.log( 'error loading us.json' );

    var states = topojson.feature( us, us.objects.states );
    var ny = states.features.filter( function( d ) { return d.id === 36; } )[ 0 ];

    var b = path.bounds( ny );
    var s = 0.9 / Math.max( ( b[ 1 ][ 0 ] - b[ 0 ][ 0 ] ) / w, ( b[ 1 ][ 1 ] - b[ 0 ][ 1 ] ) / h );
    var t = [ ( w - s * ( b[ 1 ][ 0 ] + b[ 0 ][ 0 ] ) ) / 2, ( h - s * ( b[ 1 ][ 1 ] + b[ 0 ][ 1 ] ) ) / 2 ];

    projection
      .scale( s )
      .translate( t );

    svg
      .append( 'g' )
      .selectAll( 'path' )
        .data( topojson.feature( us, us.objects.counties ).features )
      .enter()
        .append( 'path' )
          .attr( 'class', function( d ) { return d.id; } )
          .attr( 'fill', function( d ) { return -1 !== counties.indexOf( d.id ) ? '#DF4949' : 'none' } )
          .attr( 'stroke', function( d ) { return -1 !== counties.indexOf( d.id ) ? '#F75151' : 'none' } )
          .attr( 'stroke-width', '1px' )
          .attr( 'd', path );

    svg
      .append( 'g' )
      .selectAll( 'path' )
        .data( states.features )
      .enter()
        .append( 'path' )
          .attr( 'class', function( d ) { if( 36 === d.id ) { console.log( path.centroid( d ) ) }; return d.id; } )
          .attr( 'fill', 'none' )
          .attr( 'stroke', '#4F788F' )
          .attr( 'stroke-width', '1px' )
          .attr( 'd', path );
  });

  function init() {
    //
  }

  return { init: init };
})( $ );
