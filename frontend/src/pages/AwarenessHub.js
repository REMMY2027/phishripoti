import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'High target for M-Pesa impersonation and account takeover phishing attempts.',
    color: 'rgba(0,102,0,0.15)',
    border: 'rgba(0,102,0,0.2)'
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Frequently targeted by invoice fraud, payment diversion and CFO impersonation emails.',
    color: 'rgba(187,0,0,0.1)',
    border: 'rgba(187,0,0,0.15)'
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    desc: 'Targeted by regulatory impersonation emails pretending to be CBK or KRA.',
    color: 'rgba(0,102,0,0.15)',
    border: 'rgba(0,102,0,0.2)'
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    desc: 'At risk from fake loan applicant documents and credential harvesting attacks.',
    color: 'rgba(187,0,0,0.1)',
    border: 'rgba(187,0,0,0.15)'
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    desc: 'Targeted by system access phishing and fake IT support emails requesting credentials.',
    color: 'rgba(0,102,0,0.15)',
    border: 'rgba(0,102,0,0.2)'
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Targeted by payroll diversion and fake employee document phishing campaigns.',
    color: 'rgba(187,0,0,0.1)',
    border: 'rgba(187,0,0,0.15)'
  },
  {
    id: 'other',
    label: 'Other',
    icon: '✏️',
    desc: 'My department is not listed above. I will enter it manually.',
    color: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.1)',
    dashed: true
  }
];

const AwarenessHub = () => {
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');

  const handleSelect = (dept) => {
    if (dept.id === 'other') {
      setShowOtherInput(true);
      return;
    }
    navigate('/awareness/modules', { state: { department: dept.label } });
  };

  const handleOtherSubmit = () => {
    if (otherDept.trim()) {
      navigate('/awareness/modules', { state: { department: otherDept.trim() } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />

      <div className="px-8 pt-8 pb-4">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-gray-500 text-sm mb-5 hover:text-gray-300 transition-all">
          ← Back to Home
        </button>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-2">
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: '#006600', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#fff'
            }}>1</div>
            <span className="text-white text-xs font-semibold">Select Department</span>
          </div>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)' }}></div>
          <div className="flex items-center gap-2">
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '11px', fontWeight: '700',
              color: 'rgba(255,255,255,0.3)'
            }}>2</div>
            <span style={{ color: 'rgba(255,255,255,0.3)' }} className="text-xs">Select Module</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-green-400">
            Live — AI-powered content
          </span>
        </div>
        <h2 className="text-white font-bold text-2xl mb-2">Select your department</h2>
        <p className="text-gray-500 text-sm">
          Get personalised phishing awareness training tailored to your role and daily responsibilities.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="space-y-3 max-w-2xl">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleSelect(dept)}
              className="flex items-center gap-4 rounded-xl px-5 py-4 cursor-pointer transition-all"
              style={{
                background: dept.color,
                border: `${dept.dashed ? '1px dashed' : '1px solid'} ${dept.border}`
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.border = `${dept.dashed ? '1px dashed' : '1px solid'} rgba(255,255,255,0.2)`;
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = dept.color;
                e.currentTarget.style.border = `${dept.dashed ? '1px dashed' : '1px solid'} ${dept.border}`;
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px',
                flexShrink: 0
              }}>
                {dept.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '14px' }}>
                    {dept.label}
                  </span>
                  {!dept.dashed && (
                    <span style={{
                      fontSize: '10px', fontWeight: '600',
                      padding: '2px 8px', borderRadius: '20px',
                      background: 'rgba(0,102,0,0.2)',
                      color: '#69db7c',
                      border: '1px solid rgba(0,102,0,0.3)'
                    }}>
                      2 modules
                    </span>
                  )}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: '1.5' }}>
                  {dept.desc}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '16px', flexShrink: 0 }}>
                →
              </div>
            </div>
          ))}
        </div>

        {/* Other department input */}
        {showOtherInput && (
          <div className="mt-4 max-w-2xl rounded-xl p-5 border border-gray-800"
            style={{ background: '#1a1f1a' }}>
            <div className="text-white font-semibold text-sm mb-1">
              Enter your department
            </div>
            <div className="text-gray-500 text-xs mb-3">
              Type your department name and we will generate personalised content for you.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-4 py-3 text-sm outline-none focus:border-green-800 mb-3"
              onKeyDown={e => e.key === 'Enter' && handleOtherSubmit()}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleOtherSubmit}
                disabled={!otherDept.trim()}
                className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm transition-all"
                style={{
                  background: otherDept.trim() ? '#006600' : '#333',
                  cursor: otherDept.trim() ? 'pointer' : 'not-allowed'
                }}>
                Continue →
              </button>
              <button
                onClick={() => { setShowOtherInput(false); setOtherDept(''); }}
                className="px-5 py-2.5 rounded-lg text-gray-400 font-semibold text-sm border border-gray-700 hover:bg-gray-800 transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwarenessHub;