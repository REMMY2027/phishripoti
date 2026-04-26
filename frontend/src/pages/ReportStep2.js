import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service',
    fullLabel: 'Customer Service / Teller',
    icon: '🎧',
    role: 'Handles customer queries, account access and M-Pesa transactions at the counter.',
    targets: 'M-Pesa impersonation, account takeover calls',
    accentColor: '#f59e0b',
    risk: 'MEDIUM',
    tag: 'FRONTLINE',
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    fullLabel: 'Finance & Accounts',
    icon: '📊',
    role: 'Handles payments, invoices, transfers and financial reporting for the institution.',
    targets: 'Invoice fraud, payment diversion, CFO impersonation',
    accentColor: '#BB0000',
    risk: 'HIGH',
    tag: 'HIGH VALUE',
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    fullLabel: 'Compliance / Risk',
    icon: '⚖️',
    role: 'Oversees regulatory adherence, internal risk controls and audit processes.',
    targets: 'CBK/KRA impersonation emails, fake audit requests',
    accentColor: '#006600',
    risk: 'LOW',
    tag: 'REGULATORY',
  },
  {
    id: 'loans',
    label: 'Loans / Credit',
    fullLabel: 'Loans / Credit Officer',
    icon: '💳',
    role: 'Processes loan applications, credit checks and approval workflows.',
    targets: 'Fake loan documents, credential harvesting portals',
    accentColor: '#BB0000',
    risk: 'HIGH',
    tag: 'SENSITIVE',
  },
  {
    id: 'operations',
    label: 'Operations',
    fullLabel: 'Operations',
    icon: '⚙️',
    role: 'Manages internal systems, IT access rights and daily bank operations.',
    targets: 'Fake IT support emails, system access phishing',
    accentColor: '#f59e0b',
    risk: 'MEDIUM',
    tag: 'INTERNAL',
  },
  {
    id: 'hr',
    label: 'Human Resources',
    fullLabel: 'Human Resources',
    icon: '👥',
    role: 'Manages staff records, payroll processing and employee onboarding.',
    targets: 'Payroll diversion attacks, fake employee document requests',
    accentColor: '#BB0000',
    risk: 'HIGH',
    tag: 'PAYROLL',
  },
  {
    id: 'other',
    label: 'Other Department',
    fullLabel: 'Other Department',
    icon: '✏️',
    role: 'Your department is not listed above. Enter it manually below.',
    targets: 'All phishing types apply',
    accentColor: '#6366f1',
    risk: null,
    tag: 'CUSTOM',
    isOther: true,
  },
];

const riskConfig = {
  HIGH:   { color: '#ef4444', bg: 'rgba(239,68,68,0.14)',  border: 'rgba(239,68,68,0.28)'  },
  MEDIUM: { color: '#f59e0b', bg: 'rgba(245,158,11,0.14)', border: 'rgba(245,158,11,0.28)' },
  LOW:    { color: '#22c55e', bg: 'rgba(34,197,94,0.14)',  border: 'rgba(34,197,94,0.28)'  },
};

