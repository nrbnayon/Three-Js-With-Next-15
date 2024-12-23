"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ABoy() {
  const boyRef = useRef(null);

  useEffect(() => {
    // Create the boy model (head, body, arms, legs)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5; // Ensure camera is placed far enough to see the entire scene

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (boyRef.current) {
      boyRef.current.appendChild(renderer.domElement);
    }

    // Head (sphere)
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0cb });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;

    // Body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.2;

    // Arms (cylinders)
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
    const armMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.7, 0.5, 0);
    leftArm.rotation.z = Math.PI / 4;

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.7, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 4;

    // Legs (cylinders)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
    const legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.3, -0.7, 0);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.3, -0.7, 0);

    // Grouping the body parts
    const boyGroup = new THREE.Group();
    boyGroup.add(head);
    boyGroup.add(body);
    boyGroup.add(leftArm);
    boyGroup.add(rightArm);
    boyGroup.add(leftLeg);
    boyGroup.add(rightLeg);

    // Adding to the scene
    scene.add(boyGroup);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={boyRef} />;
}

// "use client";

// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// export default function ABoy() {
//   const boyRef = useRef(null);

//   useEffect(() => {
//     // Create the boy model (head, body, arms, legs)
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       35,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     if (boyRef.current) {
//       boyRef.current.appendChild(renderer.domElement);
//     }

//     // Head (sphere)
//     const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
//     const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0cb });
//     const head = new THREE.Mesh(headGeometry, headMaterial);
//     head.position.y = 1.5;

//     // Body (cylinder)
//     const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32);
//     const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
//     const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
//     body.position.y = 0.2;

//     // Arms (cylinders)
//     const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
//     const armMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const leftArm = new THREE.Mesh(armGeometry, armMaterial);
//     leftArm.position.set(-0.7, 0.5, 0);
//     leftArm.rotation.z = Math.PI / 4;

//     const rightArm = new THREE.Mesh(armGeometry, armMaterial);
//     rightArm.position.set(0.7, 0.5, 0);
//     rightArm.rotation.z = -Math.PI / 4;

//     // Legs (cylinders)
//     const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
//     const legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
//     const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
//     leftLeg.position.set(-0.3, -0.7, 0);

//     const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
//     rightLeg.position.set(0.3, -0.7, 0);

//     // Grouping the body parts
//     const boyGroup = new THREE.Group();
//     boyGroup.add(head);
//     boyGroup.add(body);
//     boyGroup.add(leftArm);
//     boyGroup.add(rightArm);
//     boyGroup.add(leftLeg);
//     boyGroup.add(rightLeg);

//     // Adding to the scene
//     scene.add(boyGroup);

//     // Animation loop
//     const animate = function () {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={boyRef} />;
// }
