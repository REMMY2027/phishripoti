import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import RiskBadge from '../components/RiskBadge';

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
      // Animate score counter
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!result) {
    navigate('/');
    return null;
  }

  const riskConfig = {
    HIGH: {
      bg: 'linear-gradient(135deg, #2a0505 0%, #1a0a0a 100%)',
      accent: '#BB0000',
      accentLight: '#ff6666',
      border: 'rgba(187,0,0,0.4)',
      glow: 'rgba(187,0,0,0.3)',
      label: 'High Risk Phishing Detected',
      sublabel: 'Do NOT click any links or open any attachments. Delete this email immediately.',
      gaugeColor: '#BB0000',
      badgeBg: 'rgba(187,0,0,0.15)'
    },
    MEDIUM: {
      bg: 'linear-gradient(135deg, #2a1a05 0%, #1a1505 100%)',
      accent: '#ea9600',
      accentLight: '#ffd166',
      border: 'rgba(234,150,0,0.4)',
      glow: 'rgba(234,150,0,0.3)',
      label: 'Medium Risk — Exercise Caution',
      sublabel: 'Do not click any links until you have verified the sender through official channels.',
      gaugeColor: '#ea9600',
      badgeBg: 'rgba(234,150,0,0.15)'
    },
    LOW: {
      bg: 'linear-gradient(135deg, #051a05 0%, #0a150a 100%)',
      accent: '#006600',
      accentLight: '#69db7c',
      border: 'rgba(0,102,0,0.4)',
      glow: 'rgba(0,102,0,0.3)',
      label: 'Low Risk — Likely Safe',
      sublabel: 'Both analysis layers returned weak signals. The email appears legitimate.',
      gaugeColor: '#006600',
      badgeBg: 'rgba(0,102,0,0.15)'
    }
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);

  const handleHome = () => { clearReport(); navigate('/'); };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: '#050d05', opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease'
    }}>
      <Navbar />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 ${config.glow}; }
          50% { box-shadow: 0 0 0 12px transparent; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Hero risk banner */}
      <div style={{
        background: config.bg,
        borderBottom: `1px solid ${config.border}`,
        padding: '32px 40px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: `radial-gradient(circle, ${config.glow} 0%, transparent 70%)`,
          pointerEvents: 'none'
        }}/>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 1 }}>
          {/* Circular gauge */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width="130" height="130" viewBox="0 0 120 120">
              {/* Background ring */}
              <circle cx="60" cy="60" r="52"
                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
              {/* Progress ring */}
              <circle cx="60" cy="60" r="52"
                fill="none" stroke={config.gaugeColor} strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s' }}/>
              {/* Inner glow ring */}
              <circle cx="60" cy="60" r="44"
                fill="none" stroke={config.gaugeColor} strokeWidth="1" opacity="0.2"/>
              {/* Score text */}
              <text x="60" y="55" textAnchor="middle"
                fill="white" fontSize="22" fontWeight="800"
                fontFamily="-apple-system, sans-serif">
                {scoreAnimated}%
              </text>
              <text x="60" y="72" textAnchor="middle"
                fill="rgba(255,255,255,0.4)" fontSize="10"
                fontFamily="-apple-system, sans-serif">
                RISK SCORE
              </text>
            </svg>
          </div>

          {/* Risk info */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '10px' }}>
              <RiskBadge level={result.riskLevel} />
            </div>
            <h2 style={{
              color: '#ffffff', fontWeight: '800', fontSize: '22px',
              margin: '0 0 8px', letterSpacing: '-0.3px'
            }}>
              {config.label}
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.6)', fontSize: '14px',
              margin: '0 0 16px', lineHeight: '1.6', maxWidth: '480px'
            }}>
              {config.sublabel}
            </p>

            {/* Score breakdown pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px',
                fontWeight: '600', background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                🤖 GPT-4o: {Math.round(result.riskScore * 0.7)}% weight
              </div>
              <div style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px',
                fontWeight: '600', background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                🔍 Safe Browsing: {Math.round(result.riskScore * 0.3)}% weight
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <div style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

            {/* What to do next */}
            <div style={{
              borderRadius: '16px', padding: '22px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${config.border}`,
              animation: 'fadeInUp 0.4s ease 0.1s both'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: config.badgeBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
                }}>🚨</div>
                <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px' }}>
                  What to do next
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.recommendedActions?.map((action, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '8px',
                      background: config.badgeBg, border: `1px solid ${config.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: '800', color: config.accentLight,
                      flexShrink: 0, marginTop: '1px'
                    }}>{i + 1}</div>
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: '1.65' }}>
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* GPT-4o Analysis */}
            <div style={{
              borderRadius: '16px', padding: '22px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              animation: 'fadeInUp 0.4s ease 0.2s both'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#69db7c',
                  boxShadow: '0 0 6px #69db7c'
                }}></div>
                <span style={{
                  fontSize: '11px', fontWeight: '700', color: '#69db7c',
                  textTransform: 'uppercase', letterSpacing: '0.08em'
                }}>GPT-4o Analysis</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Domain spoofing', value: result.aiAnalysis?.domainSpoofing },
                  { label: 'Urgency language', value: result.aiAnalysis?.urgencyLanguage },
                  { label: 'Credential harvesting', value: result.aiAnalysis?.credentialHarvesting },
                  { label: 'M-Pesa abuse signals', value: result.aiAnalysis?.mpesaAbuse }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '10px 14px',
                    borderRadius: '10px',
                    background: item.value
                      ? 'rgba(187,0,0,0.08)'
                      : 'rgba(0,102,0,0.06)',
                    border: item.value
                      ? '1px solid rgba(187,0,0,0.2)'
                      : '1px solid rgba(0,102,0,0.15)'
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>
                      {item.label}
                    </span>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '3px 10px', borderRadius: '20px',
                      background: item.value
                        ? 'rgba(187,0,0,0.15)'
                        : 'rgba(0,102,0,0.15)',
                      border: item.value
                        ? '1px solid rgba(187,0,0,0.3)'
                        : '1px solid rgba(0,102,0,0.3)'
                    }}>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: item.value ? '#ff6666' : '#69db7c'
                      }}></div>
                      <span style={{
                        fontSize: '11px', fontWeight: '700',
                        color: item.value ? '#ff8080' : '#69db7c'
                      }}>
                        {item.value ? 'Detected' : 'Clear'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat indicators */}
            <div style={{
              borderRadius: '16px', padding: '22px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              animation: 'fadeInUp 0.4s ease 0.3s both'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: 'rgba(187,0,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
                }}>⚠️</div>
                <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px' }}>
                  Threat Indicators
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.reasons?.map((reason, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '10px 14px', borderRadius: '10px',
                    background: 'rgba(187,0,0,0.06)',
                    border: '1px solid rgba(187,0,0,0.12)'
                  }}>
                    <span style={{ color: config.accentLight, fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>▸</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.6' }}>
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Did You Know */}
            <div style={{
              borderRadius: '16px', padding: '22px',
              background: 'linear-gradient(135deg, rgba(234,150,0,0.1), rgba(234,150,0,0.04))',
              border: '1px solid rgba(234,150,0,0.25)',
              animation: 'fadeInUp 0.4s ease 0.4s both'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(234,150,0,0.2)',
                  border: '1px solid rgba(234,150,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px'
                }}>💡</div>
                <div>
                  <div style={{
                    fontSize: '10px', fontWeight: '700', color: '#ffd166',
                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px'
                  }}>Did You Know?</div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px' }}>
                    Awareness tip
                  </div>
                </div>
              </div>
              <p style={{
                color: 'rgba(255,255,255,0.72)',
                fontSize: '14px', lineHeight: '1.75', margin: 0
              }}>
                {result.didYouKnow}
              </p>
            </div>
          </div>

          {/* Anonymous token */}
          <div style={{
            borderRadius: '16px', padding: '24px',
            background: 'linear-gradient(135deg, rgba(0,102,0,0.1), rgba(0,102,0,0.04))',
            border: '1px solid rgba(0,102,0,0.3)',
            marginBottom: '24px', textAlign: 'center',
            animation: 'fadeInUp 0.4s ease 0.5s both',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,102,0,0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}/>
            <div style={{
              fontSize: '11px', fontWeight: '700', color: 'rgba(0,102,0,0.8)',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px'
            }}>
              🔐 Anonymous Report Token
            </div>
            <div style={{
              display: 'inline-block',
              fontFamily: 'monospace', fontSize: '20px', fontWeight: '800',
              color: '#69db7c', letterSpacing: '0.15em',
              padding: '12px 28px', borderRadius: '12px',
              background: 'rgba(0,102,0,0.12)',
              border: '1px solid rgba(0,102,0,0.3)',
              marginBottom: '10px',
              backgroundImage: 'linear-gradient(90deg, rgba(0,102,0,0.12), rgba(0,150,0,0.15), rgba(0,102,0,0.12))',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite'
            }}>
              {result.tokenId}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: '1.6' }}>
              This token cannot be traced back to your identity in any way.
              {result.alertSent && (
                <span style={{
                  display: 'block', marginTop: '6px',
                  color: '#ff8080', fontWeight: '600'
                }}>
                  ⚡ HIGH risk alert sent to security team anonymously
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'fadeInUp 0.4s ease 0.6s both' }}>
            <button
              onClick={() => { clearReport(); navigate('/report/step1'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 24px', borderRadius: '12px',
                fontWeight: '700', fontSize: '14px', color: '#ffffff',
                background: 'linear-gradient(135deg, #BB0000, #880000)',
                border: '1px solid rgba(255,100,100,0.2)',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 4px 16px rgba(187,0,0,0.3)'
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(187,0,0,0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(187,0,0,0.3)'; }}>
              Report Another Email
            </button>
            <button
              onClick={handleHome}
              style={{
                padding: '14px 24px', borderRadius: '12px',
                fontWeight: '600', fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
              Return to Home
            </button>
            <button
              onClick={() => navigate('/awareness')}
              style={{
                padding: '14px 24px', borderRadius: '12px',
                fontWeight: '600', fontSize: '14px',
                color: '#69db7c',
                background: 'rgba(0,102,0,0.08)',
                border: '1px solid rgba(0,102,0,0.25)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(0,102,0,0.15)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(0,102,0,0.08)'}>
              Go to Awareness Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;