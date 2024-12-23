"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import ABoy from "./boy";

export default function HomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create the main scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5; // Make sure the camera is far enough to view the entire scene

    // Create the WebGLRenderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Create rotating cubes
    const materials = [
      new THREE.MeshBasicMaterial({ color: "red" }),
      new THREE.MeshBasicMaterial({ color: "blue" }),
      new THREE.MeshBasicMaterial({ color: "green" }),
      new THREE.MeshBasicMaterial({ color: "yellow" }),
      new THREE.MeshBasicMaterial({ color: "purple" }),
      new THREE.MeshBasicMaterial({ color: "orange" }),
    ];

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMesh1 = new THREE.Mesh(cubeGeometry, materials);
    const cubeMesh2 = new THREE.Mesh(cubeGeometry, materials);
    const cubeMesh3 = new THREE.Mesh(cubeGeometry, materials);

    cubeMesh2.position.x = 2;
    cubeMesh2.position.y = 2;
    cubeMesh3.position.z = 2;
    cubeMesh3.position.y = 2;

    const group = new THREE.Group();
    group.add(cubeMesh1);
    group.add(cubeMesh2);
    group.add(cubeMesh3);

    scene.add(group);

    // Create OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    // Disable zooming with mouse wheel
    controls.enableZoom = false;

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      cubeMesh1.rotation.x += 0.01;
      cubeMesh1.rotation.y += 0.01;

      cubeMesh2.rotation.x += 0.01;
      cubeMesh2.rotation.y += 0.01;

      cubeMesh3.rotation.x += 0.01;
      cubeMesh3.rotation.y += 0.01;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={canvasRef} className="p-4 rounded-lg" />
      <ABoy />
    </div>
  );
}

// "use client";

// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import ABoy from "./boy";

// export default function HomePage() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     // Ensure that WebGLRenderer, Scene, and Camera are only created once
//     const scene = new THREE.Scene(); // Create the main scene
//     const camera = new THREE.PerspectiveCamera(
//       35, // Field of view (in degrees)
//       window.innerWidth / window.innerHeight, // Aspect ratio (window size)
//       0.1, // Near clipping plane (everything closer than this will be clipped)
//       1000 // Far clipping plane (everything farther than this will be clipped)
//     );
//     camera.position.z = 5; // Set the camera position along the Z-axis

//     // Create the WebGLRenderer and set its size to match the window's size
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // Adjust the pixel ratio for better resolution on high-DPI screens (retina displays)
//     const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
//     renderer.setPixelRatio(maxPixelRatio);

//     // Append the renderer's DOM element (canvas) to the page
//     if (canvasRef.current) {
//       canvasRef.current.appendChild(renderer.domElement);
//     }

//     // Define materials for each face of the cube
//     const materials = [
//       new THREE.MeshBasicMaterial({ color: "red" }), // Front face
//       new THREE.MeshBasicMaterial({ color: "blue" }), // Back face
//       new THREE.MeshBasicMaterial({ color: "green" }), // Top face
//       new THREE.MeshBasicMaterial({ color: "yellow" }), // Bottom face
//       new THREE.MeshBasicMaterial({ color: "purple" }), // Right face
//       new THREE.MeshBasicMaterial({ color: "orange" }), // Left face
//     ];

//     // Create a basic cube geometry (1x1x1 unit)
//     const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

//     // Create three cube meshes with the defined materials
//     const cubeMesh1 = new THREE.Mesh(cubeGeometry, materials);
//     const cubeMesh2 = new THREE.Mesh(cubeGeometry, materials);
//     const cubeMesh3 = new THREE.Mesh(cubeGeometry, materials);

//     // Set positions for the cubes to avoid overlap
//     cubeMesh2.position.x = 2; // Shift the second cube along the X-axis
//     cubeMesh2.position.y = 2;
//     cubeMesh3.position.z = 2; // Shift the third cube along the X-axis
//     cubeMesh3.position.y = 2;

//     // Create a group to hold the cubes (this allows you to manipulate them together)
//     const group = new THREE.Group();
//     group.add(cubeMesh1); // Add the first cube to the group
//     group.add(cubeMesh2); // Add the second cube to the group
//     group.add(cubeMesh3); // Add the third cube to the group

//     // Create and add an axes helper for visual reference (X, Y, Z axes in the scene)
//     const axesHelper = new THREE.AxesHelper(5); // Axis size is set to 5 units
//     scene.add(axesHelper);

//     // group.position.setScalar(2);

//     // Add the group of cubes to the scene
//     scene.add(group);

//     // Initialize OrbitControls to allow user interaction (drag to rotate, zoom, pan)
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true; // Enable smooth (damped) movement
//     controls.dampingFactor = 0.25; // Set the damping factor for smoother controls
//     controls.screenSpacePanning = false; // Disable panning in screen space

//     // Handle window resizing
//     const handleResize = () => {
//       // Update renderer size to match the new window size
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Update camera aspect ratio and projection matrix based on the new window size
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//     };

//     // Listen for window resize events to adjust the scene's size
//     window.addEventListener("resize", handleResize);

//     // Animation loop for rendering the scene continuously
//     const animate = () => {
//       requestAnimationFrame(animate); // Request the next frame for smooth animation

//       // Update rotations for each cube
//       cubeMesh1.rotation.x += 0.01; // Rotate the first cube around the X-axis
//       cubeMesh1.rotation.y += 0.01; // Rotate the first cube around the Y-axis

//       cubeMesh2.rotation.x += 0.01; // Rotate the second cube around the X-axis
//       cubeMesh2.rotation.y += 0.01; // Rotate the second cube around the Y-axis

//       cubeMesh3.rotation.x += 0.01; // Rotate the third cube around the X-axis
//       cubeMesh3.rotation.y += 0.01; // Rotate the third cube around the Y-axis

//       // Update OrbitControls on each frame (if enableDamping is true)
//       controls.update();

//       // Render the scene from the perspective of the camera
//       renderer.render(scene, camera);
//     };

//     // Start the animation loop
//     animate();

//     // Cleanup function to remove event listeners and dispose of resources on component unmount
//     return () => {
//       cancelAnimationFrame(animate); // Stop the animation loop
//       window.removeEventListener("resize", handleResize); // Remove resize event listener
//       renderer.dispose(); // Dispose of the renderer to free resources
//       controls.dispose(); // Dispose of OrbitControls to avoid memory leaks
//     };
//   }, []);

//   return (
//     <div>
//       {/* The canvas element where the Three.js scene will be rendered */}
//       <div ref={canvasRef} className="p-4 rounded-lg" />
//       <ABoy />
//     </div>
//   );
// }
