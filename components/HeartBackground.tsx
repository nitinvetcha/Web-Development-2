import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

export const HeartBackground: React.FC = () => {
  // Generate static random data for hearts
  const hearts = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${6 + Math.random() * 6}s`, // 6-12s duration
      animationDelay: `-${Math.random() * 8}s`, // Negative delay to start mid-animation
      scale: 0.5 + Math.random(),
      color: Math.random() > 0.5 ? 'text-pink-300' : 'text-rose-400',
      opacity: 0.3 + Math.random() * 0.5
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-pink-200">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${heart.color}`}
          style={{
            left: heart.left,
            bottom: '-10vh',
            animation: `floatUp ${heart.animationDuration} linear infinite`,
            animationDelay: heart.animationDelay,
            transform: `scale(${heart.scale})`,
            opacity: heart.opacity
          }}
        >
          <Heart fill="currentColor" size={24} />
        </div>
      ))}
    </div>
  );
};