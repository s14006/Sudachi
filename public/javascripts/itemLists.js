itemList = [];
count = 0;

// アイテムをリストに追加
function itemAdd (name, size, image) {
	item = new itemCreate(name, size, image, count);
	listDisplay(item);
	count++;
	itemList.push(item);
	console.log(itemList);
}

// アイテムを作る
function itemCreate(name, size, image, num) {
	this.name = name;
	this._image = image;
	this.num = num;

	switch(size) {
		case "B5_book_stand":
			this.size_x = 182;
			this.size_y = 257;
			this.size_z = 4;
			break;

		case "B5_book_put":
			this.size_x = 182;
			this.size_y = 4;
			this.size_z = 257;
			break;

		case "postcard_stand":
			this.size_x = 100;
			this.size_y = 148;
			this.size_z = 2;
			break;

		case "postcard_put":
			this.size_x = 100;
			this.size_y = 2;
			this.size_z = 148;
			break;

		case "shushu":
			this.size_x = 100;
			this.size_y = 10;
			this.size_z = 100;
			break;

		case "pierce":
			this.size_x = 50;
			this.size_y = 20;
			this.size_z = 10;
			break;
	}
}

// アイテムをリストから削除
/*
function itemRemove(item) {
	var parElem = ('itemlist');
	var list = parElem.getElementsByTagName('li');
	parElem.removeChild(list[item.num]);
	itemList.splice(item.num, 1);
	console.log(itemList);
}
*/

// 表示
function listDisplay(item) {
	$('#item-' + item.num).css('display', 'block');
	$('#i-name' + item.num).text(item.name);
	$('#size' + item.num).text(item._size);
}