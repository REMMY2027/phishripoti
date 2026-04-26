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
        if (current >= target) {
          setScoreAnimated(target);
          clearInterval(timer);
        } else {
          setScoreAnimated(Math.round(current));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, []); // eslint-disable-line

  if (!result) { navigate('/'); return null; }

  const riskConfig = {
    HIGH: {
      accent: '#BB0000', accentLight: '#ff6666',
      border: 'rgba(187,0,0,0.30)', glow: 'rgba(187,0,0,0.15)',
      label: 'High Risk Phishing Detected',
      sublabel: 'Do NOT click any links or open any attachments. Delete this email immediately.',
      gaugeColor: '#BB0000', badgeBg: 'rgba(187,0,0,0.12)',
      heroBg: 'rgba(187,0,0,0.06)',
    },
    MEDIUM: {
      accent: '#d97706', accentLight: '#fcd34d',
      border: 'rgba(217,119,6,0.30)', glow: 'rgba(217,119,6,0.15)',
      label: 'Medium Risk — Exercise Caution',
      sublabel: 'Do not click any links until you have verified the sender through official channels.',
      gaugeColor: '#d97706', badgeBg: 'rgba(217,119,6,0.12)',
      heroBg: 'rgba(217,119,6,0.06)',
    },
    LOW: {
      accent: '#006600', accentLight: '#4ade80',
      border: 'rgba(0,102,0,0.30)', glow: 'rgba(0,102,0,0.15)',
      label: 'Low Risk — Likely Safe',
      sublabel: 'Both analysis layers returned weak signals. The email appears legitimate.',
      gaugeColor: '#006600', badgeBg: 'rgba(0,102,0,0.12)',
      heroBg: 'rgba(0,102,0,0.06)',
    },
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);
  const handleHome = () => { clearReport(); navigate('/'); };

  // Shared dark glass card style
  const glassCard = {
    borderRadius: '16px', padding: '0',
    background: 'rgba(18,26,18,0.92)',
    border: '1px solid rgba(255,255,255,0.09)',
    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
    position: 'relative', overflow: 'hidden',
  };

  const CardHeader = ({ icon, label, accentColor }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <div style={{ width: '3px', height: '14px', borderRadius: '2px', background: accentColor || '#BB0000' }} />
      <span style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
        {icon} {label}
      </span>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── BACKGROUND — identical to all steps ── */}
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
        <button onClick={handleHome} style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 18px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)',
          color: '#333333', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.16s ease',
        }}
          onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.70)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          ← Home
        </button>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, overflowY: 'auto', padding: '28px 44px 32px' }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>

          {/* ── HERO RISK BANNER — dark glass ── */}
          <div style={{
            ...glassCard,
            display: 'flex', marginBottom: '20px',
            border: `1px solid ${config.border}`,
            animation: 'fadeInUp 0.4s ease 0s both',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${config.accent}44, transparent)` }} />
            <div style={{ width: '5px', flexShrink: 0, background: config.accent, opacity: 0.85, borderRadius: '16px 0 0 16px' }} />

            <div style={{ flex: 1, padding: '28px 28px 24px 22px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>

                {/* Circular gauge */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <svg width="130" height="130" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
                    <circle cx="60" cy="60" r="52" fill="none" stroke={config.gaugeColor} strokeWidth="8"
                      strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset 0.1s linear' }}/>
                    <circle cx="60" cy="60" r="44" fill="none" stroke={config.gaugeColor} strokeWidth="1" opacity="0.18"/>
                    <text x="60" y="55" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="-apple-system, sans-serif">{scoreAnimated}%</text>
                    <text x="60" y="72" textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="10" fontFamily="-apple-system, sans-serif">RISK SCORE</text>
                  </svg>
                </div>

                {/* Risk info */}
                <div style={{ flex: 1 }}>
                  {/* Risk badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '5px 14px', borderRadius: '20px',
                    background: config.badgeBg, border: `1px solid ${config.border}`,
                    marginBottom: '12px',
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.accent }}/>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: config.accentLight, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                      {result.riskLevel} RISK
                    </span>
                  </div>

                  <h2 style={{ color: '#ffffff', fontWeight: '900', fontSize: '22px', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                    {config.label}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '14px', margin: '0 0 18px', lineHeight: '1.6', maxWidth: '480px' }}>
                    {config.sublabel}
                  </p>

                  {/* Score breakdown pills */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                      { label: `🤖 GPT-4o: ${Math.round(result.riskScore * 0.7)}% weight` },
                      { label: `🔍 Safe Browsing: ${Math.round(result.riskScore * 0.3)}% weight` },
                    ].map((p, i) => (
                      <div key={i} style={{
                        padding: '5px 12px', borderRadius: '20px', fontSize: '12px',
                        fontWeight: '600', background: 'rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.10)',
                      }}>{p.label}</div>
                    ))}
                    {result.alertSent && (
                      <div style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: 'rgba(187,0,0,0.14)', color: '#ff8080', border: '1px solid rgba(187,0,0,0.28)' }}>
                        ⚡ Alert sent to security team
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2-COLUMN GRID ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>

            {/* What to do next */}
            <div style={{ ...glassCard, display: 'flex', animation: 'fadeInUp 0.4s ease 0.10s both' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
              <div style={{ width: '5px', flexShrink: 0, background: config.accent, opacity: 0.75, borderRadius: '16px 0 0 16px' }} />
              <div style={{ flex: 1, padding: '20px 18px 18px 14px', position: 'relative', zIndex: 1 }}>
                <CardHeader icon="🚨" label="What to do next" accentColor={config.accent} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {result.recommendedActions?.map((action, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '7px',
                        background: config.badgeBg, border: `1px solid ${config.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: '900', color: config.accentLight,
                        flexShrink: 0, marginTop: '1px',
                      }}>{i + 1}</div>
                      <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '13px', lineHeight: '1.65' }}>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* GPT-4o Analysis */}
            <div style={{ ...glassCard, display: 'flex', animation: 'fadeInUp 0.4s ease 0.15s both' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
              <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.65, borderRadius: '16px 0 0 16px' }} />
              <div style={{ flex: 1, padding: '20px 18px 18px 14px', position: 'relative', zIndex: 1 }}>
                <CardHeader icon="🤖" label="GPT-4o Analysis" accentColor="#22c55e" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'Domain spoofing',       value: result.aiAnalysis?.domainSpoofing },
                    { label: 'Urgency language',      value: result.aiAnalysis?.urgencyLanguage },
                    { label: 'Credential harvesting', value: result.aiAnalysis?.credentialHarvesting },
                    { label: 'M-Pesa abuse signals',  value: result.aiAnalysis?.mpesaAbuse },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '9px 12px', borderRadius: '9px',
                      background: item.value ? 'rgba(187,0,0,0.10)' : 'rgba(0,102,0,0.08)',
                      border: item.value ? '1px solid rgba(187,0,0,0.20)' : '1px solid rgba(0,102,0,0.18)',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: '12px', fontWeight: '600' }}>{item.label}</span>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '3px 9px', borderRadius: '20px',
                        background: item.value ? 'rgba(187,0,0,0.16)' : 'rgba(0,102,0,0.16)',
                        border: item.value ? '1px solid rgba(187,0,0,0.30)' : '1px solid rgba(0,102,0,0.30)',
                      }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.value ? '#ff6666' : '#4ade80' }}/>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: item.value ? '#ff8080' : '#4ade80' }}>
                          {item.value ? 'Detected' : 'Clear'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Threat indicators */}
            <div style={{ ...glassCard, display: 'flex', animation: 'fadeInUp 0.4s ease 0.20s both' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
              <div style={{ width: '5px', flexShrink: 0, background: '#BB0000', opacity: 0.70, borderRadius: '16px 0 0 16px' }} />
              <div style={{ flex: 1, padding: '20px 18px 18px 14px', position: 'relative', zIndex: 1 }}>
                <CardHeader icon="⚠️" label="Threat Indicators" accentColor="#BB0000" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {result.reasons?.map((reason, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: '9px 12px', borderRadius: '9px',
                      background: 'rgba(187,0,0,0.08)', border: '1px solid rgba(187,0,0,0.16)',
                    }}>
                      <span style={{ color: '#ff8080', fontSize: '11px', marginTop: '2px', flexShrink: 0, fontWeight: '800' }}>▸</span>
                      <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '12px', lineHeight: '1.6' }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Did You Know */}
            <div style={{ ...glassCard, display: 'flex', animation: 'fadeInUp 0.4s ease 0.25s both', border: '1px solid rgba(234,150,0,0.28)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(234,150,0,0.30), transparent)' }} />
              <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #ffd166, #ea9600)', opacity: 0.80, borderRadius: '16px 0 0 16px' }} />
              <div style={{ flex: 1, padding: '20px 18px 18px 14px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(234,150,0,0.16)', border: '1px solid rgba(234,150,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💡</div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#ffd166', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '2px' }}>Did You Know?</div>
                    <div style={{ color: 'rgba(255,255,255,0.80)', fontWeight: '700', fontSize: '13px' }}>Awareness tip</div>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '13px', lineHeight: '1.75', margin: 0 }}>
                  {result.didYouKnow}
                </p>
              </div>
            </div>
          </div>

          {/* ── TOKEN CARD ── */}
          <div style={{
            ...glassCard, display: 'flex', marginBottom: '16px',
            border: '1px solid rgba(0,102,0,0.28)',
            animation: 'fadeInUp 0.4s ease 0.30s both',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
            <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.70, borderRadius: '16px 0 0 16px' }} />
            <div style={{ flex: 1, padding: '22px 22px 20px 18px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: '14px' }}>
                🔐 Anonymous Report Token
              </div>
              <div style={{
                display: 'inline-block',
                fontFamily: 'monospace', fontSize: '20px', fontWeight: '800',
                color: '#4ade80', letterSpacing: '0.15em',
                padding: '12px 28px', borderRadius: '12px',
                background: 'rgba(0,102,0,0.14)',
                border: '1px solid rgba(0,102,0,0.30)',
                marginBottom: '12px',
                backgroundImage: 'linear-gradient(90deg, rgba(0,102,0,0.14), rgba(0,150,0,0.20), rgba(0,102,0,0.14))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite',
              }}>
                {result.tokenId}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: '1.6', fontWeight: '500' }}>
                This token cannot be traced back to your identity in any way.
              </div>
              {result.alertSent && (
                <div style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', borderRadius: '8px', background: 'rgba(187,0,0,0.12)', border: '1px solid rgba(187,0,0,0.25)' }}>
                  <span style={{ color: '#ff8080', fontSize: '12px', fontWeight: '700' }}>⚡ HIGH risk alert sent to security team anonymously</span>
                </div>
              )}
            </div>
          </div>

          {/* ── ACTION BUTTONS ── */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'fadeInUp 0.4s ease 0.35s both' }}>
            <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '13px 22px', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
              color: '#ffffff', background: 'linear-gradient(135deg, #BB0000, #880000)',
              border: '1px solid rgba(255,100,100,0.20)', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(187,0,0,0.28)', transition: 'all 0.18s',
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(187,0,0,0.38)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(187,0,0,0.28)'; }}>
              📧 Report Another Email
            </button>

            <button onClick={handleHome} style={{
              padding: '13px 22px', borderRadius: '12px', fontWeight: '600', fontSize: '13px',
              color: 'rgba(255,255,255,0.72)', background: 'rgba(22,30,22,0.88)',
              border: '1px solid rgba(255,255,255,0.10)', cursor: 'pointer',
              backdropFilter: 'blur(20px)', transition: 'all 0.18s',
              boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(30,40,30,0.95)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(22,30,22,0.88)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              ← Return to Home
            </button>

            <button onClick={() => navigate('/awareness')} style={{
              padding: '13px 22px', borderRadius: '12px', fontWeight: '600', fontSize: '13px',
              color: '#4ade80', background: 'rgba(0,102,0,0.12)',
              border: '1px solid rgba(0,102,0,0.28)', cursor: 'pointer',
              transition: 'all 0.18s', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,102,0,0.20)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,102,0,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              📚 Go to Awareness Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;