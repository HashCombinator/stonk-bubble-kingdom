
import React, { useEffect, useRef, useState } from 'react';
import { Company } from '../types/Company';

interface Bubble {
  id: string;
  company: Company;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
}

interface BubbleCanvasProps {
  companies: Company[];
  onCompanyClick: (company: Company) => void;
  selectedCompany: Company | null;
}

const BubbleCanvas: React.FC<BubbleCanvasProps> = ({ companies, onCompanyClick, selectedCompany }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const bubblesRef = useRef<Bubble[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    // Initialize bubbles
    const maxMarketCap = Math.max(...companies.map(c => c.marketCap));
    const minMarketCap = Math.min(...companies.map(c => c.marketCap));
    const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.08;
    const minRadius = maxRadius * 0.2;

    bubblesRef.current = companies.map(company => {
      const marketCapRatio = company.hasActiveCoin 
        ? (company.marketCap - minMarketCap) / (maxMarketCap - minMarketCap)
        : 0;
      const radius = minRadius + (marketCapRatio * (maxRadius - minRadius));

      return {
        id: company.id,
        company,
        x: Math.random() * (dimensions.width - radius * 2) + radius,
        y: Math.random() * (dimensions.height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius,
        targetRadius: radius
      };
    });

    startAnimation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [companies, dimensions]);

  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      bubblesRef.current.forEach(bubble => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Bounce off walls
        if (bubble.x + bubble.radius > dimensions.width || bubble.x - bubble.radius < 0) {
          bubble.vx *= -1;
          bubble.x = Math.max(bubble.radius, Math.min(dimensions.width - bubble.radius, bubble.x));
        }
        if (bubble.y + bubble.radius > dimensions.height || bubble.y - bubble.radius < 0) {
          bubble.vy *= -1;
          bubble.y = Math.max(bubble.radius, Math.min(dimensions.height - bubble.radius, bubble.y));
        }

        // Check collision with other bubbles
        bubblesRef.current.forEach(otherBubble => {
          if (bubble.id === otherBubble.id) return;

          const dx = bubble.x - otherBubble.x;
          const dy = bubble.y - otherBubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = bubble.radius + otherBubble.radius;

          if (distance < minDistance) {
            // Calculate bounce
            const angle = Math.atan2(dy, dx);
            const targetX = otherBubble.x + Math.cos(angle) * minDistance;
            const targetY = otherBubble.y + Math.sin(angle) * minDistance;

            bubble.x = targetX;
            bubble.y = targetY;

            // Reverse velocities
            bubble.vx *= -0.8;
            bubble.vy *= -0.8;
          }
        });

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        
        if (bubble.company.hasActiveCoin) {
          ctx.fillStyle = bubble.company.color;
        } else {
          ctx.fillStyle = '#CCCCCC';
        }
        
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw company name
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${Math.max(12, bubble.radius * 0.3)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(bubble.company.name, bubble.x, bubble.y);

        // Draw CEO indicator
        if (bubble.company.ceo) {
          ctx.beginPath();
          ctx.arc(bubble.x + bubble.radius * 0.7, bubble.y - bubble.radius * 0.7, bubble.radius * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD700';
          ctx.fill();
          ctx.strokeStyle = '#FFA500';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${bubble.radius * 0.15}px Arial`;
          ctx.fillText('👑', bubble.x + bubble.radius * 0.7, bubble.y - bubble.radius * 0.7);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is within any bubble
    const clickedBubble = bubblesRef.current.find(bubble => {
      const dx = x - bubble.x;
      const dy = y - bubble.y;
      return Math.sqrt(dx * dx + dy * dy) < bubble.radius;
    });

    if (clickedBubble) {
      onCompanyClick(clickedBubble.company);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 cursor-pointer"
      onClick={handleCanvasClick}
    />
  );
};

export default BubbleCanvas;
