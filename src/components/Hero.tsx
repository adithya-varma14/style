import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, Users, Award, CheckCircle, User } from 'lucide-react';
import BlurText from './BlurText';
import { motion } from 'framer-motion';
import { WritingText } from './WritingText';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
      navigate('/personalized-sessions'); // or any main feature page
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-purple-50"></div>
      
      {/* Decorative Elements */}
      <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-teal-200 to-transparent rounded-full opacity-60 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="hidden sm:block absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-yellow-200 to-transparent rounded-full opacity-50 animate-pulse delay-500"></div>

      <div className="container mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left px-1">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 shadow-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">Trusted by 1,000+ Users</span>
              <Award className="h-4 w-4 text-teal-600" />
            </div>

            {/* Main Heading */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-6">
                {shouldAnimate && (
                  <>
                    <WritingText
                      className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight text-gray-900"
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
                        className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"
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
                    <span className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
                      Harmony of
                    </span>
                    <span className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                      Mind
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              Blending Ancient Wisdom with Modern Science for Complete Mental Wellness
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {[
                'AI-Powered Emotional Healing',
                'Ancient Wisdom Integration',
                'Real-time Mood Detection',
                '24/7 Emergency Support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              {user ? (
                <div className="flex items-center gap-4">
               
                </div>
              ) : (
                <button
                  onClick={handleJourneyClick}
                  className="group bg-gradient-to-r from-teal-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg"
                >
                  <span>Start Your Healing Journey</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              
              <button className="group bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg">
                <Play className="h-5 w-5 text-teal-600" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative max-w-xs mx-auto lg:max-w-none lg:mx-0 mt-8 lg:mt-0">
            {/* Main Image Placeholder */}
            <div className="relative bg-gradient-to-br from-teal-100 to-purple-100 rounded-3xl p-4 sm:p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-600 to-purple-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">AI Wellness Companion</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Personalized guidance combining Bhagavad Gita wisdom with modern therapy</p>
                </div>
                
                {/* Chat Interface Preview */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-gray-700">
                    "I'm feeling overwhelmed with work stress..."
                  </div>
                  <div className="bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg p-2 sm:p-3 text-xs sm:text-sm ml-2 sm:ml-4">
                    "Let's explore this together. As the Gita teaches us about finding balance in action..."
                  </div>
                </div>
                
                {/* Mood Indicators */}
                <div className="flex justify-between items-center mt-4 sm:mt-6 pt-2 sm:pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">Mood Detected: Stressed</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="hidden sm:block absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg">
              <div className="text-2xl">🧘</div>
            </div>
            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
              <div className="text-xl">✨</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;