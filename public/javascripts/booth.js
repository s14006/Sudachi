var windowWidth = $('#booth')[0].clientWidth,
	windowHeight = $(window).height() - $('#header').height() - 25, 
	near = 1,
	far = 10000;

var scene, group, renderer,
	camera2D, camera3D, camera,
	control, table,
	update = false;

function createField() {

	//light
	var light = new THREE.DirectionalLight( 0xffcc00, 0.1);
	light.position.set( -10, 300, 50);
	light.castShadow = true;
	group.add(light);

	var ambient = new THREE.AmbientLight( 0xffffff );	//環境光
	group.add(ambient);

	//mesh-plane
	var pGeometry = new THREE.PlaneGeometry( 5000, 5000);
	var pMaterial = new THREE.MeshLambertMaterial( { color: 0xeeeeee , side: THREE.DoubleSide } );
	var plane = new THREE.Mesh( pGeometry, pMaterial );
	plane.position.set(0, -700, 0);
	plane.rotation.x = 90 * Math.PI / 180;
	plane.receiveShadow = true;
	group.add(plane);

	//mesh-table
	var tGeometry = new THREE.BoxGeometry( 900, 30, 450);
	var tMaterial = new THREE.MeshLambertMaterial( { color: 0xf9cb9c} );
	table = new THREE.Mesh( tGeometry, tMaterial);
	table.position.set( 0, 0, 0);
	table.castShadow = true;
	table.receiveShadow = true;
	group.add(table);

	//mesh-legs
	var lGeometry = new THREE.BoxGeometry( 30, 700, 30);
	var lMaterial = new THREE.MeshLambertMaterial( { color: 0xffaa88 } );
	
	var leg1 = new THREE.Mesh( lGeometry, lMaterial );
	leg1.position.set( -350, -350, 150);
	leg1.castShadow = true;
	group.add(leg1);

	var leg2 = new THREE.Mesh( lGeometry, lMaterial );
	leg2.position.set( -350, -350, -150);
	leg2.castShadow = true;
	group.add(leg2);

	var leg3 = new THREE.Mesh(lGeometry, lMaterial);
	leg3.position.set(350, -350, 150);
	leg3.castShadow = true;
	group.add(leg3);

	var leg4 = new THREE.Mesh(lGeometry, lMaterial);
	leg4.position.set(350, -349, -150);
	leg4.castShadow = true;
	group.add(leg4);
}

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
}

function addBooth(item) {

	var x = item.size_x || 100;
	var y = item.size_y || 100;
	var z = item.size_z || 100;

	var itemimage = item._image;

	var loader = new THREE.TextureLoader();
	var iGeometry = new THREE.BoxGeometry(x, y, z);
	var iMaterial;

	loader.load(
		itemimage, 
		function(texture) {
			iGeometry = new THREE.BoxGeometry(x, y, z);
			iMaterial = new THREE.MeshLambertMaterial( { map: texture ,color: 0xffffff} );
			iMaterial.transparent = true; 

			control = new THREE.TransformControls(camera, renderer.domElement);
			
			item = new THREE.Mesh(iGeometry, iMaterial);
			item.position.set(0, table.position.y + 15 + (y / 2), 0); //table.position.y + 15 + (y / 2)
			item.castShadow = true;
			group.add(item);

			control.attach(item);
			control.setSize(0.1);
			group.add(control);
		}
	);

}

//camera
function Change2D() {

	camera2D = new THREE.OrthographicCamera( windowWidth / -2, windowWidth / 2, windowHeight / 2, windowHeight / -2, near, far);
	camera2D.position.set( 0, 5000, 0);
	camera2D.lookAt({ x:0, y:0, z:-1 });

	camera = camera2D;
}

function Change3D() {

	fov = 45,
	aspect = windowWidth / windowHeight,
	
	camera3D = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera3D.position.set( 0, 1500, 800);

	camera = camera3D;
	control = new THREE.OrbitControls(camera3D, renderer.domElement);
}

function onWindowResize() {
	windowWidth = $('#booth')[0].clientWidth;
	windowHeight = $(window).height() - $('#header').height() - 25;

	camera.aspect = windowWidth / windowHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( windowWidth, windowHeight );
}

function Booth () {

	//renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio);
	renderer.setSize(windowWidth, windowHeight);
	renderer.sortObjects = false;
	renderer.setClearColor(0xffffff, 1);
	renderer.shadowMapEnabled = true;
	$('#booth').append(renderer.domElement);

	scene = new THREE.Scene();
	group = new THREE.Group();
	scene.add(group);

	createField();

	Change2D();

	renderer.render(scene, camera);

	render();

	window.addEventListener( 'resize', onWindowResize, false );

}

Booth();