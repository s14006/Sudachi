var width = $('#booth')[0].clientWidth,
	height = $(window).height() - $('#header').height() - 44,  //44はmarginとborderを合わせた数
	near = 1,
	far = 1000,
	items = [];
	
var scene, group, renderer, camera2D, camera3D, camera, control;

function Field() {

	//light
	var light = new THREE.DirectionalLight( 0xffffff, 1);
	light.position.set(0, 300, 50);
	group.add(light);

	var ambient = new THREE.AmbientLight( 0x555533 );	//環境光
	group.add(ambient);

	//mesh-plane
	var pGeometry = new THREE.PlaneGeometry( 500, 500);
	var pMaterial = new THREE.MeshLambertMaterial( { color: 0xeeeeee , side: THREE.DoubleSide } );
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

	//mesh-legs
	var lGeometry = new THREE.BoxGeometry( 10, 100, 10);
	var lMaterial = new THREE.MeshLambertMaterial( { color: 0xffaa88 } );
	
	var leg1 = new THREE.Mesh( lGeometry, lMaterial );
	leg1.position.set( -140, 50, 110);
	group.add(leg1);

	var leg2 = new THREE.Mesh( lGeometry, lMaterial );
	leg2.position.set( -140, 50, -110);
	group.add(leg2);

	var leg3 = new THREE.Mesh( lGeometry, lMaterial );
	leg3.position.set( 140, 50, 110);
	group.add(leg3);

	var leg4 = new THREE.Mesh( lGeometry, lMaterial );
	leg4.position.set( 140, 50, -110);
	group.add(leg4);

};


function render() {
	requestAnimationFrame(render);

	if (camera == camera3D) {
		control.update();
	};

	renderer.render(scene, camera);
};

function addBooth(item) {
	
	var x = 50 || item.size_x;
	var y = 50 || item.size_y;
	var z = 50 || item.size_z;

	var loader = new THREE.TextureLoader();

	var iGeometry = new THREE.BoxGeometry( x, y, z );
	var iMaterial;
	
	loader.load(
		'images/empty.png', 
		function( texture) {
			iGeometry = new THREE.BoxGeometry( x, y, z);
			iMaterial = new THREE.MeshLambertMaterial( { map: texture} );

			control = new THREE.TransformControls( camera, renderer.domElement);
			$(control).bind('change', render);
			
			var item = new THREE.Mesh( iGeometry, iMaterial);
			item.position.set( 0, 130, 0);
			group.add(item);

			control.attach(item);
			group.add(control);

			console.log(item.position);
			items.push(item);
		}
	);
	renderer.render( scene, camera);
	console.log(items);
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
	camera3D.position.set( 0, 400, 400);

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
	renderer.setClearColor(0xffffff, 1);
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