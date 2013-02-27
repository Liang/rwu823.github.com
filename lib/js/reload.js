define(function(require){
  
  return function(port){
    port = port || 80 ;
        
    require.async('http://localhost:' + port + '/socket.io/socket.io.js', function(){

      var Socket = io.connect('http://localhost:' + port);
      
      Socket.on('reload', function(){
        location.reload() ;
      })
    });    
    
  } 
})
