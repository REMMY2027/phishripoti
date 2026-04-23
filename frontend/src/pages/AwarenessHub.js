import React, { useState } from 'react';
import { useNavigate } from 'react-router-relative';
import Navbar from '../components/Navbar';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'High target for M-Pesa impersonation and account takeover phishing attempts.',
    color: 'rgba(0,102,0,0.12)',
    accent: '#006600'
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Frequently targeted by invoice fraud, payment diversion and CFO impersonation emails.',
    color: 'rgba(187,0,0,0.08)',
    accent: '#BB0000'
  },
  {
    id: 'compliance',
    label: 'Compliance / Risk',
    icon: '⚖️',
    desc: 'Targeted by regulatory impersonation emails pretending to be CBK or KRA.',
    color: 'rgba(0,102,0,0.12)',
    accent: '#006600'
  },
  {
    id: 'loans',
    label: 'Loans / Credit Officer',
    icon: '💳',
    desc: 'At risk from fake loan applicant documents and credential harvesting attacks.',
    color: 'rgba(187,0,0,0.08)',
    accent: '#BB0000'
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚙️',
    desc: 'Targeted by system access phishing and fake IT support emails requesting credentials.',
    color: 'rgba(0,102,0,0.12)',
    accent: '#006600'
  },
  {
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Targeted by payroll diversion and fake employee document phishing campaigns.',
    color: 'rgba(187,0,0,0.08)',
    accent: '#BB0000'
  },
  {
    id: 'other',
    label: 'Other Department',
    icon: '✏️',
    desc: 'My department is not listed. I will enter it manually.',
    color: 'rgba(255,255,255,0.03)',
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

      {/* Header section */}
      <div style={{
        background: 'linear-gradient(180deg, #0f1f0f 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 32px 28px'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '20px', padding: 0
          }}>
          ← Back to Home
        </button>

        {/* Progress steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: '#006600', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff'
            }}>1</div>
            <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600' }}>
              Select Department
            </span>
          </div>
          <div style={{
            flex: 1, maxWidth: '60px', height: '1px',
            background: 'rgba(255,255,255,0.12)'
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '12px', fontWeight: '700',
              color: 'rgba(255,255,255,0.3)'
            }}>2</div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
              Select Module
            </span>
          </div>
          <div style={{
            flex: 1, maxWidth: '60px', height: '1px',
            background: 'rgba(255,255,255,0.12)'
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '12px', fontWeight: '700',
              color: 'rgba(255,255,255,0.3)'
            }}>3</div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
              Learn and Assess
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#006600', animation: 'pulse 2s infinite'
          }}></div>
          <span style={{
            fontSize: '11px', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#69db7c'
          }}>
            Live — AI-powered personalised content
          </span>
        </div>
        <h2 style={{ color: '#ffffff', fontWeight: '700', fontSize: '24px', margin: '0 0 6px' }}>
          Which department are you from?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: 0 }}>
          Select your role to receive phishing awareness training tailored to your daily responsibilities.
        </p>
      </div>

      {/* Department cards */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '24px 32px' }}>
        <div style={{ maxWidth: '680px' }}>
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleSelect(dept)}
              onMouseOver={() => setHovered(dept.id)}
              onMouseOut={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                borderRadius: '14px', padding: '16px 20px',
                marginBottom: '10px', cursor: 'pointer',
                background: hovered === dept.id
                  ? 'rgba(255,255,255,0.07)'
                  : dept.color,
                border: dept.dashed
                  ? `1px dashed ${hovered === dept.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`
                  : `1px solid ${hovered === dept.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                transform: hovered === dept.id ? 'translateX(6px)' : 'translateX(0)',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>

              {/* Left accent bar */}
              {!dept.dashed && (
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: '3px', background: dept.accent,
                  borderRadius: '14px 0 0 14px',
                  opacity: hovered === dept.id ? 1 : 0.5,
                  transition: 'opacity 0.2s'
                }}></div>
              )}

              {/* Icon */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: hovered === dept.id
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '22px',
                flexShrink: 0, transition: 'background 0.2s'
              }}>
                {dept.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: '10px', marginBottom: '4px'
                }}>
                  <span style={{
                    color: '#ffffff', fontWeight: '600', fontSize: '14px'
                  }}>
                    {dept.label}
                  </span>
                  {!dept.dashed && (
                    <span style={{
                      fontSize: '10px', fontWeight: '600',
                      padding: '2px 8px', borderRadius: '20px',
                      background: 'rgba(0,102,0,0.2)',
                      color: '#69db7c',
                      border: '1px solid rgba(0,102,0,0.25)'
                    }}>
                      2 modules
                    </span>
                  )}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '12px', lineHeight: '1.5'
                }}>
                  {dept.desc}
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                color: hovered === dept.id
                  ? 'rgba(255,255,255,0.6)'
                  : 'rgba(255,255,255,0.15)',
                fontSize: '18px', flexShrink: 0,
                transition: 'color 0.2s'
              }}>
                →
              </div>
            </div>
          ))}
        </div>

        {/* Other input */}
        {showOtherInput && (
          <div style={{
            maxWidth: '680px', borderRadius: '14px', padding: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#1a1f1a', marginTop: '8px'
          }}>
            <div style={{
              color: '#ffffff', fontWeight: '600',
              fontSize: '14px', marginBottom: '4px'
            }}>
              Enter your department
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '12px', marginBottom: '14px'
            }}>
              Type your department and we will generate personalised content for you.
            </div>
            <input
              value={otherDept}
              onChange={e => setOtherDept(e.target.value)}
              placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
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
                  background: 'transparent', color: 'rgba(255,255,255,0.4)',
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