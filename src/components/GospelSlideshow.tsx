import { useEffect, useRef } from 'react';

export default function GospelSlideshow() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create the slideshow container
    const container = document.createElement('div');
    container.className = 'absolute inset-0 overflow-hidden';
    container.style.zIndex = '0';

    // Gospel image URLs - using local downloaded images
    const gospelImages = [
      '/images/gospel/cross.png',
      '/images/gospel/bible.png', 
      '/images/gospel/church.png',
      '/images/gospel/dove.png',
      '/images/gospel/cross.png', // Repeat cross for more images
    ];

    // Create multiple sets of images for infinite scrolling
    const createImageSet = () => {
      const imageSet = document.createElement('div');
      imageSet.className = 'flex';
      imageSet.style.animation = 'slideGospelImages 30s linear infinite';
      
      gospelImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Gospel image ${index + 1}`;
        img.className = 'w-full h-full object-cover opacity-40';
        img.style.flexShrink = '0';
        img.style.width = '100vw';
        img.style.height = '100vh';
        
        // Add loading error handling
        img.onerror = () => {
          // If image fails to load, create a placeholder
          img.style.background = `linear-gradient(135deg, rgba(212, 168, 67, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`;
          img.alt = 'Gospel placeholder';
        };
        
        imageSet.appendChild(img);
      });
      
      return imageSet;
    };

    // Create multiple sets for continuous scrolling
    for (let i = 0; i < 3; i++) {
      container.appendChild(createImageSet());
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideGospelImages {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `;
    document.head.appendChild(style);

    mountRef.current.appendChild(container);

    // Cleanup
    return () => {
      if (mountRef.current && container.parentNode) {
        mountRef.current.removeChild(container);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
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
