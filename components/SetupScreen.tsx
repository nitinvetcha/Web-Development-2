import React, { useState } from 'react';
import { Upload, Music, Image as ImageIcon, Heart } from 'lucide-react';
import { Button } from './Button';

interface SetupScreenProps {
  onStart: (music: File | null, images: File[]) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [music, setMusic] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMusic(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleStart = () => {
    if (images.length === 0) {
      alert("Please upload at least one image for the gallery!");
      return;
    }
    onStart(music, images);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 text-white">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-pulse fill-pink-500" />
          <h1 className="text-3xl font-bold font-handwriting mb-2">Valentine's Setup</h1>
          <p className="text-gray-300 text-sm">Configure your romantic experience before she sees it.</p>
        </div>

        <div className="space-y-6">
          {/* Music Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              1. Background Music (MP3)
            </label>
            <div className="relative group">
              <input
                type="file"
                accept="audio/mp3,audio/*"
                onChange={handleMusicChange}
                className="hidden"
                id="music-upload"
              />
              <label
                htmlFor="music-upload"
                className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  music ? 'border-green-400 bg-green-400/10' : 'border-gray-500 hover:border-pink-400 hover:bg-pink-400/5'
                }`}
              >
                <div className="text-center">
                  <Music className={`w-8 h-8 mx-auto mb-2 ${music ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className="text-sm block truncate max-w-[200px]">
                    {music ? music.name : 'Click to upload song'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Images Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              2. Our Memories (Images)
            </label>
            <div className="relative group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="hidden"
                id="images-upload"
              />
              <label
                htmlFor="images-upload"
                className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  images.length > 0 ? 'border-green-400 bg-green-400/10' : 'border-gray-500 hover:border-pink-400 hover:bg-pink-400/5'
                }`}
              >
                <div className="text-center">
                  <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${images.length > 0 ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className="text-sm block">
                    {images.length > 0 ? `${images.length} images selected` : 'Click to upload photos'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleStart} className="w-full justify-center text-lg py-4">
              Launch Experience
            </Button>
            <p className="text-xs text-center text-gray-400 mt-2">
              Note: Music will start automatically upon clicking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};