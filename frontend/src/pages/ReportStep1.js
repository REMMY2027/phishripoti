import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const incidentTypes = [
  {
    id: 'phishing',
    icon: '📧',
    title: 'Phishing Email',
    description: 'Suspicious email requesting credentials, payment, or personal data via deceptive links or attachments.',
    threat: 'Most common attack vector in Kenyan financial institutions',
    active: true,
    color: '#BB0000'
  },
  {
    id: 'smishing',
    icon: '💬',
    title: 'Smishing (SMS Phishing)',
    description: 'Fraudulent text messages impersonating M-Pesa, Safaricom or banks to steal credentials.',
    threat: 'Rapidly growing threat targeting mobile banking users',
    active: false,
    color: '#555'
  },
  {
    id: 'vishing',
    icon: '📞',
    title: 'Vishing (Voice Call)',
    description: 'Fraudulent phone calls impersonating bank executives, IT support or regulatory bodies.',
    threat: 'Used to bypass digital security controls',
    active: false,
    color: '#555'
  },
  {
    id: 'social',
    icon: '🎭',
    title: 'Social Engineering',
    description: 'In-person or online psychological manipulation to gain unauthorised access to systems or data.',
    threat: 'Targets human trust rather than technical vulnerabilities',
    active: false,
    color: '#555'
  }
];

