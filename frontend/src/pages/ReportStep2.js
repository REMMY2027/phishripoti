import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'High target for M-Pesa impersonation and account takeover phishing.',
    accentRaw: 'green',
    risk: 'HIGH',
    riskLevel: 3,
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Targeted by invoice fraud, payment diversion and CFO impersonation.',
    accentRaw: 'red',
    risk: 'CRITICAL',
    riskLevel: 4,
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    desc: 'Targeted by regulatory impersonation emails pretending to be CBK or KRA.',
    accentRaw: 'green',
    risk: 'MEDIUM',
    riskLevel: 2,
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    desc: 'At risk from fake loan documents and credential harvesting attacks.',
    accentRaw: 'red',
    risk: 'HIGH',
    riskLevel: 3,
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    desc: 'Targeted by system access phishing and fake IT support credential emails.',
    accentRaw: 'green',
    risk: 'MEDIUM',
    riskLevel: 2,
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Targeted by payroll diversion and fake employee document phishing.',
    accentRaw: 'red',
    risk: 'HIGH',
    riskLevel: 3,
  },
];

const riskConfig = {
  CRITICAL: { color: '#ef4444', glow: 'rgba(239,68,68,0.35)', bg: 'rgba(239,68,68,0.08)', label: 'CRITICAL' },
  HIGH:     { color: '#f59e0b', glow: 'rgba(245,158,11,0.30)', bg: 'rgba(245,158,11,0.07)', label: 'HIGH' },
  MEDIUM:   { color: '#22c55e', glow: 'rgba(34,197,94,0.28)',  bg: 'rgba(34,197,94,0.06)',  label: 'MEDIUM' },
  LOW:      { color: '#3b82f6', glow: 'rgba(59,130,246,0.25)', bg: 'rgba(59,130,246,0.05)', label: 'LOW' },
};

