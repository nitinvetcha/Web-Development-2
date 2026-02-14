import React, { useState, useEffect, useRef } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { ProposalScreen } from './components/ProposalScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { HeartBackground } from './components/HeartBackground';
import { VolumeControl } from './components/VolumeControl';
import { AppState } from './types';

function App() {
  const [state, setState] = useState<AppState>({
    stage: 'setup',
    musicFile: null,
    imageFiles: [],
    audioUrl: null,
    imageUrls: [],
  });

  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
      state.imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // Audio Control Effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleStartExperience = (music: File | null, images: File[]) => {
    const audioUrl = music ? URL.createObjectURL(music) : null;
    const imageUrls = images.map(img => URL.createObjectURL(img));

    setState(prev => ({
      ...prev,
      musicFile: music,
      imageFiles: images,
      audioUrl,
      imageUrls,
      stage: 'proposal'
    }));
  };

  // Auto-play when stage changes to proposal
  useEffect(() => {
    if (state.stage === 'proposal' && audioRef.current && state.audioUrl) {
      audioRef.current.volume = isMuted ? 0 : volume;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    }
  }, [state.stage, state.audioUrl]);

  const handleSheSaidYes = () => {
    setState(prev => ({ ...prev, stage: 'gallery' }));
  };

  return (
    <div className="min-h-screen relative">
      {/* Global Audio Player */}
      {state.audioUrl && (
        <audio 
          ref={audioRef} 
          src={state.audioUrl} 
          loop 
          preload="auto" 
        />
      )}

      {/* Global Background & Volume Control (Visible after setup) */}
      {state.stage !== 'setup' && (
        <>
          <HeartBackground />
          <VolumeControl 
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onToggleMute={() => setIsMuted(prev => !prev)}
          />
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {state.stage === 'setup' && (
          <SetupScreen onStart={handleStartExperience} />
        )}

        {state.stage === 'proposal' && (
          <ProposalScreen onYes={handleSheSaidYes} />
        )}

        {state.stage === 'gallery' && (
          <GalleryScreen images={state.imageUrls} />
        )}
      </div>
    </div>
  );
}

export default App;