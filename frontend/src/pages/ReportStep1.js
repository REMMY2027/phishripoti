import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const incidentTypes = [
  {
    id: 'phishing',
    icon: '📧',
    title: 'Phishing Email',
    description: 'A suspicious email asking you to click a link, enter your password, make a payment, or share personal information.',
    threat: 'Most common attack in Kenyan banks — M-Pesa and KCB are top targets',
    tag: 'EMAIL FRAUD',
    tagColor: '#BB0000',
    active: true,
  },
  {
    id: 'smishing',
    icon: '💬',
    title: 'Smishing (SMS Phishing)',
    description: 'A fake SMS pretending to be from M-Pesa, Safaricom, or your bank asking you to share credentials or call a number.',
    threat: 'Rapidly growing — targets mobile banking users across Kenya',
    tag: 'SMS FRAUD',
    tagColor: '#d97706',
    active: false,
  },
  {
    id: 'vishing',
    icon: '📞',
    title: 'Vishing (Voice Call)',
    description: 'A phone call from someone pretending to be a bank manager, IT support, or a government official to steal information.',
    threat: 'Used to bypass digital security controls in financial institutions',
    tag: 'CALL FRAUD',
    tagColor: '#d97706',
    active: false,
  },
  {
    id: 'social',
    icon: '🎭',
    title: 'Social Engineering',
    description: 'Someone manipulating you in person or online — pretending to be a colleague, IT technician, or authority figure.',
    threat: 'Targets human trust rather than technical vulnerabilities',
    tag: 'MANIPULATION',
    tagColor: '#6366f1',
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUND ── */}
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
          <rect x="418" y="100" width="28" height="160" /><rect x="476" y="130" width="26" height="130" />
          <rect x="0" y="258" width="580" height="2" />
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
            <div key={i} style={{ height: '3px', borderRadius: '2px', width: i === 1 ? '32px' : '18px', background: i === 1 ? '#BB0000' : 'rgba(0,0,0,0.14)', transition: 'all 0.3s' }} />
          ))}
          <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', marginLeft: '8px', fontWeight: '700' }}>Step 1 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ marginBottom: '28px', position: 'relative' }}>
          {/* Watermark */}
          <div style={{ position: 'absolute', top: '-18px', left: '-6px', fontSize: '88px', fontWeight: '900', color: 'transparent', WebkitTextStroke: '1px rgba(187,0,0,0.05)', letterSpacing: '-5px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>INCIDENT</div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(187,0,0,0.07)', border: '1px solid rgba(187,0,0,0.14)' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#BB0000' }}/>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#BB0000', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Anonymous Report</span>
            </div>

            <h1 style={{ fontWeight: '900', fontSize: '30px', margin: '0 0 10px', letterSpacing: '-0.8px', lineHeight: 1.15, color: '#0a0a0a' }}>
              What type of{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 50%, #006600 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>incident</span>
                {/* Underline accent */}
                <span style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #BB0000, #006600)', borderRadius: '2px', opacity: 0.5 }}/>
              </span>
              {' '}are you reporting?
            </h1>
            <p style={{ color: 'rgba(0,0,0,0.48)', fontSize: '14px', margin: 0, lineHeight: '1.65', maxWidth: '520px', fontWeight: '500' }}>
              Select the type that best describes what you received. <span style={{ color: 'rgba(0,0,0,0.28)', fontWeight: '400' }}>Only Phishing Email is active in v1.0 — more types coming soon.</span>
            </p>
          </div>
        </div>

        {/* ── CARDS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          maxWidth: '860px',
          width: '100%',
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
                  cursor: type.active ? 'pointer' : 'not-allowed',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  background: type.active
                    ? hov ? 'rgba(12,18,12,0.97)' : 'rgba(18,26,18,0.93)'
                    : 'rgba(28,32,28,0.72)',
                  border: type.active
                    ? hov ? '1px solid rgba(187,0,0,0.40)' : '1px solid rgba(255,255,255,0.10)'
                    : '1px solid rgba(255,255,255,0.06)',
                  transform: hov ? 'translateY(-4px) scale(1.008)' : 'translateY(0) scale(1)',
                  transition: 'all 0.24s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: type.active
                    ? hov
                      ? '0 20px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(187,0,0,0.15)'
                      : '0 6px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : '0 2px 10px rgba(0,0,0,0.08)',
                  opacity: type.active ? 1 : 0.65,
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                }}>

                {/* Glass sheen */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', pointerEvents: 'none', borderRadius: '16px' }} />

                {/* Top shimmer */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: hov ? 'linear-gradient(90deg, transparent, rgba(187,0,0,0.50), transparent)' : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }} />

                {/* Left accent bar */}
                <div style={{
                  width: '5px', flexShrink: 0,
                  background: type.active
                    ? hov ? `linear-gradient(180deg, #BB0000, #006600)` : '#BB0000'
                    : 'rgba(255,255,255,0.12)',
                  opacity: type.active ? (hov ? 1 : 0.75) : 0.30,
                  borderRadius: '16px 0 0 16px',
                  transition: 'all 0.24s',
                  boxShadow: hov ? '3px 0 14px rgba(187,0,0,0.30)' : 'none',
                }} />

                {/* Card content */}
                <div style={{ flex: 1, padding: '22px 20px 20px 16px' }}>

                  {/* Top row — icon + badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '13px',
                      background: type.active ? hov ? 'rgba(187,0,0,0.18)' : 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                      border: type.active ? hov ? '1px solid rgba(187,0,0,0.32)' : '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', transition: 'all 0.24s',
                      boxShadow: hov ? '0 0 20px rgba(187,0,0,0.22)' : 'none',
                    }}>
                      {type.icon}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                      {/* Active / version badge */}
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '9px', fontWeight: '800',
                        padding: '3px 9px', borderRadius: '20px',
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        background: type.active ? 'rgba(34,197,94,0.16)' : 'rgba(255,255,255,0.06)',
                        color: type.active ? '#4ade80' : 'rgba(255,255,255,0.28)',
                        border: type.active ? '1px solid rgba(34,197,94,0.28)' : '1px solid rgba(255,255,255,0.09)',
                      }}>
                        {type.active ? '✓ Active' : 'v2.0'}
                      </div>
                      {/* Type tag */}
                      <div style={{
                        fontSize: '8px', fontWeight: '800',
                        padding: '2px 8px', borderRadius: '4px',
                        letterSpacing: '0.10em', textTransform: 'uppercase',
                        background: type.active ? `${type.tagColor}18` : 'rgba(255,255,255,0.04)',
                        color: type.active ? type.tagColor : 'rgba(255,255,255,0.20)',
                        border: type.active ? `1px solid ${type.tagColor}30` : '1px solid rgba(255,255,255,0.06)',
                      }}>
                        {type.tag}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{
                    color: type.active ? '#ffffff' : 'rgba(255,255,255,0.40)',
                    fontWeight: '800', fontSize: '15px',
                    marginBottom: '8px', letterSpacing: '-0.2px',
                    lineHeight: 1.3,
                  }}>
                    {type.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    color: type.active ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.22)',
                    fontSize: '12px', lineHeight: '1.70',
                    marginBottom: '16px',
                    fontWeight: '400',
                  }}>
                    {type.description}
                  </div>

                  {/* Threat tag */}
                  <div style={{
                    padding: '8px 12px', borderRadius: '9px',
                    background: type.active ? 'rgba(187,0,0,0.10)' : 'rgba(255,255,255,0.03)',
                    border: type.active ? '1px solid rgba(187,0,0,0.20)' : '1px solid rgba(255,255,255,0.05)',
                    fontSize: '11px',
                    color: type.active ? 'rgba(255,130,130,0.90)' : 'rgba(255,255,255,0.18)',
                    lineHeight: '1.5', fontWeight: '600',
                    display: 'flex', alignItems: 'flex-start', gap: '6px',
                  }}>
                    <span style={{ flexShrink: 0, marginTop: '1px' }}>⚠</span>
                    <span>{type.threat}</span>
                  </div>

                  {/* Arrow */}
                  {type.active && (
                    <div style={{
                      textAlign: 'right', marginTop: '12px',
                      color: hov ? '#BB0000' : 'rgba(255,255,255,0.20)',
                      fontSize: '18px', transition: 'all 0.24s',
                      transform: hov ? 'translateX(5px)' : 'translateX(0)',
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