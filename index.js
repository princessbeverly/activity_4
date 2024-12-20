import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from 'three'; 
import * as LilGui from 'dat.gui';



// Scene setup
const scene = new THREE.Scene();
const gui = new LilGui.GUI();
// House group
const house = new THREE.Group();
scene.add(house);


const walls = new THREE.Mesh(
    new THREE.TorusGeometry(4, 2.5, 10),
    new THREE.MeshStandardMaterial({ color: 0xdeb485 }) // Corrected: Use 0x for hex color
);
// Position the torus
walls.position.y = 1.25;

// Rotate the torus to lie flat
walls.rotation.x = Math.PI / 2;

// Add the torus to the house group
house.add(walls);

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(8, 2.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x88572f }) // Corrected: Use 0x for hex color
)

roof.rotation.y = Math.PI / 0.25;
roof.position.y = 4 + 0.5
house.add(roof)

const roof2 = new THREE.Mesh(
    new THREE.ConeGeometry(4, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0x88572f }) // Corrected: Use 0x for hex color
)

roof2.rotation.y = Math.PI / 0.25;
roof2.position.y = 2
roof2.position.z = 6.5
house.add(roof2)

const doorGeometry = new THREE.BoxGeometry(2, 2, 2); // Add depth for thickness
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x88572f });

const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.y = 1;
door.position.z = 6.5;
house.add(door);

const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 1, 8)
house.add(doorLight)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89a854' }); // Example valid color

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(6, 0.2, 6)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(6.5, 0.1, 6.5)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.9, 0.9, 0.9);
bush3.position.set(7.2, 0.2, 7.4)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(8, 0.05, 7.4)

house.add(bush1, bush2, bush3, bush4);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.5, 0.5, 0.5);
bush5.position.set(6.5, 0.2, 2)

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial);
bush6.scale.set(0.25, 0.25, 0.25);
bush6.position.set(6, 0.1, 2)

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial);
bush7.scale.set(0.9, 0.9, 0.9);
bush7.position.set(8, 0.2, 2)

const bush8 = new THREE.Mesh(bushGeometry, bushMaterial);
bush8.scale.set(0.15, 0.15, 0.15);
bush8.position.set(7.2, 0.05, 2)

house.add(bush5, bush6, bush7, bush8);

const bubblesGeometry = new THREE.SphereGeometry(1, 5, 5);
const bubbleMaterial = new THREE.MeshStandardMaterial({ color: '#89a854' });

// Create a group to hold all the bubbles
const bubblesGroup = new THREE.Group();

// Generate 50 bubbles
for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const bubble = new THREE.Mesh(bubblesGeometry, bubbleMaterial);
    bubble.position.set(x, 0.3, z);

    // Apply random rotations
    bubble.rotation.z = (Math.random() - 0.5) * 0.4;
    bubble.rotation.y = (Math.random() - 0.5) * 0.4;

    // Add the bubble to the group
    bubblesGroup.add(bubble);
}

// Add the bubbles group to the scene
scene.add(bubblesGroup);




// Add a plane as the base

const textureLoader = new TextureLoader(); // Create an instance of TextureLoader
const grassColorTexture = textureLoader.load('./texturegrass.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('./texturegrass.jpg');

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20), // Base size
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        roughness: 0.5,
        metalness: 0.5,
        displacementMap: grassColorTexture,
        displacementScale: 0.05,
     }) // Light gray color
);

// Add the UV2 attribute for the aoMap
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));

// Rotate and position the floor
floor.rotation.x = -Math.PI / 2; // Rotate to horizontal
floor.position.y = 0; // Position it at the bottom
floor.receiveShadow = true; // Allow it to receive shadows

scene.add(floor);



const loader = new GLTFLoader();
let model; // Store the loaded model
loader.load(
    './DONUTHOUSE.glb', // Ensure this path is correct relative to your HTML or JS file
    function (glb) {
        console.log(glb);
        model = glb.scene;

        // Adjust the size (scale) of the model
        model.scale.set(4, 4, 4); // Scale the model by a factor of 2 in all directions (x, y, z)

        // Adjust the location (position) of the model
        model.position.set(23, -0.50, -5); // Position the model at the origin (0, 0, 0)
        
        model.rotation.y = 260;
        // Add the model to the scene

        // Clone the model to create a duplicate
        const clonedModel = model.clone();
        clonedModel.rotation.y = 200
        // Adjust the position of the cloned model
        clonedModel.position.set(-20, -0.50, -7); // Position the cloned model at (-10, 0, 0)

        // Add the cloned model to the scene
        scene.add(clonedModel);

        scene.add(model);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
        console.error('An error occurred:', error);
    }
);
// Sizes
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};


const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
scene.add(ambientLight, moonLight);

const fog = new THREE.Fog('#262837', 1, 60)
scene.fog = fog

const parameters = {};
parameters.count = 1000;
parameters.size = 0.02;

const generateGalaxy = () => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Random radius
        const radius = Math.random() * 50;

        // Random spherical coordinates
        const theta = Math.random() * Math.PI * 2; // Horizontal angle
        const phi = Math.acos((Math.random() * 2) - 1); // Vertical angle

        // Convert spherical to Cartesian coordinates
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta); // x
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        positions[i3 + 2] = radius * Math.cos(phi); // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(2, 13, 2);
    scene.add(points);
};

generateGalaxy();

const parameters1 = {
    count: 1000,
    radius: 5,
    branches: 3,
    size: 0.02,
    randomness: 0.2,
    spin: 1,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
};

