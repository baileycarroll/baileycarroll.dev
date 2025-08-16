'use client';

import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random floating elements
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      const elementCount = 12; // Increased number of floating elements

      for (let i = 0; i < elementCount; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100, // Percentage across screen
          y: Math.random() * 100, // Percentage down screen
          size: Math.random() * 6 + 1, // 1-7px
          opacity: Math.random() * 0.4 + 0.05, // 0.05-0.45
          delay: Math.random() * 3, // 0-3s delay
          duration: Math.random() * 4 + 3, // 3-7s duration
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Small floating particles */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-primary/30 floating-element"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        />
      ))}
      
      {/* Large geometric patterns with different animations */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-primary/8 rounded-full floating-element breathe" 
           style={{ animationDelay: '1s', animationDuration: '10s' }} />
      <div className="absolute top-3/4 right-1/4 w-32 h-32 border border-primary/6 rounded-lg floating-element drift" 
           style={{ animationDelay: '2s', animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-primary/7 rounded-full floating-element pulse-glow" 
           style={{ animationDelay: '0.5s', animationDuration: '9s' }} />
      
      {/* Additional floating elements */}
      <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-primary/5 rounded-full floating-element" 
           style={{ animationDelay: '3s', animationDuration: '7s' }} />
      <div className="absolute top-1/3 right-1/2 w-16 h-16 border border-primary/6 rounded-lg floating-element breathe" 
           style={{ animationDelay: '1.5s', animationDuration: '11s' }} />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/6 left-1/2 w-8 h-8 bg-primary/20 rounded-full pulse-glow" 
           style={{ animationDelay: '0s', animationDuration: '4s' }} />
      <div className="absolute bottom-1/6 right-1/6 w-6 h-6 bg-primary/25 rounded-full pulse-glow" 
           style={{ animationDelay: '2s', animationDuration: '5s' }} />
      <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-primary/30 rounded-full pulse-glow" 
           style={{ animationDelay: '1s', animationDuration: '6s' }} />
    </div>
  );
}
