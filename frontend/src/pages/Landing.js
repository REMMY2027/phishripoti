import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">

      {/* DARK HERO SECTION */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0f0a' }}>

        {/* Subtle blobs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(0,102,0,0.12)', filter: 'blur(80px)', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', top: '-50px', right: '-100px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'rgba(187,0,0,0.1)', filter: 'blur(80px)', zIndex: 0
        }} />

        {/* Abstract SVG */}
        <svg style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          zIndex: 1, pointerEvents: 'none'
        }} xmlns="http://www.w3.org/2000/svg">
          <circle cx="-50" cy="150" r="300" fill="none" stroke="rgba(0,102,0,0.12)" strokeWidth="1.5"/>
          <circle cx="-50" cy="150" r="230" fill="none" stroke="rgba(0,102,0,0.08)" strokeWidth="1"/>
          <circle cx="110%" cy="120%" r="280" fill="none" stroke="rgba(187,0,0,0.12)" strokeWidth="1.5"/>
          <circle cx="110%" cy="120%" r="210" fill="none" stroke="rgba(187,0,0,0.08)" strokeWidth="1"/>
          <rect x="82%" y="8%" width="60" height="60" rx="14"
            fill="none" stroke="rgba(187,0,0,0.18)" strokeWidth="1.5"
            transform="rotate(-15 1150 100)"/>
          <rect x="8%" y="15%" width="50" height="50" rx="12"
            fill="none" stroke="rgba(0,102,0,0.18)" strokeWidth="1.5"
            transform="rotate(20 100 150)"/>
          <polygon points="200,380 230,330 260,380"
            fill="none" stroke="rgba(0,102,0,0.15)" strokeWidth="1.5"/>
          <polygon points="1100,80 1130,30 1160,80"
            fill="none" stroke="rgba(187,0,0,0.15)" strokeWidth="1.5"/>
          <circle cx="10%" cy="30%" r="3" fill="rgba(0,102,0,0.3)"/>
          <circle cx="90%" cy="20%" r="4" fill="rgba(187,0,0,0.3)"/>
          <circle cx="85%" cy="70%" r="3" fill="rgba(0,102,0,0.2)"/>
          <circle cx="15%" cy="75%" r="3" fill="rgba(187,0,0,0.2)"/>
        </svg>

        {/* Navbar */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Navbar />
        </div>

        {/* Hero content */}
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center"
          style={{ position: 'relative', zIndex: 2 }}>

          {/* Badge */}
          <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)'
            }}>
            <div className="flex gap-1">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#BB0000' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#006600' }}></div>
            </div>
            Built for Kenyan financial institutions
          </div>

          {/* Title */}
          <h1 className="font-black mb-2"
            style={{ fontSize: '68px', lineHeight: '1.02', letterSpacing: '-2px', color: '#ffffff' }}>
            Ripoti.
          </h1>
          <h1 className="font-black mb-6"
            style={{ fontSize: '68px', lineHeight: '1.02', letterSpacing: '-2px' }}>
            <span style={{ color: '#ff5555' }}>Salama.</span>{' '}
            <span style={{ color: '#55cc55' }}>Haraka.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto mb-10"
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.75' }}>
            Anonymous phishing reports for Kenyan banks. Powered by GPT-4o. No login. No identity stored. Results in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <button onClick={() => navigate('/report/step1')}
              className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
              style={{ background: '#BB0000', fontSize: '15px', boxShadow: '0 4px 20px rgba(187,0,0,0.4)' }}
              onMouseOver={e => { e.currentTarget.style.background = '#990000'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#BB0000'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
              </svg>
              Report a Suspicious Email
            </button>

            <button onClick={() => navigate('/awareness')}
              className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
              style={{ background: '#006600', fontSize: '15px', boxShadow: '0 4px 20px rgba(0,102,0,0.3)' }}
              onMouseOver={e => { e.currentTarget.style.background = '#005000'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#006600'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke="#fff" strokeWidth="2"/>
              </svg>
              Go to Awareness Hub
            </button>

            <button disabled
              className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold transition-all cursor-not-allowed"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '15px'
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              </svg>
              Ask PhishRipoti AI
              <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', padding: '2px 6px', borderRadius: '4px' }}>v2.0</span>
            </button>
          </div>

          {/* Scroll hint */}
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '16px' }}>
            ↓ Learn more
          </div>
        </div>
      </div>

      {/* LIGHT SECTIONS */}
      <div style={{ background: '#ffffff', padding: '80px 32px' }}>

        {/* Divider */}
        <div style={{
          width: '100%', maxWidth: '640px', height: '1px', margin: '0 auto 64px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)'
        }}></div>

        {/* Assurance Cards */}
        <div className="flex flex-wrap gap-6 justify-center max-w-3xl mx-auto">
          {[
            {
              icon: '🔒',
              title: 'Your identity is never stored',
              desc: 'Fully anonymous by design. No name, no email, no IP address stored.',
              border: 'rgba(187,0,0,0.2)',
              accent: '#BB0000'
            },
            {
              icon: '⚡',
              title: 'AI analyses your report instantly',
              desc: 'GPT-4o scans for phishing signals and risk tier in real time.',
              border: 'rgba(0,0,0,0.08)',
              accent: '#1a1a1a'
            },
            {
              icon: '🇰🇪',
              title: 'Built for Kenya',
              desc: 'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.',
              border: 'rgba(0,102,0,0.2)',
              accent: '#006600'
            }
          ].map((card, i) => (
            <div key={i} style={{
              background: '#ffffff',
              border: `1px solid ${card.border}`,
              borderTop: `3px solid ${card.accent}`,
              borderRadius: '16px', padding: '28px 24px',
              minWidth: '200px', maxWidth: '220px', flex: '1',
              textAlign: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'; }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#1a1a1a', marginBottom: '8px' }}>{card.title}</div>
              <div style={{ fontSize: '13px', color: '#888888', lineHeight: '1.6' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 justify-center max-w-2xl mx-auto mt-16">
          {[
            { value: 'GPT-4o', label: 'AI Engine' },
            { value: '100%', label: 'Anonymous' },
            { value: 'KE 🇰🇪', label: 'Built for Kenya' },
            { value: '<30s', label: 'Analysis Time' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
