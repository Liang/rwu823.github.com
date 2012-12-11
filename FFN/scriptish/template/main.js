define(function(require , exports , module ){  

  var API = require('ffn/template/api.js') ;    

  require('_lib/codemirror/codemirror-2.21.js') ;

  require.async([
    '_lib/vi.js' ,

    '_lib/zen_editor.js' ,

    'http://codemirror.net/lib/codemirror.css' , 
    'http://codemirror.net/theme/monokai.css' ,
    'http://codemirror.net/lib/util/dialog.css' ,

    'http://codemirror.net/mode/javascript/javascript.js' ,
    'http://codemirror.net/mode/htmlmixed/htmlmixed.js' , 
    'http://codemirror.net/mode/htmlembedded/htmlembedded.js' ,    
    'http://codemirror.net/mode/xml/xml.js' , 
    'http://codemirror.net/mode/css/css.js' , 
    'http://codemirror.net/lib/util/dialog.js' ,
    'http://codemirror.net/lib/util/search.js' ,
    'http://codemirror.net/lib/util/searchcursor.js' ,
    'http://codemirror.net/lib/util/match-highlighter.js' 
  ] , function(){
    TP.init() ;
  } ) ;


  var CM , VI , TP =  module.exports = {

    Timer : {} ,

    saveAndPush : function (){
          
      if( API.Ajaxing.save ) {      

        API.Ajax.save.abort() ;

        VI.msgShow({bg : '#fcc' , txt:'Abort...'}) ;

        API.Ajaxing.save = 0 ;

        clearTimeout( TP.Timer.save_and_push ) ;
        TP.Timer.save_and_push = setTimeout( TP.saveAndPush , 700 ) ;
        
        return ;
      }

      VI.msgShow({bg : '#ffc' , txt: 'Save to sandbox...'}) ;

      API.save({
        data : CM.getValue() 
      } , function (respon){      
        VI.msgShow({bg : '#cfc' , txt:'Pubshing to sandbox...'}) ;      
        API.push({} , function (){
          VI.msgHide() ;
        }) ;

      })
    } ,

    setPerfOff : function (){
      if( !/debug_cookie_perf_off%3D1/.test( escape(document.cookie) ) ) {
        document.cookie = 'debug_cookie_perf_off=1;domain=friendfinderinc.com;path=/' ;            
      }          
    } ,

    setCodeMirror : function (){
      var tpl_name = $.getURL('keyword') ;
      
      CM = CodeMirror.fromTextArea( TP.$advedit[0] , {
        mode : (function(){                
          if( /^(javascript-)/.test( tpl_name ) ) return 'text/javascript' ;          
          if( /^(css-)/.test( tpl_name ) ) return 'text/css' ;
          
          return 'application/x-ejs' ;
        })() ,
        lineNumbers : true ,        
        matchBrackets : true ,
        theme : 'monokai' ,

        onKeyEvent: function() {
          return zen_editor.handleKeyEvent.apply(  zen_editor, arguments );
        }   ,

        onCursorActivity: function() {
          CM.matchHighlight("matchhighlight");

        }        
      });   
    } ,

    hotString : function ( e ){

      if( e.keyCode === 13 ){ //Enter        
        
        var _vi = VI.get() ;
        
        switch( _vi.key ) {
        
          case ':vi' :
            if( /\S/.test( _vi.value ) ){
              _vi.value = _vi.value.split(' ') ;
              for( var i = 0 , l = _vi.value.length ; i < l ; ++i ){
                if( _vi.value[i] ) open( location.href.split('?')[0] + '?action=Load local&site=' + API.QS.site + '&lang=' + API.QS.lang + '&keyword=' + _vi.value[i] ) ; 
              }
            }else{
              alert('Enter template name') ;
            }
          break ;
          
          case ':grid' :
            if( /\S/.test(_vi.value) ) {            
              _vi.value = _vi.value.split(' ') ;
              for( var i = 0 , l = _vi.value.length ; i < l ; ++i ){          
                open( location.href.replace( 'editor.cgi' , 'grid.cgi' ).split('?')[0] + '?keyword=' + _vi.value[i] ) ;
              }            
            }else{
              open( location.href.replace( 'editor.cgi' , 'grid.cgi' ) ) ; 
            }
          break ;

          case ':site' :
            if( /^(bc|bdsm|cff|dammo|ff|ffadult|ffall|ffc|ffd|ffe|fff|ffgay|ffi|ffitaly|ffj|ffk|ffp|ffsenior|ffz|getiton|mm|out|ss)$/.test( _vi.value ) ){
              if( _vi.value === qs_site ) {
                alert( 'On the "' + _vi.value + '" now !!' ) ;
              }else{
                VI.$msg.fadeIn() ;
                VI.$msg.text( 'Change site to ' + _vi.value ) ;            
                location.href = location.href.split('?')[0] + '?action=Load local&site=' + _vi.value + '&lang=' + API.QS.lang + '&keyword=' + API.QS.keyword ;              
              }
            }else{
              alert( '"' + _vi.value + '" is wrong site name!!' ) ;
              VI.$in.val(':site ') ;
            }
          break ;

          case ':commit' : ajax_btn('commit') ; break ;
          case ':clear' : ajax_btn('clear') ; break ;
          
          case ':pu' : open( location.href.replace( 'editor.cgi' , 'pushtolive.cgi' ) + '&pu=' + _vi.value  ) ; break ;
          
          case ':text' : open( location.href.split('?')[0].replace( 'editor.cgi' , 'deftags.cgi' ) + '?page=edit_deftag_rows&defnames=' + _vi.value  ) ; break ;
          case ':patt' : 
            if( _vi.value ) {
              open( location.href.split('?')[0].replace( 'editor.cgi' , 'deftags.cgi' ) + '?action_find_by_text=by+text&pattern=' + _vi.value  ) ; 
            }else {          
              VI.$in.val(':patt ^$') ;                        
              VI.$in[0].selectionStart = VI.$in[0].selectionEnd = VI.$in.val().length - 1 ;
            }
          break ;
          case ':search' : open( location.href.split('?')[0].replace( 'editor.cgi' , 'search.cgi' ) + '?action=query&search_sites=' + qs_site + '&text_string=' + _vi.value  ) ; break ;        
          
          case ':go' : $('div.CodeMirror-scroll').scrollTop( (parseInt( _vi.value , 10 ) -1) * 19 + 6 ) ; break ;
          
          default :
            alert('Command is wrong') ;
            VI.$in.val(':') ;
        }
        
       
      };      
    } ,

    init : function( ){

      VI = $.vi() ;

      TP.$advedit = $('#advedit') ;

      TP.setPerfOff() ;
      TP.setCodeMirror() ;

      $.$head.append( 
        '<style>' +
          'center > table:first-child { display:none; }' +
          '#tmpl_name { color:blue;font: 700 16px/1 "consolas";text-align:center;background:none;border:0; }' +
          
          '.CodeMirror { width:1400px;height:800px;font:300 15px/1.2 consolas !important; }' +
          '.CodeMirror > .CodeMirror-scroll { height:100%;overflow:auto; }' +      
          '.CodeMirror .cm-s-monokai span.CodeMirror-selected { background:#666 !important; }' +
          '.cm-s-monokai { color:#ccc !important; }' +
          '.cm-s-monokai .CodeMirror-gutter-text { color:#666 !important;cursor:pointer; }' +
          '.cm-s-monokai .matchhighlight { background:#496B49; } ' +
          '.cm-s-monokai .matchline { background:#003; } ' +
          '.CodeMirror .CodeMirror-gutter-text > pre._on , ' +
          '.CodeMirror .CodeMirror-gutter-text > pre:hover { background:#ffc; } ' +
        '</style>' 
      ) ;

      $.$win.on ( {

        keydown : require('e_hotkey')  ,

        focus : function (e ){
          CM.focus() ;
        }
      }) ;

      VI.$in.on( 'keydown' , TP.hotString ) ;

    }
  }  

}) ;
