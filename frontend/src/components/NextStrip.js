import React from 'react';

const NextStrip = ({ steps, currentStep, onNext, nextLabel, nextDisabled, rightText }) => {
  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      background: '#0a0d0a',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <span style={{
              fontSize: '12px',
              color: i === currentStep ? '#ffffff' : i < currentStep ? '#69db7c' : '#555',
              fontWeight: i === currentStep ? '600' : '400'
            }}>
              {step}
            </span>
            {i < steps.length - 1 && (
              <span style={{ color: '#333', fontSize: '12px' }}>→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {rightText && (
          <span style={{ fontSize: '12px', color: '#555' }}>{rightText}</span>
        )}
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            style={{
              background: nextDisabled ? '#333' : '#BB0000',
              color: nextDisabled ? '#666' : '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: nextDisabled ? 'not-allowed' : 'pointer'
            }}
          >
            {nextLabel || 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default NextStrip;
