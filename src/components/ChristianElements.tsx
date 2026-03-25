import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ChristianElements() {
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

    // Create Christian-themed elements
    const elements: Array<{ mesh: THREE.Group | THREE.Mesh; type: string }> = [];

    // Create cross shapes
    for (let i = 0; i < 3; i++) {
      // Vertical part of cross
      const verticalGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
      const horizontalGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
      
      const crossMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd4a843, // Gold
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6
      });

      const verticalPart = new THREE.Mesh(verticalGeometry, crossMaterial);
      const horizontalPart = new THREE.Mesh(horizontalGeometry, crossMaterial);
      
      horizontalPart.position.y = 0.3;
      
      const crossGroup = new THREE.Group();
      crossGroup.add(verticalPart);
      crossGroup.add(horizontalPart);
      
      crossGroup.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      scene.add(crossGroup);
      elements.push({ mesh: crossGroup, type: 'cross' });
    }

    // Create bible/book shapes
    for (let i = 0; i < 2; i++) {
      const bookGeometry = new THREE.BoxGeometry(1.2, 1.6, 0.2);
      const bookMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x8B4513, // Brown leather
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: 0.7
      });

      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      book.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      
      book.rotation.set(
        Math.random() * 0.3,
        Math.random() * 0.3,
        0
      );
      
      scene.add(book);
      elements.push({ mesh: book, type: 'bible' });
    }

    // Create dove shapes (simplified as wings)
    for (let i = 0; i < 2; i++) {
      const wingGeometry = new THREE.ConeGeometry(0.3, 1, 8);
      const wingMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // White
        metalness: 0.1,
        roughness: 0.9,
        transparent: true,
        opacity: 0.5
      });

      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      
      leftWing.rotation.z = -0.5;
      rightWing.rotation.z = 0.5;
      leftWing.position.x = -0.3;
      rightWing.position.x = 0.3;
      
      const doveGroup = new THREE.Group();
      doveGroup.add(leftWing);
      doveGroup.add(rightWing);
      
      doveGroup.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10
      );
      
      scene.add(doveGroup);
      elements.push({ mesh: doveGroup, type: 'dove' });
    }

    // Create ring shapes (for marriage/covenant)
    for (let i = 0; i < 2; i++) {
      const ringGeometry = new THREE.TorusGeometry(0.5, 0.1, 8, 20);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xC0C0C0, // Silver
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.6
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9
      );
      
      ring.rotation.x = Math.PI / 6;
      
      scene.add(ring);
      elements.push({ mesh: ring, type: 'ring' });
    }

    // Create candle shapes (for light/prayer)
    for (let i = 0; i < 2; i++) {
      const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
      const flameGeometry = new THREE.ConeGeometry(0.15, 0.3, 6);
      
      const candleMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFACD, // Light candle color
        metalness: 0,
        roughness: 0.8,
        transparent: true,
        opacity: 0.7
      });

      const flameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFA500, // Orange flame
        metalness: 0,
        roughness: 0.5,
        transparent: true,
        opacity: 0.8,
        emissive: 0xFFA500,
        emissiveIntensity: 0.3
      });

      const candle = new THREE.Mesh(candleGeometry, candleMaterial);
      const flame = new THREE.Mesh(flameGeometry, flameMaterial);
      flame.position.y = 0.65;
      
      const candleGroup = new THREE.Group();
      candleGroup.add(candle);
      candleGroup.add(flame);
      
      candleGroup.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      
      scene.add(candleGroup);
      elements.push({ mesh: candleGroup, type: 'candle' });
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xFFD700, 0.8, 50); // Warm gold light
    warmLight.position.set(10, 10, 10);
    scene.add(warmLight);

    const softLight = new THREE.PointLight(0xffffff, 0.4, 50);
    softLight.position.set(-10, 5, -10);
    scene.add(softLight);

    camera.position.z = 25;

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating and rotation for each element
      elements.forEach((element, index) => {
        // Gentle rotation
        element.mesh.rotation.y += 0.005;
        
        // Gentle floating motion
        element.mesh.position.y += Math.sin(elapsedTime + index) * 0.008;
        element.mesh.position.x += Math.cos(elapsedTime * 0.5 + index) * 0.003;
        
        // Special animations for specific elements
        if (element.type === 'dove') {
          element.mesh.rotation.z = Math.sin(elapsedTime + index) * 0.1;
        } else if (element.type === 'candle') {
          // Flicker effect for candle flame
          const flame = element.mesh.children[1];
          if (flame) {
            flame.scale.setScalar(1 + Math.sin(elapsedTime * 10) * 0.1);
          }
        }
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
      
      elements.forEach(element => {
        element.mesh.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
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
