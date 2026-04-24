import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let tick = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const grain = document.createElement('canvas');
    grain.width = 256; grain.height = 256;
    const gctx = grain.getContext('2d');
    const gimg = gctx.createImageData(256, 256);
    for (let i = 0; i < gimg.data.length; i += 4) {
      const v = Math.floor(Math.random() * 30);
      gimg.data[i] = v; gimg.data[i+1] = v; gimg.data[i+2] = v;
      gimg.data[i+3] = Math.floor(Math.random() * 22);
    }
    gctx.putImageData(gimg, 0, 0);

    const lines = Array.from({ length: 16 }, (_, i) => ({
      y: (i / 15),
      amp: 14 + Math.random() * 22,
      freq: 0.0016 + Math.random() * 0.001,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0025 + Math.random() * 0.003,
      alpha: 0.018 + Math.random() * 0.024,
      isRed: i % 5 === 0,
    }));

    function draw() {
      tick++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const base = ctx.createRadialGradient(W * 0.5, H * 0.42, 0, W * 0.5, H * 0.42, W * 0.75);
      base.addColorStop(0,    '#f9fdf9');
      base.addColorStop(0.22, '#eef8ee');
      base.addColorStop(0.50, '#d6edd8');
      base.addColorStop(0.74, '#a8d4ac');
      base.addColorStop(1.0,  '#5a9460');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      [[0,0],[W,0],[0,H],[W,H]].forEach(([cx,cy]) => {
        const r = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.6);
        r.addColorStop(0,    'rgba(5,40,15,0.42)');
        r.addColorStop(0.45, 'rgba(5,40,15,0.14)');
        r.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = r;
        ctx.fillRect(0, 0, W, H);
      });

      const r1 = ctx.createRadialGradient(0, H, 0, 0, H, W * 0.48);
      r1.addColorStop(0,    'rgba(187,0,0,0.10)');
      r1.addColorStop(0.55, 'rgba(187,0,0,0.03)');
      r1.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = r1; ctx.fillRect(0, 0, W, H);

      const r2 = ctx.createRadialGradient(W, H, 0, W, H, W * 0.48);
      r2.addColorStop(0,    'rgba(187,0,0,0.08)');
      r2.addColorStop(0.55, 'rgba(187,0,0,0.02)');
      r2.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = r2; ctx.fillRect(0, 0, W, H);

      lines.forEach(l => {
        l.phase += l.speed;
        ctx.beginPath();
        for (let s = 0; s <= 40; s++) {
          const x = (s / 40) * W;
          const y = l.y * H + Math.sin(x * l.freq + l.phase) * l.amp;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = l.isRed
          ? `rgba(160,0,0,${l.alpha * 0.7})`
          : `rgba(0,70,20,${l.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      const btn = ctx.createRadialGradient(W*0.5, H*0.65, 0, W*0.5, H*0.65, 200);
      btn.addColorStop(0,   'rgba(0,100,30,0.09)');
      btn.addColorStop(0.6, 'rgba(187,0,0,0.04)');
      btn.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = btn;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.5;
      for (let gx = 0; gx < W; gx += 256)
        for (let gy = 0; gy < H; gy += 256)
          ctx.drawImage(grain, gx, gy);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Canvas background */}
      <canvas ref={canvasRef} style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', display: 'block',
      }} />

      {/* SVG decorative shapes */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="-50" cy="150" r="350" fill="none" stroke="rgba(0,102,0,0.10)" strokeWidth="1.5"/>
        <circle cx="-50" cy="150" r="280" fill="none" stroke="rgba(0,102,0,0.07)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="210" fill="none" stroke="rgba(0,102,0,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="320" fill="none" stroke="rgba(187,0,0,0.10)" strokeWidth="1.5"/>
        <circle cx="110%" cy="80%" r="250" fill="none" stroke="rgba(187,0,0,0.07)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="180" fill="none" stroke="rgba(187,0,0,0.04)" strokeWidth="1"/>
        <rect x="8%" y="12%" width="55" height="55" rx="14" fill="none" stroke="rgba(0,102,0,0.13)" strokeWidth="1.5" transform="rotate(20 100 150)"/>
        <rect x="82%" y="8%" width="70" height="70" rx="18" fill="none" stroke="rgba(187,0,0,0.13)" strokeWidth="1.5" transform="rotate(-15 1150 120)"/>
        <rect x="75%" y="65%" width="45" height="45" rx="10" fill="none" stroke="rgba(0,102,0,0.10)" strokeWidth="1" transform="rotate(30 1050 550)"/>
        <rect x="5%" y="70%" width="60" height="60" rx="12" fill="none" stroke="rgba(187,0,0,0.10)" strokeWidth="1" transform="rotate(-25 80 600)"/>
        <polygon points="150,60 190,140 110,140" fill="none" stroke="rgba(0,102,0,0.10)" strokeWidth="1.5"/>
        <polygon points="1150,500 1200,590 1100,590" fill="none" stroke="rgba(187,0,0,0.10)" strokeWidth="1.5"/>
        <polygon points="200,480 225,466 250,480 250,508 225,522 200,508" fill="none" stroke="rgba(0,102,0,0.13)" strokeWidth="1.5"/>
        <polygon points="1050,180 1075,166 1100,180 1100,208 1075,222 1050,208" fill="none" stroke="rgba(187,0,0,0.13)" strokeWidth="1.5"/>
        <path d="M 0 500 Q 350 350 700 480 T 1400 420" fill="none" stroke="rgba(0,102,0,0.06)" strokeWidth="1.5"/>
        <path d="M 0 600 Q 400 450 750 560 T 1400 500" fill="none" stroke="rgba(187,0,0,0.05)" strokeWidth="1"/>
        <circle cx="10%" cy="25%" r="4" fill="rgba(0,102,0,0.18)"/>
        <circle cx="14%" cy="40%" r="3" fill="rgba(0,102,0,0.13)"/>
        <circle cx="88%" cy="20%" r="5" fill="rgba(187,0,0,0.18)"/>
        <circle cx="92%" cy="38%" r="3" fill="rgba(187,0,0,0.13)"/>
        <circle cx="6%" cy="75%" r="4" fill="rgba(187,0,0,0.13)"/>
        <circle cx="94%" cy="72%" r="4" fill="rgba(0,102,0,0.13)"/>
        <circle cx="45%" cy="8%" r="3" fill="rgba(0,0,0,0.07)"/>
        <circle cx="55%" cy="92%" r="3" fill="rgba(0,0,0,0.07)"/>
        <line x1="10%" y1="25%" x2="14%" y2="40%" stroke="rgba(0,102,0,0.10)" strokeWidth="0.8"/>
        <line x1="88%" y1="20%" x2="92%" y2="38%" stroke="rgba(187,0,0,0.10)" strokeWidth="0.8"/>
      </svg>

      {/* Glassmorphism Navbar */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '62px',
        background: 'rgba(6,26,10,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 25%, rgba(74,222,128,0.4) 50%, rgba(255,255,255,0.18) 75%, transparent 100%)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #BB0000, #880000)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(187,0,0,0.4)', flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                fill="rgba(255,255,255,0.93)"/>
            </svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: '700', color: 'rgba(255,255,255,0.93)', letterSpacing: '-0.3px' }}>
            Phish<span style={{ color: '#4ade80' }}>Ripoti</span>
          </span>
        </div>

        <button onClick={() => navigate('/it-login')} style={{
          display: 'flex', alignItems: 'center', gap: '7px',
          padding: '8px 16px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.82)', fontSize: '13px',
          fontWeight: '500', cursor: 'pointer', letterSpacing: '0.01em',
          transition: 'all 0.18s ease',
        }}
          onMouseOver={e => { e.currentTarget.style.background='rgba(255,255,255,0.13)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,0.26)'; }}
          onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.82)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          IT Manager Portal
        </button>
      </nav>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ position: 'relative', zIndex: 2 }}>

        <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
          style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)', color: '#444444', backdropFilter: 'blur(8px)' }}>
          <div className="flex gap-1">
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#BB0000' }}/>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#1a1a1a' }}/>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#006600' }}/>
          </div>
          Built for Kenyan financial institutions
        </div>

        <h1 className="font-black mb-2" style={{ fontSize:'68px', lineHeight:'1.02', letterSpacing:'-2px', color:'#1a1a1a' }}>
          Ripoti.
        </h1>
        <h1 className="font-black mb-6" style={{ fontSize:'68px', lineHeight:'1.02', letterSpacing:'-2px' }}>
          <span style={{ color:'#BB0000' }}>Salama.</span>{' '}
          <span style={{ color:'#006600' }}>Haraka.</span>
        </h1>

        <p className="max-w-xl mx-auto mb-10" style={{ fontSize:'18px', color:'#555555', lineHeight:'1.75' }}>
          Anonymous phishing reports for Kenyan banks. Powered by GPT-4o. No login. No identity stored. Results in seconds.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button onClick={() => navigate('/report/step1')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
            style={{ background:'#BB0000', fontSize:'15px', boxShadow:'0 4px 20px rgba(187,0,0,0.25)' }}
            onMouseOver={e => { e.currentTarget.style.background='#990000'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.background='#BB0000'; e.currentTarget.style.transform='translateY(0)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
            </svg>
            Report a Suspicious Email
          </button>

          <button onClick={() => navigate('/awareness')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white transition-all"
            style={{ background:'#006600', fontSize:'15px', boxShadow:'0 4px 20px rgba(0,102,0,0.2)' }}
            onMouseOver={e => { e.currentTarget.style.background='#005000'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.background='#006600'; e.currentTarget.style.transform='translateY(0)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke="#fff" strokeWidth="2"/>
            </svg>
            Go to Awareness Hub
          </button>

          <button disabled
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold transition-all cursor-not-allowed"
            style={{ background:'rgba(0,0,0,0.04)', color:'#aaaaaa', border:'1px solid rgba(0,0,0,0.1)', fontSize:'15px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#cccccc" strokeWidth="2"/>
            </svg>
            Ask PhishRipoti AI
            <span style={{ fontSize:'10px', background:'rgba(0,0,0,0.06)', color:'#aaaaaa', padding:'2px 6px', borderRadius:'4px' }}>v2.0</span>
          </button>
        </div>

        <div style={{ width:'100%', maxWidth:'640px', height:'1px', background:'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)', marginBottom:'48px' }} />

        <div className="flex flex-wrap gap-5 justify-center max-w-3xl">
          {[
            { icon:'🔒', title:'Your identity is never stored', desc:'Fully anonymous by design. No name, no email, no IP address stored.', border:'rgba(187,0,0,0.2)', hover:'rgba(187,0,0,0.08)' },
            { icon:'⚡', title:'AI analyses your report instantly', desc:'GPT-4o scans for phishing signals and risk tier in real time.', border:'rgba(0,0,0,0.08)', hover:'rgba(0,0,0,0.03)' },
            { icon:'🇰🇪', title:'Built for Kenya', desc:'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', border:'rgba(0,102,0,0.2)', hover:'rgba(0,102,0,0.06)' }
          ].map((card, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.85)', border:`1px solid ${card.border}`,
              borderRadius:'16px', padding:'24px 20px',
              minWidth:'180px', maxWidth:'210px', flex:'1', textAlign:'center',
              boxShadow:'0 4px 20px rgba(0,0,0,0.06)', backdropFilter:'blur(12px)',
              transition:'transform 0.2s, box-shadow 0.2s, background 0.2s'
            }}
              onMouseOver={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(0,0,0,0.1)'; e.currentTarget.style.background=card.hover; }}
              onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.background='rgba(255,255,255,0.85)'; }}>
              <div style={{ fontSize:'28px', marginBottom:'10px' }}>{card.icon}</div>
              <div style={{ fontWeight:'600', fontSize:'14px', color:'#1a1a1a', marginBottom:'6px' }}>{card.title}</div>
              <div style={{ fontSize:'12px', color:'#888888', lineHeight:'1.6' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;