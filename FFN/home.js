define(function(require, exports, module) { 

  var API = require( '/FFN/api' ) ;  
  var UI = require( '/lib/js/ui') ;

  var $search = $('#search') ;
  var $itemGroup = $('#itemGroup') ;
  var $itemGroup_a = $( 'a', $itemGroup ) ;
  var $content = $('#content') ;

  var EventListener = (function(){

    var Cache = {} ;

    function loadContent(e){
      var $this = $(this) ;
      var file = $this.data('content') ;
      var jsAPI = $this.data('api') ;

      $itemGroup_a.removeClass('_on') ;
      $this.addClass('_on') ;
      
      $content.html( UI.$spin ) ;

      if( !Cache[file] ) {
        $.ajax({
          url : 'content/' + file + '.htm' ,
          cache :  false ,
          success : function( htm ) {
            if( jsAPI ) {
              API[jsAPI]( { htm : htm }, function(){
                Cache[file] = $content.html() ;
              } ) ;
            }
          }
        }) ;
      }else{
        $content.html( Cache[file] ) ;
      }
    }

    function search( e ){

      log( $(this).val() ) ;
    }

    function focusSearch( e ){

      if( e.altKey && e.keyCode === 70 ) {

        e.preventDefault() ;

        $search.focus() ;
        
      }

    } 

    function toggleFolder( e ) {
      
      var $this = $(this) ;
      var $parent = $this.parent() ;

      $this[ $this.hasClass('_off') ? 'removeClass' : 'addClass' ]('_off') ;
      $parent[ $this.hasClass('_off') ? 'addClass' : 'removeClass' ]('_off') ;      

    }

    function toggleFolder( e ) {
      
      var $this = $(this) ;
      var $parent = $this.parent() ;

      $this[ $this.hasClass('_off') ? 'removeClass' : 'addClass' ]('_off') ;
      $parent[ $this.hasClass('_off') ? 'addClass' : 'removeClass' ]('_off') ;      

    }

    function init(){

      $(window).on( 'keydown' , focusSearch ) ;

      $search.on( 'keyup' , search ) ;

      $itemGroup
        .on( 'click' , 'b' , toggleFolder )
        .on( 'click' , 'a' , loadContent )  ;

      $('a[data-content="guide-javascript-pattern"]' , $itemGroup).trigger('click') ;
    }

    return { init : init }
  })() ;


  var Home = {    

    init : function(){
      EventListener.init() ;

    }

  }

  Home.init() ;

}) ;