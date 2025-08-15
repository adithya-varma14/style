import React, { useState } from 'react';
import { Briefcase, GraduationCap, Users, CheckCircle, Mail, Building, Phone, Download, ArrowRight } from 'lucide-react';

const ProfessionalPage = () => {
  const [form, setForm] = useState({ name: '', email: '', org: '', type: 'Company', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-4 py-12 pt-24 relative overflow-hidden">
      {/* Floating Gradient Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute animate-float-slow left-10 top-10 w-48 h-48 bg-gradient-to-br from-teal-300 to-purple-200 rounded-full opacity-20 blur-2xl" />
        <div className="absolute animate-float-medium right-20 top-32 w-32 h-32 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-20 blur-2xl" />
        <div className="absolute animate-float-fast left-1/2 bottom-10 w-56 h-56 bg-gradient-to-br from-purple-200 to-teal-100 rounded-full opacity-20 blur-2xl" />
      </div>
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center relative overflow-hidden border border-teal-100 z-10 backdrop-blur-xl animate-fade-in">
        {/* Page Title & Intro */}
        <div className="w-full flex flex-col items-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 text-center tracking-tight bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">Partner with Nirvaha</h1>
          <p className="text-lg text-gray-700 mb-4 text-center max-w-2xl">
            Choose the best collaboration for your organization or school. Our programs are designed to improve mental health, boost productivity, and create a happier community.
          </p>
        </div>

        {/* Collaboration Options */}
        <div className="w-full grid md:grid-cols-2 gap-8 mb-12 animate-fade-in">
          {/* Corporate Collaboration Card */}
          <div className="bg-gradient-to-br from-teal-100 to-white rounded-2xl p-8 shadow-xl border-2 border-teal-200 flex flex-col items-center hover:scale-[1.025] hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-7 w-7 text-teal-600" />
              <h2 className="text-2xl font-bold text-teal-700">For Companies</h2>
            </div>
            <p className="text-gray-700 mb-4">Empower your employees with wellness programs, stress management, and 24/7 support. Perfect for businesses of any size.</p>
            <ul className="list-disc pl-8 text-gray-700 mb-4">
              <li>Wellness programs for employees</li>
              <li>Stress management workshops (onsite & online)</li>
              <li>24/7 emotional support chat</li>
              <li>Executive coaching & leadership training</li>
              <li>Team-building wellness events</li>
              <li>Confidential teletherapy</li>
              <li>Monthly progress reports</li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-teal-50 border border-teal-200">
              <h3 className="font-semibold text-teal-700 mb-4 text-lg text-center">Pricing</h3>
              <div className="grid grid-cols-1 gap-3 mb-2 w-full">
                <div className="bg-teal-200/60 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-teal-900 text-xl text-center">₹15,000<span className="text-base font-normal">/month</span></span>
                  <span className="text-sm text-teal-800 text-center">Starter (up to 50 employees)</span>
                </div>
                <div className="bg-teal-300/60 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-teal-900 text-xl text-center">₹25,000<span className="text-base font-normal">/month</span></span>
                  <span className="text-sm text-teal-800 text-center">Growth (up to 200 employees)</span>
                </div>
                <div className="bg-teal-400/60 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-teal-900 text-xl text-center">Custom</span>
                  <span className="text-sm text-teal-800 text-center">Enterprise (200+ employees)</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">All plans include onboarding, analytics, and dedicated support.</p>
              <a href="/brochure-corporate.pdf" download className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-teal-600 hover:to-purple-600 transition text-sm">
                <Download className="h-4 w-4" /> Download Corporate Brochure
              </a>
            </div>
          </div>
          {/* School Collaboration Card */}
          <div className="bg-gradient-to-br from-purple-100 to-white rounded-2xl p-8 shadow-xl border-2 border-purple-200 flex flex-col items-center hover:scale-[1.025] hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="h-7 w-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-700">For Schools</h2>
            </div>
            <p className="text-gray-700 mb-4">Support students and staff with counseling, wellness events, and parent engagement. Ideal for schools and colleges.</p>
            <ul className="list-disc pl-8 text-gray-700 mb-4">
              <li>Student counseling & mental health support</li>
              <li>Wellness programs for staff</li>
              <li>On-campus & online wellness events</li>
              <li>Peer support groups</li>
              <li>Workshops on emotional intelligence</li>
              <li>Parent engagement sessions</li>
              <li>Annual wellness report</li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-purple-50 border border-purple-200">
              <h3 className="font-semibold text-purple-700 mb-4 text-lg text-center">Pricing & Requirements</h3>
              <div className="grid grid-cols-1 gap-3 mb-2 w-full">
                <div className="bg-purple-200/60 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-purple-900 text-xl text-center">₹10,000<span className="text-base font-normal">/month</span></span>
                  <span className="text-sm text-purple-800 text-center">Standard (up to 300 students)</span>
                </div>
                <div className="bg-purple-300/60 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-purple-900 text-xl text-center">₹18,000<span className="text-base font-normal">/month</span></span>
                  <span className="text-sm text-purple-800 text-center">Premium (up to 800 students)</span>
                </div>
                <div className="bg-purple-400/60 rounded-lg p-3 flex flex-col items-center">
                  <span className="font-bold text-purple-900 text-xl text-center">Custom</span>
                  <span className="text-sm text-purple-800 text-center">Contact us for larger institutions</span>
                </div>
              </div>
              <div className="mt-2 p-3 rounded-lg bg-purple-100 border border-purple-200">
                <span className="font-semibold text-purple-700">Requirements:</span>
                <ul className="list-disc pl-6 text-gray-700 text-sm mt-1">
                  <li>Wellness coordinator at school</li>
                  <li>Access to student groups</li>
                  <li>Parental consent for counseling</li>
                </ul>
              </div>
              <a href="/brochure-school.pdf" download className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-purple-600 hover:to-teal-600 transition text-sm">
                <Download className="h-4 w-4" /> Download School Brochure
              </a>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How Collaboration Works</h2>
          <ol className="list-decimal pl-6 text-gray-700 text-lg space-y-2">
            <li>Contact us using the form below.</li>
            <li>We schedule a discovery call to understand your needs.</li>
            <li>Get a custom proposal and demo.</li>
            <li>Onboard your team or students to Nirvaha.</li>
            <li>Receive ongoing support and progress updates.</li>
          </ol>
        </div>

        {/* Collaboration Types */}
        <div className="w-full grid md:grid-cols-2 gap-8 mb-12 animate-fade-in">
          {/* Corporate Collaboration Card */}
          <div className="bg-gradient-to-br from-teal-100 to-white rounded-2xl p-8 shadow-xl border-2 border-teal-200 flex flex-col hover:scale-[1.025] hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-7 w-7 text-teal-600" />
              <h2 className="text-2xl font-bold text-teal-700">Corporate Collaboration</h2>
            </div>
            <ul className="list-disc pl-8 text-gray-700 mb-4">
              <li>Custom wellness programs for employees</li>
              <li>Onsite & virtual stress management workshops</li>
              <li>AI-powered emotional support (24/7 chat)</li>
              <li>Executive coaching & leadership development</li>
              <li>Team-building wellness events</li>
              <li>Confidential teletherapy & crisis support</li>
              <li>Monthly analytics & impact reports</li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-teal-50 border border-teal-200">
              <h3 className="font-semibold text-teal-700 mb-2">Pricing</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Starter: ₹15,000/month (up to 50 employees)</li>
                <li>Growth: ₹25,000/month (up to 200 employees)</li>
                <li>Enterprise: Custom pricing for 200+ employees</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">All plans include onboarding, analytics, and dedicated support.</p>
            </div>
          </div>
          {/* School Collaboration Card */}
          <div className="bg-gradient-to-br from-purple-100 to-white rounded-2xl p-8 shadow-xl border-2 border-purple-200 flex flex-col hover:scale-[1.025] hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-7 w-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-700">School Collaboration</h2>
            </div>
            <ul className="list-disc pl-8 text-gray-700 mb-4">
              <li>Student counseling & mental health resources</li>
              <li>Faculty & staff wellness programs</li>
              <li>On-campus & virtual wellness events</li>
              <li>Peer support & discussion rooms for students</li>
              <li>Workshops on emotional intelligence & resilience</li>
              <li>Parent engagement sessions</li>
              <li>Annual wellness impact report</li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-purple-50 border border-purple-200">
              <h3 className="font-semibold text-purple-700 mb-2">Pricing & Requirements</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Standard: ₹10,000/month (up to 300 students)</li>
                <li>Premium: ₹18,000/month (up to 800 students)</li>
                <li>Custom: Contact us for larger institutions</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">Requirements: Dedicated wellness coordinator, access to student groups, and parental consent for counseling.</p>
            </div>
          </div>
        </div>


        {/* Download Brochure & Requirements */}
        <div className="w-full flex flex-col md:flex-row gap-6 mb-12 justify-center items-center animate-fade-in">
          <a href="/brochure.pdf" download className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-teal-600 hover:to-purple-600 transition text-center text-lg hover:scale-105">
            <Download className="h-5 w-5" /> Company Brochure
          </a>
          <a href="/collaboration-requirements.pdf" download className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-teal-600 transition text-center text-lg hover:scale-105">
            <Download className="h-5 w-5" /> Collaboration Requirements
          </a>
        </div>

        {/* Contact Form */}
        <div id="collab-form" className="w-full max-w-xl mt-8 bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-teal-200 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Mail className="h-6 w-6 text-teal-600" /> Partnership Inquiry</h2>
          <p className="text-gray-600 mb-6">Fill out the form below and our team will reach out to you within 24 hours.</p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
              <input
                type="text"
                name="org"
                placeholder="Organization / Institution"
                value={form.org}
                onChange={handleChange}
                required
                className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              >
                <option value="Company">Company</option>
                <option value="Educational Institution">Educational Institution</option>
              </select>
              <textarea
                name="message"
                placeholder="Tell us about your collaboration goals..."
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
              >
                Submit Inquiry
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center mt-8 animate-fade-in">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Thank you for your interest!</h2>
              <p className="text-lg text-gray-700 mb-4 text-center">Our team will contact you soon to discuss your collaboration.</p>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 mt-12 animate-fade-in">
          <div className="flex items-center gap-2 text-gray-700"><Building className="h-5 w-5 text-teal-600" /> Nirvaha HQ: Hyderabad, India</div>
          <div className="flex items-center gap-2 text-gray-700"><Phone className="h-5 w-5 text-teal-600" /> 7780754541</div>
          <div className="flex items-center gap-2 text-gray-700"><Mail className="h-5 w-5 text-teal-600" /> nirvaha6@gmail.com</div>
        </div>
      </div>
      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow { 0% { transform: translateY(0); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0); } }
        @keyframes float-medium { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
        @keyframes float-fast { 0% { transform: translateY(0); } 50% { transform: translateY(-50px); } 100% { transform: translateY(0); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
};

export default ProfessionalPage; 