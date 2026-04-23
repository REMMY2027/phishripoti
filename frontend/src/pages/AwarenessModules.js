import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const modules = [
  {
    id: 'spotting',
    title: 'Spotting Phishing Emails',
    icon: '📧',
    desc: 'Learn to identify suspicious sender domains, urgency tactics, and credential harvesting attempts in emails.',
    tag: 'Most Common Threat',
    tagColor: '#BB0000',
    active: true
  },
  {
    id: 'mpesa',
    title: 'M-Pesa Fraud Awareness',
    icon: '📱',
    desc: 'Understand common M-Pesa phishing scams targeting Kenyan bank employees and customers.',
    tag: 'Kenya Specific',
    tagColor: '#006600',
    active: true
  },
  {
    id: 'vishing',
    title: 'Vishing (Voice Phishing)',
    icon: '📞',
    desc: 'Recognise fraudulent phone calls impersonating bank executives, IT support or regulators.',
    tag: 'Coming in v2.0',
    tagColor: '#555',
    active: false
  },
  {
    id: 'smishing',
    title: 'Smishing (SMS Phishing)',
    icon: '💬',
    desc: 'Identify fraudulent SMS messages targeting mobile banking credentials and M-Pesa accounts.',
    tag: 'Coming in v2.0',
    tagColor: '#555',
    active: false
  },
  {
    id: 'social',
    title: 'Social Engineering Defence',
    icon: '🎭',
    desc: 'Recognise manipulation tactics used by attackers to gain unauthorised access through human interaction.',
    tag: 'Coming in v2.0',
    tagColor: '#555',
    active: false
  },
  {
    id: 'browsing',
    title: 'Safe Browsing Practices',
    icon: '🌐',
    desc: 'Best practices for safe internet use in a financial institution including link verification techniques.',
    tag: 'Coming in v2.0',
    tagColor: '#555',
    active: false
  }
];

const AwarenessModules = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const department = location.state?.department || 'General';
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      flexDirection: 'column', background: '#0a0d0a'
    }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '24px 40px 20px'
      }}>
        <button onClick={() => navigate('/awareness')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.35)', fontSize: '13px',
          display: 'flex', alignItems: 'center', gap: '6px',
          marginBottom: '16px', padding: 0
        }}
          onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
          ← Back to Departments
        </button>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          {[
            { n: 1, label: 'Department', active: false, done: true },
            { n: 2, label: 'Module', active: true, done: false },
            { n: 3, label: 'Learn & Assess', active: false, done: false }
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: step.done
                    ? 'rgba(0,102,0,0.4)'
                    : step.active
                    ? '#006600'
                    : 'rgba(255,255,255,0.06)',
                  border: step.active || step.done
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: '700',
                  color: step.done
                    ? '#69db7c'
                    : step.active
                    ? '#ffffff'
                    : 'rgba(255,255,255,0.25)'
                }}>
                  {step.done ? '✓' : step.n}
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: step.active ? '600' : '400',
                  color: step.active
                    ? '#ffffff'
                    : step.done
                    ? 'rgba(255,255,255,0.5)'
                    : 'rgba(255,255,255,0.25)'
                }}>{step.label}</span>
              </div>
              {i < 2 && (
                <div style={{
                  width: '40px', height: '1px',
                  background: 'rgba(255,255,255,0.1)',
                  margin: '0 10px'
                }}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Department badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(0,102,0,0.12)',
          border: '1px solid rgba(0,102,0,0.25)',
          borderRadius: '20px', padding: '3px 10px', marginBottom: '10px'
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69db7c' }}></div>
          <span style={{
            fontSize: '10px', fontWeight: '600', color: '#69db7c',
            textTransform: 'uppercase', letterSpacing: '0.08em'
          }}>
            {department}
          </span>
        </div>

        <h1 style={{
          color: '#ffffff', fontWeight: '800',
          fontSize: '22px', margin: '0 0 4px', letterSpacing: '-0.5px'
        }}>
          Choose a learning module
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
          Each module includes a pre-assessment, personalised learning content, and a post-assessment to measure improvement.
        </p>
      </div>

      {/* Modules grid */}
      <div style={{ flex: 1, padding: '24px 40px', overflowY: 'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '900px'
        }}>
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={mod.active ? () => navigate('/awareness/quiz', {
                state: { department, module: mod.title, isPost: false }
              }) : undefined}
              onMouseOver={() => mod.active && setHovered(mod.id)}
              onMouseOut={() => setHovered(null)}
              style={{
                borderRadius: '14px', padding: '18px',
                cursor: mod.active ? 'pointer' : 'not-allowed',
                position: 'relative', overflow: 'hidden',
                opacity: mod.active ? 1 : 0.38,
                background: hovered === mod.id
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered === mod.id
                  ? 'rgba(255,255,255,0.15)'
                  : 'rgba(255,255,255,0.07)'}`,
                transform: hovered === mod.id ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
                boxShadow: hovered === mod.id ? '0 6px 24px rgba(0,0,0,0.3)' : 'none'
              }}>

              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px',
                background: mod.active ? mod.tagColor : '#2a2a2a',
                opacity: hovered === mod.id ? 1 : 0.5,
                transition: 'opacity 0.2s'
              }}></div>

              {/* Icon and tag */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: hovered === mod.id
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px',
                  transition: 'background 0.2s'
                }}>
                  {mod.icon}
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: '600',
                  padding: '2px 7px', borderRadius: '20px',
                  background: mod.active
                    ? `${mod.tagColor}22`
                    : 'rgba(255,255,255,0.04)',
                  color: mod.active ? mod.tagColor : 'rgba(255,255,255,0.25)',
                  border: `1px solid ${mod.active ? `${mod.tagColor}44` : 'rgba(255,255,255,0.06)'}`,
                  letterSpacing: '0.03em', whiteSpace: 'nowrap'
                }}>
                  {mod.tag}
                </span>
              </div>

              {/* Title */}
              <div style={{
                color: mod.active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                fontWeight: '600', fontSize: '13px', marginBottom: '6px'
              }}>
                {mod.title}
              </div>

              {/* Description */}
              <div style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '11px', lineHeight: '1.6',
                marginBottom: mod.active ? '32px' : '0'
              }}>
                {mod.desc}
              </div>

              {/* Start label */}
              {mod.active && (
                <div style={{
                  position: 'absolute', bottom: '12px', left: '18px', right: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
                    Pre → Learn → Post
                  </span>
                  <div style={{
                    color: hovered === mod.id
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(255,255,255,0.2)',
                    fontSize: '13px', transition: 'color 0.2s'
                  }}>→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwarenessModules;