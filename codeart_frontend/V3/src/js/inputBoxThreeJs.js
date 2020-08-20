import * as THREE from 'three';
import { OrbitControls } from './lib/customOrbitControls';


var canvas;

var scenes = [], renderer;

init();
animate();

export function init() {

    canvas = document.getElementById( "canvas" );

    var geometries = [
        new THREE.BoxBufferGeometry( 1, 1, 1 ),
        new THREE.SphereBufferGeometry( 0.5, 12, 8 ),
        new THREE.DodecahedronBufferGeometry( 0.5 ),
        new THREE.CylinderBufferGeometry( 0.5, 0.5, 1, 12 )
    ];

    var content = document.getElementById( 'content' );
    
    // 40 == number of boxes
    for ( var i = 0; i < 40; i ++ ) {

        var scene = new THREE.Scene();

        // make a list item
        var element = document.createElement( 'div' );
        element.className = 'list-item';

        var sceneElement = document.createElement( 'div' );
        element.appendChild( sceneElement );

        // var descriptionElement = document.createElement( 'div' );
        // descriptionElement.innerText = 'Scene ' + ( i + 1 );
        // element.appendChild( descriptionElement );

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
        //BENNOTE: just create boxes!
        var geometry = geometries[0];


        var materials = [ 
            
            new THREE.MeshStandardMaterial( {
                color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
                roughness: 0.5,
                metalness: 0,
                flatShading: true
            }),

            new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
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

        var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( 1, 1, 1 );
        scene.add( light );


        ///CREATE A CANVAS///

        var aCanvas = document.createElement("canvas");
        var aCanvas2d = aCanvas.getContext("2d");

        //scale of text
        aCanvas.width = aCanvas.height = 128;
        aCanvas2d.fillStyle = "white";
        aCanvas2d.font = "60pt arial bold";

        var lettersA = ['&', '@', '%', '$'];
        var textValA = lettersA[ lettersA.length * Math.random() | 0 ];

        // numbers are X, Y for text position
        aCanvas2d.fillText(textValA, 34, 90);



        ///CREATE B CANVAS///

        var bCanvas = document.createElement("canvas");
        var bCanvas2d = bCanvas.getContext("2d");

        //scale of text
        bCanvas.width = bCanvas.height = 128;
        bCanvas2d.fillStyle = "white";
        bCanvas2d.font = "60pt arial bold";

        var lettersB = ['&', '@', '%', '$'];
        var textValB = lettersB[lettersB.length * Math.random() | 0];

        // numbers are X, Y for text position
        bCanvas2d.fillText(textValB, 34, 90);


       
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
        
        
        // for (var i = 0; i < textCanvasMeshes.length; i++){
        textCanvasMeshes[0].map.needsUpdate = true;
        textCanvasMeshes[1].map.needsUpdate = true;
        textCanvasMeshes[2].map.needsUpdate = true;
        textCanvasMeshes[3].map.needsUpdate = true;
        textCanvasMeshes[4].map.needsUpdate = true;
        textCanvasMeshes[5].map.needsUpdate = true;
        // }
        

        // var textMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), textCanvasMeshes);
        scene.add(new THREE.Mesh(geometry, textCanvasMeshes));

        /// END CREATE TEXT CANVAS ///

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

    // BENNOTE: check this thing periodically, kinda cool
    canvas.style.transform = `translateY(${window.scrollY}px)`;

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