const ReportStep2 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();
  const [selected, setSelected] = useState(reportData.department || '');
  const [hovered, setHovered] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');

  const handleSelect = (dept) => {
    if (dept.isOther) {
      setShowOtherInput(true);
      setSelected('');
      return;
    }
    setShowOtherInput(false);
    setSelected(dept.fullLabel);
    updateReport({ department: dept.fullLabel });
  };

  const handleOtherConfirm = () => {
    if (otherDept.trim()) {
      setSelected(otherDept.trim());
      updateReport({ department: otherDept.trim() });
      setShowOtherInput(false);
    }
  };

  const handleNext = () => { if (selected) navigate('/report/step3'); };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUND ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />

      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280 T 1600 300" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
      </svg>

      <div style={{
        position: 'fixed', bottom: '-30px', right: 0, width: '580px', height: '220px',
        zIndex: 5, pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="180" width="18" height="80" /><rect x="310" y="60" width="38" height="200" />
          <rect x="200" y="90" width="32" height="170" /><ellipse cx="216" cy="90" rx="18" ry="8" />
          <rect x="380" y="80" width="34" height="180" /><rect x="250" y="110" width="24" height="150" />
          <rect x="418" y="100" width="28" height="160" /><rect x="0" y="258" width="580" height="2" />
        </svg>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '66px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(187,0,0,0.30)', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.4px', lineHeight: 1 }}>
            <span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span>
          </span>
        </div>
        <button onClick={() => navigate('/it/login')} style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 18px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)',
          color: '#333333', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.16s ease',
        }}
          onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.70)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          IT Manager Portal
        </button>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, padding: '28px 44px 20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: '3px', borderRadius: '2px', width: i <= 2 ? '32px' : '18px', background: i < 2 ? '#006600' : i === 2 ? '#BB0000' : 'rgba(0,0,0,0.14)' }} />
          ))}
          <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', marginLeft: '8px', fontWeight: '700' }}>Step 2 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ marginBottom: '26px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-18px', left: '-6px', fontSize: '88px', fontWeight: '900', color: 'transparent', WebkitTextStroke: '1px rgba(0,100,30,0.05)', letterSpacing: '-5px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>DEPT</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.14)' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#006600' }}/>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#006600', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Identity Protected</span>
            </div>
            <h1 style={{ fontWeight: '900', fontSize: '30px', margin: '0 0 10px', letterSpacing: '-0.8px', lineHeight: 1.15, color: '#0a0a0a' }}>
              Which{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #006600 0%, #004400 50%, #BB0000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>department</span>
                <span style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #006600, #BB0000)', borderRadius: '2px', opacity: 0.5 }}/>
              </span>
              {' '}are you from?
            </h1>
            <p style={{ color: 'rgba(0,0,0,0.48)', fontSize: '14px', margin: 0, lineHeight: '1.65', maxWidth: '520px', fontWeight: '500' }}>
              Helps us contextualise the threat for your role. <span style={{ color: 'rgba(0,0,0,0.28)', fontWeight: '400' }}>Your department is stripped before storage — never linked to your identity.</span>
            </p>
          </div>
        </div>

        {/* ── 3-COLUMN GRID including Other ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '980px',
          width: '100%',
        }}>
          {departments.map((dept) => {
            const sel = selected === dept.fullLabel || (dept.isOther && showOtherInput);
            const hov = hovered === dept.id;
            const rc = dept.risk ? riskConfig[dept.risk] : { color: '#6366f1', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)' };

            return (
              <div
                key={dept.id}
                onClick={() => handleSelect(dept)}
                onMouseEnter={() => setHovered(dept.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '16px', padding: '0',
                  cursor: 'pointer', position: 'relative',
                  overflow: 'hidden', display: 'flex',
                  background: sel
                    ? 'rgba(12,18,12,0.98)'
                    : hov ? 'rgba(16,24,16,0.96)' : 'rgba(20,28,20,0.90)',
                  border: sel
                    ? `1px solid ${dept.accentColor}60`
                    : hov ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.09)',
                  transform: hov && !sel ? 'translateY(-3px) scale(1.005)' : 'translateY(0) scale(1)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: sel
                    ? `0 12px 36px rgba(0,0,0,0.22), 0 0 0 1px ${dept.accentColor}20`
                    : hov ? '0 10px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)' : '0 3px 14px rgba(0,0,0,0.12)',
                  backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                }}>

                {/* Glass sheen */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', pointerEvents: 'none', borderRadius: '16px' }} />

                {/* Top shimmer */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: sel || hov ? `linear-gradient(90deg, transparent, ${dept.accentColor}60, transparent)` : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }} />

                {/* Left accent bar */}
                <div style={{
                  width: '5px', flexShrink: 0,
                  background: sel ? `linear-gradient(180deg, ${dept.accentColor}, ${dept.accentColor}88)` : dept.accentColor,
                  opacity: sel ? 1 : hov ? 0.85 : 0.50,
                  borderRadius: '16px 0 0 16px', transition: 'all 0.22s',
                  boxShadow: sel || hov ? `2px 0 12px ${dept.accentColor}40` : 'none',
                }} />

                {/* Card content */}
                <div style={{ flex: 1, padding: dept.isOther ? '18px 16px' : '18px 16px 16px 14px' }}>

                  {dept.isOther ? (
                    /* Other dept — horizontal layout */
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99,102,241,0.14)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>✏️</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'rgba(255,255,255,0.90)', fontWeight: '800', fontSize: '14px', marginBottom: '3px' }}>Other Department</div>
                        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '12px' }}>Not listed above — enter manually</div>
                      </div>
                      <div style={{ color: hov ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)', fontSize: '18px', transition: 'all 0.22s', transform: hov ? 'translateX(3px)' : 'translateX(0)', flexShrink: 0 }}>→</div>
                    </div>
                  ) : (
                    <>
                      {/* Icon + risk badge + checkmark */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{
                          width: '42px', height: '42px', borderRadius: '12px',
                          background: sel || hov ? `${dept.accentColor}22` : 'rgba(255,255,255,0.08)',
                          border: `1px solid ${sel || hov ? dept.accentColor + '38' : 'rgba(255,255,255,0.12)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '20px', transition: 'all 0.22s',
                          boxShadow: sel || hov ? `0 0 16px ${dept.accentColor}28` : 'none',
                        }}>{dept.icon}</div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                          {sel && (
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: dept.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff', fontWeight: '900', boxShadow: `0 2px 8px ${dept.accentColor}55` }}>✓</div>
                          )}
                          {/* Risk badge */}
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '20px', background: rc.bg, border: `1px solid ${rc.border}` }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: rc.color }}/>
                            <span style={{ fontSize: '8px', fontWeight: '900', color: rc.color, letterSpacing: '0.09em', textTransform: 'uppercase' }}>{dept.risk}</span>
                          </div>
                          {/* Tag */}
                          <div style={{ fontSize: '8px', fontWeight: '800', padding: '2px 7px', borderRadius: '4px', letterSpacing: '0.09em', textTransform: 'uppercase', background: `${dept.accentColor}14`, color: dept.accentColor, border: `1px solid ${dept.accentColor}25` }}>{dept.tag}</div>
                        </div>
                      </div>

                      {/* Department name */}
                      <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '14px', marginBottom: '5px', letterSpacing: '-0.1px', lineHeight: 1.3 }}>{dept.label}</div>

                      {/* Role */}
                      <div style={{ color: 'rgba(255,255,255,0.52)', fontSize: '11px', lineHeight: '1.60', marginBottom: '12px' }}>{dept.role}</div>

                      {/* Targets */}
                      <div style={{
                        padding: '7px 10px', borderRadius: '8px',
                        background: `${dept.accentColor}14`,
                        border: `1px solid ${dept.accentColor}25`,
                        fontSize: '10px', color: dept.accentColor,
                        lineHeight: '1.5', fontWeight: '700',
                        display: 'flex', alignItems: 'flex-start', gap: '5px',
                      }}>
                        <span style={{ flexShrink: 0 }}>⚠</span>
                        <span>{dept.targets}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Other input — inline below grid */}
        {showOtherInput && (
          <div style={{
            marginTop: '12px', maxWidth: '980px',
            borderRadius: '14px', padding: '18px',
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(14,20,14,0.96)',
            backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          }}>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px', marginBottom: '3px' }}>Enter your department</div>
            <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', marginBottom: '10px' }}>Type your department — stripped before storage.</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={otherDept}
                onChange={e => setOtherDept(e.target.value)}
                placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
                style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#ffffff', padding: '10px 14px', fontSize: '13px', outline: 'none' }}
                onKeyDown={e => e.key === 'Enter' && handleOtherConfirm()}
                autoFocus
              />
              <button onClick={handleOtherConfirm} disabled={!otherDept.trim()} style={{ background: otherDept.trim() ? '#BB0000' : 'rgba(255,255,255,0.08)', color: otherDept.trim() ? '#fff' : 'rgba(255,255,255,0.28)', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: otherDept.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.16s', whiteSpace: 'nowrap' }}>Confirm →</button>
              <button onClick={() => { setShowOtherInput(false); setOtherDept(''); }} style={{ background: 'transparent', color: 'rgba(255,255,255,0.40)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Selected confirmation */}
        {selected && (
          <div style={{ marginTop: '12px', maxWidth: '980px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 14px', borderRadius: '8px', background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.24)', alignSelf: 'flex-start' }}>
            <span style={{ color: '#22c55e', fontSize: '13px' }}>✓</span>
            <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: '700' }}>{selected}</span>
            <span style={{ color: 'rgba(0,0,0,0.40)', fontSize: '11px' }}>— stripped before storage</span>
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