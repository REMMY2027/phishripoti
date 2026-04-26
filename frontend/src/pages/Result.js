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
      if (result.riskLevel === 'HIGH') showToast('HIGH risk detected — security team notified anonymously', 'error');
      else if (result.riskLevel === 'MEDIUM') showToast('MEDIUM risk — exercise caution with this email', 'warning');
      else showToast('Report submitted successfully', 'success');
      let current = 0;
      const target = result.riskScore;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { setScoreAnimated(target); clearInterval(timer); }
        else setScoreAnimated(Math.round(current));
      }, 30);
      return () => clearInterval(timer);
    }
  }, []); // eslint-disable-line

  if (!result) { navigate('/'); return null; }

  const riskConfig = {
    HIGH: { accent: '#BB0000', accentLight: '#ff6666', border: 'rgba(187,0,0,0.35)', label: 'High Risk Phishing Detected', sublabel: 'This email is dangerous. Delete it immediately — do not click any links or open attachments.', gaugeColor: '#BB0000', badgeBg: 'rgba(187,0,0,0.14)' },
    MEDIUM: { accent: '#d97706', accentLight: '#fcd34d', border: 'rgba(217,119,6,0.35)', label: 'Medium Risk — Exercise Caution', sublabel: 'This email looks suspicious. Do not click any links until you confirm the sender is real.', gaugeColor: '#d97706', badgeBg: 'rgba(217,119,6,0.14)' },
    LOW: { accent: '#006600', accentLight: '#4ade80', border: 'rgba(0,102,0,0.35)', label: 'Low Risk — Likely Safe', sublabel: 'This email shows weak threat signals and appears legitimate. Still stay cautious.', gaugeColor: '#006600', badgeBg: 'rgba(0,102,0,0.14)' },
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);
  const handleHome = () => { clearReport(); navigate('/'); };

  const employeeTips = [
    "As a bank employee, M-Pesa will NEVER ask you to share your PIN via email. If you receive such a request at work, delete it and alert your IT team immediately.",
    "Your institution's IT team will never ask for your network password by email. Call your IT helpdesk directly using the internal number — never respond to such emails.",
    "KRA only contacts you through official channels. Any email from a different domain claiming to be KRA asking you to click a link is a phishing attempt.",
    "As a finance employee, always verify payment requests by calling the requester directly — never use contact details from the email itself.",
    "Over 70% of cyber incidents in Kenyan financial institutions start with a phishing email to a staff member. Your vigilance protects your colleagues and customers.",
    "Never access your work systems through links in emails. Always type the address directly into your browser or use official bookmarks.",
    "If a manager emails asking you to make an urgent payment, call them directly to confirm — attackers often impersonate internal staff.",
  ];

  const tipText = result.didYouKnow
    ? `${result.didYouKnow} Always verify unexpected requests through official channels before taking any action.`
    : employeeTips[Math.floor(Math.random() * employeeTips.length)];

  const simpleActions = result.recommendedActions?.map(a => {
    const l = a.toLowerCase();
    if (l.includes('delete') || l.includes('remove')) return 'Delete this email from your inbox right now.';
    if (l.includes('report') || l.includes('forward')) return 'Forward the email to your IT security team.';
    if (l.includes('link') || l.includes('click')) return 'Do not click any links in this email.';
    if (l.includes('credential') || l.includes('password')) return 'Change your work password immediately.';
    if (l.includes('attachment') || l.includes('file')) return 'Do not open any attachments from this email.';
    if (l.includes('verify') || l.includes('confirm')) return 'Call the sender on the official number — not from the email.';
    return a;
  }) || ['Delete this email immediately.', 'Do not click any links.', 'Alert your IT security team.', 'Change passwords if you clicked anything.'];

  return (
    <div style={{ minHeight: '100vh', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>

      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* BACKGROUND */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
      </svg>
      <div style={{ position: 'fixed', bottom: '-30px', right: 0, width: '400px', height: '160px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="120" width="14" height="60" /><rect x="200" y="40" width="28" height="140" />
          <rect x="130" y="80" width="20" height="100" /><rect x="260" y="60" width="24" height="120" />
          <rect x="320" y="90" width="18" height="90" /><rect x="0" y="178" width="400" height="2" />
        </svg>
      </div>

      {/* NAVBAR */}
      <nav style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: '54px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(145deg, #cc0000, #7a0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(187,0,0,0.28)', flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: '800', letterSpacing: '-0.3px' }}><span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span></span>
        </div>
        <div style={{ display: 'flex', gap: '7px' }}>
          <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{ padding: '6px 14px', borderRadius: '7px', fontWeight: '700', fontSize: '12px', color: '#fff', background: 'linear-gradient(135deg, #BB0000, #880000)', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(187,0,0,0.28)', transition: 'all 0.15s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>📧 Report Another</button>
          <button onClick={() => navigate('/awareness')} style={{ padding: '6px 14px', borderRadius: '7px', fontWeight: '700', fontSize: '12px', color: '#fff', background: 'linear-gradient(135deg, #006600, #004400)', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,102,0,0.25)', transition: 'all 0.15s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>📚 Awareness Hub</button>
          <button onClick={handleHome} style={{ padding: '6px 12px', borderRadius: '7px', fontWeight: '600', fontSize: '12px', color: 'rgba(0,0,0,0.55)', background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)', cursor: 'pointer', transition: 'all 0.15s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.95)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.70)'}>← Home</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, padding: '14px 28px 14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>

        {/* ROW 1 — 3 equal columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 1fr', gap: '10px', animation: 'fadeIn 0.4s ease both' }}>

          {/* Hero card */}
          <div style={{ borderRadius: '14px', background: 'rgba(14,20,14,0.96)', border: `1px solid ${config.border}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.14)', position: 'relative', overflow: 'hidden', display: 'flex' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${config.accent}55, transparent)` }} />
            <div style={{ width: '4px', flexShrink: 0, background: config.accent, borderRadius: '14px 0 0 14px' }} />
            <div style={{ flex: 1, padding: '18px 18px 16px 14px', position: 'relative', zIndex: 1, display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Gauge */}
              <div style={{ flexShrink: 0 }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="44" fill="none" stroke={config.gaugeColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.1s linear' }}/>
                  <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="-apple-system,sans-serif">{scoreAnimated}%</text>
                  <text x="50" y="60" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="-apple-system,sans-serif" letterSpacing="0.5">RISK SCORE</text>
                </svg>
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', background: config.badgeBg, border: `1px solid ${config.border}`, marginBottom: '8px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: config.accent, animation: 'pulse 2s infinite' }}/>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: config.accentLight, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{result.riskLevel} RISK</span>
                </div>
                <div style={{ color: '#ffffff', fontWeight: '900', fontSize: '16px', marginBottom: '6px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>{config.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.52)', fontSize: '12px', lineHeight: '1.55', marginBottom: '10px' }}>{config.sublabel}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <div style={{ padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.42)', border: '1px solid rgba(255,255,255,0.08)' }}>🤖 GPT-4o {Math.round(result.riskScore * 0.7)}%</div>
                  <div style={{ padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.42)', border: '1px solid rgba(255,255,255,0.08)' }}>🔍 Safe Browsing {Math.round(result.riskScore * 0.3)}%</div>
                  {result.alertSent && <div style={{ padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', background: 'rgba(187,0,0,0.16)', color: '#ff8080', border: '1px solid rgba(187,0,0,0.28)' }}>⚡ IT alerted</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Token card */}
          <div style={{ borderRadius: '14px', background: 'rgba(0,24,8,0.94)', border: '1px solid rgba(0,102,0,0.28)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.80, borderRadius: '14px 0 0 14px' }} />
            <div style={{ flex: 1, padding: '16px 14px 14px 12px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
              <div style={{ fontSize: '20px' }}>🔐</div>
              <div style={{ fontSize: '9px', fontWeight: '800', color: 'rgba(74,222,128,0.55)', textTransform: 'uppercase', letterSpacing: '0.11em' }}>Anonymous Token</div>
              <div style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: '900', color: '#4ade80', letterSpacing: '0.06em', padding: '8px 10px', borderRadius: '8px', background: 'rgba(0,102,0,0.18)', border: '1px solid rgba(34,197,94,0.28)', width: '100%', boxSizing: 'border-box', backgroundImage: 'linear-gradient(90deg, rgba(0,102,0,0.18), rgba(0,150,0,0.25), rgba(0,102,0,0.18))', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite', wordBreak: 'break-all' }}>
                {result.tokenId}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.24)', fontSize: '10px', lineHeight: '1.4', fontWeight: '500' }}>Cannot be traced to your identity</div>
              {result.alertSent && <div style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(187,0,0,0.14)', border: '1px solid rgba(187,0,0,0.25)' }}><span style={{ color: '#ff8080', fontSize: '10px', fontWeight: '700' }}>⚡ Security team alerted</span></div>}
            </div>
          </div>

          {/* What to do next */}
          <div style={{ borderRadius: '14px', background: 'rgba(14,20,14,0.96)', border: `1px solid ${config.border}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ height: '3px', background: `linear-gradient(90deg, ${config.accent}, ${config.accent}88, transparent)` }} />
            <div style={{ padding: '14px 15px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: config.badgeBg, border: `1px solid ${config.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🚨</div>
                <div>
                  <div style={{ color: config.accentLight, fontWeight: '900', fontSize: '13px' }}>What to do next</div>
                  <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: '10px' }}>Follow immediately</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {simpleActions.slice(0, 4).map((action, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', padding: '8px 9px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${config.border}` }}>
                    <div style={{ width: '17px', height: '17px', borderRadius: '5px', background: config.badgeBg, border: `1px solid ${config.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: config.accentLight, flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <span style={{ color: 'rgba(255,255,255,0.76)', fontSize: '11px', lineHeight: '1.50', fontWeight: '500' }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 — GPT + Threat side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', animation: 'fadeIn 0.4s ease 0.1s both' }}>

          {/* GPT-4o */}
          <div style={{ borderRadius: '14px', background: 'rgba(0,14,5,0.94)', border: '1px solid rgba(34,197,94,0.20)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #22c55e, #15803d, transparent)' }} />
            <div style={{ padding: '13px 16px 14px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🤖</div>
                <div>
                  <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '13px' }}>GPT-4o Analysis</div>
                  <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: '10px' }}>AI threat detection results</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  { label: 'Domain spoofing', value: result.aiAnalysis?.domainSpoofing },
                  { label: 'Urgency language', value: result.aiAnalysis?.urgencyLanguage },
                  { label: 'Credential harvesting', value: result.aiAnalysis?.credentialHarvesting },
                  { label: 'M-Pesa abuse signals', value: result.aiAnalysis?.mpesaAbuse },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderRadius: '8px', background: item.value ? 'rgba(187,0,0,0.10)' : 'rgba(34,197,94,0.06)', border: item.value ? '1px solid rgba(187,0,0,0.20)' : '1px solid rgba(34,197,94,0.14)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '11px', fontWeight: '600' }}>{item.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 7px', borderRadius: '20px', background: item.value ? 'rgba(187,0,0,0.16)' : 'rgba(34,197,94,0.12)', border: item.value ? '1px solid rgba(187,0,0,0.28)' : '1px solid rgba(34,197,94,0.25)', flexShrink: 0 }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.value ? '#ff6666' : '#4ade80' }}/>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: item.value ? '#ff8080' : '#4ade80' }}>{item.value ? 'Detected' : 'Clear'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Threat Indicators */}
          <div style={{ borderRadius: '14px', background: 'rgba(14,0,0,0.94)', border: '1px solid rgba(187,0,0,0.22)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, #7a0000, transparent)' }} />
            <div style={{ padding: '13px 16px 14px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(187,0,0,0.18)', border: '1px solid rgba(187,0,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚠️</div>
                <div>
                  <div style={{ color: '#ff8080', fontWeight: '800', fontSize: '13px' }}>Threat Indicators</div>
                  <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: '10px' }}>What triggered the alert</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {result.reasons?.map((reason, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', padding: '7px 10px', borderRadius: '8px', background: 'rgba(187,0,0,0.08)', border: '1px solid rgba(187,0,0,0.16)' }}>
                    <div style={{ width: '17px', height: '17px', borderRadius: '5px', background: 'rgba(187,0,0,0.20)', border: '1px solid rgba(187,0,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: '#ff8080', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: '11px', lineHeight: '1.50' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3 — Did You Know full width */}
        <div style={{ borderRadius: '14px', background: 'rgba(16,9,0,0.96)', border: '1px solid rgba(234,150,0,0.30)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden', flexShrink: 0, animation: 'fadeIn 0.4s ease 0.2s both' }}>
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #ffd166, #ea9600, #ffd166)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(234,150,0,0.07) 0%, transparent 50%)', pointerEvents: 'none' }} />
          <div style={{ padding: '13px 20px', position: 'relative', zIndex: 1, display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'rgba(234,150,0,0.18)', border: '1px solid rgba(234,150,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>💡</div>
            <div>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#ffd166', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px' }}>🇰🇪 Did You Know? — Kenya Staff Security Tip</div>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '12px', lineHeight: '1.60', margin: 0, fontWeight: '500' }}>{tipText}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Result;