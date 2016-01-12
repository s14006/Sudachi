var i_id;

$(window).load(function  () {

	//modalの表示
	$('#itemadd').click(function() {
		if (count < 10) {
			$('#modal').css('display','block');
		};
	});

	//modalの非表示
	$('#cancel').click(function() {
		$('#modal').css('display','none');
	});

	//listにitemを追加
	$('#listAdd').click(function() {
		var name = $(':text[id="name"]').val();
		var size = $('select[name="size"]').val();
		itemAdd(name, size);
		$('#modal').css('display','none');
	});
	
	$('.i-add').click(function() {
		i_id = parseInt($(this).attr('id').slice(-1));

		if (camera == camera3D) {
			alert('2Dでやってちょ…(；´∀｀)');
		} else {
			addBooth(itemList[i_id]);
		}
	});

	//camera change
	$('#2D').click(function() {
		Change2D();
	});

	$('#3D').click(function() {
		Change3D();
	});

	$('#setting').click(function() {
		items["createtime"] = Date.now();
		$.ajax({
			url: 'http://localhost:3000/sudachi/create',
			type: "POST",
			cache: false,
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(items),
			success: function() {
				console.log('success');
			},
			error: function() {
				console.log('error');
			}
		});
	});

	$('#save').click(function() {
		items["updatetime"] = Date.now();
		console.log(items);

		$.ajax({
			url: 'http://localhost:3000/sudachi/update',
			type: "POST",
			cache: false,
			dataType: "json",
			contentType: "application/json", 
			data: JSON.stringify(items),
			success: function() {
				console.log('auau');
			},
			error: function() {
				console.log('error');
			}
		});
	});
});