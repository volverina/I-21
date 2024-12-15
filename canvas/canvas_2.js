import * as THREE from "three";
import { Timer } from "three/addons/misc/Timer.js";

document.addEventListener("DOMContentLoaded", async() => { 
	const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

	renderer.setClearColor(0xcbefff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	const scene = new THREE.Scene();
	
	const boxgeometry = new THREE.BoxGeometry( 1, 1, 1 ); 
	const boxmaterial = new THREE.MeshPhongMaterial( {color: 0x0000ff} ); 
	const cube = new THREE.Mesh( boxgeometry, boxmaterial ); 
	scene.add( cube );	
	cube.position.set(0, 0, -2);
	cube.scale.set(1, 1, 1);
	cube.rotation.set(0, Math.PI/4, 0);
	
	const lamplight = new THREE.PointLight( 0xffffff, 10);
	lamplight.position.set( -1, 1, 0 );
	scene.add( lamplight );
	
	//const texture = new THREE.TextureLoader().load('owl.png' ); 
	const texture = new THREE.TextureLoader().load('map.jpg' ); 
	// immediately use the texture for material creation 

	//const material = new THREE.MeshBasicMaterial( { map:texture } );
	
	const spheregeometry = new THREE.SphereGeometry( 15, 32, 16 ); 
	const spherematerial = new THREE.MeshLambertMaterial( { color: 0xffffff, map:texture } ); 
	const sphere = new THREE.Mesh( spheregeometry, spherematerial ); 
	//scene.add( sphere );
	//sphere.position.set(0, 0, -55);
	
	const stickgeometry = new THREE.CylinderGeometry( 0.5, 0.5, 35, 32 ); 
	const stickmaterial = new THREE.MeshBasicMaterial( {color: 0x00000} ); 
	const stick = new THREE.Mesh( stickgeometry, stickmaterial ); 
	//scene.add( stick );
	//stick.position.set(0, 0, -55);
	
	const group = new THREE.Group();
	group.add( sphere );
	group.add( stick );

	scene.add( group );
	group.rotation.set(+33.5 * Math.PI/180, 0, 0);
	group.position.set(0, 0, -55);
	

	const lamplight2 = new THREE.PointLight( 0xffffff, 500);
	lamplight2.position.set( 0, 20, -55 );
	scene.add( lamplight2 );
	
	const light = new THREE.AmbientLight( 0xebe8e8, 1 ); // soft white light
	scene.add( light );
	
//	const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
//	scene.add( directionalLight );
	//const hmlight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	//scene.add( hmlight );
	
	const cylindergeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
	const cylindermaterial = new THREE.MeshNormalMaterial(); 
	const cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial ); 
	cylinder.scale.set(0.1, 0.05, 0.1);
	scene.add( cylinder );
	cube.position.set(2, 0, -3);

	const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set(1, 1, 5);

	document.body.appendChild( renderer.domElement );

	const timer = new Timer();
	
	function animate(timestamp) {
		// timestamp is optional
		timer.update( timestamp );
		
		const x = 0 + 20*Math.cos(timestamp/1000);
		const y = 0 + 20*Math.sin(timestamp/1000);

		const delta = timer.getDelta();
		//console.log(timestamp, delta);
	
		lamplight2.position.set( x, y, -55 );
		group.rotation.set(0, timestamp/1000, 0);
		renderer.render( scene, camera );
	}
	renderer.setAnimationLoop( animate );
} );



