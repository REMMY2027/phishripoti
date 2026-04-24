import React, { useState, useEffect } from 'react';

const steps = [
  { label: 'Stripping personal identifiers', sublabel: 'Removing all identity fields before analysis', icon: '🛡️', duration: 2000 },
  { label: 'Scanning links with Google Safe Browsing', sublabel: 'Checking URLs against Google threat database', icon: '🔍', duration: 2500 },
  { label: 'Running GPT-4o phishing analysis', sublabel: 'AI detecting domain spoofing, urgency tactics and M-Pesa abuse', icon: '🤖', duration: 3000 },
  { label: 'Calculating composite risk score', sublabel: 'Combining AI and Safe Browsing signals into a risk tier', icon: '📊', duration: 2000 },
  { label: 'Generating anonymised report token', sublabel: 'Creating your untraceable report reference', icon: '🔐', duration: 1500 }
];

const Processing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

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
          if (stepIndex < steps.length) {
            setTimeout(runStep, 200);
          }
        }
      }, progressTick);
    };

    runStep();
    return () => clearInterval(progressInterval);
  }, []);

  const tips = [
    'PhishRipoti uses GPT-4o — the same AI powering ChatGPT Plus.',
    'Your department name is stripped before any data is stored.',
    'Google Safe Browsing protects over 4 billion devices worldwide.',
    'M-Pesa fraud accounts for over 40% of financial phishing in Kenya.',
    'Your report token cannot be traced back to you in any way.'
  ];

  const [tipIndex] = useState(Math.floor(Math.random() * tips.length));

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: '#050d05', position: 'relative', overflow: 'hidden'
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,102,0,0.15) 0%, transparent 70%)',
        animation: 'pulse-blob 4s ease-in-out infinite', zIndex: 0
      }}/>
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(187,0,0,0.1) 0%, transparent 70%)',
        animation: 'pulse-blob 4s ease-in-out infinite 2s', zIndex: 0
      }}/>

      <style>{`
        @keyframes pulse-blob {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', position: 'relative', zIndex: 1
      }}>

        {/* Logo */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg style={{ animation: 'spin 3s linear infinite' }}
              width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(0,102,0,0.15)" strokeWidth="2"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#006600" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '24px'
            }}>🛡️</div>
          </div>
        </div>

        {/* Title */}
        <h2 style={{
          color: '#ffffff', fontWeight: '800', fontSize: '24px',
          margin: '0 0 8px', letterSpacing: '-0.5px', textAlign: 'center'
        }}>
          Analysing your report
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '14px',
          margin: '0 0 40px', textAlign: 'center'
        }}>
          GPT-4o and Google Safe Browsing are processing your submission
        </p>

        {/* Overall progress */}
        <div style={{ width: '100%', maxWidth: '520px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Overall Progress
            </span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#69db7c' }}>
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div style={{
            height: '8px', background: 'rgba(255,255,255,0.06)',
            borderRadius: '8px', overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', borderRadius: '8px',
              background: 'linear-gradient(90deg, #006600, #69db7c, #006600)',
              backgroundSize: '200% 100%',
              width: `${overallProgress}%`,
              transition: 'width 0.3s ease',
              animation: 'shimmer 2s linear infinite'
            }}></div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ width: '100%', maxWidth: '520px', marginBottom: '40px' }}>
          {steps.map((step, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = currentStep === i && !isDone;

            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                padding: '14px 18px', marginBottom: '8px',
                borderRadius: '14px', transition: 'all 0.3s ease',
                background: isDone
                  ? 'rgba(0,102,0,0.08)'
                  : isActive
                  ? 'rgba(255,255,255,0.05)'
                  : 'transparent',
                border: isDone
                  ? '1px solid rgba(0,102,0,0.2)'
                  : isActive
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid transparent',
                animation: isActive ? 'fadeInUp 0.3s ease' : 'none'
              }}>

                {/* Step icon */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  flexShrink: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px',
                  background: isDone
                    ? 'rgba(0,102,0,0.2)'
                    : isActive
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(255,255,255,0.03)',
                  border: isDone
                    ? '1px solid rgba(0,102,0,0.3)'
                    : isActive
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(255,255,255,0.05)'
                }}>
                  {isDone ? '✓' : step.icon}
                </div>

                {/* Step content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: isDone ? '#69db7c' : isActive ? '#ffffff' : 'rgba(255,255,255,0.25)',
                    fontWeight: isDone || isActive ? '600' : '400',
                    fontSize: '14px', marginBottom: '3px',
                    transition: 'color 0.3s'
                  }}>
                    {step.label}
                  </div>
                  <div style={{
                    color: isDone
                      ? 'rgba(105,219,124,0.5)'
                      : isActive
                      ? 'rgba(255,255,255,0.4)'
                      : 'rgba(255,255,255,0.15)',
                    fontSize: '12px', lineHeight: '1.5',
                    transition: 'color 0.3s'
                  }}>
                    {step.sublabel}
                  </div>

                  {/* Step progress bar */}
                  {isActive && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{
                        height: '3px', background: 'rgba(255,255,255,0.08)',
                        borderRadius: '3px', overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%', borderRadius: '3px',
                          background: 'linear-gradient(90deg, #006600, #69db7c)',
                          width: `${stepProgress}%`,
                          transition: 'width 0.1s linear'
                        }}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status indicator */}
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  {isDone ? (
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: '#006600',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', color: '#fff', fontWeight: '700'
                    }}>✓</div>
                  ) : isActive ? (
                    <svg style={{ animation: 'spin 1s linear infinite' }}
                      width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
                      <path d="M12 3a9 9 0 0 1 9 9" stroke="#69db7c" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Did you know tip */}
        <div style={{
          width: '100%', maxWidth: '520px',
          padding: '16px 20px', borderRadius: '14px',
          background: 'rgba(234,150,0,0.07)',
          border: '1px solid rgba(234,150,0,0.2)',
          display: 'flex', alignItems: 'flex-start', gap: '12px'
        }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
          <div>
            <div style={{
              fontSize: '10px', fontWeight: '700', color: '#ffd166',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px'
            }}>
              Did You Know?
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
              {tips[tipIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processing;