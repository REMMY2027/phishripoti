import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const departments = [
  { id: 'customer', label: 'Customer Service / Teller', icon: '🎧', desc: 'High target for M-Pesa impersonation and account takeover phishing.', accentColor: '#f59e0b', risk: 'MEDIUM', tag: 'FRONTLINE' },
  { id: 'finance', label: 'Finance & Accounts', icon: '📊', desc: 'Targeted by invoice fraud, payment diversion and CFO impersonation emails.', accentColor: '#BB0000', risk: 'HIGH', tag: 'HIGH VALUE' },
  { id: 'compliance', label: 'Compliance / Risk', icon: '⚖️', desc: 'Targeted by regulatory impersonation emails pretending to be CBK or KRA.', accentColor: '#006600', risk: 'LOW', tag: 'REGULATORY' },
  { id: 'loans', label: 'Loans / Credit Officer', icon: '💳', desc: 'At risk from fake loan documents and credential harvesting attacks.', accentColor: '#BB0000', risk: 'HIGH', tag: 'SENSITIVE' },
  { id: 'operations', label: 'Operations', icon: '⚙️', desc: 'Targeted by system access phishing and fake IT support credential emails.', accentColor: '#f59e0b', risk: 'MEDIUM', tag: 'INTERNAL' },
  { id: 'hr', label: 'Human Resources', icon: '👥', desc: 'Targeted by payroll diversion and fake employee document phishing.', accentColor: '#BB0000', risk: 'HIGH', tag: 'PAYROLL' },
];

const riskConfig = {
  HIGH:   { color: '#ef4444', bg: 'rgba(239,68,68,0.14)',  border: 'rgba(239,68,68,0.28)'  },
  MEDIUM: { color: '#f59e0b', bg: 'rgba(245,158,11,0.14)', border: 'rgba(245,158,11,0.28)' },
  LOW:    { color: '#22c55e', bg: 'rgba(34,197,94,0.14)',  border: 'rgba(34,197,94,0.28)'  },
};

