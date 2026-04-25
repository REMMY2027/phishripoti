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
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        form,
        { timeout: 30000 }
      );
      setPendingEmail(form.email);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(''));
      document.getElementById('otp-5')?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/verify-otp`,
        { email: pendingEmail, otp: otpString },
        { timeout: 30000 }
      );
      login(response.data.token, response.data.manager);
      navigate('/it/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setSuccessMsg('');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/resend-otp`,
        { email: pendingEmail },
        { timeout: 30000 }
      );
      setSuccessMsg('New code sent to your email.');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
      background: '#0d2410',
    }}>

      {/* ── GREEN RADIAL GLOW — centre ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0,80,20,0.35) 0%, rgba(0,40,10,0.18) 45%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      {/* ── RED AMBIENT — bottom right ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 50% 40% at 105% 108%, rgba(140,0,0,0.20) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* ── GREEN AMBIENT — top left ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 45% 38% at -5% -5%, rgba(0,100,30,0.18) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* ── DOT GRID ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'radial-gradient(circle, rgba(0,220,60,0.14) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* ── DECORATIVE CIRCLES ── */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 1, pointerEvents: 'none',
      }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="-60" cy="50%" r="300" fill="none" stroke="rgba(0,180,50,0.07)" strokeWidth="1"/>
        <circle cx="-60" cy="50%" r="220" fill="none" stroke="rgba(0,180,50,0.05)" strokeWidth="1"/>
        <circle cx="110%" cy="55%" r="280" fill="none" stroke="rgba(180,0,0,0.07)" strokeWidth="1"/>
        <circle cx="110%" cy="55%" r="200" fill="none" stroke="rgba(180,0,0,0.05)" strokeWidth="1"/>
      </svg>

      {/* ── KENYAN FLAG STRIPE ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111111 33.33%, #111111 66.66%, #006600 66.66%, #006600 100%)',
        zIndex: 10,
      }} />

      {/* ── MAIN CARD ── */}
      <div style={{
        width: '100%', maxWidth: '400px',
        position: 'relative', zIndex: 5,
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'linear-gradient(145deg, #cc0000, #7a0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(187,0,0,0.45)',
            }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                  fill="rgba(255,255,255,0.95)"/>
              </svg>
            </div>
            <span style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }}>
              <span style={{ color: '#ffffff' }}>Phish</span>
              <span style={{
                color: 'transparent',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Ripoti</span>
            </span>
          </div>
        </div>

        {/* ── CREDENTIALS STEP ── */}
        {step === 'credentials' && (
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px', padding: '32px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)',
            position: 'relative', overflow: 'hidden',
          }}>

            {/* Glass sheen */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
              pointerEvents: 'none', borderRadius: '20px',
            }} />
            {/* Top shimmer */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            }} />

            <div style={{ marginBottom: '26px', position: 'relative', zIndex: 1 }}>
              <h2 style={{
                color: '#ffffff', fontWeight: '900', fontSize: '22px',
                margin: '0 0 6px', letterSpacing: '-0.4px',
              }}>IT Manager Portal</h2>
              <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '13px', margin: 0, fontWeight: '500' }}>
                Sign in to access the security dashboard
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1 }}>
              <div>
                <label style={{
                  display: 'block', fontSize: '11px', fontWeight: '700',
                  color: 'rgba(255,255,255,0.45)', marginBottom: '7px',
                  textTransform: 'uppercase', letterSpacing: '0.09em',
                }}>Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="your@institution.co.ke"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '11px', color: '#ffffff',
                    padding: '13px 15px', fontSize: '14px',
                    outline: 'none', boxSizing: 'border-box',
                    fontWeight: '500',
                    transition: 'border 0.15s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.45)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block', fontSize: '11px', fontWeight: '700',
                  color: 'rgba(255,255,255,0.45)', marginBottom: '7px',
                  textTransform: 'uppercase', letterSpacing: '0.09em',
                }}>Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '11px', color: '#ffffff',
                    padding: '13px 15px', fontSize: '14px',
                    outline: 'none', boxSizing: 'border-box',
                    fontWeight: '500',
                    transition: 'border 0.15s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.45)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </div>

              {error && (
                <div style={{
                  padding: '11px 14px', borderRadius: '10px',
                  background: 'rgba(187,0,0,0.12)',
                  border: '1px solid rgba(187,0,0,0.28)',
                  color: '#ff8080', fontSize: '13px', fontWeight: '600',
                }}>{error}</div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  borderRadius: '11px', border: 'none',
                  background: loading ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, #BB0000, #8a0000)',
                  color: loading ? 'rgba(255,255,255,0.30)' : '#ffffff',
                  fontSize: '15px', fontWeight: '800',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.16s',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(187,0,0,0.40)',
                  letterSpacing: '-0.1px',
                  marginTop: '4px',
                }}>
                {loading ? 'Verifying...' : 'Continue →'}
              </button>
            </div>

            <p style={{
              textAlign: 'center', color: 'rgba(255,255,255,0.20)',
              fontSize: '12px', marginTop: '22px', marginBottom: 0,
              fontWeight: '500', position: 'relative', zIndex: 1,
            }}>
              Access restricted to authorised IT security personnel only
            </p>
          </div>
        )}

        {/* ── OTP STEP ── */}
        {step === 'otp' && (
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px', padding: '32px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)',
            position: 'relative', overflow: 'hidden',
          }}>

            {/* Glass sheen */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
              pointerEvents: 'none', borderRadius: '20px',
            }} />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            }} />

            <div style={{ textAlign: 'center', marginBottom: '26px', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '18px',
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.28)',
                display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '28px',
                marginBottom: '16px',
                boxShadow: '0 4px 20px rgba(34,197,94,0.15)',
              }}>🔐</div>
              <h2 style={{
                color: '#ffffff', fontWeight: '900', fontSize: '22px',
                margin: '0 0 8px', letterSpacing: '-0.4px',
              }}>Check your email</h2>
              <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '13px', margin: 0, lineHeight: '1.6', fontWeight: '500' }}>
                We sent a 6-digit code to<br/>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '700' }}>{pendingEmail}</span>
              </p>
            </div>

            {/* OTP inputs */}
            <div style={{
              display: 'flex', gap: '10px',
              justifyContent: 'center', marginBottom: '22px',
              position: 'relative', zIndex: 1,
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(index, e)}
                  onPaste={index === 0 ? handleOtpPaste : undefined}
                  autoFocus={index === 0}
                  style={{
                    width: '50px', height: '58px',
                    textAlign: 'center', fontSize: '24px',
                    fontWeight: '900', fontFamily: 'monospace',
                    background: digit
                      ? 'rgba(34,197,94,0.14)'
                      : 'rgba(255,255,255,0.07)',
                    border: digit
                      ? '1px solid rgba(34,197,94,0.45)'
                      : '1px solid rgba(255,255,255,0.14)',
                    borderRadius: '13px', color: '#ffffff',
                    outline: 'none', transition: 'all 0.15s',
                    caretColor: '#22c55e',
                    boxShadow: digit ? '0 0 12px rgba(34,197,94,0.15)' : 'none',
                  }}
                />
              ))}
            </div>

            {error && (
              <div style={{
                padding: '11px 14px', borderRadius: '10px',
                background: 'rgba(187,0,0,0.12)',
                border: '1px solid rgba(187,0,0,0.28)',
                color: '#ff8080', fontSize: '13px', fontWeight: '600',
                marginBottom: '14px', textAlign: 'center',
                position: 'relative', zIndex: 1,
              }}>{error}</div>
            )}

            {successMsg && (
              <div style={{
                padding: '11px 14px', borderRadius: '10px',
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.28)',
                color: '#4ade80', fontSize: '13px', fontWeight: '600',
                marginBottom: '14px', textAlign: 'center',
                position: 'relative', zIndex: 1,
              }}>{successMsg}</div>
            )}

            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.join('').length < 6}
              style={{
                width: '100%', padding: '14px',
                borderRadius: '11px', border: 'none',
                background: loading || otp.join('').length < 6
                  ? 'rgba(255,255,255,0.08)'
                  : 'linear-gradient(135deg, #006600, #004400)',
                color: loading || otp.join('').length < 6
                  ? 'rgba(255,255,255,0.30)' : '#ffffff',
                fontSize: '15px', fontWeight: '800',
                cursor: loading || otp.join('').length < 6 ? 'not-allowed' : 'pointer',
                transition: 'all 0.16s',
                marginBottom: '16px',
                boxShadow: otp.join('').length === 6 && !loading
                  ? '0 4px 20px rgba(0,102,0,0.40)' : 'none',
                letterSpacing: '-0.1px',
                position: 'relative', zIndex: 1,
              }}>
              {loading ? 'Verifying...' : 'Verify & Sign In →'}
            </button>

            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', position: 'relative', zIndex: 1,
            }}>
              <button
                onClick={() => { setStep('credentials'); setError(''); setOtp(['','','','','','']); }}
                style={{
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.35)', fontSize: '12px',
                  cursor: 'pointer', textDecoration: 'underline',
                  padding: 0, fontWeight: '600',
                }}>
                ← Back
              </button>
              <button
                onClick={handleResend}
                disabled={resending}
                style={{
                  background: 'none', border: 'none',
                  color: resending ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.45)',
                  fontSize: '12px',
                  cursor: resending ? 'not-allowed' : 'pointer',
                  textDecoration: 'underline', padding: 0, fontWeight: '600',
                }}>
                {resending ? 'Sending...' : 'Resend code'}
              </button>
            </div>
          </div>
        )}

        {/* Bottom note */}
        <div style={{ textAlign: 'center', marginTop: '24px', position: 'relative', zIndex: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.60)' }}/>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '600' }}>
              Secured by PhishRipoti · MFA Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITLogin;