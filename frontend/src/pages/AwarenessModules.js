import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const modules = [
  { title: 'Spotting Phishing Emails', desc: 'Learn to identify suspicious sender domains, urgency tactics, and credential harvesting attempts.', active: true, icon: '📧' },
  { title: 'M-Pesa Fraud Awareness', desc: 'Understand common M-Pesa scams targeting Kenyan bank employees and customers.', active: true, icon: '📱' },
  { title: 'Social Engineering Defence', desc: 'Recognise manipulation tactics used by attackers to gain unauthorised access.', active: false, icon: '🎭' },
  { title: 'Safe Browsing Practices', desc: 'Best practices for safe internet use in a financial institution environment.', active: false, icon: '🌐' }
];

const AwarenessModules = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const department = location.state?.department || 'General';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />
      <div className="px-8 pt-8 pb-4">
        <button onClick={() => navigate('/awareness')}
          className="text-gray-500 text-sm mb-4 flex items-center gap-1 hover:text-gray-300 transition-all">
          ← Back to departments
        </button>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-green-400">{department}</span>
        </div>
        <h2 className="text-white font-bold text-2xl mb-2">Choose a learning module</h2>
        <p className="text-gray-500 text-sm">Complete a pre-assessment, learn, then take a post-assessment to measure improvement.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="space-y-3 max-w-2xl">
          {modules.map((mod) => (
            <div key={mod.title}
              onClick={mod.active ? () => navigate('/awareness/quiz', { state: { department, module: mod.title, isPost: false } }) : undefined}
              className="rounded-xl p-5 transition-all"
              style={{
                background: '#1a1f1a',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: mod.active ? 'pointer' : 'not-allowed',
                opacity: mod.active ? 1 : 0.4
              }}
              onMouseOver={e => { if (mod.active) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}}
              onMouseOut={e => { if (mod.active) { e.currentTarget.style.background = '#1a1f1a'; e.currentTarget.style.transform = 'translateY(0)'; }}}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '20px' }}>{mod.icon}</span>
                  <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '15px' }}>{mod.title}</span>
                </div>
                <span style={{
                  fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px',
                  background: mod.active ? 'rgba(0,102,0,0.2)' : 'rgba(255,255,255,0.05)',
                  color: mod.active ? '#69db7c' : '#555',
                  border: mod.active ? '1px solid rgba(0,102,0,0.3)' : '1px solid rgba(255,255,255,0.08)'
                }}>
                  {mod.active ? 'ACTIVE' : 'v2.0'}
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: '1.6' }}>{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwarenessModules;
