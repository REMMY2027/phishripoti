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

      {/* ── BASE — warm parchment ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#c8bfa8' }} />

      {/* ── STRONG CENTRE SPOTLIGHT ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 65% 60% at 50% 40%, rgba(255,252,245,0.98) 0%, rgba(250,244,232,0.95) 20%, rgba(238,230,212,0.88) 42%, rgba(210,198,175,0.60) 65%, transparent 100%)',
      }} />

      {/* ── DEEP WARM VIGNETTE ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 110% 110% at 50% 50%, transparent 42%, rgba(100,80,45,0.32) 75%, rgba(70,52,22,0.55) 100%)',
      }} />

      {/* ── TOP GREEN BAND ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 3,
        background: 'linear-gradient(180deg, rgba(3,22,6,0.30) 0%, rgba(3,22,6,0.10) 16%, transparent 32%)',
      }} />

      {/* ── BOTTOM RED BAND ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 4,
        background: 'linear-gradient(0deg, rgba(80,0,0,0.24) 0%, rgba(80,0,0,0.08) 16%, transparent 32%)',
      }} />

      {/* ── DIAGONAL LIGHT RAY ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 5,
        background: 'linear-gradient(135deg, rgba(255,252,240,0.16) 0%, rgba(255,252,240,0.05) 30%, transparent 55%)',
      }} />

      {/* ── NAIROBI SKYLINE ── */}
      <div style={{
        position: 'fixed', bottom: '-30px', right: 0,
        width: '580px', height: '220px',
        zIndex: 6, pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260"
          xmlns="http://www.w3.org/2000/svg" fill="#4a3a20" opacity="0.20">
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

      {/* ── DECORATIVE SVG ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 7, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,80,20,0.10)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="280" fill="none" stroke="rgba(0,80,20,0.07)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="210" fill="none" stroke="rgba(0,80,20,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(140,0,0,0.10)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="250" fill="none" stroke="rgba(140,0,0,0.07)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="180" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <polygon points="200,480 225,466 250,480 250,508 225,522 200,508"
          fill="none" stroke="rgba(0,80,20,0.09)" strokeWidth="1.5"/>
        <polygon points="1050,180 1075,166 1100,180 1100,208 1075,222 1050,208"
          fill="none" stroke="rgba(140,0,0,0.09)" strokeWidth="1.5"/>
        <path d="M 0 500 Q 350 350 700 480 T 1400 420"
          fill="none" stroke="rgba(0,80,20,0.06)" strokeWidth="1.5"/>
        <path d="M 0 600 Q 400 450 750 560 T 1400 500"
          fill="none" stroke="rgba(140,0,0,0.05)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="3" fill="rgba(0,80,20,0.12)"/>
        <circle cx="14%" cy="40%" r="2" fill="rgba(0,80,20,0.09)"/>
        <circle cx="88%" cy="20%" r="3.5" fill="rgba(140,0,0,0.12)"/>
        <circle cx="92%" cy="38%" r="2" fill="rgba(140,0,0,0.09)"/>
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
        boxShadow: '0 2px 28px rgba(0,0,0,0.25)',
        flexShrink: 0,
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
        <button onClick={() => navigate('/it/login')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          color: 'rgba(255,255,255,0.82)',
          fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', letterSpacing: '0.015em',
          transition: 'all 0.16s ease',
        }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.13)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
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

      {/* ── PAGE CONTENT ── */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        padding: '26px 44px 20px',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: '3px', borderRadius: '2px',
              width: i === 1 ? '28px' : '18px',
              background: i === 1 ? '#BB0000' : 'rgba(0,0,0,0.18)',
            }} />
          ))}
          <span style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: 'rgba(0,0,0,0.42)', textTransform: 'uppercase',
            marginLeft: '6px',
          }}>Step 1 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute', top: '-14px', left: '-4px',
            fontSize: '82px', fontWeight: '900',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(187,0,0,0.07)',
            letterSpacing: '-4px', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          }}>
            INCIDENT
          </div>
          <h2 style={{
            position: 'relative', zIndex: 1,
            fontWeight: '800', fontSize: '22px',
            margin: '0 0 6px', letterSpacing: '-0.4px',
          }}>
            <span style={{ color: '#1a1a1a' }}>What type of </span>
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 45%, #006600 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>incident</span>
            <span style={{ color: '#1a1a1a' }}> are you reporting?</span>
          </h2>
          <p style={{
            position: 'relative', zIndex: 1,
            color: 'rgba(0,0,0,0.45)', fontSize: '13px',
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
          maxWidth: '780px',
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
                  // Light card on warm background
                  background: type.active
                    ? hov
                      ? 'rgba(255,255,255,0.88)'
                      : 'rgba(255,255,255,0.78)'
                    : 'rgba(255,255,255,0.45)',
                  border: type.active
                    ? hov
                      ? '1px solid rgba(187,0,0,0.25)'
                      : '1px solid rgba(0,0,0,0.09)'
                    : '1px solid rgba(0,0,0,0.06)',
                  transform: hov ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 0.20s ease',
                  boxShadow: type.active
                    ? hov
                      ? '0 12px 40px rgba(0,0,0,0.14), 0 0 0 2px rgba(187,0,0,0.12)'
                      : '0 4px 20px rgba(0,0,0,0.10)'
                    : '0 2px 10px rgba(0,0,0,0.07)',
                  opacity: type.active ? 1 : 0.60,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}>

                {/* Left accent bar */}
                <div style={{
                  width: '5px', flexShrink: 0,
                  background: type.active
                    ? hov
                      ? 'linear-gradient(180deg, #BB0000, #006600)'
                      : '#BB0000'
                    : 'rgba(0,0,0,0.12)',
                  opacity: type.active ? (hov ? 1 : 0.80) : 0.35,
                  borderRadius: '16px 0 0 16px',
                  transition: 'all 0.20s',
                }} />

                {/* Card content */}
                <div style={{ flex: 1, padding: '18px 18px 16px 16px' }}>

                  {/* Icon + badge row */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '12px',
                  }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '11px',
                      background: type.active
                        ? hov
                          ? 'rgba(187,0,0,0.10)'
                          : 'rgba(0,0,0,0.06)'
                        : 'rgba(0,0,0,0.04)',
                      border: type.active
                        ? hov
                          ? '1px solid rgba(187,0,0,0.20)'
                          : '1px solid rgba(0,0,0,0.09)'
                        : '1px solid rgba(0,0,0,0.06)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '19px',
                      transition: 'all 0.20s',
                    }}>
                      {type.icon}
                    </div>

                    <span style={{
                      fontSize: '9px', fontWeight: '800',
                      padding: '3px 9px', borderRadius: '20px',
                      letterSpacing: '0.09em', textTransform: 'uppercase',
                      background: type.active
                        ? 'rgba(0,102,0,0.10)'
                        : 'rgba(0,0,0,0.05)',
                      color: type.active ? '#006600' : 'rgba(0,0,0,0.30)',
                      border: type.active
                        ? '1px solid rgba(0,102,0,0.20)'
                        : '1px solid rgba(0,0,0,0.08)',
                    }}>
                      {type.active ? '✓ Active' : 'v2.0'}
                    </span>
                  </div>

                  {/* Title */}
                  <div style={{
                    color: type.active ? '#111111' : 'rgba(0,0,0,0.35)',
                    fontWeight: '800', fontSize: '14px',
                    marginBottom: '6px', letterSpacing: '-0.2px',
                  }}>
                    {type.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    color: type.active ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.28)',
                    fontSize: '12px', lineHeight: '1.65',
                    marginBottom: '14px',
                  }}>
                    {type.description}
                  </div>

                  {/* Threat tag */}
                  <div style={{
                    padding: '7px 10px', borderRadius: '8px',
                    background: type.active
                      ? 'rgba(187,0,0,0.07)'
                      : 'rgba(0,0,0,0.03)',
                    border: type.active
                      ? '1px solid rgba(187,0,0,0.16)'
                      : '1px solid rgba(0,0,0,0.06)',
                    fontSize: '11px',
                    color: type.active
                      ? '#BB0000'
                      : 'rgba(0,0,0,0.25)',
                    lineHeight: '1.5',
                    fontWeight: '600',
                  }}>
                    ⚠ {type.threat}
                  </div>

                  {/* Arrow */}
                  {type.active && (
                    <div style={{
                      textAlign: 'right', marginTop: '10px',
                      color: hov ? '#BB0000' : 'rgba(0,0,0,0.22)',
                      fontSize: '16px', transition: 'all 0.20s',
                      transform: hov ? 'translateX(3px)' : 'translateX(0)',
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