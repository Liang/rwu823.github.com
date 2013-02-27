self.log = function ( log ){ console.log( log ); } ;

seajs.config({
  base : 'http://dl.dropbox.com/u/3430677/github/',
  preload : [
    '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'
  ]
}) ;


define(function(require , exports , module ){  

  var QS = require('lib/js/kit').queryString() ;    

  if( /pushtolive\.cgi$/i.test(location.pathname) ) {
    if( QS.multipush ) require.async( './batch' ) ;
    else if ( QS.pu ) require.async( './publish' ) ;
    else if( QS.local ) require.async( './reload' ) ;
  }
  else if (/history\.cgi$/i.test(location.pathname) ) require.async( './history' ) ;
  else if (/cr\.cgi$/i.test(location.pathname) ) require.async( './cr' ) ;
  else if( /editor\.cgi$/i.test(location.pathname) ) require.async( './editor' ) ;
  else if( /grid\.cgi$/i.test(location.pathname) ) require.async( './grid' ) ;

})


