import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const ReportStep3 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();

  const [form, setForm] = useState({
    senderEmail: reportData.senderEmail || '',
    subjectLine: reportData.subjectLine || '',
    suspiciousLinks: reportData.suspiciousLinks || '',
    emailDescription: reportData.emailDescription || '',
    clickedAnything: reportData.clickedAnything || 'no'
  });

  const [showQuickFill, setShowQuickFill] = useState(false);
  const [rawEmail, setRawEmail] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');
  const [extracted, setExtracted] = useState(false);

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
      setShowQuickFill(false);
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
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0'
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, transparent)' }}></div>
        <div style={{ padding: '20px 40px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: i === 3 ? '28px' : '20px',
                height: '4px', borderRadius: '2px',
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
            Fill in the details manually or use AI Quick Fill to extract everything automatically.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 40px' }}>
        <div style={{ maxWidth: '760px' }}>

          {/* AI QUICK FILL — prominent card at top */}
          <div style={{
            borderRadius: '16px', marginBottom: '28px', overflow: 'hidden',
            border: '1px solid rgba(187,0,0,0.4)',
            background: 'linear-gradient(135deg, rgba(187,0,0,0.12), rgba(187,0,0,0.05))',
            boxShadow: '0 4px 24px rgba(187,0,0,0.15)'
          }}>
            {/* Quick fill header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: showQuickFill ? '1px solid rgba(187,0,0,0.2)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(187,0,0,0.25)',
                  border: '1px solid rgba(187,0,0,0.4)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px'
                }}>⚡</div>
                <div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px', marginBottom: '2px' }}>
                    AI Quick Fill
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>
                    Paste your email — GPT-4o extracts all details automatically
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowQuickFill(!showQuickFill)}
                style={{
                  background: showQuickFill ? 'rgba(255,255,255,0.08)' : '#BB0000',
                  color: '#fff', border: 'none',
                  borderRadius: '10px', padding: '10px 18px',
                  fontSize: '13px', fontWeight: '700',
                  cursor: 'pointer', transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={e => { if (!showQuickFill) e.currentTarget.style.background = '#990000'; }}
                onMouseOut={e => { if (!showQuickFill) e.currentTarget.style.background = '#BB0000'; }}>
                {showQuickFill ? 'Cancel' : 'Use AI Quick Fill →'}
              </button>
            </div>

            {/* Quick fill paste area */}
            {showQuickFill && (
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
                  placeholder="Paste everything — headers, subject line, body, links, sender address...&#10;&#10;GPT-4o will automatically extract all the relevant details for you."
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', color: '#ffffff',
                    padding: '16px', fontSize: '13px',
                    outline: 'none', resize: 'none',
                    lineHeight: '1.7', minHeight: '140px',
                    boxSizing: 'border-box',
                    fontFamily: 'monospace'
                  }}
                  autoFocus
                />
                {extractError && (
                  <div style={{
                    marginTop: '8px', padding: '8px 12px',
                    background: 'rgba(187,0,0,0.1)',
                    border: '1px solid rgba(187,0,0,0.2)',
                    borderRadius: '8px',
                    color: '#ff8080', fontSize: '12px'
                  }}>
                    {extractError}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    onClick={doQuickFill}
                    disabled={extracting || !rawEmail.trim()}
                    style={{
                      background: extracting || !rawEmail.trim() ? '#333' : '#BB0000',
                      color: '#fff', border: 'none',
                      borderRadius: '10px', padding: '12px 24px',
                      fontSize: '14px', fontWeight: '700',
                      cursor: extracting || !rawEmail.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px'
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
            )}

            {/* Success state */}
            {extracted && !showQuickFill && (
              <div style={{
                padding: '12px 20px',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <span style={{ fontSize: '14px' }}>✅</span>
                <span style={{ fontSize: '13px', color: '#69db7c', fontWeight: '600' }}>
                  AI Quick Fill complete — fields populated below
                </span>
                <button
                  onClick={() => { setExtracted(false); setShowQuickFill(true); }}
                  style={{
                    marginLeft: 'auto', background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.3)', fontSize: '12px',
                    cursor: 'pointer', textDecoration: 'underline'
                  }}>
                  Redo
                </button>
              </div>
            )}
          </div>

          {/* Manual fields */}
          <div style={{
            borderRadius: '16px', padding: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{
              fontSize: '12px', fontWeight: '600',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '20px'
            }}>
              Email Details
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.5)', marginBottom: '8px'
                }}>
                  Sender email address <span style={{ color: '#BB0000' }}>*</span>
                </label>
                <input
                  value={form.senderEmail}
                  onChange={e => handleChange('senderEmail', e.target.value)}
                  placeholder="e.g. security@kcb-alerts.net"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: form.senderEmail ? '1px solid rgba(0,102,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', color: '#ffffff',
                    padding: '12px 14px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.5)', marginBottom: '8px'
                }}>
                  Email subject line <span style={{ color: '#BB0000' }}>*</span>
                </label>
                <input
                  value={form.subjectLine}
                  onChange={e => handleChange('subjectLine', e.target.value)}
                  placeholder="e.g. URGENT: Verify your account now"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: form.subjectLine ? '1px solid rgba(0,102,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', color: '#ffffff',
                    padding: '12px 14px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: '600',
                color: 'rgba(255,255,255,0.5)', marginBottom: '8px'
              }}>
                Any suspicious links or URLs
              </label>
              <input
                value={form.suspiciousLinks}
                onChange={e => handleChange('suspiciousLinks', e.target.value)}
                placeholder="e.g. http://kcb-secure-login.net/verify"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', color: '#ffffff',
                  padding: '12px 14px', fontSize: '13px',
                  outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: '600',
                color: 'rgba(255,255,255,0.5)', marginBottom: '8px'
              }}>
                What did the email ask you to do? <span style={{ color: '#BB0000' }}>*</span>
              </label>
              <textarea
                value={form.emailDescription}
                onChange={e => handleChange('emailDescription', e.target.value)}
                placeholder="e.g. Click a link to verify my password, transfer funds urgently, provide my M-Pesa PIN..."
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: form.emailDescription ? '1px solid rgba(0,102,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', color: '#ffffff',
                  padding: '12px 14px', fontSize: '13px',
                  outline: 'none', resize: 'none',
                  minHeight: '90px', boxSizing: 'border-box',
                  lineHeight: '1.65'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: '600',
                color: 'rgba(255,255,255,0.5)', marginBottom: '8px'
              }}>
                Did you click any links or open any attachments?
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { value: 'no', label: 'No, I did not click anything' },
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
            </div>
          </div>
        </div>
      </div>

      <NextStrip
        steps={['Phishing Email', reportData.department || 'Department', 'Email Details', 'Submit']}
        currentStep={2}
        onNext={handleNext}
        nextLabel="Next: Review & Submit →"
        nextDisabled={!isValid}
      />
    </div>
  );
};

export default ReportStep3;