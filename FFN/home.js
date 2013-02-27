self.log = function( log ) { if( window.console ) console.log( log ) } ;
self.App = {}

seajs.config({     

  alias :{
    
  },

  preload : [
    '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
    '//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.js',    
  ],

  debug:true
}) ;

seajs.use(['./app','./event']) ;
