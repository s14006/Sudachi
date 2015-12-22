function addBooth() {
		var iGeometry = new THREE.BoxGeometry( 100, 50, 100);
		var iMaterial = new THREE.MeshLambertMaterial( { color: 0x101010 } );
		var itemB = new THREE.Mesh( iGeometry, iMaterial);
		itemB.position.set( 0, 130, 0);
		scene.add(itemB);
};

function three() {

	var width = document.getElementById('booth').clientWidth;
	var height = window.parent.screen.height - 200;

	//scene
	scene = new THREE.Scene();

	//mesh-booth
	var geometry = new THREE.BoxGeometry( 300, 10, 250);
	var material = new THREE.MeshLambertMaterial( { color: 0x20b2aa } );
	var booth = new THREE.Mesh( geometry, material);
	booth.position.set( 0, 100, 0);
	scene.add(booth);

	//mesh-plane
	var pGeometry = new THREE.PlaneGeometry( 500, 500);
	var pMaterial = new THREE.MeshLambertMaterial( { color: 0xcccccc , side: THREE.DoubleSide } );
	var plane = new THREE.Mesh( pGeometry, pMaterial);
	plane.position.set( 0, 0, 0);
	plane.rotation.x = 90 * Math.PI / 180;
	scene.add(plane);

	//mesh-item
	


	//light
	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(0, 200, 50);
	scene.add(light);

	var ambient = new THREE.AmbientLight(0x550000);	//環境光
	scene.add(ambient);

	//camera
	var fov = 45;
	var aspect = width / height;
	var near = 1;
	var far = 1000;
	var camera3D = new THREE.PerspectiveCamera(fov, aspect, near, far);	
	var camera2D = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, near, far);
	camera2D.position.set( 0, 200, 0 );
	camera2D.lookAt({ x: 0, y: 0, z: 1});
	var camera = camera2D;

	//Angle Change
	var Button2D = document.createElement('button');
	Button2D.classList.add('button-camera');
	Button2D.classList.add('mdl-button');
	Button2D.classList.add('mdl-js-button');
	Button2D.classList.add('mdl-button--raised');
	Button2D.classList.add('mdl-js-ripple-effect');
	Button2D.classList.add('mdl-button--accent');
	Button2D.innerHTML = '2D';
	Button2D.onclick = function() {
		camera2D.position.set( 0 , 200, 0);
		camera2D.lookAt({ x:0, y:0, z:1});

		controls = new THREE.TranseformControls(camera2D, renderer.domElement);

		renderer.render(scene, camera2D);
		camera = camera2D;
	}

	var Button3D = document.createElement('button');
	Button3D.classList.add('button-camera');
	Button3D.classList.add('mdl-button');
	Button3D.classList.add('mdl-js-button');
	Button3D.classList.add('mdl-button--raised');
	Button3D.classList.add('mdl-js-ripple-effect');
	Button3D.classList.add('mdl-button--accent');
	Button3D.innerHTML = '3D';
	Button3D.onclick = function() {
		camera3D.position.set(10, 100, 500);

		controls = new THREE.OrbitControls(camera3D);

		renderer.render(scene, camera3D);
		camera = camera3D;
	}

	//render
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.setClearColor(0xeeeeee, 1);

	document.getElementById('booth').appendChild(Button3D);
	document.getElementById('booth').appendChild(Button2D);
	document.getElementById('booth').appendChild(renderer.domElement);
	
	renderer.render(scene, camera);

	function render() {
		requestAnimationFrame(render);

		if (camera == camera3D) {
			controls.update();
		};

		renderer.render(scene, camera);
	};

	render();

};

three();