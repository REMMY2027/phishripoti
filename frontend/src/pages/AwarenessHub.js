import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'High target for M-Pesa impersonation and account takeover phishing.',
    accent: '#006600'
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    desc: 'Targeted by regulatory impersonation emails pretending to be CBK or KRA.',
    accent: '#BB0000'
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Targeted by invoice fraud, payment diversion and CFO impersonation emails.',
    accent: '#BB0000'
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    desc: 'Targeted by system access phishing and fake IT support credential emails.',
    accent: '#006600'
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    desc: 'At risk from fake loan documents and credential harvesting attacks.',
    accent: '#006600'
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Targeted by payroll diversion and fake employee document phishing.',
    accent: '#BB0000'
  }
];

const AwarenessHub = () => {
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');
  const [hovered, setHovered] = useState(null);

  const handleSelect = (deptLabel) => {
    navigate('/awareness/modules', { state: { department: deptLabel } });
  };

  const handleOtherSubmit = () => {
    if (otherDept.trim()) {
      navigate('/awareness/modules', { state: { department: otherDept.trim() } });
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: '#0a0d0a', overflow: 'hidden'
    }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '24px 40px 20px'
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.35)', fontSize: '13px',
          display: 'flex', alignItems: 'center', gap: '6px',
          marginBottom: '16px', padding: 0
        }}
          onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
          ← Home
        </button>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          {[
            { n: 1, label: 'Department', active: true },
            { n: 2, label: 'Module', active: false },
            { n: 3, label: 'Learn & Assess', active: false }
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: step.active ? '#006600' : 'rgba(255,255,255,0.06)',
                  border: step.active ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: '700',
                  color: step.active ? '#ffffff' : 'rgba(255,255,255,0.25)'
                }}>{step.n}</div>
                <span style={{
                  fontSize: '12px', fontWeight: step.active ? '600' : '400',
                  color: step.active ? '#ffffff' : 'rgba(255,255,255,0.25)'
                }}>{step.label}</span>
              </div>
              {i < 2 && (
                <div style={{
                  width: '40px', height: '1px',
                  background: 'rgba(255,255,255,0.1)', margin: '0 10px'
                }}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(0,102,0,0.12)', border: '1px solid rgba(0,102,0,0.25)',
          borderRadius: '20px', padding: '3px 10px', marginBottom: '10px'
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69db7c' }}></div>
          <span style={{ fontSize: '10px', fontWeight: '600', color: '#69db7c', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Live — AI-powered content
          </span>
        </div>

        <h1 style={{ color: '#ffffff', fontWeight: '800', fontSize: '22px', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
          Select your department
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
          GPT-4o generates phishing scenarios and quizzes tailored to your role.
        </p>
      </div>

      {/* Department grid — all visible no scroll */}
      <div style={{ flex: 1, padding: '20px 40px', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          maxWidth: '900px',
          marginBottom: '10px'
        }}>
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleSelect(dept.label)}
              onMouseOver={() => setHovered(dept.id)}
              onMouseOut={() => setHovered(null)}
              style={{
                borderRadius: '12px', padding: '16px',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                background: hovered === dept.id
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered === dept.id
                  ? 'rgba(255,255,255,0.15)'
                  : 'rgba(255,255,255,0.07)'}`,
                transform: hovered === dept.id ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
                boxShadow: hovered === dept.id ? '0 6px 24px rgba(0,0,0,0.3)' : 'none'
              }}>

              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px', background: dept.accent,
                opacity: hovered === dept.id ? 1 : 0.4,
                transition: 'opacity 0.2s'
              }}></div>

              {/* Icon */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: hovered === dept.id
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px',
                marginBottom: '10px', transition: 'background 0.2s'
              }}>
                {dept.icon}
              </div>

              <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '13px', marginBottom: '5px' }}>
                {dept.label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', lineHeight: '1.5' }}>
                {dept.desc}
              </div>

              <div style={{
                position: 'absolute', bottom: '12px', right: '12px',
                color: hovered === dept.id ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)',
                fontSize: '14px', transition: 'color 0.2s'
              }}>→</div>
            </div>
          ))}
        </div>

        {/* Other option */}
        <div style={{ maxWidth: '900px' }}>
          <div
            onClick={() => setShowOtherInput(!showOtherInput)}
            onMouseOver={() => setHovered('other')}
            onMouseOut={() => setHovered(null)}
            style={{
              borderRadius: '12px', padding: '12px 16px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '12px',
              background: hovered === 'other' ? 'rgba(255,255,255,0.04)' : 'transparent',
              border: `1px dashed ${hovered === 'other' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 0.2s ease'
            }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '14px', flexShrink: 0
            }}>✏️</div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontWeight: '600', fontSize: '12px' }}>
                Other Department
              </div>
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>
                Not listed above — enter manually
              </div>
            </div>
            <div style={{
              marginLeft: 'auto',
              color: hovered === 'other' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
              fontSize: '14px', transition: 'color 0.2s'
            }}>→</div>
          </div>
        </div>

        {/* Other input */}
        {showOtherInput && (
          <div style={{
            maxWidth: '900px', borderRadius: '12px', padding: '18px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#111611', marginTop: '10px'
          }}>
            <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>
              Enter your department
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginBottom: '12px' }}>
              GPT-4o will generate personalised phishing scenarios for your role.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', color: '#ffffff',
                padding: '10px 14px', fontSize: '13px',
                outline: 'none', marginBottom: '12px',
                boxSizing: 'border-box'
              }}
              onKeyDown={e => e.key === 'Enter' && handleOtherSubmit()}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleOtherSubmit} disabled={!otherDept.trim()}
                style={{
                  background: otherDept.trim() ? '#006600' : '#333',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  padding: '8px 18px', fontSize: '13px', fontWeight: '600',
                  cursor: otherDept.trim() ? 'pointer' : 'not-allowed'
                }}>
                Continue →
              </button>
              <button onClick={() => { setShowOtherInput(false); setOtherDept(''); }}
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '8px 18px',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer'
                }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwarenessHub;