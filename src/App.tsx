import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate, BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// From first code
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { RoleProvider } from "./contexts/RoleContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import DoctorDashboard from "./pages/DoctorDashboard";
import HRDashboard from "./pages/HRDashboard";
import Analytics from "./pages/Analytics";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import EmployeeAnalyticsPage from "./pages/EmployeeAnalytics";
import DoctorAvailabilityPage from "./pages/DoctorAvailability";
import PatientProfile from "./pages/PatientProfile";

// From second code (Landing site)
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Community from './components/Community';
import Professional from './components/Professional';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ZenChat from './components/ZenChat';
import GuidedMeditation from './components/GuidedMeditation';
import SoundHealing from './components/SoundHealing';
import Marketplace from './components/Marketplace';
import WellnessEvents from './components/WellnessEvents';
import PersonalizedSessions from './components/PersonalizedSessions';
import DiscussionRoom from './components/DiscussionRoom';
import ProfessionalPage from './components/ProfessionalPage';
import Login from './components/Login';

import SplashScreen from './components/SplashScreen';
import RegisterEvent from './components/RegisterEvent';
import CreateRoom from './components/CreateRoom';
import RegistrationForm from './components/CreateAccount';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CreateAccount from './components/CreateAccount';
import Gamification from './components/Gamification';
import Game from './components/Game';
import EmployeeAnalytics from './components/EmployeeAnalytics';
import DoctorAvailability from './components/DoctorAvailability';

const queryClient = new QueryClient();

function MainAppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSplash, setShowSplash] = useState(false);
  const splashAutoShown = useRef(false);
  const splashTriggeredByClick = useRef(false);

  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
    });
  }, []);

  // Auto-show splash only once on home load
  useEffect(() => {
    if (location.pathname === '/' && !splashAutoShown.current) {
      setShowSplash(true);
      splashAutoShown.current = true;
    }
  }, []);

  const handleNirvahaClick = () => {
    splashTriggeredByClick.current = true;
    setShowSplash(true);
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
    if (splashTriggeredByClick.current) {
      splashTriggeredByClick.current = false;
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  const handleFlyToHeader = () => {
    console.log('Splash text flying to header position');
  };
  const isDashboardPage = location.pathname.startsWith('/dashboard');


  return (
    <>
      {!isDashboardPage && <Header onNirvahaClick={handleNirvahaClick} />}
      <div className="min-h-screen">

        {showSplash && (
          <SplashScreen
            onFinish={handleSplashFinish}
            onFlyToHeader={handleFlyToHeader}
          />
        )}
        <main
          className={`${!isDashboardPage ? 'pt-20' : ''}`}
          style={{
            opacity: showSplash ? 0 : 1,
            transform: showSplash ? 'translateY(100vh) scale(0.95)' : 'translateY(0) scale(1)',
            transition:
              'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform, opacity',
            position: 'relative',
            zIndex: showSplash ? -1 : 1
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              {/* Landing site routes */}
            <Route
              path="/"
              element={
                <div className="scroll-smooth">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Hero />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Game />
                  </motion.div>
                  
                  {user && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 60 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Services />
                    </motion.div>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Community />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Professional />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Contact />
                  </motion.div>
                </div>
              }
            />
            <Route path="/community" element={
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Community />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Contact />
              </motion.div>
            } />
            <Route path="/zenchat" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ZenChat />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/guided-meditation" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, y: 60, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -60, rotateX: -10 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <GuidedMeditation />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/sound-healing" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -30 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <SoundHealing />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/marketplace" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Marketplace />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -50, filter: "blur(5px)" }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <WellnessEvents />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/personalized-sessions" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -40 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <PersonalizedSessions />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/create-account" element={
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <CreateAccount />
              </motion.div>
            } />
            <Route path="/discussion-rooms" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <DiscussionRoom />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/create-room" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, y: 40, rotateY: 5 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, y: -40, rotateY: -5 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <CreateRoom />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/professional" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.04, y: -50 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ProfessionalPage />
              </motion.div>
            } />
            <Route path="/login" element={
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Login />
              </motion.div>
            } />
            <Route path="/register-event" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 1.03 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <RegisterEvent />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, y: 35, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -35, filter: "blur(3px)" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Profile />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/game" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, rotateX: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 1.08, rotateX: -15 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Gamification />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/splash" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, y: 45 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -45 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Services />
                </motion.div>
              </ProtectedRoute>
            } />
            
            <Route path="/services" element={
              <ProtectedRoute allowedRoles={["user","doctor","hr"]}>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Services />
                </motion.div>
              </ProtectedRoute>
            } />

            {/* Dashboard routes from first code */}

<Route
  path="/dashboard/hr"
  element={
    <ProtectedRoute allowedRoles={["hr"]} >
      <DashboardLayout>
      <HRDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
  
/>

<Route
  path="/dashboard/doctor"
  element={
    <ProtectedRoute allowedRoles={["doctor"]} >
      <DashboardLayout>
      <DoctorDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

            <Route path="/dashboard/analytics" 
            element={ <ProtectedRoute allowedRoles={["hr","doctor"]} >
      <DashboardLayout>
      <Analytics />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

            <Route path="/dashboard/appointments"
             element={ <ProtectedRoute allowedRoles={["doctor"]} >
      <DashboardLayout>
      <Appointments />
      </DashboardLayout>
    </ProtectedRoute>
  } />
            <Route path="/dashboard/availability" element={ <ProtectedRoute allowedRoles={["doctor"]} >
      <DashboardLayout>
      <DoctorAvailability />
      </DashboardLayout>
    </ProtectedRoute>
  } />
            <Route path="/dashboard/patient/:id" element={ <ProtectedRoute allowedRoles={["doctor"]} >
      <DashboardLayout>
      <PatientProfile />
      </DashboardLayout>
    </ProtectedRoute>
  } />
            <Route path="/dashboard/employee-analytics" element={ <ProtectedRoute allowedRoles={["hr"]} >
      <DashboardLayout>
      <EmployeeAnalytics />
      </DashboardLayout>
    </ProtectedRoute>
  }/>
            <Route path="/dashboard/settings"element={ <ProtectedRoute allowedRoles={["doctor","hr"]} >
      <DashboardLayout>
      <Settings />
      </DashboardLayout>
    </ProtectedRoute>
  } />

            {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <AuthProvider>
            <RoleProvider>
              <MainAppContent />
            </RoleProvider>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
