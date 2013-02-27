// ==UserScript==
// @id             FFN_template
// @name           FFN_template
// @version        2.2.1
// @namespace      
// @author         rwu.tw
// @description    
// @include        *.friendfinderinc.com*/cgi-bin/admin/dictionary/editor.cgi*
// @include        *.friendfinderinc.com*/cgi-bin/admin/dictionary/history.cgi*
// @include        *.friendfinderinc.com*/cgi-bin/admin/dictionary/pushtolive.cgi*
// @include        *.friendfinderinc.com*/cgi-bin/admin/dictionary/grid.cgi*
// @include        *.friendfinderinc.com*/cgi-bin/admin/release/cr.cgi*

// @run-at         document-end
// ==/UserScript==

;(function(init){
  var el_script = document.createElement('script') ;
  el_script.src = 'http://rwu823.github.com/lib/js/sea.js' ;
  document.head.appendChild( el_script ) ;

  el_script.onload = init ;

})(function(){  
  unsafeWindow.seajs.use('http://dl.dropbox.com/u/3430677/github/FFN/scriptish/template/main')
})

