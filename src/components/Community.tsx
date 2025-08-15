import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageCircle, Globe, Star, Award, ArrowRight, X, CheckCircle } from 'lucide-react';

const Community = () => {
  const [showModalIdx, setShowModalIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const events = [
    {
      title: 'Healing Circle Workshop',
      date: 'Dec 15, 2024',
      time: '7:00 PM EST',
      participants: 24,
      type: 'Virtual',
      location: 'Online',
      description: 'A supportive group session for healing and connection.'
    },
    {
      title: 'Mindfulness Retreat',
      date: 'Jan 20-22, 2025',
      time: '3 Days',
      participants: 12,
      type: 'In-Person',
      location: 'Nirvaha Center',
      description: 'A 3-day immersive retreat for mindfulness and growth.'
    },
    {
      title: 'Qigong Masterclass',
      date: 'Dec 28, 2024',
      time: '6:00 PM EST',
      participants: 18,
      type: 'Hybrid',
      location: 'Online & Hyderabad',
      description: 'Learn Qigong from a master instructor, in-person or online.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      content: 'Nirvaha helped me find balance between my demanding career and inner peace. The AI companion feels like having a wise friend available 24/7.',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Healthcare Worker',
      content: 'The community support during my burnout recovery was incredible. The healing circles provided the connection I desperately needed.',
      rating: 5,
      avatar: '👨‍⚕️'
    },
    {
      name: 'Priya Patel',
      role: 'Teacher',
      content: 'Combining ancient wisdom with modern science was exactly what I needed. The personalized approach made all the difference.',
      rating: 5,
      avatar: '👩‍🏫'
    }
  ];

  const handleConnectClick = (idx: number) => {
    setShowModalIdx(idx);
    setForm({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setShowModalIdx(null);
    setSubmitted(false);
  };

  return (
    <section id="community" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-2 sm:px-4 py-8 sm:py-12 pt-20 sm:pt-24">
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-3 sm:p-8 md:p-12 flex flex-col items-center relative overflow-hidden border border-teal-100 z-10 backdrop-blur-xl animate-fade-in">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Join Our Healing
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"> Community</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-3xl mx-auto">
            Connect with like-minded individuals, participate in healing circles, and grow together 
            on your wellness journey.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16 animate-fade-in w-full">
          {[
            { icon: Users, number: '1,000+', label: 'Active Members' },
            { icon: MessageCircle, number: '50,000+', label: 'Support Messages' },
            { icon: Calendar, number: '200+', label: 'Monthly Events' },
            { icon: Globe, number: '2+', label: 'Countries' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-10 sm:mb-16 animate-fade-in w-full">
          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 shadow border border-teal-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-teal-600 mr-2" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.type === 'Virtual' ? 'bg-blue-100 text-blue-600' :
                      event.type === 'In-Person' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 text-teal-500" />
                    <span>{event.date}</span>
                    <span className="ml-2">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Globe className="h-4 w-4 text-purple-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="text-sm text-gray-700 italic mb-2">{event.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.participants} participants</span>
                    </div>
                    <button
                      className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center space-x-1"
                      onClick={() => navigate('/register-event', { state: { event } })}
                    >
                      <span>Join Event</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-gradient-to-r from-teal-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              View All Events
            </button>
          </div>

          {/* Community Features */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 text-purple-600 mr-2" />
              Community Features
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Healing Circles',
                  description: 'Small group sessions for peer support and shared healing experiences',
                  icon: '🔄'
                },
                {
                  title: 'Expert Forums',
                  description: 'Ask questions and get guidance from certified therapists and wellness experts',
                  icon: '💭'
                },
                {
                  title: 'Wellness Challenges',
                  description: 'Monthly challenges to build healthy habits with community motivation',
                  icon: '🏆'
                },
                {
                  title: 'Resource Library',
                  description: 'Access to guided meditations, articles, and educational content',
                  icon: '📚'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="animate-fade-in w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">What Our Community Says</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 relative">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">"{testimonial.content}"</p>
                <button
                  className="mt-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium shadow hover:from-teal-600 hover:to-purple-600 transition"
                  onClick={() => handleConnectClick(idx)}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Modal rendered outside the grid to avoid layout issues */}
        {showModalIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md relative animate-fade-in">
              <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 transition"><X className="h-6 w-6" /></button>
              <h3 className="text-xl font-bold text-teal-700 mb-2">Connect with {testimonials[showModalIdx].name}</h3>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="rounded-xl border border-teal-200 p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="rounded-xl border border-teal-200 p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="rounded-xl border border-teal-200 p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200"
                  >
                    Send Connection Request
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center mt-4 animate-fade-in">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4 animate-bounce" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Request Sent!</h2>
                  <p className="text-lg text-gray-700 mb-4 text-center">Your connection request to {testimonials[showModalIdx].name} has been sent.</p>
                  <button onClick={handleClose} className="mt-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow hover:from-teal-600 hover:to-purple-600 transition">Close</button>
                </div>
              )}
            </div>
          </div>
        )}
        <style>{`
          .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
        `}</style>
      </div>
    </section>
  );
};

export default Community;