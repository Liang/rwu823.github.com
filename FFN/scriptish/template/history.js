define(function(require){

  function selectTextare(e){    
    $('textarea[name="data"]').select();    
  }
  
  $(document).on('focus', selectTextare)
})