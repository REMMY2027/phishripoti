import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'High target for M-Pesa impersonation and account takeover phishing attempts.',
    accent: '#006600'
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Frequently targeted by invoice fraud, payment diversion and CFO impersonation emails.',
    accent: '#BB0000'
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    desc: 'Targeted by regulatory impersonation emails pretending to be CBK or KRA.',
    accent: '#006600'
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    desc: 'At risk from fake loan applicant documents and credential harvesting attacks.',
    accent: '#BB0000'
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    desc: 'Targeted by system access phishing and fake IT support emails requesting credentials.',
    accent: '#006600'
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Targeted by payroll diversion and fake employee document phishing campaigns.',
    accent: '#BB0000'
  },
  {
    id: 'other',
    label: 'Other Department',
    icon: '✏️',
    desc: 'My department is not listed. I will enter it manually.',
    accent: '#555555',
    dashed: true
  }
];

const AwarenessHub = () => {
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');
  const [hovered, setHovered] = useState(null);

  const handleSelect = (dept) => {
    if (dept.id === 'other') {
      setShowOtherInput(true);
      return;
    }
    navigate('/awareness/modules', { state: { department: dept.label } });
  };

  const handleOtherSubmit = () => {
    if (otherDept.trim()) {
      navigate('/awareness/modules', { state: { department: otherDept.trim() } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />

      {/* Hero header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '40px 40px 32px'
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.35)', fontSize: '13px',
          display: 'flex', alignItems: 'center', gap: '6px',
          marginBottom: '24px', padding: 0, transition: 'color 0.2s'
        }}
          onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
          ← Home
        </button>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '28px' }}>
          {[
            { n: 1, label: 'Department', active: true },
            { n: 2, label: 'Module', active: false },
            { n: 3, label: 'Learn & Assess', active: false }
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: step.active ? '#006600' : 'rgba(255,255,255,0.06)',
                  border: step.active ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '700',
                  color: step.active ? '#ffffff' : 'rgba(255,255,255,0.25)'
                }}>{step.n}</div>
                <span style={{
                  fontSize: '13px', fontWeight: step.active ? '600' : '400',
                  color: step.active ? '#ffffff' : 'rgba(255,255,255,0.25)'
                }}>{step.label}</span>
              </div>
              {i < 2 && (
                <div style={{
                  width: '48px', height: '1px',
                  background: 'rgba(255,255,255,0.1)',
                  margin: '0 12px'
                }}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Live badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(0,102,0,0.12)', border: '1px solid rgba(0,102,0,0.25)',
          borderRadius: '20px', padding: '4px 12px', marginBottom: '14px'
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%', background: '#69db7c'
          }}></div>
          <span style={{
            fontSize: '11px', fontWeight: '600', color: '#69db7c',
            textTransform: 'uppercase', letterSpacing: '0.08em'
          }}>
            Live — AI-powered content
          </span>
        </div>

        <h1 style={{
          color: '#ffffff', fontWeight: '800', fontSize: '28px',
          margin: '0 0 8px', letterSpacing: '-0.5px'
        }}>
          Select your department
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '14px',
          margin: 0, lineHeight: '1.6', maxWidth: '480px'
        }}>
          Your department determines the phishing scenarios and quiz content you will receive.
          All content is generated by GPT-4o in real time.
        </p>
      </div>

      {/* Department grid */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '28px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          maxWidth: '760px'
        }}>
          {departments.filter(d => d.id !== 'other').map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleSelect(dept)}
              onMouseOver={() => setHovered(dept.id)}
              onMouseOut={() => setHovered(null)}
              style={{
                borderRadius: '14px', padding: '20px',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                background: hovered === dept.id
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered === dept.id
                  ? 'rgba(255,255,255,0.15)'
                  : 'rgba(255,255,255,0.07)'}`,
                transform: hovered === dept.id ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
                boxShadow: hovered === dept.id
                  ? '0 8px 32px rgba(0,0,0,0.3)'
                  : 'none'
              }}>

              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px', background: dept.accent,
                opacity: hovered === dept.id ? 1 : 0.4,
                transition: 'opacity 0.2s'
              }}></div>

              {/* Icon */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: hovered === dept.id
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px',
                marginBottom: '14px', transition: 'background 0.2s'
              }}>
                {dept.icon}
              </div>

              {/* Label */}
              <div style={{
                color: '#ffffff', fontWeight: '600',
                fontSize: '14px', marginBottom: '6px'
              }}>
                {dept.label}
              </div>

              {/* Description */}
              <div style={{
                color: 'rgba(255,255,255,0.38)',
                fontSize: '12px', lineHeight: '1.6'
              }}>
                {dept.desc}
              </div>

              {/* Arrow on hover */}
              <div style={{
                position: 'absolute', bottom: '16px', right: '16px',
                color: hovered === dept.id
                  ? 'rgba(255,255,255,0.5)'
                  : 'rgba(255,255,255,0.1)',
                fontSize: '16px', transition: 'color 0.2s'
              }}>→</div>
            </div>
          ))}
        </div>

        {/* Other option */}
        <div style={{ maxWidth: '760px', marginTop: '12px' }}>
          <div
            onClick={() => handleSelect(departments.find(d => d.id === 'other'))}
            onMouseOver={() => setHovered('other')}
            onMouseOut={() => setHovered(null)}
            style={{
              borderRadius: '14px', padding: '16px 20px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '14px',
              background: hovered === 'other'
                ? 'rgba(255,255,255,0.05)'
                : 'transparent',
              border: `1px dashed ${hovered === 'other'
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(255,255,255,0.1)'}`,
              transition: 'all 0.2s ease'
            }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px', flexShrink: 0
            }}>✏️</div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '600', fontSize: '13px' }}>
                Other Department
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
                My department is not listed — I will enter it manually
              </div>
            </div>
            <div style={{
              marginLeft: 'auto',
              color: hovered === 'other'
                ? 'rgba(255,255,255,0.4)'
                : 'rgba(255,255,255,0.1)',
              fontSize: '14px', transition: 'color 0.2s'
            }}>→</div>
          </div>
        </div>

        {/* Other input */}
        {showOtherInput && (
          <div style={{
            maxWidth: '760px', borderRadius: '14px', padding: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#111611', marginTop: '12px'
          }}>
            <div style={{
              color: '#ffffff', fontWeight: '600',
              fontSize: '14px', marginBottom: '4px'
            }}>
              Enter your department
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '12px', marginBottom: '14px'
            }}>
              GPT-4o will generate personalised content based on your department.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', color: '#ffffff',
                padding: '12px 16px', fontSize: '14px',
                outline: 'none', marginBottom: '14px',
                boxSizing: 'border-box'
              }}
              onKeyDown={e => e.key === 'Enter' && handleOtherSubmit()}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleOtherSubmit}
                disabled={!otherDept.trim()}
                style={{
                  background: otherDept.trim() ? '#006600' : '#333',
                  color: '#fff', border: 'none',
                  borderRadius: '10px', padding: '10px 20px',
                  fontSize: '13px', fontWeight: '600',
                  cursor: otherDept.trim() ? 'pointer' : 'not-allowed'
                }}>
                Continue →
              </button>
              <button
                onClick={() => { setShowOtherInput(false); setOtherDept(''); }}
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '10px 20px',
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