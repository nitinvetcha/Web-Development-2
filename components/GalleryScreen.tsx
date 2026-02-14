import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Heart } from 'lucide-react';

interface GalleryScreenProps {
  images: string[];
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('click', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  const handleNext = () => {
    setZoomLevel(1); // Reset zoom on slide change
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    setZoomLevel(1);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Main Image Container */}
      <div 
        className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-in-out',
          cursor: zoomLevel > 1 ? 'grab' : 'default'
        }}
      >
        <img 
          src={images[currentIndex]} 
          alt={`Memory ${currentIndex + 1}`} 
          className="max-h-[85vh] max-w-[95vw] object-contain shadow-2xl rounded-lg"
        />
      </div>

      {/* Floating Controls Overlay */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md p-3 rounded-full transition-all duration-500 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <button onClick={handlePrev} className="p-2 text-white hover:text-pink-400 hover:bg-white/10 rounded-full transition">
          <ChevronLeft size={24} />
        </button>

        <div className="flex items-center gap-2 px-4 border-l border-r border-white/20">
          <button onClick={handleZoomOut} className="p-2 text-white hover:text-pink-400 transition">
            <ZoomOut size={20} />
          </button>
          <span className="text-xs font-mono text-gray-400 w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={handleZoomIn} className="p-2 text-white hover:text-pink-400 transition">
            <ZoomIn size={20} />
          </button>
          <button onClick={handleResetZoom} className="p-2 text-white hover:text-pink-400 transition" title="Reset Zoom">
            <Maximize size={18} />
          </button>
        </div>

        <button onClick={handleNext} className="p-2 text-white hover:text-pink-400 hover:bg-white/10 rounded-full transition">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Top Overlay Message */}
      <div 
        className={`absolute top-20 md:top-8 left-1/2 transform -translate-x-1/2 text-white bg-pink-600/80 backdrop-blur-sm px-6 py-2 rounded-full transition-opacity duration-500 shadow-lg ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2">
           <Heart className="fill-white text-white animate-pulse" size={16} />
           <span className="font-handwriting text-xl">She said Yes!</span>
        </div>
      </div>
    </div>
  );
};