define(function(require){

  var Load = {
    codemirror : function( callback ){      
      var base_url = '//rwu823.github.com/lib/js/codemirror' ;

      require.async([
        base_url + '/codemirror.js', 
        base_url + '/codemirror.css',       
        base_url + '/theme/night.css',
        base_url + '/util/dialog.css'
      ], function(){
        require.async([
          base_url + '/mode/javascript.js',
          base_url + '/mode/htmlmixed.js',
          base_url + '/mode/htmlembedded.js',
          base_url + '/mode/xml.js',
          base_url + '/mode/css.js',

          base_url + '/util/dialog.js',
          base_url + '/util/search.js',
          base_url + '/util/searchcursor.js',
          base_url + '/util/match-highlighter.js',
          base_url + '/util/runmode.js'
        ], callback ) ;

      }) 
      
    },

    backbone : function(callback){
      require.async('//documentcloud.github.com/underscore/underscore-min.js', function(){
        require.async('//backbonejs.org/backbone-min.js',function(){
          require.async('//documentcloud.github.com/backbone/examples/backbone-localstorage.js', callback) ;
        }) ;
      }) ;
    }

  }
  
  return Load ;

})