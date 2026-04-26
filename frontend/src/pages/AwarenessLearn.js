import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AwarenessLearn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total, module, department } = location.state || {};
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeScenario, setActiveScenario] = useState(0);
  const [expandedPoint, setExpandedPoint] = useState(null);

  useEffect(() => { fetchContent(); }, []); // eslint-disable-line

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
          { title: 'Verify sender domains carefully', detail: 'Always check the full email address, not just the display name. Legitimate banks like KCB and Equity Bank will always send from their official domains — never from free email services or slightly altered domains.' },
          { title: 'Never click links under pressure', detail: 'Phishing emails create artificial urgency. Legitimate institutions never require immediate action via email links. Always go directly to the official website by typing the URL.' },
          { title: 'No bank asks for your PIN via email', detail: 'No legitimate financial institution will ever ask for your PIN, password, or full account number via email. If you receive such a request, it is always a phishing attempt.' },
          { title: 'M-Pesa alerts come from official shortcodes', detail: 'Genuine Safaricom M-Pesa messages come from shortcode 22522. Any SMS or email claiming to be M-Pesa from a phone number or generic email is fraudulent.' },
          { title: 'Report all suspicious emails immediately', detail: 'Using PhishRipoti, you can anonymously report any suspicious email. Early reporting helps your IT team protect the entire organisation.' },
        ],
        scenarios: [
          { title: 'The KCB Account Suspension Email', description: 'You receive an email from security@kcb-alerts.net saying your account will be suspended unless you verify within 24 hours. The link goes to kcb-secure-verify.net.', redFlag: 'Official KCB emails come from @kcbgroup.com — not kcb-alerts.net.' },
          { title: 'The M-Pesa Reversal Scam', description: 'An email claims you sent KSh 5,000 by mistake and asks you to click a link to reverse the transaction using your M-Pesa PIN.', redFlag: 'M-Pesa reversals are done through the official app, never via email links.' },
          { title: 'The HR Payroll Update', description: 'An email from hr-payroll@company-updates.co asks you to update your bank account details for salary payment before end of month.', redFlag: 'HR payroll updates are always done through internal systems, never via unsolicited emails.' },
        ],
        keyTakeaways: [
          'Always verify the sender domain before clicking any link',
          'Never provide credentials, PINs or personal data via email',
          'Urgency and threats are classic phishing tactics',
          'Report all suspicious emails using PhishRipoti immediately',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTakePostAssessment = () => {
    navigate('/awareness/quiz', {
      state: { department, module, isPost: true, preScore: score, learningContent: content }
    });
  };

  // ── SHARED BACKGROUND ──
  const Bg = () => (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280 T 1600 300" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <path d="M -100 450 Q 250 330 600 460 T 1200 400" fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="89%" y1="20%" x2="93%" y2="38%" stroke="rgba(140,0,0,0.05)" strokeWidth="0.7"/>
      </svg>
      <div style={{ position: 'fixed', bottom: '-30px', right: 0, width: '580px', height: '220px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="180" width="18" height="80"/><rect x="42" y="170" width="14" height="90"/>
          <rect x="310" y="60" width="38" height="200"/><rect x="200" y="90" width="32" height="170"/>
          <ellipse cx="216" cy="90" rx="18" ry="8"/><rect x="380" y="80" width="34" height="180"/>
          <rect x="150" y="120" width="26" height="140"/><rect x="250" y="110" width="24" height="150"/>
          <rect x="418" y="100" width="28" height="160"/><rect x="0" y="258" width="580" height="2"/>
        </svg>
      </div>
    </>
  );

  // ── NAVBAR ──
  const NavBar = () => (
    <nav style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', height: '66px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'linear-gradient(145deg, #cc0000, #7a0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(187,0,0,0.30)', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
        </div>
        <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.4px' }}>
          <span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '7px', background: 'rgba(0,102,0,0.07)', border: '1px solid rgba(0,102,0,0.16)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}/>
          <span style={{ color: '#006600', fontSize: '11px', fontWeight: '700' }}>Learning Content</span>
        </div>
        <button onClick={() => navigate('/awareness/modules', { state: { department } })} style={{ padding: '7px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)', color: '#333', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.95)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.70)'}>
          ← Modules
        </button>
      </div>
    </nav>
  );

  // ── LOADING ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
        <Bg/><NavBar/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '32px' }}>
          <div style={{ width: '100%', maxWidth: '460px' }}>
            <div style={{ borderRadius: '22px', overflow: 'hidden', background: 'rgba(10,16,10,0.97)', border: '1px solid rgba(0,102,0,0.28)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 24px 80px rgba(0,0,0,0.18)' }}>
              <div style={{ height: '4px', background: 'linear-gradient(90deg, #006600, #4ade80, #006600)', backgroundSize: '200% 100%' }}/>
              <div style={{ padding: '32px 32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '26px' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <svg style={{ animation: 'spin 2.5s linear infinite', position: 'absolute', inset: '-10px' }} width="76" height="76" viewBox="0 0 76 76" fill="none">
                      <circle cx="38" cy="38" r="34" stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
                      <path d="M38 4a34 34 0 0 1 34 34" stroke="#006600" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M38 4a34 34 0 0 0-34 34" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" opacity="0.22"/>
                    </svg>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(0,102,0,0.16)', border: '1px solid rgba(0,102,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', animation: 'float 3s ease-in-out infinite' }}>📚</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: 'rgba(74,222,128,0.60)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '6px' }}>GPT-4o Powered</div>
                    <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: '900', letterSpacing: '-0.4px', marginBottom: '4px', lineHeight: 1.3 }}>Generating learning content...</div>
                    <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px' }}>Tailored for <span style={{ color: '#4ade80', fontWeight: '700' }}>{department}</span></div>
                  </div>
                </div>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,102,0,0.30), transparent)', marginBottom: '18px' }}/>
                {[
                  { icon: '📖', label: 'Building key learning points', sub: 'Role-specific threat knowledge' },
                  { icon: '🎯', label: 'Creating real-world scenarios', sub: 'Kenyan bank phishing examples' },
                  { icon: '⚡', label: 'Preparing post-assessment', sub: 'Questions based on this content' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < 2 ? '9px' : '0', padding: '13px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,102,0,0.14)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0,102,0,0.14)', border: '1px solid rgba(0,102,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{step.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: '700', marginBottom: '2px' }}>{step.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: '11px' }}>{step.sub}</div>
                    </div>
                    <svg style={{ animation: 'spin 1.5s linear infinite', flexShrink: 0, animationDelay: `${i * 0.28}s` }} width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5"/>
                      <path d="M12 3a9 9 0 0 1 9 9" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const keyPoints = content?.keyPoints || [];
  const scenarios = content?.scenarios || [];
  const keyTakeaways = content?.keyTakeaways || [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes popIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
      `}</style>

      <Bg/><NavBar/>

      {/* ── HERO HEADER ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0, background: 'rgba(8,14,8,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,102,0,0.18)' }}>
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #006600, #4ade80, #006600)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
        <div style={{ padding: '20px 44px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {/* Step indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              {[
                { n: 1, label: 'Department', done: true },
                { n: 2, label: 'Module', done: true },
                { n: 3, label: 'Learn', active: true },
                { n: 4, label: 'Post-Assessment', done: false },
              ].map((step, i) => (
                <React.Fragment key={step.n}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: step.done ? '#006600' : step.active ? '#4ade80' : 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: step.done || step.active ? '#fff' : 'rgba(255,255,255,0.25)' }}>
                      {step.done ? '✓' : step.n}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: step.active ? '700' : '500', color: step.active ? '#4ade80' : step.done ? 'rgba(74,222,128,0.60)' : 'rgba(255,255,255,0.25)' }}>{step.label}</span>
                  </div>
                  {i < 3 && <div style={{ width: '24px', height: '1px', background: step.done ? 'rgba(0,102,0,0.50)' : 'rgba(255,255,255,0.10)', margin: '0 2px' }}/>}
                </React.Fragment>
              ))}
            </div>

            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,102,0,0.18)', border: '1px solid rgba(0,102,0,0.32)' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80' }}/>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.12em' }}>GPT-4o Personalised Content</span>
            </div>

            <h1 style={{ color: '#ffffff', fontWeight: '900', fontSize: '24px', margin: '0 0 6px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
              {module}
            </h1>
            <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', fontWeight: '500' }}>
              {department} · Study this content carefully before your post-assessment
            </div>
          </div>

          {/* Pre-score card */}
          <div style={{ flexShrink: 0, borderRadius: '16px', padding: '16px 22px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700' }}>Pre-Assessment Score</div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px', lineHeight: 1 }}>
              {score}<span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.28)', fontWeight: '600' }}>/{total}</span>
            </div>
            <div style={{ marginTop: '8px', padding: '4px 10px', borderRadius: '20px', background: score >= total * 0.8 ? 'rgba(34,197,94,0.16)' : score >= total * 0.5 ? 'rgba(245,158,11,0.16)' : 'rgba(239,68,68,0.16)', border: `1px solid ${score >= total * 0.8 ? 'rgba(34,197,94,0.30)' : score >= total * 0.5 ? 'rgba(245,158,11,0.30)' : 'rgba(239,68,68,0.30)'}` }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: score >= total * 0.8 ? '#4ade80' : score >= total * 0.5 ? '#fcd34d' : '#ff8080', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {score >= total * 0.8 ? 'Strong start' : score >= total * 0.5 ? 'Room to improve' : 'Study carefully'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 10, padding: '32px 44px 40px' }}>
        <div style={{ maxWidth: '860px' }}>

          {/* ── SECTION 1: KEY POINTS ── */}
          <div style={{ marginBottom: '32px', animation: 'fadeUp 0.4s ease 0s both' }}>
            {/* Section heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(0,102,0,0.14)', border: '1px solid rgba(0,102,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📚</div>
                <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '14px', height: '14px', borderRadius: '50%', background: '#006600', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: '#fff', fontWeight: '900' }}>1</div>
              </div>
              <div>
                <div style={{ color: '#111111', fontWeight: '900', fontSize: '17px', letterSpacing: '-0.2px' }}>Key Learning Points</div>
                <div style={{ color: 'rgba(0,0,0,0.42)', fontSize: '12px', fontWeight: '500' }}>Click each point to expand the full explanation</div>
              </div>
              <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,102,0,0.08)', border: '1px solid rgba(0,102,0,0.18)', fontSize: '11px', fontWeight: '700', color: '#006600' }}>{keyPoints.length} points</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {keyPoints.map((point, i) => {
                const isExp = expandedPoint === i;
                const title = typeof point === 'string' ? point : point.title;
                const detail = typeof point === 'string' ? null : point.detail;

                return (
                  <div key={i} onClick={() => setExpandedPoint(isExp ? null : i)} style={{
                    borderRadius: '16px', overflow: 'hidden',
                    border: isExp ? '1px solid rgba(0,150,0,0.40)' : '1px solid rgba(255,255,255,0.09)',
                    transition: 'all 0.24s cubic-bezier(0.16,1,0.3,1)',
                    cursor: 'pointer',
                    boxShadow: isExp ? '0 8px 32px rgba(0,0,0,0.14)' : '0 2px 10px rgba(0,0,0,0.08)',
                    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                    animation: `fadeUp 0.3s ease ${i * 0.06}s both`,
                  }}>
                    {/* Header */}
                    <div style={{
                      padding: '15px 18px',
                      background: isExp ? 'rgba(0,50,10,0.97)' : 'rgba(14,22,14,0.92)',
                      display: 'flex', alignItems: 'center', gap: '14px',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      {/* Left accent */}
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isExp ? 'linear-gradient(180deg, #22c55e, #16a34a)' : 'rgba(255,255,255,0.12)', borderRadius: '0 2px 2px 0', transition: 'all 0.24s', boxShadow: isExp ? '2px 0 12px rgba(34,197,94,0.40)' : 'none' }}/>
                      {/* Glass sheen */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none' }}/>

                      <div style={{
                        width: '30px', height: '30px', borderRadius: '9px', flexShrink: 0,
                        background: isExp ? '#006600' : 'rgba(255,255,255,0.08)',
                        border: isExp ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(255,255,255,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: '900',
                        color: isExp ? '#fff' : 'rgba(255,255,255,0.45)',
                        transition: 'all 0.24s',
                        boxShadow: isExp ? '0 2px 12px rgba(0,102,0,0.40)' : 'none',
                        position: 'relative', zIndex: 1,
                      }}>{i + 1}</div>

                      <span style={{ color: isExp ? '#4ade80' : '#ffffff', fontWeight: '700', fontSize: '14px', flex: 1, transition: 'color 0.24s', position: 'relative', zIndex: 1 }}>
                        {title}
                      </span>

                      <div style={{ position: 'relative', zIndex: 1, width: '28px', height: '28px', borderRadius: '8px', background: isExp ? 'rgba(34,197,94,0.16)' : 'rgba(255,255,255,0.06)', border: isExp ? '1px solid rgba(34,197,94,0.28)' : '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.24s', flexShrink: 0 }}>
                        <span style={{ color: isExp ? '#4ade80' : 'rgba(255,255,255,0.28)', fontSize: '12px', transform: isExp ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.24s', display: 'block' }}>▾</span>
                      </div>
                    </div>

                    {/* Expanded body */}
                    {isExp && detail && (
                      <div style={{ padding: '18px 22px 20px', background: 'rgba(0,30,6,0.98)', borderTop: '1px solid rgba(34,197,94,0.18)', animation: 'popIn 0.25s ease both', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.35), transparent)' }}/>
                        <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '100px', height: '100px', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                          <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(34,197,94,0.06)" strokeWidth="0.8"/>
                          <circle cx="80" cy="80" r="35" fill="none" stroke="rgba(34,197,94,0.04)" strokeWidth="0.6"/>
                        </svg>
                        <div style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(74,222,128,0.50)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>💡 Explanation</div>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: '1.80', margin: 0, position: 'relative', zIndex: 1 }}>
                          {detail}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SECTION 2: SCENARIOS ── */}
          {scenarios.length > 0 && (
            <div style={{ marginBottom: '32px', animation: 'fadeUp 0.4s ease 0.1s both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(187,0,0,0.14)', border: '1px solid rgba(187,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎯</div>
                  <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '14px', height: '14px', borderRadius: '50%', background: '#BB0000', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: '#fff', fontWeight: '900' }}>2</div>
                </div>
                <div>
                  <div style={{ color: '#111111', fontWeight: '900', fontSize: '17px', letterSpacing: '-0.2px' }}>Real-World Scenarios</div>
                  <div style={{ color: 'rgba(0,0,0,0.42)', fontSize: '12px', fontWeight: '500' }}>Kenyan banking phishing examples — select a scenario to explore</div>
                </div>
                <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '20px', background: 'rgba(187,0,0,0.08)', border: '1px solid rgba(187,0,0,0.18)', fontSize: '11px', fontWeight: '700', color: '#BB0000' }}>{scenarios.length} scenarios</div>
              </div>

              {/* Tab bar */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {scenarios.map((s, i) => (
                  <button key={i} onClick={() => setActiveScenario(i)} style={{
                    padding: '8px 18px', borderRadius: '10px',
                    border: activeScenario === i ? '1px solid rgba(187,0,0,0.50)' : '1px solid rgba(255,255,255,0.09)',
                    background: activeScenario === i ? 'rgba(80,0,0,0.95)' : 'rgba(14,22,14,0.88)',
                    color: activeScenario === i ? '#ff8080' : 'rgba(255,255,255,0.45)',
                    fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                    transition: 'all 0.20s ease',
                    boxShadow: activeScenario === i ? '0 4px 16px rgba(140,0,0,0.22)' : '0 2px 8px rgba(0,0,0,0.10)',
                    backdropFilter: 'blur(20px)',
                  }}
                    onMouseOver={e => { if (activeScenario !== i) { e.currentTarget.style.background = 'rgba(20,28,20,0.97)'; e.currentTarget.style.color = 'rgba(255,255,255,0.70)'; } }}
                    onMouseOut={e => { if (activeScenario !== i) { e.currentTarget.style.background = 'rgba(14,22,14,0.88)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; } }}>
                    Scenario {i + 1}
                  </button>
                ))}
              </div>

              {/* Active scenario card */}
              {scenarios[activeScenario] && (
                <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(187,0,0,0.32)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 8px 36px rgba(0,0,0,0.16)', animation: 'popIn 0.25s ease both', position: 'relative' }}>
                  {/* Top strip */}
                  <div style={{ padding: '16px 22px', background: 'rgba(60,0,0,0.98)', borderBottom: '1px solid rgba(187,0,0,0.22)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}/>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.45), transparent)' }}/>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(187,0,0,0.22)', border: '1px solid rgba(239,68,68,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>⚠️</div>
                      <div>
                        <div style={{ fontSize: '9px', color: 'rgba(255,128,128,0.55)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px' }}>Attack Scenario {activeScenario + 1}</div>
                        <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '15px', letterSpacing: '-0.2px' }}>{scenarios[activeScenario].title}</div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '20px 22px', background: 'rgba(40,0,0,0.98)', position: 'relative', overflow: 'hidden' }}>
                    <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '120px', height: '120px', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(187,0,0,0.07)" strokeWidth="0.8"/>
                      <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(187,0,0,0.05)" strokeWidth="0.6"/>
                    </svg>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,128,128,0.45)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>📧 The Scenario</div>
                    <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '14px', lineHeight: '1.80', margin: '0 0 18px', position: 'relative', zIndex: 1 }}>
                      {scenarios[activeScenario].description}
                    </p>

                    {scenarios[activeScenario].redFlag && (
                      <div style={{ padding: '14px 18px', background: 'rgba(234,150,0,0.12)', border: '1px solid rgba(234,150,0,0.30)', borderLeft: '4px solid #ea9600', borderRadius: '12px', position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(234,150,0,0.18)', border: '1px solid rgba(234,150,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>💡</div>
                          <div>
                            <div style={{ fontSize: '10px', fontWeight: '800', color: '#ffd166', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: '5px' }}>Key Insight — Red Flag</div>
                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.80)', lineHeight: '1.70', margin: 0 }}>{scenarios[activeScenario].redFlag}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SECTION 3: KEY TAKEAWAYS ── */}
          {keyTakeaways.length > 0 && (
            <div style={{ marginBottom: '32px', animation: 'fadeUp 0.4s ease 0.2s both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(234,150,0,0.14)', border: '1px solid rgba(234,150,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>⚡</div>
                  <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '14px', height: '14px', borderRadius: '50%', background: '#ea9600', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: '#fff', fontWeight: '900' }}>3</div>
                </div>
                <div>
                  <div style={{ color: '#111111', fontWeight: '900', fontSize: '17px', letterSpacing: '-0.2px' }}>Key Takeaways</div>
                  <div style={{ color: 'rgba(0,0,0,0.42)', fontSize: '12px', fontWeight: '500' }}>Remember these before your post-assessment</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {keyTakeaways.map((t, i) => (
                  <div key={i} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(234,150,0,0.22)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex', boxShadow: '0 3px 14px rgba(0,0,0,0.10)', animation: `fadeUp 0.3s ease ${i * 0.07}s both` }}>
                    <div style={{ width: '4px', flexShrink: 0, background: `linear-gradient(180deg, #ea9600, #b37000)`, opacity: 0.85 }}/>
                    <div style={{ flex: 1, padding: '14px 16px', background: 'rgba(16,12,0,0.96)', display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(234,150,0,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}/>
                      <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(234,150,0,0.18)', border: '1px solid rgba(234,150,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900', color: '#ffd166', flexShrink: 0, position: 'relative', zIndex: 1 }}>{i + 1}</div>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.82)', lineHeight: '1.65', fontWeight: '500', position: 'relative', zIndex: 1 }}>{t}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── POST-ASSESSMENT CTA ── */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,150,0,0.35)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 12px 48px rgba(0,0,0,0.16), inset 0 1px 0 rgba(34,197,94,0.12)', animation: 'fadeUp 0.4s ease 0.3s both', position: 'relative' }}>
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #006600, #4ade80, #006600)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,102,0,0.12) 0%, transparent 50%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '100%', pointerEvents: 'none' }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <circle cx="180" cy="50%" r="100" fill="none" stroke="rgba(34,197,94,0.07)" strokeWidth="1"/>
                <circle cx="180" cy="50%" r="65" fill="none" stroke="rgba(34,197,94,0.05)" strokeWidth="0.8"/>
              </svg>
            </div>

            <div style={{ padding: '24px 28px', background: 'rgba(0,30,8,0.98)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(74,222,128,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>🎯 Ready to test your knowledge?</div>
                <div style={{ color: '#ffffff', fontWeight: '900', fontSize: '18px', marginBottom: '6px', letterSpacing: '-0.3px' }}>Take the Post-Assessment</div>
                <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', lineHeight: '1.5' }}>
                  Questions are based on this content. <span style={{ color: '#4ade80', fontWeight: '700' }}>Beat your pre-score of {score}/{total}</span>
                </div>
              </div>
              <button onClick={handleTakePostAssessment} style={{
                flexShrink: 0,
                background: 'linear-gradient(135deg, #006600, #004800)',
                color: '#fff', border: 'none', borderRadius: '14px',
                padding: '16px 28px', fontSize: '14px', fontWeight: '900',
                cursor: 'pointer', whiteSpace: 'nowrap',
                boxShadow: '0 6px 28px rgba(0,102,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
                transition: 'all 0.20s cubic-bezier(0.16,1,0.3,1)',
                letterSpacing: '0.01em',
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,102,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,102,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)'; }}>
                Start Post-Assessment →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AwarenessLearn;