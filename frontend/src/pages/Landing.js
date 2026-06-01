import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── BASE — warm ivory ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#e8e2d4' }} />

      {/* ── CENTRE RADIAL ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 65% at 50% 38%, rgba(255,253,248,0.97) 0%, rgba(248,244,234,0.94) 25%, rgba(240,234,220,0.82) 50%, rgba(220,213,196,0.45) 72%, transparent 100%)',
      }} />

      {/* ── EDGE DARKENING ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(180,165,140,0.28) 100%)',
      }} />

      {/* ── TOP GREEN BAND ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 3,
        background: 'linear-gradient(180deg, rgba(4,26,8,0.24) 0%, rgba(4,26,8,0.08) 14%, transparent 30%)',
      }} />

      {/* ── BOTTOM RED BAND ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 4,
        background: 'linear-gradient(0deg, rgba(90,0,0,0.18) 0%, rgba(90,0,0,0.07) 14%, transparent 30%)',
      }} />

      {/* ── NAIROBI SKYLINE — hidden on mobile ── */}
      <div style={{
        position: 'fixed', bottom: 0, right: 0,
        width: '640px', height: '250px',
        zIndex: 5, pointerEvents: 'none',
        display: window.innerWidth < 640 ? 'none' : 'block',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260"
          xmlns="http://www.w3.org/2000/svg" fill="#5a4a35" opacity="0.18">
          <rect x="20" y="180" width="18" height="80" />
          <rect x="42" y="170" width="14" height="90" />
          <rect x="60" y="185" width="20" height="75" />
          <rect x="84" y="175" width="16" height="85" />
          <rect x="104" y="188" width="22" height="72" />
          <rect x="310" y="60" width="38" height="200" />
          <rect x="318" y="50" width="22" height="15" />
          <rect x="324" y="40" width="10" height="14" />
          <rect x="327" y="30" width="4" height="12" />
          <rect x="316" y="70" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="326" y="70" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="336" y="70" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="316" y="84" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="326" y="84" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="336" y="84" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="200" y="90" width="32" height="170" />
          <ellipse cx="216" cy="90" rx="18" ry="8" />
          <rect x="212" y="75" width="8" height="18" />
          <rect x="214" y="65" width="4" height="12" />
          <rect x="380" y="80" width="34" height="180" />
          <rect x="386" y="72" width="22" height="12" />
          <rect x="392" y="62" width="10" height="12" />
          <rect x="395" y="52" width="4" height="12" />
          <rect x="150" y="120" width="26" height="140" />
          <rect x="250" y="110" width="24" height="150" />
          <rect x="418" y="100" width="28" height="160" />
          <rect x="476" y="130" width="26" height="130" />
          <rect x="500" y="150" width="20" height="110" />
          <rect x="524" y="160" width="24" height="100" />
          <rect x="552" y="155" width="18" height="105" />
          <rect x="0" y="258" width="580" height="2" />
        </svg>
      </div>

      {/* ── DECORATIVE SVG ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 6, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,80,20,0.09)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="280" fill="none" stroke="rgba(0,80,20,0.06)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(140,0,0,0.09)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="250" fill="none" stroke="rgba(140,0,0,0.06)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="3" fill="rgba(0,80,20,0.11)"/>
        <circle cx="88%" cy="20%" r="3.5" fill="rgba(140,0,0,0.11)"/>
      </svg>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', height: '56px',
        background: '#061508',
        boxShadow: '0 2px 28px rgba(0,0,0,0.25)',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '9px',
            background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,80,80,0.18), 0 4px 16px rgba(187,0,0,0.50)',
            flexShrink: 0,
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: 1 }}>
            <span style={{ color: '#ffffff' }}>Phish</span>
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Ripoti</span>
          </span>
        </div>

        {/* IT Manager button — shorter on mobile */}
        <button onClick={() => navigate('/it/login')} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 12px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          color: 'rgba(255,255,255,0.82)',
          fontSize: '12px', fontWeight: '600',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span className="hidden sm:inline">IT Manager Portal</span>
          <span className="sm:hidden">IT Portal</span>
        </button>
      </nav>

      {/* ── HERO CONTENT ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 text-center"
        style={{ position: 'relative', zIndex: 10 }}>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.84)',
            border: '1px solid rgba(0,0,0,0.09)',
            color: '#444444',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}>
          <div className="flex gap-1">
            <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#BB0000' }}/>
            <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1a1a1a' }}/>
            <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#006600' }}/>
          </div>
          Built for Kenyan financial institutions
        </div>

        {/* Hero heading — responsive font size */}
        <h1 className="font-black mb-1"
          style={{
            fontSize: 'clamp(40px, 10vw, 68px)',
            lineHeight: '1.02',
            letterSpacing: '-2px',
            color: '#1a1a1a'
          }}>
          Ripoti.
        </h1>
        <h1 className="font-black mb-5"
          style={{
            fontSize: 'clamp(40px, 10vw, 68px)',
            lineHeight: '1.02',
            letterSpacing: '-2px'
          }}>
          <span style={{ color:'#BB0000' }}>Salama.</span>{' '}
          <span style={{ color:'#006600' }}>Haraka.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xs sm:max-w-xl mx-auto mb-8"
          style={{ fontSize: 'clamp(14px, 4vw, 18px)', color:'#4a4a4a', lineHeight:'1.75' }}>
          Anonymous phishing reports for Kenyan banks. Powered by GPT-4o. No login. No identity stored. Results in seconds.
        </p>

        {/* CTA Buttons — stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 w-full max-w-sm sm:max-w-none">
          <button onClick={() => navigate('/report/step1')}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white w-full sm:w-auto"
            style={{ background:'#BB0000', fontSize:'15px', boxShadow:'0 4px 20px rgba(187,0,0,0.30)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
            </svg>
            Report a Suspicious Email
          </button>

          <button onClick={() => navigate('/awareness')}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white w-full sm:w-auto"
            style={{ background:'#006600', fontSize:'15px', boxShadow:'0 4px 20px rgba(0,102,0,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke="#fff" strokeWidth="2"/>
            </svg>
            Go to Awareness Hub
          </button>

          <button disabled
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold w-full sm:w-auto cursor-not-allowed"
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

        {/* Divider */}
        <div style={{
          width:'100%', maxWidth:'640px', height:'1px',
          background:'linear-gradient(90deg, transparent, rgba(0,0,0,0.09), transparent)',
          marginBottom:'36px',
        }} />

        {/* Trust cards — single column on mobile, row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl px-2">
          {[
            { icon:'🔒', title:'Your identity is never stored', desc:'Fully anonymous by design. No name, no email, no IP address stored.', border:'rgba(187,0,0,0.13)' },
            { icon:'⚡', title:'AI analyses your report instantly', desc:'GPT-4o scans for phishing signals and risk tier in real time.', border:'rgba(0,0,0,0.08)' },
            { icon:'🇰🇪', title:'Built for Kenya', desc:'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', border:'rgba(0,102,0,0.13)' }
          ].map((card, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.75)',
              border:`1px solid ${card.border}`,
              borderRadius:'16px',
              padding:'20px 16px',
              textAlign:'center',
              boxShadow:'0 4px 24px rgba(0,0,0,0.08)',
              backdropFilter:'blur(14px)',
              WebkitBackdropFilter:'blur(14px)',
            }}>
              <div style={{ fontSize:'26px', marginBottom:'8px' }}>{card.icon}</div>
              <div style={{ fontWeight:'700', fontSize:'13px', color:'#1a1a1a', marginBottom:'5px' }}>{card.title}</div>
              <div style={{ fontSize:'12px', color:'#777777', lineHeight:'1.6' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;