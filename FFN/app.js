define(function( require ){  

  var Api = require('./api') 
  ,   Load = require('/lib/js/load')
  ,   UI = require('ui')
  ,   $o = require('./jq-dom')  

  require('$.fn.scroller')

  var App = angular.module('LoadHtm', []) ;
  var $spin = UI.$spin.clone() ;

  App.controller('C', C)

  function watchLoc(path){
    
    var file = path.match(/([^/]+)/) && RegExp.$1 ;
    var is_guide = /^guide-/i.test(file) ;         

    if( path ){

      App.$scope.htm = '' ;

      if( Api.Res.Content && Api.Res.Content[file] ) {
        App.$scope.htm = Api.Res.Content[file] ;  

        // $o.content_htm.hide().fadeIn() ; 

        setTimeout(function(){

          $o.content.scroller() ;        
        }, 50 )
      }else{                    

        $o.content.append( $spin )

        Api.content( file, function(htm){

          App.$scope.$apply( function(){
            App.$scope.htm = htm ;

          })                        

          if( is_guide ){

            $o.content_htm.hide() ;
            Load.codemirror( {runmode : true}, function(){
              $('#content_htm div.run_code' ).each(function(){

                var $this = $(this) ;
                var el_pre = $('>pre' , $this )[0] ;

                var _code = $('>textarea' , $this ).val().replace(/^      /gm , '') ;
                var _type = $this.data('type') ;

                CodeMirror.runMode( _code, _type, el_pre ) ;
              }) ;

              Api.Res.Content[file] = $o.content_htm.html() ;
              $o.content_htm.fadeIn() ;
              $o.content.scroller() ;
              $spin.remove() ;

            })

          }
        })          
      } 

      $o.itemGroup_a
        .removeClass('_on')
        .filter(function(){
          var href = $(this).attr('href') ;
          if( href && href.indexOf(file) >= 0 ) return $(this)  ;
        })
        .addClass('_on') 

    } // if (path)

  }

  function C( $scope, $location ){
    App.$scope = $scope ;

    $scope.htm  ;
    $scope.spin ;

    $scope.loc = $location ;

    $scope.$watch( 'loc.path()', watchLoc ) 
  }

    
})
