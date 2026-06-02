import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 640;

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUNDS ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#e8e2d4' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 65% at 50% 38%, rgba(255,253,248,0.97) 0%, rgba(248,244,234,0.94) 25%, rgba(240,234,220,0.82) 50%, rgba(220,213,196,0.45) 72%, transparent 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(180,165,140,0.28) 100%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 3, background: 'linear-gradient(180deg, rgba(4,26,8,0.24) 0%, rgba(4,26,8,0.08) 14%, transparent 30%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 4, background: 'linear-gradient(0deg, rgba(90,0,0,0.18) 0%, rgba(90,0,0,0.07) 14%, transparent 30%)' }} />

      {/* Skyline — desktop only */}
      {!isMobile && (
        <div style={{ position: 'fixed', bottom: 0, right: 0, width: '640px', height: '250px', zIndex: 5, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, #000 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" fill="#5a4a35" opacity="0.18">
            <rect x="20" y="180" width="18" height="80" /><rect x="42" y="170" width="14" height="90" />
            <rect x="310" y="60" width="38" height="200" /><rect x="318" y="50" width="22" height="15" />
            <rect x="324" y="40" width="10" height="14" /><rect x="327" y="30" width="4" height="12" />
            <rect x="200" y="90" width="32" height="170" /><ellipse cx="216" cy="90" rx="18" ry="8" />
            <rect x="380" y="80" width="34" height="180" /><rect x="150" y="120" width="26" height="140" />
            <rect x="250" y="110" width="24" height="150" /><rect x="418" y="100" width="28" height="160" />
            <rect x="476" y="130" width="26" height="130" /><rect x="0" y="258" width="580" height="2" />
          </svg>
        </div>
      )}

      {/* Decorative SVG */}
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 6, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,80,20,0.09)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(140,0,0,0.09)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="3" fill="rgba(0,80,20,0.11)"/>
        <circle cx="88%" cy="20%" r="3.5" fill="rgba(140,0,0,0.11)"/>
      </svg>

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', height: isMobile ? '50px' : '66px', background: '#061508', boxShadow: '0 2px 28px rgba(0,0,0,0.25)', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isMobile ? '4px' : '6px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: isMobile ? '32px' : '38px', height: isMobile ? '32px' : '38px', borderRadius: '10px', background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(255,80,80,0.18), 0 4px 16px rgba(187,0,0,0.50)', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>
          <span style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: 1 }}>
            <span style={{ color: '#ffffff' }}>Phish</span>
            <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ripoti</span>
          </span>
        </div>

        <button onClick={() => navigate('/it/login')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: isMobile ? '7px 10px' : '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.82)', fontSize: isMobile ? '11px' : '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          {isMobile ? 'IT Portal' : 'IT Manager Portal'}
        </button>
      </nav>

      {/* ── HERO CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center', padding: isMobile ? '16px 16px 12px' : '40px 24px 20px', textAlign: 'center', position: 'relative', zIndex: 10, overflowY: isMobile ? 'auto' : 'visible' }}>

        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: isMobile ? '12px' : '24px', padding: isMobile ? '5px 12px' : '6px 16px', borderRadius: '99px', background: 'rgba(255,255,255,0.84)', border: '1px solid rgba(0,0,0,0.09)', color: '#444444', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', fontSize: isMobile ? '11px' : '13px', fontWeight: '500' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: isMobile ? '6px' : '8px', height: isMobile ? '6px' : '8px', borderRadius: '50%', background: '#BB0000' }}/>
            <div style={{ width: isMobile ? '6px' : '8px', height: isMobile ? '6px' : '8px', borderRadius: '50%', background: '#1a1a1a' }}/>
            <div style={{ width: isMobile ? '6px' : '8px', height: isMobile ? '6px' : '8px', borderRadius: '50%', background: '#006600' }}/>
          </div>
          Built for Kenyan financial institutions
        </div>

        {/* Hero heading */}
        <h1 style={{ fontWeight: '900', margin: '0 0 2px', letterSpacing: isMobile ? '-1px' : '-2px', color: '#1a1a1a', lineHeight: 1.05, fontSize: isMobile ? '42px' : '68px' }}>
          Ripoti.
        </h1>
        <h1 style={{ fontWeight: '900', margin: '0 0 isMobile ? 10px : 20px', letterSpacing: isMobile ? '-1px' : '-2px', lineHeight: 1.05, fontSize: isMobile ? '42px' : '68px', marginBottom: isMobile ? '10px' : '20px' }}>
          <span style={{ color: '#BB0000' }}>Salama.</span>{' '}
          <span style={{ color: '#006600' }}>Haraka.</span>
        </h1>

        {/* Subtitle */}
        <p style={{ maxWidth: isMobile ? '300px' : '560px', margin: '0 auto', marginBottom: isMobile ? '16px' : '32px', fontSize: isMobile ? '13px' : '18px', color: '#4a4a4a', lineHeight: '1.65' }}>
          Anonymous phishing reports for Kenyan banks. Powered by GPT-4o. No login. No identity stored.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: isMobile ? '300px' : '420px', marginBottom: isMobile ? '16px' : '40px' }}>
          <button onClick={() => navigate('/report/step1')}
            className="flex items-center justify-center gap-2"
            style={{ width: '100%', padding: isMobile ? '12px 20px' : '16px 28px', borderRadius: '12px', fontWeight: '700', color: '#fff', background: '#BB0000', fontSize: isMobile ? '14px' : '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(187,0,0,0.30)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
            </svg>
            Report a Suspicious Email
          </button>

          <button onClick={() => navigate('/awareness')}
            className="flex items-center justify-center gap-2"
            style={{ width: '100%', padding: isMobile ? '12px 20px' : '16px 28px', borderRadius: '12px', fontWeight: '700', color: '#fff', background: '#006600', fontSize: isMobile ? '14px' : '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,102,0,0.25)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke="#fff" strokeWidth="2"/>
            </svg>
            Go to Awareness Hub
          </button>

          <button disabled
            className="flex items-center justify-center gap-2"
            style={{ width: '100%', padding: isMobile ? '10px 20px' : '14px 28px', borderRadius: '12px', fontWeight: '600', background: 'rgba(255,255,255,0.55)', color: '#aaaaaa', border: '1px solid rgba(0,0,0,0.08)', fontSize: isMobile ? '13px' : '15px', cursor: 'not-allowed', backdropFilter: 'blur(8px)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#cccccc" strokeWidth="2"/>
            </svg>
            Ask PhishRipoti AI
            <span style={{ fontSize: '9px', background: 'rgba(0,0,0,0.06)', color: '#aaaaaa', padding: '2px 5px', borderRadius: '4px' }}>v2.0</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', maxWidth: isMobile ? '300px' : '580px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.09), transparent)', marginBottom: isMobile ? '14px' : '32px' }} />

        {/* Trust cards */}
        {isMobile ? (
          /* ── MOBILE: horizontal scroll row ── */
          <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', gap: '10px', paddingLeft: '2px', paddingRight: '2px', width: 'max-content' }}>
              {[
                { icon: '🔒', title: 'Identity never stored', desc: 'No name, email, or IP address collected.' },
                { icon: '⚡', title: 'AI analysis instantly', desc: 'GPT-4o scans for phishing signals in seconds.' },
                { icon: '🇰🇪', title: 'Built for Kenya', desc: 'M-Pesa, KCB, Equity Bank threat patterns.' }
              ].map((card, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '14px', padding: '14px 14px', width: '160px', flexShrink: 0, textAlign: 'center', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
                  <div style={{ fontSize: '22px', marginBottom: '7px' }}>{card.icon}</div>
                  <div style={{ fontWeight: '700', fontSize: '12px', color: '#1a1a1a', marginBottom: '4px', lineHeight: 1.3 }}>{card.title}</div>
                  <div style={{ fontSize: '11px', color: '#777777', lineHeight: '1.5' }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── DESKTOP: 3 column grid ── */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%', maxWidth: '680px' }}>
            {[
              { icon: '🔒', title: 'Your identity is never stored', desc: 'Fully anonymous by design. No name, no email, no IP address stored.', border: 'rgba(187,0,0,0.13)' },
              { icon: '⚡', title: 'AI analyses your report instantly', desc: 'GPT-4o scans for phishing signals and risk tier in real time.', border: 'rgba(0,0,0,0.08)' },
              { icon: '🇰🇪', title: 'Built for Kenya', desc: 'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', border: 'rgba(0,102,0,0.13)' }
            ].map((card, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.75)', border: `1px solid ${card.border}`, borderRadius: '16px', padding: '22px 18px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{card.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#1a1a1a', marginBottom: '6px' }}>{card.title}</div>
                <div style={{ fontSize: '12px', color: '#777777', lineHeight: '1.6' }}>{card.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;