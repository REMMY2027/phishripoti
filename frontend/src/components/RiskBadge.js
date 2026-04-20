import React from 'react';

const RiskBadge = ({ level }) => {
  const styles = {
    HIGH: { bg: 'rgba(187,0,0,0.2)', border: 'rgba(187,0,0,0.5)', color: '#ff6b6b', label: 'HIGH RISK' },
    MEDIUM: { bg: 'rgba(234,150,0,0.2)', border: 'rgba(234,150,0,0.5)', color: '#ffd166', label: 'MEDIUM RISK' },
    LOW: { bg: 'rgba(0,102,0,0.2)', border: 'rgba(0,102,0,0.5)', color: '#69db7c', label: 'LOW RISK' }
  };

  const s = styles[level] || styles.LOW;

  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`,
      color: s.color, fontSize: '11px', fontWeight: '700',
      padding: '3px 8px', borderRadius: '6px', letterSpacing: '0.05em'
    }}>
      {s.label}
    </span>
  );
};

export default RiskBadge;
