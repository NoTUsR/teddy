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

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 1, 3 );
directionalLight.castShadow = true
scene.add( light );

//const light1 = new THREE.AmbientLight(0xFFFFFF, 1);
//scene.add(light1)

//const light2 = new THREE.DirectionalLight( 0xffffff, 1 );
//scene.add(light2)

//const light3 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//scene.add(light3)

/*let light = new THREE.SpotLight(0xffa95c,1);
light.position.set(-50,50,50);
light.castShadow = true;
light.shadow.bias = -0.0001;
light.shadow.mapSize.width = 1024*4;
light.shadow.mapSize.height = 1024*4;*/
//scene.add( light );


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
