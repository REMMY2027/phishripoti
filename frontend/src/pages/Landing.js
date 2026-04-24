import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── BASE ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#f2ede3' }} />

      {/* ── BANKNOTE DIAGONAL LINES — more visible ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        backgroundImage: `
          repeating-linear-gradient(
            52deg,
            transparent,
            transparent 14px,
            rgba(0,80,20,0.055) 14px,
            rgba(0,80,20,0.055) 15px
          ),
          repeating-linear-gradient(
            -52deg,
            transparent,
            transparent 14px,
            rgba(0,80,20,0.04) 14px,
            rgba(0,80,20,0.04) 15px
          )
        `,
      }} />

      {/* ── RED CROSS DIAGONAL — security feel ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        backgroundImage: `
          repeating-linear-gradient(
            38deg,
            transparent,
            transparent 22px,
            rgba(140,0,0,0.032) 22px,
            rgba(140,0,0,0.032) 23px
          )
        `,
      }} />

      {/* ── MICRO DOT GRID — banknote security watermark ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 3,
        backgroundImage: `radial-gradient(circle, rgba(0,60,15,0.11) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />

      {/* ── CENTRE LIFT — keeps hero clean and readable ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 4,
        background: 'radial-gradient(ellipse 58% 58% at 50% 42%, rgba(242,237,227,0.97) 0%, rgba(242,237,227,0.88) 38%, rgba(242,237,227,0.35) 68%, transparent 100%)',
      }} />

      {/* ── TOP EDGE — deep green band fading down ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 5,
        background: 'linear-gradient(180deg, rgba(5,30,10,0.18) 0%, rgba(5,30,10,0.07) 12%, transparent 28%)',
      }} />

      {/* ── BOTTOM EDGE — deep red band fading up ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 6,
        background: 'linear-gradient(0deg, rgba(100,0,0,0.13) 0%, rgba(100,0,0,0.05) 12%, transparent 28%)',
      }} />

      {/* ── SVG GEOMETRIC SHAPES ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 7, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,80,20,0.10)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="280" fill="none" stroke="rgba(0,80,20,0.07)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="210" fill="none" stroke="rgba(0,80,20,0.05)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(140,0,0,0.10)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="250" fill="none" stroke="rgba(140,0,0,0.07)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="180" fill="none" stroke="rgba(140,0,0,0.05)" strokeWidth="1"/>
        <rect x="8%" y="12%" width="55" height="55" rx="14"
          fill="none" stroke="rgba(0,80,20,0.10)" strokeWidth="1.5"
          transform="rotate(20 100 150)"/>
        <rect x="82%" y="8%" width="70" height="70" rx="18"
          fill="none" stroke="rgba(140,0,0,0.10)" strokeWidth="1.5"
          transform="rotate(-15 1150 120)"/>
        <rect x="75%" y="65%" width="45" height="45" rx="10"
          fill="none" stroke="rgba(0,80,20,0.08)" strokeWidth="1"
          transform="rotate(30 1050 550)"/>
        <rect x="5%" y="70%" width="60" height="60" rx="12"
          fill="none" stroke="rgba(140,0,0,0.08)" strokeWidth="1"
          transform="rotate(-25 80 600)"/>
        <polygon points="150,60 190,140 110,140"
          fill="none" stroke="rgba(0,80,20,0.09)" strokeWidth="1.5"/>
        <polygon points="1150,500 1200,590 1100,590"
          fill="none" stroke="rgba(140,0,0,0.09)" strokeWidth="1.5"/>
        <polygon points="200,480 225,466 250,480 250,508 225,522 200,508"
          fill="none" stroke="rgba(0,80,20,0.10)" strokeWidth="1.5"/>
        <polygon points="1050,180 1075,166 1100,180 1100,208 1075,222 1050,208"
          fill="none" stroke="rgba(140,0,0,0.10)" strokeWidth="1.5"/>
        <path d="M 0 500 Q 350 350 700 480 T 1400 420"
          fill="none" stroke="rgba(0,80,20,0.07)" strokeWidth="1.5"/>
        <path d="M 0 600 Q 400 450 750 560 T 1400 500"
          fill="none" stroke="rgba(140,0,0,0.06)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="3.5" fill="rgba(0,80,20,0.15)"/>
        <circle cx="14%" cy="40%" r="2.5" fill="rgba(0,80,20,0.11)"/>
        <circle cx="88%" cy="20%" r="4" fill="rgba(140,0,0,0.15)"/>
        <circle cx="92%" cy="38%" r="2.5" fill="rgba(140,0,0,0.11)"/>
        <circle cx="6%" cy="75%" r="3.5" fill="rgba(140,0,0,0.11)"/>
        <circle cx="94%" cy="72%" r="3.5" fill="rgba(0,80,20,0.11)"/>
        <line x1="10%" y1="25%" x2="14%" y2="40%"
          stroke="rgba(0,80,20,0.09)" strokeWidth="0.8"/>
        <line x1="88%" y1="20%" x2="92%" y2="38%"
          stroke="rgba(140,0,0,0.09)" strokeWidth="0.8"/>
      </svg>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '64px',
        background: '#071a0a',
        boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 4px 32px rgba(0,0,0,0.22)',
      }}>

        {/* Kenyan flag stripe — 4px, bold, unmissable */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,80,80,0.2), 0 4px 14px rgba(187,0,0,0.45)',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.4px', lineHeight: 1 }}>
              <span style={{ color: '#ffffff' }}>Phish</span>
              <span style={{
                color: 'transparent',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Ripoti</span>
            </span>
            <span style={{
              fontSize: '8.5px', letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.28)',
              textTransform: 'uppercase',
            }}>Threat Intelligence</span>
          </div>
        </div>

        {/* IT Manager Portal */}
        <button onClick={() => navigate('/it-login')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '9px 20px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.80)',
          fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', letterSpacing: '0.015em',
          transition: 'all 0.16s ease',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.80)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2"
              stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          IT Manager Portal
        </button>
      </nav>

      {/* ── HERO CONTENT — completely unchanged ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ position: 'relative', zIndex: 10 }}>

        <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.82)',
            border: '1px solid rgba(0,0,0,0.09)',
            color: '#444444',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}>
          <div className="flex gap-1">
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#BB0000' }}/>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#1a1a1a' }}/>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#006600' }}/>
          </div>
          Built for Kenyan financial institutions
        </div>

        <h1 className="font-black mb-2"
          style={{ fontSize:'68px', lineHeight:'1.02', letterSpacing:'-2px', color:'#1a1a1a' }}>
          Ripoti.
        </h1>
        <h1 className="font-black mb-6"
          style={{ fontSize:'68px', lineHeight:'1.02', letterSpacing:'-2px' }}>
          <span style={{ color:'#BB0000' }}>Salama.</span>{' '}
          <span style={{ color:'#006600' }}>Haraka.</span>
        </h1>

        <p className="max-w-xl mx-auto mb-10"
          style={{ fontSize:'18px', color:'#4a4a4a', lineHeight:'1.75' }}>
          Anonymous phishing reports for Kenyan banks. Powered by GPT-4o. No login. No identity stored. Results in seconds.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button onClick={() => navigate('/report/step1')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
            style={{ background:'#BB0000', fontSize:'15px', boxShadow:'0 4px 20px rgba(187,0,0,0.30)' }}
            onMouseOver={e => { e.currentTarget.style.background='#990000'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(187,0,0,0.38)'; }}
            onMouseOut={e => { e.currentTarget.style.background='#BB0000'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(187,0,0,0.30)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
            </svg>
            Report a Suspicious Email
          </button>

          <button onClick={() => navigate('/awareness')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
            style={{ background:'#006600', fontSize:'15px', boxShadow:'0 4px 20px rgba(0,102,0,0.25)' }}
            onMouseOver={e => { e.currentTarget.style.background='#005000'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(0,102,0,0.32)'; }}
            onMouseOut={e => { e.currentTarget.style.background='#006600'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,102,0,0.25)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke="#fff" strokeWidth="2"/>
            </svg>
            Go to Awareness Hub
          </button>

          <button disabled
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold transition-all cursor-not-allowed"
            style={{
              background:'rgba(255,255,255,0.60)',
              color:'#aaaaaa',
              border:'1px solid rgba(0,0,0,0.08)',
              fontSize:'15px',
              backdropFilter:'blur(8px)',
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#cccccc" strokeWidth="2"/>
            </svg>
            Ask PhishRipoti AI
            <span style={{ fontSize:'10px', background:'rgba(0,0,0,0.06)', color:'#aaaaaa', padding:'2px 6px', borderRadius:'4px' }}>v2.0</span>
          </button>
        </div>

        <div style={{
          width:'100%', maxWidth:'640px', height:'1px',
          background:'linear-gradient(90deg, transparent, rgba(0,0,0,0.09), transparent)',
          marginBottom:'48px',
        }} />

        <div className="flex flex-wrap gap-5 justify-center max-w-3xl">
          {[
            { icon:'🔒', title:'Your identity is never stored', desc:'Fully anonymous by design. No name, no email, no IP address stored.', border:'rgba(187,0,0,0.13)', hover:'rgba(255,225,225,0.55)' },
            { icon:'⚡', title:'AI analyses your report instantly', desc:'GPT-4o scans for phishing signals and risk tier in real time.', border:'rgba(0,0,0,0.08)', hover:'rgba(255,255,255,0.95)' },
            { icon:'🇰🇪', title:'Built for Kenya', desc:'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', border:'rgba(0,102,0,0.13)', hover:'rgba(225,255,225,0.55)' }
          ].map((card, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.75)',
              border:`1px solid ${card.border}`,
              borderRadius:'16px', padding:'24px 20px',
              minWidth:'180px', maxWidth:'210px', flex:'1',
              textAlign:'center',
              boxShadow:'0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              backdropFilter:'blur(14px)',
              WebkitBackdropFilter:'blur(14px)',
              transition:'transform 0.2s, box-shadow 0.2s, background 0.2s',
            }}
              onMouseOver={e => {
                e.currentTarget.style.transform='translateY(-4px)';
                e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.11)';
                e.currentTarget.style.background=card.hover;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform='translateY(0)';
                e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
                e.currentTarget.style.background='rgba(255,255,255,0.75)';
              }}>
              <div style={{ fontSize:'28px', marginBottom:'10px' }}>{card.icon}</div>
              <div style={{ fontWeight:'700', fontSize:'14px', color:'#1a1a1a', marginBottom:'6px' }}>{card.title}</div>
              <div style={{ fontSize:'12px', color:'#777777', lineHeight:'1.6' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;