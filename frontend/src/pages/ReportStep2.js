import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    role: 'Handles customer queries, account access, and M-Pesa transactions.',
    targets: 'M-Pesa impersonation, account takeover calls',
    accentColor: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.08)',
    risk: 'MEDIUM',
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    role: 'Handles payments, invoices, transfers, and financial reporting.',
    targets: 'Invoice fraud, payment diversion, CFO impersonation',
    accentColor: '#BB0000',
    accentLight: 'rgba(187,0,0,0.07)',
    risk: 'HIGH',
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    role: 'Oversees regulatory adherence and internal risk controls.',
    targets: 'CBK/KRA impersonation emails, fake audit requests',
    accentColor: '#22c55e',
    accentLight: 'rgba(34,197,94,0.07)',
    risk: 'LOW',
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    role: 'Processes loan applications, credit checks, and approvals.',
    targets: 'Fake loan documents, credential harvesting',
    accentColor: '#BB0000',
    accentLight: 'rgba(187,0,0,0.07)',
    risk: 'HIGH',
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    role: 'Manages internal systems, IT access, and daily bank operations.',
    targets: 'Fake IT support emails, system access phishing',
    accentColor: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.08)',
    risk: 'MEDIUM',
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    role: 'Manages staff records, payroll, and employee onboarding.',
    targets: 'Payroll diversion, fake employee document requests',
    accentColor: '#BB0000',
    accentLight: 'rgba(187,0,0,0.07)',
    risk: 'HIGH',
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

      {/* ── BASE — off-white to very light green-grey ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(145deg, #f8faf8 0%, #f2f5f2 35%, #f5f4f0 70%, #f8f6f2 100%)',
      }} />

      {/* ── RADIAL DEPTH — centre content lift ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 68% 62% at 50% 42%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 40%, transparent 75%)',
      }} />

      {/* ── EDGE VIGNETTE — subtle darkening at corners ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 110% 110% at 50% 50%, transparent 50%, rgba(180,185,175,0.18) 100%)',
      }} />

      {/* ── FINANCIAL FLOW SVG — transaction lines, network dots ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 3, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">

        {/* Transaction flow curves */}
        <path d="M -100 300 Q 200 180 500 320 T 1100 280 T 1600 300"
          fill="none" stroke="rgba(0,120,40,0.04)" strokeWidth="1.5"/>
        <path d="M -100 420 Q 250 300 600 440 T 1200 380 T 1600 420"
          fill="none" stroke="rgba(0,100,30,0.03)" strokeWidth="1"/>
        <path d="M -100 560 Q 300 440 700 560 T 1300 500 T 1600 540"
          fill="none" stroke="rgba(187,0,0,0.025)" strokeWidth="1"/>
        <path d="M 0 680 Q 350 560 750 680 T 1400 620"
          fill="none" stroke="rgba(0,100,30,0.025)" strokeWidth="1"/>
        <path d="M 200 100 Q 500 -20 800 120 T 1400 80"
          fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>

        {/* African diamond geometric — very faint */}
        {[...Array(8)].map((_, col) =>
          [...Array(6)].map((_, row) => {
            const cx = col * 180 + 40;
            const cy = row * 140 + 40;
            return (
              <polygon key={`${col}-${row}`}
                points={`${cx},${cy-22} ${cx+16},${cy} ${cx},${cy+22} ${cx-16},${cy}`}
                fill="none"
                stroke="rgba(0,100,30,0.025)"
                strokeWidth="0.8"
              />
            );
          })
        )}

        {/* Network nodes — scattered dots */}
        {[
          [8,22],[14,45],[88,18],[92,42],[6,72],[94,68],
          [45,5],[55,95],[20,85],[80,80],[30,15],[70,20],
          [25,55],[75,48],[50,30],[35,75],[65,72],
        ].map(([cx, cy], i) => (
          <circle key={i}
            cx={`${cx}%`} cy={`${cy}%`}
            r={i % 3 === 0 ? 2.5 : 1.8}
            fill={i % 2 === 0 ? 'rgba(0,120,40,0.09)' : 'rgba(187,0,0,0.06)'}
          />
        ))}

        {/* Node connection lines */}
        <line x1="8%" y1="22%" x2="14%" y2="45%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="88%" y1="18%" x2="92%" y2="42%" stroke="rgba(187,0,0,0.04)" strokeWidth="0.7"/>
        <line x1="6%" y1="72%" x2="20%" y2="85%" stroke="rgba(0,100,30,0.04)" strokeWidth="0.7"/>
        <line x1="80%" y1="80%" x2="94%" y2="68%" stroke="rgba(187,0,0,0.04)" strokeWidth="0.7"/>
        <line x1="45%" y1="5%" x2="30%" y2="15%" stroke="rgba(0,100,30,0.04)" strokeWidth="0.7"/>
        <line x1="55%" y1="95%" x2="65%" y2="72%" stroke="rgba(187,0,0,0.03)" strokeWidth="0.7"/>

        {/* Concentric arcs — top left */}
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="170" fill="none" stroke="rgba(0,100,30,0.03)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="120" fill="none" stroke="rgba(0,100,30,0.02)" strokeWidth="1"/>

        {/* Concentric arcs — bottom right */}
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(187,0,0,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="150" fill="none" stroke="rgba(187,0,0,0.03)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="100" fill="none" stroke="rgba(187,0,0,0.02)" strokeWidth="1"/>
      </svg>

      {/* ── NAVBAR — light glassmorphism ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '64px',
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        {/* Kenyan flag stripe */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            <span style={{ color: '#1a1a1a' }}>Phish</span>
            <span style={{ color: '#006600' }}>Ripoti</span>
          </span>
        </div>

        <button onClick={() => navigate('/it/login')} style={{
          display: 'flex', alignItems: 'center', gap: '7px',
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
        padding: '28px 48px 24px',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '18px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: '3px', borderRadius: '2px',
              width: i <= 2 ? '28px' : '18px',
              background: i < 2 ? '#006600' : i === 2 ? '#BB0000' : 'rgba(0,0,0,0.12)',
            }} />
          ))}
          <span style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase',
            marginLeft: '6px',
          }}>Step 2 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ position: 'relative', marginBottom: '26px' }}>
          <div style={{
            position: 'absolute', top: '-16px', left: '-4px',
            fontSize: '80px', fontWeight: '900',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,100,30,0.05)',
            letterSpacing: '-4px', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          }}>
            DEPARTMENT
          </div>
          <h2 style={{
            position: 'relative', zIndex: 1,
            fontWeight: '800', fontSize: '24px',
            margin: '0 0 7px', letterSpacing: '-0.5px',
            color: '#111111',
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
            Your department helps us contextualise the threat. It is stripped before storage — never linked to your identity.
          </p>
        </div>

        {/* ── CARDS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          width: '100%',
          marginBottom: '14px',
        }}>
          {departments.map((dept) => {
            const sel = selected === dept.label;
            const hov = hovered === dept.id;

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
                  background: sel
                    ? 'rgba(255,255,255,0.98)'
                    : hov
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(255,255,255,0.82)',
                  border: sel
                    ? `1px solid ${dept.accentColor}44`
                    : '1px solid rgba(0,0,0,0.06)',
                  transform: hov && !sel ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 0.20s ease',
                  boxShadow: sel
                    ? `0 4px 24px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06), 0 0 0 2px ${dept.accentColor}22`
                    : hov
                    ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
                    : '0 1px 8px rgba(0,0,0,0.06), 0 0 0 0 transparent',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}>

                {/* Left accent bar */}
                <div style={{
                  width: '4px',
                  flexShrink: 0,
                  background: dept.accentColor,
                  opacity: sel ? 1 : hov ? 0.85 : 0.55,
                  borderRadius: '16px 0 0 16px',
                  transition: 'opacity 0.20s',
                }} />

                {/* Card content */}
                <div style={{ flex: 1, padding: '18px 18px 16px 16px' }}>

                  {/* Header row */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '10px',
                  }}>
                    {/* Icon */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '11px',
                      background: dept.accentLight,
                      border: `1px solid ${dept.accentColor}22`,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '19px',
                      flexShrink: 0,
                    }}>
                      {dept.icon}
                    </div>

                    {/* Selected checkmark */}
                    {sel && (
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: dept.accentColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', color: '#fff', fontWeight: '800',
                        boxShadow: `0 2px 8px ${dept.accentColor}55`,
                        flexShrink: 0,
                      }}>✓</div>
                    )}
                  </div>

                  {/* Department name */}
                  <div style={{
                    color: '#111111',
                    fontWeight: '700', fontSize: '14px',
                    marginBottom: '4px', letterSpacing: '-0.2px',
                    lineHeight: '1.3',
                  }}>
                    {dept.label}
                  </div>

                  {/* Role description */}
                  <div style={{
                    color: 'rgba(0,0,0,0.48)',
                    fontSize: '12px', lineHeight: '1.55',
                    marginBottom: '12px',
                  }}>
                    {dept.role}
                  </div>

                  {/* Common targets */}
                  <div style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: dept.accentLight,
                    border: `1px solid ${dept.accentColor}18`,
                  }}>
                    <div style={{
                      fontSize: '10px', fontWeight: '700',
                      color: dept.accentColor,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '3px',
                    }}>
                      Common targets
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(0,0,0,0.55)',
                      lineHeight: '1.5',
                    }}>
                      {dept.targets}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── OTHER DEPARTMENT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          width: '100%',
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
                ? 'rgba(255,255,255,0.95)'
                : 'rgba(255,255,255,0.82)',
              border: showOtherInput
                ? '1px solid rgba(0,0,0,0.12)'
                : '1px dashed rgba(0,0,0,0.14)',
              transform: hovered === 'other' && !showOtherInput ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.20s ease',
              boxShadow: hovered === 'other'
                ? '0 8px 28px rgba(0,0,0,0.09)'
                : '0 1px 6px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}>
            {/* Left accent */}
            <div style={{
              width: '4px', flexShrink: 0,
              background: 'rgba(0,0,0,0.18)',
              opacity: hovered === 'other' ? 0.6 : 0.30,
              borderRadius: '16px 0 0 16px',
              transition: 'opacity 0.20s',
            }} />
            <div style={{
              flex: 1, padding: '18px 18px 18px 16px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '11px',
                background: 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '19px', flexShrink: 0,
              }}>✏️</div>
              <div>
                <div style={{ color: '#222222', fontWeight: '700', fontSize: '14px', marginBottom: '2px' }}>
                  Other Department
                </div>
                <div style={{ color: 'rgba(0,0,0,0.42)', fontSize: '12px' }}>
                  Not listed above — enter manually
                </div>
              </div>
              <div style={{
                marginLeft: 'auto',
                color: hovered === 'other' ? 'rgba(0,0,0,0.50)' : 'rgba(0,0,0,0.22)',
                fontSize: '18px', transition: 'all 0.20s',
                transform: hovered === 'other' ? 'translateX(3px)' : 'translateX(0)',
              }}>→</div>
            </div>
          </div>
        </div>

        {/* Other input */}
        {showOtherInput && (
          <div style={{
            borderRadius: '16px', padding: '18px',
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'rgba(255,255,255,0.95)',
            marginTop: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <div style={{ color: '#111111', fontWeight: '700', fontSize: '14px', marginBottom: '3px' }}>
              Enter your department
            </div>
            <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: '13px', marginBottom: '12px' }}>
              Type your department name — it will be stripped before storage.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              style={{
                width: '100%',
                background: '#fafafa',
                border: '1px solid rgba(0,0,0,0.10)',
                borderRadius: '9px', color: '#111111',
                padding: '11px 14px', fontSize: '13px',
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
                  background: otherDept.trim() ? '#BB0000' : 'rgba(0,0,0,0.08)',
                  color: otherDept.trim() ? '#fff' : 'rgba(0,0,0,0.30)',
                  border: 'none', borderRadius: '8px',
                  padding: '9px 20px', fontSize: '13px', fontWeight: '600',
                  cursor: otherDept.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.16s',
                }}>
                Confirm →
              </button>
              <button
                onClick={() => { setShowOtherInput(false); setOtherDept(''); }}
                style={{
                  background: 'transparent', color: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(0,0,0,0.10)',
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
            marginTop: '14px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '9px',
            background: 'rgba(0,102,0,0.07)',
            border: '1px solid rgba(0,102,0,0.18)',
            alignSelf: 'flex-start',
          }}>
            <span style={{ color: '#006600', fontSize: '13px' }}>✓</span>
            <span style={{ color: '#006600', fontSize: '13px', fontWeight: '600' }}>{selected}</span>
            <span style={{ color: 'rgba(0,0,0,0.42)', fontSize: '12px' }}>
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