import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { label: 'Stripping personal identifiers', icon: '🛡️' },
  { label: 'Scanning links with Google Safe Browsing', icon: '🔍' },
  { label: 'Running GPT-4o phishing analysis', icon: '🤖' },
  { label: 'Calculating composite risk score', icon: '📊' },
  { label: 'Generating anonymised report token', icon: '🔐' }
];

const Processing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ background: '#0a0d0a' }}>
      <svg className="animate-spin mb-8" width="48" height="48" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <h2 className="text-white font-bold text-xl mb-2">Analysing your report</h2>
      <p className="text-gray-500 text-sm mb-8">Please wait while GPT-4o processes your submission</p>
      <div className="w-full max-w-sm space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 py-2 px-4 rounded-lg transition-all"
            style={{
              background: i === currentStep ? 'rgba(187,0,0,0.1)' : i < currentStep ? 'rgba(0,102,0,0.08)' : 'transparent',
              border: i === currentStep ? '1px solid rgba(187,0,0,0.3)' : '1px solid transparent'
            }}>
            <span style={{ fontSize: '16px' }}>{step.icon}</span>
            <span className="text-sm" style={{
              color: i < currentStep ? '#69db7c' : i === currentStep ? '#ffffff' : '#555'
            }}>
              {step.label}
            </span>
            {i < currentStep && <span className="ml-auto text-green-400 text-xs">✓</span>}
            {i === currentStep && (
              <svg className="ml-auto animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Processing;
