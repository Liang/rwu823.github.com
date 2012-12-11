define(function(require , exports , module ){  
  
  var oo = require('_lib/oo.js') ;
  var QS = oo.QueryString() ;

  var API = module.exports = {

    Ajax : {} ,
    Respon : {} ,
    Ajaxing : {} ,

    commit : function (){
      
    } ,

    push : function ( data , callback ){
      var _data = $.extend( true ,{
        
      } , data ) ;

      API.Ajaxing.push = 1 ;
      API.Ajax.push = $.ajax({
        type : 'GET' ,
        url : 'pushtolive.cgi?version=devel&'+ QS.site +'-'+ QS.lang +'=1&local=1&submit=1&keyword=' + QS.keyword  + '&compiled=-1' ,      
        success : function ( respon ){
          API.Respon.push = respon ;
          API.Ajaxing.push = 0 ;
          if( $.isFunction( callback ) ) callback( respon ) ;
        }
      })
    } ,

    save : function ( data , callback ){
      var _data = $.extend( true , {
        action : 'Save local' ,
        site : QS.site ,
        lang : QS.lang ,
        keyword : QS.keyword ,
        root : 1         
      } , data ) ;

      API.Ajaxing.save = 1 ;
      API.Ajax.save = $.ajax({
        data : _data ,
        success : function ( respon ){
          API.Respon.save = respon ;
          API.Ajaxing.save = 0 ;
          if( $.isFunction( callback ) ) callback( respon ) ;
        }
      })
    } ,

    init : function (){      

      $.ajaxSetup({
        url : 'editor.cgi' ,
        type : 'POST' 
      })

    }
  }

  API.init() ;

}) ;