import * as THREE from 'three';
import { OrbitControls } from './customOrbitControls';


var canvas;

var scenes = [], renderer;

init();
animate();

export function init() {

    canvas = document.getElementById( "c" );

    var geometries = [
        new THREE.BoxBufferGeometry( 1, 1, 1 ),
        new THREE.SphereBufferGeometry( 0.5, 12, 8 ),
        new THREE.DodecahedronBufferGeometry( 0.5 ),
        new THREE.CylinderBufferGeometry( 0.5, 0.5, 1, 12 )
    ];

    var content = document.getElementById( 'content' );

    for ( var i = 0; i < 40; i ++ ) {

        var scene = new THREE.Scene();

        // make a list item
        var element = document.createElement( 'div' );
        element.className = 'list-item';

        var sceneElement = document.createElement( 'div' );
        element.appendChild( sceneElement );

        var descriptionElement = document.createElement( 'div' );
        descriptionElement.innerText = 'Scene ' + ( i + 1 );
        element.appendChild( descriptionElement );

        // the element that represents the area we want to render the scene
        scene.userData.element = sceneElement;
        content.appendChild( element );

        var camera = new THREE.PerspectiveCamera( 50, 1, 1, 10 );
        camera.position.z = 2;
        scene.userData.camera = camera;

        var controls = new OrbitControls( scene.userData.camera, scene.userData.element );
        controls.minDistance = 2;
        controls.maxDistance = 5;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.maxPolarAngle = 0;
        controls.minPolarAngle = Math.PI/2;
        scene.userData.controls = controls;

        // add one random mesh to each scene
        // var geometry = geometries[ geometries.length * Math.random() | 0 ];
        var geometry = geometries[0];

        var material = new THREE.MeshStandardMaterial( {

            color: new THREE.Color().setHSL( Math.random(), 1, 0.75 ),
            roughness: 0.5,
            metalness: 0,
            flatShading: true

        } );

        scene.add( new THREE.Mesh( geometry, material ) );

        scene.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );

        var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        scenes.push( scene );

    }


    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );

}

export function updateSize() {

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    if ( canvas.width !== width || canvas.height !== height ) {

        renderer.setSize( width, height, false );

    }

}

export function animate() {

    render();
    requestAnimationFrame( animate );

}

export function render() {

    updateSize();

    // BENDO: check if this can come back??
    // canvas.style.transform = `translateY(${window.scrollY}px)`;

    renderer.setClearColor( 0xffffff ); //background color
    renderer.setScissorTest( false );
    renderer.clear();

    renderer.setClearColor( 0xe0e0e0 ); //box background color
    renderer.setScissorTest( true );

    scenes.forEach( function ( scene ) {

        // so something moves
        // scene.children[ 0 ].rotation.y = Date.now() * 0.001;

        // get the element that is a place holder for where we want to
        // draw the scene
        var element = scene.userData.element;

        // get its position relative to the page's viewport
        var rect = element.getBoundingClientRect();

        // check if it's offscreen. If so skip it
        if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
             rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {

            return; // it's off screen

        }

        // set the viewport
        var width = rect.right - rect.left;
        var height = rect.bottom - rect.top;
        var left = rect.left;
        var bottom = renderer.domElement.clientHeight - rect.bottom;

        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );

        var camera = scene.userData.camera;

        //camera.aspect = width / height; // not changing in this example
        //camera.updateProjectionMatrix();

        //scene.userData.controls.update();

        renderer.render( scene, camera );

    } );

}

