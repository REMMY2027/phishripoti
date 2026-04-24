import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
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
          clickedAnything: reportData.clickedAnything,
          department: reportData.department
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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />

      <div className="px-8 pt-8 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-widest ml-1">Step 4 of 4</span>
        </div>
        <h2 className="text-white font-semibold text-2xl mb-2">Review and submit your report</h2>
        <p className="text-gray-500 text-sm leading-relaxed">Your submission is fully anonymous. No identity fields are collected or stored.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 max-w-2xl">
        <div className="rounded-xl p-5 border border-gray-800 mb-4" style={{ background: '#1a1f1a' }}>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Report Summary</div>
          <div className="space-y-2">
            {[
              { label: 'Incident type', value: 'Phishing Email' },
{ label: 'Sender', value: reportData.senderEmail, mono: true, red: true },
{ label: 'Subject', value: reportData.subjectLine },
{ label: 'Links', value: reportData.suspiciousLinks || 'None provided', mono: true },
{ label: 'Clicked anything?', value: reportData.clickedAnything === 'no' ? 'No' : reportData.clickedAnything === 'link' ? 'Yes — clicked a link' : reportData.clickedAnything === 'attachment' ? 'Yes — opened an attachment' : 'Yes — both', green: reportData.clickedAnything === 'no' },
{ label: 'Email header', value: reportData.emailHeader ? 'Provided' : 'Not provided', green: !!reportData.emailHeader }
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-800 last:border-0">
                <span className="text-gray-500 text-sm">{row.label}</span>
                <span className={`text-sm font-medium ${
                  row.red ? 'text-red-400 font-mono' :
                  row.green ? 'text-green-400' : 'text-white'
                }`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-4 mb-4 border"
          style={{ background: 'rgba(17,21,17,0.9)', borderColor: 'rgba(187,0,0,0.2)' }}>
          <div className="text-xs font-semibold text-red-400 mb-2">Anonymity Notice</div>
          <div className="text-gray-400 text-sm leading-relaxed">
            No name, email address, IP address, or device fingerprint is collected. Your department is stripped before storage.
          </div>
        </div>

        {error && (
          <div className="rounded-lg p-3 mb-4 text-sm text-red-400 border border-red-900"
            style={{ background: 'rgba(187,0,0,0.1)' }}>{error}</div>
        )}

        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all"
          style={{ background: loading ? '#555' : '#BB0000', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Analysing your report...
            </span>
          ) : 'Submit Report Anonymously →'}
        </button>
      </div>

      <NextStrip
        steps={['Phishing Email', reportData.department || 'Department', 'Email Details', 'Submit']}
        currentStep={3}
        rightText="Identity never stored"
      />
    </div>
  );
};

export default ReportStep4;
