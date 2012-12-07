define(function(require, exports, module) {  


  var API = require( 'js/api' ) ;
  
  var Home = module.exports = {

    focusSearch : function( e ){            

      if( e.altKey && e.keyCode === 70 ) {

        e.preventDefault() ;

        Home.$search.focus() ;
        
      }

    } ,

    search : function( e ){

      log( $(this).val() ) ;
    } ,

    toggleFolder : function( e ) {
      
      var $this = $(this) ;
      var $parent = $this.parent() ;

      $this[ $this.hasClass('_off') ? 'removeClass' : 'addClass' ]('_off') ;
      $parent[ $this.hasClass('_off') ? 'addClass' : 'removeClass' ]('_off') ;      

    } ,    

    loadContent : function(e){
      var $this = $(this) ;
      var fileName = $this.data('content') ;

      var jsAPI = $this.data('api') ;

      Home.$itemGroup_a.removeClass('_on') ;
      $this.addClass('_on') ;
      
      Home.$content.html( API.spin ) ;
      
      if( !API.Ajax[fileName] ){

        API.Ajax[fileName] = $.ajax({
          url : 'content/' + fileName + '.htm' ,
          cache :  false ,
          success : function( res ) {
            
            if( jsAPI ) API[jsAPI]( { html : res , res_name :fileName } ) ;            
          }
        }) ;

      }else{
        Home.$content.html( API.Res[fileName] ) ;
      }

    } ,

    init : function(){      

      Home.$search = $('#search') ;
      Home.$itemGroup = $('#itemGroup') ;
      Home.$itemGroup_a = $( 'a' , Home.$itemGroup ) ;
      Home.$content = $('#content') ;


      $(window).on( 'keydown' , Home.focusSearch ) ;

      Home.$search.on( 'keyup' , Home.search ) ;
      Home.$itemGroup.on( 'click' , 'b' , Home.toggleFolder ) ;
      Home.$itemGroup.on( 'click' , 'a' , Home.loadContent )  ;

      $('a[data-content="guide-javascript-pattern"]' , Home.$itemGroup).trigger('click') ;

    }

  }

  Home.init() ;

}) ;