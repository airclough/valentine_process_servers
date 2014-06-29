window.app.coverage = ( function( $, d3 ) {
  var countiesMap = {
    '36087': 'rockland',
    '36119': 'westchester',
    '36071': 'orange',
    '36079': 'putnam',
    '36027': 'dutchess',
    '36105': 'sullivan',
    '36111': 'ulster',
    '36005': 'bronx nyc',
    '36061': 'manhattan nyc',
    '36047': 'brooklyn nyc',
    '36081': 'queens nyc',
    '36085': 'statenIsland nyc',
    '36059': 'longIsland',
    '36103': 'longIsland'
  };

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
        .attr( 'class', 'counties' )
      .selectAll( 'path' )
        .data( topojson.feature( us, us.objects.counties ).features )
      .enter()
        .append( 'path' )
          .attr( 'class', function( d ) { return countiesMap[ d.id ] ? countiesMap[ d.id ] : d.id; } )
          .attr( 'fill', function( d ) { return undefined !== countiesMap[ d.id ] ? '#DF4949' : 'none'; } )
          .attr( 'stroke', function( d ) { return undefined !== countiesMap[ d.id ] ? '#F75151' : 'none'; } )
          .attr( 'stroke-width', '1px' )
          .attr( 'opacity', 0 )
          .attr( 'd', path );

    svg
      .append( 'g' )
        .attr( 'class', 'states' )
      .selectAll( 'path' )
        .data( states.features )
      .enter()
        .append( 'path' )
          .attr( 'class', function( d ) { return d.id; } )
          .attr( 'fill', 'none' )
          .attr( 'stroke', '#4F788F' )
          .attr( 'stroke-width', '1px' )
          .attr( 'd', path );

    initAreas();
  });

  var Area = function( li ) {
    this.$li = $( li );

    this._setCounty();
  };

  Area.prototype._setCounty = function() {
    var name = this.$li.data( 'name' );

    this.$county = $( '#coverage .map .' + name );
  };

  Area.prototype.transition = function() {
    this.$li.addClass( 'transition' );
    this.$county.css( 'opacity', 1 );
  };

  function inView( px ) {
    return 0 >= app.viewport.getHeight( 'coverage' ) - ( app.viewport.height + px );
  }

  function initAreas() {
    var $win = $( window );
    var $lis = $( '#coverage li' );
    var areas = [];

    Array.prototype.slice.call( $lis ).forEach( function( el ) {
      areas.push( new Area( el ) );
    });

    $win.on( 'scroll', function( e ) {
      if( inView( $win.scrollTop() ) ) {
        $win.unbind( 'scroll' );
        areas.forEach( function( area, i ) {
          var to = setTimeout( function() {
            area.transition();
            clearTimeout( to );
          }, i * 250 );
        });
      }
    });
  }
})( $, d3 );
