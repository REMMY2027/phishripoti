import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const incidentTypes = [
  {
    id: 'phishing',
    icon: '📧',
    title: 'Phishing Email',
    description: 'Suspicious email requesting credentials, payment, or personal data',
    active: true
  },
  {
    id: 'smishing',
    icon: '💬',
    title: 'Smishing (SMS)',
    description: 'Fraudulent text messages targeting mobile banking',
    active: false
  },
  {
    id: 'vishing',
    icon: '📞',
    title: 'Vishing (Voice)',
    description: 'Fraudulent phone calls impersonating executives or IT',
    active: false
  },
  {
    id: 'social',
    icon: '🌐',
    title: 'Social Engineering',
    description: 'In-person or online manipulation to gain access',
    active: false
  }
];

const ReportStep1 = () => {
  const navigate = useNavigate();
  const { updateReport } = useReport();

  const handleSelect = () => {
    updateReport({ incidentType: 'Phishing Email' });
    navigate('/report/step2');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />

      <div className="px-8 pt-8 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#333' }}></div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#333' }}></div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#333' }}></div>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-widest ml-1">Step 1 of 4</span>
        </div>
        <h2 className="text-white font-semibold text-2xl mb-2">What type of incident are you reporting?</h2>
        <p className="text-gray-500 text-sm leading-relaxed">Only active categories are available in v1.0. Others are coming in v2.0.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          {incidentTypes.map((type) => (
            <div
              key={type.id}
              onClick={type.active ? handleSelect : undefined}
              style={{
                background: type.id === 'phishing' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: type.id === 'phishing' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '24px',
                cursor: type.active ? 'pointer' : 'not-allowed',
                opacity: type.active ? 1 : 0.35,
                transition: 'all 0.2s'
              }}
              onMouseOver={e => {
                if (type.active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={e => {
                if (type.active) {
                  e.currentTarget.style.background = type.id === 'phishing' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.border = type.id === 'phishing' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div style={{
                  width: '44px', height: '44px',
                  borderRadius: '12px',
                  background: type.active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  {type.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  background: type.active ? 'rgba(0,102,0,0.2)' : 'rgba(255,255,255,0.05)',
                  color: type.active ? '#69db7c' : '#555',
                  border: type.active ? '1px solid rgba(0,102,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  letterSpacing: '0.05em'
                }}>
                  {type.active ? 'ACTIVE' : 'v2.0'}
                </span>
              </div>
              <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '15px', marginBottom: '6px' }}>
                {type.title}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: '1.6' }}>
                {type.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <NextStrip
        steps={['Phishing Email', 'Department', 'Email Details', 'Submit']}
        currentStep={0}
        onNext={handleSelect}
        nextLabel="Next: Select Department →"
      />
    </div>
  );
};

export default ReportStep1;
