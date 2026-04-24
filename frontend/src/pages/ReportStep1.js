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
    active: true
  },
  {
    id: 'smishing',
    icon: '💬',
    title: 'Smishing (SMS Phishing)',
    description: 'Fraudulent text messages impersonating M-Pesa, Safaricom or banks to steal credentials.',
    threat: 'Rapidly growing threat targeting mobile banking users',
    active: false
  },
  {
    id: 'vishing',
    icon: '📞',
    title: 'Vishing (Voice Call)',
    description: 'Fraudulent phone calls impersonating bank executives, IT support or regulatory bodies.',
    threat: 'Used to bypass digital security controls',
    active: false
  },
  {
    id: 'social',
    icon: '🎭',
    title: 'Social Engineering',
    description: 'In-person or online psychological manipulation to gain unauthorised access to systems or data.',
    threat: 'Targets human trust rather than technical vulnerabilities',
    active: false
  }
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

      {/* ── BASE ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#e8e2d4' }} />

      {/* ── CENTRE RADIAL LIFT ── */}
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

      {/* ── NAIROBI SKYLINE ── */}
      <div style={{
        position: 'fixed', bottom: '-30px', right: 0,
        width: '580px', height: '220px',
        zIndex: 5, pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260"
          xmlns="http://www.w3.org/2000/svg" fill="#5a4a35" opacity="0.13">
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
        <path d="M 0 500 Q 350 350 700 480 T 1400 420"
          fill="none" stroke="rgba(0,80,20,0.055)" strokeWidth="1.5"/>
        <path d="M 0 600 Q 400 450 750 560 T 1400 500"
          fill="none" stroke="rgba(140,0,0,0.045)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="3" fill="rgba(0,80,20,0.11)"/>
        <circle cx="14%" cy="40%" r="2" fill="rgba(0,80,20,0.08)"/>
        <circle cx="88%" cy="20%" r="3.5" fill="rgba(140,0,0,0.11)"/>
        <circle cx="92%" cy="38%" r="2" fill="rgba(140,0,0,0.08)"/>
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
        <button onClick={() => navigate('/it-login')} style={{
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
              background: i === 1 ? '#BB0000' : 'rgba(0,0,0,0.15)',
            }} />
          ))}
          <span style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase',
            marginLeft: '6px',
          }}>Step 1 of 4</span>
        </div>

        <h2 style={{
          color: '#1a1a1a', fontWeight: '800', fontSize: '22px',
          margin: '0 0 5px', letterSpacing: '-0.4px',
        }}>
          What type of incident are you reporting?
        </h2>
        <p style={{
          color: 'rgba(0,0,0,0.42)', fontSize: '13px',
          margin: '0 0 22px', lineHeight: '1.6',
        }}>
          Select the incident type that best describes what you received. Only Phishing Email is active in v1.0.
        </p>

        {/* ── 2x2 GRID — same dark style as ReportStep2 ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
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
                  borderRadius: '13px',
                  padding: '16px 16px 14px',
                  cursor: type.active ? 'pointer' : 'not-allowed',
                  position: 'relative',
                  overflow: 'hidden',
                  // Same near-black as ReportStep2
                  background: type.active
                    ? hov
                      ? 'rgba(12,16,12,0.97)'
                      : 'rgba(14,19,14,0.95)'
                    : 'rgba(16,20,15,0.90)',
                  border: type.active
                    ? hov
                      ? '1px solid rgba(34,197,94,0.25)'
                      : '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(255,255,255,0.05)',
                  transform: hov ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.18s ease',
                  boxShadow: type.active
                    ? hov
                      ? '0 0 0 1px rgba(34,197,94,0.10), 0 10px 32px rgba(0,0,0,0.30)'
                      : '0 4px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)'
                    : '0 2px 12px rgba(0,0,0,0.18)',
                  opacity: type.active ? 1 : 0.55,
                }}>

                {/* Left accent strip */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '3px', height: '100%',
                  background: type.active
                    ? hov
                      ? 'linear-gradient(180deg, #4ade80, #BB0000)'
                      : '#BB0000'
                    : 'rgba(255,255,255,0.08)',
                  opacity: type.active ? (hov ? 1 : 0.7) : 0.3,
                  transition: 'all 0.18s',
                }} />

                {/* Top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: type.active
                    ? hov
                      ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.22), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)'
                    : 'none',
                }} />

                {/* Icon + badge row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: '10px',
                  paddingLeft: '8px',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: type.active
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '17px',
                    transition: 'all 0.18s',
                  }}>
                    {type.icon}
                  </div>

                  <span style={{
                    fontSize: '9px', fontWeight: '700',
                    padding: '3px 8px', borderRadius: '20px',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: type.active
                      ? 'rgba(34,197,94,0.12)'
                      : 'rgba(255,255,255,0.05)',
                    color: type.active ? '#4ade80' : 'rgba(255,255,255,0.25)',
                    border: type.active
                      ? '1px solid rgba(34,197,94,0.20)'
                      : '1px solid rgba(255,255,255,0.07)',
                  }}>
                    {type.active ? '✓ Active' : 'v2.0'}
                  </span>
                </div>

                {/* Title */}
                <div style={{
                  paddingLeft: '8px',
                  color: type.active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.32)',
                  fontWeight: '700', fontSize: '13px',
                  marginBottom: '5px', letterSpacing: '-0.1px',
                }}>
                  {type.title}
                </div>

                {/* Description */}
                <div style={{
                  paddingLeft: '8px',
                  color: type.active ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.18)',
                  fontSize: '11px', lineHeight: '1.6', marginBottom: '12px',
                }}>
                  {type.description}
                </div>

                {/* Threat tag */}
                <div style={{
                  marginLeft: '8px',
                  padding: '6px 10px', borderRadius: '7px',
                  background: type.active
                    ? 'rgba(187,0,0,0.10)'
                    : 'rgba(255,255,255,0.03)',
                  border: type.active
                    ? '1px solid rgba(187,0,0,0.18)'
                    : '1px solid rgba(255,255,255,0.05)',
                  fontSize: '10px',
                  color: type.active
                    ? 'rgba(255,110,110,0.80)'
                    : 'rgba(255,255,255,0.16)',
                  lineHeight: '1.5',
                }}>
                  ⚠ {type.threat}
                </div>

                {/* Arrow */}
                {type.active && (
                  <div style={{
                    position: 'absolute', bottom: '14px', right: '14px',
                    color: hov
                      ? 'rgba(34,197,94,0.70)'
                      : 'rgba(255,255,255,0.16)',
                    fontSize: '14px', transition: 'all 0.18s',
                    transform: hov ? 'translateX(3px)' : 'translateX(0)',
                  }}>→</div>
                )}
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