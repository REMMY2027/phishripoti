
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
      padding: '24px', background: '#060f07',
      position: 'relative', overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,60,15,0.35) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #111 33.33%, #111 66.66%, #006600 66.66%, #006600 100%)',
      }} />

      <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '11px',
              background: 'linear-gradient(145deg, #cc0000, #7a0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(187,0,0,0.45)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                  fill="rgba(255,255,255,0.95)"/>
              </svg>
            </div>
            <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
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

        {step === 'credentials' && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px', padding: '32px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.40)',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '20px', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                IT Manager Portal
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', margin: 0 }}>
                Sign in to access the security dashboard
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.40)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="your@institution.co.ke"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '10px', color: '#ffffff',
                    padding: '12px 14px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.40)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '10px', color: '#ffffff',
                    padding: '12px 14px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </div>

              {error && (
                <div style={{
                  padding: '10px 14px', borderRadius: '9px',
                  background: 'rgba(187,0,0,0.10)',
                  border: '1px solid rgba(187,0,0,0.25)',
                  color: '#ff8080', fontSize: '13px',
                }}>{error}</div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: '100%', padding: '13px',
                  borderRadius: '10px', border: 'none',
                  background: loading ? 'rgba(255,255,255,0.08)' : '#BB0000',
                  color: loading ? 'rgba(255,255,255,0.30)' : '#ffffff',
                  fontSize: '14px', fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.16s',
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(187,0,0,0.35)',
                }}>
                {loading ? 'Verifying...' : 'Continue →'}
              </button>
            </div>

            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.20)', fontSize: '12px', marginTop: '20px', marginBottom: 0 }}>
              Access restricted to authorised IT security personnel only
            </p>
          </div>
        )}

        {step === 'otp' && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px', padding: '32px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.40)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.25)',
                display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '26px',
                marginBottom: '14px',
              }}>🔐</div>
              <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '20px', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Check your email
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                We sent a 6-digit code to<br/>
                <span style={{ color: 'rgba(255,255,255,0.70)', fontWeight: '600' }}>{pendingEmail}</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
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
                    width: '48px', height: '56px',
                    textAlign: 'center', fontSize: '22px',
                    fontWeight: '700', fontFamily: 'monospace',
                    background: digit ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                    border: digit ? '1px solid rgba(34,197,94,0.40)' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px', color: '#ffffff',
                    outline: 'none', transition: 'all 0.15s',
                    caretColor: '#22c55e',
                  }}
                />
              ))}
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', borderRadius: '9px',
                background: 'rgba(187,0,0,0.10)',
                border: '1px solid rgba(187,0,0,0.25)',
                color: '#ff8080', fontSize: '13px',
                marginBottom: '14px', textAlign: 'center',
              }}>{error}</div>
            )}

            {successMsg && (
              <div style={{
                padding: '10px 14px', borderRadius: '9px',
                background: 'rgba(34,197,94,0.10)',
                border: '1px solid rgba(34,197,94,0.25)',
                color: '#4ade80', fontSize: '13px',
                marginBottom: '14px', textAlign: 'center',
              }}>{successMsg}</div>
            )}

            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.join('').length < 6}
              style={{
                width: '100%', padding: '13px',
                borderRadius: '10px', border: 'none',
                background: loading || otp.join('').length < 6 ? 'rgba(255,255,255,0.08)' : '#006600',
                color: loading || otp.join('').length < 6 ? 'rgba(255,255,255,0.30)' : '#ffffff',
                fontSize: '14px', fontWeight: '700',
                cursor: loading || otp.join('').length < 6 ? 'not-allowed' : 'pointer',
                transition: 'all 0.16s',
                marginBottom: '14px',
                boxShadow: otp.join('').length === 6 && !loading ? '0 4px 16px rgba(0,102,0,0.35)' : 'none',
              }}>
              {loading ? 'Verifying...' : 'Verify & Sign In →'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => { setStep('credentials'); setError(''); setOtp(['','','','','','']); }}
                style={{
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.35)', fontSize: '12px',
                  cursor: 'pointer', textDecoration: 'underline', padding: 0,
                }}>
                ← Back
              </button>
              <button
                onClick={handleResend}
                disabled={resending}
                style={{
                  background: 'none', border: 'none',
                  color: resending ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.45)',
                  fontSize: '12px', cursor: resending ? 'not-allowed' : 'pointer',
                  textDecoration: 'underline', padding: 0,
                }}>
                {resending ? 'Sending...' : 'Resend code'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ITLogin;
