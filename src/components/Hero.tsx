
import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, Users, Award, CheckCircle, Sparkles, Shield, Clock } from 'lucide-react';
import BlurText from './BlurText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WritingText } from './WritingText';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const heroRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const statsRef = useScrollAnimation();

  useEffect(() => {
    // Trigger animation when landing page starts rolling up (5.6s when splash starts disappearing)
    const timer = setTimeout(() => {
      console.log('[Hero] Starting text animation parallel to landing page roll');
      setShouldAnimate(true);
    }, 5600);
    return () => clearTimeout(timer);
  }, []);

  const handleJourneyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
    } else {
      navigate('/personalized-sessions');
    }
  };

  const features = [
    { icon: CheckCircle, text: 'AI-Powered Emotional Healing', color: 'text-emerald-600' },
    { icon: Shield, text: 'Ancient Wisdom Integration', color: 'text-blue-600' },
    { icon: Clock, text: 'Real-time Mood Detection', color: 'text-purple-600' },
    { icon: Sparkles, text: '24/7 Emergency Support', color: 'text-teal-600' }
  ];

  const stats = [
    { value: '1K+', label: 'Active Users', color: 'from-teal-500 to-cyan-500' },
    { value: '95%', label: 'Success Rate', color: 'from-emerald-500 to-green-500' },
    { value: '24/7', label: 'Support', color: 'from-purple-500 to-violet-500' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-20">
      {/* Enhanced Background Elements */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-white to-purple-50/80"
      />
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/30 to-emerald-400/30 rounded-full blur-xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-yellow-400/40 to-orange-400/40 rounded-full blur-lg"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            ref={heroRef.ref}
            className={`text-center lg:text-left space-y-6 lg:space-y-8 ${heroRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            {/* Trust Badge */}
            <motion.div 
              className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Trusted by 1,000+ Users</span>
              <Award className="h-4 w-4 text-teal-600" />
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-4 justify-center lg:justify-start">
                {shouldAnimate && (
                  <>
                    <WritingText
                      className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900"
                      text="Harmony of"
                      spacing={9}
                      transition={{ 
                        type: 'spring', 
                        bounce: 0, 
                        duration: 1.5, 
                        delay: 0.2
                      }}
                    />
                    <motion.span
                      className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent animate-gradient"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        type: 'spring', 
                        bounce: 0.3, 
                        duration: 1.2, 
                        delay: 0.8
                      }}
                    >
                      Mind
                    </motion.span>
                  </>
                )}
                {!shouldAnimate && (
                  <>
                    <span className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
                      Harmony of
                    </span>
                    <span className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                      Mind
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Blending Ancient Wisdom with Modern Science for Complete Mental Wellness
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              ref={featuresRef.ref}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${featuresRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color} flex-shrink-0`} />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {user ? (
                <div className="flex items-center gap-4">
                  <motion.div
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full font-semibold text-emerald-800"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="h-5 w-5" />
                    Welcome back, {user.name}!
                  </motion.div>
                </div>
              ) : (
                <motion.button
                  onClick={handleJourneyClick}
                  className="group bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 flex items-center justify-center space-x-3 animate-gradient"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Start Your Healing Journey</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
              
              <motion.button 
                className="group bg-white/90 backdrop-blur-md text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-white/50 hover:border-teal-300/50 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 text-lg"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="h-5 w-5 text-teal-600" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              ref={statsRef.ref}
              className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 ${statsRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div 
            className="relative max-w-lg mx-auto lg:max-w-none lg:mx-0 mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Card */}
            <motion.div 
              className="relative bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
              whileHover={{ y: -10, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Users className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Wellness Companion</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Personalized guidance combining Bhagavad Gita wisdom with modern therapy</p>
                </div>
                
                {/* Chat Interface Preview */}
                <div className="space-y-3">
                  <motion.div 
                    className="bg-gray-100/80 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    "I'm feeling overwhelmed with work stress..."
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white rounded-lg p-3 text-sm ml-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    "Let's explore this together. As the Gita teaches us about finding balance in action..."
                  </motion.div>
                </div>
                
                {/* Mood Indicators */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200/50">
                  <div className="text-xs text-gray-500 font-medium">Mood Detected: Stressed</div>
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-lg border border-white/20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-2xl">🧘</div>
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/20"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-xl">✨</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
