import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (val: number) => void;
  onToggleMute: () => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 bg-white/30 backdrop-blur-md p-2 rounded-full border border-white/40 shadow-sm hover:bg-white/40 transition-all">
      <button 
        onClick={onToggleMute}
        className="p-1 text-rose-600 hover:scale-110 transition-transform"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-20 md:w-24 h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
      />
    </div>
  );
};