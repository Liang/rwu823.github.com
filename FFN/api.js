define(function(require, exports, module) {  
  
  var Api = module.exports = {  

    Ajax :  {},
    Res : {},

    content : function( file_name, callback){      
      Api.Ajax[file_name] = $.ajax({
        url : '/FFN/content/' + file_name + '.htm',
        dataType : 'HTML',
        cache : false,
        success : function(htm){
          Api.Res.Content = Api.Res.Content || {} ;
          Api.Res.Content[file_name] = htm ;
          
          $.isFunction(callback) && callback(htm) ;
        }
      })
    }, 

    init : function(){      


    }

  }

  Api.init() ;

}) ;