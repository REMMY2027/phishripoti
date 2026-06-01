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
  const isMobile = window.innerWidth < 640;

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

      {/* Skyline hidden on mobile */}
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
          {/* Department badge — truncate on mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '7px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.16)', maxWidth: isMobile ? '100px' : '200px', overflow: 'hidden' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#006600', flexShrink: 0 }}/>
            <span style={{ color: '#006600', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{department}</span>
          </div>
          <button onClick={() => navigate('/awareness')} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)',
            color: '#333333', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>
            ← {isMobile ? 'Back' : 'Departments'}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '6px', marginBottom: '16px', flexWrap: 'nowrap' }}>
          {[
            { n: 1, label: 'Department', done: true, active: false },
            { n: 2, label: 'Module', done: false, active: true },
            { n: 3, label: isMobile ? 'Assess' : 'Learn & Assess', done: false, active: false },
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: step.done ? '#006600' : step.active ? '#BB0000' : 'rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', color: step.done || step.active ? '#fff' : 'rgba(0,0,0,0.30)' }}>
                  {step.done ? '✓' : step.n}
                </div>
                <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: step.active || step.done ? '700' : '500', color: step.active ? '#111111' : step.done ? '#006600' : 'rgba(0,0,0,0.35)' }}>{step.label}</span>
              </div>
              {i < 2 && <div style={{ width: isMobile ? '16px' : '32px', height: '2px', background: step.done ? '#006600' : 'rgba(0,0,0,0.10)', borderRadius: '2px', margin: '0 2px', flexShrink: 0 }}/>}
            </React.Fragment>
          ))}
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.14)' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#006600' }}/>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#006600', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {isMobile ? 'Pre → Learn → Post' : 'Pre-assessment → Learning → Post-assessment'}
            </span>
          </div>
          <h1 style={{ fontWeight: '900', fontSize: isMobile ? '22px' : '30px', margin: '0 0 8px', letterSpacing: '-0.5px', lineHeight: 1.2, color: '#0a0a0a' }}>
            Choose a{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 50%, #006600 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>learning module</span>
              <span style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #BB0000, #006600)', borderRadius: '2px', opacity: 0.5 }}/>
            </span>
          </h1>
          <p style={{ color: 'rgba(0,0,0,0.48)', fontSize: isMobile ? '13px' : '14px', margin: 0, lineHeight: '1.65', fontWeight: '500' }}>
            {isMobile
              ? 'Pre-assessment, GPT-4o content and post-assessment to measure your improvement.'
              : 'Each module includes a pre-assessment, personalised GPT-4o content, and a post-assessment to measure your improvement.'}
          </p>
        </div>

        {/* ── MODULE GRID ──
            Mobile:  2 columns
            Desktop: 3 columns
        ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '10px' : '14px',
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
                  borderRadius: '14px', padding: '0',
                  cursor: mod.active ? 'pointer' : 'not-allowed',
                  position: 'relative', overflow: 'hidden', display: 'flex',
                  background: mod.active
                    ? hov ? 'rgba(12,18,12,0.97)' : 'rgba(18,26,18,0.93)'
                    : 'rgba(28,32,28,0.60)',
                  border: mod.active
                    ? hov ? `1px solid ${mod.tagColor}45` : '1px solid rgba(255,255,255,0.09)'
                    : '1px solid rgba(255,255,255,0.05)',
                  transform: hov ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: mod.active
                    ? hov ? `0 12px 36px rgba(0,0,0,0.20)` : '0 4px 16px rgba(0,0,0,0.12)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                  opacity: mod.active ? 1 : 0.52,
                  backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                }}>

                {/* Glass sheen */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', pointerEvents: 'none', borderRadius: '14px' }} />

                {/* Top shimmer */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: hov ? `linear-gradient(90deg, transparent, ${mod.tagColor}55, transparent)` : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)' }} />

                {/* Left accent bar */}
                <div style={{
                  width: '4px', flexShrink: 0,
                  background: mod.active ? mod.tagColor : 'rgba(255,255,255,0.10)',
                  opacity: mod.active ? (hov ? 1 : 0.65) : 0.25,
                  borderRadius: '14px 0 0 14px', transition: 'all 0.22s',
                }} />

                {/* Content */}
                <div style={{ flex: 1, padding: isMobile ? '14px 12px 12px 10px' : '20px 18px 18px 14px' }}>

                  {/* Icon + tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{
                      width: isMobile ? '36px' : '44px',
                      height: isMobile ? '36px' : '44px',
                      borderRadius: '10px',
                      background: mod.active ? (hov ? `${mod.tagColor}22` : 'rgba(255,255,255,0.08)') : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${mod.active ? (hov ? mod.tagColor + '35' : 'rgba(255,255,255,0.12)') : 'rgba(255,255,255,0.06)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: isMobile ? '18px' : '20px', transition: 'all 0.22s', flexShrink: 0,
                    }}>{mod.icon}</div>

                    <div style={{
                      fontSize: '8px', fontWeight: '800',
                      padding: '2px 7px', borderRadius: '20px',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      background: mod.active ? `${mod.tagColor}18` : 'rgba(255,255,255,0.05)',
                      color: mod.active ? mod.tagColor : 'rgba(255,255,255,0.25)',
                      border: `1px solid ${mod.active ? mod.tagColor + '30' : 'rgba(255,255,255,0.08)'}`,
                      whiteSpace: 'nowrap', maxWidth: isMobile ? '70px' : 'none',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{mod.tag}</div>
                  </div>

                  {/* Title */}
                  <div style={{ color: mod.active ? '#ffffff' : 'rgba(255,255,255,0.35)', fontWeight: '800', fontSize: isMobile ? '12px' : '14px', marginBottom: '6px', letterSpacing: '-0.2px', lineHeight: 1.3 }}>
                    {mod.title}
                  </div>

                  {/* Description — hidden on mobile */}
                  {!isMobile && (
                    <div style={{ color: mod.active ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.20)', fontSize: '12px', lineHeight: '1.65', marginBottom: '14px' }}>
                      {mod.desc}
                    </div>
                  )}

                  {/* Bottom CTA */}
                  {mod.active ? (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'space-between',
                      padding: isMobile ? '6px 8px' : '7px 11px', borderRadius: '8px',
                      background: `${mod.tagColor}14`,
                      border: `1px solid ${mod.tagColor}25`,
                      marginTop: isMobile ? '8px' : '0',
                    }}>
                      <span style={{ fontSize: '10px', color: mod.tagColor, fontWeight: '700' }}>
                        {isMobile ? 'Start →' : 'Start module →'}
                      </span>
                      {!isMobile && <span style={{ fontSize: '10px', color: `${mod.tagColor}88`, fontWeight: '600' }}>Pre → Learn → Post</span>}
                    </div>
                  ) : (
                    <div style={{ padding: isMobile ? '5px 7px' : '7px 11px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', marginTop: isMobile ? '8px' : '0' }}>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', fontWeight: '600' }}>v2.0</span>
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