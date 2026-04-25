import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ITReportDetail = () => {
  const navigate = useNavigate();
  const { tokenId } = useParams();
  const { token, manager, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/it/login'); return; }
    fetchReport();
  }, []); // eslint-disable-line

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/reports/${tokenId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReport(response.data);
    } catch (err) {
      setError('Error loading report.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    setUpdating(true);
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/reports/${tokenId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReport(prev => ({ ...prev, status }));
      showToast(
        status === 'resolved' ? 'Report marked as resolved' : 'Report escalated',
        status === 'resolved' ? 'success' : 'warning'
      );
    } catch (err) {
      showToast('Error updating report status', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const riskColor = (level) =>
    level === 'HIGH' ? '#BB0000' : level === 'MEDIUM' ? '#d97706' : '#006600';
  const riskBg = (level) =>
    level === 'HIGH' ? 'rgba(187,0,0,0.09)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.09)' : 'rgba(0,102,0,0.09)';
  const riskBorder = (level) =>
    level === 'HIGH' ? 'rgba(187,0,0,0.22)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.22)' : 'rgba(0,102,0,0.22)';

  // Same palette as dashboard
  const BG = '#d4d9d4';
  const CARD_BG = '#f0f2f0';
  const PANEL_BG = '#f7f8f7';

  const card = {
    borderRadius: '16px',
    background: PANEL_BG,
    border: '1px solid rgba(0,0,0,0.09)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    overflow: 'hidden',
  };

  const SectionHeader = ({ title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <div style={{ width: '4px', height: '16px', borderRadius: '2px', background: '#BB0000' }}/>
      <span style={{ color: '#111111', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG }}>
        <div style={{ textAlign: 'center' }}>
          <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
            width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.10)" strokeWidth="3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: '14px', fontWeight: '600' }}>Loading report...</div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#BB0000', marginBottom: '16px', fontWeight: '700' }}>{error || 'Report not found.'}</div>
          <button onClick={() => navigate('/it/dashboard')} style={{
            background: '#BB0000', color: '#fff', border: 'none',
            borderRadius: '10px', padding: '10px 24px', cursor: 'pointer', fontWeight: '700',
          }}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: BG }}>

      {/* Kenyan flag stripe */}
      <div style={{ height: '4px', display: 'flex', flexShrink: 0 }}>
        <div style={{ flex: 1, background: '#BB0000' }}/>
        <div style={{ flex: 1, background: '#1a1a1a' }}/>
        <div style={{ flex: 1, background: '#006600' }}/>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 36px', height: '68px',
        background: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.09)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 20px rgba(0,0,0,0.09)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'linear-gradient(145deg, #cc0000, #7a0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(187,0,0,0.30)',
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                  fill="rgba(255,255,255,0.95)"/>
              </svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.4px', color: '#111111' }}>
              Phish<span style={{ color: '#006600' }}>Ripoti</span>
            </span>
          </div>
          <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.10)' }}/>
          <span style={{ color: 'rgba(0,0,0,0.40)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
            Report Detail
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {manager && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '7px 13px', borderRadius: '10px',
              background: '#f4f5f4', border: '1px solid rgba(0,0,0,0.09)',
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #006600, #004400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '800', color: '#fff', flexShrink: 0,
              }}>
                {manager.name?.charAt(0).toUpperCase() || 'M'}
              </div>
              <div>
                <div style={{ color: '#111111', fontSize: '12px', fontWeight: '800', lineHeight: 1.3 }}>
                  {manager.name || 'IT Manager'}
                </div>
                <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: '10px', lineHeight: 1.3 }}>
                  {manager.institution || 'Institution'}
                </div>
              </div>
            </div>
          )}
          <button onClick={() => navigate('/it/dashboard')} style={{
            color: 'rgba(0,0,0,0.52)', border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: '8px', padding: '8px 16px', fontSize: '12px',
            background: '#f4f5f4', cursor: 'pointer', fontWeight: '700',
            transition: 'all 0.15s',
          }}
            onMouseOver={e => e.currentTarget.style.background = BG}
            onMouseOut={e => e.currentTarget.style.background = '#f4f5f4'}>
            ← Dashboard
          </button>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px 40px' }}>

        {/* Report header card */}
        <div style={{
          borderRadius: '16px', padding: '22px 24px',
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.09)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          marginBottom: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Left colour bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '5px',
            background: riskColor(report.riskLevel),
          }}/>

          <div style={{ paddingLeft: '12px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'monospace', color: '#111111',
              fontSize: '16px', fontWeight: '800', letterSpacing: '0.08em',
            }}>
              {report.tokenId}
            </span>

            {/* Risk badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 12px', borderRadius: '6px',
              background: riskBg(report.riskLevel),
              border: `1px solid ${riskBorder(report.riskLevel)}`,
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: riskColor(report.riskLevel) }}/>
              <span style={{ fontSize: '11px', fontWeight: '800', color: riskColor(report.riskLevel), letterSpacing: '0.05em' }}>
                {report.riskLevel} RISK
              </span>
            </div>

            {/* Score */}
            <div style={{
              padding: '4px 12px', borderRadius: '6px',
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.09)',
              fontSize: '12px', fontWeight: '800', color: '#111111',
            }}>
              {report.riskScore}% score
            </div>

            {report.alertSent && (
              <div style={{
                padding: '4px 12px', borderRadius: '6px',
                background: 'rgba(187,0,0,0.09)',
                border: '1px solid rgba(187,0,0,0.22)',
                fontSize: '11px', fontWeight: '800', color: '#BB0000',
              }}>⚡ Alert Sent</div>
            )}

            <div style={{
              padding: '4px 12px', borderRadius: '6px',
              background: report.status === 'resolved' ? 'rgba(0,102,0,0.09)' : 'rgba(217,119,6,0.09)',
              border: report.status === 'resolved' ? '1px solid rgba(0,102,0,0.22)' : '1px solid rgba(217,119,6,0.22)',
              fontSize: '11px', fontWeight: '800',
              color: report.status === 'resolved' ? '#006600' : '#d97706',
            }}>
              {report.status === 'resolved' ? '✓ Resolved' : 'Under Review'}
            </div>
          </div>

          <div style={{ color: 'rgba(0,0,0,0.38)', fontSize: '12px', fontWeight: '600' }}>
            {formatDate(report.createdAt)}
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Report details */}
            <div style={{ ...card, padding: '22px' }}>
              <SectionHeader title="Report Details" />
              {[
                { label: 'Incident type', value: report.incidentType },
                { label: 'Department', value: report.department || 'Unknown' },
                { label: 'Sender domain', value: report.senderEmail, mono: true, red: true },
                { label: 'Subject line', value: report.subjectLine },
                {
                  label: 'Clicked anything?',
                  value: report.clickedAnything === 'no' ? 'No'
                    : report.clickedAnything === 'link' ? 'Clicked a link'
                    : report.clickedAnything === 'attachment' ? 'Opened attachment'
                    : 'Link + Attachment',
                  danger: report.clickedAnything !== 'no',
                },
                { label: 'Received', value: formatDate(report.createdAt) },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}>
                  <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>{row.label}</span>
                  <span style={{
                    fontSize: '12px', fontWeight: '700', textAlign: 'right', marginLeft: '16px',
                    color: row.red ? '#BB0000' : row.danger ? '#d97706' : '#111111',
                    fontFamily: row.mono ? 'monospace' : 'inherit',
                    maxWidth: '220px', wordBreak: 'break-all',
                  }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ ...card, padding: '22px' }}>
              <SectionHeader title="Email Description" />
              <div style={{
                color: 'rgba(0,0,0,0.65)', fontSize: '13px',
                lineHeight: '1.7', fontWeight: '500',
              }}>
                {report.emailDescription || 'No description provided.'}
              </div>
            </div>

            {/* Email header */}
            <div style={{ ...card }}>
              <div
                onClick={() => setShowHeader(!showHeader)}
                style={{
                  padding: '16px 20px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'background 0.14s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>📋</span>
                  <span style={{ color: '#111111', fontSize: '13px', fontWeight: '700' }}>Email Header</span>
                  <span style={{
                    fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                    background: report.emailHeader ? 'rgba(0,102,0,0.09)' : 'rgba(0,0,0,0.06)',
                    color: report.emailHeader ? '#006600' : 'rgba(0,0,0,0.38)',
                    border: report.emailHeader ? '1px solid rgba(0,102,0,0.20)' : '1px solid rgba(0,0,0,0.10)',
                    fontWeight: '700',
                  }}>
                    {report.emailHeader ? 'Provided' : 'Not provided'}
                  </span>
                </div>
                <span style={{
                  color: 'rgba(0,0,0,0.30)', fontSize: '13px',
                  transform: showHeader ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s', display: 'block',
                }}>▾</span>
              </div>
              {showHeader && (
                <div style={{
                  padding: '16px 20px',
                  background: 'rgba(0,0,0,0.03)',
                  borderTop: '1px solid rgba(0,0,0,0.07)',
                }}>
                  {report.emailHeader ? (
                    <pre style={{
                      color: 'rgba(0,0,0,0.60)', fontSize: '11px',
                      lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all', fontFamily: 'monospace',
                    }}>
                      {report.emailHeader}
                    </pre>
                  ) : (
                    <div style={{ color: 'rgba(0,0,0,0.38)', fontSize: '13px', fontWeight: '500' }}>
                      No email header was submitted with this report.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Identity notice */}
            <div style={{
              borderRadius: '16px', padding: '18px',
              background: 'rgba(0,102,0,0.07)',
              border: '1px solid rgba(0,102,0,0.18)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>🛡️</span>
                <div>
                  <div style={{ color: '#006600', fontWeight: '800', fontSize: '12px', marginBottom: '4px' }}>
                    Identity Protected
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.52)', fontSize: '12px', lineHeight: '1.6', fontWeight: '500' }}>
                    No identity fields exist in this record. Reporter name, email, IP address, and device fingerprint are never stored.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* GPT-4o analysis */}
            <div style={{
              borderRadius: '16px', padding: '22px',
              background: '#ffffff',
              border: `1px solid ${riskBorder(report.riskLevel)}`,
              boxShadow: `0 2px 12px rgba(0,0,0,0.07)`,
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: riskColor(report.riskLevel),
              }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '4px', height: '16px', borderRadius: '2px', background: riskColor(report.riskLevel) }}/>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#111111', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  GPT-4o Analysis
                </span>
              </div>
              {[
                { label: 'Risk tier', value: report.riskLevel, color: riskColor(report.riskLevel) },
                { label: 'Risk score', value: `${report.riskScore}%`, color: '#111111' },
                { label: 'Domain spoofing', value: report.aiAnalysis?.domainSpoofing ? 'Detected' : 'Not detected', color: report.aiAnalysis?.domainSpoofing ? '#BB0000' : '#006600' },
                { label: 'Urgency language', value: report.aiAnalysis?.urgencyLanguage ? 'High' : 'Low', color: report.aiAnalysis?.urgencyLanguage ? '#d97706' : '#006600' },
                { label: 'Credential harvesting', value: report.aiAnalysis?.credentialHarvesting ? 'Likely' : 'Unlikely', color: report.aiAnalysis?.credentialHarvesting ? '#BB0000' : '#006600' },
                { label: 'M-Pesa abuse', value: report.aiAnalysis?.mpesaAbuse ? 'Detected' : 'Not detected', color: report.aiAnalysis?.mpesaAbuse ? '#BB0000' : '#006600' },
                { label: 'PII stripped', value: 'Confirmed', color: '#006600' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}>
                  <span style={{ color: 'rgba(0,0,0,0.48)', fontSize: '12px', fontWeight: '600' }}>{row.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: row.color }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* AI reasons */}
            {report.aiAnalysis?.reasons?.length > 0 && (
              <div style={{ ...card, padding: '22px' }}>
                <SectionHeader title="Threat Indicators" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {report.aiAnalysis.reasons.map((reason, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      padding: '10px 12px', borderRadius: '9px',
                      background: 'rgba(187,0,0,0.05)',
                      border: '1px solid rgba(187,0,0,0.12)',
                    }}>
                      <span style={{ color: '#BB0000', fontSize: '11px', marginTop: '1px', flexShrink: 0, fontWeight: '800' }}>▸</span>
                      <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: '12px', lineHeight: '1.55', fontWeight: '500' }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended actions */}
            {report.aiAnalysis?.recommendedActions?.length > 0 && (
              <div style={{ ...card, padding: '22px' }}>
                <SectionHeader title="Recommended Actions" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {report.aiAnalysis.recommendedActions.map((action, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      padding: '10px 12px', borderRadius: '9px',
                      background: 'rgba(0,102,0,0.05)',
                      border: '1px solid rgba(0,102,0,0.12)',
                    }}>
                      <span style={{ color: '#006600', fontSize: '11px', marginTop: '1px', flexShrink: 0, fontWeight: '800' }}>✓</span>
                      <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: '12px', lineHeight: '1.55', fontWeight: '500' }}>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Did you know */}
            {report.aiAnalysis?.didYouKnow && (
              <div style={{
                borderRadius: '16px', padding: '18px',
                background: 'rgba(217,119,6,0.07)',
                border: '1px solid rgba(217,119,6,0.20)',
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px' }}>💡</span>
                  <div>
                    <div style={{ color: '#d97706', fontWeight: '800', fontSize: '11px', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Did You Know
                    </div>
                    <div style={{ color: 'rgba(0,0,0,0.60)', fontSize: '12px', lineHeight: '1.65', fontWeight: '500' }}>
                      {report.aiAnalysis.didYouKnow}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Link scan */}
            <div style={{ ...card, padding: '22px' }}>
              <SectionHeader title="Google Safe Browsing — Link Scan" />
              {report.suspiciousLinks?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {report.suspiciousLinks.map((link, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 12px', borderRadius: '9px',
                      background: link.safeBrowsingResult?.isMalicious ? 'rgba(187,0,0,0.05)' : 'rgba(0,102,0,0.05)',
                      border: link.safeBrowsingResult?.isMalicious ? '1px solid rgba(187,0,0,0.14)' : '1px solid rgba(0,102,0,0.14)',
                      gap: '10px',
                    }}>
                      <span style={{ color: 'rgba(0,0,0,0.50)', fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all', fontWeight: '600' }}>
                        {link.url}
                      </span>
                      <span style={{
                        fontSize: '10px', fontWeight: '800', flexShrink: 0,
                        padding: '3px 9px', borderRadius: '5px',
                        background: link.safeBrowsingResult?.isMalicious ? 'rgba(187,0,0,0.12)' : 'rgba(0,102,0,0.12)',
                        color: link.safeBrowsingResult?.isMalicious ? '#BB0000' : '#006600',
                        border: link.safeBrowsingResult?.isMalicious ? '1px solid rgba(187,0,0,0.22)' : '1px solid rgba(0,102,0,0.22)',
                      }}>
                        {link.safeBrowsingResult?.isMalicious ? '⚠ Flagged' : '✓ Clean'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: 'rgba(0,0,0,0.38)', fontSize: '13px', fontWeight: '500' }}>No links submitted</div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleStatusUpdate('under_review')}
                disabled={updating}
                style={{
                  flex: 1, padding: '13px', borderRadius: '12px', fontSize: '13px',
                  fontWeight: '800', cursor: updating ? 'not-allowed' : 'pointer',
                  background: 'rgba(187,0,0,0.08)', color: '#BB0000',
                  border: '1px solid rgba(187,0,0,0.22)', transition: 'all 0.18s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
                onMouseOver={e => { if (!updating) e.currentTarget.style.background = 'rgba(187,0,0,0.14)'; }}
                onMouseOut={e => { if (!updating) e.currentTarget.style.background = 'rgba(187,0,0,0.08)'; }}>
                Escalate Report
              </button>
              <button
                onClick={() => handleStatusUpdate('resolved')}
                disabled={updating}
                style={{
                  flex: 1, padding: '13px', borderRadius: '12px', fontSize: '13px',
                  fontWeight: '800', cursor: updating ? 'not-allowed' : 'pointer',
                  background: 'rgba(0,102,0,0.08)', color: '#006600',
                  border: '1px solid rgba(0,102,0,0.22)', transition: 'all 0.18s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
                onMouseOver={e => { if (!updating) e.currentTarget.style.background = 'rgba(0,102,0,0.14)'; }}
                onMouseOut={e => { if (!updating) e.currentTarget.style.background = 'rgba(0,102,0,0.08)'; }}>
                Mark Resolved
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.09)' }}>
          <button onClick={() => navigate('/it/dashboard')} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: CARD_BG, border: '1px solid rgba(0,0,0,0.10)',
            borderRadius: '9px', padding: '10px 20px',
            color: 'rgba(0,0,0,0.50)', fontSize: '12px', fontWeight: '800',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
            onMouseOver={e => e.currentTarget.style.background = BG}
            onMouseOut={e => e.currentTarget.style.background = CARD_BG}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ITReportDetail;