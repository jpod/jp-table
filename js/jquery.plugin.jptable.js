/* 
jquery.plugin.jptable V.1 Copyright July 2012
Author : Jpod Agung Nugroho 
You can customize this plugin, "berbagi ilmu akan menyelamatkan akheratmu"
*/

/* How to use */
/*
$('#btn_addrow').jptable({
	table: $("#table-id"),
	data: ["auto","col-1","col-2","col-3"],
	onAddrow: function(param,data,no){
		alert('You can do some case here ;) ...');
		$('.btn_delrow').eq(no).delRow({ 
			id: no,
			onDelrow1:function(index){
				alert(index);
			}
		});
	}
});
*/

$.fn.jptable = function(options,method) {

	var defaults = {
		table: $('#table-row'),
		data: [1,2,3,4],
		beforeAddrow:function(){ },
		onAddrow:function(tableid,data,no){ }
	};
	
	var options = jQuery.extend(defaults, options);
	
	return this.each(function() {
		  var o =options;
		  var obj = $(this);
		  $(this).click(function(){
		    o.beforeAddrow();
			var no = $.inject_row( o.table, o.data );
			o.onAddrow(o.table,o.data,no);
		  });
	});
	
};

$.inject_row = function( table_body, data ){
	var rowCount = $(table_body).find(' >tbody >tr').length;
	var no = rowCount+1;
	var row_str = '<tr>';
	$.each( data, function(index,item){
		if(item=='auto') item='<span class="auto">'+no+'</span>';
		row_str += '<td>'+item+'</td>';
	});
	row_str += '</tr>';
	$(table_body).find("tbody").append(row_str);
	return (no-1);
};

$.fn.delRow = function(options){
	var defaults = {
		id: '',
		confirm: 'Yakin akan menghapus item ini?',
		'classAuto': 'auto',
		onDelrow1:function(no){ }
	};
	var options = jQuery.extend(defaults, options);
	
	return this.each(function() {
		var o = options;
		var obj = $(this);
		obj.click(function(){
			if(confirm(o.confirm)){
				var rowdel = obj.parent().parent().find("span.auto").eq(0).html();
				try{
					obj.parent().parent().remove();
					$('.'+o.classAuto).each(function(index,item){
						var no = (index+1);
						$(item).html(no);
					});
				}catch(e){
					alert(e.message);
				}
				o.onDelrow1(rowdel);
			}
		});
	});
};

$.fn.outer = function() {
	return $( $('<div></div>').html(this.clone()) ).html();
}


$.create = function() {
    if (arguments.length == 0) return [];
    var args = arguments[0] || {}, elem = null, elements = null;
    var siblings = null;

    if (args == null) args = "";
    if (args.constructor == String) {
        if (arguments.length > 1) {
            var attributes = arguments[1];
                if (attributes.constructor == String) {
                            elem = document.createTextNode(args);
                            elements = [];
                            elements.push(elem);
                            siblings =
        jQuery.create.apply(null, Array.prototype.slice.call(arguments, 1));
                            elements = elements.concat(siblings);
                            return elements;

                    } else {
                            elem = document.createElement(args);

                            var attributes = arguments[1];
                            for (var attr in attributes)
                                jQuery(elem).attr(attr, attributes[attr]);

                            var children = arguments[2];
                            children = jQuery.create.apply(null, children);
                            jQuery(elem).append(children);

                            if (arguments.length > 3) {
                                    siblings =
        jQuery.create.apply(null, Array.prototype.slice.call(arguments, 3));
                                    return [elem].concat(siblings);
                            }
                            return elem;
                    }
            } else return document.createTextNode(args);
      } else {
              elements = [];
              elements.push(args);
              siblings =
        jQuery.create.apply(null, (Array.prototype.slice.call(arguments, 1)));
              elements = elements.concat(siblings);
              return elements;
      }
};