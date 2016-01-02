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

		addBooth(itemList[i_id]);
	});

	//camera change
	$('#2D').click(function() {
		Change2D();
	});

	$('#3D').click(function() {
		Change3D();
	});

	$('#save').click(function() {
		/*
		$.ajax({
			url: 'https://localhost:3000/sudachi/update',
			type: "POST",
			cache: false,
			dataType: "json",
			data: {
			},
			success: function() {

			}


		});
*/

		console.log(items);
	});
});