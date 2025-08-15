import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowRight, CheckCircle, X } from 'lucide-react';

const events = [
  {
    title: 'Full Moon Meditation',
    date: 'Aug 19, 2024',
    type: 'Virtual',
    participants: 40,
    time: '7:00 PM - 8:30 PM',
    location: 'Online (Zoom link will be sent)',
    description: 'A guided meditation session harnessing the energy of the full moon for deep relaxation and renewal. Suitable for all levels.'
  },
  {
    title: 'Sound Bath Experience',
    date: 'Sep 2, 2024',
    type: 'In-Person',
    participants: 18,
    time: '6:00 PM - 7:30 PM',
    location: 'Nirvaha Wellness Center, Hyderabad',
    description: 'Immerse yourself in healing vibrations with crystal bowls, gongs, and chimes. Bring your own mat and water bottle.'
  },
  {
    title: 'Wellness Retreat',
    date: 'Oct 10-12, 2024',
    type: 'Hybrid',
    participants: 25,
    time: '3 Days',
    location: 'Rishikesh & Online',
    description: 'A 3-day retreat with yoga, meditation, workshops, and nature walks. Join in-person or virtually. Includes healthy meals and resources.'
  }
];

const WellnessEvents = () => {
  const navigate = useNavigate();
  const [showFormIdx, setShowFormIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', event: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleJoinClick = (idx: number) => {
    setShowFormIdx(idx);
    setForm({ name: '', email: '', mobile: '', event: events[idx].title });
    setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setShowFormIdx(null);
    setSubmitted(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-2 sm:px-4 py-8 sm:py-12 pt-20 sm:pt-24">
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-3 sm:p-8 md:p-12 flex flex-col items-center relative overflow-hidden border border-teal-100 z-10 backdrop-blur-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Wellness Events</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center max-w-xs sm:max-w-md mx-auto">
          Join our upcoming events to connect, heal, and grow together.
        </p>
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          {events.map((event, idx) => (
            <div key={event.title} className="flex flex-col md:flex-row items-center gap-4 p-6 rounded-xl border-2 border-gray-100 bg-white hover:border-teal-300 transition-all relative">
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-gray-900 mb-1">{event.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Calendar className="h-4 w-4 text-teal-500" />
                  <span>{event.date}</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${event.type === 'Virtual' ? 'bg-blue-100 text-blue-600' : event.type === 'In-Person' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>{event.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Users className="h-4 w-4" />
                  <span>{event.participants} participants</span>
                </div>
                <div className="text-sm text-gray-500 mb-1">{event.time} | {event.location}</div>
                <div className="text-sm text-gray-700 italic mb-2">{event.description}</div>
              </div>
              <button
                className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow hover:from-teal-600 hover:to-purple-600 transition flex items-center gap-2"
                onClick={() => navigate('/register-event', { state: { event } })}
              >
                Join Event <ArrowRight className="h-4 w-4" />
              </button>
              {/* Registration Form Modal/Inline */}
              {showFormIdx === idx && (
                <div className="absolute left-0 top-full w-full bg-white/95 rounded-2xl shadow-2xl border border-teal-200 mt-4 z-20 p-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-teal-700">Register for {event.title}</h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-teal-600 transition"><X className="h-6 w-6" /></button>
                  </div>
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
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Your Mobile Number"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        className="rounded-xl border border-teal-200 p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                      />
                      <input
                        type="text"
                        name="event"
                        value={form.event}
                        readOnly
                        className="rounded-xl border border-teal-200 p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                      />
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200"
                      >
                        Complete Registration
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center mt-4 animate-fade-in">
                      <CheckCircle className="h-12 w-12 text-green-500 mb-4 animate-bounce" />
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Registration Successful!</h2>
                      <p className="text-lg text-gray-700 mb-4 text-center">Thank you for registering for {form.event}. We look forward to seeing you at the event!</p>
                      <button onClick={handleClose} className="mt-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow hover:from-teal-600 hover:to-purple-600 transition">Close</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Fade-in animation */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
};

export default WellnessEvents; 