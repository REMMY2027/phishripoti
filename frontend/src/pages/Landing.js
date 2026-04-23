import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.7 ? '#BB0000' : '#006600'
    }));

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated wave lines
      for (let w = 0; w < 4; w++) {
        ctx.beginPath();
        ctx.strokeStyle = w < 2
          ? `rgba(0,102,0,${0.06 - w * 0.015})`
          : `rgba(187,0,0,${0.05 - (w - 2) * 0.015})`;
        ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = canvas.height * (0.55 + w * 0.08) +
            Math.sin(x * 0.006 + time + w * 0.8) * 40 +
            Math.sin(x * 0.003 + time * 0.7 + w) * 25;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Move and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#BB0000'
          ? `rgba(187,0,0,${p.opacity})`
          : `rgba(0,102,0,${p.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Deep dark base */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: '#050d05'
      }} />

      {/* Radial green glow top left */}
      <div style={{
        position: 'absolute', top: '-200px', left: '-200px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,80,0,0.35) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Radial red glow bottom right */}
      <div style={{
        position: 'absolute', bottom: '-150px', right: '-150px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(140,0,0,0.3) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Subtle center light */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '800px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(20,60,20,0.2) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Animated canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%', zIndex: 1
      }} />

      {/* SVG static elements */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 2, pointerEvents: 'none'
      }} xmlns="http://www.w3.org/2000/svg">

        {/* Shield icon watermark center */}
        <g transform="translate(50%, 50%)" opacity="0.03">
          <path d="M0 -80 L-60 -50 L-60 10 C-60 50 -20 80 0 90 C20 80 60 50 60 10 L60 -50 Z"
            fill="#ffffff"/>
        </g>

        {/* Hexagon grid left */}
        <polygon points="50,200 80,183 110,200 110,234 80,251 50,234"
          fill="none" stroke="rgba(0,102,0,0.2)" strokeWidth="1"/>
        <polygon points="110,200 140,183 170,200 170,234 140,251 110,234"
          fill="none" stroke="rgba(0,102,0,0.12)" strokeWidth="1"/>
        <polygon points="80,251 110,234 140,251 140,285 110,302 80,285"
          fill="none" stroke="rgba(0,102,0,0.12)" strokeWidth="1"/>
        <polygon points="20,251 50,234 80,251 80,285 50,302 20,285"
          fill="none" stroke="rgba(0,102,0,0.08)" strokeWidth="1"/>

        {/* Lock icon */}
        <g transform="translate(68, 108)" opacity="0.18">
          <rect x="0" y="8" width="18" height="13" rx="2"
            fill="none" stroke="#69db7c" strokeWidth="1.2"/>
          <path d="M4 8V5.5a5 5 0 0 1 10 0V8"
            fill="none" stroke="#69db7c" strokeWidth="1.2"/>
          <circle cx="9" cy="14" r="1.5" fill="#69db7c"/>
        </g>

        {/* Concentric arcs top right */}
        <path d="M 1300 0 A 200 200 0 0 1 1400 150"
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <path d="M 1250 0 A 260 260 0 0 1 1400 200"
          fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <path d="M 1200 0 A 320 320 0 0 1 1400 260"
          fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>

        {/* Red arcs bottom right */}
        <path d="M 1400 600 A 180 180 0 0 1 1280 750"
          fill="none" stroke="rgba(187,0,0,0.15)" strokeWidth="1.5"/>
        <path d="M 1400 550 A 240 240 0 0 1 1220 750"
          fill="none" stroke="rgba(187,0,0,0.1)" strokeWidth="1"/>
        <path d="M 1400 500 A 300 300 0 0 1 1160 750"
          fill="none" stroke="rgba(187,0,0,0.07)" strokeWidth="1"/>

        {/* Horizontal scan line */}
        <line x1="0" y1="380" x2="100%" y2="380"
          stroke="rgba(0,102,0,0.06)" strokeWidth="0.5" strokeDasharray="4 8"/>

        {/* Corner brackets top left */}
        <path d="M 20 20 L 20 50 M 20 20 L 50 20"
          stroke="rgba(0,102,0,0.3)" strokeWidth="1.5" fill="none"/>
        {/* Corner brackets top right */}
        <path d="M calc(100% - 20px) 20 L calc(100% - 20px) 50 M calc(100% - 20px) 20 L calc(100% - 50px) 20"
          stroke="rgba(187,0,0,0.3)" strokeWidth="1.5" fill="none"/>
        {/* Corner brackets bottom left */}
        <path d="M 20 calc(100% - 20px) L 20 calc(100% - 50px) M 20 calc(100% - 20px) L 50 calc(100% - 20px)"
          stroke="rgba(0,102,0,0.2)" strokeWidth="1.5" fill="none"/>
        {/* Corner brackets bottom right */}
        <path d="M calc(100% - 20px) calc(100% - 20px) L calc(100% - 20px) calc(100% - 50px) M calc(100% - 20px) calc(100% - 20px) L calc(100% - 50px) calc(100% - 20px)"
          stroke="rgba(187,0,0,0.25)" strokeWidth="1.5" fill="none"/>
      </svg>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <Navbar light={false} />
      </div>

      {/* Hero content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px', textAlign: 'center',
        position: 'relative', zIndex: 3
      }}>

        {/* Top label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,102,0,0.15)',
          border: '1px solid rgba(0,102,0,0.35)',
          borderRadius: '30px', padding: '6px 16px', marginBottom: '32px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#69db7c',
            boxShadow: '0 0 8px #69db7c'
          }}></div>
          <span style={{
            fontSize: '12px', fontWeight: '600',
            color: '#69db7c', letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Built for Kenyan financial institutions
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#BB0000' }}></div>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }}></div>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}></div>
          </div>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontSize: '76px', fontWeight: '900',
          lineHeight: '1.0', letterSpacing: '-3px',
          color: '#ffffff', margin: '0 0 8px',
          textShadow: '0 0 60px rgba(0,80,0,0.4)'
        }}>
          Ripoti.
        </h1>
        <h1 style={{
          fontSize: '76px', fontWeight: '900',
          lineHeight: '1.0', letterSpacing: '-3px', margin: '0 0 28px'
        }}>
          <span style={{
            color: '#ff6666',
            textShadow: '0 0 40px rgba(187,0,0,0.5), 0 0 80px rgba(187,0,0,0.2)'
          }}>Salama.</span>{' '}
          <span style={{
            color: '#66dd66',
            textShadow: '0 0 40px rgba(0,102,0,0.5), 0 0 80px rgba(0,102,0,0.2)'
          }}>Haraka.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: '520px', fontSize: '18px',
          color: 'rgba(255,255,255,0.6)', lineHeight: '1.8',
          margin: '0 0 40px'
        }}>
          Anonymous phishing reports for Kenyan banks. Powered by GPT-4o. No login. No identity stored. Results in seconds.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
          <button onClick={() => navigate('/report/step1')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '16px 28px', borderRadius: '14px',
              fontWeight: '700', fontSize: '15px', color: '#ffffff',
              background: 'linear-gradient(135deg, #BB0000, #880000)',
              border: '1px solid rgba(255,100,100,0.3)',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 4px 24px rgba(187,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(187,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(187,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
            </svg>
            Report a Suspicious Email
          </button>

          <button onClick={() => navigate('/awareness')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '16px 28px', borderRadius: '14px',
              fontWeight: '700', fontSize: '15px', color: '#ffffff',
              background: 'linear-gradient(135deg, #006600, #004400)',
              border: '1px solid rgba(100,200,100,0.3)',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 4px 24px rgba(0,102,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,102,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,102,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke="#fff" strokeWidth="2"/>
            </svg>
            Go to Awareness Hub
          </button>

          <button disabled style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '16px 28px', borderRadius: '14px',
            fontWeight: '700', fontSize: '15px',
            color: 'rgba(255,255,255,0.25)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'not-allowed',
            backdropFilter: 'blur(8px)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
            </svg>
            Ask PhishRipoti AI
            <span style={{
              fontSize: '10px', background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.25)',
              padding: '2px 7px', borderRadius: '4px'
            }}>v2.0</span>
          </button>
        </div>

        {/* Thin divider */}
        <div style={{
          width: '100%', maxWidth: '600px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          marginBottom: '48px'
        }}></div>

        {/* Cards */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '16px', justifyContent: 'center', maxWidth: '760px'
        }}>
          {[
            { icon: '🔒', title: 'Your identity is never stored', desc: 'Fully anonymous by design. No name, no email, no IP address stored.', accent: 'rgba(187,0,0,0.35)' },
            { icon: '⚡', title: 'AI analyses your report instantly', desc: 'GPT-4o scans for phishing signals and risk tier in real time.', accent: 'rgba(255,255,255,0.12)' },
            { icon: '🇰🇪', title: 'Built for Kenya', desc: 'Tailored for M-Pesa fraud, KCB, Equity Bank, and local threat patterns.', accent: 'rgba(0,102,0,0.4)' }
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${card.accent}`,
              borderRadius: '18px', padding: '24px 20px',
              minWidth: '190px', maxWidth: '220px', flex: '1',
              textAlign: 'center',
              backdropFilter: 'blur(16px)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
              transition: 'transform 0.25s, box-shadow 0.25s'
            }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`;
              }}>
              <div style={{ fontSize: '30px', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#ffffff', marginBottom: '8px' }}>{card.title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.65' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