const AwarenessHub = () => {
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');
  const [hovered, setHovered] = useState(null);
  const isMobile = window.innerWidth < 640;

  const handleSelect = (deptLabel) => {
    navigate('/awareness/modules', { state: { department: deptLabel } });
  };

  const handleOtherSubmit = () => {
    if (otherDept.trim()) {
      navigate('/awareness/modules', { state: { department: otherDept.trim() } });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUND ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />

      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
      </svg>

      {!isMobile && (
        <div style={{
          position: 'fixed', bottom: '-30px', right: 0, width: '580px', height: '220px',
          zIndex: 5, pointerEvents: 'none',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)',
        }}>
          <svg width="100%" height="100%" viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
            <rect x="20" y="180" width="18" height="80" /><rect x="42" y="170" width="14" height="90" />
            <rect x="310" y="60" width="38" height="200" /><rect x="200" y="90" width="32" height="170" />
            <ellipse cx="216" cy="90" rx="18" ry="8" /><rect x="380" y="80" width="34" height="180" />
            <rect x="150" y="120" width="26" height="140" /><rect x="250" y="110" width="24" height="150" />
            <rect x="418" y="100" width="28" height="160" /><rect x="0" y="258" width="580" height="2" />
          </svg>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', height: '56px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(187,0,0,0.30)', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize: '19px', fontWeight: '800', letterSpacing: '-0.4px', lineHeight: 1 }}>
            <span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '7px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.14)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}/>
              <span style={{ color: '#006600', fontSize: '11px', fontWeight: '700' }}>AI-Powered</span>
            </div>
          )}
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)',
            color: '#333333', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            ← Home
          </button>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        padding: isMobile ? '20px 16px 16px' : '28px 44px 20px',
        display: 'flex', flexDirection: 'column', overflowY: 'auto'
      }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '6px', marginBottom: '16px' }}>
          {[
            { n: 1, label: 'Department', active: true },
            { n: 2, label: 'Module', active: false },
            { n: 3, label: isMobile ? 'Assess' : 'Learn & Assess', active: false },
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: step.active ? '#BB0000' : 'rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', color: step.active ? '#fff' : 'rgba(0,0,0,0.30)' }}>{step.n}</div>
                <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: step.active ? '700' : '500', color: step.active ? '#111111' : 'rgba(0,0,0,0.35)' }}>{step.label}</span>
              </div>
              {i < 2 && <div style={{ width: isMobile ? '16px' : '32px', height: '2px', background: 'rgba(0,0,0,0.10)', borderRadius: '2px', margin: '0 2px', flexShrink: 0 }}/>}
            </React.Fragment>
          ))}
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.14)' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#006600' }}/>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#006600', textTransform: 'uppercase', letterSpacing: '0.12em' }}>GPT-4o Personalised Training</span>
          </div>
          <h1 style={{ fontWeight: '900', fontSize: isMobile ? '22px' : '30px', margin: '0 0 8px', letterSpacing: '-0.5px', lineHeight: 1.2, color: '#0a0a0a' }}>
            Select your{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #006600 0%, #004400 50%, #BB0000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>department</span>
              <span style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #006600, #BB0000)', borderRadius: '2px', opacity: 0.5 }}/>
            </span>
          </h1>
          <p style={{ color: 'rgba(0,0,0,0.48)', fontSize: isMobile ? '13px' : '14px', margin: 0, lineHeight: '1.65', fontWeight: '500' }}>
            GPT-4o generates phishing scenarios and quizzes tailored to your role.
          </p>
        </div>

        {/* ── DEPARTMENT CARDS ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '980px',
          marginBottom: '12px',
        }}>
          {departments.map((dept) => {
            const hov = hovered === dept.id;
            const rc = riskConfig[dept.risk];
            return (
              <div
                key={dept.id}
                onClick={() => handleSelect(dept.label)}
                onMouseEnter={() => setHovered(dept.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '14px', padding: '0',
                  cursor: 'pointer', position: 'relative',
                  overflow: 'hidden', display: 'flex',
                  background: hov ? 'rgba(16,24,16,0.96)' : 'rgba(20,28,20,0.90)',
                  border: hov ? `1px solid ${dept.accentColor}55` : '1px solid rgba(255,255,255,0.09)',
                  transform: hov ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: hov ? `0 10px 28px rgba(0,0,0,0.18)` : '0 3px 12px rgba(0,0,0,0.10)',
                  backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                }}>

                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', pointerEvents: 'none', borderRadius: '14px' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: hov ? `linear-gradient(90deg, transparent, ${dept.accentColor}60, transparent)` : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }} />
                <div style={{ width: '4px', flexShrink: 0, background: dept.accentColor, opacity: hov ? 0.90 : 0.50, borderRadius: '14px 0 0 14px', transition: 'all 0.22s' }} />

                {/* ── COMPACT HORIZONTAL LAYOUT (both mobile and desktop) ── */}
                <div style={{ flex: 1, padding: isMobile ? '13px 14px' : '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>

                  {/* Icon */}
                  <div style={{
                    width: isMobile ? '40px' : '46px',
                    height: isMobile ? '40px' : '46px',
                    borderRadius: '11px', flexShrink: 0,
                    background: hov ? `${dept.accentColor}22` : 'rgba(255,255,255,0.08)',
                    border: `1px solid ${hov ? dept.accentColor + '38' : 'rgba(255,255,255,0.12)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: isMobile ? '20px' : '22px', transition: 'all 0.22s',
                  }}>{dept.icon}</div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                      <span style={{ color: '#ffffff', fontWeight: '800', fontSize: isMobile ? '13px' : '14px', lineHeight: 1.2 }}>{dept.label}</span>
                      {/* Risk badge */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', borderRadius: '20px', background: rc.bg, border: `1px solid ${rc.border}`, flexShrink: 0 }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: rc.color }}/>
                        <span style={{ fontSize: '8px', fontWeight: '900', color: rc.color, letterSpacing: '0.09em', textTransform: 'uppercase' }}>{dept.risk}</span>
                      </div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '12px', lineHeight: '1.5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isMobile ? 'nowrap' : 'normal' }}>
                      {dept.desc}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ color: hov ? dept.accentColor : 'rgba(255,255,255,0.25)', fontSize: '18px', transition: 'all 0.22s', transform: hov ? 'translateX(3px)' : 'translateX(0)', flexShrink: 0 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── OTHER DEPARTMENT ── */}
        <div style={{ maxWidth: '980px' }}>
          <div
            onClick={() => setShowOtherInput(!showOtherInput)}
            onMouseEnter={() => setHovered('other')}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: '12px', padding: '0',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', display: 'flex',
              background: hovered === 'other' ? 'rgba(18,26,18,0.94)' : 'rgba(22,30,22,0.88)',
              border: hovered === 'other' ? '1px solid rgba(255,255,255,0.14)' : '1px dashed rgba(255,255,255,0.20)',
              transition: 'all 0.22s ease',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              boxShadow: hovered === 'other' ? '0 6px 20px rgba(0,0,0,0.14)' : '0 2px 8px rgba(0,0,0,0.10)',
            }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 100%)', pointerEvents: 'none', borderRadius: '12px' }} />
            <div style={{ width: '4px', flexShrink: 0, background: 'rgba(255,255,255,0.22)', opacity: hovered === 'other' ? 0.65 : 0.28, borderRadius: '12px 0 0 12px', transition: 'opacity 0.22s' }} />
            <div style={{ flex: 1, padding: isMobile ? '13px 14px' : '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>✏️</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'rgba(255,255,255,0.88)', fontWeight: '700', fontSize: '13px', marginBottom: '2px' }}>Other Department</div>
                <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px' }}>{isMobile ? 'Enter manually' : 'Not listed above — enter your department manually'}</div>
              </div>
              <div style={{ color: hovered === 'other' ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.28)', fontSize: '16px', transition: 'all 0.22s', flexShrink: 0 }}>→</div>
            </div>
          </div>

          {showOtherInput && (
            <div style={{
              borderRadius: '12px', padding: '16px',
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(14,20,14,0.96)',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              marginTop: '10px', boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
              display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px',
            }}>
              <input
                value={otherDept}
                onChange={e => setOtherDept(e.target.value)}
                placeholder="e.g. Mobile Banking, IT Security..."
                style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#ffffff', padding: '10px 14px', fontSize: '13px', outline: 'none' }}
                onKeyDown={e => e.key === 'Enter' && handleOtherSubmit()}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleOtherSubmit} disabled={!otherDept.trim()} style={{ flex: 1, background: otherDept.trim() ? '#006600' : 'rgba(255,255,255,0.08)', color: otherDept.trim() ? '#fff' : 'rgba(255,255,255,0.28)', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: otherDept.trim() ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap' }}>Continue →</button>
                <button onClick={() => { setShowOtherInput(false); setOtherDept(''); }} style={{ background: 'transparent', color: 'rgba(255,255,255,0.40)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AwarenessHub;