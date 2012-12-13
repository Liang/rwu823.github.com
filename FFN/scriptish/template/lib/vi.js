// define({

//   $body : $('body') ,

//   $div : $('div' , this.$body )
// })


;(function($){

  $.vi = function ( opt ) {
    var set = $.extend({
      background : '#ffc' 
    } , opt ) ;

    var $msg = $('<div style="display:none;width:100%;position:fixed;top:0;left:0;font:700 12px/1 consolas;z-index:999999;text-align:center;background:'+ set.background +';padding:8px 0;box-shadow:1px 1px 10px #666;"></div>') ;      
    var $in = $('<input style="display:none;width:100%;position:fixed;bottom:0;left:0;font:12px/1 consolas;z-index:999999;padding:4px;" />') ;    
    
    var on = 0 ;
                      
    function get( ){
    
      var _v = $in.val() ;                
      var _k = _v ? /^:\S*/.exec( _v )[0] : null ;
      
      return {        
        key : _k ,          
        value : _v.split( _k + ' ' )[1] ,
        on : on 
      }

    }

    function msgShow( opt ){
      var set = $.extend({
        bg : '#ffc' ,
        txt : ''
      } , opt ) ;

      $msg.fadeIn().css('background' , set.bg ).text( set.txt ) ;
    } ;

    function msgHide(){
      $msg.fadeOut() ;
    } ;

    $('body').append( $msg , $in ) ;
    
    $(window).keyup(function(e){
      if ( e.keyCode === 27 ){ //Esc
        if( on ){
          $in.hide() ;
          return on = 0 ;
        }else{
          $in.show().focus().val(':') ;          
          return on = 1 ;
        }
      }  
    }) ;      
    
    return {      
      $msg : $msg ,
      $in : $in ,
      get : get ,
      msgShow : msgShow ,
      msgHide : msgHide
    }

  }

})(jQuery) ;