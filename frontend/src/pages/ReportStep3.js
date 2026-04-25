import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const ReportStep3 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();

  const [fillMode, setFillMode] = useState(null);
  const [form, setForm] = useState({
    senderEmail: reportData.senderEmail || '',
    subjectLine: reportData.subjectLine || '',
    suspiciousLinks: reportData.suspiciousLinks || '',
    emailDescription: reportData.emailDescription || '',
    emailHeader: reportData.emailHeader || '',
    clickedAnything: reportData.clickedAnything || 'no'
  });

  const [rawEmail, setRawEmail] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');
  const [extracted, setExtracted] = useState(false);
  const [showHeaderInfo, setShowHeaderInfo] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    updateReport({ [field]: value });
  };

  const handleNext = () => {
    if (form.senderEmail && form.subjectLine && form.emailDescription) {
      navigate('/report/step4');
    }
  };

  const doQuickFill = async () => {
    if (!rawEmail.trim()) {
      setExtractError('Please paste the email content first.');
      return;
    }
    setExtracting(true);
    setExtractError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reports/quick-fill`,
        { rawEmail, department: reportData.department },
        { timeout: 30000 }
      );
      const { senderEmail, subjectLine, suspiciousLinks, emailDescription } = response.data;
      const updated = {
        senderEmail: senderEmail || form.senderEmail,
        subjectLine: subjectLine || form.subjectLine,
        suspiciousLinks: suspiciousLinks || form.suspiciousLinks,
        emailDescription: emailDescription || form.emailDescription
      };
      setForm(prev => ({ ...prev, ...updated }));
      updateReport(updated);
      setExtracted(true);
      setFillMode('manual');
      setRawEmail('');
    } catch (err) {
      setExtractError('Error extracting details. Please try again in 30 seconds.');
    } finally {
      setExtracting(false);
    }
  };

  const isValid = form.senderEmail && form.subjectLine && form.emailDescription;

  const clickedOptions = [
    { value: 'no', label: '✓ No — I did not click anything', safe: true },
    { value: 'link', label: 'Yes — I clicked a link', safe: false },
    { value: 'attachment', label: 'Yes — I opened an attachment', safe: false },
    { value: 'both', label: 'Yes — I clicked a link and opened an attachment', safe: false }
  ];

  const getClickedAdvice = (value) => {
    if (value === 'link') return [
      'Close the browser tab or page that opened immediately',
      'Do NOT enter any credentials or personal information on any page that opened',
      'Clear your browser history and cache',
      'If any page asked for login details and you entered them — change those passwords now via the official website directly',
      'Submit this report — our system will scan the link for threats'
    ];
    if (value === 'attachment') return [
      'Do NOT open the file again if it is still on your device',
      'If the file ran or installed anything — power off your device immediately',
      'Do not connect your device to any network or other devices',
      'Submit this report — your IT security team will be alerted automatically if risk is HIGH',
      'Avoid using the device for sensitive tasks until it has been checked'
    ];
    if (value === 'both') return [
      'Close all browser tabs immediately and do not re-open them',
      'Do NOT enter credentials on any page that opened',
      'Do NOT open the attachment again',
      'If the file ran or installed anything — power off your device immediately',
      'If you entered any credentials — change those passwords now via the official website',
      'Submit this report immediately — our system will alert your security team'
    ];
    return [];
  };

  const inputStyle = (filled) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: filled
      ? '1px solid rgba(34,197,94,0.35)'
      : '1px solid rgba(255,255,255,0.10)',
    borderRadius: '10px', color: '#ffffff',
    padding: '12px 14px', fontSize: '13px',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border 0.18s',
  });

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* ── BASE — deep forest green ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#061508' }} />

      {/* ── RADIAL — subtle centre lift, stays dark ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 65% at 50% 38%, rgba(10,30,12,0.0) 0%, rgba(6,21,8,0.0) 40%, rgba(4,14,5,0.55) 80%, rgba(2,8,3,0.85) 100%)',
      }} />

      {/* ── GREEN AMBIENT GLOW — left ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 50% 60% at -5% 50%, rgba(0,80,20,0.18) 0%, transparent 70%)',
      }} />

      {/* ── RED AMBIENT GLOW — bottom right ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse 45% 45% at 105% 100%, rgba(120,0,0,0.20) 0%, transparent 65%)',
      }} />

      {/* ── TOP EDGE — slight lightening ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 4,
        background: 'linear-gradient(180deg, rgba(0,40,8,0.60) 0%, rgba(0,20,4,0.20) 12%, transparent 28%)',
      }} />

      {/* ── BOTTOM EDGE — deepen ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 5,
        background: 'linear-gradient(0deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 15%, transparent 30%)',
      }} />

      {/* ── NAIROBI SKYLINE — brighter on dark bg ── */}
      <div style={{
        position: 'fixed', bottom: '-30px', right: 0,
        width: '580px', height: '220px',
        zIndex: 6, pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260"
          xmlns="http://www.w3.org/2000/svg" fill="#22c55e" opacity="0.08">
          <rect x="20" y="180" width="18" height="80" />
          <rect x="42" y="170" width="14" height="90" />
          <rect x="60" y="185" width="20" height="75" />
          <rect x="84" y="175" width="16" height="85" />
          <rect x="104" y="188" width="22" height="72" />
          <rect x="310" y="60" width="38" height="200" />
          <rect x="318" y="50" width="22" height="15" />
          <rect x="324" y="40" width="10" height="14" />
          <rect x="327" y="30" width="4" height="12" />
          <rect x="200" y="90" width="32" height="170" />
          <ellipse cx="216" cy="90" rx="18" ry="8" />
          <rect x="212" y="75" width="8" height="18" />
          <rect x="214" y="65" width="4" height="12" />
          <rect x="380" y="80" width="34" height="180" />
          <rect x="386" y="72" width="22" height="12" />
          <rect x="392" y="62" width="10" height="12" />
          <rect x="395" y="52" width="4" height="12" />
          <rect x="150" y="120" width="26" height="140" />
          <rect x="180" y="130" width="18" height="130" />
          <rect x="250" y="110" width="24" height="150" />
          <rect x="278" y="125" width="28" height="135" />
          <rect x="418" y="100" width="28" height="160" />
          <rect x="450" y="115" width="22" height="145" />
          <rect x="476" y="130" width="26" height="130" />
          <rect x="130" y="155" width="18" height="105" />
          <rect x="500" y="150" width="20" height="110" />
          <rect x="524" y="160" width="24" height="100" />
          <rect x="552" y="155" width="18" height="105" />
          <rect x="0" y="258" width="580" height="2" />
        </svg>
      </div>

      {/* ── DECORATIVE SVG — brighter on dark bg ── */}
      <svg style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 7, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,180,60,0.08)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="280" fill="none" stroke="rgba(0,180,60,0.05)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="210" fill="none" stroke="rgba(0,180,60,0.03)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(187,0,0,0.08)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="250" fill="none" stroke="rgba(187,0,0,0.05)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="180" fill="none" stroke="rgba(187,0,0,0.03)" strokeWidth="1"/>
        <polygon points="200,480 225,466 250,480 250,508 225,522 200,508"
          fill="none" stroke="rgba(0,180,60,0.07)" strokeWidth="1.5"/>
        <polygon points="1050,180 1075,166 1100,180 1100,208 1075,222 1050,208"
          fill="none" stroke="rgba(187,0,0,0.07)" strokeWidth="1.5"/>
        <path d="M 0 500 Q 350 350 700 480 T 1400 420"
          fill="none" stroke="rgba(0,180,60,0.05)" strokeWidth="1.5"/>
        <path d="M 0 600 Q 400 450 750 560 T 1400 500"
          fill="none" stroke="rgba(187,0,0,0.04)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="3" fill="rgba(0,180,60,0.12)"/>
        <circle cx="14%" cy="40%" r="2" fill="rgba(0,180,60,0.08)"/>
        <circle cx="88%" cy="20%" r="3.5" fill="rgba(187,0,0,0.12)"/>
        <circle cx="92%" cy="38%" r="2" fill="rgba(187,0,0,0.08)"/>
        <line x1="10%" y1="25%" x2="14%" y2="40%"
          stroke="rgba(0,180,60,0.07)" strokeWidth="0.8"/>
        <line x1="88%" y1="20%" x2="92%" y2="38%"
          stroke="rgba(187,0,0,0.07)" strokeWidth="0.8"/>
      </svg>

      {/* ── NAVBAR — seamless with background ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '66px',
        background: 'rgba(4,12,5,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,180,60,0.08)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,80,80,0.18), 0 4px 16px rgba(187,0,0,0.50)',
            flexShrink: 0,
          }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: 1 }}>
            <span style={{ color: '#ffffff' }}>Phish</span>
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Ripoti</span>
          </span>
        </div>
        <button onClick={() => navigate('/it/login')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: 'rgba(255,255,255,0.80)',
          fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', letterSpacing: '0.015em',
          transition: 'all 0.16s ease',
        }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.80)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          IT Manager Portal
        </button>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        padding: '26px 44px 20px',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        <div style={{ maxWidth: '760px', width: '100%' }}>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                height: '3px', borderRadius: '2px',
                width: i <= 3 ? '28px' : '18px',
                background: i < 3 ? '#22c55e' : i === 3 ? '#BB0000' : 'rgba(255,255,255,0.12)',
              }} />
            ))}
            <span style={{
              fontSize: '10px', letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase',
              marginLeft: '6px',
            }}>Step 3 of 4</span>
          </div>

          {/* ── HEADLINE ── */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{
              position: 'absolute', top: '-14px', left: '-4px',
              fontSize: '72px', fontWeight: '900',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(34,197,94,0.06)',
              letterSpacing: '-4px', lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none',
              zIndex: 0,
            }}>
              EMAIL
            </div>
            <h2 style={{
              position: 'relative', zIndex: 1,
              fontWeight: '800', fontSize: '22px',
              margin: '0 0 6px', letterSpacing: '-0.4px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.92)' }}>Tell us about the </span>
              <span style={{
                color: 'transparent',
                background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 45%, #22c55e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>suspicious email</span>
            </h2>
            <p style={{
              position: 'relative', zIndex: 1,
              color: 'rgba(255,255,255,0.35)', fontSize: '13px',
              margin: 0, lineHeight: '1.6',
            }}>
              Choose how you would like to fill in the details below.
            </p>
          </div>

          {/* ── MODE SELECTOR ── */}
          {!fillMode && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '11px', fontWeight: '600',
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                marginBottom: '12px',
              }}>
                How would you like to fill in the details?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

                {/* AI Quick Fill */}
                <div
                  onClick={() => setFillMode('ai')}
                  style={{
                    borderRadius: '13px', padding: '22px',
                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    background: 'rgba(20,28,16,0.80)',
                    border: '1px solid rgba(234,150,0,0.30)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(234,150,0,0.20)';
                    e.currentTarget.style.borderColor = 'rgba(234,150,0,0.45)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(234,150,0,0.30)';
                  }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 50%, transparent 100%)',
                    pointerEvents: 'none', borderRadius: '13px',
                  }} />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(234,150,0,0.30), transparent)',
                  }} />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '3px', height: '100%',
                    background: 'linear-gradient(180deg, #ffd166, #ea9600)', opacity: 0.7,
                  }} />
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(234,150,0,0.15)',
                    border: '1px solid rgba(234,150,0,0.30)',
                    borderRadius: '20px', padding: '2px 10px',
                    fontSize: '9px', fontWeight: '700', color: '#ffd166',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>Recommended</div>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(234,150,0,0.12)',
                    border: '1px solid rgba(234,150,0,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', marginBottom: '12px',
                  }}>⚡</div>
                  <div style={{ color: '#ffd166', fontWeight: '800', fontSize: '15px', marginBottom: '6px', paddingLeft: '4px' }}>
                    AI Quick Fill
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '12px', lineHeight: '1.6', paddingLeft: '4px' }}>
                    Paste the full email — GPT-4o automatically extracts all details in seconds.
                  </div>
                </div>

                {/* Manual Fill */}
                <div
                  onClick={() => setFillMode('manual')}
                  style={{
                    borderRadius: '13px', padding: '22px',
                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    background: 'rgba(20,28,16,0.80)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.45)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 50%, transparent 100%)',
                    pointerEvents: 'none', borderRadius: '13px',
                  }} />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                  }} />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '3px', height: '100%',
                    background: 'rgba(34,197,94,0.40)', opacity: 0.6,
                  }} />
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', marginBottom: '12px',
                  }}>✍️</div>
                  <div style={{ color: 'rgba(255,255,255,0.88)', fontWeight: '800', fontSize: '15px', marginBottom: '6px', paddingLeft: '4px' }}>
                    Fill Manually
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', lineHeight: '1.6', paddingLeft: '4px' }}>
                    Enter the email details yourself field by field at your own pace.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── AI QUICK FILL INPUT ── */}
          {fillMode === 'ai' && !extracted && (
            <div style={{
              borderRadius: '13px', marginBottom: '20px', overflow: 'hidden',
              border: '1px solid rgba(234,150,0,0.30)',
              background: 'rgba(20,28,16,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 4px 28px rgba(0,0,0,0.40)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
                pointerEvents: 'none', borderRadius: '13px',
              }} />
              <div style={{
                padding: '14px 18px', borderBottom: '1px solid rgba(234,150,0,0.15)',
                display: 'flex', alignItems: 'center', gap: '10px',
                position: 'relative', zIndex: 1,
              }}>
                <span style={{ fontSize: '16px' }}>⚡</span>
                <span style={{ color: '#ffd166', fontWeight: '700', fontSize: '14px' }}>AI Quick Fill</span>
                <button onClick={() => setFillMode(null)} style={{
                  marginLeft: 'auto', background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.28)', fontSize: '12px',
                  cursor: 'pointer', textDecoration: 'underline',
                }}>← Change method</button>
              </div>
              <div style={{ padding: '18px', position: 'relative', zIndex: 1 }}>
                <label style={{
                  display: 'block', fontSize: '11px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.32)', marginBottom: '10px',
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                }}>
                  Paste the full email content here
                </label>
                <textarea
                  value={rawEmail}
                  onChange={e => setRawEmail(e.target.value)}
                  placeholder="Paste everything — from, subject, body, links...&#10;&#10;GPT-4o will extract all the details automatically."
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.30)',
                    border: '1px solid rgba(234,150,0,0.15)',
                    borderRadius: '10px', color: '#ffffff',
                    padding: '14px', fontSize: '13px', outline: 'none',
                    resize: 'none', lineHeight: '1.7', minHeight: '150px',
                    boxSizing: 'border-box', fontFamily: 'monospace',
                  }}
                  autoFocus
                />
                {extractError && (
                  <div style={{
                    marginTop: '8px', padding: '8px 12px',
                    background: 'rgba(187,0,0,0.12)', border: '1px solid rgba(187,0,0,0.22)',
                    borderRadius: '8px', color: '#ff8080', fontSize: '12px',
                  }}>{extractError}</div>
                )}
                <button
                  onClick={doQuickFill}
                  disabled={extracting || !rawEmail.trim()}
                  style={{
                    marginTop: '12px',
                    background: extracting || !rawEmail.trim()
                      ? 'rgba(255,255,255,0.07)'
                      : 'linear-gradient(135deg, #ea9600, #cc7a00)',
                    color: extracting || !rawEmail.trim() ? 'rgba(255,255,255,0.28)' : '#fff',
                    border: 'none', borderRadius: '10px',
                    padding: '11px 22px', fontSize: '13px', fontWeight: '700',
                    cursor: extracting || !rawEmail.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    boxShadow: extracting || !rawEmail.trim() ? 'none' : '0 4px 16px rgba(234,150,0,0.28)',
                    transition: 'all 0.16s',
                  }}>
                  {extracting ? (
                    <>
                      <svg style={{ animation: 'spin 1s linear infinite' }} width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                      Extracting with GPT-4o...
                    </>
                  ) : '⚡ Extract Details →'}
                </button>
              </div>
            </div>
          )}

          {/* Extracted success */}
          {extracted && (
            <div style={{
              marginBottom: '16px', padding: '11px 14px',
              background: 'rgba(0,102,0,0.12)', border: '1px solid rgba(34,197,94,0.22)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span>✅</span>
              <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '600' }}>
                AI Quick Fill complete — review and edit the fields below if needed
              </span>
              <button onClick={() => { setExtracted(false); setFillMode('ai'); }} style={{
                marginLeft: 'auto', background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.28)', fontSize: '12px',
                cursor: 'pointer', textDecoration: 'underline',
              }}>Redo</button>
            </div>
          )}

          {/* ── MANUAL FORM ── */}
          {fillMode === 'manual' && (
            <div style={{
              borderRadius: '13px', padding: '22px',
              background: 'rgba(20,28,16,0.82)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 4px 28px rgba(0,0,0,0.40)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
                pointerEvents: 'none', borderRadius: '13px',
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.18), transparent)',
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '3px', height: '100%',
                background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.6,
              }} />

              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '18px',
                position: 'relative', zIndex: 1,
              }}>
                <div style={{
                  fontSize: '11px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                }}>Email Details</div>
                {!extracted && (
                  <button onClick={() => setFillMode(null)} style={{
                    background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.25)', fontSize: '12px',
                    cursor: 'pointer', textDecoration: 'underline',
                  }}>← Change method</button>
                )}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.32)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Sender email <span style={{ color: '#BB0000' }}>*</span>
                    </label>
                    <input
                      value={form.senderEmail}
                      onChange={e => handleChange('senderEmail', e.target.value)}
                      placeholder="e.g. security@kcb-alerts.net"
                      style={{ ...inputStyle(form.senderEmail), fontFamily: 'monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.32)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Subject line <span style={{ color: '#BB0000' }}>*</span>
                    </label>
                    <input
                      value={form.subjectLine}
                      onChange={e => handleChange('subjectLine', e.target.value)}
                      placeholder="e.g. URGENT: Verify your account now"
                      style={inputStyle(form.subjectLine)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.32)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Suspicious links or URLs
                  </label>
                  <input
                    value={form.suspiciousLinks}
                    onChange={e => handleChange('suspiciousLinks', e.target.value)}
                    placeholder="e.g. http://kcb-secure-login.net/verify"
                    style={{ ...inputStyle(false), fontFamily: 'monospace' }}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.32)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    What did the email ask you to do? <span style={{ color: '#BB0000' }}>*</span>
                  </label>
                  <textarea
                    value={form.emailDescription}
                    onChange={e => handleChange('emailDescription', e.target.value)}
                    placeholder="e.g. Click a link to verify my password, transfer funds urgently, provide my M-Pesa PIN..."
                    style={{ ...inputStyle(form.emailDescription), resize: 'none', minHeight: '88px', lineHeight: '1.65' }}
                  />
                </div>

                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '14px' }}>
                  <div
                    onClick={() => setShowHeaderInfo(!showHeaderInfo)}
                    style={{
                      padding: '11px 14px', cursor: 'pointer',
                      background: 'rgba(255,255,255,0.03)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px' }}>📋</span>
                      <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: '12px', fontWeight: '600' }}>Email Header</span>
                      <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.28)', padding: '2px 7px', borderRadius: '4px' }}>Optional</span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: '12px', transform: showHeaderInfo ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'block' }}>▾</span>
                  </div>
                  {showHeaderInfo && (
                    <div style={{ padding: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ padding: '12px', borderRadius: '9px', background: 'rgba(234,150,0,0.07)', border: '1px solid rgba(234,150,0,0.13)', marginBottom: '12px' }}>
                        <div style={{ color: '#ffd166', fontWeight: '700', fontSize: '11px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          💡 How to find your email header
                        </div>
                        {[
                          { app: 'Gmail', steps: 'Open the email → Click the 3 dots (⋮) top right → Click "Show original" → Copy all the text at the top' },
                          { app: 'Outlook', steps: 'Open the email → Click File → Properties → Copy the text in "Internet headers"' },
                          { app: 'Apple Mail', steps: 'Open the email → Click View menu → Message → All Headers → Copy the header text' }
                        ].map((item, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: i < 2 ? '7px' : '0' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffd166', background: 'rgba(234,150,0,0.15)', padding: '1px 6px', borderRadius: '4px', flexShrink: 0, height: 'fit-content', marginTop: '1px' }}>{item.app}</span>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>{item.steps}</span>
                          </div>
                        ))}
                      </div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.28)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Paste email header here
                      </label>
                      <textarea
                        value={form.emailHeader}
                        onChange={e => handleChange('emailHeader', e.target.value)}
                        placeholder="Received: from mail.suspicious.com&#10;X-Originating-IP: 192.168.1.1&#10;..."
                        style={{ width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '9px', color: 'rgba(255,255,255,0.60)', padding: '11px 12px', fontSize: '11px', outline: 'none', resize: 'none', minHeight: '90px', boxSizing: 'border-box', lineHeight: '1.6', fontFamily: 'monospace' }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.32)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Did you click any links or open any attachments?
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {clickedOptions.map(opt => (
                      <div key={opt.value}>
                        <button
                          onClick={() => handleChange('clickedAnything', opt.value)}
                          style={{
                            width: '100%', padding: '11px 14px',
                            borderRadius: '9px', fontSize: '13px',
                            fontWeight: '600', cursor: 'pointer',
                            textAlign: 'left', display: 'flex',
                            alignItems: 'center', gap: '10px',
                            background: form.clickedAnything === opt.value
                              ? opt.safe ? 'rgba(0,102,0,0.18)' : 'rgba(187,0,0,0.14)'
                              : 'rgba(255,255,255,0.03)',
                            color: form.clickedAnything === opt.value
                              ? opt.safe ? '#4ade80' : '#ff8080'
                              : 'rgba(255,255,255,0.50)',
                            border: form.clickedAnything === opt.value
                              ? `1px solid ${opt.safe ? 'rgba(34,197,94,0.30)' : 'rgba(187,0,0,0.30)'}`
                              : '1px solid rgba(255,255,255,0.07)',
                            transition: 'all 0.18s',
                          }}>
                          <div style={{
                            width: '18px', height: '18px', borderRadius: '50%',
                            background: form.clickedAnything === opt.value
                              ? opt.safe ? '#22c55e' : '#BB0000'
                              : 'rgba(255,255,255,0.07)',
                            border: form.clickedAnything === opt.value ? 'none' : '1px solid rgba(255,255,255,0.14)',
                            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '9px', color: '#fff',
                          }}>
                            {form.clickedAnything === opt.value ? '●' : ''}
                          </div>
                          {opt.label}
                        </button>
                        {form.clickedAnything === opt.value && !opt.safe && (
                          <div style={{ marginTop: '7px', padding: '12px 14px', background: 'rgba(187,0,0,0.08)', border: '1px solid rgba(187,0,0,0.20)', borderLeft: '3px solid #BB0000', borderRadius: '9px' }}>
                            <div style={{ color: '#ff8080', fontWeight: '700', fontSize: '11px', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚠ Do this immediately:</div>
                            {getClickedAdvice(opt.value).map((tip, i) => (
                              <div key={i} style={{ display: 'flex', gap: '7px', marginBottom: i < getClickedAdvice(opt.value).length - 1 ? '4px' : '0' }}>
                                <span style={{ color: '#BB0000', fontSize: '10px', marginTop: '2px', flexShrink: 0 }}>▸</span>
                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.55' }}>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── NEXT STRIP ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <NextStrip
          steps={['Phishing Email', reportData.department || 'Department', 'Email Details', 'Submit']}
          currentStep={2}
          onNext={handleNext}
          nextLabel="Next: Review & Submit →"
          nextDisabled={!isValid || !fillMode}
        />
      </div>
    </div>
  );
};

export default ReportStep3;