import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0f2a0f 0%, #1e1e1e 45%, #2a0f0f 100%)',
        zIndex: 0
      }} />

      {/* Soft colour blobs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(0,102,0,0.15)', filter: 'blur(80px)', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'rgba(187,0,0,0.12)', filter: 'blur(80px)', zIndex: 0
      }} />

      {/* Watermark SVG — Kenyan shilling + bank + shield */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 1, opacity: 0.03, pointerEvents: 'none'
      }} xmlns="http://www.w3.org/2000/svg">

        {/* Large KSh text watermark left */}
        <text x="5%" y="55%" fontSize="220" fontWeight="900" fill="#ffffff"
          fontFamily="Arial, sans-serif" opacity="1">KSh</text>

        {/* Large shield watermark right */}
        <path d="M 980 80 L 920 110 L 920 165 C 920 200 950 228 980 238 C 1010 228 1040 200 1040 165 L 1040 110 Z"
          fill="#ffffff"/>

        {/* Bank building icon center bottom */}
        <g transform="translate(580, 520)">
          <rect x="0" y="40" width="120" height="80" fill="#ffffff"/>
          <rect x="10" y="50" width="20" height="40" fill="#0f2a0f"/>
          <rect x="50" y="50" width="20" height="40" fill="#0f2a0f"/>
          <rect x="90" y="50" width="20" height="40" fill="#0f2a0f"/>
          <polygon points="60,0 0,40 120,40" fill="#ffffff"/>
          <rect x="-10" y="120" width="140" height="10" fill="#ffffff"/>
        </g>

        {/* Small repeated KSh symbols scattered */}
        <text x="75%" y="20%" fontSize="60" fontWeight="900" fill="#ffffff" fontFamily="Arial, sans-serif">KSh</text>
        <text x="15%" y="85%" fontSize="50" fontWeight="900" fill="#ffffff" fontFamily="Arial, sans-serif">KSh</text>
        <text x="60%" y="90%" fontSize="40" fontWeight="900" fill="#ffffff" fontFamily="Arial, sans-serif">🏦</text>

        {/* Diagonal line pattern subtle */}
        <line x1="0" y1="0" x2="1400" y2="800" stroke="#ffffff" strokeWidth="0.5" opacity="0.3"/>
        <line x1="0" y1="100" x2="1400" y2="900" stroke="#ffffff" strokeWidth="0.3" opacity="0.2"/>
        <line x1="0" y1="200" x2="1400" y2="1000" stroke="#ffffff" strokeWidth="0.3" opacity="0.2"/>
      </svg>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
      </div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ position: 'relative', zIndex: 2 }}>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
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
          style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75' }}>
          PhishRipoti gives every financial institution employee a safe, anonymous way to report suspicious emails. No login. No identity stored.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button onClick={() => navigate('/report/step1')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
            style={{ background: '#BB0000', fontSize: '15px', boxShadow: '0 4px 20px rgba(187,0,0,0.35)' }}
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
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '15px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
            </svg>
            Ask PhishRipoti AI
            <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', padding: '2px 6px', borderRadius: '4px' }}>v2.0</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', maxWidth: '640px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', marginBottom: '48px' }}></div>

        {/* Assurance Cards */}
        <div className="flex flex-wrap gap-5 justify-center max-w-3xl">
          {[
            { icon: '🔒', title: 'Your identity is never stored', desc: 'Fully anonymous by design. No name, no email, no IP address stored.', border: 'rgba(187,0,0,0.3)' },
            { icon: '⚡', title: 'AI analyses your report instantly', desc: 'GPT-4o scans for phishing signals and risk tier in real time.', border: 'rgba(255,255,255,0.12)' },
            { icon: '🇰🇪', title: 'Built for Kenya', desc: 'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', border: 'rgba(0,102,0,0.3)' }
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.07)', border: `1px solid ${card.border}`,
              borderRadius: '16px', padding: '24px 20px',
              minWidth: '180px', maxWidth: '210px', flex: '1',
              textAlign: 'center', backdropFilter: 'blur(12px)',
              transition: 'transform 0.2s, background 0.2s'
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#ffffff', marginBottom: '6px' }}>{card.title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
