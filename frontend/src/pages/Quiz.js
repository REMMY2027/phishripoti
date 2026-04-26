import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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

  useEffect(() => { generateQuestions(); }, []); // eslint-disable-line

  const generateQuestions = async () => {
    setLoading(true); setError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/awareness/generate-quiz`,
        { module, department, isPost },
        { timeout: 60000 }
      );
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Error loading quiz questions. Please wait 30 seconds and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[currentQ].correctIndex) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      if (!isPost) {
        navigate('/awareness/learn', { state: { score, total: questions.length, module, department } });
      } else {
        navigate('/awareness/complete', { state: { score, total: questions.length, module, department, preScore, postScore: score } });
      }
    }
  };

  const accentColor = isPost ? '#ea9600' : '#006600';
  const accentLight = isPost ? '#ffd166' : '#4ade80';

  // ── SHARED BG + NAVBAR ──
  const BgAndNav = () => (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
      </svg>
      <div style={{ position: 'fixed', bottom: '-30px', right: 0, width: '400px', height: '160px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="120" width="14" height="60"/><rect x="200" y="40" width="28" height="140"/>
          <rect x="130" y="80" width="20" height="100"/><rect x="260" y="60" width="24" height="120"/>
          <rect x="320" y="90" width="18" height="90"/><rect x="0" y="178" width="400" height="2"/>
        </svg>
      </div>

      {/* Navbar */}
      <nav style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', height: '66px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(187,0,0,0.30)', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.4px' }}>
            <span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '8px', background: isPost ? 'rgba(234,150,0,0.08)' : 'rgba(0,102,0,0.07)', border: `1px solid ${isPost ? 'rgba(234,150,0,0.20)' : 'rgba(0,102,0,0.16)'}` }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }}/>
            <span style={{ color: accentColor, fontSize: '11px', fontWeight: '700' }}>{isPost ? 'Post-Assessment' : 'Pre-Assessment'}</span>
          </div>
          <div style={{ padding: '5px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '11px', fontWeight: '600' }}>{department}</span>
          </div>
          <button onClick={() => navigate('/awareness/modules', { state: { department } })} style={{ padding: '7px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)', color: '#333', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.95)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.70)'}>
            ← Modules
          </button>
        </div>
      </nav>
    </>
  );

  // ── LOADING ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }`}</style>
        <BgAndNav />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '420px' }}>
            {/* Spinner */}
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 28px', animation: 'float 3s ease-in-out infinite' }}>
              <svg style={{ animation: 'spin 2s linear infinite', position: 'absolute', inset: 0 }} width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" stroke="rgba(0,0,0,0.06)" strokeWidth="3"/>
                <path d="M40 4a36 36 0 0 1 36 36" stroke={accentColor} strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🤖</div>
            </div>

            {/* Card */}
            <div style={{ borderRadius: '20px', padding: '28px 32px', background: 'rgba(14,20,14,0.94)', border: `1px solid ${accentColor}30`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 8px 40px rgba(0,0,0,0.14)' }}>
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, transparent)`, borderRadius: '2px', marginBottom: '20px' }}/>
              <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                {isPost ? 'Generating post-assessment...' : 'Generating your personalised quiz...'}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                GPT-4o is creating tailored questions for <span style={{ color: accentLight, fontWeight: '700' }}>{department}</span>
              </div>
              {/* Steps */}
              {['Analysing your department role', 'Creating scenario-based questions', 'Adding Kenyan banking context'].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 2 ? '10px' : '0', padding: '9px 12px', borderRadius: '9px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <svg style={{ animation: 'spin 1.5s linear infinite', flexShrink: 0, animationDelay: `${i * 0.3}s` }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.10)" strokeWidth="2.5"/>
                    <path d="M12 3a9 9 0 0 1 9 9" stroke={accentLight} strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: '12px', fontWeight: '500' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ERROR ──
  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <BgAndNav />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '32px' }}>
          <div style={{ textAlign: 'center', maxWidth: '420px', borderRadius: '20px', padding: '32px', background: 'rgba(14,20,14,0.94)', border: '1px solid rgba(187,0,0,0.25)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 8px 40px rgba(0,0,0,0.14)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
            <div style={{ color: '#ff8080', fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Failed to load quiz</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: '1.65', marginBottom: '24px' }}>{error}</div>
            <button onClick={generateQuestions} style={{ background: 'linear-gradient(135deg, #BB0000, #880000)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 16px rgba(187,0,0,0.30)' }}>Try Again →</button>
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>

      <BgAndNav />

      {/* ── QUIZ HEADER ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, transparent)` }}/>
        <div style={{ padding: '14px 44px 12px' }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Assessment badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 13px', borderRadius: '8px', background: isPost ? 'rgba(234,150,0,0.10)' : 'rgba(0,102,0,0.10)', border: `1px solid ${isPost ? 'rgba(234,150,0,0.25)' : 'rgba(0,102,0,0.22)'}` }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }}/>
                <span style={{ fontSize: '11px', fontWeight: '800', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{isPost ? 'Post-Assessment' : 'Pre-Assessment'}</span>
              </div>
              <div>
                <div style={{ color: '#111111', fontWeight: '800', fontSize: '15px', letterSpacing: '-0.2px' }}>{module}</div>
                <div style={{ color: 'rgba(0,0,0,0.40)', fontSize: '11px', fontWeight: '500' }}>{department} · Question {currentQ + 1} of {questions.length}</div>
              </div>
            </div>
            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 16px', borderRadius: '10px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.40)', fontWeight: '600' }}>Score</span>
              <span style={{ fontSize: '20px', fontWeight: '900', color: accentColor, letterSpacing: '-0.5px' }}>{score}</span>
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.28)', fontWeight: '500' }}>/ {questions.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: '6px', background: 'rgba(0,0,0,0.08)', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ height: '100%', borderRadius: '6px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight})`, width: `${progress}%`, transition: 'width 0.5s ease' }}/>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {questions.map((_, i) => (
              <div key={i} style={{ height: '4px', borderRadius: '2px', width: i === currentQ ? '28px' : '14px', background: i < currentQ ? accentColor : i === currentQ ? accentLight : 'rgba(0,0,0,0.12)', transition: 'all 0.3s ease' }}/>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 10, padding: '28px 44px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: emailMockup ? '1fr 1fr' : '1fr', gap: '32px', maxWidth: emailMockup ? '1060px' : '680px', alignItems: 'start' }}>

          {/* ── LEFT: Question + Options ── */}
          <div style={{ animation: 'fadeIn 0.3s ease both' }}>

            {/* Question card */}
            <div style={{ borderRadius: '16px', padding: '22px 24px', marginBottom: '16px', background: 'rgba(14,20,14,0.94)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${accentColor}55, transparent)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: `${accentColor}22`, border: `1px solid ${accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', color: accentLight }}>
                  {currentQ + 1}
                </div>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700' }}>Question {currentQ + 1} of {questions.length}</span>
              </div>
              <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '17px', lineHeight: '1.65', margin: 0, letterSpacing: '-0.2px', position: 'relative', zIndex: 1 }}>
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {question.options.map((option, index) => {
                const isThisCorrect = answered && index === question.correctIndex;
                const isThisWrong = answered && index === selected && index !== question.correctIndex;
                const isThisUnselected = answered && index !== selected && index !== question.correctIndex;

                return (
                  <div key={index} onClick={() => handleAnswer(index)} style={{
                    borderRadius: '12px', padding: '14px 16px',
                    cursor: answered ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: isThisCorrect ? 'rgba(0,102,0,0.16)' : isThisWrong ? 'rgba(187,0,0,0.14)' : isThisUnselected ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                    border: isThisCorrect ? '1px solid rgba(0,150,0,0.45)' : isThisWrong ? '1px solid rgba(187,0,0,0.45)' : '1px solid rgba(255,255,255,0.08)',
                    opacity: isThisUnselected ? 0.32 : 1,
                    transition: 'all 0.2s ease',
                    transform: isThisCorrect ? 'scale(1.01)' : 'scale(1)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                  }}
                    onMouseOver={e => { if (!answered) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.border = `1px solid ${accentColor}45`; e.currentTarget.style.transform = 'translateX(4px)'; } }}
                    onMouseOut={e => { if (!answered) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateX(0)'; } }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '900', background: isThisCorrect ? '#006600' : isThisWrong ? '#BB0000' : 'rgba(255,255,255,0.08)', color: isThisCorrect || isThisWrong ? '#fff' : 'rgba(255,255,255,0.45)', border: isThisCorrect ? '2px solid rgba(0,150,0,0.55)' : isThisWrong ? '2px solid rgba(220,0,0,0.55)' : '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s', boxShadow: isThisCorrect ? '0 2px 10px rgba(0,102,0,0.35)' : isThisWrong ? '0 2px 10px rgba(187,0,0,0.35)' : 'none' }}>
                      {isThisCorrect ? '✓' : isThisWrong ? '✕' : String.fromCharCode(65 + index)}
                    </div>
                    <span style={{ color: isThisCorrect ? '#4ade80' : isThisWrong ? '#ff8080' : 'rgba(255,255,255,0.84)', fontSize: '13px', lineHeight: '1.55', fontWeight: isThisCorrect ? '700' : '500' }}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <div style={{ borderRadius: '14px', padding: '18px 20px', marginBottom: '14px', background: isCorrect ? 'rgba(0,80,0,0.16)' : 'rgba(140,0,0,0.12)', border: `1px solid ${isCorrect ? 'rgba(0,150,0,0.32)' : 'rgba(187,0,0,0.32)'}`, borderLeft: `4px solid ${isCorrect ? '#006600' : '#BB0000'}`, animation: 'fadeIn 0.3s ease both' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: isCorrect ? 'rgba(0,102,0,0.28)' : 'rgba(187,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>
                    {isCorrect ? '✅' : '❌'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: isCorrect ? '#4ade80' : '#ff8080', marginBottom: '2px' }}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    {!isCorrect && <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)' }}>Correct answer: option {String.fromCharCode(65 + question.correctIndex)}</div>}
                  </div>
                </div>
                <div style={{ height: '1px', background: isCorrect ? 'rgba(0,150,0,0.18)' : 'rgba(187,0,0,0.18)', marginBottom: '10px' }}/>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '13px', lineHeight: '1.75', margin: 0 }}>{question.explanation}</p>
              </div>
            )}

            {/* Next button */}
            {answered && (
              <button onClick={handleNext} style={{ width: '100%', background: `linear-gradient(135deg, ${accentColor}, ${isPost ? '#b37000' : '#004d00'})`, color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', letterSpacing: '0.02em', transition: 'all 0.18s', boxShadow: `0 4px 18px ${accentColor}40`, animation: 'fadeIn 0.3s ease both' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${accentColor}50`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 18px ${accentColor}40`; }}>
                {currentQ < questions.length - 1 ? 'Next Question →' : isPost ? 'See My Results →' : 'Continue to Learning Content →'}
              </button>
            )}
          </div>

          {/* ── RIGHT: Email mockup ── */}
          {emailMockup && (
            <div style={{ animation: 'fadeIn 0.4s ease 0.1s both' }}>
              <div style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(0,0,0,0.40)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px' }}>📧</span> Email in Question
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(10,16,10,0.96)', boxShadow: '0 8px 40px rgba(0,0,0,0.20)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}>
                {/* Mac toolbar */}
                <div style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#BB0000', opacity: 0.85 }}/>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ea9600', opacity: 0.85 }}/>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#006600', opacity: 0.85 }}/>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.20)', marginLeft: '10px', fontFamily: 'monospace' }}>Mail — Inbox</span>
                </div>

                {/* Email headers */}
                <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '9px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', width: '50px', flexShrink: 0, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>From</span>
                    <span style={{ fontSize: '12px', color: '#ff8080', fontFamily: 'monospace', background: 'rgba(187,0,0,0.12)', padding: '3px 9px', borderRadius: '6px', border: '1px solid rgba(187,0,0,0.22)' }}>{emailMockup.from}</span>
                  </div>
                  {emailMockup.to && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '9px', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', width: '50px', flexShrink: 0, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>To</span>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{emailMockup.to}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', width: '50px', flexShrink: 0, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subject</span>
                    <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '800', letterSpacing: '-0.1px' }}>{emailMockup.subject}</span>
                  </div>
                </div>

                {/* Email body */}
                <div style={{ padding: '16px 18px' }}>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: '1.80', margin: '0 0 14px' }}>{emailMockup.body}</p>
                  {emailMockup.link && (
                    <div style={{ padding: '10px 13px', background: 'rgba(187,0,0,0.08)', border: '1px solid rgba(187,0,0,0.18)', borderRadius: '9px' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: '700' }}>Suspicious Link:</div>
                      <span style={{ fontSize: '12px', color: '#ff8080', fontFamily: 'monospace', wordBreak: 'break-all' }}>{emailMockup.link}</span>
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