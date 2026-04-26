import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const QuizComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { score, total, module, department, preScore, postScore } = location.state || {};

  const isPost = preScore !== undefined && postScore !== undefined;
  const percentage = total ? Math.round((score / total) * 100) : 0;
  const prePercentage = total ? Math.round((preScore / total) * 100) : 0;
  const postPercentage = total ? Math.round((postScore / total) * 100) : 0;
  const delta = isPost ? postScore - preScore : 0;

  const getRating = (pct) => {
    if (pct >= 80) return { label: 'Excellent', color: '#4ade80', bg: 'rgba(34,197,94,0.14)', border: 'rgba(34,197,94,0.30)', emoji: '🏆' };
    if (pct >= 60) return { label: 'Good', color: '#4ade80', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.22)', emoji: '✅' };
    if (pct >= 40) return { label: 'Fair', color: '#fcd34d', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.28)', emoji: '📈' };
    return { label: 'Keep Practising', color: '#ff8080', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.28)', emoji: '📚' };
  };

  const rating = getRating(isPost ? postPercentage : percentage);

  useEffect(() => {
    if (isPost && module) {
      axios.post(`${process.env.REACT_APP_API_URL}/awareness/save-score`,
        { module, preScore, postScore }, { timeout: 30000 }
      ).then(() => {
        if (delta > 0) showToast(`Great improvement! +${delta} from your pre-assessment`, 'success');
        else if (delta === 0) showToast('Consistent score — review content to improve', 'info');
        else showToast('Keep practising — revisit the learning content', 'warning');
      }).catch(err => console.error(err));
    }
  }, []); // eslint-disable-line

  const deltaColor = delta > 0 ? '#4ade80' : delta < 0 ? '#ff8080' : '#fcd34d';
  const deltaBg = delta > 0 ? 'rgba(34,197,94,0.14)' : delta < 0 ? 'rgba(239,68,68,0.14)' : 'rgba(245,158,11,0.12)';
  const deltaBorder = delta > 0 ? 'rgba(34,197,94,0.30)' : delta < 0 ? 'rgba(239,68,68,0.30)' : 'rgba(245,158,11,0.28)';
  const heroEmoji = delta > 0 ? '🎉' : delta === 0 ? '🏅' : '📚';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.55}}
        @keyframes popIn{from{opacity:0;transform:scale(0.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes countUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── BACKGROUND ── */}
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
        <circle cx="45%" cy="8%" r="2" fill="rgba(0,80,30,0.06)"/>
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="89%" y1="20%" x2="93%" y2="38%" stroke="rgba(140,0,0,0.05)" strokeWidth="0.7"/>
      </svg>
      <div style={{ position: 'fixed', bottom: '-30px', right: 0, width: '580px', height: '220px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="180" width="18" height="80"/><rect x="310" y="60" width="38" height="200"/>
          <rect x="200" y="90" width="32" height="170"/><ellipse cx="216" cy="90" rx="18" ry="8"/>
          <rect x="380" y="80" width="34" height="180"/><rect x="250" y="110" width="24" height="150"/>
          <rect x="418" y="100" width="28" height="160"/><rect x="0" y="258" width="580" height="2"/>
        </svg>
      </div>

      {/* ── NAVBAR ── */}
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/awareness/modules', { state: { department } })} style={{ padding: '7px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', color: '#fff', background: 'linear-gradient(135deg, #006600, #004400)', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,102,0,0.25)', transition: 'all 0.15s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            📚 More Modules
          </button>
          <button onClick={() => navigate('/')} style={{ padding: '7px 14px', borderRadius: '8px', fontWeight: '600', fontSize: '12px', color: 'rgba(0,0,0,0.55)', background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.95)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.70)'}>
            ← Home
          </button>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 10, padding: '32px 44px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '760px' }}>

          {/* ── HERO CARD ── */}
          <div style={{ borderRadius: '22px', overflow: 'hidden', marginBottom: '16px', background: 'rgba(8,14,8,0.98)', border: `1px solid ${rating.border}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: `0 16px 60px rgba(0,0,0,0.18), inset 0 1px 0 ${rating.color}18`, animation: 'popIn 0.4s cubic-bezier(0.16,1,0.3,1) both', position: 'relative' }}>
            <div style={{ height: '4px', background: `linear-gradient(90deg, #006600, #4ade80, #BB0000)`, backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)', pointerEvents: 'none' }}/>
            {/* Abstract circles */}
            <svg style={{ position: 'absolute', top: 0, right: 0, width: '220px', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
              <circle cx="180" cy="50%" r="120" fill="none" stroke={`${rating.color}10`} strokeWidth="1"/>
              <circle cx="180" cy="50%" r="75" fill="none" stroke={`${rating.color}07`} strokeWidth="0.8"/>
              <circle cx="180" cy="50%" r="40" fill="none" stroke={`${rating.color}05`} strokeWidth="0.6"/>
            </svg>

            <div style={{ padding: '28px 32px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '28px' }}>
              {/* Emoji + rating */}
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '10px', lineHeight: 1 }}>{isPost ? heroEmoji : rating.emoji}</div>
                <div style={{ padding: '5px 14px', borderRadius: '20px', background: rating.bg, border: `1px solid ${rating.border}`, fontSize: '11px', fontWeight: '900', color: rating.color, textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap' }}>
                  {rating.label}
                </div>
              </div>

              {/* Title + info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(74,222,128,0.50)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '8px' }}>
                  {isPost ? 'Post-Assessment Complete' : 'Pre-Assessment Complete'}
                </div>
                <h1 style={{ color: '#ffffff', fontWeight: '900', fontSize: '22px', margin: '0 0 6px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                  {isPost ? 'Assessment Complete!' : 'Pre-Assessment Done!'}
                </h1>
                <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: '13px', marginBottom: '16px' }}>
                  {module} · {department}
                </div>
                {/* Score chips */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                    Score: <span style={{ color: rating.color }}>{isPost ? postScore : score}/{total}</span>
                  </div>
                  <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                    Accuracy: <span style={{ color: rating.color }}>{isPost ? postPercentage : percentage}%</span>
                  </div>
                  {isPost && delta !== 0 && (
                    <div style={{ padding: '6px 14px', borderRadius: '20px', background: deltaBg, border: `1px solid ${deltaBorder}`, fontSize: '13px', fontWeight: '800', color: deltaColor }}>
                      {delta > 0 ? `+${delta}` : delta} improvement
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── POST COMPARISON ── */}
          {isPost && (
            <div style={{ marginBottom: '16px', animation: 'fadeUp 0.4s ease 0.08s both' }}>
              {/* 3 score cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr 1fr', gap: '12px', marginBottom: '12px' }}>
                {/* Pre score */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
                  <div style={{ width: '4px', flexShrink: 0, background: 'rgba(255,255,255,0.20)', borderRadius: '16px 0 0 16px' }}/>
                  <div style={{ flex: 1, padding: '18px 16px', background: 'rgba(14,20,14,0.94)', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '10px' }}>Pre-Assessment</div>
                    <div style={{ fontSize: '32px', fontWeight: '900', color: 'rgba(255,255,255,0.55)', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>
                      {preScore}<span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)', fontWeight: '600' }}>/{total}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.35)' }}>{prePercentage}%</div>
                  </div>
                </div>

                {/* Delta */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${deltaBorder}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex', boxShadow: `0 6px 24px ${delta > 0 ? 'rgba(0,120,40,0.20)' : delta < 0 ? 'rgba(140,0,0,0.18)' : 'rgba(0,0,0,0.10)'}` }}>
                  <div style={{ width: '4px', flexShrink: 0, background: deltaColor, borderRadius: '16px 0 0 16px', opacity: 0.85 }}/>
                  <div style={{ flex: 1, padding: '18px 12px', background: delta > 0 ? 'rgba(0,50,12,0.98)' : delta < 0 ? 'rgba(60,0,0,0.98)' : 'rgba(14,20,14,0.94)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}/>
                    <div style={{ fontSize: '10px', color: `${deltaColor}80`, textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '10px', position: 'relative', zIndex: 1 }}>Change</div>
                    <div style={{ fontSize: '34px', fontWeight: '900', color: deltaColor, letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px', position: 'relative', zIndex: 1 }}>
                      {delta > 0 ? `+${delta}` : delta === 0 ? '=' : delta}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: deltaColor, textTransform: 'uppercase', letterSpacing: '0.07em', position: 'relative', zIndex: 1 }}>
                      {delta > 0 ? 'Improved' : delta < 0 ? 'Declined' : 'Same'}
                    </div>
                  </div>
                </div>

                {/* Post score */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(34,197,94,0.28)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex', boxShadow: '0 4px 20px rgba(0,100,40,0.16)' }}>
                  <div style={{ width: '4px', flexShrink: 0, background: 'linear-gradient(180deg, #22c55e, #16a34a)', borderRadius: '16px 0 0 16px' }}/>
                  <div style={{ flex: 1, padding: '18px 16px', background: 'rgba(0,36,10,0.97)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, transparent 60%)', pointerEvents: 'none' }}/>
                    <div style={{ fontSize: '10px', color: 'rgba(74,222,128,0.55)', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '10px', position: 'relative', zIndex: 1 }}>Post-Assessment</div>
                    <div style={{ fontSize: '32px', fontWeight: '900', color: '#4ade80', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px', position: 'relative', zIndex: 1 }}>
                      {postScore}<span style={{ fontSize: '14px', color: 'rgba(74,222,128,0.45)', fontWeight: '600' }}>/{total}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#4ade80', position: 'relative', zIndex: 1 }}>{postPercentage}%</div>
                  </div>
                </div>
              </div>

              {/* Progress comparison bars */}
              <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', display: 'flex' }}>
                <div style={{ width: '4px', flexShrink: 0, background: 'rgba(255,255,255,0.10)', borderRadius: '18px 0 0 18px' }}/>
                <div style={{ flex: 1, padding: '20px 22px', background: 'rgba(10,16,10,0.97)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)', pointerEvents: 'none' }}/>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: '16px', position: 'relative', zIndex: 1 }}>📊 Score Comparison</div>

                  <div style={{ marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontWeight: '600' }}>Pre-Assessment</span>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontWeight: '700' }}>{prePercentage}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'rgba(255,255,255,0.25)', width: `${prePercentage}%`, borderRadius: '8px', transition: 'width 0.8s ease' }}/>
                    </div>
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: '700' }}>Post-Assessment</span>
                      <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: '700' }}>{postPercentage}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'linear-gradient(90deg, #006600, #22c55e)', width: `${postPercentage}%`, borderRadius: '8px', transition: 'width 0.8s ease', boxShadow: '0 0 10px rgba(34,197,94,0.40)' }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PRE-ONLY SCORE CARDS ── */}
          {!isPost && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px', animation: 'fadeUp 0.4s ease 0.08s both' }}>
              {[
                { label: 'Score', value: `${score}/${total}`, color: rating.color, sub: 'out of ' + total },
                { label: 'Accuracy', value: `${percentage}%`, color: '#fcd34d', sub: 'correct answers' },
                { label: 'Rating', value: rating.label, color: rating.color, sub: rating.emoji + ' performance' },
              ].map((card, i) => (
                <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                  <div style={{ width: '4px', flexShrink: 0, background: card.color, opacity: 0.70, borderRadius: '16px 0 0 16px' }}/>
                  <div style={{ flex: 1, padding: '18px 16px', background: 'rgba(14,20,14,0.95)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}/>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '10px', position: 'relative', zIndex: 1 }}>{card.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: card.color, letterSpacing: '-0.5px', lineHeight: 1, marginBottom: '5px', position: 'relative', zIndex: 1 }}>{card.value}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', position: 'relative', zIndex: 1 }}>{card.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── KEY TAKEAWAYS ── */}
          <div style={{ borderRadius: '18px', overflow: 'hidden', marginBottom: '16px', border: '1px solid rgba(234,150,0,0.25)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', animation: 'fadeUp 0.4s ease 0.16s both', display: 'flex' }}>
            <div style={{ width: '4px', flexShrink: 0, background: 'linear-gradient(180deg, #ea9600, #b37000)', borderRadius: '18px 0 0 18px' }}/>
            <div style={{ flex: 1, padding: '20px 22px', background: 'rgba(14,10,0,0.97)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(234,150,0,0.07) 0%, transparent 55%)', pointerEvents: 'none' }}/>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(234,150,0,0.35), transparent)' }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(234,150,0,0.18)', border: '1px solid rgba(234,150,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>💡</div>
                <div>
                  <div style={{ color: '#ffd166', fontWeight: '800', fontSize: '14px' }}>Key Takeaways</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>Remember these to stay protected</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 1 }}>
                {[
                  'Always verify the sender domain before clicking any link in an email.',
                  'No legitimate Kenyan bank will ever ask for your PIN or password via email.',
                  'Urgency and threats in emails are classic phishing manipulation tactics.',
                  'Report all suspicious emails immediately using PhishRipoti.',
                ].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 13px', borderRadius: '10px', background: 'rgba(234,150,0,0.07)', border: '1px solid rgba(234,150,0,0.14)' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: 'rgba(234,150,0,0.20)', border: '1px solid rgba(234,150,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: '#ffd166', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.78)', lineHeight: '1.65', fontWeight: '500' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ACTION BUTTONS ── */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', animation: 'fadeUp 0.4s ease 0.24s both' }}>
            <button onClick={() => navigate('/awareness/modules', { state: { department } })} style={{
              padding: '14px 24px', borderRadius: '13px', fontWeight: '800', fontSize: '13px',
              color: '#fff', background: 'linear-gradient(135deg, #006600, #004800)',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 6px 22px rgba(0,102,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12)',
              transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,102,0,0.48), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,102,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12)'; }}>
              📚 Try Another Module
            </button>

            <button onClick={() => navigate('/report/step1')} style={{
              padding: '14px 24px', borderRadius: '13px', fontWeight: '800', fontSize: '13px',
              color: '#fff', background: 'linear-gradient(135deg, #BB0000, #880000)',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 6px 22px rgba(187,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
              transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(187,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(187,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'; }}>
              📧 Report Suspicious Email
            </button>

            <button onClick={() => navigate('/')} style={{
              padding: '14px 20px', borderRadius: '13px', fontWeight: '600', fontSize: '13px',
              color: 'rgba(255,255,255,0.65)', background: 'rgba(14,22,14,0.90)',
              border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.18s',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(22,32,22,0.98)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(14,22,14,0.90)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;