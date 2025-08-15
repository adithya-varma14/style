import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate, BrowserRouter as Router } from 'react-router-dom';
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
          <Routes>
            {/* Landing site routes */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Game />
                  {user && <Services />}
                  <Community />
                  <Professional />
                  <Contact />
                </>
              }
            />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/zenchat"element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><ZenChat /></ProtectedRoute>}  />
            <Route path="/guided-meditation" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><GuidedMeditation /></ProtectedRoute>}  />
            <Route path="/sound-healing"element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><SoundHealing /></ProtectedRoute>}  />
            <Route path="/marketplace" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><Marketplace /></ProtectedRoute>}  />
            <Route path="/events" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><WellnessEvents /></ProtectedRoute>}  />
            <Route path="/personalized-sessions" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><PersonalizedSessions /></ProtectedRoute>}  />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/discussion-rooms" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><DiscussionRoom /></ProtectedRoute>}  />
            <Route path="/create-room" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><CreateRoom /></ProtectedRoute>}  />
            <Route path="/professional" element={<ProfessionalPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-event" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><RegisterEvent /></ProtectedRoute>}  />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><Profile /></ProtectedRoute>}  />
            <Route path="/game" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><Gamification /></ProtectedRoute>}  />
            <Route path="/splash" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><Services /></ProtectedRoute>}  />
            
            <Route path="/services" element={<ProtectedRoute allowedRoles={["user","doctor","hr"]}><Services /></ProtectedRoute>} />

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