// ── Network canvas background ──
const NetworkBackground = () => {
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

    // Nodes — financial transaction hubs
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1.5 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
      type: Math.random() > 0.6 ? 'green' : Math.random() > 0.5 ? 'red' : 'dim',
    }));

    // Packets travelling along connections
    const packets = Array.from({ length: 8 }, () => ({
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      fromIdx: Math.floor(Math.random() * nodes.length),
      toIdx: Math.floor(Math.random() * nodes.length),
      color: Math.random() > 0.5 ? '#22c55e' : '#BB0000',
    }));

    // African geometric — subtle diamond grid
    const drawGeometric = (W, H) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(0,180,50,0.028)';
      ctx.lineWidth = 0.6;
      const step = 60;
      for (let x = 0; x < W + step; x += step) {
        for (let y = 0; y < H + step; y += step) {
          ctx.beginPath();
          ctx.moveTo(x, y - step / 2);
          ctx.lineTo(x + step / 2, y);
          ctx.lineTo(x, y + step / 2);
          ctx.lineTo(x - step / 2, y);
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const draw = () => {
      tick++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 1. Base
      ctx.fillStyle = '#040f05';
      ctx.fillRect(0, 0, W, H);

      // 2. Radial ambient glows
      const g1 = ctx.createRadialGradient(-100, -100, 0, -100, -100, W * 0.55);
      g1.addColorStop(0, 'rgba(0,120,30,0.16)');
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W + 100, H + 100, 0, W + 100, H + 100, W * 0.50);
      g2.addColorStop(0, 'rgba(140,0,0,0.16)');
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

      // 3. African geometric pattern
      drawGeometric(W, H);

      // 4. Network connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.12;
            const col = nodes[i].type === 'green' || nodes[j].type === 'green'
              ? `rgba(0,200,60,${alpha})`
              : `rgba(180,0,0,${alpha * 0.7})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = col;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 5. Packets along connections
      packets.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.fromIdx = p.toIdx;
          p.toIdx = Math.floor(Math.random() * nodes.length);
        }
        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 6. Nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        n.pulse += n.pulseSpeed;

        const glowR = n.r * (1.8 + 0.6 * Math.sin(n.pulse));
        const col = n.type === 'green' ? '#22c55e' : n.type === 'red' ? '#BB0000' : '#334433';
        const alpha = n.type === 'dim' ? 0.15 : 0.55 + 0.3 * Math.sin(n.pulse);

        // Outer glow
        const gn = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR * 3);
        gn.addColorStop(0, n.type === 'green' ? `rgba(34,197,94,${alpha * 0.15})` : n.type === 'red' ? `rgba(187,0,0,${alpha * 0.15})` : 'rgba(0,0,0,0)');
        gn.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gn;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 7. Subtle scanline sweep
      const scanY = ((tick * 0.5) % (H + 100)) - 50;
      const scanGrad = ctx.createLinearGradient(0, scanY, 0, scanY + 2);
      scanGrad.addColorStop(0, 'rgba(0,255,60,0)');
      scanGrad.addColorStop(0.5, 'rgba(0,255,60,0.018)');
      scanGrad.addColorStop(1, 'rgba(0,255,60,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY, W, 2);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0,
      width: '100%', height: '100%',
      zIndex: 0, pointerEvents: 'none',
      display: 'block',
    }} />
  );
};

// ── Risk indicator bar ──
const RiskBar = ({ level, color }) => (
  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
    {[1,2,3,4].map(i => (
      <div key={i} style={{
        width: '16px', height: '3px', borderRadius: '2px',
        background: i <= level ? color : 'rgba(255,255,255,0.12)',
        transition: 'background 0.2s',
        boxShadow: i <= level ? `0 0 4px ${color}` : 'none',
      }} />
    ))}
  </div>
);

const ReportStep2 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();
  const [selected, setSelected] = useState(reportData.department || '');
  const [hovered, setHovered] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');
  const [pulse, setPulse] = useState(0);

  // Pulse animation for selected card
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (dept) => {
    if (dept.id === 'other') {
      setShowOtherInput(true);
      setSelected('');
      return;
    }
    setShowOtherInput(false);
    setSelected(dept.label);
    updateReport({ department: dept.label });
  };

  const handleOtherConfirm = () => {
    if (otherDept.trim()) {
      setSelected(otherDept.trim());
      updateReport({ department: otherDept.trim() });
      setShowOtherInput(false);
    }
  };

  const handleNext = () => {
    if (selected) navigate('/report/step3');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Animated network background */}
      <NetworkBackground />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '66px',
        background: 'rgba(2,8,3,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,200,60,0.10)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.60)',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,60,0.14), transparent)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'linear-gradient(145deg, #cc0000 0%, #7a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,80,80,0.18), 0 4px 16px rgba(187,0,0,0.55)',
            flexShrink: 0,
          }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: 1 }}>
            <span style={{ color: '#ffffff' }}>Phish</span>
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Ripoti</span>
          </span>
        </div>
        <button onClick={() => navigate('/it-login')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          color: 'rgba(255,255,255,0.82)',
          fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', letterSpacing: '0.015em',
          transition: 'all 0.16s ease',
        }}
          onMouseOver={e => { e.currentTarget.style.background='rgba(255,255,255,0.13)'; e.currentTarget.style.color='#ffffff'; e.currentTarget.style.transform='translateY(-1px)'; }}
          onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.82)'; e.currentTarget.style.transform='translateY(0)'; }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          IT Manager Portal
        </button>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        padding: '26px 44px 20px',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '18px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: '3px', borderRadius: '2px',
              width: i <= 2 ? '28px' : '18px',
              background: i < 2 ? '#006600' : i === 2 ? '#BB0000' : 'rgba(255,255,255,0.12)',
            }} />
          ))}
          <span style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase',
            marginLeft: '6px',
          }}>Step 2 of 4</span>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute', top: '-14px', left: '-4px',
            fontSize: '82px', fontWeight: '900',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,220,60,0.07)',
            letterSpacing: '-4px', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          }}>
            DEPARTMENT
          </div>
          <h2 style={{
            position: 'relative', zIndex: 1,
            fontWeight: '800', fontSize: '22px',
            margin: '0 0 6px', letterSpacing: '-0.4px',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>Which </span>
            <span style={{
              color: 'transparent',
              background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 50%, #BB0000 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>department</span>
            <span style={{ color: 'rgba(255,255,255,0.92)' }}> are you from?</span>
          </h2>
          <p style={{
            position: 'relative', zIndex: 1,
            color: 'rgba(255,255,255,0.38)', fontSize: '13px',
            margin: 0, lineHeight: '1.6',
          }}>
            Your department helps us contextualise the threat. It is stripped before storage — never linked to your identity.
          </p>
        </div>

        {/* ── CARDS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          width: '100%',
          marginBottom: '14px',
        }}>
          {departments.map((dept) => {
            const sel = selected === dept.label;
            const hov = hovered === dept.id;
            const rc = riskConfig[dept.risk];
            const pulseAlpha = sel ? 0.25 + 0.15 * Math.sin(pulse * 0.12) : 0;

            return (
              <div
                key={dept.id}
                onClick={() => handleSelect(dept)}
                onMouseEnter={() => setHovered(dept.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '14px',
                  padding: '20px 20px 18px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: sel
                    ? `rgba(${dept.accentRaw === 'green' ? '0,40,12' : '40,0,0'},0.75)`
                    : hov
                    ? 'rgba(255,255,255,0.10)'
                    : 'rgba(255,255,255,0.06)',
                  border: sel
                    ? `1px solid ${rc.color}66`
                    : hov
                    ? `1px solid ${rc.color}44`
                    : '1px solid rgba(255,255,255,0.10)',
                  transform: hov && !sel ? 'translateY(-3px) scale(1.005)' : 'translateY(0) scale(1)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: sel
                    ? `0 0 0 1px ${rc.color}22, 0 12px 40px rgba(0,0,0,0.55), 0 0 32px ${rc.glow}`
                    : hov
                    ? `0 8px 32px rgba(0,0,0,0.45), 0 0 20px ${rc.glow}`
                    : '0 2px 12px rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                }}>

                {/* Animated pulse border on selected */}
                {sel && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '14px',
                    border: `1px solid ${rc.color}`,
                    opacity: pulseAlpha,
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Glass sheen */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 100%)',
                  pointerEvents: 'none', borderRadius: '14px',
                }} />

                {/* Left accent strip with glow */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '4px', height: '100%',
                  background: `linear-gradient(180deg, ${rc.color}, ${dept.accentRaw === 'green' ? '#15803d' : '#7f1d1d'})`,
                  opacity: sel ? 1 : hov ? 0.80 : 0.50,
                  transition: 'opacity 0.22s',
                  boxShadow: sel || hov ? `2px 0 12px ${rc.glow}` : 'none',
                }} />

                {/* Top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: `linear-gradient(90deg, transparent, ${rc.color}55, transparent)`,
                  opacity: sel ? 1 : hov ? 0.7 : 0.3,
                }} />

                {/* Header row — icon + risk badge */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '14px', paddingLeft: '8px',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: rc.bg,
                    border: `1px solid ${rc.color}33`,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '20px',
                    boxShadow: sel || hov ? `0 0 16px ${rc.glow}` : 'none',
                    transition: 'box-shadow 0.22s',
                  }}>
                    {dept.icon}
                  </div>

                  {/* Risk badge + checkmark */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    {sel && (
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: rc.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', color: '#fff', fontWeight: '800',
                        boxShadow: `0 2px 12px ${rc.glow}`,
                      }}>✓</div>
                    )}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '3px 8px', borderRadius: '20px',
                      background: rc.bg,
                      border: `1px solid ${rc.color}33`,
                    }}>
                      <div style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: rc.color,
                        boxShadow: `0 0 6px ${rc.color}`,
                      }} />
                      <span style={{
                        fontSize: '9px', fontWeight: '700',
                        color: rc.color, letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                      }}>{dept.risk}</span>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div style={{
                  paddingLeft: '8px',
                  color: '#ffffff',
                  fontWeight: '700', fontSize: '14px',
                  marginBottom: '6px', letterSpacing: '-0.2px',
                }}>
                  {dept.label}
                </div>

                {/* Description */}
                <div style={{
                  paddingLeft: '8px',
                  color: 'rgba(255,255,255,0.48)',
                  fontSize: '12px', lineHeight: '1.65',
                  marginBottom: '14px',
                }}>
                  {dept.desc}
                </div>

                {/* Risk bar */}
                <div style={{
                  paddingLeft: '8px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <RiskBar level={dept.riskLevel} color={rc.color} />
                  <span style={{
                    fontSize: '10px', color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.06em',
                  }}>THREAT EXPOSURE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── OTHER DEPARTMENT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          width: '100%',
        }}>
          <div
            onClick={() => handleSelect({ id: 'other', label: '' })}
            onMouseEnter={() => setHovered('other')}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: '14px', padding: '16px 20px',
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
              background: showOtherInput
                ? 'rgba(255,255,255,0.10)'
                : hovered === 'other'
                ? 'rgba(255,255,255,0.10)'
                : 'rgba(255,255,255,0.06)',
              border: showOtherInput
                ? '1px solid rgba(255,255,255,0.22)'
                : hovered === 'other'
                ? '1px solid rgba(255,255,255,0.18)'
                : '1px dashed rgba(255,255,255,0.18)',
              transition: 'all 0.22s ease',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: hovered === 'other' ? '0 6px 24px rgba(0,0,0,0.40)' : '0 2px 12px rgba(0,0,0,0.30)',
            }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
              pointerEvents: 'none', borderRadius: '14px',
            }} />
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '4px', height: '100%',
              background: 'rgba(255,255,255,0.28)',
              opacity: hovered === 'other' ? 0.75 : 0.38,
              transition: 'opacity 0.22s',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.16)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px', flexShrink: 0,
              }}>✏️</div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.90)', fontWeight: '700', fontSize: '14px', marginBottom: '2px' }}>
                  Other Department
                </div>
                <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: '12px' }}>
                  Not listed — enter manually
                </div>
              </div>
              <div style={{
                marginLeft: 'auto',
                color: hovered === 'other' ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.28)',
                fontSize: '18px', transition: 'all 0.22s',
                transform: hovered === 'other' ? 'translateX(3px)' : 'translateX(0)',
              }}>→</div>
            </div>
          </div>
        </div>

        {/* Other input */}
        {showOtherInput && (
          <div style={{
            borderRadius: '14px', padding: '18px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            marginTop: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.50)',
          }}>
            <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '13px', marginBottom: '3px' }}>
              Enter your department
            </div>
            <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: '12px', marginBottom: '10px' }}>
              Type your department name — it will be stripped before storage.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '8px', color: '#ffffff',
                padding: '10px 14px', fontSize: '13px',
                outline: 'none', marginBottom: '12px', boxSizing: 'border-box',
              }}
              onKeyDown={e => e.key === 'Enter' && handleOtherConfirm()}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleOtherConfirm} disabled={!otherDept.trim()} style={{
                background: otherDept.trim() ? '#BB0000' : 'rgba(255,255,255,0.08)',
                color: otherDept.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
                border: 'none', borderRadius: '8px',
                padding: '9px 18px', fontSize: '13px', fontWeight: '600',
                cursor: otherDept.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.16s',
              }}>Confirm →</button>
              <button onClick={() => { setShowOtherInput(false); setOtherDept(''); }} style={{
                background: 'transparent', color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px', padding: '9px 18px',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Selected confirmation */}
        {selected && (
          <div style={{
            marginTop: '14px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '8px',
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.28)',
            alignSelf: 'flex-start',
          }}>
            <span style={{ color: '#4ade80', fontSize: '13px' }}>✓</span>
            <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '600' }}>{selected}</span>
            <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px', fontWeight: '500' }}>
              — stripped before storage
            </span>
          </div>
        )}
      </div>

      {/* ── NEXT STRIP ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <NextStrip
          steps={['Phishing Email', selected || 'Department', 'Email Details', 'Submit']}
          currentStep={1}
          onNext={handleNext}
          nextLabel="Next: Email Details →"
          nextDisabled={!selected}
        />
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.02); }
          100% { opacity: 0.4; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ReportStep2;