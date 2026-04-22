import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ showITPortal = true, light = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Kenyan flag stripe */}
      <div style={{ display: 'flex', height: '4px' }}>
        <div style={{ flex: 1, background: '#BB0000' }}></div>
        <div style={{ flex: 1, background: '#1A1A1A' }}></div>
        <div style={{ flex: 1, background: '#006600' }}></div>
      </div>

      {/* Top nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '56px',
        background: light ? 'rgba(20,35,20,0.92)' : '#000000',
        borderBottom: light ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          onClick={() => navigate('/')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V6L12 2z"
              fill="#BB0000" opacity="0.9"/>
            <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '18px' }}>
            PhishRipoti
          </span>
        </div>

        {showITPortal && (
          <button
            onClick={() => navigate('/it/login')}
            style={{
              color: '#cccccc',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px', padding: '6px 16px', fontSize: '14px',
              background: 'transparent', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            IT Manager Portal
          </button>
        )}
      </nav>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'rgba(10,13,10,0.97)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}>
        <div className="flex items-center justify-around py-2">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 px-4 py-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                stroke={location.pathname === '/' ? '#BB0000' : '#8b949e'}
                strokeWidth="2" fill="none"/>
            </svg>
            <span className="text-xs" style={{ color: location.pathname === '/' ? '#BB0000' : '#8b949e' }}>Home</span>
          </button>

          <button onClick={() => navigate('/report/step1')} className="flex flex-col items-center gap-1 px-4 py-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke={isActive('/report') ? '#BB0000' : '#8b949e'} strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6"
                stroke={isActive('/report') ? '#BB0000' : '#8b949e'} strokeWidth="2"/>
            </svg>
            <span className="text-xs" style={{ color: isActive('/report') ? '#BB0000' : '#8b949e' }}>Report</span>
          </button>

          <button onClick={() => navigate('/report/step1')} className="flex flex-col items-center gap-1 relative">
            <div className="w-14 h-14 rounded-full flex items-center justify-center -mt-6"
              style={{ background: '#BB0000', boxShadow: '0 0 20px rgba(187,0,0,0.4)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V6L12 2z" fill="white"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500 mt-1">Scan</span>
          </button>

          <button onClick={() => navigate('/awareness')} className="flex flex-col items-center gap-1 px-4 py-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z"
                stroke={isActive('/awareness') ? '#006600' : '#8b949e'} strokeWidth="2"/>
            </svg>
            <span className="text-xs" style={{ color: isActive('/awareness') ? '#006600' : '#8b949e' }}>Learn</span>
          </button>

          <button onClick={() => navigate('/it/login')} className="flex flex-col items-center gap-1 px-4 py-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"
                stroke={isActive('/it') ? '#BB0000' : '#8b949e'} strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"
                stroke={isActive('/it') ? '#BB0000' : '#8b949e'} strokeWidth="2"/>
            </svg>
            <span className="text-xs" style={{ color: isActive('/it') ? '#BB0000' : '#8b949e' }}>IT Portal</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
