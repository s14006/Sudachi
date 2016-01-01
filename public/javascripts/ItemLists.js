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
		case 100:
			this.size_x = 100;
			this.size_y = 100;
			this.size_z = 100;
			break;

		case 200:
			this.size_x = 200;
			this.size_y = 200;
			this.size_z = 200;
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
