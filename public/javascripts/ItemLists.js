
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

/**
function itemDisplay (item) {
	displayItem = $('<li>', { class: 'items' });

	divItem = $('<div>', { class: 'mdl-card mdl-shadow--2dp' } );

	//header
	itemHeader = $('<div>', { class: 'mdl-card__title mdl-card__title' } );

	//name
	itemName = $('<h2>', { class: 'mdl-card__title-text', text: item.name } );

	//content
	itemContent = $('<div>', { class: 'mdl-card__supporting-text', text: item._type } );

	//footer
	itemFooter = $('<div>', { class: 'mdl-card__actions mdl-card--border' } );

	//menu
	itemDelete = $('<a>', { class: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect', id: 'itemdelete', text: 'delete' } );
	//itemDelete.addEventListener('click', function() {itemRemove(item)}, false);

	addBooth = $('<a>', { class: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect', id: 'addbooth', text: 'addBooth'} );
	//addBooth.addEventListener('click', function() {addBooth()}, false);

	$('#itemlist').append(displayItem);
	$(displayItem).append(divItem);
	$(divItem).append(itemHeader);
	$(itemHeader).append(itemName);
	$(divItem).append(itemContent);
	$(divItem).append(itemFooter);
	$(itemFooter).append(itemDelete);
	$(itemFooter).append(addBooth);
}
*/