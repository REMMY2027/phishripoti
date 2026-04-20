import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RiskBadge from '../components/RiskBadge';
import { useReport } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';

const Result = () => {
  const navigate = useNavigate();
  const { result, clearReport } = useReport();
  const { showToast } = useToast();

  useEffect(() => {
    if (result) {
      if (result.riskLevel === 'HIGH') {
        showToast('HIGH risk detected — IT Manager alerted via email', 'error');
      } else if (result.riskLevel === 'MEDIUM') {
        showToast('MEDIUM risk detected — exercise caution', 'warning');
      } else {
        showToast('Report submitted successfully', 'success');
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!result) {
    navigate('/');
    return null;
  }

  const riskColors = {
    HIGH: { bg: 'rgba(187,0,0,0.08)', border: 'rgba(187,0,0,0.3)', banner: '#BB0000', text: '#ff6b6b' },
    MEDIUM: { bg: 'rgba(234,150,0,0.08)', border: 'rgba(234,150,0,0.3)', banner: '#ea9600', text: '#ffd166' },
    LOW: { bg: 'rgba(0,102,0,0.08)', border: 'rgba(0,102,0,0.3)', banner: '#006600', text: '#69db7c' }
  };

  const colors = riskColors[result.riskLevel] || riskColors.LOW;

  const handleHome = () => {
    clearReport();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />

      <div className="px-8 py-6" style={{ background: colors.banner }}>
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
              <circle cx="45" cy="45" r="38" fill="none" stroke="white" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - result.riskScore / 100)}`}
                transform="rotate(-90 45 45)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}/>
              <text x="45" y="45" textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="16" fontWeight="bold">
                {result.riskScore}%
              </text>
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-xl mb-1">
              {result.riskLevel === 'HIGH' && 'High Risk Phishing Detected'}
              {result.riskLevel === 'MEDIUM' && 'Medium Risk — Exercise Caution'}
              {result.riskLevel === 'LOW' && 'Low Risk — Likely Safe'}
            </div>
            <div className="text-white text-sm mb-2" style={{ opacity: 0.85 }}>
              {result.riskLevel === 'HIGH' && 'Do NOT click any links or open any attachments. Delete this email immediately.'}
              {result.riskLevel === 'MEDIUM' && 'Exercise caution. Do not click any links until verified.'}
              {result.riskLevel === 'LOW' && 'Both analysis layers returned weak signals. The email appears safe.'}
            </div>
            <RiskBadge level={result.riskLevel} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
          <div className="rounded-xl p-5 border" style={{ background: '#1a1f1a', borderColor: colors.border }}>
            <div className="text-white font-semibold text-sm mb-3">What to do next</div>
            <div className="space-y-2">
              {result.recommendedActions?.map((action, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-bold mt-0.5 px-1.5 py-0.5 rounded"
                    style={{ background: colors.banner, color: 'white', minWidth: '20px', textAlign: 'center' }}>
                    {i + 1}
                  </span>
                  <span className="text-gray-300 text-sm leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 border" style={{ background: colors.bg, borderColor: colors.border }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: colors.text }}></div>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text }}>
                GPT-4o Analysis
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Domain spoofing', value: result.aiAnalysis?.domainSpoofing },
                { label: 'Urgency language', value: result.aiAnalysis?.urgencyLanguage },
                { label: 'Credential harvesting', value: result.aiAnalysis?.credentialHarvesting },
                { label: 'M-Pesa abuse signals', value: result.aiAnalysis?.mpesaAbuse }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-gray-800 last:border-0">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.value ? 'text-red-400' : 'text-green-400'}`}>
                    {item.value ? 'Detected' : 'Not detected'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
            <div className="text-white font-semibold text-sm mb-3">Threat Indicators</div>
            <div className="space-y-2">
              {result.reasons?.map((reason, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: colors.text }} className="mt-1">⚠</span>
                  <span className="text-gray-300 text-sm leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: '16px' }}>💡</span>
              <div className="text-white font-semibold text-sm">Did You Know?</div>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed">{result.didYouKnow}</div>
          </div>

          <div className="col-span-2 rounded-xl p-5 border"
            style={{ background: 'rgba(0,102,0,0.08)', borderColor: 'rgba(0,102,0,0.3)' }}>
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Anonymous Report Token</div>
              <div className="font-mono text-lg font-bold text-green-400 px-4 py-3 rounded-lg inline-block"
                style={{ background: 'rgba(0,102,0,0.15)' }}>
                {result.tokenId}
              </div>
              <div className="text-gray-500 text-xs mt-2 leading-relaxed">
                This token is not linked to your identity.
                {result.alertSent && ' A HIGH risk alert has been sent to your IT security team.'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 max-w-3xl flex-wrap">
          <button onClick={() => { clearReport(); navigate('/report/step1'); }}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
            style={{ background: '#BB0000' }}>
            Report Another Email
          </button>
          <button onClick={handleHome}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all">
            Return to Home
          </button>
          <button onClick={() => navigate('/awareness')}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all">
            Go to Awareness Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
