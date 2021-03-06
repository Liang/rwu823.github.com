define(function(require , exports , module ){  
  
  var Mockup = require('./mockup')
    , Api = require('./api')
    , Kit = require('lib/js/kit')
    , Load = require('lib/js/load')
    , Spin = require('./spin') ;

  var QS = Kit.queryString() ;

  var $advedit = $('#advedit') ;
  var $form = $('#editor') ;
  var $center = $('body > center') ;

  var has_rd = $( '> font:first-child', $form ).length ;
  var $status = $( has_rd ? '> p > b:first-child' : '> b:first-child', $form ) ;
  var isDB = /^DB/i.test( $status.text() ) ;
  var CM , Timer = {} ;
  var title = document.title = QS.keyword + '-' + QS.site + '-' + QS.lang ;

  var url = decodeURIComponent(location.href) ;

  var $command, $command_in, $tip = {}, $cm ;

  // var $nav_wrap = (function(){
  //   var skip = 0 ;

  //   var $table_find = $('>table:first-child', $center) ;  
  //   var $wrap = $form.contents().filter(function(){
  //     if( this.id === 'advedit') skip = 1
  //     return !skip
  //   }).wrapAll('<div id="nav_wrap" />') ;

  //   return $table_find.add($wrap) ;
  // })() ;

  // log( $nav_wrap ) ;

  var EventListener = (function(){          

    var ctrl_alt_c = 0 ;

    function hotkey(e){
      // log(e.which)

      var Key = {

        Ctrl : {
          '83' : function(lang){ // S
            lang = lang || QS.lang ;
            if( isDB ){
              alert("DB EDIT can't to save Local") ;
            }else{
              Spin.close() ;
              setTimeout(function(){
                Spin.open({ txt : 'Save Local', color:'#37F14A' }) ;              
              },100 )
              if( Api.Ajax.Save )Api.Ajax.Save.abort() ;
              Api.save( { code : CM.getValue() }, function(htm){ 
                Spin.open({ txt : 'Push to : ' + lang , color:'#37F14A' }) ;
                Api.pushSandbox({lang:lang},function(){
                  document.title = title ;       
                  Spin.close() ;
                }) 
              }) 
            }
          }

          
        },

        Alt : {
          '71' : function(){ // G Grid
            open( location.href.replace( 'editor.cgi' , 'grid.cgi' ) ) ;  
          },

          '72' : function(){ // H History
            open( location.href.replace( 'editor.cgi' , 'history.cgi' ) ) ; 
          },

          '66' : function(){ // B Batch publish
            open( 'pushtolive.cgi?multipush=1&site=' + QS.site ) ;
          },

          '90' : function(){ // Z Toogle DB/Local
            location.href = isDB ?  url + '&action=Load local' : url.replace(/(&|)action=Load local(&|)/, '') ;
          },

          '77' : function(){ // M main.cgi
            open( 'main.cgi' ) ;
          },

          '80' : function(){ // P Publish sandbox
            open('pushtolive.cgi?version=devel&'+ QS.site +'-'+ QS.lang +'=1&local=1&submit=1&keyword=' + QS.keyword  + '&compiled=-1')
          }

        },

        'Ctrl+Alt' : {
          '67' : function(){ // C Copy template name  
            $command.show() ;
            $command_in.val(document.title).select();

            $command_in[0].selectionStart = 0;

            if( ctrl_alt_c ){
              $command_in[0].selectionEnd = document.title.length;
              ctrl_alt_c = 0;
            }else{              
              $command_in[0].selectionEnd = QS.keyword.length;
              ctrl_alt_c = 1;
            }

          }
        },

        'Ctrl+Shift' : {
          '80' : function(){ // P            
            if( $command.is(':hidden') ){
              $command.show() ;
              $command_in.select() ;              
            }else{
              // $command.hide() ;
              $command_in.focus() ;
            }            
          },
          '83' : function(){ // S
            Key.Ctrl['83']('all') ;
          }
        },

        Fn : {
    
          '112': function(){ // F1            
            $tip.f1[$tip.f1.hasClass('_off') ? 'removeClass' : 'addClass']('_off') ;

            $tip.f2.addClass('_off') ;
          },

          '113' : function(){ //F2
            $tip.f2[$tip.f2.hasClass('_off') ? 'removeClass' : 'addClass']('_off') ;

            $tip.f1.addClass('_off') ;
          },
          
          '122' : function(){ //F11            
            $cm[$cm.hasClass('_f11') ? 'removeClass' : 'addClass']('_f11') ;
          }
          
        }

      }   
      
      if( e.ctrlKey && e.shiftKey && Key['Ctrl+Shift'][e.which] ){
        e.preventDefault() ;
        e.stopPropagation();
        Key['Ctrl+Shift'][e.which]() ;
      }else if( e.ctrlKey && e.altKey && Key['Ctrl+Alt'][e.which] ){
        e.preventDefault() ;
        e.stopPropagation();
        Key['Ctrl+Alt'][e.which]() ;
      }else if( e.ctrlKey && Key.Ctrl[e.which] ) {
        e.preventDefault() ;
        e.stopPropagation();
        Key.Ctrl[e.which]() ;
      }else if( e.altKey && Key.Alt[e.which] ){
        e.preventDefault() ;
        e.stopPropagation();
        Key.Alt[e.which]()
      }else if( Key.Fn[e.which] ){
        e.preventDefault() ;
        e.stopPropagation();
        Key.Fn[e.which]()
      }
      
    }

    function hotString(e){
      
      var value =  this.value
        , re_chk_param = /-\w+\s+\w+/g ;

      if( e.which === 13 && value) { //enter    

        e.preventDefault() ;   

        var Map = {
          vi : function(){

            // var url = location.href ;

            // if( target.match( re_chk_param ) ) {
            //   target.match( re_chk_param ).forEach(function(v){
            //     var param = v.match( /^\S+/ )[0] ;
            //     var cmd = v.match( /\S+$/ )[0] ;

            //     if( /^(-s|-site)$/.test(param) ) url = url.replace( /site=[^&]+/, 'site=' + cmd );
            //     else if ( param === '-t' ) {
            //       cmd.split(' ').forEach(function(template_name){
            //         if( template_name ) open( url.replace(/keyword=[^&]+/, 'keyword=' + template_name ) ) ;
            //       })     
            //     }
                
            //   })
            // }else{
              target.split(' ').forEach(function(template_name){
                if( template_name ) open( 'editor.cgi?action=Load local&site=' + QS.site + '&lang=' + QS.lang + '&keyword=' + template_name ) ;
              }) 
            // }

          },
          vim : function(){ Map.vi() },

          text : function(){
            target.split(' ').forEach(function(deftag){ 
              open( 'https://admin.friendfinderinc.com/cgi-bin/admin/dictionary/deftags.cgi?page=edit_deftag_rows&defnames=' + deftag ) ;
            })
          },
          text_js : function(){ Map.text() },
            
          commit : function(){
            if( /\bp?\d{5}\b/i.test( target ) || /\b\w+-\d+\b/.test( target ) || /\bp\d{5}[sb]\d+\b/i.test( target ) ){
              Spin.open({ txt : 'Commit to DB', color:'#9D201C' }) ;
              Api.commit({ comment : target, code : CM.getValue()},function(htm){
                Spin.close() ; 
                localStorage.project_number = target.split(' ')[0] ;
              })
            }else{
              alert('"' + target + '"' + ' is not a correct project number.') ;
            }
          },

          grep : function(){
            open( 'search.cgi?action=query&search_sites=' + QS.site + '&text_string=' + target  ) ;
          },

          clear : function(){
            Spin.open({ txt : 'Clear Local', color:'#629DFF' }) ;
            Api.clear(function(htm){
              Spin.close() ;
              CM.setValue( $(htm).find('#advedit').val() ) ;
            })
          },

          pu : function(){            
            open( location.href.replace( 'editor.cgi' , 'pushtolive.cgi' ) + '&pu=' + target  )
          },

          set : function(){
            var Map = {
              js : 'javascript',
              htm : 'html'
            }

            CM.setOption( "mode", Map[target] || target );
          },
        
          deftag : function(){
            target.split('|').forEach(function(txt){ 
              open( 'https://admin.friendfinderinc.com/cgi-bin/admin/dictionary/deftags.cgi?action_find_by_text=by+text&pattern=^' + txt + '$' ) ;
            })
          },

          diff : function(){
            open(location.href.replace( 'editor.cgi' , 'history.cgi' ) + '&mode=diffspec&submit=get+diff&version=local&diffversion=' + $('select[name=pickreview] >option:eq(1)').val() )
          },

          env : function(){            
            var url = location.href ;

            var err_param = [] ;

            target.match( re_chk_param ).forEach(function(v){
              var param = v.match( /^\S+/ )[0] ;
              var cmd = v.match( /\S+$/ )[0] ;

              switch( param ){
                case '-dev' :
                case '-d'   : url = url.replace( /dev\d+/, 'dev' + cmd ); break;

                case '-port':
                case '-p'   : url = url.replace( /:\d+/, ':' + cmd ); break;

                case '-site':
                case '-s'   : url = url.replace( /site=[^&]+/, 'site=' + cmd ); break;

                default : err_param.push( param ) ;
              }
              
            })

            if( !err_param.length ) location.href = url ;
            else alert( err_param.join(', ') + ' not found.')

          }
        }     

        var command = value.match(/^\w+/)[0] ;
        var target = $.trim( value.split( command + ' ' )[1] );

        if( Map[command] ) Map[command]()
        else {
          alert( '"' + command +'"' + ' is not a correct command.')
          $command_in[0].selectionStart = 0
          $command_in[0].selectionEnd = command.length ;
        }        
        
      }else if( e.which === 27){ //esc

        $command.hide() ;
        CM.focus() ;
        ctrl_alt_c = 0 ;

      }else if( e.which === 9 ){ //Tab
        e.preventDefault() ;
        var command = value.match(/^\w+/)[0] ;
        if( command === 'commit' ) {
          $command_in.val( 'commit ' + localStorage.project_number + ' ' ) ;
        }

      }
    }

    function init(){

      $(window).on('keydown', hotkey) ;

      $command_in.on('keydown', hotString) ;
      
    }

    return { init : init } ;

  })() ;

  var Main = {

    insertMockup : function(){
      $('body').append( Mockup.tip ) ;

      $command = $('#command') ;
      $command_in = $('>input', $command) ;

      $tip.f1 = $('#tip_f1') ;
      $tip.f2 = $('#tip_f2') ;

    }, 

    runCodemirror : function(){
      Load.codemirror({emmet:true}, function(){    
              
        CM = CodeMirror.fromTextArea( $advedit[0] , {
          mode : (function(){                
            if( /^(javascript(-|_))/.test( QS.keyword ) ) return 'text/javascript' ;          
            if( /^(css(-|_))/.test( QS.keyword ) ) return 'text/css' ;

            return 'text/html' ;
          })(),
          lineNumbers : true,
          matchBrackets : true,
          theme : 'night',
          tabSize : 2,
          autoCloseTags : true, 

          profile: 'xhtml'          
        });          

        // CM.focus() ;

        $cm = $(CM.display.wrapper) ;
        
      }) ;


    },

    init : function(){

      Main.runCodemirror() ;
      Main.insertMockup() ;

      EventListener.init() ;
    }

  }


  Main.init() ;

}) ;