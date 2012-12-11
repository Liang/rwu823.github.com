define(function(require, exports, module){


  module.exports = {

    codemirror : function( callback ){      

      require.async('//dl.dropbox.com/u/3430677/scriptish/_lib/codemirror/codemirror-2.21.js' , function(){        

        require.async([
          '//codemirror.net/lib/codemirror.css' , 
          '//codemirror.net/theme/monokai.css' ,
          '//codemirror.net/lib/util/dialog.css' ,

          '//codemirror.net/mode/javascript/javascript.js' ,
          '//codemirror.net/mode/htmlmixed/htmlmixed.js' , 
          '//codemirror.net/mode/htmlembedded/htmlembedded.js' ,    
          '//codemirror.net/mode/xml/xml.js' , 
          '//codemirror.net/mode/css/css.js' , 
          '//codemirror.net/lib/util/dialog.js' ,
          '//codemirror.net/lib/util/search.js' ,
          '//codemirror.net/lib/util/searchcursor.js' ,
          '//codemirror.net/lib/util/match-highlighter.js' ,
          '//codemirror.net/lib/util/runmode.js'
        ] , callback ) ;

      }) 

      

    }


  }


})