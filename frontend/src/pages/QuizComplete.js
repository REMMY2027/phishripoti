import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

const QuizComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { score, total, module, department, preScore, postScore } = location.state || {};

  const isPostAssessment = preScore !== undefined && postScore !== undefined;
  const percentage = total ? Math.round((score / total) * 100) : 0;
  const prePercentage = total ? Math.round((preScore / total) * 100) : 0;
  const postPercentage = total ? Math.round((postScore / total) * 100) : 0;
  const delta = isPostAssessment ? postScore - preScore : 0;

  const getRating = (pct) => {
    if (pct >= 80) return { stars: '★★★★★', label: 'Excellent', color: '#69db7c' };
    if (pct >= 60) return { stars: '★★★★', label: 'Good', color: '#69db7c' };
    if (pct >= 40) return { stars: '★★★', label: 'Fair', color: '#ffd166' };
    return { stars: '★★', label: 'Keep Practising', color: '#ff8080' };
  };

  const rating = getRating(isPostAssessment ? postPercentage : percentage);

  useEffect(() => {
    if (isPostAssessment && module) {
      axios.post(`${process.env.REACT_APP_API_URL}/awareness/save-score`, {
        module, preScore, postScore
      }, { timeout: 30000 }).then(() => {
        if (delta > 0) showToast(`Great improvement! You scored ${delta} more than your pre-assessment`, 'success');
        else if (delta === 0) showToast('Good work! Your score was consistent', 'info');
        else showToast('Keep practising — review the learning content again', 'warning');
      }).catch(err => console.error('Score save error:', err));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="text-center max-w-lg w-full">
          <div className="text-5xl mb-4">
            {delta > 0 ? '🎉' : delta === 0 ? '🏅' : '📚'}
          </div>
          <h2 className="text-white font-bold text-2xl mb-2">
            {isPostAssessment ? 'Assessment Complete!' : 'Module Complete!'}
          </h2>
          <p className="text-gray-500 text-sm mb-8">{module} — {department}</p>

          {isPostAssessment ? (
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: '#8b949e' }}>{preScore}/{total}</div>
                  <div className="text-gray-500 text-xs">Pre-assessment</div>
                  <div style={{ color: '#8b949e' }} className="text-xs mt-1">{prePercentage}%</div>
                </div>
                <div className="rounded-xl p-5 border flex flex-col items-center justify-center"
                  style={{
                    background: delta > 0 ? 'rgba(0,102,0,0.1)' : delta < 0 ? 'rgba(187,0,0,0.1)' : '#1a1f1a',
                    borderColor: delta > 0 ? 'rgba(0,102,0,0.3)' : delta < 0 ? 'rgba(187,0,0,0.3)' : 'rgba(255,255,255,0.1)'
                  }}>
                  <div className="text-2xl font-bold mb-1"
                    style={{ color: delta > 0 ? '#69db7c' : delta < 0 ? '#ff8080' : '#ffd166' }}>
                    {delta > 0 ? `+${delta}` : delta}
                  </div>
                  <div className="text-gray-500 text-xs">Improvement</div>
                  <div className="text-xs mt-1"
                    style={{ color: delta > 0 ? '#69db7c' : delta < 0 ? '#ff8080' : '#ffd166' }}>
                    {delta > 0 ? 'Improved' : delta < 0 ? 'Declined' : 'Same'}
                  </div>
                </div>
                <div className="rounded-xl p-5 border"
                  style={{ background: 'rgba(0,102,0,0.08)', borderColor: 'rgba(0,102,0,0.3)' }}>
                  <div className="text-2xl font-bold text-green-400 mb-1">{postScore}/{total}</div>
                  <div className="text-gray-500 text-xs">Post-assessment</div>
                  <div className="text-green-400 text-xs mt-1">{postPercentage}%</div>
                </div>
              </div>

              <div className="rounded-xl p-5 border border-gray-800 mb-4 text-left" style={{ background: '#1a1f1a' }}>
                <div className="text-white font-semibold text-sm mb-4">Score Comparison</div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Pre-assessment</span><span>{prePercentage}%</span>
                  </div>
                  <div className="rounded-full" style={{ height: '8px', background: '#0a0d0a' }}>
                    <div className="rounded-full transition-all"
                      style={{ height: '8px', background: '#8b949e', width: `${prePercentage}%` }}/>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Post-assessment</span><span>{postPercentage}%</span>
                  </div>
                  <div className="rounded-full" style={{ height: '8px', background: '#0a0d0a' }}>
                    <div className="rounded-full transition-all"
                      style={{ height: '8px', background: '#006600', width: `${postPercentage}%` }}/>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-4 border border-gray-800 mb-4" style={{ background: '#1a1f1a' }}>
                <div className="text-xl mb-1" style={{ color: rating.color }}>{rating.stars}</div>
                <div className="text-white font-semibold text-sm">{rating.label}</div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 justify-center mb-8">
              <div className="rounded-xl p-5 border border-gray-800 min-w-24" style={{ background: '#1a1f1a' }}>
                <div className="text-3xl font-bold text-green-400 mb-1">{score}/{total}</div>
                <div className="text-gray-500 text-xs">Score</div>
              </div>
              <div className="rounded-xl p-5 border border-gray-800 min-w-24" style={{ background: '#1a1f1a' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#ffd166' }}>{percentage}%</div>
                <div className="text-gray-500 text-xs">Accuracy</div>
              </div>
              <div className="rounded-xl p-5 border border-gray-800 min-w-24" style={{ background: '#1a1f1a' }}>
                <div className="text-xl font-bold mb-1" style={{ color: rating.color }}>{rating.stars}</div>
                <div className="text-gray-500 text-xs">{rating.label}</div>
              </div>
            </div>
          )}

          <div className="rounded-xl p-5 border border-gray-800 text-left mb-8" style={{ background: '#1a1f1a' }}>
            <div className="text-white font-semibold text-sm mb-3">Key Takeaways</div>
            <div className="text-gray-400 text-sm leading-relaxed">
              Always verify sender domains match official institution domains.
              Never click links in emails claiming urgent account action.
              No legitimate bank will ask for your PIN via email.
              Report all suspicious emails immediately using PhishRipoti.
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => navigate('/awareness/modules', { state: { department } })}
              className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm"
              style={{ background: '#006600' }}>
              Try Another Module
            </button>
            <button onClick={() => navigate('/report/step1')}
              className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm"
              style={{ background: '#BB0000' }}>
              Report a Suspicious Email
            </button>
            <button onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all">
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;
