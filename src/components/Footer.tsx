import React from 'react';
import { Heart, Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin, Shield, Lock, Award } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Mission',
        'Careers',
        'Press Kit',
        'Contact'
      ]
    },
    {
      title: 'Legal',
      links: [
        'Privacy Policy',
        'Terms of Service',
        'HIPAA Compliance',
        'Cookie Policy',
        'Accessibility'
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-br from-teal-400 to-purple-500 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                Nirvaha
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Harmony of Mind – Blending Ancient Wisdom with Modern Science for Complete Mental Wellness. 
              Join thousands on their journey to inner peace and emotional healing.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-full">
                <Lock className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-gray-300">End-to-End Encrypted</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                { icon: Twitter, href: '#', color: 'hover:text-blue-300' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-500' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-colors duration-200 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="bg-gradient-to-r from-teal-900/50 to-purple-900/50 rounded-2xl p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="font-semibold text-white">Emergency Support</div>
                <div className="text-red-400 font-medium">7780754541</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <div className="font-semibold text-white">General Support</div>
                <div className="text-teal-400">nirvaha6@gmail.com</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-white">Global Reach</div>
                <div className="text-purple-400">2+ Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Nirvaha Wellness LLP. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;