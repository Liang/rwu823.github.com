define(function(require, exports, module) {  

  var Load = require( 'js/load' ) ;

  var $content = $('#content') ;

  var API = module.exports = {

    spin : '<img class="ajaxLoading" src="./lib/img/ajax-loading.gif" />' ,

    Ajax :  {} ,    
    Res : {} ,

    guide : function( opt ){

      var set = $.extend( true , {
        html : '' ,
        res_name : null 
      } , opt )
      
      Load.codeMirror( function(){

        $content.html( set.html ) ;

        $('div.run_code' , $content ).each(function(){

          var $this = $(this) ;
          var el_pre = $('>pre' , $this )[0] ;

          var _code = $('>textarea' , $this ).val().replace(/^      /gm , '') ;
          var _type = $this.data('type') ;

          CodeMirror.runMode(  _code , _type , el_pre ) ;
        }) ;

        // save run codemirror done html
        API.Res[set.res_name] = $content.html( ) ;

      } ) ;
      
    }  ,

    init : function(){      


    }

  }

  API.init() ;

}) ;