import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RiskBadge from '../components/RiskBadge';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ITReportDetail = () => {
  const navigate = useNavigate();
  const { tokenId } = useParams();
  const { token, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/it/login'); return; }
    fetchReport();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    hour: '2-digit', minute: '2-digit'
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050d05' }}>
        <svg style={{ animation: 'spin 1s linear infinite' }} width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050d05' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ff8080', marginBottom: '16px' }}>{error || 'Report not found.'}</div>
          <button onClick={() => navigate('/it/dashboard')} style={{
            background: '#BB0000', color: '#fff', border: 'none',
            borderRadius: '10px', padding: '10px 24px', cursor: 'pointer'
          }}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050d05' }}>

      {/* Navbar */}
      <div style={{ height: '3px', display: 'flex' }}>
        <div style={{ flex: 1, background: '#BB0000' }}></div>
        <div style={{ flex: 1, background: '#1A1A1A' }}></div>
        <div style={{ flex: 1, background: '#006600' }}></div>
      </div>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '60px',
        background: 'rgba(5,13,5,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V6L12 2z" fill="#BB0000"/>
            <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '16px' }}>PhishRipoti</span>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Report Detail</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', borderRadius: '20px',
            background: 'rgba(187,0,0,0.12)', border: '1px solid rgba(187,0,0,0.25)'
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#69db7c', boxShadow: '0 0 6px #69db7c' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Admin logged in</span>
          </div>
        </div>
      </nav>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>

        {/* Breadcrumb */}
        <button onClick={() => navigate('/it/dashboard')} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginBottom: '24px', padding: 0
        }}
          onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
          ← Back to Dashboard
        </button>

        {/* Report header */}
        <div style={{
          borderRadius: '16px', padding: '24px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', color: '#ffffff', fontSize: '18px', fontWeight: '700', letterSpacing: '0.1em' }}>
              {report.tokenId}
            </span>
            <RiskBadge level={report.riskLevel}/>
            {report.alertSent && (
              <span style={{
                fontSize: '11px', padding: '3px 10px', borderRadius: '6px',
                background: 'rgba(187,0,0,0.15)', color: '#ff8080',
                border: '1px solid rgba(187,0,0,0.25)'
              }}>⚡ Alert Sent</span>
            )}
            <span style={{
              fontSize: '11px', padding: '3px 10px', borderRadius: '6px',
              background: report.status === 'resolved' ? 'rgba(0,102,0,0.15)' : 'rgba(234,150,0,0.1)',
              color: report.status === 'resolved' ? '#69db7c' : '#ffd166',
              border: report.status === 'resolved' ? '1px solid rgba(0,102,0,0.25)' : '1px solid rgba(234,150,0,0.2)'
            }}>
              {report.status === 'resolved' ? 'Resolved' : 'Under Review'}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '900px' }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Report details */}
            <div style={{ borderRadius: '16px', padding: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Report Details
              </div>
              {[
                { label: 'Incident type', value: report.incidentType },
                { label: 'Sender domain', value: report.senderEmail, mono: true, red: true },
                { label: 'Subject', value: report.subjectLine },
                { label: 'Clicked anything?', value: report.clickedAnything === 'no' ? 'No' : report.clickedAnything === 'link' ? 'Clicked a link' : report.clickedAnything === 'attachment' ? 'Opened attachment' : 'Both', danger: report.clickedAnything !== 'no' },
                { label: 'Risk score', value: `${report.riskScore}%` },
                { label: 'Received', value: formatDate(report.createdAt) }
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{row.label}</span>
                  <span style={{
                    fontSize: '12px', fontWeight: '500', textAlign: 'right', marginLeft: '16px',
                    color: row.red ? '#ff8080' : row.danger ? '#ffd166' : '#ffffff',
                    fontFamily: row.mono ? 'monospace' : 'inherit',
                    maxWidth: '200px', wordBreak: 'break-all'
                  }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Email header */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div
                onClick={() => setShowHeader(!showHeader)}
                style={{
                  padding: '16px 20px', cursor: 'pointer',
                  background: 'rgba(255,255,255,0.03)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>📋</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600' }}>Email Header</span>
                  <span style={{
                    fontSize: '10px', padding: '2px 7px', borderRadius: '4px',
                    background: report.emailHeader ? 'rgba(0,102,0,0.15)' : 'rgba(255,255,255,0.05)',
                    color: report.emailHeader ? '#69db7c' : 'rgba(255,255,255,0.25)',
                    border: report.emailHeader ? '1px solid rgba(0,102,0,0.25)' : '1px solid rgba(255,255,255,0.08)'
                  }}>
                    {report.emailHeader ? 'Provided' : 'Not provided'}
                  </span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', transform: showHeader ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'block' }}>▾</span>
              </div>
              {showHeader && report.emailHeader && (
                <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <pre style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '11px',
                    lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all', fontFamily: 'monospace'
                  }}>
                    {report.emailHeader}
                  </pre>
                </div>
              )}
              {showHeader && !report.emailHeader && (
                <div style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.25)', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  No email header was submitted with this report.
                </div>
              )}
            </div>

            {/* Identity notice */}
            <div style={{
              borderRadius: '16px', padding: '18px',
              background: 'rgba(0,102,0,0.06)',
              border: '1px solid rgba(0,102,0,0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>🛡️</span>
                <div>
                  <div style={{ color: '#69db7c', fontWeight: '700', fontSize: '12px', marginBottom: '4px' }}>
                    Identity Protected
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', lineHeight: '1.6' }}>
                    No identity fields exist in this record. Reporter name, email, IP address, and device fingerprint are never stored.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* GPT-4o analysis */}
            <div style={{
              borderRadius: '16px', padding: '22px',
              background: 'rgba(187,0,0,0.06)',
              border: '1px solid rgba(187,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6666', boxShadow: '0 0 6px #ff6666' }}></div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#ff8080', textTransform: 'uppercase', letterSpacing: '0.08em' }}>GPT-4o Analysis</span>
              </div>
              {[
                { label: 'Risk tier', value: <RiskBadge level={report.riskLevel}/> },
                { label: 'Risk score', value: `${report.riskScore}%`, color: '#ffffff' },
                { label: 'Domain spoofing', value: report.aiAnalysis?.domainSpoofing ? 'Detected' : 'Not detected', color: report.aiAnalysis?.domainSpoofing ? '#ff8080' : '#69db7c' },
                { label: 'Urgency language', value: report.aiAnalysis?.urgencyLanguage ? 'High' : 'Low', color: report.aiAnalysis?.urgencyLanguage ? '#ffd166' : '#69db7c' },
                { label: 'Credential harvesting', value: report.aiAnalysis?.credentialHarvesting ? 'Likely' : 'Unlikely', color: report.aiAnalysis?.credentialHarvesting ? '#ff8080' : '#69db7c' },
                { label: 'M-Pesa abuse', value: report.aiAnalysis?.mpesaAbuse ? 'Detected' : 'Not detected', color: report.aiAnalysis?.mpesaAbuse ? '#ff8080' : '#69db7c' },
                { label: 'PII stripped', value: 'Confirmed', color: '#69db7c' }
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{row.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: row.color || '#fff' }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Link scan */}
            <div style={{ borderRadius: '16px', padding: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                Google Safe Browsing — Link Scan
              </div>
              {report.suspiciousLinks?.length > 0 ? report.suspiciousLinks.map((link, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all', marginRight: '8px' }}>
                      {link.url}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '700', flexShrink: 0, padding: '2px 8px', borderRadius: '6px',
                      background: link.safeBrowsingResult?.isMalicious ? 'rgba(187,0,0,0.15)' : 'rgba(0,102,0,0.15)',
                      color: link.safeBrowsingResult?.isMalicious ? '#ff8080' : '#69db7c',
                      border: link.safeBrowsingResult?.isMalicious ? '1px solid rgba(187,0,0,0.25)' : '1px solid rgba(0,102,0,0.25)'
                    }}>
                      {link.safeBrowsingResult?.isMalicious ? 'Flagged' : 'Clean'}
                    </span>
                  </div>
                </div>
              )) : <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>No links submitted</div>}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleStatusUpdate('under_review')} disabled={updating} style={{
                flex: 1, padding: '12px', borderRadius: '12px', fontSize: '13px',
                fontWeight: '600', cursor: updating ? 'not-allowed' : 'pointer',
                background: 'rgba(187,0,0,0.1)', color: '#ff8080',
                border: '1px solid rgba(187,0,0,0.25)', transition: 'all 0.2s'
              }}
                onMouseOver={e => { if (!updating) e.currentTarget.style.background = 'rgba(187,0,0,0.18)'; }}
                onMouseOut={e => { if (!updating) e.currentTarget.style.background = 'rgba(187,0,0,0.1)'; }}>
                Escalate Report
              </button>
              <button onClick={() => handleStatusUpdate('resolved')} disabled={updating} style={{
                flex: 1, padding: '12px', borderRadius: '12px', fontSize: '13px',
                fontWeight: '600', cursor: updating ? 'not-allowed' : 'pointer',
                background: 'rgba(0,102,0,0.1)', color: '#69db7c',
                border: '1px solid rgba(0,102,0,0.25)', transition: 'all 0.2s'
              }}
                onMouseOver={e => { if (!updating) e.currentTarget.style.background = 'rgba(0,102,0,0.18)'; }}
                onMouseOut={e => { if (!updating) e.currentTarget.style.background = 'rgba(0,102,0,0.1)'; }}>
                Mark Resolved
              </button>
            </div>
          </div>
        </div>

        {/* Back button bottom */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => navigate('/it/dashboard')} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '10px 20px',
            color: 'rgba(255,255,255,0.45)', fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ITReportDetail;