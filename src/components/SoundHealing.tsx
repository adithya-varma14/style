import React, { useState } from 'react';
import { Play, Pause, Music, Volume2, Leaf } from 'lucide-react';

const soundSections = [
  {
    title: 'Healing Frequencies',
    sounds: [
      { name: '432Hz Healing', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', icon: <Music className="h-6 w-6 text-teal-500" /> },
      { name: '528Hz Miracle Tone', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', icon: <Music className="h-6 w-6 text-green-500" /> },
      { name: '639Hz Connection', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', icon: <Music className="h-6 w-6 text-purple-500" /> },
    ]
  },
  {
    title: 'Binaural Beats',
    sounds: [
      { name: 'Alpha Waves', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', icon: <Volume2 className="h-6 w-6 text-blue-500" /> },
      { name: 'Theta Waves', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', icon: <Volume2 className="h-6 w-6 text-indigo-500" /> },
      { name: 'Delta Waves', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', icon: <Volume2 className="h-6 w-6 text-pink-500" /> },
    ]
  },
  {
    title: 'Nature Sounds',
    sounds: [
      { name: 'Rainforest', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', icon: <Leaf className="h-6 w-6 text-green-500" /> },
      { name: 'Ocean Waves', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', icon: <Volume2 className="h-6 w-6 text-blue-400" /> },
      { name: 'Mountain Breeze', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', icon: <Leaf className="h-6 w-6 text-teal-400" /> },
    ]
  }
];

const SoundHealing = () => {
  const [current, setCurrent] = useState<{ section: number; sound: number } | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (sectionIdx: number, soundIdx: number) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new window.Audio(soundSections[sectionIdx].sounds[soundIdx].src);
    newAudio.play();
    setAudio(newAudio);
    setCurrent({ section: sectionIdx, sound: soundIdx });
    setIsPlaying(true);
    newAudio.onended = () => setIsPlaying(false);
  };

  const pauseSound = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-4 py-12 pt-24">
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center relative overflow-hidden h-[90vh] min-h-[700px] border border-teal-100 z-10 backdrop-blur-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Sound Healing</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Listen to healing frequencies and soundscapes. Let the vibrations restore your balance.
        </p>
        <div className="flex flex-col gap-10 w-full overflow-y-auto" style={{ maxHeight: '60vh' }}>
          {soundSections.map((section, sectionIdx) => (
            <div key={section.title} className="w-full">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">{section.title}</h2>
              <div className="flex flex-col gap-6 w-full">
                {section.sounds.map((sound, soundIdx) => (
                  <div key={sound.name} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${current && current.section === sectionIdx && current.sound === soundIdx && isPlaying ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-teal-300'}`}>
                    {sound.icon}
                    <span className="flex-1 font-medium">{sound.name}</span>
                    {isPlaying && current && current.section === sectionIdx && current.sound === soundIdx ? (
                      <button onClick={pauseSound} className="bg-yellow-400 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:bg-yellow-500 transition">
                        <Pause className="h-5 w-5" /> Pause
                      </button>
                    ) : (
                      <button onClick={() => playSound(sectionIdx, soundIdx)} className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:from-teal-600 hover:to-purple-600 transition">
                        <Play className="h-5 w-5" /> Play
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoundHealing; 