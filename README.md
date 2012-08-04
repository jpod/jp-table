YPing AutoComplete
==================

This is a JQuery addrow Plugin for add or delete rows at run time. Enjoy! ;)

How to use ?
------------

	var elem1 = $.create('input',{
		type: 'text',
		name: 'total[]',
		'class': 'num',
		size: 10,
		maxlength: 16
	});

	var elem2 = $.create('input',{
		type: 'button',
		'class': 'btn_delrow button red',
		value: 'HAPUS ITEM'
	});
	
	    
	$('#btn_addrow').jptable({
		table: $("#table-id"),
		data: ["auto",$(elem1).outer(),$(elem2).outer()],
		onAddrow: function(param,data,no){
			// event callback on after addrow ;)
			$('.btn_delrow').eq(no).delRow({ 
				id: no,
				onDelrow1:function(index){
					// event callback on after del row ;)
				}
			});
		}
	});


Demo
--------------
* [Demo Jptable Adrow Plugin](http://desamedia.com/jp-table/)