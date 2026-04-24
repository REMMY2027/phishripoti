import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── BASE — warm ivory ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#e8e2d4' }} />

      {/* ── STRONGER CENTRE RADIAL — clear light source from above ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 65% at 50% 38%, rgba(255,253,248,0.97) 0%, rgba(248,244,234,0.94) 25%, rgba(240,234,220,0.82) 50%, rgba(220,213,196,0.45) 72%, transparent 100%)',
      }} />

      {/* ── EDGE DARKENING — corners sink into warmth ── */}
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

      {/* ── NAIROBI SKYLINE — fades in from right ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '640px',
        height: '250px',
        zIndex: 5,
        pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
      }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 580 260"
          xmlns="http://www.w3.org/2000/svg"
          fill="#5a4a35"
          opacity="0.18"
        >
          {/* Far background buildings */}
          <rect x="20" y="180" width="18" height="80" />
          <rect x="42" y="170" width="14" height="90" />
          <rect x="60" y="185" width="20" height="75" />
          <rect x="84" y="175" width="16" height="85" />
          <rect x="104" y="188" width="22" height="72" />

          {/* CBK Pension Towers — tallest */}
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
          <rect x="316" y="98" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="326" y="98" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="336" y="98" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="316" y="112" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="326" y="112" width="6" height="8" fill="rgba(255,255,255,0.2)" />
          <rect x="336" y="112" width="6" height="8" fill="rgba(255,255,255,0.2)" />

          {/* KICC dome tower */}
          <rect x="200" y="90" width="32" height="170" />
          <ellipse cx="216" cy="90" rx="18" ry="8" />
          <rect x="212" y="75" width="8" height="18" />
          <rect x="214" y="65" width="4" height="12" />

          {/* Times Tower */}
          <rect x="380" y="80" width="34" height="180" />
          <rect x="386" y="72" width="22" height="12" />
          <rect x="392" y="62" width="10" height="12" />
          <rect x="395" y="52" width="4" height="12" />

          {/* Mid-height buildings */}
          <rect x="150" y="120" width="26" height="140" />
          <rect x="180" y="130" width="18" height="130" />
          <rect x="250" y="110" width="24" height="150" />
          <rect x="278" y="125" width="28" height="135" />
          <rect x="418" y="100" width="28" height="160" />
          <rect x="450" y="115" width="22" height="145" />
          <rect x="476" y="130" width="26" height="130" />

          {/* Shorter foreground buildings */}
          <rect x="130" y="155" width="18" height="105" />
          <rect x="500" y="150" width="20" height="110" />
          <rect x="524" y="160" width="24" height="100" />
          <rect x="552" y="155" width="18" height="105" />

          {/* Ground line */}
          <rect x="0" y="258" width="580" height="2" />
        </svg>
      </div>

      {/* ── DECORATIVE SVG — circles, hexagons, curves only ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 6, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,80,20,0.09)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="280" fill="none" stroke="rgba(0,80,20,0.06)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="210" fill="none" stroke="rgba(0,80,20,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(140,0,0,0.09)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="250" fill="none" stroke="rgba(140,0,0,0.06)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="180" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <polygon points="200,480 225,466 250,480 250,508 225,522 200,508"
          fill="none" stroke="rgba(0,80,20,0.09)" strokeWidth="1.5"/>
        <polygon points="1050,180 1075,166 1100,180 1100,208 1075,222 1050,208"
          fill="none" stroke="rgba(140,0,0,0.09)" strokeWidth="1.5"/>
        <polygon points="900,80 918,70 936,80 936,100 918,110 900,100"
          fill="none" stroke="rgba(0,80,20,0.06)" strokeWidth="1"/>
        <polygon points="80,350 98,340 116,350 116,370 98,380 80,370"
          fill="none" stroke="rgba(140,0,0,0.06)" strokeWidth="1"/>
        <path d="M 0 500 Q 350 350 700 480 T 1400 420"
          fill="none" stroke="rgba(0,80,20,0.055)" strokeWidth="1.5"/>
        <path d="M 0 600 Q 400 450 750 560 T 1400 500"
          fill="none" stroke="rgba(140,0,0,0.045)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="3" fill="rgba(0,80,20,0.11)"/>
        <circle cx="14%" cy="40%" r="2" fill="rgba(0,80,20,0.08)"/>
        <circle cx="88%" cy="20%" r="3.5" fill="rgba(140,0,0,0.11)"/>
        <circle cx="92%" cy="38%" r="2" fill="rgba(140,0,0,0.08)"/>
        <circle cx="6%" cy="75%" r="3" fill="rgba(140,0,0,0.08)"/>
        <circle cx="94%" cy="72%" r="3" fill="rgba(0,80,20,0.08)"/>
        <line x1="10%" y1="25%" x2="14%" y2="40%"
          stroke="rgba(0,80,20,0.07)" strokeWidth="0.8"/>
        <line x1="88%" y1="20%" x2="92%" y2="38%"
          stroke="rgba(140,0,0,0.07)" strokeWidth="0.8"/>
      </svg>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '66px',
        background: '#061508',
        boxShadow: '0 2px 28px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,80,80,0.18), 0 4px 16px rgba(187,0,0,0.50)',
            flexShrink: 0,
          }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: 1 }}>
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

        <button onClick={() => navigate('/it-login')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          color: 'rgba(255,255,255,0.82)',
          fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', letterSpacing: '0.015em',
          transition: 'all 0.16s ease',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.13)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.82)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          IT Manager Portal
        </button>
      </nav>

      {/* ── HERO CONTENT — unchanged ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ position: 'relative', zIndex: 10 }}>

        <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.84)',
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
            { icon:'🔒', title:'Your identity is never stored', desc:'Fully anonymous by design. No name, no email, no IP address stored.', border:'rgba(187,0,0,0.13)', hover:'rgba(255,225,225,0.60)' },
            { icon:'⚡', title:'AI analyses your report instantly', desc:'GPT-4o scans for phishing signals and risk tier in real time.', border:'rgba(0,0,0,0.08)', hover:'rgba(255,255,255,0.96)' },
            { icon:'🇰🇪', title:'Built for Kenya', desc:'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', border:'rgba(0,102,0,0.13)', hover:'rgba(225,255,225,0.60)' }
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