const ReportStep1 = () => {
  const navigate = useNavigate();
  const { updateReport } = useReport();
  const [hovered, setHovered] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.7 ? '#BB0000' : '#006600'
    }));

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let w = 0; w < 4; w++) {
        ctx.beginPath();
        ctx.strokeStyle = w < 2
          ? `rgba(0,102,0,${0.05 - w * 0.012})`
          : `rgba(187,0,0,${0.04 - (w - 2) * 0.012})`;
        ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = canvas.height * (0.55 + w * 0.08) +
            Math.sin(x * 0.006 + time + w * 0.8) * 40 +
            Math.sin(x * 0.003 + time * 0.7 + w) * 25;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

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

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - dist / 100)})`;
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

  const handleSelect = () => {
    updateReport({ incidentType: 'Phishing Email' });
    navigate('/report/step2');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Base background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#050d05' }}/>

      {/* Green glow top left */}
      <div style={{
        position: 'absolute', top: '-200px', left: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,80,0,0.3) 0%, transparent 70%)',
        zIndex: 0
      }}/>

      {/* Red glow bottom right */}
      <div style={{
        position: 'absolute', bottom: '-150px', right: '-150px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(140,0,0,0.25) 0%, transparent 70%)',
        zIndex: 0
      }}/>

      {/* Subtle center light */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(20,60,20,0.15) 0%, transparent 70%)',
        zIndex: 0
      }}/>

      {/* Animated canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%', zIndex: 1
      }}/>

      {/* SVG decorations */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 2, pointerEvents: 'none'
      }} xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,200 80,183 110,200 110,234 80,251 50,234"
          fill="none" stroke="rgba(0,102,0,0.15)" strokeWidth="1"/>
        <polygon points="20,251 50,234 80,251 80,285 50,302 20,285"
          fill="none" stroke="rgba(0,102,0,0.08)" strokeWidth="1"/>
        <circle cx="100%" cy="100%" r="180"
          fill="none" stroke="rgba(187,0,0,0.1)" strokeWidth="1.5"/>
        <circle cx="100%" cy="100%" r="130"
          fill="none" stroke="rgba(187,0,0,0.07)" strokeWidth="1"/>
        <path d="M 20 20 L 20 50 M 20 20 L 50 20"
          stroke="rgba(0,102,0,0.3)" strokeWidth="1.5" fill="none"/>
        <path d="M 20 calc(100% - 20px) L 20 calc(100% - 50px) M 20 calc(100% - 20px) L 50 calc(100% - 20px)"
          stroke="rgba(0,102,0,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <Navbar />
      </div>

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 3,
        background: 'rgba(0,0,0,0.25)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        padding: '0'
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, #1A1A1A, #006600)' }}></div>
        <div style={{ padding: '24px 40px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: i === 1 ? '28px' : '20px', height: '4px', borderRadius: '2px',
                background: i === 1 ? '#BB0000' : 'rgba(255,255,255,0.08)',
                transition: 'all 0.3s'
              }}></div>
            ))}
            <span style={{
              fontSize: '11px', color: 'rgba(255,255,255,0.3)',
              marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.07em'
            }}>
              Step 1 of 4
            </span>
          </div>
          <h2 style={{
            color: '#ffffff', fontWeight: '800', fontSize: '24px',
            margin: '0 0 6px', letterSpacing: '-0.5px'
          }}>
            What type of incident are you reporting?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
            Select the incident type that best describes what you received.
            Only Phishing Email is active in v1.0.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px', position: 'relative', zIndex: 3 }}>
        <div style={{
          maxWidth: '800px', display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: '16px'
        }}>
          {incidentTypes.map((type) => (
            <div
              key={type.id}
              onClick={type.active ? handleSelect : undefined}
              onMouseOver={() => type.active && setHovered(type.id)}
              onMouseOut={() => setHovered(null)}
              style={{
                borderRadius: '18px', padding: '26px',
                cursor: type.active ? 'pointer' : 'not-allowed',
                position: 'relative', overflow: 'hidden',
                opacity: type.active ? 1 : 0.35,
                background: hovered === type.id
                  ? 'rgba(255,255,255,0.09)'
                  : 'rgba(255,255,255,0.04)',
                border: hovered === type.id
                  ? '1px solid rgba(187,0,0,0.55)'
                  : '1px solid rgba(255,255,255,0.08)',
                transform: hovered === type.id ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
                boxShadow: hovered === type.id
                  ? '0 12px 40px rgba(187,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)'
              }}>

              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: type.active
                  ? `linear-gradient(90deg, #BB0000, transparent)`
                  : '#1a1a1a',
                opacity: hovered === type.id ? 1 : type.active ? 0.7 : 0.3,
                transition: 'opacity 0.25s'
              }}></div>

              {/* Icon and badge */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', marginBottom: '18px'
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: hovered === type.id
                    ? 'rgba(187,0,0,0.18)'
                    : 'rgba(255,255,255,0.06)',
                  border: hovered === type.id
                    ? '1px solid rgba(187,0,0,0.35)'
                    : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '26px',
                  transition: 'all 0.25s',
                  boxShadow: hovered === type.id
                    ? '0 4px 16px rgba(187,0,0,0.2)'
                    : 'none'
                }}>
                  {type.icon}
                </div>

                <span style={{
                  fontSize: '10px', fontWeight: '700',
                  padding: '4px 12px', borderRadius: '20px',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: type.active
                    ? 'rgba(0,102,0,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  color: type.active ? '#69db7c' : 'rgba(255,255,255,0.2)',
                  border: type.active
                    ? '1px solid rgba(0,102,0,0.35)'
                    : '1px solid rgba(255,255,255,0.07)'
                }}>
                  {type.active ? '✓ Active' : 'v2.0'}
                </span>
              </div>

              {/* Title */}
              <div style={{
                color: type.active ? '#ffffff' : 'rgba(255,255,255,0.4)',
                fontWeight: '700', fontSize: '17px', marginBottom: '8px',
                letterSpacing: '-0.2px'
              }}>
                {type.title}
              </div>

              {/* Description */}
              <div style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '13px', lineHeight: '1.65', marginBottom: '16px'
              }}>
                {type.description}
              </div>

              {/* Threat tag */}
              <div style={{
                padding: '8px 12px', borderRadius: '8px',
                background: type.active
                  ? 'rgba(187,0,0,0.1)'
                  : 'rgba(255,255,255,0.03)',
                border: type.active
                  ? '1px solid rgba(187,0,0,0.2)'
                  : '1px solid rgba(255,255,255,0.05)',
                fontSize: '11px',
                color: type.active
                  ? 'rgba(255,160,160,0.8)'
                  : 'rgba(255,255,255,0.2)',
                lineHeight: '1.5'
              }}>
                ⚠ {type.threat}
              </div>

              {/* Arrow */}
              {type.active && (
                <div style={{
                  position: 'absolute', bottom: '22px', right: '22px',
                  color: hovered === type.id
                    ? 'rgba(255,255,255,0.7)'
                    : 'rgba(255,255,255,0.15)',
                  fontSize: '20px', transition: 'all 0.25s',
                  transform: hovered === type.id ? 'translateX(3px)' : 'translateX(0)'
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 3 }}>
        <NextStrip
          steps={['Incident Type', 'Department', 'Email Details', 'Submit']}
          currentStep={0}
          onNext={handleSelect}
          nextLabel="Next: Select Department →"
        />
      </div>
    </div>
  );
};

export default ReportStep1;