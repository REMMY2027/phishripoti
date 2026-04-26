import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ITLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState('credentials');
  const [form, setForm] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

  const handleLogin = async () => {
    if (!form.email || !form.password) { setError('Please enter your email and password.'); return; }
    setLoading(true); setError('');
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, form, { timeout: 30000 });
      setPendingEmail(form.email);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally { setLoading(false); }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) { setOtp(paste.split('')); document.getElementById('otp-5')?.focus(); }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) { setError('Please enter the full 6-digit code.'); return; }
    setLoading(true); setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-otp`,
        { email: pendingEmail, otp: otpString }, { timeout: 30000 });
      login(response.data.token, response.data.manager);
      navigate('/it/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    setResending(true); setError(''); setSuccessMsg('');
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/resend-otp`, { email: pendingEmail }, { timeout: 30000 });
      setSuccessMsg('New code sent to your email.');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } catch { setError('Failed to resend code. Please try again.'); }
    finally { setResending(false); }
  };

  const inputStyle = (filled) => ({
    width: '100%', background: filled ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
    border: filled ? '1px solid rgba(255,255,255,0.22)' : '1px solid rgba(255,255,255,0.09)',
    borderRadius: '12px', color: '#ffffff', padding: '13px 15px',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    fontWeight: '500', transition: 'all 0.15s',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes drift{0%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(10px,-8px) rotate(1deg)}100%{transform:translate(0,0) rotate(0deg)}}
      `}</style>

      {/* ── BACKGROUND — dark with abstract graphics ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#080e08' }} />

      {/* Radial glows */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 55% 48% at 50% 50%, rgba(0,50,12,0.55) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 40% 35% at 105% 110%, rgba(120,0,0,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 35% 30% at -5% -5%, rgba(0,80,18,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 30% 25% at 100% 0%, rgba(0,60,14,0.12) 0%, transparent 55%)', pointerEvents: 'none' }} />

      {/* Grid texture */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      {/* Abstract SVG graphics */}
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        {/* Large arcs — left */}
        <circle cx="-100" cy="50%" r="380" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
        <circle cx="-100" cy="50%" r="290" fill="none" stroke="rgba(255,255,255,0.020)" strokeWidth="0.8"/>
        <circle cx="-100" cy="50%" r="200" fill="none" stroke="rgba(0,120,30,0.04)" strokeWidth="0.8"/>
        {/* Large arcs — right */}
        <circle cx="110%" cy="50%" r="360" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
        <circle cx="110%" cy="50%" r="270" fill="none" stroke="rgba(255,255,255,0.020)" strokeWidth="0.8"/>
        <circle cx="110%" cy="50%" r="180" fill="none" stroke="rgba(120,0,0,0.04)" strokeWidth="0.8"/>
        {/* Top arcs */}
        <circle cx="50%" cy="-60" r="300" fill="none" stroke="rgba(255,255,255,0.018)" strokeWidth="0.8"/>
        <circle cx="50%" cy="-60" r="200" fill="none" stroke="rgba(0,100,20,0.03)" strokeWidth="0.7"/>
        {/* Bottom arcs */}
        <circle cx="50%" cy="110%" r="280" fill="none" stroke="rgba(255,255,255,0.018)" strokeWidth="0.8"/>
        {/* Flow lines */}
        <path d="M -100 200 Q 300 120 700 220 T 1400 180" fill="none" stroke="rgba(0,100,30,0.035)" strokeWidth="1.2"/>
        <path d="M -100 600 Q 300 520 700 620 T 1400 580" fill="none" stroke="rgba(100,0,0,0.025)" strokeWidth="0.8"/>
        <path d="M 1500 300 Q 1100 200 700 310 T 0 280" fill="none" stroke="rgba(0,80,20,0.025)" strokeWidth="0.8"/>
        {/* Dot network — left side */}
        <circle cx="6%" cy="18%" r="2.5" fill="rgba(0,180,50,0.12)"/>
        <circle cx="10%" cy="38%" r="1.8" fill="rgba(0,150,40,0.09)"/>
        <circle cx="4%" cy="58%" r="1.5" fill="rgba(0,120,30,0.07)"/>
        <circle cx="8%" cy="75%" r="2" fill="rgba(0,100,25,0.08)"/>
        <line x1="6%" y1="18%" x2="10%" y2="38%" stroke="rgba(0,150,40,0.06)" strokeWidth="0.8"/>
        <line x1="10%" y1="38%" x2="4%" y2="58%" stroke="rgba(0,120,30,0.05)" strokeWidth="0.7"/>
        <line x1="4%" y1="58%" x2="8%" y2="75%" stroke="rgba(0,100,25,0.04)" strokeWidth="0.6"/>
        {/* Dot network — right side */}
        <circle cx="94%" cy="22%" r="2.5" fill="rgba(180,0,0,0.12)"/>
        <circle cx="90%" cy="42%" r="1.8" fill="rgba(150,0,0,0.09)"/>
        <circle cx="96%" cy="62%" r="1.5" fill="rgba(120,0,0,0.07)"/>
        <circle cx="92%" cy="80%" r="2" fill="rgba(100,0,0,0.08)"/>
        <line x1="94%" y1="22%" x2="90%" y2="42%" stroke="rgba(150,0,0,0.06)" strokeWidth="0.8"/>
        <line x1="90%" y1="42%" x2="96%" y2="62%" stroke="rgba(120,0,0,0.05)" strokeWidth="0.7"/>
        <line x1="96%" y1="62%" x2="92%" y2="80%" stroke="rgba(100,0,0,0.04)" strokeWidth="0.6"/>
        {/* Centre top dots */}
        <circle cx="38%" cy="5%" r="1.5" fill="rgba(0,120,30,0.07)"/>
        <circle cx="62%" cy="7%" r="1.5" fill="rgba(100,0,0,0.07)"/>
        <circle cx="50%" cy="3%" r="1.2" fill="rgba(255,255,255,0.04)"/>
        {/* Diagonal lines subtle */}
        <line x1="0%" y1="0%" x2="15%" y2="25%" stroke="rgba(0,80,20,0.02)" strokeWidth="1"/>
        <line x1="100%" y1="0%" x2="85%" y2="25%" stroke="rgba(100,0,0,0.02)" strokeWidth="1"/>
        <line x1="0%" y1="100%" x2="15%" y2="75%" stroke="rgba(0,60,15,0.02)" strokeWidth="1"/>
        <line x1="100%" y1="100%" x2="85%" y2="75%" stroke="rgba(80,0,0,0.02)" strokeWidth="1"/>
      </svg>

      {/* Nairobi skyline — very faint */}
      <div style={{ position: 'fixed', bottom: '-20px', right: 0, width: '500px', height: '180px', zIndex: 4, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" fill="rgba(0,60,12,0.25)" opacity="1">
          <rect x="10" y="150" width="14" height="50"/><rect x="28" y="140" width="10" height="60"/>
          <rect x="240" y="40" width="30" height="160"/><rect x="160" y="70" width="24" height="130"/>
          <ellipse cx="172" cy="70" rx="14" ry="6"/><rect x="290" y="65" width="26" height="135"/>
          <rect x="120" y="105" width="18" height="95"/><rect x="200" y="88" width="20" height="112"/>
          <rect x="330" y="85" width="22" height="115"/><rect x="368" y="110" width="18" height="90"/>
          <rect x="400" y="125" width="16" height="75"/><rect x="60" y="130" width="12" height="70"/>
          <rect x="0" y="198" width="500" height="2"/>
        </svg>
      </div>

      {/* Kenyan flag stripe */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)', zIndex: 30 }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* ── LOGO ── */}
          <div style={{ textAlign: 'center', marginBottom: '32px', animation: 'fadeUp 0.4s ease both' }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(145deg, #cc0000, #7a0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 28px rgba(187,0,0,0.45)', animation: 'float 3s ease-in-out infinite' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
              </div>
              <div>
                <span style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                  <span style={{ color: '#ffffff' }}>Phish</span>
                  <span style={{ color: 'transparent', background: 'linear-gradient(90deg, #22c55e, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ripoti</span>
                </span>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: '3px' }}>IT Manager Portal</div>
              </div>
            </div>
          </div>

          {/* ── CREDENTIALS STEP ── */}
          {step === 'credentials' && (
            <div style={{ animation: 'fadeUp 0.4s ease 0.08s both' }}>
              <div style={{ borderRadius: '22px', overflow: 'hidden', background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', boxShadow: '0 16px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)', position: 'relative' }}>

                {/* Top shimmer bar */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg, #BB0000, #1a1a1a, #006600)', backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite' }}/>

                {/* Glass sheen */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }} />

                {/* Abstract circles inside card */}
                <svg style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                  <circle cx="140" cy="50%" r="90" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                  <circle cx="140" cy="50%" r="55" fill="none" stroke="rgba(0,102,0,0.06)" strokeWidth="0.6"/>
                </svg>

                <div style={{ padding: '30px 30px 28px', position: 'relative', zIndex: 1 }}>
                  {/* Header */}
                  <div style={{ marginBottom: '26px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(187,0,0,0.14)', border: '1px solid rgba(187,0,0,0.28)' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }}/>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Restricted Access</span>
                    </div>
                    <h2 style={{ color: '#ffffff', fontWeight: '900', fontSize: '22px', margin: '0 0 6px', letterSpacing: '-0.4px' }}>Sign in to dashboard</h2>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', margin: 0, fontWeight: '500' }}>
                      Access restricted to authorised IT security personnel
                    </p>
                  </div>

                  {/* Fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.11em' }}>Email address</label>
                      <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@institution.co.ke" style={inputStyle(form.email)}
                        onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.30)'; e.target.style.background = 'rgba(255,255,255,0.10)'; }}
                        onBlur={e => { e.target.style.borderColor = form.email ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.09)'; e.target.style.background = form.email ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)'; }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.11em' }}>Password</label>
                      <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" style={inputStyle(form.password)}
                        onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.30)'; e.target.style.background = 'rgba(255,255,255,0.10)'; }}
                        onBlur={e => { e.target.style.borderColor = form.password ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.09)'; e.target.style.background = form.password ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)'; }}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                      />
                    </div>

                    {error && (
                      <div style={{ padding: '11px 14px', borderRadius: '11px', background: 'rgba(187,0,0,0.14)', border: '1px solid rgba(239,68,68,0.28)', borderLeft: '3px solid #ef4444', color: '#fca5a5', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>{error}
                      </div>
                    )}

                    <button onClick={handleLogin} disabled={loading} style={{
                      width: '100%', padding: '14px', borderRadius: '13px', border: 'none',
                      background: loading ? 'rgba(255,255,255,0.07)' : 'linear-gradient(135deg, #BB0000 0%, #7a0000 100%)',
                      color: loading ? 'rgba(255,255,255,0.28)' : '#ffffff',
                      fontSize: '14px', fontWeight: '900',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
                      boxShadow: loading ? 'none' : '0 6px 24px rgba(187,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)',
                      letterSpacing: '0.01em', marginTop: '4px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                      onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(187,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.15)'; } }}
                      onMouseOut={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(187,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)'; } }}>
                      {loading ? (
                        <>
                          <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.20)" strokeWidth="2.5"/>
                            <path d="M12 3a9 9 0 0 1 9 9" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                          </svg>
                          Verifying...
                        </>
                      ) : 'Continue →'}
                    </button>
                  </div>

                  {/* Security badges */}
                  <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    {[
                      { icon: '🔐', label: 'MFA Enabled' },
                      { icon: '🛡️', label: 'SSL Secured' },
                      { icon: '🇰🇪', label: 'Kenya Only' },
                    ].map((badge, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '12px' }}>{badge.icon}</span>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', fontWeight: '600' }}>{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── OTP STEP ── */}
          {step === 'otp' && (
            <div style={{ animation: 'fadeUp 0.4s ease both' }}>
              <div style={{ borderRadius: '22px', overflow: 'hidden', background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', boxShadow: '0 16px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)', position: 'relative' }}>

                <div style={{ height: '3px', background: 'linear-gradient(90deg, #006600, #22c55e, #006600)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}/>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }} />

                {/* Abstract circles */}
                <svg style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                  <circle cx="140" cy="50%" r="90" fill="none" stroke="rgba(34,197,94,0.06)" strokeWidth="0.8"/>
                  <circle cx="140" cy="50%" r="55" fill="none" stroke="rgba(34,197,94,0.04)" strokeWidth="0.6"/>
                </svg>

                <div style={{ padding: '30px 30px 28px', position: 'relative', zIndex: 1 }}>
                  {/* Header */}
                  <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>🔐</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.24)', display: 'block' }}>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.12em' }}>✓ Code Sent</span>
                    </div>
                    <h2 style={{ color: '#ffffff', fontWeight: '900', fontSize: '21px', margin: '0 0 8px', letterSpacing: '-0.4px' }}>Check your email</h2>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', margin: 0, lineHeight: '1.65', fontWeight: '500' }}>
                      We sent a 6-digit code to<br/>
                      <span style={{ color: '#4ade80', fontWeight: '700' }}>{pendingEmail}</span>
                    </p>
                  </div>

                  {/* OTP boxes */}
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.32)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.11em', textAlign: 'center' }}>Enter 6-digit code</label>
                    <div style={{ display: 'flex', gap: '9px', justifyContent: 'center' }}>
                      {otp.map((digit, index) => (
                        <input key={index} id={`otp-${index}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                          onChange={e => handleOtpChange(index, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(index, e)}
                          onPaste={index === 0 ? handleOtpPaste : undefined}
                          autoFocus={index === 0}
                          style={{
                            width: '52px', height: '62px', textAlign: 'center',
                            fontSize: '24px', fontWeight: '900', fontFamily: 'monospace',
                            background: digit ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                            border: digit ? '1.5px solid rgba(34,197,94,0.45)' : '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '14px', color: digit ? '#4ade80' : '#ffffff',
                            outline: 'none', transition: 'all 0.18s',
                            caretColor: '#4ade80',
                            boxShadow: digit ? '0 4px 16px rgba(34,197,94,0.18)' : 'none',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '20px' }}>
                    {otp.map((d, i) => (
                      <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: d ? '#22c55e' : 'rgba(255,255,255,0.12)', transition: 'all 0.18s', boxShadow: d ? '0 0 6px rgba(34,197,94,0.45)' : 'none' }}/>
                    ))}
                  </div>

                  {error && (
                    <div style={{ padding: '11px 14px', borderRadius: '11px', background: 'rgba(187,0,0,0.14)', border: '1px solid rgba(239,68,68,0.28)', borderLeft: '3px solid #ef4444', color: '#fca5a5', fontSize: '13px', fontWeight: '600', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>{error}
                    </div>
                  )}
                  {successMsg && (
                    <div style={{ padding: '11px 14px', borderRadius: '11px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.28)', borderLeft: '3px solid #22c55e', color: '#4ade80', fontSize: '13px', fontWeight: '600', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', flexShrink: 0 }}>✅</span>{successMsg}
                    </div>
                  )}

                  <button onClick={handleVerifyOTP} disabled={loading || otp.join('').length < 6} style={{
                    width: '100%', padding: '14px', borderRadius: '13px', border: 'none',
                    background: loading || otp.join('').length < 6 ? 'rgba(255,255,255,0.07)' : 'linear-gradient(135deg, #006600 0%, #004400 100%)',
                    color: loading || otp.join('').length < 6 ? 'rgba(255,255,255,0.28)' : '#ffffff',
                    fontSize: '14px', fontWeight: '900',
                    cursor: loading || otp.join('').length < 6 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
                    marginBottom: '18px',
                    boxShadow: otp.join('').length === 6 && !loading ? '0 6px 24px rgba(0,102,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)' : 'none',
                    letterSpacing: '0.01em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                    onMouseOver={e => { if (!loading && otp.join('').length === 6) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,102,0,0.50), inset 0 1px 0 rgba(255,255,255,0.15)'; } }}
                    onMouseOut={e => { if (!loading && otp.join('').length === 6) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,102,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)'; } }}>
                    {loading ? (
                      <>
                        <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.20)" strokeWidth="2.5"/>
                          <path d="M12 3a9 9 0 0 1 9 9" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                        Verifying...
                      </>
                    ) : 'Verify & Sign In →'}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => { setStep('credentials'); setError(''); setOtp(['','','','','','']); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.30)', fontSize: '12px', cursor: 'pointer', fontWeight: '600', padding: 0 }}
                      onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.60)'}
                      onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.30)'}>
                      ← Back
                    </button>
                    <button onClick={handleResend} disabled={resending} style={{ background: 'none', border: 'none', color: resending ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.38)', fontSize: '12px', cursor: resending ? 'not-allowed' : 'pointer', fontWeight: '600', padding: 0 }}
                      onMouseOver={e => { if (!resending) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                      onMouseOut={e => { if (!resending) e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}>
                      {resending ? 'Sending...' : 'Resend code'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BOTTOM NOTE ── */}
          <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.50)', animation: 'pulse 2s infinite' }}/>
            <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '11px', fontWeight: '600' }}>Secured by PhishRipoti · MFA Enabled · 🇰🇪</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITLogin;