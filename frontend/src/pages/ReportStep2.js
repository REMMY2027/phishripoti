import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    role: 'Handles customer queries and M-Pesa transactions.',
    targets: 'M-Pesa impersonation, account takeover calls',
    accentColor: '#f59e0b',
    risk: 'MEDIUM',
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    role: 'Handles payments, invoices and financial reporting.',
    targets: 'Invoice fraud, payment diversion, CFO impersonation',
    accentColor: '#BB0000',
    risk: 'HIGH',
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    role: 'Oversees regulatory adherence and risk controls.',
    targets: 'CBK/KRA impersonation, fake audit requests',
    accentColor: '#006600',
    risk: 'LOW',
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    role: 'Processes loan applications and credit checks.',
    targets: 'Fake loan documents, credential harvesting',
    accentColor: '#BB0000',
    risk: 'HIGH',
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    role: 'Manages internal systems and IT access.',
    targets: 'Fake IT support emails, system access phishing',
    accentColor: '#f59e0b',
    risk: 'MEDIUM',
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    role: 'Manages staff records and payroll.',
    targets: 'Payroll diversion, fake employee documents',
    accentColor: '#BB0000',
    risk: 'HIGH',
  },
];

const riskConfig = {
  HIGH:   { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.22)'   },
  MEDIUM: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.22)'  },
  LOW:    { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.22)'   },
};

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

      {/* ── BASE — pure white ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />

      {/* ── SUBTLE RADIAL DEPTH ── */}
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

      {/* ── SVG TEXTURE ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 4, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280 T 1600 300"
          fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <path d="M -100 450 Q 250 330 600 460 T 1200 400"
          fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>
        <path d="M 0 600 Q 350 480 750 600 T 1400 560"
          fill="none" stroke="rgba(140,0,0,0.03)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="160" fill="none" stroke="rgba(0,100,30,0.03)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="140" fill="none" stroke="rgba(140,0,0,0.03)" strokeWidth="1"/>
        <circle cx="8%"  cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="13%" cy="42%" r="1.8" fill="rgba(0,100,30,0.06)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
        <circle cx="93%" cy="38%" r="1.8" fill="rgba(140,0,0,0.06)"/>
        <line x1="8%"  y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
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
          <rect x="20" y="180" width="18" height="80" /><rect x="42" y="170" width="14" height="90" />
          <rect x="60" y="185" width="20" height="75" /><rect x="84" y="175" width="16" height="85" />
          <rect x="104" y="188" width="22" height="72" /><rect x="310" y="60" width="38" height="200" />
          <rect x="318" y="50" width="22" height="15" /><rect x="324" y="40" width="10" height="14" />
          <rect x="327" y="30" width="4" height="12" /><rect x="200" y="90" width="32" height="170" />
          <ellipse cx="216" cy="90" rx="18" ry="8" /><rect x="212" y="75" width="8" height="18" />
          <rect x="214" y="65" width="4" height="12" /><rect x="380" y="80" width="34" height="180" />
          <rect x="386" y="72" width="22" height="12" /><rect x="392" y="62" width="10" height="12" />
          <rect x="395" y="52" width="4" height="12" /><rect x="150" y="120" width="26" height="140" />
          <rect x="180" y="130" width="18" height="130" /><rect x="250" y="110" width="24" height="150" />
          <rect x="278" y="125" width="28" height="135" /><rect x="418" y="100" width="28" height="160" />
          <rect x="450" y="115" width="22" height="145" /><rect x="476" y="130" width="26" height="130" />
          <rect x="130" y="155" width="18" height="105" /><rect x="500" y="150" width="20" height="110" />
          <rect x="524" y="160" width="24" height="100" /><rect x="552" y="155" width="18" height="105" />
          <rect x="0" y="258" width="580" height="2" />
        </svg>
      </div>

      {/* ── NAVBAR — identical to Step1 ── */}
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
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(187,0,0,0.30)', flexShrink: 0,
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
          cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
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
        padding: '26px 44px 20px',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: '3px', borderRadius: '2px',
              width: i <= 2 ? '28px' : '18px',
              background: i < 2 ? '#006600' : i === 2 ? '#BB0000' : 'rgba(0,0,0,0.14)',
            }} />
          ))}
          <span style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase',
            marginLeft: '6px', fontWeight: '600',
          }}>Step 2 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute', top: '-14px', left: '-4px',
            fontSize: '82px', fontWeight: '900',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,100,30,0.06)',
            letterSpacing: '-4px', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          }}>
            DEPARTMENT
          </div>
          <h2 style={{
            position: 'relative', zIndex: 1,
            fontWeight: '900', fontSize: '24px',
            margin: '0 0 7px', letterSpacing: '-0.5px', color: '#111111',
          }}>
            Which{' '}
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #006600 0%, #004400 50%, #BB0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>department</span>
            {' '}are you from?
          </h2>
          <p style={{
            position: 'relative', zIndex: 1,
            color: 'rgba(0,0,0,0.45)', fontSize: '14px',
            margin: 0, lineHeight: '1.6',
          }}>
            Your department helps us contextualise the threat. Stripped before storage — never linked to your identity.
          </p>
        </div>

        {/* ── 2-COLUMN CARDS — same size as Step1 ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          width: '100%',
          maxWidth: '820px',
          marginBottom: '14px',
        }}>
          {departments.map((dept) => {
            const sel = selected === dept.label;
            const hov = hovered === dept.id;
            const rc = riskConfig[dept.risk];

            return (
              <div
                key={dept.id}
                onClick={() => handleSelect(dept)}
                onMouseEnter={() => setHovered(dept.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '16px',
                  padding: '0',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  // Dark charcoal glass — identical to Step1
                  background: sel
                    ? 'rgba(14,20,14,0.96)'
                    : hov
                    ? 'rgba(18,26,18,0.94)'
                    : 'rgba(22,30,22,0.88)',
                  border: sel
                    ? `1px solid ${dept.accentColor}55`
                    : hov
                    ? '1px solid rgba(255,255,255,0.12)'
                    : '1px solid rgba(255,255,255,0.08)',
                  transform: hov && !sel ? 'translateY(-3px) scale(1.005)' : 'translateY(0) scale(1)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: sel
                    ? `0 12px 36px rgba(0,0,0,0.20), 0 0 0 1px ${dept.accentColor}22`
                    : hov
                    ? '0 10px 32px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : '0 4px 16px rgba(0,0,0,0.10)',
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
                  background: sel || hov
                    ? `linear-gradient(90deg, transparent, ${dept.accentColor}55, transparent)`
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
                }} />

                {/* Left accent bar */}
                <div style={{
                  width: '5px', flexShrink: 0,
                  background: sel
                    ? `linear-gradient(180deg, ${dept.accentColor}, ${dept.accentColor}88)`
                    : dept.accentColor,
                  opacity: sel ? 1 : hov ? 0.80 : 0.55,
                  borderRadius: '16px 0 0 16px',
                  transition: 'all 0.22s',
                  boxShadow: sel || hov ? `2px 0 10px ${dept.accentColor}33` : 'none',
                }} />

                {/* Card content */}
                <div style={{ flex: 1, padding: '18px 18px 16px 14px' }}>

                  {/* Icon + risk badge + checkmark */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '12px',
                  }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '11px',
                      background: sel || hov
                        ? `${dept.accentColor}22`
                        : 'rgba(255,255,255,0.07)',
                      border: `1px solid ${dept.accentColor}33`,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '19px',
                      transition: 'all 0.22s',
                      boxShadow: sel || hov ? `0 0 14px ${dept.accentColor}25` : 'none',
                    }}>
                      {dept.icon}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      {sel && (
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: dept.accentColor,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '10px', color: '#fff', fontWeight: '900',
                          boxShadow: `0 2px 8px ${dept.accentColor}55`,
                        }}>✓</div>
                      )}
                      {/* Risk badge */}
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '3px 8px', borderRadius: '20px',
                        background: rc.bg, border: `1px solid ${rc.border}`,
                      }}>
                        <div style={{
                          width: '4px', height: '4px', borderRadius: '50%',
                          background: rc.color,
                        }}/>
                        <span style={{
                          fontSize: '8px', fontWeight: '800',
                          color: rc.color, letterSpacing: '0.09em',
                          textTransform: 'uppercase',
                        }}>{dept.risk}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{
                    color: sel ? '#ffffff' : 'rgba(255,255,255,0.92)',
                    fontWeight: '800', fontSize: '13px',
                    marginBottom: '5px', letterSpacing: '-0.1px',
                  }}>
                    {dept.label}
                  </div>

                  {/* Role */}
                  <div style={{
                    color: sel ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.38)',
                    fontSize: '11px', lineHeight: '1.6',
                    marginBottom: '12px',
                  }}>
                    {dept.role}
                  </div>

                  {/* Targets tag */}
                  <div style={{
                    padding: '6px 10px', borderRadius: '7px',
                    background: `${dept.accentColor}14`,
                    border: `1px solid ${dept.accentColor}25`,
                    fontSize: '10px',
                    color: dept.accentColor,
                    lineHeight: '1.5', fontWeight: '600',
                  }}>
                    ⚠ {dept.targets}
                  </div>

                  {/* Arrow */}
                  {!sel && (
                    <div style={{
                      textAlign: 'right', marginTop: '8px',
                      color: hov ? dept.accentColor : 'rgba(255,255,255,0.18)',
                      fontSize: '15px', transition: 'all 0.22s',
                      transform: hov ? 'translateX(3px)' : 'translateX(0)',
                    }}>→</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── OTHER DEPARTMENT — one card wide ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          width: '100%',
          maxWidth: '820px',
        }}>
          <div
            onClick={() => handleSelect({ id: 'other', label: '' })}
            onMouseEnter={() => setHovered('other')}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: '16px', padding: '0',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', display: 'flex',
              background: showOtherInput || hovered === 'other'
                ? 'rgba(18,26,18,0.94)'
                : 'rgba(22,30,22,0.88)',
              border: showOtherInput
                ? '1px solid rgba(255,255,255,0.16)'
                : hovered === 'other'
                ? '1px solid rgba(255,255,255,0.12)'
                : '1px dashed rgba(255,255,255,0.18)',
              transform: hovered === 'other' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.22s ease',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              boxShadow: hovered === 'other'
                ? '0 10px 32px rgba(0,0,0,0.14)'
                : '0 4px 16px rgba(0,0,0,0.10)',
            }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
              pointerEvents: 'none', borderRadius: '16px',
            }} />
            <div style={{
              width: '5px', flexShrink: 0,
              background: 'rgba(255,255,255,0.22)',
              opacity: hovered === 'other' ? 0.65 : 0.28,
              borderRadius: '16px 0 0 16px',
              transition: 'opacity 0.22s',
            }} />
            <div style={{
              flex: 1, padding: '18px 18px 18px 14px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '11px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '19px', flexShrink: 0,
              }}>✏️</div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.88)', fontWeight: '700', fontSize: '13px', marginBottom: '2px' }}>
                  Other Department
                </div>
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px' }}>
                  Not listed above — enter manually
                </div>
              </div>
              <div style={{
                marginLeft: 'auto',
                color: hovered === 'other' ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.25)',
                fontSize: '18px', transition: 'all 0.22s',
                transform: hovered === 'other' ? 'translateX(3px)' : 'translateX(0)',
              }}>→</div>
            </div>
          </div>
        </div>

        {/* Other input */}
        {showOtherInput && (
          <div style={{
            borderRadius: '14px', padding: '18px',
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(14,20,14,0.96)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            marginTop: '12px', maxWidth: '820px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          }}>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px', marginBottom: '3px' }}>
              Enter your department
            </div>
            <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: '12px', marginBottom: '10px' }}>
              Type your department name — it will be stripped before storage.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px', color: '#ffffff',
                padding: '10px 14px', fontSize: '13px',
                outline: 'none', marginBottom: '12px',
                boxSizing: 'border-box',
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
                  color: otherDept.trim() ? '#fff' : 'rgba(255,255,255,0.30)',
                  border: 'none', borderRadius: '8px',
                  padding: '9px 20px', fontSize: '13px', fontWeight: '700',
                  cursor: otherDept.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.16s',
                }}>
                Confirm →
              </button>
              <button
                onClick={() => { setShowOtherInput(false); setOtherDept(''); }}
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px', padding: '9px 20px',
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
            marginTop: '12px', maxWidth: '820px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '7px 13px', borderRadius: '8px',
            background: 'rgba(34,197,94,0.10)',
            border: '1px solid rgba(34,197,94,0.22)',
            alignSelf: 'flex-start',
          }}>
            <span style={{ color: '#22c55e', fontSize: '12px' }}>✓</span>
            <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: '700' }}>{selected}</span>
            <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '11px' }}>— stripped before storage</span>
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