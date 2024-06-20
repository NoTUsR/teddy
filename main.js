import * as THREE from 'three';

const container = document.querySelector('#teddy_container')
let width = container.getBoundingClientRect().width
let height = container.getBoundingClientRect().height
const canvas = document.querySelector('#teddy_canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
camera.position.set(0, 1, 3)
console.log(container, canvas)
