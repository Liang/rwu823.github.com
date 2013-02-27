define(function(require){


  require('jq') ;
  require('handlebars') ;

  require( '//10.10.4.43:777/socket.io/socket.io.js') ;

  var Socket = io.connect('//10.10.4.43:777');

  var $input = $('#input') ;
  var $output = $('#output') ;

  var $load = {} ;
  var Tpl = {} ;

  var HandlebarListener = (function(){
    Handlebars.registerHelper('htmMsg', function( msg ) {
      msg = msg
            .replace(/</g, '&lt;')            
            .replace(/\n/g, '<br/>')
            .replace( /http(s|):\/\/.+\.(jp(e|)g|png|gif)/ig, function( src ){
              return '<img style="width:400px" src="' + src + '" />' ;
            } ) ;            
      return new Handlebars.SafeString( msg ) ;
    })

    function init(){
      $load.online = $('#load-online') ;
      Tpl.online = Handlebars.compile( $('#tpl-online').html() ) ;      
      Tpl.chat = Handlebars.compile( $('#tpl-chat').html() ) ;      
    }

    return { init : init } ;
  })() ;

  var SocketListener = (function(){

    function start( json ){
      log( json )
      $input.attr('data-ip_self', json.ip_self ) ;

      $output.html( Tpl.chat(  json ) )
    }

    function chat( json ){

      json.self = json.ip_sender === $input.data('ip_self') ? 1 : 0 ;

      log( json ) ;

      $output
        .append( Tpl.chat(  json ) )
        .scrollTop($output[0].scrollHeight)
    }

    function online( json ){
      
      json =  { onlines : json }
      $load.online.html( Tpl.online( json ) ) 
      
    }

    function init (){
      Socket        
        .on('start', start)
        .on('chat', chat)
        .on('online', online)
    }

    return { init : init }

  })() ;

  var EventListener = (function(){

    function inputEnter(e){
      if( !e.shiftKey && e.which === 13 ) {
        e.preventDefault() ;
        Socket.emit( 'chat', { msg : $input.val(), ip_sender : $input.data('ip_self') } ) ;
        $input.val('').select() ;
      }

    }

    function init(){

      $input.on('keydown', inputEnter ) ;
    }    

    return { init : init }
  })()

  var Main = {


    init : function(){

      setTimeout(function(){
        $input.select() ;
      }, 50 ) ;

      SocketListener.init() ;
      HandlebarListener.init() ;
      EventListener.init() ;
    }
  }




  Main.init() ;
  
})