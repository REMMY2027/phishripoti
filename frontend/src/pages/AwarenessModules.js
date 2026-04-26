import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const modules = [
  {
    id: 'spotting',
    title: 'Spotting Phishing Emails',
    icon: '📧',
    desc: 'Learn to identify suspicious sender domains, urgency tactics, and credential harvesting attempts in emails.',
    tag: 'Most Common',
    tagColor: '#BB0000',
    active: true,
  },
  {
    id: 'mpesa',
    title: 'M-Pesa Fraud Awareness',
    icon: '📱',
    desc: 'Understand common M-Pesa phishing scams targeting Kenyan bank employees and customers.',
    tag: 'Kenya Specific',
    tagColor: '#006600',
    active: true,
  },
  {
    id: 'vishing',
    title: 'Vishing (Voice Phishing)',
    icon: '📞',
    desc: 'Recognise fraudulent phone calls impersonating bank executives, IT support or regulators.',
    tag: 'Coming v2.0',
    tagColor: '#6366f1',
    active: false,
  },
  {
    id: 'smishing',
    title: 'Smishing (SMS Phishing)',
    icon: '💬',
    desc: 'Identify fraudulent SMS messages targeting mobile banking credentials and M-Pesa accounts.',
    tag: 'Coming v2.0',
    tagColor: '#6366f1',
    active: false,
  },
  {
    id: 'social',
    title: 'Social Engineering Defence',
    icon: '🎭',
    desc: 'Recognise manipulation tactics used by attackers to gain unauthorised access through human interaction.',
    tag: 'Coming v2.0',
    tagColor: '#6366f1',
    active: false,
  },
  {
    id: 'browsing',
    title: 'Safe Browsing Practices',
    icon: '🌐',
    desc: 'Best practices for safe internet use in a financial institution including link verification techniques.',
    tag: 'Coming v2.0',
    tagColor: '#6366f1',
    active: false,
  },
];

