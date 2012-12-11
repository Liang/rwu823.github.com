define(function(require, exports, module) {  

  var Load = require( '/lib/js/load' ) ;

  var $content = $('#content') ;

  var API = module.exports = {  

    Ajax :  {},
    Res : {},

    guide : function( opt, callback ){

      var set = $.extend( true , {
        htm : '' ,
        res_name : null 
      } , opt )

      Load.codeMirror( function(){

        $content.html( set.htm ) ;

        $('div.run_code' , $content ).each(function(){

          var $this = $(this) ;
          var el_pre = $('>pre' , $this )[0] ;

          var _code = $('>textarea' , $this ).val().replace(/^      /gm , '') ;
          var _type = $this.data('type') ;

          CodeMirror.runMode( _code, _type, el_pre ) ;
        }) ;

        $.isFunction( callback ) && callback() ;

      } ) ;

    },

    init : function(){      


    }

  }

  API.init() ;

}) ;