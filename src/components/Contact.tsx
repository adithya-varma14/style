

import React, { useState } from 'react';
import { Briefcase, GraduationCap, CheckCircle, Mail, Building, Phone, Download, Send, Clock, Globe, Heart, Calendar } from 'lucide-react';

const Contact = () => {
  // Professional form state
  const [proForm, setProForm] = useState({ name: '', email: '', org: '', type: 'Company', message: '' });
  const [proSubmitted, setProSubmitted] = useState(false);
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Professional form handlers
  const handleChangeProfessional = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProForm({ ...proForm, [e.target.name]: e.target.value });
  };
  const handleSubmitProfessional = (e: React.FormEvent) => {
    e.preventDefault();
    setProSubmitted(true);
    setTimeout(() => setProSubmitted(false), 3000);
  };
  // Contact form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <>
      {/* ProfessionalPage content at the top */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-4 py-12 pt-24 relative overflow-hidden">
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
          {/* Download Brochure & Requirements */}
          <div className="w-full flex flex-col md:flex-row gap-6 mb-12 justify-center items-center animate-fade-in">
            <a href="/brochure.pdf" download className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-teal-600 hover:to-purple-600 transition text-center text-lg hover:scale-105">
              <Download className="h-5 w-5" /> Company Brochure
            </a>
            <a href="/collaboration-requirements.pdf" download className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-teal-600 transition text-center text-lg hover:scale-105">
              <Download className="h-5 w-5" /> Collaboration Requirements
            </a>
          </div>
          {/* Professional Contact Form */}
          <div id="collab-form" className="w-full max-w-xl mt-8 bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-teal-200 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Mail className="h-6 w-6 text-teal-600" /> Partnership Inquiry</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and our team will reach out to you within 24 hours.</p>
            {!proSubmitted ? (
              <form onSubmit={handleSubmitProfessional} className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Your Name" value={proForm.name} onChange={handleChangeProfessional} required className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                <input type="email" name="email" placeholder="Your Email" value={proForm.email} onChange={handleChangeProfessional} required className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                <input type="text" name="org" placeholder="Organization / Institution" value={proForm.org} onChange={handleChangeProfessional} required className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                <select name="type" value={proForm.type} onChange={handleChangeProfessional} className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition">
                  <option value="Company">Company</option>
                  <option value="Educational Institution">Educational Institution</option>
                </select>
                <textarea name="message" placeholder="Tell us about your collaboration goals..." value={proForm.message} onChange={handleChangeProfessional} rows={4} className="rounded-xl border border-teal-200 p-4 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200 hover:scale-105">Submit Inquiry</button>
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
      </section>

      {/* Divider or heading for Contact section if desired */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-4 py-12 pt-24">
        <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center relative overflow-hidden border border-teal-100 z-10 backdrop-blur-xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Start Your Healing
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"> Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to transform your mental wellness? Get in touch with our team or start your personalized journey today.
            </p>
          </div>
          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">Thank You!</h4>
                  <p className="text-gray-600">We'll be in touch within 24 hours to begin your wellness journey.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">I'm Interested In *</label>
                      <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200">
                        <option value="">Select an option</option>
                        <option value="personal">Personal Wellness</option>
                        <option value="therapy">Teletherapy Services</option>
                        <option value="corporate">Corporate Wellness</option>
                        <option value="certification">Certification Programs</option>
                        <option value="partnership">Partnership Opportunities</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Tell Us About Your Goals</label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none" placeholder="Share what you're hoping to achieve with your wellness journey..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Begin My Journey</span>
                    <Send className="h-5 w-5" />
                  </button>
                  <p className="text-xs text-gray-600 mt-4">By submitting this form, you agree to our privacy policy and terms of service. Your information is protected and will never be shared.</p>
                </form>
              )}
            </div>
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Multiple Ways to Connect</h3>
              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Emergency Support</h4>
                    <p className="text-gray-700 font-medium">7780754541</p>
                    <p className="text-sm text-red-600">Available 24/7 for crisis situations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">General Inquiries</h4>
                    <p className="text-gray-700 font-medium">nirvaha6@gmail.com</p>
                    <p className="text-sm text-gray-600">Response within 4 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Global Headquarters</h4>
                    <p className="text-gray-700">Hyderabad, India</p>
                    <p className="text-sm text-gray-600">Serving 2+ countries worldwide</p>
                  </div>
                </div>
              </div>
              {/* Quick Actions */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Quick Actions</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button className="p-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span>Book Session</span>
                      <Calendar className="h-5 w-5" />
                    </div>
                    <p className="text-sm opacity-90">Schedule with a therapist</p>
                  </button>
                  <button className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span>Join Waitlist</span>
                      <Clock className="h-5 w-5" />
                    </div>
                    <p className="text-sm opacity-90">Early access to new features</p>
                  </button>
                </div>
              </div>
              {/* Trust Indicators */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-gray-900">Trusted by Thousands</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold text-gray-900">4.9/5</div>
                    <div className="text-xs text-gray-600">User Rating</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">10K+</div>
                    <div className="text-xs text-gray-600">Active Users</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">99.9%</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;