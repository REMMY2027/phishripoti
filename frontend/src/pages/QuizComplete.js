import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const QuizComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { score, total, module, department, preScore, postScore } = location.state || {};
  const isMobile = window.innerWidth < 640;

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
      `}</style>

      {/* ── BACKGROUND ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#ffffff' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
      </svg>
      {!isMobile && (
        <div style={{ position: 'fixed', bottom: '-30px', right: 0, width: '580px', height: '220px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.70) 55%, #000 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
            <rect x="20" y="180" width="18" height="80"/><rect x="310" y="60" width="38" height="200"/>
            <rect x="200" y="90" width="32" height="170"/><ellipse cx="216" cy="90" rx="18" ry="8"/>
            <rect x="380" y="80" width="34" height="180"/><rect x="250" y="110" width="24" height="150"/>
            <rect x="0" y="258" width="580" height="2"/>
          </svg>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', height: '56px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.04)', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(145deg, #cc0000, #7a0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize: '19px', fontWeight: '800', letterSpacing: '-0.4px' }}>
            <span style={{ color: '#111111' }}>Phish</span><span style={{ color: '#006600' }}>Ripoti</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/awareness/modules', { state: { department } })} style={{ padding: '7px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', color: '#fff', background: 'linear-gradient(135deg, #006600, #004400)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {isMobile ? '📚 Modules' : '📚 More Modules'}
          </button>
          <button onClick={() => navigate('/')} style={{ padding: '7px 12px', borderRadius: '8px', fontWeight: '600', fontSize: '12px', color: 'rgba(0,0,0,0.55)', background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(0,0,0,0.10)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            ← Home
          </button>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 10, padding: isMobile ? '16px 14px 32px' : '32px 44px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '760px' }}>

          {/* ── HERO CARD ── */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '14px', background: 'rgba(8,14,8,0.98)', border: `1px solid ${rating.border}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: `0 16px 60px rgba(0,0,0,0.18)`, animation: 'popIn 0.4s cubic-bezier(0.16,1,0.3,1) both', position: 'relative' }}>
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #006600, #4ade80, #BB0000)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)', pointerEvents: 'none' }}/>

            <div style={{ padding: isMobile ? '20px 16px' : '28px 32px', position: 'relative', zIndex: 1 }}>
              {isMobile ? (
                /* ── MOBILE HERO: stacked ── */
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '44px', lineHeight: 1, flexShrink: 0 }}>{isPost ? heroEmoji : rating.emoji}</div>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: '800', color: 'rgba(74,222,128,0.50)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '4px' }}>
                        {isPost ? 'Post-Assessment Complete' : 'Pre-Assessment Complete'}
                      </div>
                      <h1 style={{ color: '#ffffff', fontWeight: '900', fontSize: '18px', margin: '0 0 4px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                        {isPost ? 'Assessment Complete!' : 'Pre-Assessment Done!'}
                      </h1>
                      <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: '12px' }}>{module}</div>
                    </div>
                  </div>
                  {/* Score chips */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '12px', fontWeight: '700', color: '#ffffff' }}>
                      Score: <span style={{ color: rating.color }}>{isPost ? postScore : score}/{total}</span>
                    </div>
                    <div style={{ padding: '6px 12px', borderRadius: '20px', background: rating.bg, border: `1px solid ${rating.border}`, fontSize: '12px', fontWeight: '800', color: rating.color }}>
                      {rating.emoji} {rating.label}
                    </div>
                    {isPost && delta !== 0 && (
                      <div style={{ padding: '6px 12px', borderRadius: '20px', background: deltaBg, border: `1px solid ${deltaBorder}`, fontSize: '12px', fontWeight: '800', color: deltaColor }}>
                        {delta > 0 ? `+${delta}` : delta} pts
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* ── DESKTOP HERO: horizontal ── */
                <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ fontSize: '52px', marginBottom: '10px', lineHeight: 1 }}>{isPost ? heroEmoji : rating.emoji}</div>
                    <div style={{ padding: '5px 14px', borderRadius: '20px', background: rating.bg, border: `1px solid ${rating.border}`, fontSize: '11px', fontWeight: '900', color: rating.color, textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap' }}>
                      {rating.label}
                    </div>
                  </div>
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
              )}
            </div>
          </div>

          {/* ── POST COMPARISON ── */}
          {isPost && (
            <div style={{ marginBottom: '14px', animation: 'fadeUp 0.4s ease 0.08s both' }}>
              {/* Score cards — stack on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 0.6fr 1fr' : '1fr 0.8fr 1fr', gap: isMobile ? '8px' : '12px', marginBottom: '12px' }}>
                {/* Pre score */}
                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex' }}>
                  <div style={{ width: '4px', flexShrink: 0, background: 'rgba(255,255,255,0.20)', borderRadius: '14px 0 0 14px' }}/>
                  <div style={{ flex: 1, padding: isMobile ? '14px 10px' : '18px 16px', background: 'rgba(14,20,14,0.94)', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '8px' }}>Pre</div>
                    <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '900', color: 'rgba(255,255,255,0.55)', letterSpacing: '-1px', lineHeight: 1, marginBottom: '4px' }}>
                      {preScore}<span style={{ fontSize: isMobile ? '11px' : '14px', color: 'rgba(255,255,255,0.25)', fontWeight: '600' }}>/{total}</span>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.35)' }}>{prePercentage}%</div>
                  </div>
                </div>

                {/* Delta */}
                <div style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${deltaBorder}`, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex' }}>
                  <div style={{ width: '4px', flexShrink: 0, background: deltaColor, borderRadius: '14px 0 0 14px', opacity: 0.85 }}/>
                  <div style={{ flex: 1, padding: isMobile ? '14px 8px' : '18px 12px', background: delta > 0 ? 'rgba(0,50,12,0.98)' : delta < 0 ? 'rgba(60,0,0,0.98)' : 'rgba(14,20,14,0.94)', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: `${deltaColor}80`, textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '8px' }}>Change</div>
                    <div style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: '900', color: deltaColor, letterSpacing: '-1px', lineHeight: 1, marginBottom: '4px' }}>
                      {delta > 0 ? `+${delta}` : delta === 0 ? '=' : delta}
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: deltaColor, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      {delta > 0 ? 'Up' : delta < 0 ? 'Down' : 'Same'}
                    </div>
                  </div>
                </div>

                {/* Post score */}
                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(34,197,94,0.28)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex' }}>
                  <div style={{ width: '4px', flexShrink: 0, background: 'linear-gradient(180deg, #22c55e, #16a34a)', borderRadius: '14px 0 0 14px' }}/>
                  <div style={{ flex: 1, padding: isMobile ? '14px 10px' : '18px 16px', background: 'rgba(0,36,10,0.97)', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(74,222,128,0.55)', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '8px' }}>Post</div>
                    <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '900', color: '#4ade80', letterSpacing: '-1px', lineHeight: 1, marginBottom: '4px' }}>
                      {postScore}<span style={{ fontSize: isMobile ? '11px' : '14px', color: 'rgba(74,222,128,0.45)', fontWeight: '600' }}>/{total}</span>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#4ade80' }}>{postPercentage}%</div>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex' }}>
                <div style={{ width: '4px', flexShrink: 0, background: 'rgba(255,255,255,0.10)', borderRadius: '16px 0 0 16px' }}/>
                <div style={{ flex: 1, padding: isMobile ? '16px 14px' : '20px 22px', background: 'rgba(10,16,10,0.97)' }}>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: '14px' }}>📊 Score Comparison</div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: '600' }}>Pre-Assessment</span>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: '700' }}>{prePercentage}%</span>
                    </div>
                    <div style={{ height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'rgba(255,255,255,0.25)', width: `${prePercentage}%`, borderRadius: '8px' }}/>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: '700' }}>Post-Assessment</span>
                      <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: '700' }}>{postPercentage}%</span>
                    </div>
                    <div style={{ height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'linear-gradient(90deg, #006600, #22c55e)', width: `${postPercentage}%`, borderRadius: '8px', boxShadow: '0 0 10px rgba(34,197,94,0.40)' }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PRE-ONLY SCORE CARDS ── */}
          {!isPost && (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '8px' : '12px', marginBottom: '14px', animation: 'fadeUp 0.4s ease 0.08s both' }}>
              {[
                { label: 'Score', value: `${score}/${total}`, color: rating.color, sub: 'out of ' + total },
                { label: 'Accuracy', value: `${percentage}%`, color: '#fcd34d', sub: 'correct' },
                { label: 'Rating', value: rating.emoji, color: rating.color, sub: rating.label },
              ].map((card, i) => (
                <div key={i} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', display: 'flex' }}>
                  <div style={{ width: '4px', flexShrink: 0, background: card.color, opacity: 0.70, borderRadius: '14px 0 0 14px' }}/>
                  <div style={{ flex: 1, padding: isMobile ? '14px 10px' : '18px 16px', background: 'rgba(14,20,14,0.95)', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: '700', marginBottom: '8px' }}>{card.label}</div>
                    <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '900', color: card.color, letterSpacing: '-0.5px', lineHeight: 1, marginBottom: '4px' }}>{card.value}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)' }}>{card.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── KEY TAKEAWAYS ── */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', border: '1px solid rgba(234,150,0,0.25)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', animation: 'fadeUp 0.4s ease 0.16s both', display: 'flex' }}>
            <div style={{ width: '4px', flexShrink: 0, background: 'linear-gradient(180deg, #ea9600, #b37000)', borderRadius: '16px 0 0 16px' }}/>
            <div style={{ flex: 1, padding: isMobile ? '16px 14px' : '20px 22px', background: 'rgba(14,10,0,0.97)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(234,150,0,0.07) 0%, transparent 55%)', pointerEvents: 'none' }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(234,150,0,0.18)', border: '1px solid rgba(234,150,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>💡</div>
                <div>
                  <div style={{ color: '#ffd166', fontWeight: '800', fontSize: isMobile ? '13px' : '14px' }}>Key Takeaways</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>Remember these to stay protected</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', position: 'relative', zIndex: 1 }}>
                {[
                  'Always verify the sender domain before clicking any link in an email.',
                  'No legitimate Kenyan bank will ever ask for your PIN or password via email.',
                  'Urgency and threats in emails are classic phishing manipulation tactics.',
                  'Report all suspicious emails immediately using PhishRipoti.',
                ].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '9px 12px', borderRadius: '9px', background: 'rgba(234,150,0,0.07)', border: '1px solid rgba(234,150,0,0.14)' }}>
                    <div style={{ width: '19px', height: '19px', borderRadius: '6px', background: 'rgba(234,150,0,0.20)', border: '1px solid rgba(234,150,0,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: '#ffd166', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <span style={{ fontSize: isMobile ? '12px' : '13px', color: 'rgba(255,255,255,0.78)', lineHeight: '1.60', fontWeight: '500' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ACTION BUTTONS — stack on mobile ── */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px', animation: 'fadeUp 0.4s ease 0.24s both' }}>
            <button onClick={() => navigate('/awareness/modules', { state: { department } })} style={{ flex: isMobile ? 'none' : 1, padding: '14px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', color: '#fff', background: 'linear-gradient(135deg, #006600, #004800)', border: 'none', cursor: 'pointer', boxShadow: '0 6px 22px rgba(0,102,0,0.38)', transition: 'all 0.18s' }}>
              📚 Try Another Module
            </button>
            <button onClick={() => navigate('/report/step1')} style={{ flex: isMobile ? 'none' : 1, padding: '14px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', color: '#fff', background: 'linear-gradient(135deg, #BB0000, #880000)', border: 'none', cursor: 'pointer', boxShadow: '0 6px 22px rgba(187,0,0,0.35)', transition: 'all 0.18s' }}>
              📧 Report Suspicious Email
            </button>
            <button onClick={() => navigate('/')} style={{ flex: isMobile ? 'none' : 'none', padding: '14px 16px', borderRadius: '12px', fontWeight: '600', fontSize: '13px', color: 'rgba(255,255,255,0.65)', background: 'rgba(14,22,14,0.90)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', backdropFilter: 'blur(20px)', transition: 'all 0.18s', textAlign: 'center' }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;