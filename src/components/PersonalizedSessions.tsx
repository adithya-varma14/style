import React, { useState } from 'react';
import { Calendar, CheckCircle, Users, UserCheck, MessageCircle, Heart, Star, Clock, Shield } from 'lucide-react';



const verifiedCompanions = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    specialization: 'Peer Support Groups',
    experience: '3+ years',
    rating: 4.8,
    availability: 'Mon-Fri, 6 PM - 9 PM',
    image: '👩‍🎓',
    description: 'Psychology student specializing in peer support and group dynamics',
    verified: true,
    interests: ['Anxiety Support', 'Study Groups', 'Mindfulness']
  },
  {
    id: 2,
    name: 'Alex Chen',
    specialization: 'Study Buddies',
    experience: '2+ years',
    rating: 4.7,
    availability: 'Tue-Sat, 4 PM - 8 PM',
    image: '👨‍🎓',
    description: 'Graduate student with expertise in academic support and motivation',
    verified: true,
    interests: ['Academic Support', 'Time Management', 'Goal Setting']
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    specialization: 'Wellness Accountability Partners',
    experience: '4+ years',
    rating: 4.9,
    availability: 'Mon-Sun, 7 AM - 10 PM',
    image: '👩‍⚕️',
    description: 'Wellness coach helping students maintain healthy habits and routines',
    verified: true,
    interests: ['Fitness', 'Nutrition', 'Mental Health']
  },
  {
    id: 4,
    name: 'Michael Johnson',
    specialization: 'Mindfulness Companions',
    experience: '5+ years',
    rating: 4.8,
    availability: 'Wed-Sun, 5 PM - 9 PM',
    image: '🧘‍♂️',
    description: 'Meditation practitioner and mindfulness guide for students',
    verified: true,
    interests: ['Meditation', 'Stress Relief', 'Mindful Living']
  },
  {
    id: 5,
    name: 'Lisa Wang',
    specialization: 'Emotional Support Buddies',
    experience: '3+ years',
    rating: 4.9,
    availability: 'Mon-Fri, 5 PM - 10 PM',
    image: '👩‍💼',
    description: 'Counseling student providing emotional support and active listening',
    verified: true,
    interests: ['Emotional Support', 'Active Listening', 'Crisis Support']
  },
  {
    id: 6,
    name: 'David Thompson',
    specialization: 'Meditation Partners',
    experience: '2+ years',
    rating: 4.6,
    availability: 'Tue-Sat, 6 PM - 9 PM',
    image: '🧘‍♂️',
    description: 'Yoga instructor and meditation guide for stress management',
    verified: true,
    interests: ['Yoga', 'Meditation', 'Breathing Techniques']
  }
];

const collaboratingDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cognitive Behavioral Therapy',
    experience: '15+ years',
    rating: 4.9,
    availability: 'Mon-Fri, 9 AM - 6 PM',
    image: '👩‍⚕️',
    description: 'Specialist in anxiety, depression, and stress management'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Mindfulness-Based Therapy',
    experience: '12+ years',
    rating: 4.8,
    availability: 'Tue-Sat, 10 AM - 7 PM',
    image: '👨‍⚕️',
    description: 'Expert in mindfulness, meditation, and spiritual wellness'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Trauma-Informed Therapy',
    experience: '18+ years',
    rating: 4.9,
    availability: 'Mon-Thu, 8 AM - 5 PM',
    image: '👩‍⚕️',
    description: 'Specialized in trauma healing and PTSD recovery'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialization: 'Life Coaching & Wellness',
    experience: '10+ years',
    rating: 4.7,
    availability: 'Wed-Sun, 11 AM - 8 PM',
    image: '👨‍⚕️',
    description: 'Life coach focusing on personal growth and goal achievement'
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialization: 'Anxiety & Depression Support',
    experience: '14+ years',
    rating: 4.8,
    availability: 'Mon-Fri, 9 AM - 6 PM',
    image: '👩‍⚕️',
    description: 'Dedicated to helping with anxiety, depression, and mood disorders'
  }
];

