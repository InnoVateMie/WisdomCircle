import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingElements() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating crystal shapes
    const crystals = [];
    const crystalCount = 8;

    for (let i = 0; i < crystalCount; i++) {
      // Create different crystal geometries
      const geometry = Math.random() > 0.5
        ? new THREE.OctahedronGeometry(Math.random() * 0.5 + 0.3, 0)
        : new THREE.TetrahedronGeometry(Math.random() * 0.5 + 0.3, 0);
      
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(0.15, 0.8, 0.6), // Gold
        transparent: true,
        opacity: 0.7,
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide
      });

      const crystal = new THREE.Mesh(geometry, material);
      
      // Position crystals in a circular pattern
      const angle = (i / crystalCount) * Math.PI * 2;
      const radius = 8;
      crystal.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      );
      
      crystal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(crystal);
      crystals.push({ mesh: crystal, rotationSpeed: Math.random() * 0.02 + 0.01 });
    }

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Add multiple point lights for dramatic lighting
    const lights = [];
    for (let i = 0; i < 3; i++) {
      const light = new THREE.PointLight(0xd4a843, 0.8, 50); // Gold lights
      const angle = (i / 3) * Math.PI * 2;
      light.position.set(
        Math.cos(angle) * 15,
        5,
        Math.sin(angle) * 15
      );
      scene.add(light);
      lights.push(light);
    }

    camera.position.z = 20;

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate and float crystals
      crystals.forEach((crystal, index) => {
        crystal.mesh.rotation.x += crystal.rotationSpeed;
        crystal.mesh.rotation.y += crystal.rotationSpeed * 0.7;
        
        // Floating motion
        crystal.mesh.position.y += Math.sin(elapsedTime + index) * 0.002;
        crystal.mesh.position.x += Math.cos(elapsedTime * 0.5 + index) * 0.001;
      });

      // Animate lights
      lights.forEach((light, index) => {
        const angle = elapsedTime * 0.2 + (index * Math.PI * 2 / 3);
        light.position.x = Math.cos(angle) * 15;
        light.position.z = Math.sin(angle) * 15;
        light.position.y = Math.sin(elapsedTime * 0.3) * 5 + 5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      crystals.forEach(crystal => {
        crystal.mesh.geometry.dispose();
        (crystal.mesh.material as THREE.Material).dispose();
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
