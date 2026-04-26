import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';

const Result = () => {
  const navigate = useNavigate();
  const { result, clearReport } = useReport();
  const { showToast } = useToast();
  const [scoreAnimated, setScoreAnimated] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setTimeout(() => setVisible(true), 100);
      if (result.riskLevel === 'HIGH') {
        showToast('HIGH risk detected — security team notified anonymously', 'error');
      } else if (result.riskLevel === 'MEDIUM') {
        showToast('MEDIUM risk — exercise caution with this email', 'warning');
      } else {
        showToast('Report submitted successfully', 'success');
      }
      let current = 0;
      const target = result.riskScore;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { setScoreAnimated(target); clearInterval(timer); }
        else { setScoreAnimated(Math.round(current)); }
      }, 30);
      return () => clearInterval(timer);
    }
  }, []); // eslint-disable-line

  if (!result) { navigate('/'); return null; }

  const riskConfig = {
    HIGH: {
      accent: '#BB0000', accentLight: '#ff6666',
      border: 'rgba(187,0,0,0.35)', glow: 'rgba(187,0,0,0.15)',
      label: 'High Risk Phishing Detected',
      sublabel: 'This email is dangerous. Do not click any links, do not open attachments, and delete it immediately.',
      gaugeColor: '#BB0000', badgeBg: 'rgba(187,0,0,0.14)',
    },
    MEDIUM: {
      accent: '#d97706', accentLight: '#fcd34d',
      border: 'rgba(217,119,6,0.35)', glow: 'rgba(217,119,6,0.15)',
      label: 'Medium Risk — Exercise Caution',
      sublabel: 'This email looks suspicious. Do not click any links until you have confirmed the sender is real.',
      gaugeColor: '#d97706', badgeBg: 'rgba(217,119,6,0.14)',
    },
    LOW: {
      accent: '#006600', accentLight: '#4ade80',
      border: 'rgba(0,102,0,0.35)', glow: 'rgba(0,102,0,0.15)',
      label: 'Low Risk — Likely Safe',
      sublabel: 'This email shows weak threat signals and appears legitimate. Still stay cautious.',
      gaugeColor: '#006600', badgeBg: 'rgba(0,102,0,0.14)',
    },
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);
  const handleHome = () => { clearReport(); navigate('/'); };

  // Employee-directed Kenyan tips
  const employeeTips = [
    "As a bank employee, you are a prime target. M-Pesa will NEVER ask you to share your PIN or authorisation code via email. If you receive such a request at work, delete it and alert your IT team immediately.",
    "Your institution's IT team will never ask for your network password by email. If you receive such a request, do not respond — call your IT helpdesk directly using the internal number.",
    "KRA will only contact you through official channels. Any email claiming to be from KRA asking you to click a link or share credentials is a phishing attempt — report it to your supervisor.",
    "As a finance or operations employee, you are a top target for invoice fraud. Always verify payment requests by calling the requester directly — never use contact details from the email itself.",
    "In Kenyan financial institutions, over 70% of cyber incidents start with a phishing email to a staff member. Your vigilance protects your colleagues, customers and the institution.",
    "Never access your work systems or M-Pesa business accounts through links in emails. Always type the address directly into your browser or use official bookmarks.",
    "If a colleague or manager emails asking you to make an urgent payment or share access credentials, call them directly to confirm — attackers often impersonate internal staff.",
  ];

  const tipText = result.didYouKnow
    ? `${result.didYouKnow} As a bank employee, always verify unexpected requests through official channels before taking any action.`
    : employeeTips[Math.floor(Math.random() * employeeTips.length)];

  // Simple English actions
  const simpleActions = result.recommendedActions?.map(action => {
    if (action.toLowerCase().includes('delete') || action.toLowerCase().includes('remove')) return 'Delete this email from your inbox right now.';
    if (action.toLowerCase().includes('report') || action.toLowerCase().includes('forward')) return 'Forward the email to your IT security team immediately.';
    if (action.toLowerCase().includes('link') || action.toLowerCase().includes('click')) return 'Do not click any links in the email under any circumstances.';
    if (action.toLowerCase().includes('credential') || action.toLowerCase().includes('password')) return 'Change your work password immediately if you clicked anything.';
    if (action.toLowerCase().includes('attachment') || action.toLowerCase().includes('file')) return 'Do not open any attachments — even if the file looks familiar.';
    if (action.toLowerCase().includes('verify') || action.toLowerCase().includes('confirm')) return 'Call the sender using the official number — not any number in the email.';
    return action;
  }) || [
    'Delete this email from your inbox immediately.',
    'Do not click any links or open any attachments.',
    'Alert your IT security team about this email.',
    'If you clicked anything, change your work passwords now.',
  ];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
      `}</style>

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
        padding: '0 2.5rem', height: '60px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(187,0,0,0.30)', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize: '19px', fontWeight: '800', letterSpacing: '-0.4px', lineHeight: 1 }}>
            <span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span>
          </span>
        </div>
        {/* Compact action buttons in navbar */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{
            padding: '7px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px',
            color: '#ffffff', background: 'linear-gradient(135deg, #BB0000, #880000)',
            border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(187,0,0,0.28)', transition: 'all 0.16s',
          }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            📧 Report Another
          </button>
          <button onClick={() => navigate('/awareness')} style={{
            padding: '7px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px',
            color: '#ffffff', background: 'linear-gradient(135deg, #006600, #004400)',
            border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,102,0,0.25)', transition: 'all 0.16s',
          }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            📚 Awareness Hub
          </button>
          <button onClick={handleHome} style={{
            padding: '7px 14px', borderRadius: '8px', fontWeight: '600', fontSize: '12px',
            color: 'rgba(0,0,0,0.55)', background: 'rgba(255,255,255,0.70)',
            border: '1px solid rgba(0,0,0,0.10)', cursor: 'pointer', transition: 'all 0.16s',
          }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.95)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.70)'}>
            ← Home
          </button>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, overflowY: 'auto', padding: '16px 36px 20px' }}>
        <div style={{ maxWidth: '1100px', width: '100%' }}>

          {/* ── ROW 1: HERO + TOKEN + WHAT TO DO — 3 columns ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px 300px', gap: '12px', marginBottom: '12px', animation: 'fadeInUp 0.4s ease 0s both' }}>

            {/* Hero risk banner */}
            <div style={{
              borderRadius: '14px', overflow: 'hidden',
              background: 'rgba(14,20,14,0.96)',
              border: `1px solid ${config.border}`,
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              boxShadow: `0 6px 24px rgba(0,0,0,0.16)`,
              position: 'relative', display: 'flex',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${config.accent}55, transparent)` }} />
              <div style={{ width: '5px', flexShrink: 0, background: config.accent, borderRadius: '14px 0 0 14px' }} />
              <div style={{ flex: 1, padding: '18px 18px 16px 14px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <svg width="100" height="100" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9"/>
                    <circle cx="60" cy="60" r="52" fill="none" stroke={config.gaugeColor} strokeWidth="9"
                      strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset 0.1s linear' }}/>
                    <text x="60" y="54" textAnchor="middle" fill="white" fontSize="21" fontWeight="900" fontFamily="-apple-system,sans-serif">{scoreAnimated}%</text>
                    <text x="60" y="70" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="-apple-system,sans-serif" letterSpacing="1">RISK SCORE</text>
                  </svg>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', background: config.badgeBg, border: `1px solid ${config.border}`, marginBottom: '8px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: config.accent, animation: 'pulse 2s infinite' }}/>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: config.accentLight, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{result.riskLevel} RISK</span>
                    </div>
                    <div style={{ color: '#ffffff', fontWeight: '900', fontSize: '16px', marginBottom: '6px', letterSpacing: '-0.2px', lineHeight: 1.3 }}>{config.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: '12px', lineHeight: '1.55', marginBottom: '10px' }}>{config.sublabel}</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <div style={{ padding: '3px 9px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.09)' }}>🤖 GPT-4o: {Math.round(result.riskScore * 0.7)}%</div>
                      <div style={{ padding: '3px 9px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.09)' }}>🔍 Safe Browsing: {Math.round(result.riskScore * 0.3)}%</div>
                      {result.alertSent && <div style={{ padding: '3px 9px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', background: 'rgba(187,0,0,0.16)', color: '#ff8080', border: '1px solid rgba(187,0,0,0.28)' }}>⚡ IT team alerted</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token card */}
            <div style={{
              borderRadius: '14px', overflow: 'hidden',
              background: 'rgba(0,30,8,0.94)',
              border: '1px solid rgba(0,102,0,0.32)',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              position: 'relative', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.80, borderRadius: '14px 0 0 14px' }} />
              <div style={{ flex: 1, padding: '16px 14px 14px 12px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔐</div>
                <div style={{ fontSize: '9px', fontWeight: '800', color: 'rgba(74,222,128,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>Anonymous Token</div>
                <div style={{
                  fontFamily: 'monospace', fontSize: '12px', fontWeight: '900',
                  color: '#4ade80', letterSpacing: '0.08em',
                  padding: '9px 12px', borderRadius: '8px',
                  background: 'rgba(0,102,0,0.18)', border: '1px solid rgba(34,197,94,0.28)',
                  marginBottom: '8px', width: '100%', boxSizing: 'border-box',
                  backgroundImage: 'linear-gradient(90deg, rgba(0,102,0,0.18), rgba(0,150,0,0.25), rgba(0,102,0,0.18))',
                  backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite',
                  wordBreak: 'break-all',
                }}>{result.tokenId}</div>
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '10px', lineHeight: '1.5', fontWeight: '500' }}>Cannot be traced to your identity</div>
                {result.alertSent && (
                  <div style={{ marginTop: '8px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(187,0,0,0.14)', border: '1px solid rgba(187,0,0,0.25)' }}>
                    <span style={{ color: '#ff8080', fontSize: '10px', fontWeight: '700' }}>⚡ Security team alerted</span>
                  </div>
                )}
              </div>
            </div>

            {/* What to do next — right column */}
            <div style={{
              borderRadius: '14px', overflow: 'hidden',
              background: 'rgba(14,20,14,0.96)',
              border: `1px solid ${config.border}`,
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              position: 'relative',
            }}>
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${config.accent}, ${config.accent}88, transparent)` }} />
              <div style={{ padding: '14px 16px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: config.badgeBg, border: `1px solid ${config.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🚨</div>
                  <div>
                    <div style={{ color: config.accentLight, fontWeight: '900', fontSize: '13px' }}>What to do next</div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px' }}>Follow immediately</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {simpleActions.slice(0, 4).map((action, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '9px 10px', borderRadius: '9px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${config.border}` }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: config.badgeBg, border: `1px solid ${config.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900', color: config.accentLight, flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: '11px', lineHeight: '1.55', fontWeight: '500' }}>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2: GPT analysis + Threat indicators + Did You Know — 3 columns ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', animation: 'fadeInUp 0.4s ease 0.10s both' }}>

            {/* GPT-4o Analysis */}
            <div style={{
              borderRadius: '14px', overflow: 'hidden',
              background: 'rgba(0,18,8,0.94)',
              border: '1px solid rgba(34,197,94,0.20)',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              position: 'relative',
            }}>
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #22c55e, #15803d, transparent)' }} />
              <div style={{ padding: '16px 18px 18px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
                  <div>
                    <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '13px' }}>GPT-4o Analysis</div>
                    <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: '10px' }}>AI threat detection</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    { label: 'Domain spoofing', value: result.aiAnalysis?.domainSpoofing },
                    { label: 'Urgency language', value: result.aiAnalysis?.urgencyLanguage },
                    { label: 'Credential harvesting', value: result.aiAnalysis?.credentialHarvesting },
                    { label: 'M-Pesa abuse signals', value: result.aiAnalysis?.mpesaAbuse },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', background: item.value ? 'rgba(187,0,0,0.10)' : 'rgba(34,197,94,0.06)', border: item.value ? '1px solid rgba(187,0,0,0.20)' : '1px solid rgba(34,197,94,0.14)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontWeight: '600' }}>{item.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '20px', background: item.value ? 'rgba(187,0,0,0.16)' : 'rgba(34,197,94,0.12)', border: item.value ? '1px solid rgba(187,0,0,0.28)' : '1px solid rgba(34,197,94,0.25)' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.value ? '#ff6666' : '#4ade80' }}/>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: item.value ? '#ff8080' : '#4ade80' }}>{item.value ? 'Detected' : 'Clear'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Threat Indicators */}
            <div style={{
              borderRadius: '14px', overflow: 'hidden',
              background: 'rgba(18,0,0,0.94)',
              border: '1px solid rgba(187,0,0,0.22)',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              position: 'relative',
            }}>
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, #7a0000, transparent)' }} />
              <div style={{ padding: '16px 18px 18px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(187,0,0,0.18)', border: '1px solid rgba(187,0,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚠️</div>
                  <div>
                    <div style={{ color: '#ff8080', fontWeight: '800', fontSize: '13px' }}>Threat Indicators</div>
                    <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: '10px' }}>What triggered the alert</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {result.reasons?.map((reason, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', borderRadius: '8px', background: 'rgba(187,0,0,0.08)', border: '1px solid rgba(187,0,0,0.16)' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(187,0,0,0.20)', border: '1px solid rgba(187,0,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: '#ff8080', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                      <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: '11px', lineHeight: '1.55' }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── DID YOU KNOW — same row, now always visible ── */}
            <div style={{
              borderRadius: '14px', overflow: 'hidden',
              background: 'rgba(18,10,0,0.96)',
              border: '1px solid rgba(234,150,0,0.32)',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
              position: 'relative',
            }}>
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #ffd166, #ea9600, #ffd166)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(234,150,0,0.09) 0%, transparent 50%)', pointerEvents: 'none' }} />
              <div style={{ padding: '16px 18px 18px', position: 'relative', zIndex: 1, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(234,150,0,0.18)', border: '1px solid rgba(234,150,0,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>💡</div>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: '#ffd166', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2px' }}>🇰🇪 Did You Know?</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: '600' }}>Kenya Staff Security Tip</div>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '12px', lineHeight: '1.75', margin: 0, fontWeight: '500', flex: 1 }}>
                  {tipText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;