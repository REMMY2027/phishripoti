import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'High target for M-Pesa impersonation and account takeover phishing.',
    accentRaw: 'green',
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Targeted by invoice fraud, payment diversion and CFO impersonation.',
    accentRaw: 'red',
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    desc: 'Targeted by regulatory impersonation emails pretending to be CBK or KRA.',
    accentRaw: 'green',
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    desc: 'At risk from fake loan documents and credential harvesting attacks.',
    accentRaw: 'red',
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    desc: 'Targeted by system access phishing and fake IT support credential emails.',
    accentRaw: 'green',
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Targeted by payroll diversion and fake employee document phishing.',
    accentRaw: 'red',
  },
];

const ReportStep2 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();
  const [selected, setSelected] = useState(reportData.department || '');
  const [hovered, setHovered] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');

  const handleSelect = (dept) => {
    if (dept.id === 'other') {
      setShowOtherInput(true);
      setSelected('');
      return;
    }
    setShowOtherInput(false);
    setSelected(dept.label);
    updateReport({ department: dept.label });
  };

  const handleOtherConfirm = () => {
    if (otherDept.trim()) {
      setSelected(otherDept.trim());
      updateReport({ department: otherDept.trim() });
      setShowOtherInput(false);
    }
  };

  const handleNext = () => {
    if (selected) navigate('/report/step3');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* ── BASE — deep forest green ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050d06' }} />

      {/* ── STRONG CENTRE GLOW — lifts the middle ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0,60,15,0.70) 0%, rgba(0,35,8,0.50) 35%, rgba(0,15,4,0.20) 65%, transparent 100%)',
      }} />

      {/* ── GREEN AMBIENT — top left ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 60% 50% at -10% -5%, rgba(0,150,40,0.15) 0%, transparent 65%)',
      }} />

      {/* ── RED AMBIENT — bottom right ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse 55% 45% at 110% 110%, rgba(160,0,0,0.16) 0%, transparent 60%)',
      }} />

      {/* ── SUBTLE GREEN GRID ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 4,
        backgroundImage: `
          linear-gradient(rgba(0,255,60,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,60,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* ── NAIROBI SKYLINE ── */}
      <div style={{
        position: 'fixed', bottom: '-30px', right: 0,
        width: '580px', height: '220px',
        zIndex: 5, pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.75) 50%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.75) 50%, #000 100%)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260"
          xmlns="http://www.w3.org/2000/svg" fill="#00cc44" opacity="0.09">
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
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,200,60,0.07)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="280" fill="none" stroke="rgba(0,200,60,0.05)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="210" fill="none" stroke="rgba(0,200,60,0.03)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(200,0,0,0.07)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="250" fill="none" stroke="rgba(200,0,0,0.05)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="180" fill="none" stroke="rgba(200,0,0,0.03)" strokeWidth="1"/>
        <polygon points="200,480 225,466 250,480 250,508 225,522 200,508"
          fill="none" stroke="rgba(0,200,60,0.08)" strokeWidth="1"/>
        <polygon points="1050,180 1075,166 1100,180 1100,208 1075,222 1050,208"
          fill="none" stroke="rgba(200,0,0,0.08)" strokeWidth="1"/>
        <path d="M 0 500 Q 350 350 700 480 T 1400 420"
          fill="none" stroke="rgba(0,200,60,0.05)" strokeWidth="1"/>
        <path d="M 0 600 Q 400 450 750 560 T 1400 500"
          fill="none" stroke="rgba(200,0,0,0.04)" strokeWidth="1"/>
      </svg>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '66px',
        background: 'rgba(3,8,4,0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,180,50,0.10)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.40)',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,60,0.10), transparent)',
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
              width: i <= 2 ? '28px' : '18px',
              background: i < 2 ? '#006600' : i === 2 ? '#BB0000' : 'rgba(255,255,255,0.12)',
            }} />
          ))}
          <span style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase',
            marginLeft: '6px',
          }}>Step 2 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ position: 'relative', marginBottom: '22px' }}>
          <div style={{
            position: 'absolute', top: '-14px', left: '-4px',
            fontSize: '82px', fontWeight: '900',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,200,60,0.07)',
            letterSpacing: '-4px', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
            zIndex: 0,
          }}>
            DEPARTMENT
          </div>
          <h2 style={{
            position: 'relative', zIndex: 1,
            fontWeight: '800', fontSize: '22px',
            margin: '0 0 6px', letterSpacing: '-0.4px',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>Which </span>
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 50%, #BB0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>department</span>
            <span style={{ color: 'rgba(255,255,255,0.92)' }}> are you from?</span>
          </h2>
          <p style={{
            position: 'relative', zIndex: 1,
            color: 'rgba(255,255,255,0.38)', fontSize: '13px',
            margin: 0, lineHeight: '1.6',
          }}>
            Your department helps us contextualise the threat. It is stripped before storage — never linked to your identity.
          </p>
        </div>

        {/* ── FULL WIDTH 2-COLUMN CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          width: '100%',
          marginBottom: '12px',
        }}>
          {departments.map((dept) => {
            const sel = selected === dept.label;
            const hov = hovered === dept.id;
            const isGreen = dept.accentRaw === 'green';

            return (
              <div
                key={dept.id}
                onClick={() => handleSelect(dept)}
                onMouseEnter={() => setHovered(dept.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '13px',
                  padding: '16px 16px 14px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  // Clearly visible card surface — dark green, not black
                  background: sel
                    ? isGreen
                      ? 'rgba(0,55,15,0.90)'
                      : 'rgba(55,0,0,0.90)'
                    : hov
                    ? 'rgba(18,38,20,0.92)'
                    : 'rgba(12,28,14,0.85)',
                  border: sel
                    ? isGreen
                      ? '1px solid rgba(34,197,94,0.45)'
                      : '1px solid rgba(187,0,0,0.45)'
                    : hov
                    ? '1px solid rgba(255,255,255,0.14)'
                    : '1px solid rgba(255,255,255,0.08)',
                  transform: hov && !sel ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.18s ease',
                  boxShadow: sel
                    ? isGreen
                      ? '0 0 0 1px rgba(34,197,94,0.15), 0 8px 32px rgba(0,0,0,0.50), inset 0 1px 0 rgba(34,197,94,0.12)'
                      : '0 0 0 1px rgba(187,0,0,0.15), 0 8px 32px rgba(0,0,0,0.50), inset 0 1px 0 rgba(187,0,0,0.12)'
                    : hov
                    ? '0 6px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : '0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}>

                {/* Glass sheen */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
                  pointerEvents: 'none', borderRadius: '13px',
                }} />

                {/* Left accent strip — bold and visible */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '4px', height: '100%',
                  background: isGreen
                    ? sel
                      ? 'linear-gradient(180deg, #4ade80, #16a34a)'
                      : 'linear-gradient(180deg, #22c55e, #15803d)'
                    : sel
                    ? 'linear-gradient(180deg, #ff6b6b, #BB0000)'
                    : 'linear-gradient(180deg, #ef4444, #BB0000)',
                  opacity: sel ? 1 : hov ? 0.85 : 0.60,
                  transition: 'opacity 0.18s',
                }} />

                {/* Top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: sel || hov
                    ? isGreen
                      ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.35), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(187,0,0,0.35), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                }} />

                {/* Subtle coloured glow corner */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100px', height: '100px',
                  background: isGreen
                    ? 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(187,0,0,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Icon + checkmark */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px', paddingLeft: '8px',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: isGreen
                      ? sel || hov ? 'rgba(34,197,94,0.18)' : 'rgba(34,197,94,0.10)'
                      : sel || hov ? 'rgba(187,0,0,0.18)' : 'rgba(187,0,0,0.10)',
                    border: isGreen
                      ? '1px solid rgba(34,197,94,0.28)'
                      : '1px solid rgba(187,0,0,0.28)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '17px',
                    transition: 'all 0.18s',
                  }}>
                    {dept.icon}
                  </div>
                  {sel && (
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: isGreen ? '#22c55e' : '#BB0000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '9px', color: '#fff', fontWeight: '800',
                      boxShadow: isGreen
                        ? '0 2px 10px rgba(34,197,94,0.60)'
                        : '0 2px 10px rgba(187,0,0,0.60)',
                    }}>✓</div>
                  )}
                </div>

                {/* Label */}
                <div style={{
                  paddingLeft: '8px',
                  color: sel ? '#ffffff' : 'rgba(255,255,255,0.85)',
                  fontWeight: '700', fontSize: '13px',
                  marginBottom: '5px', letterSpacing: '-0.1px',
                }}>
                  {dept.label}
                </div>

                {/* Description */}
                <div style={{
                  paddingLeft: '8px',
                  color: sel ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.35)',
                  fontSize: '11px', lineHeight: '1.6',
                }}>
                  {dept.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── OTHER DEPARTMENT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          width: '100%',
        }}>
          <div
            onClick={() => handleSelect({ id: 'other', label: '' })}
            onMouseEnter={() => setHovered('other')}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: '13px', padding: '14px 16px',
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
              background: showOtherInput
                ? 'rgba(18,38,20,0.92)'
                : hovered === 'other'
                ? 'rgba(18,38,20,0.88)'
                : 'rgba(12,28,14,0.85)',
              border: showOtherInput
                ? '1px solid rgba(255,255,255,0.18)'
                : hovered === 'other'
                ? '1px solid rgba(255,255,255,0.14)'
                : '1px dashed rgba(255,255,255,0.16)',
              transition: 'all 0.18s ease',
              boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              pointerEvents: 'none', borderRadius: '13px',
            }} />
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '4px', height: '100%',
              background: 'rgba(255,255,255,0.22)',
              opacity: hovered === 'other' ? 0.70 : 0.35,
              transition: 'opacity 0.18s',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '17px', flexShrink: 0,
              }}>✏️</div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.82)', fontWeight: '700', fontSize: '13px' }}>
                  Other Department
                </div>
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px' }}>
                  Not listed — enter manually
                </div>
              </div>
              <div style={{
                marginLeft: 'auto',
                color: hovered === 'other' ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.28)',
                fontSize: '14px', transition: 'color 0.18s',
              }}>→</div>
            </div>
          </div>
        </div>

        {/* Other input */}
        {showOtherInput && (
          <div style={{
            borderRadius: '13px', padding: '16px',
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(8,22,10,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            marginTop: '10px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.50)',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.90)', fontWeight: '600', fontSize: '13px', marginBottom: '3px' }}>
              Enter your department
            </div>
            <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', marginBottom: '10px' }}>
              Type your department name — it will be stripped before storage.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px', color: '#ffffff',
                padding: '9px 12px', fontSize: '13px',
                outline: 'none', marginBottom: '10px', boxSizing: 'border-box',
              }}
              onKeyDown={e => e.key === 'Enter' && handleOtherConfirm()}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleOtherConfirm}
                disabled={!otherDept.trim()}
                style={{
                  background: otherDept.trim() ? '#BB0000' : 'rgba(255,255,255,0.08)',
                  color: otherDept.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
                  border: 'none', borderRadius: '8px',
                  padding: '8px 16px', fontSize: '13px', fontWeight: '600',
                  cursor: otherDept.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.16s',
                }}>
                Confirm →
              </button>
              <button
                onClick={() => { setShowOtherInput(false); setOtherDept(''); }}
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.42)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px', padding: '8px 16px',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Selected confirmation */}
        {selected && (
          <div style={{
            marginTop: '12px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '7px 12px', borderRadius: '8px',
            background: 'rgba(34,197,94,0.10)',
            border: '1px solid rgba(34,197,94,0.25)',
            alignSelf: 'flex-start',
          }}>
            <span style={{ color: '#4ade80', fontSize: '12px' }}>✓</span>
            <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: '600' }}>{selected}</span>
            <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: '500' }}>
              — stripped before storage
            </span>
          </div>
        )}
      </div>

      {/* ── NEXT STRIP ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <NextStrip
          steps={['Phishing Email', selected || 'Department', 'Email Details', 'Submit']}
          currentStep={1}
          onNext={handleNext}
          nextLabel="Next: Email Details →"
          nextDisabled={!selected}
        />
      </div>
    </div>
  );
};

export default ReportStep2;