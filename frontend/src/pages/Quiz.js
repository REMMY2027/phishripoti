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

  const AbstractBg = () => (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />

      {/* Abstract SVG graphics — more complex than before */}
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        {/* Flow curves */}
        <path d="M -100 300 Q 200 180 500 320 T 1100 280 T 1600 300" fill="none" stroke="rgba(0,100,30,0.045)" strokeWidth="1.5"/>
        <path d="M -100 450 Q 250 330 600 460 T 1200 400" fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>
        <path d="M 1600 200 Q 1200 280 900 180 T 300 220" fill="none" stroke="rgba(140,0,0,0.03)" strokeWidth="1"/>
        {/* Large arcs */}
        <circle cx="-80" cy="100" r="260" fill="none" stroke="rgba(0,100,30,0.035)" strokeWidth="1"/>
        <circle cx="-80" cy="100" r="200" fill="none" stroke="rgba(0,100,30,0.025)" strokeWidth="0.8"/>
        <circle cx="108%" cy="88%" r="240" fill="none" stroke="rgba(140,0,0,0.035)" strokeWidth="1"/>
        <circle cx="108%" cy="88%" r="170" fill="none" stroke="rgba(140,0,0,0.025)" strokeWidth="0.8"/>
        {/* Top-right arc cluster */}
        <circle cx="95%" cy="5%" r="180" fill="none" stroke="rgba(0,80,30,0.03)" strokeWidth="0.8"/>
        <circle cx="95%" cy="5%" r="120" fill="none" stroke="rgba(0,80,30,0.025)" strokeWidth="0.6"/>
        {/* Dot network */}
        <circle cx="8%" cy="22%" r="3" fill="rgba(0,100,30,0.10)"/>
        <circle cx="13%" cy="42%" r="2" fill="rgba(0,100,30,0.07)"/>
        <circle cx="6%" cy="58%" r="1.5" fill="rgba(0,100,30,0.05)"/>
        <circle cx="89%" cy="18%" r="3" fill="rgba(140,0,0,0.10)"/>
        <circle cx="93%" cy="36%" r="2" fill="rgba(140,0,0,0.07)"/>
        <circle cx="87%" cy="52%" r="1.5" fill="rgba(140,0,0,0.05)"/>
        <circle cx="45%" cy="8%" r="2" fill="rgba(0,80,30,0.06)"/>
        <circle cx="55%" cy="92%" r="2" fill="rgba(100,0,0,0.06)"/>
        {/* Connecting lines */}
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.06)" strokeWidth="0.8"/>
        <line x1="13%" y1="42%" x2="6%" y2="58%" stroke="rgba(0,100,30,0.04)" strokeWidth="0.6"/>
        <line x1="89%" y1="18%" x2="93%" y2="36%" stroke="rgba(140,0,0,0.06)" strokeWidth="0.8"/>
        <line x1="93%" y1="36%" x2="87%" y2="52%" stroke="rgba(140,0,0,0.04)" strokeWidth="0.6"/>
        {/* Diagonal cross lines — subtle */}
        <line x1="0%" y1="100%" x2="30%" y2="60%" stroke="rgba(0,80,20,0.02)" strokeWidth="1"/>
        <line x1="100%" y1="0%" x2="70%" y2="40%" stroke="rgba(100,0,0,0.02)" strokeWidth="1"/>
        {/* Small grid dots centre */}
        {[0,1,2,3,4].map(x => [0,1,2].map(y => (
          <circle key={`${x}-${y}`} cx={`${38 + x * 6}%`} cy={`${78 + y * 7}%`} r="1" fill="rgba(0,80,20,0.04)"/>
        )))}
      </svg>

      {/* Nairobi skyline */}
      <div style={{ position: 'fixed', bottom: '-30px', right: 0, width: '520px', height: '200px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.75) 60%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.75) 60%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.08">
          <rect x="10" y="160" width="16" height="60"/><rect x="30" y="150" width="12" height="70"/>
          <rect x="280" y="50" width="34" height="170"/><rect x="180" y="75" width="28" height="145"/>
          <ellipse cx="194" cy="75" rx="16" ry="7"/><rect x="340" y="70" width="30" height="150"/>
          <rect x="130" y="110" width="22" height="110"/><rect x="220" y="95" width="22" height="125"/>
          <rect x="380" y="90" width="24" height="130"/><rect x="430" y="115" width="22" height="105"/>
          <rect x="460" y="130" width="18" height="90"/><rect x="60" y="140" width="14" height="80"/>
          <rect x="0" y="218" width="520" height="2"/>
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
        <AbstractBg/><NavBar/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '32px' }}>
          <div style={{ width: '100%', maxWidth: '460px' }}>
            <div style={{ borderRadius: '22px', overflow: 'hidden', background: 'rgba(10,16,10,0.97)', border: `1px solid ${accentColor}28`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: `0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px ${accentColor}10` }}>
              <div style={{ height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, ${accentColor})`, backgroundSize: '200% 100%' }}/>
              <div style={{ padding: '32px 32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '26px' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <svg style={{ animation: 'spin 2.5s linear infinite', position: 'absolute', inset: '-10px' }} width="76" height="76" viewBox="0 0 76 76" fill="none">
                      <circle cx="38" cy="38" r="34" stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
                      <path d="M38 4a34 34 0 0 1 34 34" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M38 4a34 34 0 0 0-34 34" stroke={accentLight} strokeWidth="1.2" strokeLinecap="round" opacity="0.22"/>
                    </svg>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${accentColor}16`, border: `1px solid ${accentColor}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', animation: 'float 3s ease-in-out infinite' }}>🤖</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: `${accentLight}80`, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '6px' }}>GPT-4o Powered</div>
                    <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: '900', letterSpacing: '-0.4px', marginBottom: '4px', lineHeight: 1.3 }}>
                      {isPost ? 'Generating post-assessment...' : 'Generating your quiz...'}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', lineHeight: '1.5' }}>
                      Tailored for <span style={{ color: accentLight, fontWeight: '700' }}>{department}</span>
                    </div>
                  </div>
                </div>
                <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)`, marginBottom: '18px' }}/>
                {[
                  { icon: '🏦', label: 'Analysing your department role', sub: 'Understanding your threat exposure' },
                  { icon: '📝', label: 'Creating scenario-based questions', sub: 'Real phishing patterns from Kenyan banks' },
                  { icon: '🇰🇪', label: 'Adding local banking context', sub: 'M-Pesa, KCB, Equity Bank scenarios' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < 2 ? '9px' : '0', padding: '13px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${accentColor}15` }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${accentColor}14`, border: `1px solid ${accentColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{step.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: '700', marginBottom: '2px' }}>{step.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: '11px' }}>{step.sub}</div>
                    </div>
                    <svg style={{ animation: 'spin 1.5s linear infinite', flexShrink: 0, animationDelay: `${i * 0.28}s` }} width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5"/>
                      <path d="M12 3a9 9 0 0 1 9 9" stroke={accentLight} strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                ))}
                <div style={{ marginTop: '16px', padding: '9px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.24)', fontSize: '11px', fontWeight: '500' }}>Typically 10–20 seconds — do not close this page</span>
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
        <AbstractBg/><NavBar/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '32px' }}>
          <div style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', padding: '32px', background: 'rgba(10,14,10,0.97)', border: '1px solid rgba(187,0,0,0.25)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 12px 48px rgba(0,0,0,0.18)', textAlign: 'center' }}>
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
      bg: 'rgba(14,22,14,0.94)',
      border: '1px solid rgba(255,255,255,0.10)',
      shadow: '0 2px 10px rgba(0,0,0,0.16)',
      textColor: '#ffffff',
      badgeBg: 'rgba(255,255,255,0.10)',
      badgeColor: 'rgba(255,255,255,0.65)',
      badgeText: String.fromCharCode(65 + index),
      accentBar: null, opacity: 1,
    };
    const correct = index === question.correctIndex;
    const wrong = index === selected && !correct;
    if (correct) return {
      bg: 'rgba(0,55,12,1)',
      border: '1.5px solid rgba(34,197,94,0.60)',
      shadow: '0 6px 28px rgba(0,120,40,0.30)',
      textColor: '#4ade80',
      badgeBg: '#006600',
      badgeColor: '#ffffff',
      badgeText: '✓',
      accentBar: '#22c55e', opacity: 1,
    };
    if (wrong) return {
      bg: 'rgba(75,0,0,1)',
      border: '1.5px solid rgba(239,68,68,0.60)',
      shadow: '0 6px 28px rgba(140,0,0,0.30)',
      textColor: '#ff8080',
      badgeBg: '#BB0000',
      badgeColor: '#ffffff',
      badgeText: '✕',
      accentBar: '#ef4444', opacity: 1,
    };
    return {
      bg: 'rgba(10,14,10,0.55)',
      border: '1px solid rgba(255,255,255,0.04)',
      shadow: 'none',
      textColor: 'rgba(255,255,255,0.20)',
      badgeBg: 'rgba(255,255,255,0.05)',
      badgeColor: 'rgba(255,255,255,0.18)',
      badgeText: String.fromCharCode(65 + index),
      accentBar: null, opacity: 0.50,
    };
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes popIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
      `}</style>

      <AbstractBg/><NavBar/>

      {/* ── QUIZ HEADER ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0, background: 'rgba(8,13,8,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: `1px solid ${accentColor}18` }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, rgba(255,255,255,0.04))`, backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
        <div style={{ padding: '12px 44px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 13px', borderRadius: '8px', background: `${accentColor}16`, border: `1px solid ${accentColor}30` }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }}/>
              <span style={{ fontSize: '11px', fontWeight: '900', color: accentLight, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{isPost ? 'Post-Assessment' : 'Pre-Assessment'}</span>
            </div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '14px', letterSpacing: '-0.2px', marginBottom: '1px' }}>{module}</div>
              <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: '11px' }}>{department} · Q{currentQ + 1} of {questions.length}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {questions.map((_, i) => (
                <div key={i} style={{ height: '6px', borderRadius: '3px', width: i === currentQ ? '22px' : '8px', background: i < currentQ ? accentColor : i === currentQ ? accentLight : 'rgba(255,255,255,0.12)', transition: 'all 0.3s ease', boxShadow: i === currentQ ? `0 0 8px ${accentLight}60` : 'none' }}/>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '9px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Score</span>
              <span style={{ fontSize: '20px', fontWeight: '900', color: accentLight, letterSpacing: '-0.5px', lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.20)' }}>/{questions.length}</span>
            </div>
          </div>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', marginTop: '12px' }}>
          <div style={{ height: '100%', background: `linear-gradient(90deg, ${accentColor}, ${accentLight})`, width: `${progress}%`, transition: 'width 0.5s ease', boxShadow: `0 0 8px ${accentColor}60` }}/>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 10, padding: '28px 44px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: emailMockup ? '1fr 1fr' : '1fr', gap: '28px', maxWidth: emailMockup ? '1060px' : '700px', alignItems: 'start' }}>

          <div>
            {/* ── QUESTION CARD — premium ── */}
            <div style={{ borderRadius: '20px', marginBottom: '16px', background: 'rgba(8,14,8,0.98)', border: `1px solid ${accentColor}25`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: `0 10px 40px rgba(0,0,0,0.20), 0 0 0 1px ${accentColor}08`, position: 'relative', overflow: 'hidden', animation: 'fadeUp 0.35s ease both' }}>
              {/* Shimmer top */}
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${accentLight}, ${accentColor})`, backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
              {/* Glass sheen */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)', pointerEvents: 'none' }} />
              {/* Abstract bg pattern inside card */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.4 }} xmlns="http://www.w3.org/2000/svg">
                <circle cx="95%" cy="20%" r="60" fill="none" stroke={`${accentColor}`} strokeWidth="0.5" opacity="0.15"/>
                <circle cx="95%" cy="20%" r="40" fill="none" stroke={`${accentColor}`} strokeWidth="0.5" opacity="0.10"/>
                <circle cx="-5%" cy="80%" r="50" fill="none" stroke={`${accentLight}`} strokeWidth="0.5" opacity="0.10"/>
              </svg>

              <div style={{ padding: '22px 26px 24px', position: 'relative', zIndex: 1 }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: `${accentColor}22`, border: `1px solid ${accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', color: accentLight, boxShadow: `0 2px 12px ${accentColor}22` }}>
                      {currentQ + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700' }}>Question {currentQ + 1} of {questions.length}</div>
                      <div style={{ fontSize: '10px', color: `${accentColor}`, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1px' }}>{module}</div>
                    </div>
                  </div>
                  {/* Mini progress */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accentLight }}/>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', fontWeight: '600' }}>{Math.round(progress)}% complete</span>
                  </div>
                </div>

                {/* Question text */}
                <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '18px', lineHeight: '1.70', margin: 0, letterSpacing: '-0.3px' }}>
                  {question.question}
                </h2>
              </div>
            </div>

            {/* ── OPTIONS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '18px' }}>
              {question.options.map((option, index) => {
                const s = getOptionStyle(index);
                return (
                  <div key={index} onClick={() => handleAnswer(index)} style={{
                    borderRadius: '14px', padding: '15px 17px',
                    cursor: answered ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '13px',
                    background: s.bg, border: s.border, boxShadow: s.shadow,
                    opacity: s.opacity,
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                    position: 'relative', overflow: 'hidden',
                    animation: `slideIn 0.28s ease ${index * 0.05}s both`,
                  }}
                    onMouseOver={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(20,32,20,0.99)';
                        e.currentTarget.style.border = `1px solid ${accentColor}55`;
                        e.currentTarget.style.transform = 'translateX(5px)';
                        e.currentTarget.style.boxShadow = `4px 0 0 ${accentColor}, 0 4px 20px rgba(0,0,0,0.20)`;
                      }
                    }}
                    onMouseOut={e => {
                      if (!answered) {
                        e.currentTarget.style.background = 'rgba(14,22,14,0.94)';
                        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.10)';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.16)';
                      }
                    }}>
                    {s.accentBar && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: s.accentBar, borderRadius: '14px 0 0 14px', boxShadow: `2px 0 10px ${s.accentBar}50` }}/>}
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', background: s.badgeBg, color: s.badgeColor, border: s.accentBar ? `2px solid ${s.accentBar}50` : '1px solid rgba(255,255,255,0.14)', boxShadow: s.accentBar ? `0 2px 12px ${s.accentBar}40` : 'none', transition: 'all 0.22s' }}>
                      {s.badgeText}
                    </div>
                    <span style={{ color: s.textColor, fontSize: '13px', lineHeight: '1.55', fontWeight: s.accentBar ? '700' : '500', transition: 'color 0.22s', flex: 1 }}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ── EXPLANATION CARD — premium, distinct from options ── */}
            {answered && (
              <div style={{
                borderRadius: '20px', marginBottom: '14px',
                background: isCorrect
                  ? 'linear-gradient(145deg, rgba(0,40,8,0.99) 0%, rgba(0,30,6,0.99) 100%)'
                  : 'linear-gradient(145deg, rgba(60,0,0,0.99) 0%, rgba(45,0,0,0.99) 100%)',
                border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.45)'}`,
                backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                animation: 'popIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
                boxShadow: isCorrect
                  ? '0 8px 40px rgba(0,120,40,0.25), inset 0 1px 0 rgba(34,197,94,0.15)'
                  : '0 8px 40px rgba(180,0,0,0.25), inset 0 1px 0 rgba(239,68,68,0.15)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Inner glow top */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: isCorrect ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.60), transparent)' : 'linear-gradient(90deg, transparent, rgba(239,68,68,0.60), transparent)' }}/>
                {/* Abstract circles inside */}
                <svg style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                  <circle cx="130" cy="50%" r="70" fill="none" stroke={isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)'} strokeWidth="1"/>
                  <circle cx="130" cy="50%" r="45" fill="none" stroke={isCorrect ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)'} strokeWidth="0.8"/>
                </svg>

                {/* Top strip */}
                <div style={{ background: isCorrect ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', borderBottom: `1px solid ${isCorrect ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)'}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isCorrect ? 'rgba(34,197,94,0.20)' : 'rgba(239,68,68,0.20)', border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.40)' : 'rgba(239,68,68,0.40)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                      {isCorrect ? '✅' : '❌'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '900', fontSize: '16px', color: isCorrect ? '#4ade80' : '#ff8080', letterSpacing: '-0.2px' }}>
                        {isCorrect ? 'Correct Answer!' : 'Incorrect'}
                      </div>
                      {!isCorrect && <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.40)', marginTop: '2px' }}>Correct answer: option {String.fromCharCode(65 + question.correctIndex)}</div>}
                    </div>
                  </div>
                  {/* Score impact badge */}
                  <div style={{ padding: '5px 12px', borderRadius: '20px', background: isCorrect ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.14)', border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.30)'}`, fontSize: '11px', fontWeight: '800', color: isCorrect ? '#4ade80' : '#ff8080', letterSpacing: '0.05em' }}>
                    {isCorrect ? '+1 point' : 'No point'}
                  </div>
                </div>

                {/* Explanation body */}
                <div style={{ padding: '18px 22px 20px', position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: isCorrect ? 'rgba(74,222,128,0.50)' : 'rgba(255,128,128,0.50)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>💡 Explanation</div>
                  <p style={{ color: 'rgba(255,255,255,0.90)', fontSize: '14px', lineHeight: '1.80', margin: 0, fontWeight: '400' }}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* ── NEXT BUTTON ── */}
            {answered && (
              <button onClick={handleNext} style={{
                width: '100%',
                background: `linear-gradient(135deg, ${accentColor} 0%, ${isPost ? '#b37000' : '#004800'} 100%)`,
                color: '#fff', border: 'none', borderRadius: '14px', padding: '16px',
                fontSize: '14px', fontWeight: '900', cursor: 'pointer',
                transition: 'all 0.20s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: `0 6px 28px ${accentColor}45, inset 0 1px 0 rgba(255,255,255,0.12)`,
                animation: 'fadeUp 0.3s ease 0.1s both',
                letterSpacing: '0.01em', position: 'relative', overflow: 'hidden',
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 36px ${accentColor}55, inset 0 1px 0 rgba(255,255,255,0.15)`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 28px ${accentColor}45, inset 0 1px 0 rgba(255,255,255,0.12)`; }}>
                {currentQ < questions.length - 1 ? 'Next Question →' : isPost ? 'See My Results →' : 'Continue to Learning Content →'}
              </button>
            )}
          </div>

          {/* ── EMAIL MOCKUP ── */}
          {emailMockup && (
            <div style={{ animation: 'fadeUp 0.4s ease 0.12s both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#BB0000' }}/>
                <span style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Email in Question</span>
              </div>
              <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(8,13,8,0.98)', boxShadow: '0 10px 44px rgba(0,0,0,0.22)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', position: 'relative' }}>
                {/* Abstract inside email card */}
                <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '120px', height: '120px', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(187,0,0,0.06)" strokeWidth="0.8"/>
                  <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(187,0,0,0.04)" strokeWidth="0.6"/>
                </svg>

                <div style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#BB0000', opacity: 0.85 }}/>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ea9600', opacity: 0.85 }}/>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#006600', opacity: 0.85 }}/>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.20)', marginLeft: '10px', fontFamily: 'monospace' }}>Mail — Inbox</span>
                </div>
                <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}>
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
                <div style={{ padding: '16px 18px', position: 'relative', zIndex: 1 }}>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.62)', lineHeight: '1.80', margin: '0 0 14px' }}>{emailMockup.body}</p>
                  {emailMockup.link && (
                    <div style={{ padding: '10px 13px', background: 'rgba(187,0,0,0.10)', border: '1px solid rgba(187,0,0,0.22)', borderLeft: '3px solid #BB0000', borderRadius: '10px' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.30)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: '700' }}>⚠ Suspicious Link:</div>
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