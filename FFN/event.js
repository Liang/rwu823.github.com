define(function(require){
  
  var $o = require('./jq-dom')
  require('$.fn.highlight')

  var watch_search = $o.search.val() ;

  function focusSearch(e){
    if( e.altKey && e.which === 70 ) {
      e.preventDefault() ;
      $o.search.select() ;      
    }    
  }

  function grep(e){
    var txt = $.trim( this.value );    

    if( txt && watch_search !== txt ) {

      watch_search = txt ;

      txt = txt.replace( /[$^*+?.{}()\[\]]/g, function(match){
        return '\\' + match ;
      }) 

      var re = new RegExp( txt, 'i') 
      var $match = $o.itemGroup_a.filter(function(){
        return re.test( $(this).text() ) ; 
      })      
      
      $o.searchResult
        .html( $match.clone() ).show()
        .highlightRemove() 
        .highlight( {re : new RegExp( txt, 'ig')} )

      $o.itemGroup.hide() ;

      $o.searchResult.attr('data-choose', '-1')
    }else if( !txt ) {
      $o.itemGroup.show() ;
      $o.searchResult.highlightRemove().hide().attr('data-choose', '-1') ;
    }
  }

  function toggleFolder( e ) {
    
    var $this = $(this) ;
    var $parent = $this.parent() ;

    $this[ $this.hasClass('_off') ? 'removeClass' : 'addClass' ]('_off') ;
    $parent[ $this.hasClass('_off') ? 'addClass' : 'removeClass' ]('_off') ;      

  }

  function chooseItem(e){
    
    if( /^(38|40|9)$/.test(e.which) && $o.searchResult.is(':visible') ){

      e.preventDefault() ;

      var idx = Number( $o.searchResult.attr('data-choose') ) ;
      var $result_a = $('>a', $o.searchResult ) ;

      if( e.which === 38 || e.shiftKey && e.which === 9 ){ // up
        idx -= 1 ; if( idx < 0 ) idx = $result_a.length - 1 ;
      }else if ( /^(40|9)$/.test(e.which) ){ // down
        idx += 1 ; if( idx > $result_a.length - 1 ) idx = 0 ;
      } 

      $result_a
        .removeClass('_choose')
        .eq(idx)
        .addClass('_choose') ;

      $o.searchResult.attr('data-choose', idx)
    }else if( e.which === 13 ) { //enter
      location.href = $('>a._choose', $o.searchResult ).attr('href') ;

      $o.search.val('').trigger('keyup.grep')
    }
  }

  $(window).on( 'keydown', focusSearch ) ;
  $o.search
    .on('keyup.grep', grep)
    .on('keydown', chooseItem)
  $o.itemGroup.on('click', 'b', toggleFolder)

})