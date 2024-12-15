import * as THREE from "three";
import { FilesetResolver, HandLandmarker } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17';

document.addEventListener("DOMContentLoaded", async() => { 
	const c1 = document.getElementById("c1");
	const video = document.getElementById("v1");

	navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then( (stream) => {
		//console.log(stream);
		video.srcObject = stream;
		video.play();
	});


	const vision = await FilesetResolver.forVisionTasks(
	  // path/to/wasm/root
	  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm"
	);
	const handLandmarker = await HandLandmarker.createFromOptions(
	    vision,
	    {
	      baseOptions: {
		modelAssetPath: "./hand_landmarker.task"
	      },
		runningMode: 'VIDEO', // Режим обробки відео	      
	      numHands: 1
	    });
	    
	    
	const scene = new THREE.Scene();
	
	const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
	const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} ); 
	const cube = new THREE.Mesh( geometry, material ); 
	scene.add( cube );	
	cube.position.set(0, 0, -2);
	cube.scale.set(1, 1, 1);
	cube.rotation.set(0, Math.PI/4, 0);
	
	const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set(1, 1, 5);

	const renderer = new THREE.WebGLRenderer({canvas : c1, antialias: true, alpha: true});
	renderer.setSize(400, 400);
	renderer.render(scene, camera);
	
	
	let counter = 1;
	
	function animate() {
		renderer.render( scene, camera );
		counter ++;
		if(counter% 5 == 0) {
			const timestamp = performance.now(); // Отримання часової мітки
			const detections = handLandmarker.detectForVideo(video, timestamp);
			if(detections.landmarks.length > 0) {
				//if(detections.landmarks[0][8].x)
				cube.position.set(detections.landmarks[0][8].x*2, detections.landmarks[0][8].y*2, detections.landmarks[0][8].z*2);
			}
		}
	}
	renderer.setAnimationLoop( animate );

//	document.body.appendChild( renderer.domElement );
	video.style.position = "absolute";
	//c1.style.position = "absolute";
	//video.style.width = renderer.domElement.width;
	//video.style.height = renderer.domElement.height;
	renderer.domElement.style.position = "absolute";
	
	
	
	addEventListener("mousemove", (event) => {
		cube.position.set(event.clientX/100.-1, -event.clientY/100.+3, -2);
		//cube.position.set(1, 0, -2);
	});

	
} );



