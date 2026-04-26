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

  const Bg = () => (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
      </svg>
      <div style={{ position: 'fixed', bottom: '-30px', right: 0, width: '400px', height: '160px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="120" width="14" height="60"/><rect x="200" y="40" width="28" height="140"/>
          <rect x="130" y="80" width="20" height="100"/><rect x="260" y="60" width="24" height="120"/>
          <rect x="320" y="90" width="18" height="90"/><rect x="0" y="178" width="400" height="2"/>
        </svg>
      </div>
    </>
  );

  const NavBar = () => (
    <nav style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', height: '62px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(145deg, #cc0000, #7a0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(187,0,0,0.28)', flexShrink: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
        </div>
        <span style={{ fontSize: '19px', fontWeight: '800', letterSpacing: '-0.4px' }}>
          <span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '7px', background: isPost ? 'rgba(234,150,0,0.10)' : 'rgba(0,102,0,0.08)', border: `1px solid ${isPost ? 'rgba(234,150,0,0.24)' : 'rgba(0,102,0,0.18)'}` }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }}/>
          <span style={{ color: accentColor, fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{isPost ? 'Post-Assessment' : 'Pre-Assessment'}</span>
        </div>
        <div style={{ padding: '5px 12px', borderRadius: '7px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
          <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '11px', fontWeight: '600' }}>{department}</span>
        </div>
        <button onClick={() => navigate('/awareness/modules', { state: { department } })} style={{ padding: '7px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)', color: '#333', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.95)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.70)'}>
          ← Modules
        </button>
      </div>
    </nav>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
        <Bg/><NavBar/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '32px' }}>
          <div style={{ width: '100%', maxWidth: '460px' }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', background: 'rgba(14,20,14,0.96)', border: `1px solid ${accentColor}30`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 20px 60px rgba(0,0,0,0.16)' }}>
              <div style={{ height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, transparent)` }}/>
              <div style={{ padding: '32px 32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '24px' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <svg style={{ animation: 'spin 2s linear infinite', position: 'absolute', inset: '-8px' }} width="72" height="72" viewBox="0 0 72 72" fill="none">
                      <circle cx="36" cy="36" r="32" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5"/>
                      <path d="M36 4a32 32 0 0 1 32 32" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M36 4a32 32 0 0 0-32 32" stroke={accentLight} strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
                    </svg>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${accentColor}18`, border: `1px solid ${accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', animation: 'float 3s ease-in-out infinite' }}>🤖</div>
                  </div>
                  <div>
                    <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: '900', letterSpacing: '-0.3px', marginBottom: '5px' }}>
                      {isPost ? 'Generating post-assessment...' : 'Generating your quiz...'}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '12px', lineHeight: '1.5' }}>
                      GPT-4o creating questions for <span style={{ color: accentLight, fontWeight: '700' }}>{department}</span>
                    </div>
                  </div>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '18px' }}/>
                {[
                  { icon: '🏦', label: 'Analysing your department role' },
                  { icon: '📝', label: 'Creating scenario-based questions' },
                  { icon: '🇰🇪', label: 'Adding Kenyan banking context' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < 2 ? '10px' : '0', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${accentColor}18` }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: `${accentColor}14`, border: `1px solid ${accentColor}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{step.icon}</div>
                    <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: '13px', fontWeight: '500', flex: 1 }}>{step.label}</span>
                    <svg style={{ animation: 'spin 1.5s linear infinite', flexShrink: 0, animationDelay: `${i * 0.25}s` }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"/>
                      <path d="M12 3a9 9 0 0 1 9 9" stroke={accentLight} strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                ))}
                <div style={{ marginTop: '18px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '11px', fontWeight: '500' }}>This typically takes 10–20 seconds — do not close this page</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <Bg/><NavBar/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '32px' }}>
          <div style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', padding: '32px', background: 'rgba(14,20,14,0.96)', border: '1px solid rgba(187,0,0,0.25)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 12px 48px rgba(0,0,0,0.16)', textAlign: 'center' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, #7a0000, transparent)', borderRadius: '2px', marginBottom: '24px' }}/>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>⚠️</div>
            <div style={{ color: '#ff8080', fontSize: '15px', fontWeight: '800', marginBottom: '8px' }}>Failed to load quiz</div>
            <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', lineHeight: '1.65', marginBottom: '24px' }}>{error}</div>
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

  const getOptionStyle = (index) => {
    if (!answered) return {
      bg: 'rgba(18,26,18,0.95)',
      border: '1px solid rgba(255,255,255,0.12)',
      shadow: '0 2px 12px rgba(0,0,0,0.18)',
      textColor: '#ffffff',
      badgeBg: 'rgba(255,255,255,0.12)',
      badgeColor: 'rgba(255,255,255,0.70)',
      badgeText: String.fromCharCode(65 + index),
      accentBar: null,
      opacity: 1,
    };
    const isThisCorrect = index === question.correctIndex;
    const isThisWrong = index === selected && index !== question.correctIndex;
    if (isThisCorrect) return {
      bg: 'rgba(0,60,10,1)',
      border: '1px solid rgba(34,197,94,0.55)',
      shadow: '0 4px 24px rgba(0,120,40,0.35)',
      textColor: '#4ade80',
      badgeBg: '#006600',
      badgeColor: '#ffffff',
      badgeText: '✓',
      accentBar: '#22c55e',
      opacity: 1,
    };
    if (isThisWrong) return {
      bg: 'rgba(80,0,0,1)',
      border: '1px solid rgba(239,68,68,0.55)',
      shadow: '0 4px 24px rgba(140,0,0,0.35)',
      textColor: '#ff8080',
      badgeBg: '#BB0000',
      badgeColor: '#ffffff',
      badgeText: '✕',
      accentBar: '#ef4444',
      opacity: 1,
    };
    return {
      bg: 'rgba(14,18,14,0.70)',
      border: '1px solid rgba(255,255,255,0.05)',
      shadow: 'none',
      textColor: 'rgba(255,255,255,0.22)',
      badgeBg: 'rgba(255,255,255,0.07)',
      badgeColor: 'rgba(255,255,255,0.22)',
      badgeText: String.fromCharCode(65 + index),
      accentBar: null,
      opacity: 0.55,
    };
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(34,197,94,0.3)} 50%{box-shadow:0 0 18px rgba(34,197,94,0.6)} }
      `}</style>

      <Bg/><NavBar/>

      {/* ── QUIZ HEADER ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0, background: 'rgba(8,14,8,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: `1px solid ${accentColor}20` }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, rgba(255,255,255,0.04))`, backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
        <div style={{ padding: '13px 44px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 13px', borderRadius: '8px', background: `${accentColor}18`, border: `1px solid ${accentColor}35` }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }}/>
                <span style={{ fontSize: '11px', fontWeight: '900', color: accentLight, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{isPost ? 'Post-Assessment' : 'Pre-Assessment'}</span>
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '14px', letterSpacing: '-0.2px', marginBottom: '2px' }}>{module}</div>
                <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: '11px' }}>{department} · Q{currentQ + 1} of {questions.length}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                {questions.map((_, i) => (
                  <div key={i} style={{ height: '6px', borderRadius: '3px', width: i === currentQ ? '22px' : '8px', background: i < currentQ ? accentColor : i === currentQ ? accentLight : 'rgba(255,255,255,0.12)', transition: 'all 0.3s ease' }}/>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '9px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '600' }}>Score</span>
                <span style={{ fontSize: '20px', fontWeight: '900', color: accentLight, letterSpacing: '-0.5px', lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.20)' }}>/{questions.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ height: '100%', background: `linear-gradient(90deg, ${accentColor}, ${accentLight})`, width: `${progress}%`, transition: 'width 0.5s ease', boxShadow: `0 0 8px ${accentColor}70` }}/>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 10, padding: '28px 44px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: emailMockup ? '1fr 1fr' : '1fr', gap: '28px', maxWidth: emailMockup ? '1060px' : '680px', alignItems: 'start' }}>

          <div>
            {/* Question card */}
            <div style={{ borderRadius: '18px', marginBottom: '14px', background: 'rgba(8,14,8,0.98)', border: `1px solid ${accentColor}28`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: `0 8px 32px rgba(0,0,0,0.18)`, position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.3s ease both' }}>
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, ${accentColor})`, backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)', pointerEvents: 'none' }} />
              <div style={{ padding: '20px 24px 22px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${accentColor}22`, border: `1px solid ${accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '900', color: accentLight }}>
                    {currentQ + 1}
                  </div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700' }}>Question {currentQ + 1} of {questions.length}</span>
                  <span style={{ fontSize: '10px', color: `${accentColor}90`, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>· {module}</span>
                </div>
                <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '17px', lineHeight: '1.70', margin: 0, letterSpacing: '-0.2px' }}>
                  {question.question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {question.options.map((option, index) => {
                const s = getOptionStyle(index);
                return (
                  <div key={index} onClick={() => handleAnswer(index)} style={{
                    borderRadius: '13px', padding: '14px 16px',
                    cursor: answered ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: s.bg,
                    border: s.border,
                    boxShadow: s.shadow,
                    opacity: s.opacity,
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    transition: 'all 0.22s ease',
                    position: 'relative', overflow: 'hidden',
                    animation: `slideIn 0.3s ease ${index * 0.05}s both`,
                  }}
                    onMouseOver={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(24,36,24,0.99)';
                        e.currentTarget.style.border = `1px solid ${accentColor}55`;
                        e.currentTarget.style.transform = 'translateX(5px)';
                        e.currentTarget.style.boxShadow = `4px 0 0 ${accentColor}, 0 4px 20px rgba(0,0,0,0.22)`;
                      }
                    }}
                    onMouseOut={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(18,26,18,0.95)';
                        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)';
                      }
                    }}>
                    {/* Accent bar */}
                    {s.accentBar && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: s.accentBar, borderRadius: '13px 0 0 13px' }}/>}
                    {/* Letter badge */}
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', background: s.badgeBg, color: s.badgeColor, border: s.accentBar ? `2px solid ${s.accentBar}55` : '1px solid rgba(255,255,255,0.16)', transition: 'all 0.22s', boxShadow: s.accentBar ? `0 2px 12px ${s.accentBar}40` : 'none' }}>
                      {s.badgeText}
                    </div>
                    <span style={{ color: s.textColor, fontSize: '13px', lineHeight: '1.55', fontWeight: s.accentBar ? '700' : '500', transition: 'color 0.22s' }}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <div style={{
                borderRadius: '14px', padding: '18px 20px', marginBottom: '14px',
                background: isCorrect ? 'rgba(0,50,10,0.98)' : 'rgba(70,0,0,0.98)',
                border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.40)' : 'rgba(239,68,68,0.40)'}`,
                borderLeft: `4px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                animation: 'fadeIn 0.3s ease both',
                boxShadow: isCorrect ? '0 6px 28px rgba(0,120,40,0.22)' : '0 6px 28px rgba(140,0,0,0.22)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isCorrect ? 'rgba(34,197,94,0.22)' : 'rgba(239,68,68,0.22)', border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>
                    {isCorrect ? '✅' : '❌'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '900', fontSize: '15px', color: isCorrect ? '#4ade80' : '#ff8080', marginBottom: '2px', letterSpacing: '-0.1px' }}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    {!isCorrect && <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.40)' }}>Correct answer: option {String.fromCharCode(65 + question.correctIndex)}</div>}
                  </div>
                </div>
                <div style={{ height: '1px', background: isCorrect ? 'rgba(34,197,94,0.20)' : 'rgba(239,68,68,0.20)', marginBottom: '10px' }}/>
                <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: '1.80', margin: 0, fontWeight: '400' }}>{question.explanation}</p>
              </div>
            )}

            {/* Next button */}
            {answered && (
              <button onClick={handleNext} style={{ width: '100%', background: `linear-gradient(135deg, ${accentColor}, ${isPost ? '#b37000' : '#004d00'})`, color: '#fff', border: 'none', borderRadius: '13px', padding: '15px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.18s', boxShadow: `0 6px 24px ${accentColor}45`, animation: 'fadeIn 0.3s ease both', letterSpacing: '0.01em' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 32px ${accentColor}55`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 24px ${accentColor}45`; }}>
                {currentQ < questions.length - 1 ? 'Next Question →' : isPost ? 'See My Results →' : 'Continue to Learning Content →'}
              </button>
            )}
          </div>

          {/* Email mockup */}
          {emailMockup && (
            <div style={{ animation: 'fadeIn 0.4s ease 0.12s both' }}>
              <div style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📧</span> Email in Question
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(8,14,8,0.98)', boxShadow: '0 8px 40px rgba(0,0,0,0.20)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#BB0000', opacity: 0.85 }}/>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ea9600', opacity: 0.85 }}/>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#006600', opacity: 0.85 }}/>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.20)', marginLeft: '10px', fontFamily: 'monospace' }}>Mail — Inbox</span>
                </div>
                <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '9px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', width: '52px', flexShrink: 0, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>From</span>
                    <span style={{ fontSize: '12px', color: '#ff8080', fontFamily: 'monospace', background: 'rgba(187,0,0,0.14)', padding: '3px 9px', borderRadius: '6px', border: '1px solid rgba(187,0,0,0.24)' }}>{emailMockup.from}</span>
                  </div>
                  {emailMockup.to && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '9px', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', width: '52px', flexShrink: 0, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>To</span>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{emailMockup.to}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', width: '52px', flexShrink: 0, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subject</span>
                    <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '800', letterSpacing: '-0.1px' }}>{emailMockup.subject}</span>
                  </div>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.62)', lineHeight: '1.80', margin: '0 0 14px' }}>{emailMockup.body}</p>
                  {emailMockup.link && (
                    <div style={{ padding: '10px 13px', background: 'rgba(187,0,0,0.10)', border: '1px solid rgba(187,0,0,0.20)', borderLeft: '3px solid #BB0000', borderRadius: '9px' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.30)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: '700' }}>Suspicious Link:</div>
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