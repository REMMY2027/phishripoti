import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const ReportStep4 = () => {
  const navigate = useNavigate();
  const { reportData, setResult } = useReport();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      navigate('/processing');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reports/submit`,
        {
          senderEmail: reportData.senderEmail,
          subjectLine: reportData.subjectLine,
          suspiciousLinks: reportData.suspiciousLinks,
          emailDescription: reportData.emailDescription,
          emailHeader: reportData.emailHeader,
          clickedAnything: reportData.clickedAnything,
          department: reportData.department,
        },
        { timeout: 60000 }
      );
      setResult(response.data);
      navigate('/result');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      navigate('/report/step4');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clickedLabel = () => {
    if (reportData.clickedAnything === 'no') return 'No — did not click anything';
    if (reportData.clickedAnything === 'link') return 'Yes — clicked a link';
    if (reportData.clickedAnything === 'attachment') return 'Yes — opened an attachment';
    if (reportData.clickedAnything === 'both') return 'Yes — clicked a link and opened an attachment';
    return 'Not specified';
  };

  const rows = [
    { label: 'Incident type',    value: 'Phishing Email',                         color: 'rgba(255,255,255,0.88)' },
    { label: 'Department',       value: reportData.department || '—',              color: 'rgba(255,255,255,0.88)' },
    { label: 'Sender email',     value: reportData.senderEmail || '—',             color: '#ff8080', mono: true },
    { label: 'Subject line',     value: reportData.subjectLine || '—',             color: 'rgba(255,255,255,0.88)' },
    { label: 'Clicked anything', value: clickedLabel(),                            color: reportData.clickedAnything === 'no' ? '#4ade80' : '#ff8080' },
    { label: 'Email header',     value: reportData.emailHeader ? 'Provided ✓' : 'Not provided', color: reportData.emailHeader ? '#4ade80' : 'rgba(255,255,255,0.38)' },
  ];

  // Parse suspicious links into array
  const links = reportData.suspiciousLinks
    ? reportData.suspiciousLinks.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUND — identical to Step1/2/3 ── */}
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
        <div style={{ maxWidth: '680px', width: '100%' }}>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: '3px', borderRadius: '2px', width: '28px', background: i < 4 ? '#006600' : '#BB0000' }} />
            ))}
            <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', marginLeft: '6px', fontWeight: '600' }}>Step 4 of 4</span>
          </div>

          {/* Headline */}
          <div style={{ position: 'relative', marginBottom: '22px' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '-4px', fontSize: '72px', fontWeight: '900', color: 'transparent', WebkitTextStroke: '1px rgba(187,0,0,0.06)', letterSpacing: '-4px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>SUBMIT</div>
            <h2 style={{ position: 'relative', zIndex: 1, fontWeight: '900', fontSize: '24px', margin: '0 0 7px', letterSpacing: '-0.5px', color: '#111111' }}>
              Review and{' '}
              <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #BB0000 0%, #8B0000 45%, #006600 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>submit</span>
              {' '}your report
            </h2>
            <p style={{ position: 'relative', zIndex: 1, color: 'rgba(0,0,0,0.45)', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
              Your submission is fully anonymous. No identity fields are collected or stored.
            </p>
          </div>

          {/* ── REPORT SUMMARY CARD ── */}
          <div style={{
            borderRadius: '16px', padding: '0', marginBottom: '14px',
            background: 'rgba(18,26,18,0.92)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
            position: 'relative', overflow: 'hidden', display: 'flex',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }} />
            <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #BB0000, #7a0000)', opacity: 0.80, borderRadius: '16px 0 0 16px' }} />

            <div style={{ flex: 1, padding: '20px 20px 20px 16px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '3px', height: '14px', borderRadius: '2px', background: '#BB0000' }} />
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>Report Summary</span>
              </div>

              {/* Summary rows */}
              {rows.map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '10px 0',
                  borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  gap: '16px',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>{row.label}</span>
                  <span style={{
                    fontSize: '12px', fontWeight: '700', textAlign: 'right',
                    color: row.color,
                    fontFamily: row.mono ? 'monospace' : 'inherit',
                    wordBreak: 'break-all', maxWidth: '420px',
                  }}>{row.value}</span>
                </div>
              ))}

              {/* ── SUSPICIOUS LINKS — each on own row ── */}
              {links.length > 0 && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <div style={{ width: '3px', height: '12px', borderRadius: '2px', background: '#BB0000' }} />
                    <span style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Suspicious Links Submitted</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {links.map((link, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '9px 12px', borderRadius: '9px',
                        background: 'rgba(187,0,0,0.10)',
                        border: '1px solid rgba(187,0,0,0.20)',
                      }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#BB0000', flexShrink: 0 }} />
                        <span style={{
                          fontSize: '12px', fontFamily: 'monospace',
                          color: '#ff8080', wordBreak: 'break-all',
                          lineHeight: '1.5', fontWeight: '600',
                        }}>{link}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No links */}
              {links.length === 0 && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '9px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.20)', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', fontWeight: '500' }}>No suspicious links submitted</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Email description preview */}
          {reportData.emailDescription && (
            <div style={{
              borderRadius: '16px', padding: '0', marginBottom: '14px',
              background: 'rgba(18,26,18,0.92)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
              position: 'relative', overflow: 'hidden', display: 'flex',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '16px' }} />
              <div style={{ width: '5px', flexShrink: 0, background: 'linear-gradient(180deg, #f59e0b, #b45309)', opacity: 0.70, borderRadius: '16px 0 0 16px' }} />
              <div style={{ flex: 1, padding: '18px 18px 18px 14px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '3px', height: '12px', borderRadius: '2px', background: '#f59e0b' }} />
                  <span style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Email Description</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: '1.65', margin: 0, fontWeight: '500' }}>
                  {reportData.emailDescription}
                </p>
              </div>
            </div>
          )}

          {/* ── ANONYMITY NOTICE ── */}
          <div style={{
            borderRadius: '16px', padding: '16px 18px', marginBottom: '16px',
            background: 'rgba(0,102,0,0.08)',
            border: '1px solid rgba(0,102,0,0.20)',
            display: 'flex', alignItems: 'flex-start', gap: '12px',
          }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🛡️</span>
            <div>
              <div style={{ color: '#006600', fontWeight: '800', fontSize: '13px', marginBottom: '4px' }}>Anonymity Protected</div>
              <div style={{ color: 'rgba(0,0,0,0.52)', fontSize: '12px', lineHeight: '1.6', fontWeight: '500' }}>
                No name, email address, IP address, or device fingerprint is collected. Your department is stripped before storage. This report cannot be traced back to you.
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: '11px 14px', marginBottom: '14px', background: 'rgba(187,0,0,0.08)', border: '1px solid rgba(187,0,0,0.22)', borderRadius: '10px', color: '#BB0000', fontSize: '13px', fontWeight: '600' }}>
              {error}
            </div>
          )}

          {/* ── SUBMIT BUTTON ── */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '16px',
              borderRadius: '14px', border: 'none',
              background: loading ? 'rgba(22,30,22,0.70)' : 'linear-gradient(135deg, #BB0000, #8a0000)',
              color: loading ? 'rgba(255,255,255,0.30)' : '#ffffff',
              fontSize: '15px', fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.18s',
              boxShadow: loading ? 'none' : '0 6px 28px rgba(187,0,0,0.35)',
              letterSpacing: '-0.1px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              marginBottom: '8px',
            }}
            onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(187,0,0,0.45)'; } }}
            onMouseOut={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(187,0,0,0.35)'; } }}>
            {loading ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                Analysing your report...
              </>
            ) : (
              <>🔒 Submit Report Anonymously →</>
            )}
          </button>

          <div style={{ textAlign: 'center', color: 'rgba(0,0,0,0.28)', fontSize: '11px', fontWeight: '500' }}>
            Powered by GPT-4o · Google Safe Browsing · End-to-end anonymous
          </div>
        </div>
      </div>

      {/* ── NEXT STRIP ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <NextStrip
          steps={['Phishing Email', reportData.department || 'Department', 'Email Details', 'Submit']}
          currentStep={3}
          rightText="Identity never stored"
        />
      </div>
    </div>
  );
};

export default ReportStep4;