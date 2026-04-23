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
          state: {
            score, total: questions.length,
            module, department, preScore, postScore: score
          }
        });
      }
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
              width="44" height="44" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#006600" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '6px' }}>
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
  const emailMockup = question.emailMockup || null;
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
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '14px'
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: isPost ? 'rgba(234,150,0,0.12)' : 'rgba(0,102,0,0.12)',
            border: `1px solid ${isPost ? 'rgba(234,150,0,0.25)' : 'rgba(0,102,0,0.25)'}`,
            borderRadius: '20px', padding: '4px 12px'
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: isPost ? '#ffd166' : '#69db7c'
            }}></div>
            <span style={{
              fontSize: '11px', fontWeight: '600',
              color: isPost ? '#ffd166' : '#69db7c',
              textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              {isPost ? 'Post-Assessment' : 'Pre-Assessment'} — {module}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            Question {currentQ + 1} of {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{
          height: '5px', background: 'rgba(255,255,255,0.07)',
          borderRadius: '4px', overflow: 'hidden', marginBottom: '10px'
        }}>
          <div style={{
            height: '100%', borderRadius: '4px',
            background: isPost ? '#ea9600' : '#006600',
            width: `${progress}%`, transition: 'width 0.5s ease'
          }}></div>
        </div>

        {/* Question dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              height: '4px', borderRadius: '2px',
              width: i === currentQ ? '32px' : '20px',
              background: i < currentQ
                ? '#006600'
                : i === currentQ
                ? isPost ? '#ea9600' : '#69db7c'
                : 'rgba(255,255,255,0.08)',
              transition: 'all 0.3s'
            }}></div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: emailMockup ? '1fr 1fr' : '1fr',
          gap: '32px',
          maxWidth: emailMockup ? '1000px' : '660px',
          alignItems: 'start'
        }}>

          {/* LEFT — Question and options */}
          <div>
            {/* Department pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '3px 10px', marginBottom: '18px'
            }}>
              <span style={{
                fontSize: '10px', color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', letterSpacing: '0.07em'
              }}>
                {department}
              </span>
            </div>

            {/* Question text */}
            <h2 style={{
              color: '#ffffff', fontWeight: '700',
              fontSize: '18px', lineHeight: '1.65',
              margin: '0 0 22px', letterSpacing: '-0.2px'
            }}>
              {question.question}
            </h2>

            {/* Answer options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {question.options.map((option, index) => {
                const isThisCorrect = answered && index === question.correctIndex;
                const isThisWrong = answered && index === selected && index !== question.correctIndex;
                const isThisUnselected = answered && index !== selected && index !== question.correctIndex;

                return (
                  <div
                    key={index}
                    onClick={() => handleAnswer(index)}
                    style={{
                      borderRadius: '12px', padding: '14px 16px',
                      cursor: answered ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: isThisCorrect
                        ? 'rgba(0,102,0,0.15)'
                        : isThisWrong
                        ? 'rgba(187,0,0,0.12)'
                        : isThisUnselected
                        ? 'rgba(255,255,255,0.015)'
                        : 'rgba(255,255,255,0.04)',
                      border: isThisCorrect
                        ? '1px solid rgba(0,102,0,0.45)'
                        : isThisWrong
                        ? '1px solid rgba(187,0,0,0.45)'
                        : '1px solid rgba(255,255,255,0.07)',
                      opacity: isThisUnselected ? 0.38 : 1,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                      }
                    }}
                    onMouseOut={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
                      }
                    }}
                  >
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      flexShrink: 0, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '12px', fontWeight: '700',
                      background: isThisCorrect
                        ? '#006600'
                        : isThisWrong
                        ? '#BB0000'
                        : 'rgba(255,255,255,0.08)',
                      color: isThisCorrect || isThisWrong
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.45)',
                      transition: 'all 0.2s'
                    }}>
                      {isThisCorrect ? '✓' : isThisWrong ? '✕' : String.fromCharCode(65 + index)}
                    </div>
                    <span style={{
                      color: isThisCorrect
                        ? '#69db7c'
                        : isThisWrong
                        ? '#ff8080'
                        : 'rgba(255,255,255,0.82)',
                      fontSize: '14px', lineHeight: '1.55'
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
                marginTop: '18px', borderRadius: '12px', padding: '18px 20px',
                background: isCorrect ? 'rgba(0,102,0,0.1)' : 'rgba(187,0,0,0.08)',
                border: `1px solid ${isCorrect ? 'rgba(0,102,0,0.3)' : 'rgba(187,0,0,0.3)'}`,
                borderLeft: `4px solid ${isCorrect ? '#006600' : '#BB0000'}`
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: '8px', marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '18px' }}>{isCorrect ? '✅' : '❌'}</span>
                  <span style={{
                    fontWeight: '700', fontSize: '14px',
                    color: isCorrect ? '#69db7c' : '#ff8080'
                  }}>
                    {isCorrect
                      ? 'Correct!'
                      : `Incorrect — correct answer was ${String.fromCharCode(65 + question.correctIndex)}`}
                  </span>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: '13px', lineHeight: '1.75', margin: 0
                }}>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Next button */}
            {answered && (
              <button onClick={handleNext} style={{
                marginTop: '14px', width: '100%',
                background: isPost ? '#ea9600' : '#006600',
                color: '#fff', border: 'none',
                borderRadius: '12px', padding: '15px',
                fontSize: '14px', fontWeight: '700',
                cursor: 'pointer', letterSpacing: '0.02em',
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

          {/* RIGHT — Email mockup */}
          {emailMockup && (
            <div>
              <div style={{
                fontSize: '11px', fontWeight: '700',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', letterSpacing: '0.09em',
                marginBottom: '10px',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <span style={{ fontSize: '14px' }}>📧</span>
                Email in Question
              </div>

              <div style={{
                borderRadius: '14px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#0d150d'
              }}>
                {/* Mac toolbar */}
                <div style={{
                  background: '#181818',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  padding: '10px 16px',
                  display: 'flex', alignItems: 'center', gap: '7px'
                }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#BB0000', opacity: 0.75 }}></div>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ea9600', opacity: 0.75 }}></div>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#006600', opacity: 0.75 }}></div>
                  <span style={{
                    fontSize: '11px', color: 'rgba(255,255,255,0.2)',
                    marginLeft: '10px', fontFamily: 'monospace'
                  }}>
                    Mail — Inbox
                  </span>
                </div>

                {/* Email headers */}
                <div style={{
                  padding: '16px 18px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', color: 'rgba(255,255,255,0.25)',
                      width: '52px', flexShrink: 0
                    }}>From:</span>
                    <span style={{
                      fontSize: '12px', color: '#ff8080',
                      fontFamily: 'monospace',
                      background: 'rgba(187,0,0,0.12)',
                      padding: '3px 8px', borderRadius: '5px',
                      border: '1px solid rgba(187,0,0,0.2)'
                    }}>
                      {emailMockup.from}
                    </span>
                  </div>

                  {emailMockup.to && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '11px', color: 'rgba(255,255,255,0.25)',
                        width: '52px', flexShrink: 0
                      }}>To:</span>
                      <span style={{
                        fontSize: '12px', color: 'rgba(255,255,255,0.45)',
                        fontFamily: 'monospace'
                      }}>
                        {emailMockup.to}
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', color: 'rgba(255,255,255,0.25)',
                      width: '52px', flexShrink: 0
                    }}>Subject:</span>
                    <span style={{
                      fontSize: '13px', color: '#ffffff', fontWeight: '700'
                    }}>
                      {emailMockup.subject}
                    </span>
                  </div>
                </div>

                {/* Email body */}
                <div style={{ padding: '16px 18px' }}>
                  <p style={{
                    fontSize: '13px', color: 'rgba(255,255,255,0.58)',
                    lineHeight: '1.75', margin: '0 0 14px'
                  }}>
                    {emailMockup.body}
                  </p>

                  {emailMockup.link && (
                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '10px', color: 'rgba(255,255,255,0.25)',
                        marginBottom: '4px', textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}>
                        Link in email:
                      </div>
                      <span style={{
                        fontSize: '11px', color: '#ff8080',
                        fontFamily: 'monospace', wordBreak: 'break-all'
                      }}>
                        {emailMockup.link}
                      </span>
                    </div>
                  )}
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