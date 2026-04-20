import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const departments = [
  { id: 'retail', label: 'Retail Banking', icon: '🏦' },
  { id: 'corporate', label: 'Corporate Banking', icon: '🏢' },
  { id: 'treasury', label: 'Treasury', icon: '💰' },
  { id: 'risk', label: 'Risk & Compliance', icon: '⚖️' },
  { id: 'it', label: 'IT & Technology', icon: '💻' },
  { id: 'hr', label: 'Human Resources', icon: '👥' },
  { id: 'finance', label: 'Finance & Accounts', icon: '📊' },
  { id: 'customer', label: 'Customer Service', icon: '🎧' }
];

const AwarenessHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-green-400">Awareness Hub</span>
        </div>
        <h2 className="text-white font-bold text-2xl mb-2">Select your department</h2>
        <p className="text-gray-500 text-sm">Get personalised phishing awareness training tailored to your role.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="grid grid-cols-2 gap-3 max-w-2xl">
          {departments.map((dept) => (
            <div key={dept.id}
              onClick={() => navigate('/awareness/modules', { state: { department: dept.label } })}
              className="rounded-xl p-5 cursor-pointer transition-all"
              style={{ background: '#1a1f1a', border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#1a1f1a'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{dept.icon}</div>
              <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '14px' }}>{dept.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwarenessHub;
