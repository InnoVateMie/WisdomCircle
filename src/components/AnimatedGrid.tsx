import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedGrid() {
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

    // Create animated grid lines
    const gridGroup = new THREE.Group();

    // Horizontal lines
    const horizontalLineCount = 30;
    for (let i = 0; i < horizontalLineCount; i++) {
      const geometry = new THREE.BoxGeometry(40, 0.02, 0.02);
      const material = new THREE.MeshBasicMaterial({
        color: 0xd4a843,
        transparent: true,
        opacity: 0.6
      });
      
      const line = new THREE.Mesh(geometry, material);
      line.position.y = (i - horizontalLineCount / 2) * 1.5;
      line.position.z = (Math.random() - 0.5) * 10;
      
      gridGroup.add(line);
    }

    // Vertical lines
    const verticalLineCount = 40;
    for (let i = 0; i < verticalLineCount; i++) {
      const geometry = new THREE.BoxGeometry(0.02, 30, 0.02);
      const material = new THREE.MeshBasicMaterial({
        color: 0xd4a843,
        transparent: true,
        opacity: 0.6
      });
      
      const line = new THREE.Mesh(geometry, material);
      line.position.x = (i - verticalLineCount / 2) * 1.5;
      line.position.z = (Math.random() - 0.5) * 10;
      
      gridGroup.add(line);
    }

    // Create animated flowing lines
    const flowingLines: Array<{ mesh: THREE.Mesh; speed: number; amplitude: number }> = [];
    const flowingLineCount = 8;

    for (let i = 0; i < flowingLineCount; i++) {
      const points = [];
      const pointCount = 50;
      
      for (let j = 0; j < pointCount; j++) {
        points.push(new THREE.Vector3(
          (j - pointCount / 2) * 0.8,
          Math.sin(j * 0.2) * 2,
          0
        ));
      }
      
      const geometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        100,
        0.05,
        8,
        false
      );
      
      const material = new THREE.MeshBasicMaterial({
        color: 0xd4a843, // Gold color
        transparent: true,
        opacity: 0.8
      });
      
      const line = new THREE.Mesh(geometry, material);
      line.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      );
      
      gridGroup.add(line);
      flowingLines.push({
        mesh: line,
        speed: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 2 + 1
      });
    }

    // Add some pulsing grid points at intersections
    const gridPoints: Array<{ mesh: THREE.Mesh; pulseSpeed: number }> = [];
    const pointCount = 20;

    for (let i = 0; i < pointCount; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: 0xd4a843,
        transparent: true,
        opacity: 0.8
      });
      
      const point = new THREE.Mesh(geometry, material);
      point.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 5
      );
      
      gridGroup.add(point);
      gridPoints.push({
        mesh: point,
        pulseSpeed: Math.random() * 0.05 + 0.02
      });
    }

    scene.add(gridGroup);

    // Camera position
    camera.position.z = 30;
    camera.position.y = 5;

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

      // Rotate entire grid slowly
      gridGroup.rotation.y = elapsedTime * 0.02;
      gridGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;

      // Animate individual grid lines
      gridGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          // Subtle wave motion for horizontal lines
          if (index < horizontalLineCount) {
            child.position.y += Math.sin(elapsedTime + index * 0.1) * 0.01;
          }
          // Subtle wave motion for vertical lines
          else if (index < horizontalLineCount + verticalLineCount) {
            child.position.x += Math.cos(elapsedTime + index * 0.1) * 0.01;
          }
        }
      });

      // Animate flowing lines
      flowingLines.forEach((flowingLine, index) => {
        flowingLine.mesh.rotation.z = Math.sin(elapsedTime * flowingLine.speed + index) * flowingLine.amplitude;
        flowingLine.mesh.position.y += Math.sin(elapsedTime * flowingLine.speed * 2 + index) * 0.02;
      });

      // Animate pulsing grid points
      gridPoints.forEach((point, index) => {
        const scale = 1 + Math.sin(elapsedTime * point.pulseSpeed + index) * 0.3;
        point.mesh.scale.setScalar(scale);
        const material = point.mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 0.2 + Math.sin(elapsedTime * point.pulseSpeed + index) * 0.2;
      });

      // Mouse interaction
      gridGroup.rotation.x += mouseY * 0.02;
      gridGroup.rotation.y += mouseX * 0.02;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.02;
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
      
      gridGroup.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
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
