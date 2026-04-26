import React, { useState, useEffect } from 'react';

const steps = [
  { label: 'Stripping personal identifiers', sublabel: 'Removing all identity fields before analysis', icon: '🛡️', duration: 2000 },
  { label: 'Scanning links with Google Safe Browsing', sublabel: 'Checking URLs against Google threat database', icon: '🔍', duration: 2500 },
  { label: 'Running GPT-4o phishing analysis', sublabel: 'AI detecting domain spoofing, urgency tactics and M-Pesa abuse', icon: '🤖', duration: 3000 },
  { label: 'Calculating composite risk score', sublabel: 'Combining AI and Safe Browsing signals into a risk tier', icon: '📊', duration: 2000 },
  { label: 'Generating anonymised report token', sublabel: 'Creating your untraceable report reference', icon: '🔐', duration: 1500 },
];

const tips = [
  'PhishRipoti uses GPT-4o — the same AI powering ChatGPT Plus.',
  'Your department name is stripped before any data is stored.',
  'Google Safe Browsing protects over 4 billion devices worldwide.',
  'M-Pesa fraud accounts for over 40% of financial phishing in Kenya.',
  'Your report token cannot be traced back to you in any way.',
];

const Processing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [tipIndex] = useState(Math.floor(Math.random() * tips.length));

  useEffect(() => {
    let stepIndex = 0;
    let progressInterval;

    const runStep = () => {
      if (stepIndex >= steps.length) return;
      setCurrentStep(stepIndex);
      setStepProgress(0);

      const stepDuration = steps[stepIndex].duration;
      const progressTick = 50;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += progressTick;
        const stepPct = Math.min((elapsed / stepDuration) * 100, 100);
        setStepProgress(stepPct);

        const overall = ((stepIndex / steps.length) + (stepPct / 100 / steps.length)) * 100;
        setOverallProgress(Math.min(overall, 99));

        if (elapsed >= stepDuration) {
          clearInterval(progressInterval);
          setCompletedSteps(prev => [...prev, stepIndex]);
          stepIndex++;
          if (stepIndex < steps.length) setTimeout(runStep, 200);
        }
      }, progressTick);
    };

    runStep();
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.55; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>

      {/* ── BACKGROUND — matches all steps ── */}
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

      {/* Nairobi skyline */}
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
        {/* Live analysis indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 14px', borderRadius: '8px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.16)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600', animation: 'pulse 1.5s infinite' }}/>
          <span style={{ color: '#006600', fontSize: '12px', fontWeight: '700' }}>Analysis in progress</span>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* ── HERO SPINNER ── */}
          <div style={{ marginBottom: '32px', position: 'relative', animation: 'float 3s ease-in-out infinite' }}>
            {/* Outer ring */}
            <svg style={{ animation: 'spin 3s linear infinite', position: 'absolute', inset: '-12px' }}
              width="112" height="112" viewBox="0 0 112 112" fill="none">
              <circle cx="56" cy="56" r="50" stroke="rgba(0,102,0,0.10)" strokeWidth="2"/>
              <path d="M56 6a50 50 0 0 1 50 50" stroke="#006600" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M56 6a50 50 0 0 0 -50 50" stroke="#BB0000" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
            </svg>

            {/* Inner ring */}
            <svg style={{ animation: 'spin 2s linear infinite reverse', position: 'absolute', inset: '-4px' }}
              width="96" height="96" viewBox="0 0 96 96" fill="none">
              <circle cx="48" cy="48" r="42" stroke="rgba(187,0,0,0.08)" strokeWidth="1.5"/>
              <path d="M48 6a42 42 0 0 1 42 42" stroke="#BB0000" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            {/* Centre icon */}
            <div style={{
              width: '88px', height: '88px', borderRadius: '50%',
              background: 'rgba(18,26,18,0.92)',
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
            }}>
              {steps[currentStep]?.icon || '🛡️'}
            </div>
          </div>

          {/* ── TITLE ── */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontWeight: '900', fontSize: '28px', margin: '0 0 8px', letterSpacing: '-0.6px', color: '#111111' }}>
              Analysing your{' '}
              <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #BB0000, #006600)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>report</span>
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '14px', margin: 0, lineHeight: '1.6', fontWeight: '500' }}>
              GPT-4o and Google Safe Browsing are processing your submission
            </p>
          </div>

          {/* ── OVERALL PROGRESS ── */}
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(0,0,0,0.40)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>Overall Progress</span>
              <span style={{ fontSize: '14px', fontWeight: '900', color: '#006600', letterSpacing: '-0.3px' }}>{Math.round(overallProgress)}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(0,0,0,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '8px',
                background: 'linear-gradient(90deg, #BB0000, #006600, #BB0000)',
                backgroundSize: '200% 100%',
                width: `${overallProgress}%`,
                transition: 'width 0.3s ease',
                animation: 'shimmer 2s linear infinite',
              }}/>
            </div>
          </div>

          {/* ── STEPS CARD ── */}
          <div style={{
            width: '100%', borderRadius: '20px',
            background: 'rgba(18,26,18,0.92)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.16)',
            overflow: 'hidden', marginBottom: '16px',
            position: 'relative',
          }}>
            {/* Top bar */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, #1a1a1a, #006600)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

            {/* Steps list */}
            <div style={{ padding: '6px 0' }}>
              {steps.map((step, i) => {
                const isDone = completedSteps.includes(i);
                const isActive = currentStep === i && !isDone;

                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 20px',
                    background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                    borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    transition: 'background 0.3s',
                    position: 'relative',
                  }}>
                    {/* Left colour indicator */}
                    {isActive && (
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(180deg, #006600, #22c55e)', borderRadius: '0 2px 2px 0' }} />
                    )}
                    {isDone && (
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: '#006600', opacity: 0.5, borderRadius: '0 2px 2px 0' }} />
                    )}

                    {/* Icon */}
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: isDone ? '16px' : '20px',
                      background: isDone ? 'rgba(0,102,0,0.20)' : isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                      border: isDone ? '1px solid rgba(0,102,0,0.35)' : isActive ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.3s',
                    }}>
                      {isDone ? '✓' : step.icon}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        color: isDone ? '#4ade80' : isActive ? '#ffffff' : 'rgba(255,255,255,0.28)',
                        fontWeight: isDone || isActive ? '700' : '500',
                        fontSize: '13px', marginBottom: '3px',
                        transition: 'color 0.3s',
                      }}>
                        {step.label}
                      </div>
                      <div style={{
                        color: isDone ? 'rgba(74,222,128,0.50)' : isActive ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.16)',
                        fontSize: '11px', lineHeight: '1.5',
                        transition: 'color 0.3s',
                      }}>
                        {step.sublabel}
                      </div>
                      {/* Step progress bar */}
                      {isActive && (
                        <div style={{ marginTop: '8px', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, #006600, #22c55e)', width: `${stepProgress}%`, transition: 'width 0.1s linear' }}/>
                        </div>
                      )}
                    </div>

                    {/* Status indicator */}
                    <div style={{ flexShrink: 0 }}>
                      {isDone ? (
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#006600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: '900', boxShadow: '0 2px 8px rgba(0,102,0,0.35)' }}>✓</div>
                      ) : isActive ? (
                        <svg style={{ animation: 'spin 1s linear infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.10)" strokeWidth="2.5"/>
                          <path d="M12 3a9 9 0 0 1 9 9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.03)' }}/>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── DID YOU KNOW TIP ── */}
          <div style={{
            width: '100%', borderRadius: '16px', overflow: 'hidden',
            background: 'rgba(18,26,18,0.88)',
            border: '1px solid rgba(234,150,0,0.28)',
            backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #ffd166, #ea9600, transparent)' }} />
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(234,150,0,0.16)', border: '1px solid rgba(234,150,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>💡</div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#ffd166', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: '5px' }}>🇰🇪 Did You Know?</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.68)', lineHeight: '1.65', fontWeight: '500' }}>{tips[tipIndex]}</div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div style={{ marginTop: '20px', textAlign: 'center', color: 'rgba(0,0,0,0.28)', fontSize: '11px', fontWeight: '500' }}>
            Do not close this page — analysis typically takes 15–30 seconds
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processing;