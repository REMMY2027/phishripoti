import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: 'rgba(0,102,0,0.95)', border: 'rgba(0,102,0,0.5)', icon: '✓' },
    error: { bg: 'rgba(187,0,0,0.95)', border: 'rgba(187,0,0,0.5)', icon: '✕' },
    info: { bg: 'rgba(22,27,34,0.98)', border: 'rgba(255,255,255,0.15)', icon: 'ℹ' },
    warning: { bg: 'rgba(234,150,0,0.95)', border: 'rgba(234,150,0,0.5)', icon: '⚠' }
  };

  const style = colors[type] || colors.info;

  return (
    <div style={{
      position: 'fixed', top: '80px', right: '24px', zIndex: 9999,
      background: style.bg, border: `1px solid ${style.border}`,
      borderRadius: '12px', padding: '12px 18px',
      display: 'flex', alignItems: 'center', gap: '10px',
      maxWidth: '320px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      animation: 'slideIn 0.3s ease'
    }}>
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
        {style.icon}
      </span>
      <span style={{ color: 'white', fontSize: '13px', lineHeight: '1.5' }}>{message}</span>
      <button onClick={onClose}
        style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '16px', marginLeft: 'auto', flexShrink: 0 }}>
        ×
      </button>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  );
};

export default Toast;
