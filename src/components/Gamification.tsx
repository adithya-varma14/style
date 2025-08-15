import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Target, Trophy, Star, Gamepad2, PenTool, Sparkles } from 'lucide-react';

// You will also need to import your CSS file, e.g., import './style.css';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  score?: number;
}

const Gamification = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const games: Game[] = [
    {
      id: 'splash',
      title: 'Splash Animation',
      description: 'Move your cursor inside the box to create liquid ripples',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-blue-400 to-purple-500',
      difficulty: 'Easy',
      duration: 'Unlimited'
    },
    {
      id: 'calligraphy',
      title: 'Digital Calligraphy',
      description: 'Practice your calligraphy skills with digital brush strokes on screen',
      icon: <PenTool className="w-8 h-8" />,
      color: 'from-green-400 to-teal-500',
      difficulty: 'Medium',
      duration: '15 min'
    }
  ];

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setGameScore(0);
    setIsPlaying(true);
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    setIsPlaying(false);
    if (selectedGame) {
      const updatedGame = { ...selectedGame, score };
      setSelectedGame(updatedGame);
    }
  };

const SplashGameInterface = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splashes, setSplashes] = useState<Array<{ x: number, y: number, id: number, color: string }>>([]);
  const splashId = useRef(0);
  // Set initial position off-screen to hide cursor until mouse moves
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 }); 

  // This effect sets up and cleans up the mouse event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCursorPos({ x, y });

      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        setGameScore(prev => prev + 1);
        
        const colors = ['#8a2be2', '#0000ff', '#1e90ff', '#87ceeb', '#add8e6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const newSplash = {
          x,
          y,
          id: splashId.current++,
          color
        };
        
        setSplashes(prev => [...prev, newSplash]);

        setTimeout(() => {
          setSplashes(prev => prev.filter(s => s.id !== newSplash.id));
        }, 800); // Duration should match CSS animation
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      {/* Control buttons */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <button
          onClick={() => setIsPlaying(false)}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all"
        >
          Exit Experience
        </button>
        <div className="px-4 py-2 rounded-full bg-white/15 text-white font-semibold">
          Score: {gameScore}
        </div>
      </div>

      {/* Main white rectangle container */}
      <div
        ref={containerRef}
        className="relative bg-white rounded-xl shadow-2xl overflow-hidden"
        style={{
          width: '720px',
          height: '420px',
          cursor: 'none' // Hide default cursor
        }}
      >
        {/* Permanent white background */}
        <div className="absolute inset-0 bg-white z-0" />

        {/* Splash effects */}
        {splashes.map((splash) => (
          <div
            key={splash.id}
            className="absolute rounded-full pointer-events-none animate-splash"
            style={{
              left: splash.x - 20,
              top: splash.y - 20,
              width: '40px',
              height: '40px',
              backgroundColor: splash.color,
              zIndex: 10
            }}
          />
        ))}

        {/* Custom cursor, now using state for position */}
        <div
          className="absolute w-4 h-4 rounded-full bg-black pointer-events-none"
          style={{
            left: cursorPos.x - 8,
            top: cursorPos.y - 8,
            zIndex: 20
          }}
        />
      </div>

      {/* Complete button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => handleGameComplete(gameScore)}
          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full hover:from-teal-600 hover:to-blue-600 transition-all"
        >
          Complete Experience
        </button>
      </div>
    </div>
  );
};
     
      
  // Calligraphy game remains unchanged
  const CalligraphyGameInterface = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState('#000000');

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }, [brushColor, brushSize]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    };

    const stopDrawing = () => setIsDrawing(false);

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setIsPlaying(false)}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg hover:bg-white transition-all duration-300"
          >
            Exit Calligraphy
          </button>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Digital Calligraphy</h2>
            <p className="text-gray-600">Practice your calligraphy skills with digital brush strokes</p>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Brush Size:</label>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600 w-8">{brushSize}</span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Color:</label>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
                className="w-10 h-8 rounded border"
              />
            </div>
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear Canvas
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 rounded-lg cursor-crosshair"
              style={{ width: '600px', height: '400px' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          <button
            onClick={() => handleGameComplete(Math.floor(Math.random() * 100) + 50)}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
          >
            Complete Calligraphy
          </button>
        </div>
      </motion.div>
    );
  };

  const GameInterface = ({ game }: { game: Game }) => {
    if (game.id === 'splash') return <SplashGameInterface />;
    if (game.id === 'calligraphy') return <CalligraphyGameInterface />;
    return null;
  };

  return (
    <section id="gamification" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Interactive Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immerse yourself in two unique digital experiences designed to 
              engage your senses and creativity. From mesmerizing animations 
              to artistic expression, discover new ways to connect with technology.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleGameSelect(game)}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center text-white shadow-lg`}>
                  <div className="text-white text-4xl">
                    {game.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                  {game.title}
                </h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {game.description}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {game.difficulty}
                  </span>
                  <span className="flex items-center">
                    <Play className="w-4 h-4 mr-1" />
                    {game.duration}
                  </span>
                </div>
                {game.score && (
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <Trophy className="w-4 h-4 mr-1" />
                      Score: {game.score}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isPlaying && selectedGame && (
          <GameInterface game={selectedGame} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gamification;