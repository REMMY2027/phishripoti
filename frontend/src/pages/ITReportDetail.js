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
      showToast(status === 'resolved' ? 'Report marked as resolved' : 'Report escalated successfully',
        status === 'resolved' ? 'success' : 'warning');
    } catch (err) {
      showToast('Error updating report status', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0d0a' }}>
        <svg className="animate-spin" width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0d0a' }}>
        <div className="text-center">
          <div className="text-red-400 mb-4">{error || 'Report not found.'}</div>
          <button onClick={() => navigate('/it/dashboard')}
            className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm"
            style={{ background: '#BB0000' }}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <div className="flex h-1">
        <div className="flex-1 bg-red-700"></div>
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-green-800"></div>
      </div>
      <nav className="flex items-center justify-between px-8 h-14 bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V6L12 2z" fill="#BB0000"/>
          </svg>
          <span className="text-white font-bold text-base">PhishRipoti — IT Portal</span>
        </div>
        <button onClick={() => navigate('/it/dashboard')}
          className="text-gray-400 border border-gray-700 rounded-lg px-4 py-1.5 text-sm hover:bg-gray-800 transition-all">
          ← Dashboard
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="font-mono text-white text-base">{report.tokenId}</span>
          <RiskBadge level={report.riskLevel}/>
          {report.alertSent && (
            <span className="text-xs px-2 py-1 rounded border text-red-400 border-red-900"
              style={{ background: 'rgba(187,0,0,0.15)' }}>Alert Sent via SendGrid</span>
          )}
          <span className={`text-xs px-2 py-1 rounded border ${
            report.status === 'resolved' ? 'text-green-400 border-green-900 bg-green-900 bg-opacity-20' :
            'text-yellow-400 border-yellow-900 bg-yellow-900 bg-opacity-20'
          }`}>
            {report.status === 'resolved' ? 'Resolved' : 'Under Review'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          <div>
            <div className="rounded-xl p-5 border border-gray-800 mb-4" style={{ background: '#1a1f1a' }}>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Report Details</div>
              {[
                { label: 'Incident type', value: report.incidentType },
                { label: 'Sender domain', value: report.senderEmail, mono: true, red: true },
                { label: 'Subject', value: report.subjectLine },
                { label: 'Clicked anything?', value: report.clickedAnything === 'no' ? 'No' : 'Yes', green: report.clickedAnything === 'no' },
                { label: 'Risk score', value: `${report.riskScore}%` },
                { label: 'Received', value: formatDate(report.createdAt) }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-start py-2 border-b border-gray-800 last:border-0">
                  <span className="text-gray-500 text-sm">{row.label}</span>
                  <span className={`text-sm font-medium text-right ml-4 ${
                    row.red ? 'text-red-400 font-mono text-xs' : row.green ? 'text-green-400' : 'text-white'
                  }`}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Identity Fields</div>
              <div className="flex items-start gap-3 p-3 rounded-lg"
                style={{ background: 'rgba(0,102,0,0.06)', border: '1px solid rgba(0,102,0,0.2)' }}>
                <span className="text-green-400 text-xs leading-relaxed">
                  No identity fields exist in this record. Reporter name, email, IP address, and device fingerprint are never stored.
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl p-5 mb-4"
              style={{ background: 'rgba(187,0,0,0.06)', border: '1px solid rgba(187,0,0,0.25)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full animate-pulse bg-red-500"></div>
                <div className="text-xs font-semibold text-red-400 uppercase tracking-wider">GPT-4o Analysis</div>
              </div>
              {[
                { label: 'Risk tier', value: <RiskBadge level={report.riskLevel}/> },
                { label: 'Risk score', value: `${report.riskScore}%`, color: 'text-white' },
                { label: 'Domain spoofing', value: report.aiAnalysis?.domainSpoofing ? 'Detected' : 'Not detected', color: report.aiAnalysis?.domainSpoofing ? 'text-red-400' : 'text-green-400' },
                { label: 'Urgency language', value: report.aiAnalysis?.urgencyLanguage ? 'High' : 'Low', color: report.aiAnalysis?.urgencyLanguage ? 'text-yellow-400' : 'text-green-400' },
                { label: 'Credential harvesting', value: report.aiAnalysis?.credentialHarvesting ? 'Likely' : 'Unlikely', color: report.aiAnalysis?.credentialHarvesting ? 'text-red-400' : 'text-green-400' },
                { label: 'M-Pesa abuse', value: report.aiAnalysis?.mpesaAbuse ? 'Detected' : 'Not detected', color: report.aiAnalysis?.mpesaAbuse ? 'text-red-400' : 'text-green-400' },
                { label: 'PII stripped', value: 'Confirmed', color: 'text-green-400' }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-800 last:border-0">
                  <span className="text-gray-400 text-sm">{row.label}</span>
                  <span className={`text-sm font-medium ${row.color || ''}`}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-5 border border-gray-800 mb-4" style={{ background: '#1a1f1a' }}>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Link Scan</div>
              {report.suspiciousLinks?.length > 0 ? report.suspiciousLinks.map((link, i) => (
                <div key={i} className="py-2 border-b border-gray-800 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs font-mono truncate mr-2">{link.url}</span>
                    <span className={`text-xs font-semibold flex-shrink-0 ${link.safeBrowsingResult?.isMalicious ? 'text-red-400' : 'text-green-400'}`}>
                      {link.safeBrowsingResult?.isMalicious ? 'Flagged' : 'Clean'}
                    </span>
                  </div>
                </div>
              )) : <div className="text-gray-600 text-sm">No links submitted</div>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => handleStatusUpdate('under_review')} disabled={updating}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{ background: 'transparent', color: '#ff6b6b', border: '1px solid rgba(187,0,0,0.5)' }}>
                Escalate Report
              </button>
              <button onClick={() => handleStatusUpdate('resolved')} disabled={updating}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all">
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITReportDetail;
