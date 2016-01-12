var w_width = $('#booth')[0].clientWidth,
	w_height = $(window).height() - $('#header').height() - 25, 
	near = 1,
	far = 10000,
	items = {id: 'oo3', contents: '', createtime: '', updatetime: ''},
	contents = {},
	count_i = 0;
	
var scene, group, renderer,
	camera2D, camera3D, camera,
	control, table,
	update = false;

function CreateField() {

	//light
	var light = new THREE.DirectionalLight( 0xffffff, 1);
	light.position.set(0, 300, 50);
	group.add(light);

	var ambient = new THREE.AmbientLight( 0xf0e68c );	//環境光
	group.add(ambient);

	//mesh-plane
	var pGeometry = new THREE.PlaneGeometry( 5000, 5000);
	var pMaterial = new THREE.MeshLambertMaterial( { color: 0x666666 , side: THREE.DoubleSide } );
	var plane = new THREE.Mesh( pGeometry, pMaterial );
	plane.position.set(0, 0, 0);
	plane.rotation.x = 90 * Math.PI / 180;
	group.add(plane);

	//mesh-table
	var tGeometry = new THREE.BoxGeometry( 900, 30, 450);
	var tMaterial = new THREE.MeshLambertMaterial( { color: 0x20b2aa} );
	table = new THREE.Mesh( tGeometry, tMaterial);
	table.position.set( 0, 700, 0);
	group.add(table);

	//mesh-legs
	var lGeometry = new THREE.BoxGeometry( 30, 700, 30);
	var lMaterial = new THREE.MeshLambertMaterial( { color: 0xffaa88 } );
	
	var leg1 = new THREE.Mesh( lGeometry, lMaterial );
	leg1.position.set( -350, 350, 150);
	group.add(leg1);

	var leg2 = new THREE.Mesh( lGeometry, lMaterial );
	leg2.position.set( -350, 350, -150);
	group.add(leg2);

	var leg3 = new THREE.Mesh(lGeometry, lMaterial);
	leg3.position.set(350, 350, 150);
	group.add(leg3);

	var leg4 = new THREE.Mesh(lGeometry, lMaterial);
	leg4.position.set(350, 350, -150);
	group.add(leg4);
};

function render() {
	requestAnimationFrame(render);

	if (camera == camera3D) {
		control.update();
	};

	$('#booth canvas').bind('mousemove touchmove', function() {
		update = true;
	});

	if (update) {
		renderer.render(scene, camera);
		update = false;
	};
};

function addBooth(item) {

	var x = item.size_x || 50;
	var y = item.size_y || 50;
	var z = item.size_z || 50;

	var loader = new THREE.TextureLoader();
	var iGeometry = new THREE.BoxGeometry(x, y, z);
	var iMaterial;
	
	var obj = {name: item.name, itemsize: {x, y, z}};

	loader.load(
		'images/empty.png', 
		function(texture) {
			iGeometry = new THREE.BoxGeometry(x, y, z);
			iMaterial = new THREE.MeshLambertMaterial( { map: texture} );
			obj['itemimg'] = 'images/empty.png';

			control = new THREE.TransformControls(camera, renderer.domElement);
			//$(control).bind('change', render);
			
			item = new THREE.Mesh(iGeometry, iMaterial);
			item.position.set(0, table.position.y + 15 + (y / 2), 0);
			group.add(item);
			obj['itemposition'] = item.position;

			control.attach(item);
			control.setSize(0.1);
			group.add(control);
		}
	);

	contents['item' + count_i] = obj;
	items['contents'] = contents;
	count_i++;
};

//camera
function Change2D() {

	camera2D = new THREE.OrthographicCamera( w_width / -2, w_width / 2, w_height / 2, w_height / -2, near, far);
	camera2D.position.set( 0, 5000, 0);
	camera2D.lookAt({ x:0, y:0, z:-1 });

	camera = camera2D;

};

function Change3D() {

	fov = 45,
	aspect = w_width / w_height,
	
	camera3D = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera3D.position.set( 0, 1500, 800);

	camera = camera3D;
	control = new THREE.OrbitControls(camera3D, renderer.domElement);

};

function Booth () {

	//renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio);
	renderer.setSize(w_width, w_height);
	renderer.sortObjects = false;
	renderer.setClearColor(0xffffff, 1);
	$('#booth').append(renderer.domElement);

	scene = new THREE.Scene();
	group = new THREE.Group();
	scene.add(group);

	CreateField();

	Change2D();

	renderer.render(scene, camera);

	render();

};

Booth();