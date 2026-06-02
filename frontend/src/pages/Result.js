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
  const isMobile = window.innerWidth < 640;

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
    HIGH: {
      accent: '#ef4444', accentLight: '#fca5a5', accentDim: '#ff6666',
      border: 'rgba(239,68,68,0.35)', glow: 'rgba(239,68,68,0.20)',
      label: 'High Risk Phishing Detected',
      sublabel: 'This email is dangerous. Delete it immediately — do not click any links or open any attachments.',
      gaugeColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.18)',
      heroBg: 'rgba(50,0,0,0.99)', bodyBg: 'rgba(42,0,0,0.98)',
      severity: ['CRITICAL', 'HIGH THREAT', 'IMMEDIATE ACTION'],
      severityColor: '#ef4444',
    },
    MEDIUM: {
      accent: '#f59e0b', accentLight: '#fcd34d', accentDim: '#fbbf24',
      border: 'rgba(245,158,11,0.35)', glow: 'rgba(245,158,11,0.18)',
      label: 'Medium Risk — Exercise Caution',
      sublabel: 'This email looks suspicious. Do not click any links until you have confirmed the sender is legitimate.',
      gaugeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.18)',
      heroBg: 'rgba(40,18,0,0.99)', bodyBg: 'rgba(32,14,0,0.98)',
      severity: ['MODERATE', 'SUSPICIOUS', 'VERIFY SENDER'],
      severityColor: '#f59e0b',
    },
    LOW: {
      accent: '#22c55e', accentLight: '#4ade80', accentDim: '#4ade80',
      border: 'rgba(34,197,94,0.35)', glow: 'rgba(34,197,94,0.18)',
      label: 'Low Risk — Likely Safe',
      sublabel: 'This email shows weak threat signals and appears legitimate. Stay vigilant and verify if unsure.',
      gaugeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.18)',
      heroBg: 'rgba(0,30,8,0.99)', bodyBg: 'rgba(0,22,6,0.98)',
      severity: ['LOW RISK', 'LIKELY SAFE', 'STAY ALERT'],
      severityColor: '#22c55e',
    },
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);
  const handleHome = () => { clearReport(); navigate('/'); };

  const employeeTips = [
    "M-Pesa will NEVER contact you by email asking for your PIN or account details. Any such email is a scam — delete it immediately.",
    "Equity Bank, KCB and Co-op Bank will never email you asking to verify your account by clicking a link. Call your branch directly if unsure.",
    "The Central Bank of Kenya does not send emails requesting personal or financial information. Any such email is fraudulent.",
    "KRA iTax emails only come from @kra.go.ke. Any email from a different domain claiming to be KRA is a phishing attempt.",
    "Over 70% of cyber incidents in Kenyan financial institutions begin with a phishing email sent to a staff member.",
    "Never use contact details found inside a suspicious email to verify its legitimacy. Always use the official number from your institution's directory.",
  ];

  const tipText = result.didYouKnow
    ? `${result.didYouKnow} Always verify unexpected requests through official channels before taking any action.`
    : employeeTips[Math.floor(Math.random() * employeeTips.length)];

  const simpleActions = result.recommendedActions?.map(a => {
    const l = a.toLowerCase();
    if (l.includes('delete') || l.includes('remove')) return { text: 'Delete this email from your inbox right now.', icon: '🗑️' };
    if (l.includes('report') || l.includes('forward')) return { text: 'Your anonymous report has been filed with your IT team.', icon: '📤' };
    if (l.includes('link') || l.includes('click')) return { text: 'Do not click any links in this email.', icon: '🚫' };
    if (l.includes('credential') || l.includes('password')) return { text: 'Change your work password immediately.', icon: '🔑' };
    if (l.includes('attachment') || l.includes('file')) return { text: 'Do not open any attachments from this email.', icon: '📎' };
    if (l.includes('verify') || l.includes('confirm')) return { text: 'Call the sender on the official number only.', icon: '📞' };
    return { text: a, icon: '⚡' };
  }) || [
    { text: 'Delete this email from your inbox immediately.', icon: '🗑️' },
    { text: 'Do not click any links or open any attachments.', icon: '🚫' },
    { text: 'Your anonymous report has been filed with your IT team.', icon: '📤' },
    { text: 'If you clicked anything, change your passwords now.', icon: '🔑' },
  ];

  const analysisItems = [
    { label: 'Domain spoofing', value: result.aiAnalysis?.domainSpoofing },
    { label: 'Urgency language', value: result.aiAnalysis?.urgencyLanguage },
    { label: 'Credential harvesting', value: result.aiAnalysis?.credentialHarvesting },
    { label: 'M-Pesa abuse signals', value: result.aiAnalysis?.mpesaAbuse },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: isMobile ? 'auto' : 'hidden', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.55}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
      `}</style>

      {/* BG */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-60" cy="120" r="240" fill="none" stroke="rgba(0,100,30,0.035)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="220" fill="none" stroke="rgba(140,0,0,0.035)" strokeWidth="1"/>
      </svg>

      {/* NAVBAR */}
      <nav style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', height: '56px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.04)', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(145deg, #cc0000, #7a0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: '800', letterSpacing: '-0.3px' }}><span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span></span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {!isMobile && (
            <button onClick={() => navigate('/awareness')} style={{ padding: '5px 12px', borderRadius: '7px', fontWeight: '700', fontSize: '11px', color: '#fff', background: 'linear-gradient(135deg, #006600, #004400)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>📚 Awareness Hub</button>
          )}
          <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{ padding: '5px 12px', borderRadius: '7px', fontWeight: '700', fontSize: '11px', color: '#fff', background: 'linear-gradient(135deg, #BB0000, #880000)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {isMobile ? '+ Report' : '📧 Report Another'}
          </button>
          <button onClick={handleHome} style={{ padding: '5px 10px', borderRadius: '7px', fontWeight: '600', fontSize: '11px', color: 'rgba(0,0,0,0.55)', background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)', cursor: 'pointer' }}>← Home</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 10,
        padding: isMobile ? '12px 14px 20px' : '10px 22px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflowY: isMobile ? 'visible' : 'hidden',
      }}>

        {/* ── HERO: RISK RESULT CARD ── */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', background: config.heroBg, border: `1.5px solid ${config.border}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: `0 8px 40px rgba(0,0,0,0.24)`, position: 'relative', flexShrink: 0, animation: 'scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>
          <div style={{ height: '4px', background: `linear-gradient(90deg, ${config.accent}, ${config.accentLight}, ${config.accent})`, backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)', pointerEvents: 'none' }}/>

          <div style={{ padding: isMobile ? '16px 16px 14px' : '20px 28px 18px', position: 'relative', zIndex: 1 }}>

            {/* ── MOBILE: stacked layout ── */}
            {isMobile ? (
              <>
                {/* Risk badge + token */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', background: config.badgeBg, border: `1px solid ${config.border}` }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.accent, animation: 'pulse 2s infinite' }}/>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: config.accentLight, letterSpacing: '0.10em', textTransform: 'uppercase' }}>{result.riskLevel} RISK</span>
                  </div>
                  {result.alertSent && <div style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', background: 'rgba(239,68,68,0.18)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.30)', whiteSpace: 'nowrap' }}>⚡ IT team alerted</div>}
                </div>

                {/* Gauge + verdict side by side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                  <div style={{ flexShrink: 0 }}>
                    <svg width="90" height="90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke={`${config.gaugeColor}14`} strokeWidth="10"/>
                      <circle cx="60" cy="60" r="52" fill="none" stroke={config.gaugeColor} strokeWidth="9"
                        strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset 0.1s linear', filter: `drop-shadow(0 0 8px ${config.gaugeColor}50)` }}/>
                      <text x="60" y="55" textAnchor="middle" fill="white" fontSize="24" fontWeight="900" fontFamily="-apple-system,sans-serif">{scoreAnimated}%</text>
                      <text x="60" y="70" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontSize="8" fontFamily="-apple-system,sans-serif" letterSpacing="1.5">RISK</text>
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ color: '#ffffff', fontWeight: '900', fontSize: '16px', margin: '0 0 6px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>{config.label}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>{config.sublabel}</p>
                  </div>
                </div>

                {/* Quick stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { label: 'Threats', value: `${result.reasons?.length || 0}`, danger: (result.reasons?.length || 0) > 0 },
                    { label: 'AI detections', value: `${analysisItems.filter(i => i.value).length}/4`, danger: analysisItems.filter(i => i.value).length > 0 },
                    { label: 'Filed', value: '✓ Anon', danger: false },
                  ].map((f, i) => (
                    <div key={i} style={{ padding: '8px 10px', borderRadius: '9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px', fontWeight: '600', marginBottom: '3px' }}>{f.label}</div>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: f.danger ? '#fca5a5' : '#4ade80' }}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* ── DESKTOP: original horizontal layout ── */
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                <div style={{ flexShrink: 0 }}>
                  <svg width="130" height="130" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke={`${config.gaugeColor}14`} strokeWidth="10"/>
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9"/>
                    <circle cx="60" cy="60" r="52" fill="none" stroke={config.gaugeColor} strokeWidth="9"
                      strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset 0.1s linear', filter: `drop-shadow(0 0 10px ${config.gaugeColor}50)` }}/>
                    <text x="60" y="55" textAnchor="middle" fill="white" fontSize="24" fontWeight="900" fontFamily="-apple-system,sans-serif">{scoreAnimated}%</text>
                    <text x="60" y="70" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontSize="8" fontFamily="-apple-system,sans-serif" letterSpacing="1.5">RISK SCORE</text>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 13px', borderRadius: '20px', background: config.badgeBg, border: `1px solid ${config.border}` }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.accent, animation: 'pulse 2s infinite' }}/>
                      <span style={{ fontSize: '11px', fontWeight: '900', color: config.accentLight, letterSpacing: '0.10em', textTransform: 'uppercase' }}>{result.riskLevel} RISK</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', fontWeight: '600', fontFamily: 'monospace' }}>REF: {result.tokenId?.slice(0, 16)}</div>
                  </div>
                  <h2 style={{ color: '#ffffff', fontWeight: '900', fontSize: '22px', margin: '0 0 7px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>{config.label}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: '13px', lineHeight: '1.65', margin: '0 0 14px', maxWidth: '480px' }}>{config.sublabel}</p>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Severity:</span>
                    {config.severity.map((s, i) => (
                      <div key={i} style={{ padding: '3px 9px', borderRadius: '5px', fontSize: '9px', fontWeight: '800', background: i === 0 ? config.badgeBg : 'rgba(255,255,255,0.05)', color: i === 0 ? config.accentLight : 'rgba(255,255,255,0.28)', border: i === 0 ? `1px solid ${config.border}` : '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s}</div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                    <div style={{ padding: '4px 11px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.42)', border: '1px solid rgba(255,255,255,0.09)' }}>🤖 GPT-4o {Math.round(result.riskScore * 0.7)}%</div>
                    <div style={{ padding: '4px 11px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.42)', border: '1px solid rgba(255,255,255,0.09)' }}>🔍 Safe Browsing {Math.round(result.riskScore * 0.3)}%</div>
                    {result.alertSent && <div style={{ padding: '4px 11px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', background: 'rgba(239,68,68,0.18)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.30)' }}>⚡ IT security team alerted</div>}
                  </div>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', gap: '14px', alignItems: 'stretch' }}>
                  <div style={{ width: '1px', background: `linear-gradient(180deg, transparent, ${config.border}, transparent)` }}/>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
                    {[
                      { label: 'Threats found', value: `${result.reasons?.length || 0}`, danger: (result.reasons?.length || 0) > 0 },
                      { label: 'AI detections', value: `${analysisItems.filter(i => i.value).length}/4`, danger: analysisItems.filter(i => i.value).length > 0 },
                      { label: 'Report filed', value: '✓ Anonymous', danger: false },
                    ].map((f, i) => (
                      <div key={i} style={{ padding: '9px 13px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontWeight: '600' }}>{f.label}</span>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: f.danger ? '#fca5a5' : '#4ade80' }}>{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── PANELS: single column on mobile, 2 cols on desktop ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '10px',
          flex: isMobile ? 'none' : 1,
          animation: 'fadeUp 0.35s ease 0.08s both',
        }}>

          {/* WHAT TO DO NEXT */}
          <div style={{ borderRadius: '14px', overflow: 'hidden', background: config.bodyBg, border: `1px solid ${config.border}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: `0 4px 20px rgba(0,0,0,0.16)`, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '3px', background: `linear-gradient(90deg, ${config.accent}, ${config.accentDim}, transparent)` }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: `linear-gradient(180deg, ${config.accent}, ${config.accent}88)`, opacity: 0.70, borderRadius: '14px 0 0 14px' }}/>
            <div style={{ padding: '14px 15px 14px 13px', position: 'relative', zIndex: 1, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '11px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: config.badgeBg, border: `1px solid ${config.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🚨</div>
                <div>
                  <div style={{ color: config.accentLight, fontWeight: '900', fontSize: '13px' }}>What to do next</div>
                  <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px' }}>Follow these steps immediately</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {simpleActions.slice(0, 4).map((action, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px', borderRadius: '9px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${config.border}` }}>
                    <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{action.icon}</span>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: config.badgeBg, border: `1px solid ${config.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: '900', color: config.accentLight, flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                      <span style={{ color: 'rgba(255,255,255,0.80)', fontSize: '12px', lineHeight: '1.5', fontWeight: '500' }}>{action.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GPT-4o ANALYSIS */}
          <div style={{ borderRadius: '14px', overflow: 'hidden', background: 'rgba(0,16,5,0.99)', border: '1px solid rgba(34,197,94,0.22)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.16)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #22c55e, #16a34a, transparent)' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 55%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.65, borderRadius: '14px 0 0 14px' }}/>
            <div style={{ padding: '14px 15px 14px 13px', position: 'relative', zIndex: 1, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '11px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.26)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🤖</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '13px' }}>GPT-4o Analysis</div>
                  <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px' }}>AI threat detection results</div>
                </div>
                <div style={{ padding: '3px 9px', borderRadius: '20px', background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.22)', fontSize: '10px', fontWeight: '700', color: '#4ade80', flexShrink: 0 }}>
                  {analysisItems.filter(i => !i.value).length}/{analysisItems.length} Clear
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {analysisItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 13px', borderRadius: '9px', background: item.value ? 'rgba(239,68,68,0.11)' : 'rgba(34,197,94,0.07)', border: item.value ? '1px solid rgba(239,68,68,0.20)' : '1px solid rgba(34,197,94,0.14)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: item.value ? '#ef4444' : '#22c55e', opacity: 0.55 }}/>
                    <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: '12px', fontWeight: '600', paddingLeft: '6px' }}>{item.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '6px', background: item.value ? 'rgba(239,68,68,0.20)' : 'rgba(34,197,94,0.16)', border: item.value ? '1px solid rgba(239,68,68,0.32)' : '1px solid rgba(34,197,94,0.28)', flexShrink: 0 }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.value ? '#ef4444' : '#22c55e' }}/>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: item.value ? '#fca5a5' : '#4ade80' }}>{item.value ? 'Detected' : 'Clear'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THREAT INDICATORS */}
          <div style={{ borderRadius: '14px', overflow: 'hidden', background: 'rgba(38,0,0,0.99)', border: '1px solid rgba(239,68,68,0.22)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.16)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #ef4444, #BB0000, transparent)' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, transparent 55%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #ef4444, #BB0000)', opacity: 0.65, borderRadius: '14px 0 0 14px' }}/>
            <div style={{ padding: '14px 15px 14px 13px', position: 'relative', zIndex: 1, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '11px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(239,68,68,0.16)', border: '1px solid rgba(239,68,68,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>⚠️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fca5a5', fontWeight: '800', fontSize: '13px' }}>Threat Indicators</div>
                  <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px' }}>What triggered the alert</div>
                </div>
                <div style={{ padding: '3px 9px', borderRadius: '20px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.22)', fontSize: '10px', fontWeight: '700', color: '#fca5a5', flexShrink: 0 }}>
                  {result.reasons?.length || 0} found
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {result.reasons?.map((reason, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px', borderRadius: '9px', background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.17)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: '#ef4444', opacity: 0.50 }}/>
                    <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: 'rgba(239,68,68,0.22)', border: '1px solid rgba(239,68,68,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: '#fca5a5', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: '12px', lineHeight: '1.55', fontWeight: '500' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DID YOU KNOW */}
          <div style={{ borderRadius: '14px', overflow: 'hidden', background: 'rgba(14,8,0,0.99)', border: '1.5px solid rgba(234,150,0,0.32)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.16)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #ffd166, #ea9600, #ffd166)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(234,150,0,0.08) 0%, transparent 55%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #ffd166, #ea9600)', opacity: 0.70, borderRadius: '14px 0 0 14px' }}/>
            <div style={{ padding: '14px 15px 16px 13px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(234,150,0,0.20)', border: '1px solid rgba(234,150,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>💡</div>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: '900', color: '#ffd166', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '2px' }}>🇰🇪 Did You Know?</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,210,100,0.50)', fontWeight: '600' }}>Kenya Staff Security Tip</div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: '1.75', margin: 0, fontWeight: '400', flex: 1 }}>{tipText}</p>
            </div>
          </div>
        </div>

        {/* ── TOKEN BAR ── */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', background: 'rgba(0,16,5,0.99)', border: '1px solid rgba(34,197,94,0.20)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', flexShrink: 0, animation: 'fadeUp 0.35s ease 0.20s both' }}>
          <div style={{ padding: isMobile ? '12px 14px' : '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🔐</div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontSize: '8px', fontWeight: '800', color: 'rgba(74,222,128,0.40)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2px' }}>Anonymous Report Token</div>
              <div style={{ fontFamily: 'monospace', fontSize: isMobile ? '11px' : '12px', fontWeight: '900', color: '#4ade80', letterSpacing: '0.08em', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0,102,0,0.22)', border: '1px solid rgba(34,197,94,0.28)' }}>
                {result.tokenId}
              </div>
            </div>
            {!isMobile && <>
              <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }}/>
              <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '10px', fontWeight: '500' }}>Cannot be traced to your identity</span>
            </>}
            {result.alertSent && <div style={{ padding: '3px 9px', borderRadius: '5px', background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.24)' }}><span style={{ color: '#fca5a5', fontSize: '9px', fontWeight: '700' }}>⚡ Security team alerted</span></div>}
            {!isMobile && <div style={{ flex: 1 }}/>}
            {!isMobile && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)', fontWeight: '500' }}>Report filed anonymously · PhishRipoti v1.0 · 🇰🇪</div>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Result;