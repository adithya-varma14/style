
import React, { useState, useEffect, useRef, createContext } from 'react';
import { Menu, X, Heart, Phone, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// Context to provide the bounding rect of the header Nirvaha
export const HeaderNirvahaRectContext = createContext<DOMRect | null>(null);

interface HeaderProps {
  onNirvahaClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNirvahaClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [nirvahaRect, setNirvahaRect] = useState<DOMRect | null>(null);
  const nirvahaRef = useRef<HTMLSpanElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update the rect on mount and on window resize
    const updateRect = () => {
      if (nirvahaRef.current) {
        const rect = nirvahaRef.current.getBoundingClientRect();
        setNirvahaRect(rect);
        if (rect.width && rect.height) {
          console.log('Header Nirvaha rect:', rect);
        }
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services', hasDropdown: true },
    { name: 'Discussion Rooms', href: '/discussion-rooms' },
    { name: 'Contact', href: '/contact' }
  ];

  const serviceFeatures = [
    { name: 'Zenchat', href: '/zenchat', description: 'AI-powered emotional healing' },
    { name: 'Guided Meditation', href: '/guided-meditation', description: 'Mindfulness practices' },
    { name: 'Sound Healing', href: '/sound-healing', description: 'Therapeutic frequencies' },
    { name: 'Marketplace', href: '/marketplace', description: 'Wellness products' },
    { name: 'Events', href: '/events', description: 'Community gatherings' },
    { name: 'Personalized Sessions', href: '/personalized-sessions', description: 'Custom therapy' }
  ];

  console.log("Header component rendered with user:", user);

  return (
    <HeaderNirvahaRectContext.Provider value={nirvahaRect}>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 p-2.5 rounded-xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="h-6 w-6 text-white" />
              </motion.div>
              <motion.span
                ref={nirvahaRef}
                className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent cursor-pointer select-none"
                onClick={onNirvahaClick}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Nirvaha
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <motion.button
                      className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-semibold text-lg transition-colors duration-300 relative group py-2"
                      whileHover={{ y: -1 }}
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 z-50"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4">
                            <div className="grid grid-cols-1 gap-1">
                              {serviceFeatures.map((feature, index) => (
                                <motion.a
                                  key={feature.name}
                                  href={feature.href}
                                  className="block p-3 rounded-xl text-gray-700 hover:bg-teal-50/80 hover:text-teal-700 transition-all duration-200 group"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <div className="font-semibold text-base">{feature.name}</div>
                                  <div className="text-sm text-gray-500 group-hover:text-teal-600 transition-colors">
                                    {feature.description}
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-teal-600 font-semibold text-lg transition-colors duration-300 relative group py-2"
                    whileHover={{ y: -1 }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                )
              )}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.a
                href="tel:+1-800-NIRVAHA"
                className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-teal-50/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="h-5 w-5" />
                <span className="text-base font-medium">Emergency Support</span>
              </motion.a>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="flex items-center space-x-2 bg-gradient-to-r from-teal-100/80 to-emerald-100/80 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-teal-800 border border-teal-200/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    <span className="text-lg">Hey, {user.name}</span>
                  </motion.div>
                  
                  <motion.a 
                    href="/profile" 
                    className="flex items-center gap-2 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white px-6 py-2.5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="h-5 w-5" /> Profile
                  </motion.a>
                  
                  <motion.button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="h-5 w-5" />
                  </motion.button>
                </div>
              ) : (
                <motion.a 
                  href="/login" 
                  className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white px-6 py-2.5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Journey
                </motion.a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-t border-white/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <nav className="px-4 py-6 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block text-gray-700 hover:text-teal-600 font-semibold text-lg transition-colors duration-300 py-2 px-2 rounded-lg hover:bg-teal-50/50"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200/50 space-y-4">
                    <motion.a
                      href="tel:+1-800-NIRVAHA"
                      className="flex items-center space-x-3 text-gray-600 py-2 px-2 rounded-lg hover:bg-teal-50/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Phone className="h-5 w-5" />
                      <span className="text-lg font-medium">Emergency Support</span>
                    </motion.a>
                    
                    {user ? (
                      <>
                        <motion.a 
                          href="/profile" 
                          className="block w-full bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white py-3 rounded-xl font-semibold text-lg text-center shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          Profile
                        </motion.a>
                        <motion.button
                          onClick={logout}
                          className="block w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg transition-colors duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          Logout
                        </motion.button>
                      </>
                    ) : (
                      <motion.a 
                        href="/login" 
                        className="block w-full bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white py-3 rounded-xl font-semibold text-lg text-center shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        Start Journey
                      </motion.a>
                    )}
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </HeaderNirvahaRectContext.Provider>
  );
};

export default Header;
