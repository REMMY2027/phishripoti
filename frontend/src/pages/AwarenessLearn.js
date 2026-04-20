import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AwarenessLearn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total, module, department } = location.state || {};
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/awareness/learning-content`,
        { module, department },
        { timeout: 60000 }
      );
      setContent(response.data);
    } catch (err) {
      setContent({
        keyPoints: [
          'Always verify the sender email domain matches the official company domain.',
          'Never click links in emails claiming urgent account action.',
          'No legitimate bank will ask for your PIN or password via email.',
          'Report all suspicious emails immediately using PhishRipoti.',
          'When in doubt, call the sender directly using a known phone number.'
        ],
        scenario: 'You receive an email claiming to be from KCB Security asking you to verify your account within 24 hours or it will be suspended. The email contains a link to kcb-secure-verify.net. This is a phishing attempt — KCB will never ask you to verify via a third-party domain.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#006600" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div className="text-gray-400 text-sm">Generating learning content for {department}...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-green-400">Learning Content — {module}</span>
        </div>
        <h2 className="text-white font-bold text-2xl mb-1">Study this before your post-assessment</h2>
        <p className="text-gray-500 text-sm">Pre-assessment score: {score}/{total} — can you improve?</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="max-w-2xl space-y-4">
          <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
            <div className="text-white font-semibold text-sm mb-3">Key Points</div>
            <div className="space-y-3">
              {content?.keyPoints?.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,102,0,0.2)', border: '1px solid rgba(0,102,0,0.4)' }}>
                    <span style={{ color: '#69db7c', fontSize: '10px', fontWeight: 'bold' }}>{i + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {content?.scenario && (
            <div className="rounded-xl p-5"
              style={{ background: 'rgba(187,0,0,0.06)', border: '1px solid rgba(187,0,0,0.2)' }}>
              <div className="text-red-400 font-semibold text-sm mb-2">Real-world Scenario</div>
              <p className="text-gray-300 text-sm leading-relaxed">{content.scenario}</p>
            </div>
          )}

          <button
            onClick={() => navigate('/awareness/quiz', {
              state: { department, module, isPost: true, preScore: score }
            })}
            className="w-full py-4 rounded-xl font-semibold text-white text-base"
            style={{ background: '#006600' }}>
            Take Post-Assessment →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AwarenessLearn;
