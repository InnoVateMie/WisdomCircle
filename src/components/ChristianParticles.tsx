import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ChristianParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create Christian-themed particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60;
      
      // White and gold colors for Christian theme
      const colorChoice = Math.random();
      if (colorChoice > 0.7) {
        colorsArray[i] = 0.93;     // R (gold)
        colorsArray[i + 1] = 0.87; // G (gold)
        colorsArray[i + 2] = 0.68; // B (gold)
      } else {
        colorsArray[i] = 1;        // R (white)
        colorsArray[i + 1] = 1;    // G (white)
        colorsArray[i + 2] = 1;    // B (white)
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create small crosses scattered throughout
    const crosses: Array<{ mesh: THREE.Group; rotationSpeed: number; floatSpeed: number }> = [];
    const crossCount = 15;

    for (let i = 0; i < crossCount; i++) {
      // Create cross geometry
      const crossGroup = new THREE.Group();
      
      // Vertical part
      const verticalGeometry = new THREE.BoxGeometry(0.05, 0.8, 0.05);
      // Horizontal part
      const horizontalGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.05);
      
      const crossMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        metalness: 0.1,
        roughness: 0.9
      });

      const verticalPart = new THREE.Mesh(verticalGeometry, crossMaterial);
      const horizontalPart = new THREE.Mesh(horizontalGeometry, crossMaterial);
      
      horizontalPart.position.y = 0.2;
      
      crossGroup.add(verticalPart);
      crossGroup.add(horizontalPart);
      
      crossGroup.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 30
      );
      
      crossGroup.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      scene.add(crossGroup);
      crosses.push({
        mesh: crossGroup,
        rotationSpeed: Math.random() * 0.02 + 0.005,
        floatSpeed: Math.random() * 0.01 + 0.005
      });
    }

    // Create small doves (Holy Spirit symbols)
    const doves: Array<{ mesh: THREE.Group; speed: number; amplitude: number }> = [];
    const doveCount = 8;

    for (let i = 0; i < doveCount; i++) {
      const doveGroup = new THREE.Group();
      
      // Simple dove shape using cones for wings
      const wingGeometry = new THREE.ConeGeometry(0.2, 0.6, 4);
      const wingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        metalness: 0,
        roughness: 1
      });

      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      
      leftWing.rotation.z = -0.8;
      rightWing.rotation.z = 0.8;
      leftWing.position.x = -0.2;
      rightWing.position.x = 0.2;
      
      doveGroup.add(leftWing);
      doveGroup.add(rightWing);
      
      doveGroup.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 25
      );
      
      scene.add(doveGroup);
      doves.push({
        mesh: doveGroup,
        speed: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 2 + 1
      });
    }

    // Create small bible/book shapes
    const bibles: Array<{ mesh: THREE.Mesh; rotationSpeed: number }> = [];
    const bibleCount = 5;

    for (let i = 0; i < bibleCount; i++) {
      const bibleGeometry = new THREE.BoxGeometry(0.8, 1.0, 0.15);
      const bibleMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x8B4513, // Brown
        transparent: true,
        opacity: 0.7,
        metalness: 0,
        roughness: 0.8
      });

      const bible = new THREE.Mesh(bibleGeometry, bibleMaterial);
      bible.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 20
      );
      
      bible.rotation.set(
        Math.random() * 0.3,
        Math.random() * 0.3,
        0
      );
      
      scene.add(bible);
      bibles.push({
        mesh: bible,
        rotationSpeed: Math.random() * 0.01 + 0.005
      });
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xFFD700, 1, 100); // Warm gold light
    warmLight.position.set(15, 15, 15);
    scene.add(warmLight);

    const softLight = new THREE.PointLight(0xffffff, 0.5, 100);
    softLight.position.set(-15, 10, -15);
    scene.add(softLight);

    camera.position.z = 35;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.03;
      particlesMesh.rotation.x = elapsedTime * 0.01;

      // Animate crosses
      crosses.forEach((cross) => {
        cross.mesh.rotation.x += cross.rotationSpeed;
        cross.mesh.rotation.y += cross.rotationSpeed * 0.7;
        cross.mesh.position.y += Math.sin(elapsedTime * cross.floatSpeed) * 0.01;
      });

      // Animate doves (flying motion)
      doves.forEach((dove, index) => {
        dove.mesh.position.y += Math.sin(elapsedTime * dove.speed + index) * 0.02;
        dove.mesh.position.x += Math.cos(elapsedTime * dove.speed * 0.5 + index) * 0.01;
        dove.mesh.rotation.z = Math.sin(elapsedTime * dove.speed + index) * 0.1;
      });

      // Animate bibles
      bibles.forEach((bible) => {
        bible.mesh.rotation.y += bible.rotationSpeed;
        bible.mesh.position.y += Math.sin(elapsedTime * 0.5) * 0.005;
      });

      // Mouse interaction
      particlesMesh.rotation.x += mouseY * 0.03;
      particlesMesh.rotation.y += mouseX * 0.03;

      camera.position.x += (mouseX * 8 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 8 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      crosses.forEach(cross => {
        cross.mesh.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
      });
      
      doves.forEach(dove => {
        dove.mesh.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
      });
      
      bibles.forEach(bible => {
        bible.mesh.geometry.dispose();
        (bible.mesh.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
