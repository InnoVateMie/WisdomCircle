import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GospelBackground() {
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

    // Create subtle floating light particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
      
      // Gold and warm white colors
      const colorChoice = Math.random();
      if (colorChoice > 0.6) {
        colorsArray[i] = 0.93;     // R (gold)
        colorsArray[i + 1] = 0.87; // G (gold)
        colorsArray[i + 2] = 0.68; // B (gold)
      } else {
        colorsArray[i] = 1;        // R (warm white)
        colorsArray[i + 1] = 0.95;  // G (warm white)
        colorsArray[i + 2] = 0.85;  // B (warm white)
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create subtle crosses (very few, very subtle)
    const crosses: Array<{ mesh: THREE.Group; rotationSpeed: number }> = [];
    const crossCount = 5; // Very few crosses

    for (let i = 0; i < crossCount; i++) {
      const crossGroup = new THREE.Group();
      
      // Very thin cross
      const verticalGeometry = new THREE.BoxGeometry(0.02, 1.2, 0.02);
      const horizontalGeometry = new THREE.BoxGeometry(0.3, 0.02, 0.02);
      
      const crossMaterial = new THREE.MeshBasicMaterial({
        color: 0xd4a843,
        transparent: true,
        opacity: 0.2 // Very subtle
      });

      const verticalPart = new THREE.Mesh(verticalGeometry, crossMaterial);
      const horizontalPart = new THREE.Mesh(horizontalGeometry, crossMaterial);
      
      horizontalPart.position.y = 0.3;
      
      crossGroup.add(verticalPart);
      crossGroup.add(horizontalPart);
      
      crossGroup.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );
      
      scene.add(crossGroup);
      crosses.push({
        mesh: crossGroup,
        rotationSpeed: Math.random() * 0.005 + 0.001
      });
    }

    // Create subtle light rays (divine light effect)
    const lightRays: Array<{ mesh: THREE.Mesh; speed: number }> = [];
    const rayCount = 3;

    for (let i = 0; i < rayCount; i++) {
      const geometry = new THREE.PlaneGeometry(0.5, 20);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      });

      const ray = new THREE.Mesh(geometry, material);
      ray.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      ray.rotation.z = (Math.random() - 0.5) * Math.PI * 0.5;
      
      scene.add(ray);
      lightRays.push({
        mesh: ray,
        speed: Math.random() * 0.01 + 0.005
      });
    }

    // Camera position
    camera.position.z = 25;

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

      // Very slow particle movement
      particlesMesh.rotation.y = elapsedTime * 0.01;
      particlesMesh.rotation.x = elapsedTime * 0.005;

      // Subtle cross animation
      crosses.forEach((cross) => {
        cross.mesh.rotation.y += cross.rotationSpeed;
        cross.mesh.position.y += Math.sin(elapsedTime * 0.5) * 0.005;
      });

      // Subtle light ray animation
      lightRays.forEach((ray) => {
        const material = ray.mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 0.05 + Math.sin(elapsedTime * ray.speed) * 0.05;
        ray.mesh.position.y += Math.sin(elapsedTime * ray.speed * 2) * 0.01;
      });

      // Gentle mouse interaction
      particlesMesh.rotation.x += mouseY * 0.01;
      particlesMesh.rotation.y += mouseX * 0.01;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.01;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.01;
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
      
      lightRays.forEach(ray => {
        ray.mesh.geometry.dispose();
        (ray.mesh.material as THREE.Material).dispose();
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
