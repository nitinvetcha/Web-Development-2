import React, { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './Button';

interface ProposalScreenProps {
  onYes: () => void;
}

export const ProposalScreen: React.FC<ProposalScreenProps> = ({ onYes }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<{ top: string; left: string; position: 'static' | 'fixed' }>({
    top: 'auto',
    left: 'auto',
    position: 'static',
  });
  
  const hasMovedOnce = useRef(false);

  const moveNoButton = () => {
    const btnWidth = 150;
    const btnHeight = 60;
    const padding = 20;

    const maxLeft = window.innerWidth - btnWidth - padding;
    const maxTop = window.innerHeight - btnHeight - padding;

    const newLeft = Math.max(padding, Math.floor(Math.random() * maxLeft));
    const newTop = Math.max(padding, Math.floor(Math.random() * maxTop));

    setNoBtnPosition({
      position: 'fixed',
      left: `${newLeft}px`,
      top: `${newTop}px`,
    });
    
    hasMovedOnce.current = true;
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="z-10 text-center p-8 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 max-w-2xl mx-4">
        <h1 className="text-5xl md:text-7xl font-handwriting text-rose-600 mb-8 drop-shadow-sm leading-tight">
          Will you be my Valentine?
        </h1>
        
        <p className="text-gray-800 text-lg md:text-xl mb-12 font-medium">
          There's no one else I'd rather annoy for the rest of my life.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[100px]">
          <Button 
            onClick={onYes}
            className="text-xl px-12 py-4 shadow-pink-300/50 shadow-lg scale-110 hover:scale-125 z-20"
          >
            YES! <Heart className="fill-white ml-2" size={20} />
          </Button>

          <div
            onMouseEnter={moveNoButton}
            onClick={moveNoButton} // For touch devices
            style={
              noBtnPosition.position === 'fixed' 
                ? { position: 'fixed', top: noBtnPosition.top, left: noBtnPosition.left, transition: 'all 0.2s ease-out' } 
                : {}
            }
            className="z-50"
          >
            <Button 
              variant="secondary"
              className="text-lg px-8 py-3 bg-white/80 text-gray-500 hover:bg-white border border-gray-200"
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};