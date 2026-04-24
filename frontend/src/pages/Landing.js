import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Landing() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Staggered entrance
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Canvas — hex grid + scanlines + floating particles
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

    // Hex grid points
    const hexes = [];
    const HEX_SIZE = 52;
    const cols = Math.ceil(window.innerWidth / (HEX_SIZE * 1.73)) + 2;
    const rows = Math.ceil(window.innerHeight / (HEX_SIZE * 1.5)) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * HEX_SIZE * 1.73 + (r % 2) * HEX_SIZE * 0.865;
        const y = r * HEX_SIZE * 1.5;
        hexes.push({
          x, y,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.005 + Math.random() * 0.008,
          color: Math.random() > 0.92 ? 'red' : Math.random() > 0.88 ? 'green' : 'neutral',
          active: Math.random() > 0.93,
        });
      }
    }

    // Particles
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.3,
      size: 1 + Math.random() * 2,
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.4,
      type: Math.random() > 0.7 ? 'red' : 'green',
    }));

    // Data streams (vertical falling lines)
    const streams = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 0.6 + Math.random() * 1.2,
      length: 40 + Math.random() * 80,
      opacity: 0.03 + Math.random() * 0.07,
      color: Math.random() > 0.5 ? '#BB0000' : '#006600',
    }));

    function drawHex(x, y, size, opacity, color) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      if (color === 'red') {
        ctx.strokeStyle = `rgba(187,0,0,${opacity * 1.8})`;
      } else if (color === 'green') {
        ctx.strokeStyle = `rgba(0,102,0,${opacity * 1.5})`;
      } else {
        ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.35})`;
      }
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function draw() {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep background
      ctx.fillStyle = '#050d05';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ambient glow — red left, green right
      const glowL = ctx.createRadialGradient(0, canvas.height * 0.5, 0, 0, canvas.height * 0.5, canvas.width * 0.45);
      glowL.addColorStop(0, 'rgba(187,0,0,0.06)');
      glowL.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowL;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const glowR = ctx.createRadialGradient(canvas.width, canvas.height * 0.5, 0, canvas.width, canvas.height * 0.5, canvas.width * 0.45);
      glowR.addColorStop(0, 'rgba(0,102,0,0.07)');
      glowR.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center hero glow
      const heroGlow = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.38, 0, canvas.width / 2, canvas.height * 0.38, canvas.width * 0.32);
      heroGlow.addColorStop(0, 'rgba(0,102,0,0.05)');
      heroGlow.addColorStop(0.5, 'rgba(187,0,0,0.03)');
      heroGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = heroGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hex grid
      hexes.forEach(h => {
        h.pulse += h.speed;
        const baseOpacity = h.active
          ? 0.06 + 0.08 * Math.sin(h.pulse)
          : 0.02 + 0.015 * Math.sin(h.pulse * 0.6);
        drawHex(h.x, h.y, HEX_SIZE * 0.92, baseOpacity, h.color);

        // Active hex fill flash
        if (h.active && h.color !== 'neutral') {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = h.x + HEX_SIZE * 0.88 * Math.cos(angle);
            const py = h.y + HEX_SIZE * 0.88 * Math.sin(angle);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          const fill = h.color === 'red'
            ? `rgba(187,0,0,${0.025 * Math.abs(Math.sin(h.pulse))})`
            : `rgba(0,102,0,${0.035 * Math.abs(Math.sin(h.pulse))})`;
          ctx.fillStyle = fill;
          ctx.fill();
        }
      });

      // Data streams
      streams.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height + s.length) s.y = -s.length;
        const grad = ctx.createLinearGradient(s.x, s.y - s.length, s.x, s.y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, s.color + Math.round(s.opacity * 255).toString(16).padStart(2, '0'));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.length);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      });

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.004;
        if (p.life > p.maxLife || p.y < -10) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.life = 0;
        }
        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'red'
          ? `rgba(187,0,0,${alpha})`
          : `rgba(0,180,0,${alpha * 0.8})`;
        ctx.fill();
      });

      // Horizontal scanlines (very subtle)
      if (tick % 3 === 0) {
        const scanY = (tick * 0.7) % canvas.height;
        const scanGrad = ctx.createLinearGradient(0, scanY - 4, 0, scanY + 4);
        scanGrad.addColorStop(0, 'rgba(0,255,0,0)');
        scanGrad.addColorStop(0.5, 'rgba(0,255,0,0.015)');
        scanGrad.addColorStop(1, 'rgba(0,255,0,0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 4, canvas.width, 8);
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050d05',
      overflowX: 'hidden',
      fontFamily: "'Courier New', monospace",
    }}>
      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <Navbar light={false} />

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 1.5rem',
        textAlign: 'center',
      }}>

        {/* Kenyan flag stripe accent top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #BB0000 0%, #1A1A1A 40%, #006600 100%)',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
        }} />

        {/* Classification badge */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          marginBottom: '2rem',
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px',
          border: '1px solid rgba(187,0,0,0.4)',
          borderRadius: '2px',
          background: 'rgba(187,0,0,0.06)',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{
            display: 'inline-block', width: '6px', height: '6px',
            borderRadius: '50%', background: '#BB0000',
            animation: 'blink 1.4s ease infinite',
          }} />
          <span style={{
            fontSize: '10px', letterSpacing: '0.22em',
            color: '#BB0000', textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Kenya Cyber Threat Intelligence
          </span>
        </div>

        {/* Main headline */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
          marginBottom: '0.5rem',
          position: 'relative',
          transform: loaded
            ? `translateY(0) translate(${mousePos.x * -6}px, ${mousePos.y * -3}px)`
            : 'translateY(24px)',
        }}>
          <h1 style={{
            margin: 0,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            fontSize: 'clamp(62px, 10vw, 118px)',
            color: '#f0f0f0',
          }}>
            <span style={{ color: '#BB0000' }}>PHISH</span>
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(0,102,0,0.7)',
            }}>RIPOTI</span>
          </h1>
        </div>

        {/* Tagline rule */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
          display: 'flex', alignItems: 'center', gap: '16px',
          marginBottom: '1.5rem', width: '100%', maxWidth: '540px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(187,0,0,0.5))' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Phishing Intelligence Platform
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(0,102,0,0.5))' }} />
        </div>

        {/* Sub-headline */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s',
          marginBottom: '3rem',
          maxWidth: '520px',
        }}>
          <p style={{
            margin: 0,
            fontSize: 'clamp(14px, 2vw, 17px)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75,
            fontFamily: "'Courier New', monospace",
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}>
            Anonymous threat reporting for Kenyan financial institutions.{' '}
            <span style={{ color: 'rgba(0,200,100,0.7)' }}>AI-powered analysis</span>.{' '}
            <span style={{ color: 'rgba(187,0,0,0.8)' }}>Zero trace</span>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s',
          display: 'flex', flexWrap: 'wrap', gap: '14px',
          justifyContent: 'center', marginBottom: '4rem',
        }}>
          <button
            onClick={() => navigate('/report/step1')}
            style={{
              padding: '14px 36px',
              background: '#BB0000',
              border: 'none',
              color: '#fff',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Courier New', monospace",
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d40000'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#BB0000'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ▶ Report Threat
          </button>

          <button
            onClick={() => navigate('/awareness')}
            style={{
              padding: '14px 36px',
              background: 'transparent',
              border: '1px solid rgba(0,102,0,0.6)',
              color: 'rgba(0,200,80,0.9)',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Courier New', monospace",
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,102,0,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ◈ Training Hub
          </button>

          <button
            onClick={() => navigate('/it-login')}
            style={{
              padding: '14px 36px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: "'Courier New', monospace",
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
          >
            ⬡ IT Portal
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          opacity: loaded ? 0.4 : 0,
          transition: 'opacity 1s ease 1.2s',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          animation: 'floatDown 2s ease infinite',
        }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }}>SCROLL</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, rgba(187,0,0,0.6), transparent)' }} />
        </div>
      </section>

      {/* ── THREAT INTEL TICKER ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(187,0,0,0.2)',
        borderBottom: '1px solid rgba(187,0,0,0.2)',
        background: 'rgba(187,0,0,0.04)',
        overflow: 'hidden', padding: '10px 0',
      }}>
        <div style={{
          display: 'flex', gap: '60px',
          animation: 'ticker 28s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[
            '🔴 ACTIVE THREAT: Safaricom M-Pesa phishing surge detected',
            '⚠ KCB Bank impersonation emails circulating',
            '🛡 Equity Bank — 3 phishing domains neutralised',
            '🔴 Cooperative Bank SMS smishing campaign flagged',
            '⚠ Absa Kenya: credential harvesting form detected',
            '🛡 National Bank — suspicious link scan complete',
            '🔴 ACTIVE THREAT: Safaricom M-Pesa phishing surge detected',
            '⚠ KCB Bank impersonation emails circulating',
          ].map((item, i) => (
            <span key={i} style={{
              fontSize: '11px', letterSpacing: '0.08em',
              color: 'rgba(255,80,80,0.7)', flexShrink: 0,
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '80px 2rem',
        maxWidth: '1000px', margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { num: '2,847', label: 'Threats Reported', accent: '#BB0000' },
            { num: '94.2%', label: 'Detection Accuracy', accent: '#006600' },
            { num: '< 8s', label: 'AI Analysis Time', accent: '#BB0000' },
            { num: '100%', label: 'Anonymity Guaranteed', accent: '#006600' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              background: '#050d05',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#050d05'; }}
            >
              <div style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                color: stat.accent,
                fontFamily: "'Courier New', monospace",
                letterSpacing: '-0.02em',
                marginBottom: '8px',
                lineHeight: 1,
              }}>{stat.num}</div>
              <div style={{
                fontSize: '11px', letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
              }}>{stat.label}</div>
              <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '40%', height: '2px',
                background: stat.accent, opacity: 0.4,
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '40px 2rem 100px',
        maxWidth: '960px', margin: '0 auto',
      }}>
        {/* Section header */}
        <div style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ height: '1px', background: 'rgba(187,0,0,0.3)', flex: 1 }} />
          <span style={{
            fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
          }}>INTELLIGENCE PROTOCOL</span>
          <div style={{ height: '1px', background: 'rgba(0,102,0,0.3)', flex: 1 }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.04)',
        }}>
          {[
            {
              step: '01',
              title: 'Anonymous Submission',
              desc: 'Report a phishing attempt with zero identity disclosure. Your details are never stored.',
              color: '#BB0000',
              icon: '◎',
            },
            {
              step: '02',
              title: 'GPT-4o Analysis',
              desc: 'AI scans headers, links, and patterns. Safe Browsing API cross-references threat databases.',
              color: '#006600',
              icon: '◈',
            },
            {
              step: '03',
              title: 'Risk Intelligence',
              desc: 'Receive a scored threat report with indicators, risk level, and actionable guidance.',
              color: '#BB0000',
              icon: '⬡',
            },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '48px 36px',
              background: '#050d05',
              position: 'relative',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              transition: 'background 0.3s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#050d05'; }}
            >
              <div style={{
                fontSize: '11px', letterSpacing: '0.2em',
                color: item.color, opacity: 0.6,
                marginBottom: '16px', fontFamily: "'Courier New', monospace",
              }}>
                STEP_{item.step}
              </div>
              <div style={{
                fontSize: '32px', marginBottom: '16px',
                color: item.color, opacity: 0.7,
              }}>{item.icon}</div>
              <h3 style={{
                margin: '0 0 12px',
                fontSize: '16px', fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                fontFamily: "'Georgia', serif",
                letterSpacing: '0.01em',
              }}>{item.title}</h3>
              <p style={{
                margin: 0, fontSize: '13px',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.75, fontFamily: "'Courier New', monospace",
              }}>{item.desc}</p>
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '3px', height: '100%',
                background: item.color, opacity: 0.15,
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── ASSURANCE SECTION ── */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '0 2rem 100px',
        maxWidth: '960px', margin: '0 auto',
      }}>
        <div style={{
          border: '1px solid rgba(0,102,0,0.2)',
          padding: '48px',
          background: 'rgba(0,102,0,0.03)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Corner marks */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              ...(pos.includes('top') ? { top: -1 } : { bottom: -1 }),
              ...(pos.includes('left') ? { left: -1 } : { right: -1 }),
              width: '16px', height: '16px',
              borderTop: pos.includes('top') ? '2px solid rgba(0,180,80,0.6)' : 'none',
              borderBottom: pos.includes('bottom') ? '2px solid rgba(0,180,80,0.6)' : 'none',
              borderLeft: pos.includes('left') ? '2px solid rgba(0,180,80,0.6)' : 'none',
              borderRight: pos.includes('right') ? '2px solid rgba(0,180,80,0.6)' : 'none',
            }} />
          ))}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', alignItems: 'center', justifyContent: 'space-between' }}>
            {[
              { label: 'No registration required', icon: '✓' },
              { label: 'End-to-end encrypted', icon: '✓' },
              { label: 'GDPR compliant', icon: '✓' },
              { label: 'AI-powered in real time', icon: '✓' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#00cc66', fontSize: '14px', fontWeight: 700 }}>{item.icon}</span>
                <span style={{
                  fontSize: '12px', color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: "'Courier New', monospace",
                }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '40px 2rem 120px',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            fontSize: '10px', letterSpacing: '0.3em',
            color: 'rgba(187,0,0,0.5)', textTransform: 'uppercase',
          }}>
            — Suspect a threat? —
          </span>
        </div>
        <h2 style={{
          margin: '0 0 32px',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.85)',
        }}>
          Report it now.{' '}
          <span style={{ color: '#BB0000' }}>Anonymously.</span>
        </h2>
        <button
          onClick={() => navigate('/report/step1')}
          style={{
            padding: '18px 52px',
            background: 'transparent',
            border: '1px solid #BB0000',
            color: '#BB0000',
            fontSize: '14px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Courier New', monospace",
            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#BB0000';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#BB0000';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ▶ Begin Report
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 2rem',
        display: 'flex', flexWrap: 'wrap', gap: '16px',
        justifyContent: 'space-between', alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
            PhishRipoti © 2026
          </span>
          <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#BB0000', borderRadius: '50%' }} />
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#1A1A1A', borderRadius: '50%' }} />
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#006600', borderRadius: '50%' }} />
          </div>
        </div>
        <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase' }}>
          Protecting Kenya's financial ecosystem
        </span>
      </footer>

      {/* ── GLOBAL KEYFRAMES ── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050d05; }
        ::-webkit-scrollbar-thumb { background: #BB0000; border-radius: 2px; }
      `}</style>
    </div>
  );
}