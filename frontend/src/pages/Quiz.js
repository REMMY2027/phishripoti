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
            <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 20px', display: 'block' }}
              width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke={isPost ? '#ea9600' : '#006600'} strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
              {isPost ? 'Generating post-assessment...' : 'Generating your personalised quiz...'}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
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
              borderRadius: '10px', padding: '12px 28px',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer'
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
  const accentColor = isPost ? '#ea9600' : '#006600';
  const accentLight = isPost ? '#ffd166' : '#69db7c';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
      <Navbar />

      {/* Premium header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0f0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0'
      }}>
        {/* Top accent bar */}
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, transparent)` }}></div>

        <div style={{ padding: '20px 40px 18px' }}>
          {/* Assessment type banner */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <div style={{
                background: isPost
                  ? 'linear-gradient(135deg, rgba(234,150,0,0.25), rgba(234,150,0,0.1))'
                  : 'linear-gradient(135deg, rgba(0,102,0,0.25), rgba(0,102,0,0.1))',
                border: `1px solid ${isPost ? 'rgba(234,150,0,0.4)' : 'rgba(0,102,0,0.4)'}`,
                borderRadius: '10px', padding: '8px 16px',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: accentLight,
                  boxShadow: `0 0 6px ${accentLight}`
                }}></div>
                <span style={{
                  fontSize: '12px', fontWeight: '700',
                  color: accentLight, letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}>
                  {isPost ? 'Post-Assessment' : 'Pre-Assessment'}
                </span>
              </div>

              <div style={{
                display: 'flex', flexDirection: 'column', gap: '2px'
              }}>
                <span style={{
                  color: '#ffffff', fontWeight: '700',
                  fontSize: '16px', letterSpacing: '-0.2px'
                }}>
                  {module}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '12px'
                }}>
                  {department} · Question {currentQ + 1} of {questions.length}
                </span>
              </div>
            </div>

            {/* Score tracker */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px', padding: '8px 14px'
            }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Score</span>
              <span style={{
                fontSize: '18px', fontWeight: '800',
                color: accentLight
              }}>{score}</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>/ {questions.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            height: '6px', background: 'rgba(255,255,255,0.06)',
            borderRadius: '6px', overflow: 'hidden', marginBottom: '10px'
          }}>
            <div style={{
              height: '100%', borderRadius: '6px',
              background: `linear-gradient(90deg, ${accentColor}, ${accentLight})`,
              width: `${progress}%`, transition: 'width 0.5s ease'
            }}></div>
          </div>

          {/* Question step dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                height: '4px', borderRadius: '2px',
                width: i === currentQ ? '28px' : '16px',
                background: i < currentQ
                  ? accentColor
                  : i === currentQ
                  ? accentLight
                  : 'rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease'
              }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: emailMockup ? '1fr 1fr' : '1fr',
          gap: '36px',
          maxWidth: emailMockup ? '1020px' : '680px',
          alignItems: 'start'
        }}>

          {/* LEFT — Question + options */}
          <div>
            {/* Question number */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '10px', marginBottom: '16px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
                border: `1px solid ${accentColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: '800', color: accentLight
              }}>
                {currentQ + 1}
              </div>
              <span style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', letterSpacing: '0.08em'
              }}>
                Question {currentQ + 1}
              </span>
            </div>

            {/* Question text */}
            <h2 style={{
              color: '#ffffff', fontWeight: '700',
              fontSize: '19px', lineHeight: '1.65',
              margin: '0 0 24px', letterSpacing: '-0.3px'
            }}>
              {question.question}
            </h2>

            {/* Options */}
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
                      borderRadius: '14px', padding: '16px 18px',
                      cursor: answered ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '14px',
                      background: isThisCorrect
                        ? 'rgba(0,102,0,0.15)'
                        : isThisWrong
                        ? 'rgba(187,0,0,0.12)'
                        : isThisUnselected
                        ? 'rgba(255,255,255,0.01)'
                        : 'rgba(255,255,255,0.04)',
                      border: isThisCorrect
                        ? '1px solid rgba(0,102,0,0.5)'
                        : isThisWrong
                        ? '1px solid rgba(187,0,0,0.5)'
                        : '1px solid rgba(255,255,255,0.07)',
                      opacity: isThisUnselected ? 0.35 : 1,
                      transition: 'all 0.2s ease',
                      transform: isThisCorrect ? 'scale(1.01)' : 'scale(1)'
                    }}
                    onMouseOver={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.border = `1px solid ${accentColor}55`;
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseOut={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      flexShrink: 0, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '12px', fontWeight: '800',
                      background: isThisCorrect
                        ? '#006600'
                        : isThisWrong
                        ? '#BB0000'
                        : 'rgba(255,255,255,0.07)',
                      color: isThisCorrect || isThisWrong
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.4)',
                      border: isThisCorrect
                        ? '2px solid rgba(0,150,0,0.6)'
                        : isThisWrong
                        ? '2px solid rgba(220,0,0,0.6)'
                        : '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.2s'
                    }}>
                      {isThisCorrect ? '✓' : isThisWrong ? '✕' : String.fromCharCode(65 + index)}
                    </div>
                    <span style={{
                      color: isThisCorrect
                        ? '#69db7c'
                        : isThisWrong
                        ? '#ff8080'
                        : 'rgba(255,255,255,0.85)',
                      fontSize: '14px', lineHeight: '1.55', fontWeight: isThisCorrect ? '600' : '400'
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
                marginTop: '20px', borderRadius: '14px', padding: '20px',
                background: isCorrect
                  ? 'linear-gradient(135deg, rgba(0,102,0,0.12), rgba(0,102,0,0.06))'
                  : 'linear-gradient(135deg, rgba(187,0,0,0.1), rgba(187,0,0,0.05))',
                border: `1px solid ${isCorrect ? 'rgba(0,102,0,0.35)' : 'rgba(187,0,0,0.35)'}`,
                borderLeft: `4px solid ${isCorrect ? '#006600' : '#BB0000'}`
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: '10px', marginBottom: '12px'
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: isCorrect ? 'rgba(0,102,0,0.3)' : 'rgba(187,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', flexShrink: 0
                  }}>
                    {isCorrect ? '✅' : '❌'}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '700', fontSize: '15px',
                      color: isCorrect ? '#69db7c' : '#ff8080',
                      marginBottom: '2px'
                    }}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    {!isCorrect && (
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                        Correct answer was option {String.fromCharCode(65 + question.correctIndex)}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{
                  height: '1px', background: isCorrect
                    ? 'rgba(0,102,0,0.2)'
                    : 'rgba(187,0,0,0.2)',
                  marginBottom: '12px'
                }}></div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '14px', lineHeight: '1.75', margin: 0
                }}>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Next button */}
            {answered && (
              <button onClick={handleNext} style={{
                marginTop: '16px', width: '100%',
                background: `linear-gradient(135deg, ${accentColor}, ${isPost ? '#cc8400' : '#005500'})`,
                color: '#fff', border: 'none',
                borderRadius: '14px', padding: '16px',
                fontSize: '15px', fontWeight: '700',
                cursor: 'pointer', letterSpacing: '0.02em',
                transition: 'opacity 0.2s',
                boxShadow: `0 4px 20px ${accentColor}40`
              }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
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
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#0d150d',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}>
                {/* Mac toolbar */}
                <div style={{
                  background: '#1a1a1a',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  padding: '12px 18px',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#BB0000', opacity: 0.8 }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ea9600', opacity: 0.8 }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#006600', opacity: 0.8 }}></div>
                  <span style={{
                    fontSize: '11px', color: 'rgba(255,255,255,0.2)',
                    marginLeft: '12px', fontFamily: 'monospace'
                  }}>
                    Mail — Inbox
                  </span>
                </div>

                {/* Email headers */}
                <div style={{
                  padding: '18px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', color: 'rgba(255,255,255,0.25)',
                      width: '54px', flexShrink: 0
                    }}>From:</span>
                    <span style={{
                      fontSize: '12px', color: '#ff8080',
                      fontFamily: 'monospace',
                      background: 'rgba(187,0,0,0.12)',
                      padding: '4px 10px', borderRadius: '6px',
                      border: '1px solid rgba(187,0,0,0.2)'
                    }}>
                      {emailMockup.from}
                    </span>
                  </div>

                  {emailMockup.to && (
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '11px', color: 'rgba(255,255,255,0.25)',
                        width: '54px', flexShrink: 0
                      }}>To:</span>
                      <span style={{
                        fontSize: '12px', color: 'rgba(255,255,255,0.45)',
                        fontFamily: 'monospace'
                      }}>
                        {emailMockup.to}
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', color: 'rgba(255,255,255,0.25)',
                      width: '54px', flexShrink: 0
                    }}>Subject:</span>
                    <span style={{
                      fontSize: '14px', color: '#ffffff', fontWeight: '700'
                    }}>
                      {emailMockup.subject}
                    </span>
                  </div>
                </div>

                {/* Email body */}
                <div style={{ padding: '18px 20px' }}>
                  <p style={{
                    fontSize: '13px', color: 'rgba(255,255,255,0.6)',
                    lineHeight: '1.8', margin: '0 0 16px'
                  }}>
                    {emailMockup.body}
                  </p>

                  {emailMockup.link && (
                    <div style={{
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '10px'
                    }}>
                      <div style={{
                        fontSize: '10px', color: 'rgba(255,255,255,0.25)',
                        marginBottom: '6px', textTransform: 'uppercase',
                        letterSpacing: '0.07em'
                      }}>
                        Link in email:
                      </div>
                      <span style={{
                        fontSize: '12px', color: '#ff8080',
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