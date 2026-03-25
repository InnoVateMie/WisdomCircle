import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Text3D() {
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

    // Create 3D text geometry using BoxGeometry as placeholder (for actual text, we'd need TextGeometry)
    const textGroup = new THREE.Group();
    
    // Create multiple boxes to form text-like shapes
    const textMaterials = [
      new THREE.MeshPhysicalMaterial({
        color: 0xd4a843, // Gold
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // White
        metalness: 0.6,
        roughness: 0.3,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      })
    ];

    // Create floating text-like elements
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BoxGeometry(
        Math.random() * 0.5 + 0.2,
        Math.random() * 0.5 + 0.2,
        Math.random() * 0.5 + 0.2
      );
      
      const material = textMaterials[Math.floor(Math.random() * textMaterials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      textGroup.add(mesh);
    }

    scene.add(textGroup);

    // Add torus knot for visual interest
    const torusGeometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4a843,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      wireframe: true
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    torusKnot.position.z = -5;
    scene.add(torusKnot);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xd4a843, 2);
    spotLight.position.set(10, 10, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-10, -10, 5);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate text group
      textGroup.rotation.x = elapsedTime * 0.1;
      textGroup.rotation.y = elapsedTime * 0.15;

      // Animate individual text elements
      textGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
          child.position.y += Math.sin(elapsedTime + index) * 0.01;
        }
      });

      // Rotate torus knot
      torusKnot.rotation.x += 0.02;
      torusKnot.rotation.y += 0.03;
      torusKnot.rotation.z += 0.01;

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
      
      textGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      
      torusGeometry.dispose();
      torusMaterial.dispose();
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
