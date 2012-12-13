
self.log = function( log ) { if( window.console ) console.log( log ) } ;
// self.App = {}

seajs.config({     
  preload : [
    '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js', 
    
    // '//ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js',
    // '//cloud.github.com/downloads/emberjs/ember.js/ember-1.0.0-pre.2.min.js',

    location.hostname === 'localhost' && '//localhost:35729/livereload.js?snipver=2'
  ]
}) ;