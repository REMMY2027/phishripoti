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

  const extractEmailMockup = (questionText) => {
    const lower = questionText.toLowerCase();
    if (!lower.includes('email') && !lower.includes('sender') && !lower.includes('subject') && !lower.includes('message')) {
      return null;
    }
    const fromMatch = questionText.match(/from[:\s]+([^\n,\.]+@[^\n,\.\s]+\.[^\n,\.\s]+)/i);
    const subjectMatch = questionText.match(/subject[:\s]+"?([^"\n]+)"?/i);
    const bodyMatch = questionText.match(/body[:\s]+"?([^"]+)"?/i) ||
      questionText.match(/says[:\s]+"([^"]+)"/i) ||
      questionText.match(/reads[:\s]+"([^"]+)"/i) ||
      questionText.match(/message[:\s]+"([^"]+)"/i);

    if (!fromMatch && !subjectMatch) return null;

    return {
      from: fromMatch ? fromMatch[1].trim() : 'security@kcb-alerts.net',
      subject: subjectMatch ? subjectMatch[1].trim() : 'URGENT: Account Verification Required',
      body: bodyMatch ? bodyMatch[1].trim() : 'Dear Customer, your account requires immediate verification. Click the link below to avoid suspension.'
    };
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
              width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#006600" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '6px' }}>
              {isPost ? 'Generating post-assessment...' : 'Generating your personalised quiz...'}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
              GPT-4o is creating questions for {department}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{ color: '#ff8080', fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>{error}</div>
            <button onClick={generateQuestions} style={{
              background: '#BB0000', color: '#fff', border: 'none',
              borderRadius: '10px', padding: '10px 24px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer'
            }}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const emailMockup = extractEmailMockup(question.question);
  const isCorrect = selected === question.correctIndex;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '20px 40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: isPost ? 'rgba(234,150,0,0.12)' : 'rgba(0,102,0,0.12)',
            border: `1px solid ${isPost ? 'rgba(234,150,0,0.25)' : 'rgba(0,102,0,0.25)'}`,
            borderRadius: '20px', padding: '3px 10px'
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: isPost ? '#ffd166' : '#69db7c'
            }}></div>
            <span style={{
              fontSize: '10px', fontWeight: '600',
              color: isPost ? '#ffd166' : '#69db7c',
              textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              {isPost ? 'Post-Assessment' : 'Pre-Assessment'} — {module}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            Question {currentQ + 1} of {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '4px',
            background: isPost ? '#ea9600' : '#006600',
            width: `${progress}%`, transition: 'width 0.4s ease'
          }}></div>
        </div>

        {/* Score tracker */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: '24px', height: '4px', borderRadius: '2px',
              background: i < currentQ
                ? '#006600'
                : i === currentQ
                ? 'rgba(255,255,255,0.4)'
                : 'rgba(255,255,255,0.08)',
              transition: 'background 0.3s'
            }}></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 40px' }}>
        <div style={{
          maxWidth: emailMockup ? '900px' : '640px',
          display: emailMockup ? 'grid' : 'block',
          gridTemplateColumns: emailMockup ? '1fr 1fr' : '1fr',
          gap: '24px'
        }}>

          {/* Left: question + options */}
          <div>
            {/* Department badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '3px 10px', marginBottom: '16px'
            }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {department}
              </span>
            </div>

            {/* Question */}
            <h2 style={{
              color: '#ffffff', fontWeight: '700', fontSize: '17px',
              lineHeight: '1.6', marginBottom: '20px', margin: '0 0 20px'
            }}>
              {question.question}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {question.options.map((option, index) => {
                const isSelectedCorrect = answered && index === question.correctIndex;
                const isSelectedWrong = answered && index === selected && index !== question.correctIndex;
                const isUnselected = answered && index !== selected && index !== question.correctIndex;

                return (
                  <div
                    key={index}
                    onClick={() => handleAnswer(index)}
                    style={{
                      borderRadius: '12px', padding: '14px 16px',
                      cursor: answered ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: isSelectedCorrect
                        ? 'rgba(0,102,0,0.15)'
                        : isSelectedWrong
                        ? 'rgba(187,0,0,0.12)'
                        : isUnselected
                        ? 'rgba(255,255,255,0.02)'
                        : 'rgba(255,255,255,0.04)',
                      border: isSelectedCorrect
                        ? '1px solid rgba(0,102,0,0.4)'
                        : isSelectedWrong
                        ? '1px solid rgba(187,0,0,0.4)'
                        : '1px solid rgba(255,255,255,0.07)',
                      transition: 'all 0.2s',
                      opacity: isUnselected ? 0.4 : 1
                    }}>

                    {/* Option letter */}
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      flexShrink: 0, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '12px', fontWeight: '700',
                      background: isSelectedCorrect
                        ? '#006600'
                        : isSelectedWrong
                        ? '#BB0000'
                        : 'rgba(255,255,255,0.08)',
                      color: isSelectedCorrect || isSelectedWrong ? '#fff' : 'rgba(255,255,255,0.5)'
                    }}>
                      {isSelectedCorrect ? '✓' : isSelectedWrong ? '✕' : String.fromCharCode(65 + index)}
                    </div>

                    <span style={{
                      color: isSelectedCorrect
                        ? '#69db7c'
                        : isSelectedWrong
                        ? '#ff8080'
                        : 'rgba(255,255,255,0.8)',
                      fontSize: '14px', lineHeight: '1.5'
                    }}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <div style={{
                marginTop: '16px', borderRadius: '12px', padding: '16px 18px',
                background: isCorrect
                  ? 'rgba(0,102,0,0.12)'
                  : 'rgba(187,0,0,0.1)',
                border: `1px solid ${isCorrect ? 'rgba(0,102,0,0.35)' : 'rgba(187,0,0,0.35)'}`,
                borderLeft: `4px solid ${isCorrect ? '#006600' : '#BB0000'}`
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>{isCorrect ? '✅' : '❌'}</span>
                  <span style={{
                    fontWeight: '700', fontSize: '13px',
                    color: isCorrect ? '#69db7c' : '#ff8080'
                  }}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.75)', fontSize: '13px',
                  lineHeight: '1.7', margin: 0
                }}>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Next button */}
            {answered && (
              <button onClick={handleNext} style={{
                marginTop: '16px', width: '100%',
                background: isPost ? '#ea9600' : '#006600',
                color: '#fff', border: 'none',
                borderRadius: '12px', padding: '14px',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                {currentQ < questions.length - 1
                  ? 'Next Question →'
                  : isPost
                  ? 'See My Results →'
                  : 'Continue to Learning Content →'}
              </button>
            )}
          </div>

          {/* Right: email mockup */}
          {emailMockup && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '10px'
              }}>
                Email in Question
              </div>
              <div style={{
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid rgba(187,0,0,0.25)',
                background: '#0f1a0f', flex: 1
              }}>
                {/* Email header bar */}
                <div style={{
                  background: '#1a1a1a',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#BB0000', opacity: 0.7 }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ea9600', opacity: 0.7 }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#006600', opacity: 0.7 }}></div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>
                    Suspicious Email
                  </span>
                </div>

                {/* Email content */}
                <div style={{ padding: '16px' }}>
                  <div style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    paddingBottom: '12px', marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', width: '50px' }}>From:</span>
                      <span style={{
                        fontSize: '12px', color: '#ff8080', fontFamily: 'monospace',
                        background: 'rgba(187,0,0,0.12)', padding: '2px 8px',
                        borderRadius: '4px', border: '1px solid rgba(187,0,0,0.2)'
                      }}>
                        {emailMockup.from}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', width: '50px' }}>Subject:</span>
                      <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: '600' }}>
                        {emailMockup.subject}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '12px', color: 'rgba(255,255,255,0.55)',
                    lineHeight: '1.7'
                  }}>
                    {emailMockup.body}
                  </div>

                  {/* Warning badge */}
                  <div style={{
                    marginTop: '14px', padding: '8px 12px',
                    background: 'rgba(187,0,0,0.1)',
                    border: '1px solid rgba(187,0,0,0.2)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{ fontSize: '12px' }}>⚠️</span>
                    <span style={{ fontSize: '11px', color: '#ff8080' }}>
                      Suspicious email — analyse carefully
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;