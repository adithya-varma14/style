import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SplittingText } from './SplittingText';

interface SplashScreenProps {
  onFinish: () => void;
  onFlyToHeader?: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    // Start disappearing effect after animation completes
    const disappearTimer = setTimeout(() => {
      setIsDisappearing(true);
    }, 4400);

    // Call onFinish after disappearing animation completes
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 5600); // 1.2 seconds for disappearing animation

    return () => {
      clearTimeout(disappearTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
      }}
      animate={{
        opacity: isDisappearing ? 0 : 1,
        y: isDisappearing ? -50 : 0,
        scale: isDisappearing ? 0.95 : 1,
        background: isDisappearing 
          ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for smoother motion
      }}
    >
      <motion.div
        className="text-center"
        initial={{ 
          scale: 0 
        }}
        animate={{ 
          scale: 1 
        }}
        transition={{
          delay: 0.5,
          duration: 3.5,
          ease: [0.34, 1.56, 0.64, 1] // Enhanced bounce with more dramatic effect
        }}
      >
        <div
          style={{
            background: 'linear-gradient(90deg, #059669 0%, #9333ea 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(93, 52, 186, 0.18))',
            textShadow: '0 0 30px rgba(93, 52, 186, 0.25)'
          }}
        >
          <SplittingText
            className="text-8xl font-bold tracking-wider"
            text="Nirvaha"
            type="letters"
            delay={1000}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen; 