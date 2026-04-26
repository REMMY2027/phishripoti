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
    clickedAnything: reportData.clickedAnything || '',
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
    if (form.senderEmail && form.subjectLine && form.emailDescription && form.clickedAnything) {
      navigate('/report/step4');
    }
  };

  const doQuickFill = async () => {
    if (!rawEmail.trim()) { setExtractError('Please paste the email content first.'); return; }
    setExtracting(true); setExtractError('');
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
        emailDescription: emailDescription || form.emailDescription,
      };
      setForm(prev => ({ ...prev, ...updated }));
      updateReport(updated);
      setExtracted(true); setFillMode('manual'); setRawEmail('');
    } catch (err) {
      setExtractError('Error extracting details. Please try again in 30 seconds.');
    } finally {
      setExtracting(false);
    }
  };

  const isValid = form.senderEmail && form.subjectLine && form.emailDescription && form.clickedAnything;

  const clickedOptions = [
    { value: 'no',         label: 'No',             sub: 'I did not click anything',                  icon: '✓',  safe: true  },
    { value: 'link',       label: 'Clicked a link', sub: 'I clicked a link in the email',             icon: '🔗', safe: false },
    { value: 'attachment', label: 'Opened file',    sub: 'I opened an attachment',                    icon: '📎', safe: false },
    { value: 'both',       label: 'Both',           sub: 'Clicked a link and opened an attachment',   icon: '⚠️', safe: false },
  ];

  const getClickedAdvice = (value) => {
    if (value === 'link') return [
      'Close the browser tab or page that opened immediately',
      'Do NOT enter any credentials or personal information on any page that opened',
      'Clear your browser history and cache',
      'If any page asked for login details and you entered them — change those passwords now',
      'Submit this report — our system will scan the link for threats',
    ];
    if (value === 'attachment') return [
      'Do NOT open the file again if it is still on your device',
      'If the file ran or installed anything — power off your device immediately',
      'Do not connect your device to any network or other devices',
      'Submit this report — your IT security team will be alerted if risk is HIGH',
      'Avoid using the device for sensitive tasks until it has been checked',
    ];
    if (value === 'both') return [
      'Close all browser tabs immediately and do not re-open them',
      'Do NOT enter credentials on any page that opened',
      'Do NOT open the attachment again',
      'If the file ran or installed anything — power off your device immediately',
      'If you entered any credentials — change those passwords now',
      'Submit this report immediately — our system will alert your security team',
    ];
    return [];
  };

  const inputStyle = (filled) => ({
    width: '100%',
    background: filled ? 'rgba(18,26,18,0.95)' : 'rgba(22,30,22,0.88)',
    border: filled ? '1px solid rgba(34,197,94,0.40)' : '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', color: '#ffffff',
    padding: '11px 14px', fontSize: '13px',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border 0.18s',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUND — identical to Step1/Step2 ── */}
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
      <div style={{ flex: 1, position: 'relative', zIndex: 10, padding: '26px 44px 20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ maxWidth: '760px', width: '100%' }}>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: '3px', borderRadius: '2px', width: i <= 3 ? '28px' : '18px', background: i < 3 ? '#006600' : i === 3 ? '#BB0000' : 'rgba(0,0,0,0.14)' }} />
            ))}
            <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', marginLeft: '6px', fontWeight: '600' }}>Step 3 of 4</span>
          </div>

          {/* Headline */}
          <div style={{ position: 'relative', marginBottom: '22px' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '-4px', fontSize: '72px', fontWeight: '900', color: 'transparent', WebkitTextStroke: '1px rgba(187,0,0,0.06)', letterSpacing: '-4px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>EMAIL</div>
            <h2 style={{ position: 'relative', zIndex: 1, fontWeight: '900', fontSize: '24px', margin: '0 0 7px', letterSpacing: '-0.5px', color: '#111111' }}>
              Tell us about the{' '}
              <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 45%, #006600 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>suspicious email</span>
            </h2>
            <p style={{ position: 'relative', zIndex: 1, color: 'rgba(0,0,0,0.45)', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
              Choose how you would like to fill in the details below.
            </p>
          </div>

          {/* ── MODE SELECTOR ── */}
          {!fillMode && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                How would you like to fill in the details?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

                {/* AI Quick Fill */}
                <div onClick={() => setFillMode('ai')} style={{
                  borderRadius: '16px', padding: '0', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex',
                  background: 'rgba(18,26,18,0.92)', border: '1px solid rgba(234,150,0,0.30)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(234,150,0,0.50)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(234,150,0,0.30)'; }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%)', pointerEvents: 'none', borderRadius: '16px' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(234,150,0,0.35), transparent)' }} />
                  <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #ffd166, #ea9600)', opacity: 0.80, borderRadius: '16px 0 0 16px' }} />
                  <div style={{ flex: 1, padding: '20px 18px 18px 14px' }}>
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(234,150,0,0.15)', border: '1px solid rgba(234,150,0,0.28)', borderRadius: '20px', padding: '2px 10px', fontSize: '8px', fontWeight: '800', color: '#ffd166', letterSpacing: '0.09em', textTransform: 'uppercase' }}>Recommended</div>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(234,150,0,0.14)', border: '1px solid rgba(234,150,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>⚡</div>
                    <div style={{ color: '#ffd166', fontWeight: '800', fontSize: '14px', marginBottom: '6px' }}>AI Quick Fill</div>
                    <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: '12px', lineHeight: '1.6' }}>Paste the full email — GPT-4o automatically extracts all details in seconds.</div>
                  </div>
                </div>

                {/* Manual Fill */}
                <div onClick={() => setFillMode('manual')} style={{
                  borderRadius: '16px', padding: '0', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex',
                  background: 'rgba(22,30,22,0.88)', border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%)', pointerEvents: 'none', borderRadius: '16px' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }} />
                  <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.65, borderRadius: '16px 0 0 16px' }} />
                  <div style={{ flex: 1, padding: '20px 18px 18px 14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>✍️</div>
                    <div style={{ color: 'rgba(255,255,255,0.92)', fontWeight: '800', fontSize: '14px', marginBottom: '6px' }}>Fill Manually</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', lineHeight: '1.6' }}>Enter the email details yourself field by field at your own pace.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── AI QUICK FILL ── */}
          {fillMode === 'ai' && !extracted && (
            <div style={{ borderRadius: '16px', marginBottom: '20px', overflow: 'hidden', border: '1px solid rgba(234,150,0,0.28)', background: 'rgba(18,26,18,0.92)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 24px rgba(0,0,0,0.14)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
              <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(234,150,0,0.14)', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '16px' }}>⚡</span>
                <span style={{ color: '#ffd166', fontWeight: '700', fontSize: '14px' }}>AI Quick Fill</span>
                <button onClick={() => setFillMode(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>← Change method</button>
              </div>
              <div style={{ padding: '18px', position: 'relative', zIndex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.38)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.10em' }}>Paste the full email content here</label>
                <textarea value={rawEmail} onChange={e => setRawEmail(e.target.value)}
                  placeholder="Paste everything — from, subject, body, links...&#10;&#10;GPT-4o will extract all the details automatically."
                  style={{ width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(234,150,0,0.14)', borderRadius: '10px', color: '#ffffff', padding: '14px', fontSize: '13px', outline: 'none', resize: 'none', lineHeight: '1.7', minHeight: '150px', boxSizing: 'border-box', fontFamily: 'monospace' }} autoFocus/>
                {extractError && <div style={{ marginTop: '8px', padding: '8px 12px', background: 'rgba(187,0,0,0.12)', border: '1px solid rgba(187,0,0,0.22)', borderRadius: '8px', color: '#ff8080', fontSize: '12px' }}>{extractError}</div>}
                <button onClick={doQuickFill} disabled={extracting || !rawEmail.trim()} style={{
                  marginTop: '12px',
                  background: extracting || !rawEmail.trim() ? 'rgba(255,255,255,0.07)' : 'linear-gradient(135deg, #ea9600, #cc7a00)',
                  color: extracting || !rawEmail.trim() ? 'rgba(255,255,255,0.28)' : '#fff',
                  border: 'none', borderRadius: '10px', padding: '11px 22px', fontSize: '13px', fontWeight: '700',
                  cursor: extracting || !rawEmail.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: extracting || !rawEmail.trim() ? 'none' : '0 4px 16px rgba(234,150,0,0.28)',
                  transition: 'all 0.16s',
                }}>
                  {extracting ? (<><svg style={{ animation: 'spin 1s linear infinite' }} width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>Extracting with GPT-4o...</>) : '⚡ Extract Details →'}
                </button>
              </div>
            </div>
          )}

          {/* Extracted success */}
          {extracted && (
            <div style={{ marginBottom: '16px', padding: '11px 14px', background: 'rgba(0,102,0,0.08)', border: '1px solid rgba(34,197,94,0.20)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span>
              <span style={{ color: '#006600', fontSize: '13px', fontWeight: '700' }}>AI Quick Fill complete — review and edit the fields below if needed</span>
              <button onClick={() => { setExtracted(false); setFillMode('ai'); }} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(0,0,0,0.38)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>Redo</button>
            </div>
          )}

          {/* ── MANUAL FORM ── */}
          {fillMode === 'manual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* EMAIL DETAILS PANEL */}
              <div style={{
                borderRadius: '16px', padding: '0',
                background: 'rgba(18,26,18,0.92)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
                position: 'relative', overflow: 'hidden', display: 'flex',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.22), transparent)' }} />
                <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #22c55e, #15803d)', opacity: 0.65, borderRadius: '16px 0 0 16px' }} />

                <div style={{ flex: 1, padding: '20px 20px 20px 16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '3px', height: '14px', borderRadius: '2px', background: '#22c55e' }} />
                      <span style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>Email Details</span>
                    </div>
                    {!extracted && (
                      <button onClick={() => setFillMode(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.30)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>← Change method</button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.42)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Sender email <span style={{ color: '#BB0000' }}>*</span></label>
                      <input value={form.senderEmail} onChange={e => handleChange('senderEmail', e.target.value)} placeholder="e.g. security@kcb-alerts.net" style={{ ...inputStyle(form.senderEmail), fontFamily: 'monospace' }}/>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.42)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Subject line <span style={{ color: '#BB0000' }}>*</span></label>
                      <input value={form.subjectLine} onChange={e => handleChange('subjectLine', e.target.value)} placeholder="e.g. URGENT: Verify your account now" style={inputStyle(form.subjectLine)}/>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.42)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Suspicious links or URLs</label>
                    <input value={form.suspiciousLinks} onChange={e => handleChange('suspiciousLinks', e.target.value)} placeholder="e.g. http://kcb-secure-login.net/verify" style={{ ...inputStyle(false), fontFamily: 'monospace' }}/>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.42)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.09em' }}>What did the email ask you to do? <span style={{ color: '#BB0000' }}>*</span></label>
                    <textarea value={form.emailDescription} onChange={e => handleChange('emailDescription', e.target.value)} placeholder="e.g. Click a link to verify my password, transfer funds urgently, provide my M-Pesa PIN..." style={{ ...inputStyle(form.emailDescription), resize: 'none', minHeight: '80px', lineHeight: '1.65' }}/>
                  </div>

                  {/* ── EMAIL HEADER — amber themed, very visible ── */}
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(234,150,0,0.35)', background: 'rgba(20,14,0,0.60)' }}>
                    <div
                      onClick={() => setShowHeaderInfo(!showHeaderInfo)}
                      style={{ padding: '13px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(234,150,0,0.10)', transition: 'background 0.14s' }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(234,150,0,0.16)'}
                      onMouseOut={e => e.currentTarget.style.background = 'rgba(234,150,0,0.10)'}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'rgba(234,150,0,0.20)', border: '1px solid rgba(234,150,0,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📋</div>
                        <div>
                          <div style={{ color: '#ffd166', fontWeight: '800', fontSize: '13px', marginBottom: '2px' }}>Email Header</div>
                          <div style={{ color: 'rgba(255,210,100,0.55)', fontSize: '11px' }}>
                            {form.emailHeader ? '✓ Header provided — click to edit' : 'Optional — greatly improves threat detection accuracy'}
                          </div>
                        </div>
                        {form.emailHeader && (
                          <div style={{ padding: '2px 8px', borderRadius: '5px', background: 'rgba(34,197,94,0.16)', border: '1px solid rgba(34,197,94,0.32)', fontSize: '9px', fontWeight: '800', color: '#4ade80', letterSpacing: '0.07em' }}>PROVIDED</div>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', background: 'rgba(234,150,0,0.18)', color: '#ffd166', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', border: '1px solid rgba(234,150,0,0.30)' }}>Optional</span>
                        <span style={{ color: 'rgba(255,210,100,0.50)', fontSize: '14px', transform: showHeaderInfo ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'block' }}>▾</span>
                      </div>
                    </div>

                    {showHeaderInfo && (
                      <div style={{ padding: '16px', borderTop: '1px solid rgba(234,150,0,0.22)' }}>
                        <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0,0,0,0.30)', border: '1px solid rgba(234,150,0,0.18)', marginBottom: '14px' }}>
                          <div style={{ color: '#ffd166', fontWeight: '800', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>💡 How to find your email header</div>
                          {[
                            { app: 'Gmail',      steps: 'Open email → Click ⋮ (3 dots) top right → "Show original" → Copy the text at the top' },
                            { app: 'Outlook',    steps: 'Open email → File → Properties → Copy text from "Internet headers" box' },
                            { app: 'Apple Mail', steps: 'Open email → View menu → Message → All Headers → Copy the header text' },
                          ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: i < 2 ? '8px' : '0', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                              <span style={{ fontSize: '10px', fontWeight: '800', color: '#111', background: '#ffd166', padding: '2px 7px', borderRadius: '4px', flexShrink: 0, height: 'fit-content', marginTop: '1px' }}>{item.app}</span>
                              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.72)', lineHeight: '1.6', fontWeight: '500' }}>{item.steps}</span>
                            </div>
                          ))}
                        </div>

                        <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: 'rgba(255,210,100,0.60)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Paste email header here</label>
                        <textarea
                          value={form.emailHeader}
                          onChange={e => handleChange('emailHeader', e.target.value)}
                          placeholder={'Received: from mail.suspicious.com (192.168.1.1)\nDate: Mon, 20 Apr 2026 08:32:11 +0300\nFrom: "KCB Bank" <security@kcb-alerts.net>\nSubject: URGENT: Verify your account\nMessage-ID: <abc123@suspicious.com>'}
                          style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.07)',
                            border: form.emailHeader ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(234,150,0,0.35)',
                            borderRadius: '10px',
                            color: 'rgba(255,255,255,0.90)',
                            padding: '13px 14px', fontSize: '12px',
                            outline: 'none', resize: 'vertical', minHeight: '110px',
                            boxSizing: 'border-box', lineHeight: '1.7',
                            fontFamily: 'monospace', transition: 'border 0.18s',
                          }}
                        />
                        <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(255,210,100,0.45)', fontWeight: '500' }}>
                          The email header reveals routing info, sender IP addresses and authentication failures that help identify phishing.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── DID YOU CLICK — fully dark, tile card style ── */}
              <div style={{
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
              }}>

                {/* Section header */}
                <div style={{
                  padding: '15px 20px',
                  background: 'rgba(22,10,10,0.95)',
                  borderBottom: '1px solid rgba(187,0,0,0.22)',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(187,0,0,0.18)', border: '1px solid rgba(187,0,0,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>🖱️</div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '14px', marginBottom: '2px' }}>Did you interact with the email?</div>
                    <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '12px' }}>Select one option below — required <span style={{ color: '#BB0000' }}>*</span></div>
                  </div>
                  {!form.clickedAnything && (
                    <div style={{ marginLeft: 'auto', padding: '4px 11px', borderRadius: '6px', background: 'rgba(187,0,0,0.14)', border: '1px solid rgba(187,0,0,0.28)', fontSize: '10px', fontWeight: '800', color: '#ff8080', letterSpacing: '0.07em' }}>NOT SELECTED</div>
                  )}
                  {form.clickedAnything && (
                    <div style={{ marginLeft: 'auto', padding: '4px 11px', borderRadius: '6px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.28)', fontSize: '10px', fontWeight: '800', color: '#4ade80', letterSpacing: '0.07em' }}>✓ SELECTED</div>
                  )}
                </div>

                {/* Tile options */}
                <div style={{
                  padding: '16px',
                  background: 'rgba(16,22,16,0.96)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                }}>
                  {clickedOptions.map(opt => {
                    const active = form.clickedAnything === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleChange('clickedAnything', opt.value)}
                        style={{
                          padding: '16px 10px 14px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px',
                          border: active
                            ? opt.safe ? '1.5px solid rgba(34,197,94,0.60)' : '1.5px solid rgba(187,0,0,0.55)'
                            : '1px solid rgba(255,255,255,0.10)',
                          background: active
                            ? opt.safe ? 'rgba(0,102,0,0.25)' : 'rgba(187,0,0,0.20)'
                            : 'rgba(255,255,255,0.05)',
                          transition: 'all 0.18s',
                          boxShadow: active
                            ? opt.safe ? '0 4px 20px rgba(0,102,0,0.22)' : '0 4px 20px rgba(187,0,0,0.22)'
                            : 'none',
                        }}
                        onMouseOver={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
                        onMouseOut={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>

                        {/* Icon box */}
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '11px',
                          background: active
                            ? opt.safe ? 'rgba(34,197,94,0.22)' : 'rgba(187,0,0,0.25)'
                            : 'rgba(255,255,255,0.08)',
                          border: active
                            ? opt.safe ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(187,0,0,0.45)'
                            : '1px solid rgba(255,255,255,0.12)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '18px', transition: 'all 0.18s',
                        }}>
                          {opt.icon}
                        </div>

                        {/* Label */}
                        <div style={{
                          fontWeight: '800', fontSize: '13px', lineHeight: '1.2',
                          color: active
                            ? opt.safe ? '#4ade80' : '#ff8080'
                            : 'rgba(255,255,255,0.82)',
                        }}>
                          {opt.label}
                        </div>

                        {/* Sub */}
                        <div style={{
                          fontSize: '10px', lineHeight: '1.45', fontWeight: '500',
                          color: active
                            ? opt.safe ? 'rgba(74,222,128,0.65)' : 'rgba(255,128,128,0.65)'
                            : 'rgba(255,255,255,0.38)',
                        }}>
                          {opt.sub}
                        </div>

                        {/* Selected dot */}
                        {active && (
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: opt.safe ? '#22c55e' : '#BB0000',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '10px', color: '#fff', fontWeight: '900',
                          }}>✓</div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Advice panel */}
                {form.clickedAnything && !clickedOptions.find(o => o.value === form.clickedAnything)?.safe && (
                  <div style={{
                    margin: '0 16px 16px', padding: '14px 16px',
                    background: 'rgba(60,0,0,0.35)',
                    border: '1px solid rgba(187,0,0,0.28)',
                    borderLeft: '4px solid #BB0000',
                    borderRadius: '10px',
                  }}>
                    <div style={{ color: '#ff8080', fontWeight: '800', fontSize: '11px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>⚠ Do this immediately:</div>
                    {getClickedAdvice(form.clickedAnything).map((tip, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: i < getClickedAdvice(form.clickedAnything).length - 1 ? '5px' : '0' }}>
                        <span style={{ color: '#BB0000', fontSize: '10px', marginTop: '2px', flexShrink: 0 }}>▸</span>
                        <span style={{ fontSize: '12px', color: 'rgba(255,200,200,0.75)', lineHeight: '1.55' }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
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