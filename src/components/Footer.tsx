
import React from 'react';
import { Heart, Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin, Shield, Lock, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Footer = () => {
  const footerRef = useScrollAnimation();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Our Mission', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'HIPAA Compliance', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Accessibility', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-400', name: 'Facebook' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-300', name: 'Twitter' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400', name: 'Instagram' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-500', name: 'LinkedIn' }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Emergency Support',
      content: '7780754541',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Mail,
      title: 'General Support',
      content: 'nirvaha6@gmail.com',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      content: '2+ Countries',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 to-purple-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <motion.div 
          ref={footerRef.ref}
          className={`grid lg:grid-cols-5 gap-12 mb-16 ${footerRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-teal-400 via-emerald-400 to-teal-500 p-3 rounded-xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Nirvaha
              </span>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 mb-8 leading-relaxed text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Harmony of Mind – Blending Ancient Wisdom with Modern Science for Complete Mental Wellness. 
              Join thousands on their journey to inner peace and emotional healing.
            </motion.p>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                <Lock className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-300 font-medium">HIPAA Compliant</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-white/20 hover:scale-110 hover:shadow-lg`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + linkIndex * 0.05, duration: 0.4 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-base hover:underline hover:underline-offset-4"
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Bar */}
        <motion.div 
          className="bg-gradient-to-r from-teal-900/30 via-emerald-900/30 to-teal-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={info.title}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                <div className={`w-14 h-14 ${info.bgColor} rounded-xl flex items-center justify-center`}>
                  <info.icon className={`h-7 w-7 ${info.color}`} />
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-1">{info.title}</div>
                  <div className={`${info.color} font-semibold`}>{info.content}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div 
              className="flex items-center space-x-2 text-gray-400"
              whileHover={{ scale: 1.02 }}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-base">© 2024 Nirvaha Wellness LLP. All rights reserved.</span>
            </motion.div>
            
            <div className="flex items-center space-x-8 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link, index) => (
                <motion.a 
                  key={link}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline hover:underline-offset-4"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Additional Trust Elements */}
          <motion.div 
            className="flex justify-center items-center mt-8 pt-6 border-t border-white/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Award className="h-4 w-4 text-yellow-400" />
              <span>Certified Mental Health Platform</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
