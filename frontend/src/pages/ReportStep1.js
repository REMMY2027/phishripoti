import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const incidentTypes = [
  {
    id: 'phishing',
    icon: '📧',
    title: 'Phishing Email',
    description: 'Suspicious email requesting credentials, payment, or personal data via deceptive links or attachments.',
    threat: 'Most common attack vector in Kenyan financial institutions',
    active: true,
  },
  {
    id: 'smishing',
    icon: '💬',
    title: 'Smishing (SMS Phishing)',
    description: 'Fraudulent text messages impersonating M-Pesa, Safaricom or banks to steal credentials.',
    threat: 'Rapidly growing threat targeting mobile banking users',
    active: false,
  },
  {
    id: 'vishing',
    icon: '📞',
    title: 'Vishing (Voice Call)',
    description: 'Fraudulent phone calls impersonating bank executives, IT support or regulatory bodies.',
    threat: 'Used to bypass digital security controls',
    active: false,
  },
  {
    id: 'social',
    icon: '🎭',
    title: 'Social Engineering',
    description: 'In-person or online psychological manipulation to gain unauthorised access to systems or data.',
    threat: 'Targets human trust rather than technical vulnerabilities',
    active: false,
  },
];

const ReportStep1 = () => {
  const navigate = useNavigate();
  const { updateReport } = useReport();
  const [hovered, setHovered] = useState(null);

  const handleSelect = () => {
    updateReport({ incidentType: 'Phishing Email' });
    navigate('/report/step2');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* ── BASE — pure white ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />

      {/* ── SUBTLE RADIAL DEPTH — centre slightly warmer ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)',
      }} />

      {/* ── VERY FAINT GREEN TOP ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)',
      }} />

      {/* ── VERY FAINT RED BOTTOM ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 3,
        background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)',
      }} />

      {/* ── SUBTLE SVG TEXTURE ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 4, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        {/* Transaction flow curves */}
        <path d="M -100 300 Q 200 180 500 320 T 1100 280 T 1600 300"
          fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <path d="M -100 450 Q 250 330 600 460 T 1200 400"
          fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>
        <path d="M 0 600 Q 350 480 750 600 T 1400 560"
          fill="none" stroke="rgba(140,0,0,0.03)" strokeWidth="1"/>
        {/* Corner arcs */}
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="160" fill="none" stroke="rgba(0,100,30,0.03)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="140" fill="none" stroke="rgba(140,0,0,0.03)" strokeWidth="1"/>
        {/* Network dots */}
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="13%" cy="42%" r="1.8" fill="rgba(0,100,30,0.06)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
        <circle cx="93%" cy="38%" r="1.8" fill="rgba(140,0,0,0.06)"/>
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="89%" y1="20%" x2="93%" y2="38%" stroke="rgba(140,0,0,0.05)" strokeWidth="0.7"/>
      </svg>

      {/* ── NAIROBI SKYLINE ── */}
      <div style={{
        position: 'fixed', bottom: '-30px', right: 0,
        width: '580px', height: '220px',
        zIndex: 5, pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260"
          xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="180" width="18" height="80" />
          <rect x="42" y="170" width="14" height="90" />
          <rect x="60" y="185" width="20" height="75" />
          <rect x="84" y="175" width="16" height="85" />
          <rect x="104" y="188" width="22" height="72" />
          <rect x="310" y="60" width="38" height="200" />
          <rect x="318" y="50" width="22" height="15" />
          <rect x="324" y="40" width="10" height="14" />
          <rect x="327" y="30" width="4" height="12" />
          <rect x="200" y="90" width="32" height="170" />
          <ellipse cx="216" cy="90" rx="18" ry="8" />
          <rect x="212" y="75" width="8" height="18" />
          <rect x="214" y="65" width="4" height="12" />
          <rect x="380" y="80" width="34" height="180" />
          <rect x="386" y="72" width="22" height="12" />
          <rect x="392" y="62" width="10" height="12" />
          <rect x="395" y="52" width="4" height="12" />
          <rect x="150" y="120" width="26" height="140" />
          <rect x="180" y="130" width="18" height="130" />
          <rect x="250" y="110" width="24" height="150" />
          <rect x="278" y="125" width="28" height="135" />
          <rect x="418" y="100" width="28" height="160" />
          <rect x="450" y="115" width="22" height="145" />
          <rect x="476" y="130" width="26" height="130" />
          <rect x="130" y="155" width="18" height="105" />
          <rect x="500" y="150" width="20" height="110" />
          <rect x="524" y="160" width="24" height="100" />
          <rect x="552" y="155" width="18" height="105" />
          <rect x="0" y="258" width="580" height="2" />
        </svg>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '66px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        {/* Kenyan flag stripe */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(187,0,0,0.30)',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.4px', lineHeight: 1 }}>
            <span style={{ color: '#111111' }}>Phish</span>
            <span style={{ color: '#006600' }}>Ripoti</span>
          </span>
        </div>

        <button onClick={() => navigate('/it/login')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '9px 18px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.70)',
          border: '1px solid rgba(0,0,0,0.10)',
          color: '#333333', fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', letterSpacing: '0.01em',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'all 0.16s ease',
        }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.10)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.70)';
            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          IT Manager Portal
        </button>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        padding: '28px 44px 20px',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: '3px', borderRadius: '2px',
              width: i === 1 ? '28px' : '18px',
              background: i === 1 ? '#BB0000' : 'rgba(0,0,0,0.14)',
            }} />
          ))}
          <span style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase',
            marginLeft: '6px', fontWeight: '600',
          }}>Step 1 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ position: 'relative', marginBottom: '26px' }}>
          <div style={{
            position: 'absolute', top: '-14px', left: '-4px',
            fontSize: '82px', fontWeight: '900',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(187,0,0,0.06)',
            letterSpacing: '-4px', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          }}>
            INCIDENT
          </div>
          <h2 style={{
            position: 'relative', zIndex: 1,
            fontWeight: '900', fontSize: '24px',
            margin: '0 0 7px', letterSpacing: '-0.5px',
            color: '#111111',
          }}>
            What type of{' '}
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 45%, #006600 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>incident</span>
            {' '}are you reporting?
          </h2>
          <p style={{
            position: 'relative', zIndex: 1,
            color: 'rgba(0,0,0,0.45)', fontSize: '14px',
            margin: 0, lineHeight: '1.6',
          }}>
            Select the incident type that best describes what you received. Only Phishing Email is active in v1.0.
          </p>
        </div>

        {/* ── CARDS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          width: '100%',
          maxWidth: '820px',
        }}>
          {incidentTypes.map((type) => {
            const hov = hovered === type.id;
            return (
              <div
                key={type.id}
                onClick={type.active ? handleSelect : undefined}
                onMouseEnter={() => type.active && setHovered(type.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '16px',
                  padding: '0',
                  cursor: type.active ? 'pointer' : 'not-allowed',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  // Dark charcoal glass cards on white bg
                  background: type.active
                    ? hov
                      ? 'rgba(18,26,18,0.94)'
                      : 'rgba(22,30,22,0.90)'
                    : 'rgba(30,35,30,0.55)',
                  border: type.active
                    ? hov
                      ? '1px solid rgba(187,0,0,0.35)'
                      : '1px solid rgba(255,255,255,0.10)'
                    : '1px solid rgba(255,255,255,0.06)',
                  transform: hov ? 'translateY(-3px) scale(1.005)' : 'translateY(0) scale(1)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: type.active
                    ? hov
                      ? '0 16px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(187,0,0,0.12)'
                      : '0 6px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : '0 2px 10px rgba(0,0,0,0.08)',
                  opacity: type.active ? 1 : 0.55,
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                }}>

                {/* Glass sheen */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
                  pointerEvents: 'none', borderRadius: '16px',
                }} />

                {/* Top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: hov
                    ? 'linear-gradient(90deg, transparent, rgba(187,0,0,0.40), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
                }} />

                {/* Left accent bar */}
                <div style={{
                  width: '5px', flexShrink: 0,
                  background: type.active
                    ? hov
                      ? 'linear-gradient(180deg, #BB0000, #006600)'
                      : '#BB0000'
                    : 'rgba(255,255,255,0.10)',
                  opacity: type.active ? (hov ? 1 : 0.75) : 0.30,
                  borderRadius: '16px 0 0 16px',
                  transition: 'all 0.22s',
                  boxShadow: hov ? '2px 0 12px rgba(187,0,0,0.25)' : 'none',
                }} />

                {/* Card content */}
                <div style={{ flex: 1, padding: '20px 18px 18px 16px' }}>

                  {/* Icon + badge */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '14px',
                  }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '12px',
                      background: type.active
                        ? hov
                          ? 'rgba(187,0,0,0.18)'
                          : 'rgba(255,255,255,0.08)'
                        : 'rgba(255,255,255,0.05)',
                      border: type.active
                        ? hov
                          ? '1px solid rgba(187,0,0,0.30)'
                          : '1px solid rgba(255,255,255,0.10)'
                        : '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '20px',
                      transition: 'all 0.22s',
                      boxShadow: hov ? '0 0 16px rgba(187,0,0,0.20)' : 'none',
                    }}>
                      {type.icon}
                    </div>

                    <span style={{
                      fontSize: '9px', fontWeight: '800',
                      padding: '4px 10px', borderRadius: '20px',
                      letterSpacing: '0.09em', textTransform: 'uppercase',
                      background: type.active
                        ? 'rgba(34,197,94,0.14)'
                        : 'rgba(255,255,255,0.06)',
                      color: type.active ? '#4ade80' : 'rgba(255,255,255,0.25)',
                      border: type.active
                        ? '1px solid rgba(34,197,94,0.25)'
                        : '1px solid rgba(255,255,255,0.08)',
                    }}>
                      {type.active ? '✓ Active' : 'v2.0'}
                    </span>
                  </div>

                  {/* Title */}
                  <div style={{
                    color: type.active ? '#ffffff' : 'rgba(255,255,255,0.35)',
                    fontWeight: '800', fontSize: '14px',
                    marginBottom: '7px', letterSpacing: '-0.2px',
                  }}>
                    {type.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    color: type.active ? 'rgba(255,255,255,0.52)' : 'rgba(255,255,255,0.20)',
                    fontSize: '12px', lineHeight: '1.65',
                    marginBottom: '14px',
                  }}>
                    {type.description}
                  </div>

                  {/* Threat tag */}
                  <div style={{
                    padding: '7px 11px', borderRadius: '8px',
                    background: type.active
                      ? 'rgba(187,0,0,0.12)'
                      : 'rgba(255,255,255,0.04)',
                    border: type.active
                      ? '1px solid rgba(187,0,0,0.22)'
                      : '1px solid rgba(255,255,255,0.06)',
                    fontSize: '11px',
                    color: type.active
                      ? 'rgba(255,120,120,0.90)'
                      : 'rgba(255,255,255,0.18)',
                    lineHeight: '1.5', fontWeight: '600',
                  }}>
                    ⚠ {type.threat}
                  </div>

                  {/* Arrow */}
                  {type.active && (
                    <div style={{
                      textAlign: 'right', marginTop: '10px',
                      color: hov ? 'rgba(187,0,0,0.80)' : 'rgba(255,255,255,0.20)',
                      fontSize: '16px', transition: 'all 0.22s',
                      transform: hov ? 'translateX(4px)' : 'translateX(0)',
                    }}>→</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── NEXT STRIP ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <NextStrip
          steps={['Incident Type', 'Department', 'Email Details', 'Submit']}
          currentStep={0}
          onNext={handleSelect}
          nextLabel="Next: Select Department →"
        />
      </div>
    </div>
  );
};

export default ReportStep1;