
function log( log ){ console.log( log ) } ;

var fs = require('fs') ;
var io = require( 'socket.io').listen(777);
var Ip = require( './ip' ).Ips ;

var online_lists = [] ;
var historys = [] ;

debugger;

io.sockets.on('connection', function (Socket) {
  // dev
  var url = Socket.handshake.headers.referer ;
  var querystring = url.split('?')[1] || '' ;

try{

  var fake_ip = querystring.match( /fake_ip=[^&]+/ )[0].split('fake_ip=')[1] ;
}catch(e){
  
}

  //      

  var client_ip = fake_ip || Socket.handshake.address.address ;
  var get_ip_user = Ip[client_ip] ;

  function ipIndex(){
    var index ;
    for( var i = 0 ; i < online_lists.length ; ++i ) {
      if( online_lists[i].ip === client_ip ) {
        index = i ;
        break ;
      }
    }
    return index ;
  }

  // io.sockets.emit('join', get_ip_user ) ;
    
  fs.readFile('historys.json', 'UTF-8', function(err, data){
    io.sockets.emit('start', { 
      ip_self : client_ip,
      historys : JSON.parse(data)
    }) ;        
  })

  if( ipIndex() === undefined ){
    online_lists.push({ip : client_ip, name : get_ip_user || null }) ;
    io.sockets.emit('online', online_lists ) ;
  } 

  Socket
    .on('chat', function( obj ){

      var D = new Date() ;

      function add0(time){
        time = Number(time) ;
        return time < 10 ? ('0' + time ) : time
      }

      obj.ip_sender = client_ip ;
      obj.time = add0(D.getHours()) + ':' + add0(D.getMinutes()) + ':' + add0(D.getSeconds()) ;      
      obj.name = get_ip_user ;

      historys.push( obj )
      fs.writeFile('historys.json', JSON.stringify(historys) ) ;

      io.sockets.emit('chat', obj ) ;
    })
    .on('disconnect',function(){

      online_lists.splice( ipIndex(), 1 ) ;

      io.sockets.emit('online', online_lists ) ;            
      // io.sockets.emit('leave', get_ip_user  ) ;
    }) ;
});

console.log( 'socket server run success!!' );