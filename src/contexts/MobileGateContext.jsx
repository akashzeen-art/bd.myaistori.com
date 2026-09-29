import React, { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNumberModal from '../Components/MobileNumberModal';
import { getVerifiedMobile, setPendingMobile } from '../utils/mobile';

const MobileGateContext = createContext();

export const useMobileGate = () => {
  const context = useContext(MobileGateContext);
  if (!context) {
    throw new Error('useMobileGate must be used within a MobileGateProvider');
  }
  return context;
};

export const MobileGateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Runs `action` right away if the mobile number is already verified,
  // otherwise asks for a number and starts the OTP verification flow.
  const requireMobile = useCallback((action) => {
    if (getVerifiedMobile()) {
      action?.();
      return;
    }
    setIsOpen(true);
  }, []);

  const handleSubmit = (fullNumber) => {
    setPendingMobile(fullNumber);
    setIsOpen(false);
    navigate('/lp-page');
  };

  return (
    <MobileGateContext.Provider value={{ requireMobile }}>
      {children}
      <MobileNumberModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
    </MobileGateContext.Provider>
  );
};
