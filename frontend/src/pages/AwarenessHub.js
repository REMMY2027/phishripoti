import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'Front-line staff handling cash, deposits, withdrawals and direct customer interaction.'
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Staff managing financial records, payments, reconciliations and budget reporting.'
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    desc: 'Teams responsible for regulatory compliance, fraud monitoring and risk assessment.'
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    desc: 'Staff processing loan applications, credit assessments and repayment management.'
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    desc: 'Back-office teams managing internal processes, systems and branch administration.'
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Staff handling recruitment, employee records, payroll and staff welfare.'
  },
  {
    id: 'other',
    label: 'Other',
    icon: '✏️',
    desc: 'My department is not listed above.'
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
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-green-400">
            Awareness Hub
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
                background: '#1a1f1a',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#1a1f1a';
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px',
                flexShrink: 0
              }}>
                {dept.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>
                  {dept.label}
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
            <div className="text-white font-semibold text-sm mb-3">
              Enter your department
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels..."
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