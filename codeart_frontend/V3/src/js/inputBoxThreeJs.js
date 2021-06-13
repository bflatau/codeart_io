import * as THREE from 'three';
import { OrbitControls } from './lib/customOrbitControls';


var canvas;

var scenes = [], renderer;

var aSide = [
    { color: .005, letter: '$', letterPosition: 44 },
    { color: .5, letter: '@', letterPosition: 28 },
    { color: .6, letter: '&', letterPosition: 34 },
    { color: .175, letter: '%', letterPosition: 34 },
    { color: .9, letter: '$', letterPosition: 44 },
    { color: .4, letter: '@', letterPosition: 28 },
    { color: .7, letter: '&', letterPosition: 34 },
    { color: .5, letter: '%', letterPosition: 34 },
    { color: .175, letter: '$', letterPosition: 44 },
    { color: .5, letter: '@', letterPosition: 28 },
    { color: .6, letter: '&', letterPosition: 34 },
    { color: .8, letter: '%', letterPosition: 34 },
    { color: .5, letter: '$', letterPosition: 44 },
    { color: .175, letter: '@', letterPosition: 28 },
    { color: .7, letter: '&', letterPosition: 34 },
    { color: .4, letter: '%', letterPosition: 34 },
    { color: .005, letter: '$', letterPosition: 44 },
    { color: .5, letter: '@', letterPosition: 28 },
    { color: .4, letter: '&', letterPosition: 34 },
    { color: .8, letter: '%', letterPosition: 34 },
    { color: .175, letter: '$', letterPosition: 44 },
    { color: .9, letter: '@', letterPosition: 28 },
    { color: .5, letter: '&', letterPosition: 34 },
    { color: .005, letter: '%', letterPosition: 34 },
    { color: .8, letter: '$', letterPosition: 44 },
    { color: .6, letter: '@', letterPosition: 28 },
    { color: .175, letter: '&', letterPosition: 34 },
    { color: .4, letter: '%', letterPosition: 34 },
    { color: .5, letter: '$', letterPosition: 44 },
    { color: .005, letter: '@', letterPosition: 28 },
    { color: .5, letter: '&', letterPosition: 34 },
    { color: .9, letter: '%', letterPosition: 34 },
    { color: .005, letter: '$', letterPosition: 44 },
    { color: .7, letter: '@', letterPosition: 28 },
    { color: .9, letter: '&', letterPosition: 34 },
    { color: .7, letter: '%', letterPosition: 34 },
    { color: .4, letter: '$', letterPosition: 44 },
    { color: .8, letter: '@', letterPosition: 28 },
    { color: .6, letter: '&', letterPosition: 34 },
    { color: .5, letter: '%', letterPosition: 34 },

];

var bSide = [
    { color: .7, letter: '$', letterPosition: 44 },
    { color: .6, letter: '@', letterPosition: 28 },
    { color: .5, letter: '$', letterPosition: 44 },
    { color: .8, letter: '%', letterPosition: 34 },
    { color: .9, letter: '@', letterPosition: 28 },
    { color: .005, letter: '&', letterPosition: 34 },
    { color: .5, letter: '%', letterPosition: 34 },
    { color: .175, letter: '@', letterPosition: 28 },
    { color: .5, letter: '&', letterPosition: 34 },
    { color: .5, letter: '%', letterPosition: 34 },
    { color: .175, letter: '%', letterPosition: 34 },
    { color: .9, letter: '@', letterPosition: 28 },
    { color: .7, letter: '&', letterPosition: 34 },
    { color: .005, letter: '$', letterPosition: 44 },
    { color: .8, letter: '@', letterPosition: 28 },
    { color: .6, letter: '$', letterPosition: 44 },
    { color: .5, letter: '&', letterPosition: 34 },
    { color: .175, letter: '&', letterPosition: 34 },
    { color: .5, letter: '@', letterPosition: 28 },
    { color: .9, letter: '$', letterPosition: 44 },
    { color: .005, letter: '$', letterPosition: 44 },
    { color: .8, letter: '&', letterPosition: 34 },
    { color: .5, letter: '%', letterPosition: 34 },
    { color: .8, letter: '%', letterPosition: 34 },
    { color: .6, letter: '&', letterPosition: 34 },
    { color: .6, letter: '%', letterPosition: 34 },
    { color: .9, letter: '@', letterPosition: 28 },
    { color: .5, letter: '&', letterPosition: 34 },
    { color: .175, letter: '$', letterPosition: 44 },
    { color: .8, letter: '@', letterPosition: 28 },
    { color: .5, letter: '%', letterPosition: 34 },
    { color: .005, letter: '&', letterPosition: 34 },
    { color: .7, letter: '@', letterPosition: 28 },
    { color: .5, letter: '&', letterPosition: 34 },
    { color: .6, letter: '%', letterPosition: 34 },
    { color: .9, letter: '$', letterPosition: 44 },
    { color: .175, letter: '%', letterPosition: 34 },
    { color: .7, letter: '&', letterPosition: 34 },
    { color: .005, letter: '$', letterPosition: 44 },
    { color: .7, letter: '@', letterPosition: 28 },
];



