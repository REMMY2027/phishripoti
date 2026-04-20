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
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />

      <div className="px-8 pt-8 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#333' }}></div>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-widest ml-1">Step 3 of 4</span>
        </div>
        <h2 className="text-white font-semibold text-2xl mb-2">Tell us about the suspicious email</h2>
        <p className="text-gray-500 text-sm leading-relaxed">Fill in what you remember. Use AI Quick Fill to auto-extract details.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-2 text-xs text-gray-500 px-3 py-1.5 rounded-lg border border-gray-800 bg-gray-900">
            Dept: {reportData.department} — stripped before storage
          </span>
          <button onClick={() => setShowQuickFill(!showQuickFill)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: 'rgba(187,0,0,0.12)', color: '#ff8080', border: '1px solid rgba(187,0,0,0.3)' }}>
            ⚡ AI Quick Fill
          </button>
        </div>

        {showQuickFill && (
          <div className="mb-4 p-4 rounded-xl border border-gray-800 bg-gray-900">
            <label className="block text-gray-400 text-xs font-medium mb-2">Paste the raw email content here</label>
            <textarea
              value={rawEmail}
              onChange={e => setRawEmail(e.target.value)}
              placeholder="Paste the full email including headers, body, and any links..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg text-gray-300 p-3 text-sm outline-none resize-none"
              style={{ minHeight: '100px' }}
            />
            {extractError && <div className="text-red-400 text-xs mt-2">{extractError}</div>}
            <div className="flex gap-2 mt-2">
              <button onClick={doQuickFill} disabled={extracting}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
                style={{ background: extracting ? '#555' : '#BB0000' }}>
                {extracting ? 'Extracting...' : 'Extract with AI →'}
              </button>
              <button onClick={() => setShowQuickFill(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-400 border border-gray-700">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-2">
              Sender email address <span className="text-red-500">*</span>
            </label>
            <input
              value={form.senderEmail}
              onChange={e => handleChange('senderEmail', e.target.value)}
              placeholder="e.g. security@kcb-alerts.net"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-800"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-2">
              Email subject line <span className="text-red-500">*</span>
            </label>
            <input
              value={form.subjectLine}
              onChange={e => handleChange('subjectLine', e.target.value)}
              placeholder="e.g. URGENT: Verify your account now"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-800"
            />
          </div>
        </div>

        <div className="mt-4 max-w-2xl">
          <label className="block text-gray-400 text-xs font-medium mb-2">Any links or URLs in the email</label>
          <input
            value={form.suspiciousLinks}
            onChange={e => handleChange('suspiciousLinks', e.target.value)}
            placeholder="e.g. http://kcb-secure-login.net/verify"
            className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-800"
          />
        </div>

        <div className="mt-4 max-w-2xl">
          <label className="block text-gray-400 text-xs font-medium mb-2">
            Describe what the email asked you to do <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.emailDescription}
            onChange={e => handleChange('emailDescription', e.target.value)}
            placeholder="e.g. Click a link to verify your password, transfer funds urgently..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-800 resize-none"
            style={{ minHeight: '80px' }}
          />
        </div>

        <div className="mt-4 max-w-2xl">
          <label className="block text-gray-400 text-xs font-medium mb-2">Did you click any links or open any attachments?</label>
          <select
            value={form.clickedAnything}
            onChange={e => handleChange('clickedAnything', e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-800">
            <option value="no">No, I did not click anything</option>
            <option value="link">Yes, I clicked a link</option>
            <option value="attachment">Yes, I opened an attachment</option>
            <option value="both">Yes, both link and attachment</option>
          </select>
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