const PersonalizedSessions = () => {
  const [selectedMode, setSelectedMode] = useState<'therapy' | 'companion'>('therapy');
  const [form, setForm] = useState({ 
    mode: 'therapy' as 'therapy' | 'companion',
    selectedDoctor: null as number | null,
    selectedCompanion: null as number | null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModeChange = (mode: 'therapy' | 'companion') => {
    setSelectedMode(mode);
    setForm({ ...form, mode });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate doctor selection for therapy mode
    if (selectedMode === 'therapy' && !form.selectedDoctor) {
      alert('Please select a doctor for your therapy session.');
      return;
    }
    
    // Validate companion selection for companion mode
    if (selectedMode === 'companion' && !form.selectedCompanion) {
      alert('Please select a companion for your session.');
      return;
    }
    
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-teal-100 px-4 py-12 pt-24">
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center relative overflow-hidden">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Personalized Sessions</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Choose your preferred session mode and book a personalized experience.
        </p>
        
        {/* Mode Selection */}
        <div className="w-full mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => handleModeChange('therapy')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedMode === 'therapy'
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-200 bg-white/80 text-gray-600 hover:border-teal-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <UserCheck className="h-6 w-6" />
                <span className="font-semibold">Therapy Sessions</span>
                <span className="text-sm text-center">Professional therapy with certified doctors</span>
              </div>
            </button>
            
            <button
              onClick={() => handleModeChange('companion')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedMode === 'companion'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white/80 text-gray-600 hover:border-purple-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Users className="h-6 w-6" />
                <span className="font-semibold">Companion Mode</span>
                <span className="text-sm text-center">Peer support with other students</span>
              </div>
            </button>
          </div>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* Doctor Selection for Therapy Mode */}
            {selectedMode === 'therapy' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Doctor
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                  {collaboratingDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setForm({ ...form, selectedDoctor: doctor.id })}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        form.selectedDoctor === doctor.id
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 bg-white/80 hover:border-teal-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{doctor.image}</div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{doctor.name}</h3>
                        <p className="text-sm font-medium text-teal-600 mb-2">{doctor.specialization}</p>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700">{doctor.rating}</span>
                        </div>
                        {form.selectedDoctor === doctor.id && (
                          <div className="mt-3 pt-3 border-t border-teal-200">
                            <p className="text-xs text-gray-600 mb-2 leading-relaxed">{doctor.description}</p>
                            <div className="space-y-1 text-xs text-gray-500">
                              <div>Experience: {doctor.experience}</div>
                              <div className="flex items-center justify-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{doctor.availability}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Continue with Registration Button for Therapy Mode - Only show after doctor selection */}
            {selectedMode === 'therapy' && form.selectedDoctor && (
              <div className="w-full space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Book Session with {collaboratingDoctors.find(d => d.id === form.selectedDoctor)?.name}
                </h3>
                
                {/* Continue with Registration Button for Therapy Mode */}
                <div className="mt-6 pt-4 border-t border-teal-200">
            <button
                    type="button"
                    onClick={() => setSubmitted(true)}
              className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200"
            >
                    Continue with Registration
                  </button>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Create your profile and share your situation with Dr. {collaboratingDoctors.find(d => d.id === form.selectedDoctor)?.name}
                  </p>
                </div>
              </div>
            )}

            {/* Companion Selection for Companion Mode */}
            {selectedMode === 'companion' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Companion
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                  {verifiedCompanions.map((companion) => (
                    <div
                      key={companion.id}
                      onClick={() => setForm({ ...form, selectedCompanion: companion.id })}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        form.selectedCompanion === companion.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white/80 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{companion.image}</div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{companion.name}</h3>
                          {companion.verified && (
                            <Shield className="h-4 w-4 text-purple-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-purple-600 mb-2">{companion.specialization}</p>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700">{companion.rating}</span>
                        </div>
                        {form.selectedCompanion === companion.id && (
                          <div className="mt-3 pt-3 border-t border-purple-200">
                            <p className="text-xs text-gray-600 mb-2 leading-relaxed">{companion.description}</p>
                            <div className="space-y-1 text-xs text-gray-500">
                              <div>Experience: {companion.experience}</div>
                              <div className="flex items-center justify-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{companion.availability}</span>
                              </div>
                              <div className="mt-2">
                                <span className="text-xs font-medium text-purple-600">Interests:</span>
                                <div className="flex flex-wrap gap-1 mt-1 justify-center">
                                  {companion.interests.map((interest, index) => (
                                    <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Continue with Registration Button for Companion Mode - Only show after companion selection */}
            {selectedMode === 'companion' && form.selectedCompanion && (
              <div className="w-full space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Book Session with {verifiedCompanions.find(c => c.id === form.selectedCompanion)?.name}
                </h3>
                
                {/* Continue with Registration Button for Companion Mode */}
                <div className="mt-6 pt-4 border-t border-purple-200">
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    Continue with Registration
            </button>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Create your profile and share your situation with {verifiedCompanions.find(c => c.id === form.selectedCompanion)?.name}
                  </p>
                </div>
              </div>
            )}

          </form>
        ) : (
          <div className="flex flex-col items-center mt-8 animate-fade-in">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Ready for Registration!</h2>
            <p className="text-lg text-gray-700 mb-4 text-center">
              Perfect! You've selected a {selectedMode === 'therapy' ? 'therapy session' : 'companion session'}.
              {selectedMode === 'therapy' && form.selectedDoctor ? 
                ` You'll be registering with Dr. ${collaboratingDoctors.find(d => d.id === form.selectedDoctor)?.name}.` : 
                selectedMode === 'companion' && form.selectedCompanion ?
                ` You'll be registering with ${verifiedCompanions.find(c => c.id === form.selectedCompanion)?.name}.` :
                ` You'll be registering for a companion session.`
              }
            </p>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Next step: Create your profile and share your situation to get the best personalized experience.
              </p>
              <button
                onClick={() => {
                  // Store selected session data in localStorage for registration form
                  const sessionData = {
                    mode: selectedMode,
                    selectedDoctor: form.selectedDoctor,
                    selectedCompanion: form.selectedCompanion,
                    doctorName: form.selectedDoctor ? collaboratingDoctors.find(d => d.id === form.selectedDoctor)?.name : null,
                    companionName: form.selectedCompanion ? verifiedCompanions.find(c => c.id === form.selectedCompanion)?.name : null
                  };
                  localStorage.setItem('selectedSessionData', JSON.stringify(sessionData));
                  // Navigate to registration page
                  window.location.href = '/register';
                }}
                className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200"
              >
                Go to Registration
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalizedSessions; 