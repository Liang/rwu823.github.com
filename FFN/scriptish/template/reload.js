define(function(require){  

  require('http://localhost:21321/socket.io/socket.io.js') ;
  var QS = require('lib/js/kit').queryString() 
    , Api = require('./api')

  var Socket = io.connect('http://localhost:21321');

  Socket.on('push', function(o){
    console.log( 'client push' );

    
    var site_lang = o.file.match( /[^-]+-\w+$/)[0]
    var keyword = o.file.split('-'+site_lang )[0]

    Api.pushSandbox({
      keyword : keyword,
      site : site_lang.split('-')[0],
      lang : site_lang.split('-')[1]
    },function(){
      Socket.emit('pushed') ;
    })    
  })
  

})