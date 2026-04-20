import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const department = location.state?.department || 'General';
  const module = location.state?.module || 'Spotting Phishing Emails';
  const isPost = location.state?.isPost || false;
  const preScore = location.state?.preScore || 0;

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const generateQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/awareness/generate-quiz`,
        { module, department, isPost },
        { timeout: 60000 }
      );
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Error loading quiz questions. Please wait 30 seconds and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[currentQ].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      if (!isPost) {
        navigate('/awareness/learn', {
          state: { score, total: questions.length, module, department }
        });
      } else {
        navigate('/awareness/complete', {
          state: { score, total: questions.length, module, department, preScore, postScore: score }
        });
      }
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
            <div className="text-gray-400 text-sm">
              {isPost ? 'Generating post-assessment questions...' : 'Generating your personalised quiz...'}
            </div>
            <div className="text-gray-600 text-xs mt-1">This may take up to 30 seconds</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="text-center max-w-sm">
            <div className="text-red-400 mb-4 text-sm leading-relaxed">{error}</div>
            <button onClick={generateQuestions}
              className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm"
              style={{ background: '#BB0000' }}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />

      <div className="px-8 pt-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: isPost ? '#ffd166' : '#69db7c' }}>
            {isPost ? 'Post-Assessment' : 'Pre-Assessment'} — {module}
          </span>
          <span className="text-xs text-gray-500">Q{currentQ + 1} of {questions.length}</span>
        </div>
        <div className="w-full rounded-full mb-4" style={{ height: '6px', background: '#1a1f1a' }}>
          <div className="rounded-full transition-all"
            style={{ width: `${progress}%`, height: '6px', background: isPost ? '#ea9600' : '#006600' }}/>
        </div>
        <h2 className="text-white font-semibold text-lg leading-relaxed mb-6">{question.question}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-6">
        <div className="space-y-3 max-w-2xl">
          {question.options.map((option, index) => {
            let borderColor = 'rgba(255,255,255,0.1)';
            let bg = '#1a1f1a';
            let textColor = 'text-gray-300';

            if (answered) {
              if (index === question.correctIndex) {
                borderColor = '#006600'; bg = 'rgba(0,102,0,0.15)'; textColor = 'text-green-400';
              } else if (index === selected && index !== question.correctIndex) {
                borderColor = '#BB0000'; bg = 'rgba(187,0,0,0.1)'; textColor = 'text-red-400';
              }
            }

            return (
              <div key={index} onClick={() => handleAnswer(index)}
                className={`rounded-xl p-4 border transition-all ${!answered ? 'cursor-pointer hover:border-gray-600' : ''}`}
                style={{ background: bg, borderColor }}>
                <span className={`text-sm leading-relaxed ${textColor}`}>{option}</span>
              </div>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 p-4 rounded-xl max-w-2xl"
            style={{
              background: selected === question.correctIndex ? 'rgba(0,102,0,0.08)' : 'rgba(187,0,0,0.08)',
              border: `1px solid ${selected === question.correctIndex ? 'rgba(0,102,0,0.3)' : 'rgba(187,0,0,0.3)'}`
            }}>
            <div className={`text-sm leading-relaxed ${selected === question.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
              {question.explanation}
            </div>
          </div>
        )}

        {answered && (
          <div className="mt-4 max-w-2xl">
            <button onClick={handleNext}
              className="px-6 py-2.5 rounded-lg text-white font-semibold text-sm"
              style={{ background: isPost ? '#ea9600' : '#006600' }}>
              {currentQ < questions.length - 1 ? 'Next Question →' :
                isPost ? 'See My Results →' : 'Continue to Learning Content →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