const AwarenessModules = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const department = location.state?.department || 'General';
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUND — same as all report steps ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />

      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280 T 1600 300" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <path d="M -100 450 Q 250 330 600 460 T 1200 400" fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="89%" y1="20%" x2="93%" y2="38%" stroke="rgba(140,0,0,0.05)" strokeWidth="0.7"/>
      </svg>

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Department badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '8px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.16)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}/>
            <span style={{ color: '#006600', fontSize: '11px', fontWeight: '700' }}>{department}</span>
          </div>
          <button onClick={() => navigate('/awareness')} style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 18px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)',
            color: '#333333', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.16s ease',
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.70)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            ← Departments
          </button>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, padding: '28px 44px 20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          {[
            { n: 1, label: 'Department', done: true, active: false },
            { n: 2, label: 'Module', done: false, active: true },
            { n: 3, label: 'Learn & Assess', done: false, active: false },
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: step.done ? '#006600' : step.active ? '#BB0000' : 'rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: step.done || step.active ? '#fff' : 'rgba(0,0,0,0.30)' }}>
                  {step.done ? '✓' : step.n}
                </div>
                <span style={{ fontSize: '12px', fontWeight: step.active || step.done ? '700' : '500', color: step.active ? '#111111' : step.done ? '#006600' : 'rgba(0,0,0,0.35)' }}>{step.label}</span>
              </div>
              {i < 2 && <div style={{ width: '32px', height: '2px', background: step.done ? '#006600' : 'rgba(0,0,0,0.10)', borderRadius: '2px', margin: '0 4px', opacity: step.done ? 0.5 : 1 }}/>}
            </React.Fragment>
          ))}
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ marginBottom: '28px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-18px', left: '-6px', fontSize: '88px', fontWeight: '900', color: 'transparent', WebkitTextStroke: '1px rgba(187,0,0,0.05)', letterSpacing: '-5px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>MODULE</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.14)' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#006600' }}/>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#006600', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Pre-assessment → Learning → Post-assessment</span>
            </div>
            <h1 style={{ fontWeight: '900', fontSize: '30px', margin: '0 0 10px', letterSpacing: '-0.8px', lineHeight: 1.15, color: '#0a0a0a' }}>
              Choose a{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 50%, #006600 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>learning module</span>
                <span style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #BB0000, #006600)', borderRadius: '2px', opacity: 0.5 }}/>
              </span>
            </h1>
            <p style={{ color: 'rgba(0,0,0,0.48)', fontSize: '14px', margin: 0, lineHeight: '1.65', maxWidth: '520px', fontWeight: '500' }}>
              Each module includes a pre-assessment, personalised GPT-4o content, and a post-assessment to measure your improvement.
            </p>
          </div>
        </div>

        {/* ── 3-COLUMN CARDS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px',
          maxWidth: '980px',
        }}>
          {modules.map((mod) => {
            const hov = hovered === mod.id;
            return (
              <div
                key={mod.id}
                onClick={mod.active ? () => navigate('/awareness/quiz', { state: { department, module: mod.title, isPost: false } }) : undefined}
                onMouseEnter={() => mod.active && setHovered(mod.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '16px', padding: '0',
                  cursor: mod.active ? 'pointer' : 'not-allowed',
                  position: 'relative', overflow: 'hidden', display: 'flex',
                  background: mod.active
                    ? hov ? 'rgba(12,18,12,0.97)' : 'rgba(18,26,18,0.93)'
                    : 'rgba(28,32,28,0.60)',
                  border: mod.active
                    ? hov ? `1px solid ${mod.tagColor}45` : '1px solid rgba(255,255,255,0.09)'
                    : '1px solid rgba(255,255,255,0.05)',
                  transform: hov ? 'translateY(-3px) scale(1.005)' : 'translateY(0) scale(1)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: mod.active
                    ? hov ? `0 16px 44px rgba(0,0,0,0.22), 0 0 0 1px ${mod.tagColor}15` : '0 6px 20px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : '0 2px 10px rgba(0,0,0,0.08)',
                  opacity: mod.active ? 1 : 0.52,
                  backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                }}>

                {/* Glass sheen */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', pointerEvents: 'none', borderRadius: '16px' }} />

                {/* Top shimmer */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: hov ? `linear-gradient(90deg, transparent, ${mod.tagColor}55, transparent)` : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)' }} />

                {/* Left accent bar */}
                <div style={{
                  width: '5px', flexShrink: 0,
                  background: mod.active ? mod.tagColor : 'rgba(255,255,255,0.10)',
                  opacity: mod.active ? (hov ? 1 : 0.65) : 0.25,
                  borderRadius: '16px 0 0 16px', transition: 'all 0.22s',
                  boxShadow: hov ? `2px 0 12px ${mod.tagColor}35` : 'none',
                }} />

                {/* Content */}
                <div style={{ flex: 1, padding: '20px 18px 18px 14px' }}>

                  {/* Icon + tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: mod.active ? (hov ? `${mod.tagColor}22` : 'rgba(255,255,255,0.08)') : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${mod.active ? (hov ? mod.tagColor + '35' : 'rgba(255,255,255,0.12)') : 'rgba(255,255,255,0.06)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px', transition: 'all 0.22s',
                      boxShadow: hov ? `0 0 18px ${mod.tagColor}25` : 'none',
                    }}>{mod.icon}</div>

                    <div style={{
                      fontSize: '9px', fontWeight: '800',
                      padding: '3px 9px', borderRadius: '20px',
                      letterSpacing: '0.09em', textTransform: 'uppercase',
                      background: mod.active ? `${mod.tagColor}18` : 'rgba(255,255,255,0.05)',
                      color: mod.active ? mod.tagColor : 'rgba(255,255,255,0.25)',
                      border: `1px solid ${mod.active ? mod.tagColor + '30' : 'rgba(255,255,255,0.08)'}`,
                      whiteSpace: 'nowrap',
                    }}>{mod.tag}</div>
                  </div>

                  {/* Title */}
                  <div style={{ color: mod.active ? '#ffffff' : 'rgba(255,255,255,0.35)', fontWeight: '800', fontSize: '14px', marginBottom: '7px', letterSpacing: '-0.2px', lineHeight: 1.3 }}>
                    {mod.title}
                  </div>

                  {/* Description */}
                  <div style={{ color: mod.active ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.20)', fontSize: '12px', lineHeight: '1.65', marginBottom: '14px' }}>
                    {mod.desc}
                  </div>

                  {/* Bottom CTA */}
                  {mod.active ? (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '7px 11px', borderRadius: '8px',
                      background: `${mod.tagColor}14`,
                      border: `1px solid ${mod.tagColor}25`,
                    }}>
                      <span style={{ fontSize: '11px', color: mod.tagColor, fontWeight: '700' }}>Start module →</span>
                      <span style={{ fontSize: '10px', color: `${mod.tagColor}88`, fontWeight: '600' }}>Pre → Learn → Post</span>
                    </div>
                  ) : (
                    <div style={{ padding: '7px 11px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', fontWeight: '600' }}>Available in v2.0</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AwarenessModules;