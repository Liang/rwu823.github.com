define(function(require , exports , module ){  

  Function.prototype.toHTML = function(){
    var htm = this.toString() ;
    return htm.substring( htm.indexOf('>>>') + 3, htm.lastIndexOf('<<<') )
  }

  
  String.prototype.toObject = function( opt ){
    var set = $.extend({
      split : '&' ,
      eq : '='
    },opt) ;
    
    var O = {} ;    
    var q = this.split( set.split ) ;

    for( var i = 0 , l = q.length  ; i < l ; ++i ) {
      if( q[i] ){	  
        var key = q[i].match( /^[^=]+/ )[0] ;
        var value = q[i].split( key + '=' )[1] ;
        
        O[key] = unescape(value) ;
      }	            
    }
    
   return O ;
  } ;

  Math.getRandom  = function( opt ){
    var set = $.extend({
      min : 0 ,
      max : 10
    },opt ) ;
    return Math.floor( Math.random() * ( set.max - set.min + 1 ) + set.min ) ;
  } ;
 

  return {

    queryString : function(){
      var qs = location.href.split('?')[1] ;
      
      if( qs ) return qs.toObject() ;
      
    }

  }
  
}) ;


// ;(function($){

  
//   $.extend({
  
//     $win : $(window) ,
//     $doc : $(document) ,
//     $body : $('body') ,
//     $head : $('head') ,
    
//     log : function( log ){
//       if( window.console ) console.log( '%o' , log ) ;
//     } ,
    
//     QueryString : function(){
//       var qs = location.href.split('?')[1] ;
      
//       if( qs ) return qs.toObject() ;
      
//     } ,
    
//     Cookie : function(){      
            
//       return{
//         get : document.cookie.toObject( { split: '; ' } ) ,
//         set : function( opt ){
//           var set = $.extend({
//             key : '' ,
//             value : '' ,
//             path : '' ,
//             expires : '' 
//           }, opt ) ;
          
//           document.cookie = set.key + '=' + set.value + ';expires=' + set.expires + ';path=' + set.path
//         }
//       }
    
//     } ,
    
    
//     query : function ( txt , split , equal , key ){
//       txt = txt.split(split) ;

//       for(var i = 0 , l = txt.length ,s ; i < l ; ++i  ){
//         s = txt[i].split(equal) ;
//         if( s[0] == key ) return s[1] ;
//       }
//       return null ;    
//     } ,
    
//     setCookie : function( name , val , expire  ){
//       var D ;
//       if( expire ){
//         D = new Date();
//         if( /D/.test(expire) )  D.setDate ( D.getDate() + parseInt(expire,10) ) ;
//         else if( /h/.test(expire) ) D.setHours( D.getHours() + parseInt(expire,10) ) ;
//         else if( /m/.test(expire) ) D.setMinutes( D.getMinutes() + parseInt(expire,10) ) ;

//         D = ';expires=' + D ;
//       }else{
//         D = ''
//       }

//       document.cookie = escape(name) + '=' + escape(val) + D ;    
//     } ,
    
//     getCookie : function( name ){
//       return $.query( unescape(document.cookie) , '; ' , '=' , name ) ;
//     } ,
    
//     getURL : function( param ){    
//       var url , len ;
//       if( typeof param === 'number' ){
//         url = location.pathname.split('/') ,
//         len = url.length ;

//         if(param === 0 ){
//           return url[len-1] ;
//         }else{
//           return param === 1 ?  url[len - 1].split('.')[0] : url[len - param ] ;
//         }
//       }else{
//         url = decodeURI(location.href).split('?')[1] ;
//         if( url ){
//           return $.query( url , '&' , '=' , param )  ;
//         }else {
//           return null ;
//         }
//       }
//     } 
    
    
//   });


// })(jQuery) ;
  
  



