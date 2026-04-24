import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const departments = [
  {
    id: 'customer',
    label: 'Customer Service / Teller',
    icon: '🎧',
    desc: 'High target for M-Pesa impersonation and account takeover phishing.',
    accent: '#006600'
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    icon: '📊',
    desc: 'Targeted by invoice fraud, payment diversion and CFO impersonation.',
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
    desc: 'At risk from fake loan documents and credential harvesting attacks.',
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
    id: 'hr',
    label: 'Human Resources',
    icon: '👥',
    desc: 'Targeted by payroll diversion and fake employee document phishing.',
    accent: '#BB0000'
  },
  {
    id: 'other',
    label: 'Other Department',
    icon: '✏️',
    desc: 'My department is not listed — I will enter it manually.',
    accent: '#555555',
    dashed: true
  }
];

const ReportStep2 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();
  const [selected, setSelected] = useState(reportData.department || '');
  const [hovered, setHovered] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDept, setOtherDept] = useState('');

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0'
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, transparent)' }}></div>
        <div style={{ padding: '20px 40px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: i === 2 ? '28px' : '20px',
                height: '4px', borderRadius: '2px',
                background: i < 2 ? '#006600' : i === 2 ? '#BB0000' : 'rgba(255,255,255,0.08)',
                transition: 'all 0.3s'
              }}></div>
            ))}
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Step 2 of 4
            </span>
          </div>
          <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '22px', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Which department are you from?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
            Your department helps us contextualise the threat. It is stripped before storage — never linked to your identity.
          </p>
        </div>
      </div>

      {/* Department grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          maxWidth: '900px',
          marginBottom: '10px'
        }}>
          {departments.filter(d => d.id !== 'other').map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleSelect(dept)}
              onMouseOver={() => setHovered(dept.id)}
              onMouseOut={() => setHovered(null)}
              style={{
                borderRadius: '12px', padding: '16px',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                background: selected === dept.label
                  ? 'rgba(255,255,255,0.09)'
                  : hovered === dept.id
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(255,255,255,0.03)',
                border: selected === dept.label
                  ? `1px solid ${dept.accent}`
                  : hovered === dept.id
                  ? '1px solid rgba(255,255,255,0.15)'
                  : '1px solid rgba(255,255,255,0.07)',
                transform: hovered === dept.id ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
                boxShadow: selected === dept.label
                  ? `0 0 0 1px ${dept.accent}44`
                  : hovered === dept.id
                  ? '0 6px 24px rgba(0,0,0,0.3)'
                  : 'none'
              }}>

              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: dept.accent,
                opacity: selected === dept.label ? 1 : hovered === dept.id ? 0.6 : 0.3,
                transition: 'opacity 0.2s'
              }}></div>

              {/* Selected checkmark */}
              {selected === dept.label && (
                <div style={{
                  position: 'absolute', top: '10px', right: '10px',
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: dept.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: '#fff', fontWeight: '700'
                }}>✓</div>
              )}

              {/* Icon */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: hovered === dept.id || selected === dept.label
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
            </div>
          ))}
        </div>

        {/* Other option */}
        <div style={{ maxWidth: '900px' }}>
          <div
            onClick={() => handleSelect(departments.find(d => d.id === 'other'))}
            onMouseOver={() => setHovered('other')}
            onMouseOut={() => setHovered(null)}
            style={{
              borderRadius: '12px', padding: '14px 18px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '14px',
              background: showOtherInput
                ? 'rgba(255,255,255,0.06)'
                : hovered === 'other'
                ? 'rgba(255,255,255,0.04)'
                : 'transparent',
              border: showOtherInput
                ? '1px solid rgba(255,255,255,0.2)'
                : `1px dashed ${hovered === 'other' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 0.2s ease'
            }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px', flexShrink: 0
            }}>✏️</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '600', fontSize: '13px' }}>
                Other Department
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                Not listed above — enter manually
              </div>
            </div>
            <div style={{
              color: hovered === 'other' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
              fontSize: '14px', transition: 'color 0.2s'
            }}>→</div>
          </div>

          {/* Other input */}
          {showOtherInput && (
            <div style={{
              borderRadius: '12px', padding: '18px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#111611', marginTop: '10px'
            }}>
              <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>
                Enter your department
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginBottom: '12px' }}>
                Type your department name — it will be stripped before storage.
              </div>
              <input
                value={otherDept}
                onChange={e => setOtherDept(e.target.value)}
                placeholder="e.g. Mobile Banking, Digital Channels, IT Security..."
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', color: '#ffffff',
                  padding: '10px 14px', fontSize: '13px',
                  outline: 'none', marginBottom: '12px',
                  boxSizing: 'border-box'
                }}
                onKeyDown={e => e.key === 'Enter' && handleOtherConfirm()}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleOtherConfirm}
                  disabled={!otherDept.trim()}
                  style={{
                    background: otherDept.trim() ? '#BB0000' : '#333',
                    color: '#fff', border: 'none',
                    borderRadius: '8px', padding: '8px 18px',
                    fontSize: '13px', fontWeight: '600',
                    cursor: otherDept.trim() ? 'pointer' : 'not-allowed'
                  }}>
                  Confirm →
                </button>
                <button
                  onClick={() => { setShowOtherInput(false); setOtherDept(''); }}
                  style={{
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.4)',
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

        {/* Selected confirmation */}
        {selected && (
          <div style={{
            maxWidth: '900px', marginTop: '16px',
            padding: '12px 16px', borderRadius: '10px',
            background: 'rgba(0,102,0,0.1)',
            border: '1px solid rgba(0,102,0,0.25)',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span style={{ color: '#69db7c', fontSize: '14px' }}>✓</span>
            <span style={{ color: '#69db7c', fontSize: '13px', fontWeight: '600' }}>
              Selected: {selected}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginLeft: '4px' }}>
              — stripped before storage
            </span>
          </div>
        )}
      </div>

      <NextStrip
        steps={['Phishing Email', selected || 'Department', 'Email Details', 'Submit']}
        currentStep={1}
        onNext={handleNext}
        nextLabel="Next: Email Details →"
        nextDisabled={!selected}
      />
    </div>
  );
};

export default ReportStep2;