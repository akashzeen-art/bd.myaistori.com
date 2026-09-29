import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import { LanguageProvider } from './contexts/LanguageContext'
import { MobileGateProvider } from './contexts/MobileGateContext'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Features from './Components/Features'
import Stories from './Components/Stories'
import FAQ from './Components/FAQ'
import Pricing from './Components/Pricing'
import VoiceRecording from './Components/VoiceRecording'
import Preloader from './Components/Preloader'
import TermsOfService from './Components/TermsOfService'
import LandingPage from './Components/LandingPage'
import OtpPage from './Components/OtpPage'
import ThankYouPage from './Components/ThankYouPage'

const VERIFICATION_PATHS = ['/lp-page', '/otp', '/thankyou']

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <MobileGateProvider>
          <AppContent />
        </MobileGateProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  useEffect(() => {
    if (location.pathname === "/" && !showPreloader && !initialLoadDone) {
      setShowPreloader(true)
      setLoading(true)
      const fadeTimer = setTimeout(() => {
        setFadeOut(true)
      }, 3000)

      const loadTimer = setTimeout(() => {
        setLoading(false)
        setShowPreloader(false)
        setInitialLoadDone(true)
      }, 4000)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(loadTimer)
      }
    } else {
      setLoading(false)
      setShowPreloader(false)
      setFadeOut(false)
    }
  }, [location.pathname, initialLoadDone])

  if (loading && showPreloader) {
    return <Preloader fadeOut={fadeOut} />
  }

  const isVerificationPage = VERIFICATION_PATHS.includes(location.pathname)

  return (
    <>
      {!isVerificationPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/voice" element={<VoiceRecording />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/lp-page" element={<LandingPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isVerificationPage && <Footer />}
    </>
  )
}

export default App
