import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const ReportStep3 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();

  const [fillMode, setFillMode] = useState(null); // 'ai' | 'manual' | null
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
  const [showClickedWarning, setShowClickedWarning] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    updateReport({ [field]: value });
    if (field === 'clickedAnything' && value !== 'no') {
      setShowClickedWarning(true);
    } else if (field === 'clickedAnything') {
      setShowClickedWarning(false);
    }
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
      console.error('Quick fill error:', err);
    } finally {
      setExtracting(false);
    }
  };

  const isValid = form.senderEmail && form.subjectLine && form.emailDescription;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0'
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, transparent)' }}></div>
        <div style={{ padding: '20px 40px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: i === 3 ? '28px' : '20px', height: '4px', borderRadius: '2px',
                background: i < 3 ? '#006600' : i === 3 ? '#BB0000' : 'rgba(255,255,255,0.08)',
                transition: 'all 0.3s'
              }}></div>
            ))}
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Step 3 of 4
            </span>
          </div>
          <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '22px', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Tell us about the suspicious email
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
            Choose how you would like to fill in the details below.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 40px' }}>
        <div style={{ maxWidth: '760px' }}>

          {/* Mode selector */}
          {!fillMode && (
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                fontSize: '12px', fontWeight: '600',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '14px'
              }}>
                How would you like to fill in the details?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

                {/* AI Quick Fill */}
                <div
                  onClick={() => setFillMode('ai')}
                  style={{
                    borderRadius: '16px', padding: '24px',
                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(234,150,0,0.15), rgba(234,150,0,0.06))',
                    border: '1px solid rgba(234,150,0,0.4)',
                    boxShadow: '0 4px 24px rgba(234,150,0,0.12)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(234,150,0,0.2)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(234,150,0,0.12)'; }}>

                  {/* Recommended badge */}
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(234,150,0,0.25)',
                    border: '1px solid rgba(234,150,0,0.4)',
                    borderRadius: '20px', padding: '2px 10px',
                    fontSize: '10px', fontWeight: '700',
                    color: '#ffd166', letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}>
                    Recommended
                  </div>

                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(234,150,0,0.2)',
                    border: '1px solid rgba(234,150,0,0.3)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '22px', marginBottom: '14px'
                  }}>⚡</div>

                  <div style={{ color: '#ffd166', fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>
                    AI Quick Fill
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: '1.6' }}>
                    Paste the full email — GPT-4o automatically extracts all the details in seconds.
                  </div>
                </div>

                {/* Manual Fill */}
                <div
                  onClick={() => setFillMode('manual')}
                  style={{
                    borderRadius: '16px', padding: '24px',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>

                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '22px', marginBottom: '14px'
                  }}>✍️</div>

                  <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>
                    Fill Manually
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: '1.6' }}>
                    Enter the email details yourself field by field at your own pace.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Quick Fill mode */}
          {fillMode === 'ai' && !extracted && (
            <div style={{
              borderRadius: '16px', marginBottom: '20px', overflow: 'hidden',
              border: '1px solid rgba(234,150,0,0.4)',
              background: 'linear-gradient(135deg, rgba(234,150,0,0.1), rgba(234,150,0,0.04))'
            }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid rgba(234,150,0,0.2)',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <span style={{ fontSize: '18px' }}>⚡</span>
                <span style={{ color: '#ffd166', fontWeight: '700', fontSize: '15px' }}>AI Quick Fill</span>
                <button
                  onClick={() => setFillMode(null)}
                  style={{
                    marginLeft: 'auto', background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.3)', fontSize: '12px',
                    cursor: 'pointer', textDecoration: 'underline'
                  }}>
                  ← Change method
                </button>
              </div>
              <div style={{ padding: '20px' }}>
                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.5)', marginBottom: '10px',
                  textTransform: 'uppercase', letterSpacing: '0.07em'
                }}>
                  Paste the full email content here
                </label>
                <textarea
                  value={rawEmail}
                  onChange={e => setRawEmail(e.target.value)}
                  placeholder="Paste everything — from, subject, body, links...&#10;&#10;GPT-4o will extract all the details automatically."
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(234,150,0,0.2)',
                    borderRadius: '12px', color: '#ffffff',
                    padding: '16px', fontSize: '13px', outline: 'none',
                    resize: 'none', lineHeight: '1.7', minHeight: '150px',
                    boxSizing: 'border-box', fontFamily: 'monospace'
                  }}
                  autoFocus
                />
                {extractError && (
                  <div style={{
                    marginTop: '8px', padding: '8px 12px',
                    background: 'rgba(187,0,0,0.1)',
                    border: '1px solid rgba(187,0,0,0.2)',
                    borderRadius: '8px', color: '#ff8080', fontSize: '12px'
                  }}>
                    {extractError}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    onClick={doQuickFill}
                    disabled={extracting || !rawEmail.trim()}
                    style={{
                      background: extracting || !rawEmail.trim()
                        ? '#333'
                        : 'linear-gradient(135deg, #ea9600, #cc7a00)',
                      color: '#fff', border: 'none',
                      borderRadius: '10px', padding: '12px 24px',
                      fontSize: '14px', fontWeight: '700',
                      cursor: extracting || !rawEmail.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      boxShadow: extracting || !rawEmail.trim() ? 'none' : '0 4px 16px rgba(234,150,0,0.3)'
                    }}>
                    {extracting ? (
                      <>
                        <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        Extracting with GPT-4o...
                      </>
                    ) : (
                      '⚡ Extract Details →'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Extracted success */}
          {extracted && (
            <div style={{
              marginBottom: '20px', padding: '12px 16px',
              background: 'rgba(0,102,0,0.1)',
              border: '1px solid rgba(0,102,0,0.3)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <span>✅</span>
              <span style={{ color: '#69db7c', fontSize: '13px', fontWeight: '600' }}>
                AI Quick Fill complete — review and edit the fields below if needed
              </span>
              <button
                onClick={() => { setExtracted(false); setFillMode('ai'); }}
                style={{
                  marginLeft: 'auto', background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.3)', fontSize: '12px',
                  cursor: 'pointer', textDecoration: 'underline'
                }}>
                Redo
              </button>
            </div>
          )}

          {/* Manual form fields */}
          {fillMode === 'manual' && (
            <div style={{
              borderRadius: '16px', padding: '24px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '20px'
              }}>
                <div style={{
                  fontSize: '12px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase', letterSpacing: '0.08em'
                }}>
                  Email Details
                </div>
                {!extracted && (
                  <button
                    onClick={() => setFillMode(null)}
                    style={{
                      background: 'none', border: 'none',
                      color: 'rgba(255,255,255,0.3)', fontSize: '12px',
                      cursor: 'pointer', textDecoration: 'underline'
                    }}>
                    ← Change method
                  </button>
                )}
              </div>

              {/* Sender + Subject */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                    Sender email address <span style={{ color: '#BB0000' }}>*</span>
                  </label>
                  <input
                    value={form.senderEmail}
                    onChange={e => handleChange('senderEmail', e.target.value)}
                    placeholder="e.g. security@kcb-alerts.net"
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.05)',
                      border: form.senderEmail ? '1px solid rgba(0,102,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px', color: '#ffffff',
                      padding: '12px 14px', fontSize: '13px',
                      outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                    Email subject line <span style={{ color: '#BB0000' }}>*</span>
                  </label>
                  <input
                    value={form.subjectLine}
                    onChange={e => handleChange('subjectLine', e.target.value)}
                    placeholder="e.g. URGENT: Verify your account now"
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.05)',
                      border: form.subjectLine ? '1px solid rgba(0,102,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px', color: '#ffffff',
                      padding: '12px 14px', fontSize: '13px',
                      outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Links */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Any suspicious links or URLs
                </label>
                <input
                  value={form.suspiciousLinks}
                  onChange={e => handleChange('suspiciousLinks', e.target.value)}
                  placeholder="e.g. http://kcb-secure-login.net/verify"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', color: '#ffffff',
                    padding: '12px 14px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace'
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  What did the email ask you to do? <span style={{ color: '#BB0000' }}>*</span>
                </label>
                <textarea
                  value={form.emailDescription}
                  onChange={e => handleChange('emailDescription', e.target.value)}
                  placeholder="e.g. Click a link to verify my password, transfer funds urgently, provide my M-Pesa PIN..."
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)',
                    border: form.emailDescription ? '1px solid rgba(0,102,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', color: '#ffffff',
                    padding: '12px 14px', fontSize: '13px',
                    outline: 'none', resize: 'none',
                    minHeight: '90px', boxSizing: 'border-box', lineHeight: '1.65'
                  }}
                />
              </div>

              {/* Did you click */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Did you click any links or open any attachments?
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { value: 'no', label: '✓ No, I did not' },
                    { value: 'link', label: 'Yes, I clicked a link' },
                    { value: 'attachment', label: 'Yes, I opened an attachment' },
                    { value: 'both', label: 'Yes, both' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleChange('clickedAnything', opt.value)}
                      style={{
                        padding: '8px 14px', borderRadius: '8px',
                        fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                        background: form.clickedAnything === opt.value
                          ? opt.value === 'no' ? 'rgba(0,102,0,0.2)' : 'rgba(187,0,0,0.2)'
                          : 'rgba(255,255,255,0.04)',
                        color: form.clickedAnything === opt.value
                          ? opt.value === 'no' ? '#69db7c' : '#ff8080'
                          : 'rgba(255,255,255,0.45)',
                        border: form.clickedAnything === opt.value
                          ? `1px solid ${opt.value === 'no' ? 'rgba(0,102,0,0.4)' : 'rgba(187,0,0,0.4)'}`
                          : '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s'
                      }}>
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Clicked warning */}
                {showClickedWarning && (
                  <div style={{
                    marginTop: '12px', padding: '14px 16px',
                    background: 'rgba(187,0,0,0.1)',
                    border: '1px solid rgba(187,0,0,0.3)',
                    borderRadius: '10px'
                  }}>
                    <div style={{ color: '#ff8080', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>
                      ⚠ Important — do this immediately:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[
                        'Do NOT enter any credentials on any page that opened',
                        'Close the browser tab or window immediately',
                        'Do NOT download or open any files that may have downloaded',
                        'Report this to your IT team in addition to this submission',
                        'Change your passwords if you entered any credentials'
                      ].map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: '#BB0000', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>▸</span>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.5' }}>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Email header — optional */}
              <div style={{
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div
                  onClick={() => setShowHeaderInfo(!showHeaderInfo)}
                  style={{
                    padding: '12px 16px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '14px' }}>📋</span>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600' }}>
                        Email Header
                      </span>
                      <span style={{
                        marginLeft: '8px', fontSize: '10px',
                        background: 'rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.35)',
                        padding: '2px 7px', borderRadius: '4px'
                      }}>
                        Optional
                      </span>
                    </div>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', transition: 'transform 0.2s', transform: showHeaderInfo ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
                </div>

                {showHeaderInfo && (
                  <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {/* How to get header */}
                    <div style={{
                      padding: '14px', borderRadius: '10px',
                      background: 'rgba(234,150,0,0.07)',
                      border: '1px solid rgba(234,150,0,0.15)',
                      marginBottom: '14px'
                    }}>
                      <div style={{ color: '#ffd166', fontWeight: '700', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        💡 How to find your email header
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {[
                          { app: 'Gmail', steps: 'Open the email → Click the 3 dots (⋮) → Click "Show original" → Copy all the text at the top' },
                          { app: 'Outlook', steps: 'Open the email → Click File → Properties → Copy the text in "Internet headers"' },
                          { app: 'Apple Mail', steps: 'Open the email → Click View menu → Message → All Headers → Copy the header text' }
                        ].map((item, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px' }}>
                            <span style={{
                              fontSize: '11px', fontWeight: '700', color: '#ffd166',
                              background: 'rgba(234,150,0,0.15)',
                              padding: '1px 7px', borderRadius: '4px',
                              flexShrink: 0, height: 'fit-content', marginTop: '1px'
                            }}>{item.app}</span>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>
                              {item.steps}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                      Paste email header here (optional — helps our analysis)
                    </label>
                    <textarea
                      value={form.emailHeader}
                      onChange={e => handleChange('emailHeader', e.target.value)}
                      placeholder="Received: from mail.suspicious.com&#10;X-Originating-IP: 192.168.1.1&#10;From: security@kcb-alerts.net&#10;..."
                      style={{
                        width: '100%', background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '10px', color: 'rgba(255,255,255,0.7)',
                        padding: '12px 14px', fontSize: '11px',
                        outline: 'none', resize: 'none',
                        minHeight: '100px', boxSizing: 'border-box',
                        lineHeight: '1.6', fontFamily: 'monospace'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <NextStrip
        steps={['Phishing Email', reportData.department || 'Department', 'Email Details', 'Submit']}
        currentStep={2}
        onNext={handleNext}
        nextLabel="Next: Review & Submit →"
        nextDisabled={!isValid || !fillMode}
      />
    </div>
  );
};

export default ReportStep3;