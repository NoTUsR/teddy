import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.querySelector('#teddy_container')
let width = container.getBoundingClientRect().width
let height = container.getBoundingClientRect().height
const canvas = document.querySelector('#teddy_canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
camera.position.set(0, 1, 3)

const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, logarithmicDepthBuffer: true});
renderer.setSize( width, height );
renderer.physicallyCorrectLights = true
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild( renderer.domElement );

const light1 = new THREE.AmbientLight('#FFFFFF', 0.3);
light1.name = 'ambient_light';
scene.add(light1);

const light2 = new THREE.DirectionalLight('#FFFFFF', 0.8 * Math.PI);
light2.position.set(0, 0, 0.866); // ~60º
light2.name = 'main_light';
scene.add(light2);
const loader = new GLTFLoader();

loader.load('https://raw.githubusercontent.com/NoTUsR/teddy/main/Head.glb', function(gltf){

 let teddy = gltf.scene
 
 teddy.traverse(n => { if ( n.isMesh ) {
  n.castShadow = true; 
  n.receiveShadow = true;
  if(n.material.map) n.material.map.anisotropy = 16; 
}});

 scene.add(teddy)

})

renderer.shadowMap.enabled = true;

function animate() {
    
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