init();
animate();

export function init() {
    

    canvas = document.getElementById( "canvas" );

    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );

    var content = document.getElementById( 'content' );
    
    // 40 == number of boxes
    for ( var i = 0; i < 40; i ++ ) {

        var scene = new THREE.Scene();

        // make a list item
        var element = document.createElement( 'div' );
        element.className = 'list-item';

        var sceneElement = document.createElement( 'div' );
        //give boxes an id 
        sceneElement.id = i;

        element.appendChild( sceneElement );

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

        var materials = [ 
            
            new THREE.MeshStandardMaterial( {
                color: new THREE.Color().setHSL(aSide[i].color, 1, 0.75),
                roughness: 0.5,
                metalness: 0,
                flatShading: true
            }),

            new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(bSide[i].color, 1, 0.75),
                roughness: 0.5,
                metalness: 0,
                flatShading: true
            }),

            new THREE.MeshStandardMaterial({
                color: 'black',
                roughness: 0.5,
                metalness: 0,
                flatShading: true
            }),

            new THREE.MeshStandardMaterial({
                color: 'black',
                roughness: 0.5,
                metalness: 0,
                flatShading: true
            }),

            new THREE.MeshStandardMaterial({
                color: 'black',
                roughness: 0.5,
                metalness: 0,
                flatShading: true
            }),

            new THREE.MeshStandardMaterial({
                color: 'black',
                roughness: 0.5,
                metalness: 0,
                flatShading: true
            })

        ];

        scene.add( new THREE.Mesh( geometry, materials) );

        scene.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );


        //BEN turned off light for consistent colors...for now...
        // var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        // light.position.set( 1, 1, 1 );
        // scene.add( light );


        ///CREATE A CANVAS///

        var aCanvas = document.createElement("canvas");
        var aCanvas2d = aCanvas.getContext("2d");

        //scale of text
        aCanvas.width = aCanvas.height = 128;
        aCanvas2d.fillStyle = "white";
        aCanvas2d.font = "60pt arial bold";

        // numbers are X, Y for text position
        aCanvas2d.fillText(aSide[i].letter, aSide[i].letterPosition , 90);

        ///CREATE B CANVAS///

        var bCanvas = document.createElement("canvas");
        var bCanvas2d = bCanvas.getContext("2d");

        //scale of text
        bCanvas.width = bCanvas.height = 128;
        bCanvas2d.fillStyle = "white";
        bCanvas2d.font = "60pt arial bold";

        // numbers are X, Y for text position
        bCanvas2d.fillText(bSide[i].letter, bSide[i].letterPosition, 90);


       
        ///CREATE X CANVAS ///

        var xCanvas = document.createElement("canvas");
        var xCanvas2d = xCanvas.getContext("2d");

        //scale of text
        xCanvas.width = xCanvas.height = 128;
        xCanvas2d.fillStyle = "white";
        xCanvas2d.font = "60pt arial bold";

        // numbers are X, Y for text position
        xCanvas2d.fillText('X', 34, 90);

        

        var textCanvasMeshes = [
            new THREE.MeshBasicMaterial({ map: new THREE.Texture(aCanvas), transparent: true }),
            new THREE.MeshBasicMaterial({ map: new THREE.Texture(bCanvas), transparent: true }),
            new THREE.MeshBasicMaterial({ map: new THREE.Texture(aCanvas), transparent: true }),
            new THREE.MeshBasicMaterial({ map: new THREE.Texture(aCanvas), transparent: true }),
            new THREE.MeshBasicMaterial({ map: new THREE.Texture(xCanvas), transparent: true }),
            new THREE.MeshBasicMaterial({ map: new THREE.Texture(xCanvas), transparent: true })

        ];

        // BENDO: HOW TO REFACTOR THIS?????
        textCanvasMeshes[0].map.needsUpdate = true;
        textCanvasMeshes[1].map.needsUpdate = true;
        textCanvasMeshes[2].map.needsUpdate = true;
        textCanvasMeshes[3].map.needsUpdate = true;
        textCanvasMeshes[4].map.needsUpdate = true;
        textCanvasMeshes[5].map.needsUpdate = true;
        

        // var textMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), textCanvasMeshes);
        scene.add(new THREE.Mesh(geometry, textCanvasMeshes));

        /// END CREATE TEXT CANVAS ///


        ///CHANGE BACKGROUND COLOR OF SPINNY BOXES
        scene.background = new THREE.Color(0x2A2A2A); 

        scenes.push( scene );

    }


    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setClearColor(0xb0f442, 1 );
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

    // BENNOTE: check this thing periodically, kinda cool
    canvas.style.transform = `translateY(${window.scrollY}px)`;

    renderer.setClearColor( 0x000000 ); //background color
    renderer.setScissorTest( false );
    renderer.clear();

    renderer.setClearColor( 0xe0e0e0 ); // spinny box color?
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

        // scene.userData.controls.update();

        renderer.render( scene, camera );

    } );

}

