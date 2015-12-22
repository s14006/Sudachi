var width = $('#booth')[0].clientWidth,
	height = $(window).height() - $('#header').height() - 42,  //44はmarginとborderを合わせた数
	near = 1,
	far = 1000,
	scene,
	group,
	renderer,
	camera2D,
	camera3D,
	camera,
	control;

function Field() {

	//light
	var light = new THREE.DirectionalLight( 0xffffff, 1);
	light.position.set(0, 300, 50);
	group.add(light);

	var ambient = new THREE.AmbientLight( 0x550000 );	//環境光
	group.add(ambient);

	//mesh-plane
	var pGeometry = new THREE.PlaneGeometry( 500, 500);
	var pMaterial = new THREE.MeshLambertMaterial( { color: 0xcccccc , side: THREE.DoubleSide } );
	var plane = new THREE.Mesh( pGeometry, pMaterial );
	plane.position.set(0, 0, 0);
	plane.rotation.x = 90 * Math.PI / 180;
	group.add(plane);

	//mesh-table
	var tGeometry = new THREE.BoxGeometry( 300, 10, 250);
	var tMaterial = new THREE.MeshLambertMaterial( { color: 0x20b2aa} );
	var table = new THREE.Mesh( tGeometry, tMaterial);
	table.position.set( 0, 100, 0);
	group.add(table);
};


function render() {

	requestAnimationFrame(render);

	if (camera == camera3D) {
		control.update();
	};

	renderer.render(scene, camera);
};

function addBooth(item) {
	
	var x = 100 || item.size_x;
	var y = 100 || item.size_y;
	var z = 100 || item.size_z;

	//var iGeometry = new THREE.BoxGeometry( x, y, z);

	/*
	var texture = THREE.ImageUtils.loadTexture( 'images/empty.gif', THREE.UVMapping, render );
	texture.anisotropy = renderer.getMaxAnisotropy();

	var iMaterial = new THREE.MeshLambertMaterial( { map: texture, color: 0xffffff } );
	*/

	var loader = new THREE.TextureLoader();


	var iGeometry = new THREE.BoxGeometry( x, y, z);
	var iMaterial;// = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture('images/empty.jpg') } );

	
	loader.load(
		'images/empty.png', 
		function( texture) {
			iGeometry = new THREE.BoxGeometry( x, y, z);
			iMaterial = new THREE.MeshLambertMaterial( { map: texture} );

			control = new THREE.TransformControls( camera, renderer.domElement);
			$(control).bind('change', render);
			
			var itemB = new THREE.Mesh( iGeometry, iMaterial);
			itemB.position.set( 0, 130, 0);
			group.add(itemB);

			control.attach(itemB);
			group.add(control);
		}
	);

	
	control = new THREE.TransformControls( camera, renderer.domElement);
	$(control).bind('change', render);
	
	var itemB = new THREE.Mesh( iGeometry, iMaterial);
	itemB.position.set( 0, 130, 0);
	group.add(itemB);

	control.attach(itemB);
	group.add(control);

	renderer.render( scene, camera);
};

//camera

function Change2D() {

	camera2D = new THREE.OrthographicCamera( width / -2, width / 2, height / 2, height / -2, near, far);
	camera2D.position.set( 0, 500, 0);
	camera2D.lookAt({ x:0, y:0, z:-1 });

	camera = camera2D;
	renderer.render(scene, camera);

	$('#booth-layer').css( 'dispaly', 'block' );

};

function Change3D() {

	fov = 45,
	aspect = width / height,
	
	camera3D = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera3D.position.set( 0, 500, 100);

	camera = camera3D;

	control = new THREE.OrbitControls(camera3D, renderer.domElement);

	renderer.render(scene, camera);

};

function Booth () {

	//renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio);
	renderer.setSize(width, height);
	renderer.sortObjects = false;
	renderer.setClearColor(0xeeeeee, 1);
	$('#booth').append(renderer.domElement);

	scene = new THREE.Scene();
	group = new THREE.Group();
	scene.add(group);

	Field();

	Change2D();

	renderer.render(scene, camera);

	render();

};

Booth();