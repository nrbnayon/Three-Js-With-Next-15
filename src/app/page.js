"use client"; // This is important to indicate the use of client-side code

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HomePage() {
  const canvasRef = useRef(null); // Create a reference for the canvas element

  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1, // near clipping plane
      1000 // far clipping plane
    );

    // Create a WebGL renderer and attach it to the canvas element
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ensure the canvasRef is not null, then append the renderer's DOM element to it
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Define materials with different colors for each face of the cube
    const materials = [
      new THREE.MeshBasicMaterial({ color: "red" }), // Front face
      new THREE.MeshBasicMaterial({ color: "blue" }), // Back face
      new THREE.MeshBasicMaterial({ color: "green" }), // Top face
      new THREE.MeshBasicMaterial({ color: "yellow" }), // Bottom face
      new THREE.MeshBasicMaterial({ color: "purple" }), // Right face
      new THREE.MeshBasicMaterial({ color: "orange" }), // Left face
    ];

    // Create a cube geometry with different materials for each face
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMesh = new THREE.Mesh(cubeGeometry, materials);

    // Add the cube to the scene
    scene.add(cubeMesh);

    // Set the camera position
    camera.position.z = 5;

    // Create an animation loop to render the scene orbit control
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the cube
      cubeMesh.rotation.x += 0.01;
      cubeMesh.rotation.y += 0.01;

      // Render the scene from the camera's perspective
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function to remove the renderer and stop animation when the component unmounts
    return () => {
      cancelAnimationFrame(animate);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      {/* Reference the canvas element */}
      <div ref={canvasRef} className="p-4 rounded-lg" />
    </div>
  );
}
