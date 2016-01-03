itemList = [];
count = 0;

// アイテムをリストに追加
function itemAdd (name, size) {
	item = new itemCreate(name, size, count);
	listDisplay(item);
	count++;
	itemList.push(item);
	console.log(itemList);
}

// アイテムを作る
function itemCreate(name, size, num) {
	this.name = name;
	this._image = null;
	this.num = num;

	switch(size) {
		case "B5_book_stand":
			this.size_x = 182;
			this.size_y = 257;
			this.size_z = 2;
			break;

		case "B5_book_put":
			this.size_x = 182;
			this.size_y = 2;
			this.size_z = 257;
			break;
	}
}

function itemEdit(item) {
	
}

// アイテムをリストから削除
function itemRemove(item) {
	var parElem = ('itemlist');
	var list = parElem.getElementsByTagName('li');
	parElem.removeChild(list[item.num]);
	itemList.splice(item.num, 1);
	console.log(itemList);
}

// 表示
function listDisplay(item) {
	$('#item-' + item.num).css('display', 'block');
	$('#i-name' + item.num).text(item.name);
	$('#size' + item.num).text(item._size);
}
