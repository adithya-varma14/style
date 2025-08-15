import React, { useState } from 'react';
import { Play, Pause, CheckCircle, Sun, Moon, Cloud, Hand, Bot, Music, Volume2, Leaf } from 'lucide-react';

const mudras = [
  { name: 'Gyan Mudra', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gyan_Mudra.jpg', desc: 'Improves concentration and memory.' },
  { name: 'Prana Mudra', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Prana_Mudra.jpg', desc: 'Boosts vitality and reduces fatigue.' },
  { name: 'Dhyana Mudra', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Dhyana_Mudra.jpg', desc: 'Promotes deep meditation and calm.' },
];

const natureSounds = [
  { name: 'Rainforest', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', icon: <Leaf className="h-6 w-6 text-green-500" /> },
  { name: 'Ocean Waves', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', icon: <Volume2 className="h-6 w-6 text-blue-500" /> },
  { name: 'Mountain Breeze', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', icon: <Music className="h-6 w-6 text-teal-500" /> },
];

const GuidedMeditation = () => {
  const [tab, setTab] = useState<'mudra' | 'guided' | 'sound'>('mudra');
  // Guided meditation state
  const [isMeditating, setIsMeditating] = useState(false);
  const [timer, setTimer] = useState(5 * 60); // 5 minutes
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [finished, setFinished] = useState(false);
  // Sound meditation state
  const [currentSound, setCurrentSound] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer logic for guided meditation
  const startMeditation = () => {
    setIsMeditating(true);
    setFinished(false);
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsMeditating(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };
  const pauseMeditation = () => {
    setIsMeditating(false);
    if (intervalId) clearInterval(intervalId);
  };
  const resetMeditation = () => {
    setTimer(5 * 60);
    setFinished(false);
    setIsMeditating(false);
    if (intervalId) clearInterval(intervalId);
  };
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Sound meditation logic
  const playSound = (index: number) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new window.Audio(natureSounds[index].src);
    newAudio.play();
    setAudio(newAudio);
    setCurrentSound(index);
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-2 sm:px-4 py-8 sm:py-12 pt-20 sm:pt-24">
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-3 sm:p-8 md:p-12 flex flex-col items-center relative overflow-hidden border border-teal-100 z-10 backdrop-blur-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Meditation Center</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center max-w-xs sm:max-w-md mx-auto">
          Choose your meditation style: Mudra, AI-Guided, or Sound.
        </p>
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8 w-full justify-center items-center">
          <button onClick={() => setTab('mudra')} className={`px-6 py-2 rounded-full font-semibold transition shadow ${tab === 'mudra' ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white' : 'bg-white border border-teal-200 text-teal-700 hover:bg-teal-50'}`}>Mudra Meditation</button>
          <button onClick={() => setTab('guided')} className={`px-6 py-2 rounded-full font-semibold transition shadow ${tab === 'guided' ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white' : 'bg-white border border-teal-200 text-teal-700 hover:bg-teal-50'}`}>Guided Meditation</button>
          <button onClick={() => setTab('sound')} className={`px-6 py-2 rounded-full font-semibold transition shadow ${tab === 'sound' ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white' : 'bg-white border border-teal-200 text-teal-700 hover:bg-teal-50'}`}>Sound Meditation</button>
        </div>
        {/* Tab Content */}
        {tab === 'mudra' && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg sm:text-2xl font-bold text-teal-700 mb-2 sm:mb-4 flex items-center gap-2"><Hand className="h-6 w-6" /> Mudra Meditation</h2>
            <p className="text-gray-700 mb-4 sm:mb-6 text-center text-sm sm:text-base">Follow the mudra instructions below. Hold each mudra for 2-5 minutes while breathing deeply and focusing on your inner calm.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full">
              {mudras.map((mudra) => (
                <div key={mudra.name} className="flex flex-col items-center bg-gradient-to-br from-teal-50 to-purple-50 rounded-xl p-6 shadow border border-teal-100">
                  <img src={mudra.img} alt={mudra.name} className="w-24 h-24 object-cover rounded-lg mb-3 shadow" />
                  <h4 className="font-semibold mb-1 text-center">{mudra.name}</h4>
                  <p className="text-sm text-gray-600 text-center">{mudra.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'guided' && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg sm:text-2xl font-bold text-purple-700 mb-2 sm:mb-4 flex items-center gap-2"><Bot className="h-6 w-6" /> AI-Guided Meditation</h2>
            <p className="text-gray-700 mb-4 sm:mb-6 text-center text-sm sm:text-base">Let our AI character guide you through a relaxing meditation. Close your eyes, follow the instructions, and breathe deeply.</p>
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <span className="text-3xl sm:text-5xl font-mono text-teal-600 mb-2">{formatTime(timer)}</span>
              <div className="flex gap-2 sm:gap-4">
                {!isMeditating && !finished && (
                  <button onClick={startMeditation} className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:from-teal-600 hover:to-purple-600 transition">
                    <Play className="h-5 w-5" /> Start
                  </button>
                )}
                {isMeditating && (
                  <button onClick={pauseMeditation} className="bg-yellow-400 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:bg-yellow-500 transition">
                    <Pause className="h-5 w-5" /> Pause
                  </button>
                )}
                <button onClick={resetMeditation} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:bg-gray-300 transition">
                  Reset
                </button>
              </div>
            </div>
            {!finished ? (
              <div className="bg-gradient-to-r from-teal-50 to-purple-50 rounded-xl p-6 text-center text-lg text-gray-700 shadow max-w-xl">
                <span className="block mb-2 font-semibold text-teal-700">AI says:</span>
                "Take a deep breath in... and out. Let your thoughts drift by like clouds. You are safe, supported, and at peace."
              </div>
            ) : (
              <div className="flex flex-col items-center mt-8 animate-fade-in">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Well done!</h2>
                <p className="text-lg text-gray-700 mb-4 text-center">You completed your meditation. Carry this peace with you.</p>
              </div>
            )}
          </div>
        )}
        {tab === 'sound' && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-4 flex items-center gap-2"><Music className="h-6 w-6" /> Sound Meditation</h2>
            <p className="text-gray-700 mb-4 sm:mb-6 text-center text-sm sm:text-base">Listen to nature sounds and meditate. Let the vibrations restore your balance.</p>
            <div className="flex flex-col gap-4 sm:gap-6 w-full mb-6 sm:mb-8">
              {natureSounds.map((sound, idx) => (
                <div key={sound.name} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${currentSound === idx ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-teal-300'}`}>
                  {sound.icon}
                  <span className="flex-1 font-medium">{sound.name}</span>
                  {isPlaying && currentSound === idx ? (
                    <button onClick={pauseSound} className="bg-yellow-400 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:bg-yellow-500 transition">
                      <Pause className="h-5 w-5" /> Pause
                    </button>
                  ) : (
                    <button onClick={() => playSound(idx)} className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:from-teal-600 hover:to-purple-600 transition">
                      <Play className="h-5 w-5" /> Play
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <span className="text-3xl sm:text-5xl font-mono text-teal-600 mb-2">{formatTime(timer)}</span>
              <div className="flex gap-2 sm:gap-4">
                {!isMeditating && !finished && (
                  <button onClick={startMeditation} className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:from-teal-600 hover:to-purple-600 transition">
                    <Play className="h-5 w-5" /> Start
                  </button>
                )}
                {isMeditating && (
                  <button onClick={pauseMeditation} className="bg-yellow-400 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:bg-yellow-500 transition">
                    <Pause className="h-5 w-5" /> Pause
                  </button>
                )}
                <button onClick={resetMeditation} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium flex items-center gap-2 shadow hover:bg-gray-300 transition">
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GuidedMeditation; 