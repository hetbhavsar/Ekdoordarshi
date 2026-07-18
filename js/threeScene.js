
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x14030A);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;
/* ==========================
   LIGHTS
========================== */

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.2
);

scene.add(ambientLight);

const moonLight = new THREE.PointLight(
    0xffd7ea,
    60,
    100
);

moonLight.position.set(
    4,
    3,
    3
);

scene.add(moonLight);
const loader = new THREE.TextureLoader();

const moonTexture = loader.load(
    "assets/images/moon.webp"
);

const moon = new THREE.Mesh(

    new THREE.SphereGeometry(
        1,
        128,
        128
    ),

    new THREE.MeshStandardMaterial({

        map: moonTexture,

        roughness:1,

        metalness:0

    })

);

moon.position.set(
    3,
    1.5,
    -3
);

scene.add(moon);
const starGeometry =
new THREE.BufferGeometry();

const starCount = 12000;

const positions = [];

for(let i=0;i<starCount;i++){

    positions.push(

        (Math.random()-0.5)*200,

        (Math.random()-0.5)*200,

        (Math.random()-0.5)*200

    );

}

starGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        positions,
        3
    )

);

const stars = new THREE.Points(

    starGeometry,

    new THREE.PointsMaterial({

        color:0xffffff,

        size:.05,

        sizeAttenuation:true

    })

);

scene.add(stars);
function animate(){

    requestAnimationFrame(animate);

    moon.rotation.y += .0008;

    stars.rotation.y += .00003;

    renderer.render(
        scene,
        camera
    );

}

animate();
window.addEventListener(

    "resize",

    ()=>{

        camera.aspect=

        window.innerWidth/

        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

);
