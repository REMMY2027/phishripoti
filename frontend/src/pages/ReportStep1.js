import React, { useState } from 'react';
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
    active: true
  },
  {
    id: 'smishing',
    icon: '💬',
    title: 'Smishing (SMS Phishing)',
    description: 'Fraudulent text messages impersonating M-Pesa, Safaricom or banks to steal credentials.',
    threat: 'Rapidly growing threat targeting mobile banking users',
    active: false
  },
  {
    id: 'vishing',
    icon: '📞',
    title: 'Vishing (Voice Call)',
    description: 'Fraudulent phone calls impersonating bank executives, IT support or regulatory bodies.',
    threat: 'Used to bypass digital security controls',
    active: false
  },
  {
    id: 'social',
    icon: '🎭',
    title: 'Social Engineering',
    description: 'In-person or online psychological manipulation to gain unauthorised access to systems or data.',
    threat: 'Targets human trust rather than technical vulnerabilities',
    active: false
  }
];

const ReportStep1 = () => {
  const navigate = useNavigate();
  const { updateReport } = useReport();
  const [hovered, setHovered] = useState(null);

  const handleSelect = () => {
    updateReport({ incidentType: 'Phishing Email' });
    navigate('/report/step2');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Same gradient as landing page */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #e8f5e8 0%, #f5f5f5 50%, #fde8e8 100%)'
      }}/>

      {/* Green blob top left */}
      <div style={{
        position: 'absolute', top: '-120px', left: '-120px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(0,102,0,0.07)', filter: 'blur(60px)', zIndex: 0
      }}/>

      {/* Red blob bottom right */}
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(187,0,0,0.05)', filter: 'blur(60px)', zIndex: 0
      }}/>

      {/* SVG abstract shapes — same style as landing */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 1, pointerEvents: 'none'
      }} xmlns="http://www.w3.org/2000/svg">

        {/* Circles top left */}
        <circle cx="-50" cy="150" r="300"
          fill="none" stroke="rgba(0,102,0,0.1)" strokeWidth="1.5"/>
        <circle cx="-50" cy="150" r="230"
          fill="none" stroke="rgba(0,102,0,0.07)" strokeWidth="1"/>
        <circle cx="-50" cy="150" r="160"
          fill="none" stroke="rgba(0,102,0,0.04)" strokeWidth="1"/>

        {/* Circles bottom right */}
        <circle cx="110%" cy="80%" r="280"
          fill="none" stroke="rgba(187,0,0,0.1)" strokeWidth="1.5"/>
        <circle cx="110%" cy="80%" r="210"
          fill="none" stroke="rgba(187,0,0,0.07)" strokeWidth="1"/>
        <circle cx="110%" cy="80%" r="140"
          fill="none" stroke="rgba(187,0,0,0.04)" strokeWidth="1"/>

        {/* Floating rectangles */}
        <rect x="8%" y="12%" width="55" height="55" rx="14"
          fill="none" stroke="rgba(0,102,0,0.12)" strokeWidth="1.5"
          transform="rotate(20 100 150)"/>
        <rect x="82%" y="8%" width="65" height="65" rx="16"
          fill="none" stroke="rgba(187,0,0,0.12)" strokeWidth="1.5"
          transform="rotate(-15 1150 120)"/>
        <rect x="75%" y="65%" width="40" height="40" rx="10"
          fill="none" stroke="rgba(0,102,0,0.1)" strokeWidth="1"
          transform="rotate(30 1050 550)"/>
        <rect x="5%" y="70%" width="50" height="50" rx="12"
          fill="none" stroke="rgba(187,0,0,0.1)" strokeWidth="1"
          transform="rotate(-25 80 600)"/>

        {/* Triangles */}
        <polygon points="150,60 190,140 110,140"
          fill="none" stroke="rgba(0,102,0,0.1)" strokeWidth="1.5"/>
        <polygon points="1100,480 1150,570 1050,570"
          fill="none" stroke="rgba(187,0,0,0.1)" strokeWidth="1.5"/>

        {/* Hexagons */}
        <polygon points="200,480 225,466 250,480 250,508 225,522 200,508"
          fill="none" stroke="rgba(0,102,0,0.12)" strokeWidth="1.5"/>
        <polygon points="1050,180 1075,166 1100,180 1100,208 1075,222 1050,208"
          fill="none" stroke="rgba(187,0,0,0.12)" strokeWidth="1.5"/>

        {/* Wave lines */}
        <path d="M 0 500 Q 350 400 700 480 T 1400 460"
          fill="none" stroke="rgba(0,102,0,0.07)" strokeWidth="1.5"/>
        <path d="M 0 600 Q 400 500 750 560 T 1400 540"
          fill="none" stroke="rgba(187,0,0,0.05)" strokeWidth="1"/>

        {/* Dots */}
        <circle cx="10%" cy="25%" r="4" fill="rgba(0,102,0,0.18)"/>
        <circle cx="14%" cy="40%" r="3" fill="rgba(0,102,0,0.12)"/>
        <circle cx="88%" cy="20%" r="5" fill="rgba(187,0,0,0.18)"/>
        <circle cx="92%" cy="38%" r="3" fill="rgba(187,0,0,0.12)"/>
        <circle cx="6%" cy="75%" r="4" fill="rgba(187,0,0,0.12)"/>
        <circle cx="94%" cy="72%" r="4" fill="rgba(0,102,0,0.12)"/>
        <circle cx="45%" cy="6%" r="3" fill="rgba(0,0,0,0.06)"/>
        <circle cx="55%" cy="94%" r="3" fill="rgba(0,0,0,0.06)"/>

        {/* Connecting lines */}
        <line x1="10%" y1="25%" x2="14%" y2="40%"
          stroke="rgba(0,102,0,0.1)" strokeWidth="0.8"/>
        <line x1="88%" y1="20%" x2="92%" y2="38%"
          stroke="rgba(187,0,0,0.1)" strokeWidth="0.8"/>
      </svg>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar light={true} />
      </div>

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(255,255,255,0.5)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        backdropFilter: 'blur(12px)',
        padding: '0'
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, #1A1A1A, #006600)' }}></div>
        <div style={{ padding: '24px 40px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: i === 1 ? '28px' : '20px', height: '4px', borderRadius: '2px',
                background: i === 1 ? '#BB0000' : 'rgba(0,0,0,0.1)',
                transition: 'all 0.3s'
              }}></div>
            ))}
            <span style={{
              fontSize: '11px', color: 'rgba(0,0,0,0.35)',
              marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.07em'
            }}>
              Step 1 of 4
            </span>
          </div>
          <h2 style={{
            color: '#1a1a1a', fontWeight: '800', fontSize: '24px',
            margin: '0 0 6px', letterSpacing: '-0.5px'
          }}>
            What type of incident are you reporting?
          </h2>
          <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
            Select the incident type that best describes what you received.
            Only Phishing Email is active in v1.0.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px', position: 'relative', zIndex: 2 }}>
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
                opacity: type.active ? 1 : 0.45,
                background: hovered === type.id
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(255,255,255,0.75)',
                border: hovered === type.id
                  ? '1px solid rgba(187,0,0,0.4)'
                  : '1px solid rgba(0,0,0,0.08)',
                transform: hovered === type.id ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
                boxShadow: hovered === type.id
                  ? '0 12px 40px rgba(187,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)'
                  : '0 2px 12px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(12px)'
              }}>

              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: type.active
                  ? hovered === type.id
                    ? 'linear-gradient(90deg, #BB0000, #006600)'
                    : '#BB0000'
                  : '#cccccc',
                opacity: hovered === type.id ? 1 : type.active ? 0.7 : 0.3,
                transition: 'all 0.25s'
              }}></div>

              {/* Icon and badge */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', marginBottom: '18px'
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: hovered === type.id
                    ? 'rgba(187,0,0,0.08)'
                    : 'rgba(0,0,0,0.04)',
                  border: hovered === type.id
                    ? '1px solid rgba(187,0,0,0.2)'
                    : '1px solid rgba(0,0,0,0.06)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '26px',
                  transition: 'all 0.25s'
                }}>
                  {type.icon}
                </div>

                <span style={{
                  fontSize: '10px', fontWeight: '700',
                  padding: '4px 12px', borderRadius: '20px',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: type.active
                    ? 'rgba(0,102,0,0.1)'
                    : 'rgba(0,0,0,0.05)',
                  color: type.active ? '#006600' : 'rgba(0,0,0,0.3)',
                  border: type.active
                    ? '1px solid rgba(0,102,0,0.2)'
                    : '1px solid rgba(0,0,0,0.08)'
                }}>
                  {type.active ? '✓ Active' : 'v2.0'}
                </span>
              </div>

              {/* Title */}
              <div style={{
                color: type.active ? '#1a1a1a' : '#888888',
                fontWeight: '700', fontSize: '17px',
                marginBottom: '8px', letterSpacing: '-0.2px'
              }}>
                {type.title}
              </div>

              {/* Description */}
              <div style={{
                color: 'rgba(0,0,0,0.5)',
                fontSize: '13px', lineHeight: '1.65', marginBottom: '16px'
              }}>
                {type.description}
              </div>

              {/* Threat tag */}
              <div style={{
                padding: '8px 12px', borderRadius: '8px',
                background: type.active
                  ? 'rgba(187,0,0,0.06)'
                  : 'rgba(0,0,0,0.03)',
                border: type.active
                  ? '1px solid rgba(187,0,0,0.12)'
                  : '1px solid rgba(0,0,0,0.06)',
                fontSize: '11px',
                color: type.active ? 'rgba(187,0,0,0.8)' : 'rgba(0,0,0,0.25)',
                lineHeight: '1.5'
              }}>
                ⚠ {type.threat}
              </div>

              {/* Arrow */}
              {type.active && (
                <div style={{
                  position: 'absolute', bottom: '22px', right: '22px',
                  color: hovered === type.id
                    ? 'rgba(187,0,0,0.7)'
                    : 'rgba(0,0,0,0.2)',
                  fontSize: '20px', transition: 'all 0.25s',
                  transform: hovered === type.id ? 'translateX(3px)' : 'translateX(0)'
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
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