import React from 'react';
import { Brain, Heart, Users, Music, Palette, BookOpen, Zap, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  const services = [
    {
      icon: Brain,
      title: 'AI-Powered Emotional Healing',
      description: 'Personalized chatbot combining Bhagavad Gita wisdom with modern therapeutic techniques',
      features: ['Real-time mood detection', 'Emergency support alerts', 'Personalized guidance'],
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Palette,
      title: 'Creative Healing Modules',
      description: 'Express and process emotions through interactive creative activities',
      features: ['Haiku therapy games', 'Digital calligraphy', 'Storytelling journeys'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Music,
      title: 'Healing Frequencies',
      description: 'Scientifically tuned meditation music and binaural beats for wellness',
      features: ['432Hz healing tones', 'Guided meditation', 'Sleep enhancement'],
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Zap,
      title: 'Energy Practices',
      description: 'Ancient Qigong and Nei Dan practices adapted for modern life',
      features: ['Guided energy flow', 'Breathing techniques', 'Chakra balancing'],
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const handleServiceClick = (e: React.MouseEvent, service: any) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
    } else {
      // You can navigate to a service-specific page here
      // For now, just show an alert
      alert(`Welcome to ${service.title}!`);
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Personalized Wellness
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"> Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of ancient wisdom and cutting-edge technology, 
            tailored to your unique healing journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <button
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 text-left"
              onClick={e => handleServiceClick(e, service)}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Features Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Nirvaha?</h3>
            
            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: 'Privacy & Security First',
                  description: 'End-to-end encryption with HIPAA compliance for complete peace of mind'
                },
                {
                  icon: Heart,
                  title: 'Holistic Approach',
                  description: 'Addressing mind, body, and spirit through integrated wellness practices'
                },
                {
                  icon: Users,
                  title: 'Community Support',
                  description: 'Connect with like-minded individuals on similar healing journeys'
                },
                {
                  icon: BookOpen,
                  title: 'Evidence-Based',
                  description: 'Scientifically validated methods combined with time-tested wisdom'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🧘‍♀️</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Wellness Dashboard</h4>
                </div>
                
                {/* Mock Dashboard */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                    <span className="text-sm text-gray-700">Today's Mood</span>
                    <span className="text-sm font-semibold text-teal-600">Peaceful 😌</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-sm text-gray-700">Meditation Streak</span>
                    <span className="text-sm font-semibold text-purple-600">12 days 🔥</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                    <span className="text-sm text-gray-700">Wellness Score</span>
                    <span className="text-sm font-semibold text-green-600">85% ⬆️</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-teal-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  Continue Journey
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features List for Services */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">💬</span>
              <h4 className="font-semibold mb-2">Zenchat</h4>
              <p className="text-gray-600 text-center">AI-powered chat for emotional healing and support.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">🧘‍♂️</span>
              <h4 className="font-semibold mb-2">Guided Meditation</h4>
              <p className="text-gray-600 text-center">Personalized meditation sessions for relaxation and mindfulness.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">🎵</span>
              <h4 className="font-semibold mb-2">Sound Healing</h4>
              <p className="text-gray-600 text-center">Healing frequencies and binaural beats for wellness.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">🛒</span>
              <h4 className="font-semibold mb-2">Marketplace</h4>
              <p className="text-gray-600 text-center">Discover wellness products and services.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">💬</span>
              <h4 className="font-semibold mb-2">Discussion Rooms</h4>
              <p className="text-gray-600 text-center">Join community rooms for open discussions and support.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">🎉</span>
              <h4 className="font-semibold mb-2">Events</h4>
              <p className="text-gray-600 text-center">Participate in wellness events and workshops.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">🧑‍💼</span>
              <h4 className="font-semibold mb-2">Personalized Sessions</h4>
              <p className="text-gray-600 text-center">Book one-on-one sessions tailored to your needs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;