import React, { useState, useEffect, useRef, createContext } from 'react';
import { Menu, X, Heart, Phone, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Context to provide the bounding rect of the header Nirvaha
export const HeaderNirvahaRectContext = createContext<DOMRect | null>(null);

interface HeaderProps {
  onNirvahaClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNirvahaClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [nirvahaRect, setNirvahaRect] = useState<DOMRect | null>(null);
  const nirvahaRef = useRef<HTMLSpanElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
        // Debug log
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
    { name: 'Services', href: '#services' },
    { name: 'Discussion Rooms', href: '/discussion-rooms' },
    { name: 'Contact', href: '/contact' }
  ];

  const serviceFeatures = [
    { name: 'Zenchat', href: '/zenchat' },
    { name: 'Guided Meditation', href: '/guided-meditation' },
    { name: 'Sound Healing', href: '/sound-healing' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Events', href: '/events' },
    { name: 'Personalized Sessions', href: '/personalized-sessions' }
  ];
console.log("Header component rendered with user:", user);

  return (
    <HeaderNirvahaRectContext.Provider value={nirvahaRect}>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-teal-600 to-purple-600 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span
                ref={nirvahaRef}
                className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                onClick={onNirvahaClick}
              >
                Nirvaha
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) =>
                item.name === 'Services' ? (
                  <div key={item.name} className="relative group">
                    <button
                      className="text-gray-700 hover:text-teal-600 font-medium text-lg transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
                    </button>
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                      <ul className="py-2">
                        {serviceFeatures.map((feature) => (
                          <li key={feature.name}>
                            <a
                              href={feature.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors font-semibold text-lg sm:text-xl"
                            >
                              {feature.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-teal-600 font-medium text-lg transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                )
              )}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="tel:+1-800-NIRVAHA"
                className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="text-base">Emergency Support</span>
              </a>
              {user ? (
                <>
                  <span className="flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-purple-100 px-4 py-2 rounded-full font-medium text-teal-700 text-lg">
                    Hey, {user.name} 
                  </span>
                  
                  <a href="/profile" className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    <User className="h-5 w-5" /> Profile
                  </a>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-medium text-lg hover:bg-red-600 transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
              <a href="/login" className="bg-gradient-to-r from-teal-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Journey
              </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-teal-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
              <nav className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-teal-600 font-medium text-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <a
                    href="tel:+1-800-NIRVAHA"
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="text-lg">Emergency Support</span>
                  </a>
                  {user ? (
                    <>
                      <a href="/profile" className="w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white py-2 rounded-full font-medium text-lg">
                        Profile
                      </a>
                      <button
                        onClick={logout}
                        className="w-full bg-red-500 text-white py-2 rounded-full font-medium text-lg"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <a href="/login" className="w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white py-2 rounded-full font-medium text-lg">
                      Start Journey
                    </a>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </HeaderNirvahaRectContext.Provider>
  );
};

export default Header;