const generateSpiral = () => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters1.count * 3);
    const colors = new Float32Array(parameters1.count * 3);

    const insideColor = new THREE.Color(parameters1.insideColor);
    const outsideColor = new THREE.Color(parameters1.outsideColor);

    for (let i = 0; i < parameters1.count; i++) {
        const i3 = i * 3;

        // Calculate angle and radius
        const branchAngle = (i % parameters1.branches) / parameters1.branches * Math.PI * 2;
        const radius = Math.random() * parameters1.radius;

        // Spiral formula
        const spinAngle = radius * parameters1.spin;

        // Random offsets
        const randomX = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters1.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters1.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters1.randomness * radius;

        // Set positions
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX; // x
        positions[i3 + 1] = randomY;                                         // y
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ; // z

        // Set colors (gradient based on radius)
        const mixedColor = insideColor.clone().lerp(outsideColor, radius / parameters1.radius);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: parameters1.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(2, 13, 2);

    // Remove old points and add new ones
    scene.remove(scene.getObjectByName('spiral'));
    points.name = 'spiral';
    scene.add(points);
};

// GUI Controls
gui.addColor(parameters1, 'insideColor').onFinishChange(generateSpiral);
gui.addColor(parameters1, 'outsideColor').onFinishChange(generateSpiral);
gui.add(parameters1, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateSpiral);
gui.add(parameters1, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateSpiral);
gui.add(parameters1, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateSpiral);
gui.add(parameters1, 'branches').min(2).max(20).step(1).onFinishChange(generateSpiral);

// Generate initial spiral
generateSpiral();


const createTextSprite = (text, fontSize, color) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size and font
    canvas.width = 600;
    canvas.height = 256;
    context.font = `${fontSize}px Arial`;

    // Draw background and text
    context.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Optional background
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create texture and sprite
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    // Scale and return the sprite
    sprite.scale.set(10, 5, 1); // Adjust scale as needed
    return sprite;
};

// Create and add the text sprite to the scene
const textSprite = createTextSprite("Welcome to a Hobbit's House", 40, '#ffffff');
textSprite.position.set(0, 6, 0); // Position the sprite
scene.add(textSprite);

// Parameters
const snowParams = {
    count: 1000,
    area: 50,
    speed: 0.02,
    size: 0.1
};

// Snow Geometry and Material
const snowGeometry = new THREE.BufferGeometry();
const snowPositions = new Float32Array(snowParams.count * 3);

// Randomize initial snowflake positions
for (let i = 0; i < snowParams.count; i++) {
    snowPositions[i * 3] = (Math.random() - 0.5) * snowParams.area; // x
    snowPositions[i * 3 + 1] = Math.random() * snowParams.area;    // y
    snowPositions[i * 3 + 2] = (Math.random() - 0.5) * snowParams.area; // z
}
snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));

const snowMaterial = new THREE.PointsMaterial({
    color: '#ffffff',
    size: snowParams.size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8
});

// Create the snow particle system
const snow = new THREE.Points(snowGeometry, snowMaterial);
scene.add(snow);

// Animate Snowfall
function animateSnow() {
    const positions = snow.geometry.attributes.position.array;

    for (let i = 0; i < snowParams.count; i++) {
        const yIndex = i * 3 + 1; // Y-coordinate index
        positions[yIndex] -= snowParams.speed; // Move downward

        // Reset snowflake to top if it falls below a certain height
        if (positions[yIndex] < 0) {
            positions[yIndex] = snowParams.area; // Reset to the top
        }
    }

    snow.geometry.attributes.position.needsUpdate = true; // Notify Three.js to update positions
}

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: '#FEA7F8' });

const objects = []; // Array to store all interactive objects

// Function to create and place objects randomly
function createRandomObjects(count) {
    for (let i = 0; i < count; i++) {
        const randomSphere = new THREE.SphereGeometry(1, 32, 32); // Unique geometry for each object
        const shape = new THREE.Mesh(randomSphere, material.clone());
        shape.position.set(
            (Math.random() - 0.5) * 20, // Random x position
            (Math.random() - 0.5) * 20, // Random y position
            (Math.random() - 0.5) * 20  // Random z position
        );
        shape.name = `ToggleObject_${i}`; // Unique name for each object
        shape.userData.isSphere = true; // Track geometry state
        objects.push(shape);
        scene.add(shape);
    }
}

// Create 10 random objects
createRandomObjects(10);

// Add Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Raycaster and Mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Click Event
window.addEventListener('click', (event) => {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set up raycaster
    raycaster.setFromCamera(mouse, camera);

    // Detect intersections
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // Toggle between sphere and cube
        clickedObject.geometry.dispose(); // Clean up old geometry
        if (clickedObject.userData.isSphere) {
            clickedObject.geometry = boxGeometry.clone(); // Change to cube
        } else {
            clickedObject.geometry = sphereGeometry.clone(); // Change to sphere
        }
        clickedObject.userData.isSphere = !clickedObject.userData.isSphere; // Toggle state

        // Change position to a new random location
        clickedObject.position.set(
            (Math.random() - 0.5) * 20, // Random x position
            (Math.random() - 0.5) * 20, // Random y position
            (Math.random() - 0.5) * 20  // Random z position
        );

        console.log('New position:', clickedObject.position);
    }
});


// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.set(15, 3, 15);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.setClearColor('#262837');

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth damping effect

// Update on window resize
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);

    // Update snow animation
    animateSnow();

    // Update controls for damping effect
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
};
animate();

