
function log( log ) { if( window.console ) console.log( log ) } ;

seajs.config({
  base : './lib/',
  
  preload : [
    'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.min.js', 
    location.hostname === 'localhost' && '//localhost:35729/livereload.js?snipver=2'
  ]
}) ;