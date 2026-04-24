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

  const handleSelect = () => {
    updateReport({ incidentType: 'Phishing Email' });
    navigate('/report/step2');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050d05' }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #050d05 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0'
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
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Step 1 of 4
            </span>
          </div>
          <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '24px', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
            What type of incident are you reporting?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
            Select the incident type that best describes what you received. Only Phishing Email is active in v1.0.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 40px' }}>
        <div style={{ maxWidth: '800px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {incidentTypes.map((type) => (
            <div
              key={type.id}
              onClick={type.active ? handleSelect : undefined}
              onMouseOver={() => type.active && setHovered(type.id)}
              onMouseOut={() => setHovered(null)}
              style={{
                borderRadius: '18px', padding: '24px',
                cursor: type.active ? 'pointer' : 'not-allowed',
                position: 'relative', overflow: 'hidden',
                opacity: type.active ? 1 : 0.4,
                background: hovered === type.id
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(255,255,255,0.03)',
                border: hovered === type.id
                  ? `1px solid rgba(187,0,0,0.5)`
                  : `1px solid rgba(255,255,255,0.07)`,
                transform: hovered === type.id ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
                boxShadow: hovered === type.id
                  ? '0 8px 32px rgba(187,0,0,0.15)'
                  : 'none'
              }}>

              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: type.active ? '#BB0000' : '#2a2a2a',
                opacity: hovered === type.id ? 1 : type.active ? 0.6 : 0.3,
                transition: 'opacity 0.25s'
              }}></div>

              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: hovered === type.id
                    ? 'rgba(187,0,0,0.15)'
                    : 'rgba(255,255,255,0.06)',
                  border: hovered === type.id
                    ? '1px solid rgba(187,0,0,0.3)'
                    : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '24px',
                  transition: 'all 0.25s'
                }}>
                  {type.icon}
                </div>

                <span style={{
                  fontSize: '10px', fontWeight: '700',
                  padding: '4px 10px', borderRadius: '20px',
                  letterSpacing: '0.05em',
                  background: type.active
                    ? 'rgba(0,102,0,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  color: type.active ? '#69db7c' : 'rgba(255,255,255,0.25)',
                  border: type.active
                    ? '1px solid rgba(0,102,0,0.3)'
                    : '1px solid rgba(255,255,255,0.08)'
                }}>
                  {type.active ? '✓ ACTIVE' : 'v2.0'}
                </span>
              </div>

              {/* Title */}
              <div style={{
                color: type.active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                fontWeight: '700', fontSize: '16px', marginBottom: '8px'
              }}>
                {type.title}
              </div>

              {/* Description */}
              <div style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '12px', lineHeight: '1.65', marginBottom: '14px'
              }}>
                {type.description}
              </div>

              {/* Threat tag */}
              <div style={{
                padding: '7px 12px', borderRadius: '8px',
                background: type.active
                  ? 'rgba(187,0,0,0.08)'
                  : 'rgba(255,255,255,0.03)',
                border: type.active
                  ? '1px solid rgba(187,0,0,0.15)'
                  : '1px solid rgba(255,255,255,0.05)',
                fontSize: '11px', color: type.active
                  ? 'rgba(255,150,150,0.7)'
                  : 'rgba(255,255,255,0.2)',
                lineHeight: '1.5'
              }}>
                ⚠ {type.threat}
              </div>

              {/* Arrow on active hover */}
              {type.active && (
                <div style={{
                  position: 'absolute', bottom: '20px', right: '20px',
                  color: hovered === type.id ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)',
                  fontSize: '18px', transition: 'color 0.25s'
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <NextStrip
        steps={['Incident Type', 'Department', 'Email Details', 'Submit']}
        currentStep={0}
        onNext={handleSelect}
        nextLabel="Next: Select Department →"
      />
    </div>
  );
};

export default ReportStep1;