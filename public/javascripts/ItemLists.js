
//あうあう
itemList = [];
count = 0;

// アイテムをリスtに追加
function itemAdd (name, category, size) {
	item = new itemCreate(name, category, size, count);
	listDisplay(item);
	count++;
	itemList.push(item);
	console.log(itemList);
}

// アイテムを作る
function itemCreate(name, category, size, num) {
	this.name = name;
	this.category = category;
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
	$('#category' + item.num).text(item.category);
	$('#size' + item.num).text(item._size);
}
