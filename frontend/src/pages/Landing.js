import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Base gradient — dark green corners, light center, red bottom right */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 40%, #c8d8c0 0%, #7aaa7a 35%, #2d6b2d 65%, #0d2a0d 100%)'
      }} />

      {/* Red accent bottom right */}
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(187,0,0,0.55) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Extra dark corners */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '300px', height: '300px',
        background: 'radial-gradient(circle at top left, #061a06 0%, transparent 70%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '300px', height: '300px',
        background: 'radial-gradient(circle at top right, #061a06 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* SVG abstract graphics */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 1, pointerEvents: 'none'
      }} xmlns="http://www.w3.org/2000/svg">

        {/* Hexagons left side */}
        <polygon points="60,320 90,303 120,320 120,354 90,371 60,354"
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <polygon points="30,370 55,357 80,370 80,396 55,409 30,396"
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <polygon points="80,430 105,417 130,430 130,456 105,469 80,456"
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>

        {/* Lock icon top left */}
        <g transform="translate(42, 55)" opacity="0.25">
          <rect x="2" y="10" width="22" height="16" rx="2" fill="none" stroke="white" strokeWidth="1.5"/>
          <path d="M7 10V7a6 6 0 0 1 12 0v3" fill="none" stroke="white" strokeWidth="1.5"/>
          <circle cx="13" cy="17" r="2" fill="white"/>
          <line x1="13" y1="19" x2="13" y2="22" stroke="white" strokeWidth="1.5"/>
        </g>

        {/* Concentric circles top left */}
        <circle cx="0" cy="100" r="120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <circle cx="0" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <circle cx="0" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

        {/* Concentric circles top right */}
        <circle cx="100%" cy="80" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <circle cx="100%" cy="80" r="110" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

        {/* Concentric circles bottom right */}
        <circle cx="100%" cy="100%" r="180" fill="none" stroke="rgba(187,0,0,0.2)" strokeWidth="1.5"/>
        <circle cx="100%" cy="100%" r="130" fill="none" stroke="rgba(187,0,0,0.15)" strokeWidth="1"/>
        <circle cx="100%" cy="100%" r="90" fill="none" stroke="rgba(187,0,0,0.12)" strokeWidth="1"/>

        {/* Wave lines bottom */}
        <path d="M -50 650 Q 200 580 450 630 T 850 610 T 1200 630 T 1500 610"
          fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
        <path d="M -50 690 Q 250 620 500 660 T 900 645 T 1250 665 T 1500 645"
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <path d="M -50 730 Q 300 660 550 700 T 950 680 T 1300 700 T 1500 680"
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

        {/* Dot particles scattered */}
        <circle cx="5%" cy="15%" r="2" fill="rgba(255,255,255,0.4)"/>
        <circle cx="8%" cy="28%" r="1.5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="3%" cy="42%" r="1" fill="rgba(255,255,255,0.25)"/>
        <circle cx="12%" cy="55%" r="2" fill="rgba(255,255,255,0.2)"/>
        <circle cx="7%" cy="68%" r="1.5" fill="rgba(255,255,255,0.15)"/>
        <circle cx="92%" cy="12%" r="1.5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="96%" cy="25%" r="2" fill="rgba(255,255,255,0.25)"/>
        <circle cx="88%" cy="38%" r="1" fill="rgba(255,255,255,0.2)"/>
        <circle cx="94%" cy="55%" r="2.5" fill="rgba(187,0,0,0.5)"/>
        <circle cx="89%" cy="68%" r="2" fill="rgba(187,0,0,0.4)"/>
        <circle cx="97%" cy="75%" r="3" fill="rgba(187,0,0,0.6)"/>
        <circle cx="85%" cy="82%" r="1.5" fill="rgba(187,0,0,0.35)"/>
        <circle cx="50%" cy="5%" r="1.5" fill="rgba(255,255,255,0.2)"/>
        <circle cx="35%" cy="8%" r="1" fill="rgba(255,255,255,0.15)"/>
        <circle cx="65%" cy="6%" r="2" fill="rgba(255,255,255,0.2)"/>

        {/* Connected dot network bottom left */}
        <circle cx="15%" cy="75%" r="2" fill="rgba(255,255,255,0.3)"/>
        <circle cx="22%" cy="82%" r="1.5" fill="rgba(255,255,255,0.25)"/>
        <circle cx="18%" cy="88%" r="2" fill="rgba(255,255,255,0.2)"/>
        <circle cx="28%" cy="78%" r="1" fill="rgba(255,255,255,0.2)"/>
        <line x1="15%" y1="75%" x2="22%" y2="82%" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
        <line x1="22%" y1="82%" x2="18%" y2="88%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
        <line x1="22%" y1="82%" x2="28%" y2="78%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      </svg>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar light={false} />
      </div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ position: 'relative', zIndex: 2 }}>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)'
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
          style={{
            fontSize: '68px', lineHeight: '1.02',
            letterSpacing: '-2px', color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}>
          Ripoti.
        </h1>
        <h1 className="font-black mb-6"
          style={{ fontSize: '68px', lineHeight: '1.02', letterSpacing: '-2px' }}>
          <span style={{ color: '#ffaaaa', textShadow: '0 2px 20px rgba(187,0,0,0.4)' }}>Salama.</span>{' '}
          <span style={{ color: '#aaffaa', textShadow: '0 2px 20px rgba(0,102,0,0.4)' }}>Haraka.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto mb-10"
          style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.75)',
            lineHeight: '1.75', textShadow: '0 1px 8px rgba(0,0,0,0.2)'
          }}>
          Anonymous phishing reports for Kenyan banks. Powered by GPT-4o. No login. No identity stored. Results in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button onClick={() => navigate('/report/step1')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
            style={{
              background: 'rgba(187,0,0,0.85)',
              fontSize: '15px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(187,0,0,0.5)',
              boxShadow: '0 4px 20px rgba(187,0,0,0.3)'
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(150,0,0,0.95)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(187,0,0,0.85)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
            </svg>
            Report a Suspicious Email
          </button>

          <button onClick={() => navigate('/awareness')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
            style={{
              background: 'rgba(0,80,0,0.85)',
              fontSize: '15px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0,102,0,0.5)',
              boxShadow: '0 4px 20px rgba(0,102,0,0.25)'
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,60,0,0.95)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,80,0,0.85)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke="#fff" strokeWidth="2"/>
            </svg>
            Go to Awareness Hub
          </button>

          <button disabled
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold transition-all cursor-not-allowed"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontSize: '15px', backdropFilter: 'blur(8px)'
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
            </svg>
            Ask PhishRipoti AI
            <span style={{
              fontSize: '10px', background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.35)', padding: '2px 6px', borderRadius: '4px'
            }}>v2.0</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%', maxWidth: '640px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          marginBottom: '48px'
        }}></div>

        {/* Assurance Cards */}
        <div className="flex flex-wrap gap-5 justify-center max-w-3xl">
          {[
            { icon: '🔒', title: 'Your identity is never stored', desc: 'Fully anonymous by design. No name, no email, no IP address stored.', border: 'rgba(187,0,0,0.3)' },
            { icon: '⚡', title: 'AI analyses your report instantly', desc: 'GPT-4o scans for phishing signals and risk tier in real time.', border: 'rgba(255,255,255,0.15)' },
            { icon: '🇰🇪', title: 'Built for Kenya', desc: 'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', border: 'rgba(0,102,0,0.35)' }
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid ${card.border}`,
              borderRadius: '16px', padding: '24px 20px',
              minWidth: '180px', maxWidth: '210px', flex: '1',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s, background 0.2s'
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#ffffff', marginBottom: '6px' }}>{card.title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;