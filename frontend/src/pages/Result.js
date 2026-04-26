import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';

const Result = () => {
  const navigate = useNavigate();
  const { result, clearReport } = useReport();
  const { showToast } = useToast();
  const [scoreAnimated, setScoreAnimated] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setTimeout(() => setVisible(true), 100);
      if (result.riskLevel === 'HIGH') showToast('HIGH risk detected — security team notified anonymously', 'error');
      else if (result.riskLevel === 'MEDIUM') showToast('MEDIUM risk — exercise caution with this email', 'warning');
      else showToast('Report submitted successfully', 'success');
      let current = 0;
      const target = result.riskScore;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { setScoreAnimated(target); clearInterval(timer); }
        else setScoreAnimated(Math.round(current));
      }, 30);
      return () => clearInterval(timer);
    }
  }, []); // eslint-disable-line

  if (!result) { navigate('/'); return null; }

  const riskConfig = {
    HIGH: {
      accent: '#ef4444', accentLight: '#fca5a5', accentDim: '#ff6666',
      border: 'rgba(239,68,68,0.35)', glow: 'rgba(239,68,68,0.15)',
      label: 'High Risk Phishing Detected',
      sublabel: 'Dangerous. Delete immediately — do not click links or open attachments.',
      gaugeColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.16)',
      cardBg: 'rgba(50,0,0,0.98)', headerBg: 'rgba(70,0,0,1)',
    },
    MEDIUM: {
      accent: '#f59e0b', accentLight: '#fcd34d', accentDim: '#fbbf24',
      border: 'rgba(245,158,11,0.35)', glow: 'rgba(245,158,11,0.15)',
      label: 'Medium Risk — Exercise Caution',
      sublabel: 'Suspicious. Do not click links until you confirm the sender is real.',
      gaugeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.16)',
      cardBg: 'rgba(40,20,0,0.98)', headerBg: 'rgba(55,28,0,1)',
    },
    LOW: {
      accent: '#22c55e', accentLight: '#4ade80', accentDim: '#4ade80',
      border: 'rgba(34,197,94,0.35)', glow: 'rgba(34,197,94,0.15)',
      label: 'Low Risk — Likely Safe',
      sublabel: 'Appears legitimate. Weak threat signals detected. Stay cautious.',
      gaugeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.16)',
      cardBg: 'rgba(0,30,8,0.98)', headerBg: 'rgba(0,42,10,1)',
    },
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);
  const handleHome = () => { clearReport(); navigate('/'); };

  const employeeTips = [
    "As a bank employee, M-Pesa will NEVER ask for your PIN via email. Delete such requests and alert your IT team.",
    "Your IT team will never ask for your network password by email. Call your helpdesk directly instead.",
    "KRA only contacts you through official channels. Any other domain claiming to be KRA is a phishing attempt.",
    "Always verify payment requests by calling the requester — never use contact details from the email itself.",
    "Over 70% of cyber incidents in Kenyan banks start with a phishing email. Your vigilance protects everyone.",
    "Never access your work systems through email links. Type the address directly into your browser.",
  ];

  const tipText = result.didYouKnow
    ? `${result.didYouKnow} Always verify unexpected requests through official channels.`
    : employeeTips[Math.floor(Math.random() * employeeTips.length)];

  const simpleActions = result.recommendedActions?.map(a => {
    const l = a.toLowerCase();
    if (l.includes('delete') || l.includes('remove')) return 'Delete this email from your inbox right now.';
    if (l.includes('report') || l.includes('forward')) return 'Forward the email to your IT security team.';
    if (l.includes('link') || l.includes('click')) return 'Do not click any links in this email.';
    if (l.includes('credential') || l.includes('password')) return 'Change your work password immediately.';
    if (l.includes('attachment') || l.includes('file')) return 'Do not open any attachments from this email.';
    if (l.includes('verify') || l.includes('confirm')) return 'Call the sender on the official number — not from the email.';
    return a;
  }) || [
    'Delete this email from your inbox immediately.',
    'Do not click any links or open any attachments.',
    'Alert your IT security team about this email.',
    'If you clicked anything, change your work passwords now.',
  ];

  const analysisItems = [
    { label: 'Domain spoofing', value: result.aiAnalysis?.domainSpoofing },
    { label: 'Urgency language', value: result.aiAnalysis?.urgencyLanguage },
    { label: 'Credential harvesting', value: result.aiAnalysis?.credentialHarvesting },
    { label: 'M-Pesa abuse signals', value: result.aiAnalysis?.mpesaAbuse },
  ];

  return (
    <div style={{
      minHeight: '100vh', height: '100vh',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>
      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.55}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* ── BACKGROUND ── */}
      <div style={{ position:'fixed', inset:0, zIndex:0, background:'#ffffff' }} />
      <div style={{ position:'fixed', inset:0, zIndex:1, background:'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position:'fixed', inset:0, zIndex:2, background:'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position:'fixed', inset:0, zIndex:3, background:'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:4, pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <path d="M -100 450 Q 250 330 600 460 T 1200 400" fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="89%" y1="20%" x2="93%" y2="38%" stroke="rgba(140,0,0,0.05)" strokeWidth="0.7"/>
      </svg>
      <div style={{ position:'fixed', bottom:'-30px', right:0, width:'400px', height:'160px', zIndex:5, pointerEvents:'none', WebkitMaskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)', maskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="120" width="14" height="60"/><rect x="200" y="40" width="28" height="140"/>
          <rect x="130" y="80" width="20" height="100"/><rect x="260" y="60" width="24" height="120"/>
          <rect x="320" y="90" width="18" height="90"/><rect x="0" y="178" width="400" height="2"/>
        </svg>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position:'relative', zIndex:20, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', height:'58px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)', flexShrink:0 }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:'linear-gradient(145deg, #cc0000, #7a0000)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(187,0,0,0.28)', flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize:'18px', fontWeight:'800', letterSpacing:'-0.3px' }}><span style={{ color:'#111111' }}>Phish</span><span style={{ color:'#006600' }}>Ripoti</span></span>
        </div>
        <div style={{ display:'flex', gap:'7px' }}>
          <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{ padding:'6px 14px', borderRadius:'8px', fontWeight:'700', fontSize:'12px', color:'#fff', background:'linear-gradient(135deg, #BB0000, #880000)', border:'none', cursor:'pointer', boxShadow:'0 2px 8px rgba(187,0,0,0.28)', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-1px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>📧 Report Another</button>
          <button onClick={() => navigate('/awareness')} style={{ padding:'6px 14px', borderRadius:'8px', fontWeight:'700', fontSize:'12px', color:'#fff', background:'linear-gradient(135deg, #006600, #004400)', border:'none', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,102,0,0.25)', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-1px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>📚 Awareness Hub</button>
          <button onClick={handleHome} style={{ padding:'6px 12px', borderRadius:'8px', fontWeight:'600', fontSize:'12px', color:'rgba(0,0,0,0.55)', background:'rgba(255,255,255,0.70)', border:'1px solid rgba(0,0,0,0.10)', cursor:'pointer', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.95)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.70)'}>← Home</button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1, position:'relative', zIndex:10, padding:'14px 28px 14px', display:'flex', flexDirection:'column', gap:'11px', overflow:'hidden' }}>

        {/* ── ROW 1: Hero + Token + What to do (3 cols) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 0.65fr 0.95fr', gap:'11px', animation:'fadeUp 0.35s ease both' }}>

          {/* HERO — Risk banner */}
          <div style={{ borderRadius:'16px', overflow:'hidden', background:config.cardBg, border:`1px solid ${config.border}`, backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:`0 8px 32px rgba(0,0,0,0.22), 0 0 0 1px ${config.glow}`, position:'relative', display:'flex' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, ${config.accent}55, transparent)` }}/>
            {/* Abstract circles */}
            <svg style={{ position:'absolute', top:0, right:0, width:'140px', height:'100%', pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="50%" r="90" fill="none" stroke={`${config.accent}10`} strokeWidth="1"/>
              <circle cx="120" cy="50%" r="55" fill="none" stroke={`${config.accent}07`} strokeWidth="0.7"/>
            </svg>
            <div style={{ width:'5px', flexShrink:0, background:`linear-gradient(180deg, ${config.accent}, ${config.accent}88)`, borderRadius:'16px 0 0 16px', boxShadow:`2px 0 12px ${config.accent}35` }}/>
            <div style={{ flex:1, padding:'18px 20px 16px 16px', position:'relative', zIndex:1, display:'flex', gap:'18px', alignItems:'center' }}>
              {/* Gauge */}
              <div style={{ flexShrink:0 }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="44" fill="none" stroke={config.gaugeColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform="rotate(-90 50 50)" style={{ transition:'stroke-dashoffset 0.1s linear' }}/>
                  <circle cx="50" cy="50" r="36" fill="none" stroke={config.gaugeColor} strokeWidth="0.8" opacity="0.15"/>
                  <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="-apple-system,sans-serif">{scoreAnimated}%</text>
                  <text x="50" y="60" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontSize="8" fontFamily="-apple-system,sans-serif" letterSpacing="0.5">RISK SCORE</text>
                </svg>
              </div>
              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'3px 11px', borderRadius:'20px', background:config.badgeBg, border:`1px solid ${config.border}`, marginBottom:'8px' }}>
                  <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:config.accent, animation:'pulse 2s infinite' }}/>
                  <span style={{ fontSize:'10px', fontWeight:'900', color:config.accentLight, letterSpacing:'0.08em', textTransform:'uppercase' }}>{result.riskLevel} RISK</span>
                </div>
                <div style={{ color:'#ffffff', fontWeight:'900', fontSize:'16px', marginBottom:'5px', letterSpacing:'-0.3px', lineHeight:1.3 }}>{config.label}</div>
                <div style={{ color:'rgba(255,255,255,0.48)', fontSize:'12px', lineHeight:'1.55', marginBottom:'11px' }}>{config.sublabel}</div>
                <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                  <div style={{ padding:'3px 9px', borderRadius:'20px', fontSize:'10px', fontWeight:'600', background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.42)', border:'1px solid rgba(255,255,255,0.09)' }}>🤖 GPT-4o {Math.round(result.riskScore * 0.7)}%</div>
                  <div style={{ padding:'3px 9px', borderRadius:'20px', fontSize:'10px', fontWeight:'600', background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.42)', border:'1px solid rgba(255,255,255,0.09)' }}>🔍 Safe Browsing {Math.round(result.riskScore * 0.3)}%</div>
                  {result.alertSent && <div style={{ padding:'3px 9px', borderRadius:'20px', fontSize:'10px', fontWeight:'700', background:'rgba(239,68,68,0.16)', color:'#fca5a5', border:'1px solid rgba(239,68,68,0.28)' }}>⚡ IT team alerted</div>}
                </div>
              </div>
            </div>
          </div>

          {/* TOKEN */}
          <div style={{ borderRadius:'16px', overflow:'hidden', background:'rgba(0,22,6,0.98)', border:'1px solid rgba(34,197,94,0.28)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 6px 24px rgba(0,0,0,0.20)', position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:'linear-gradient(90deg, #22c55e, #16a34a, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'4px', background:'linear-gradient(180deg, #22c55e, #15803d)', opacity:0.80, borderRadius:'0' }}/>
            <div style={{ flex:1, padding:'16px 14px 14px 12px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap:'8px' }}>
              <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:'rgba(34,197,94,0.14)', border:'1px solid rgba(34,197,94,0.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>🔐</div>
              <div style={{ fontSize:'9px', fontWeight:'800', color:'rgba(74,222,128,0.50)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Anonymous Token</div>
              <div style={{ fontFamily:'monospace', fontSize:'11px', fontWeight:'900', color:'#4ade80', letterSpacing:'0.06em', padding:'9px 10px', borderRadius:'9px', background:'rgba(0,102,0,0.20)', border:'1px solid rgba(34,197,94,0.30)', width:'100%', boxSizing:'border-box', backgroundImage:'linear-gradient(90deg, rgba(0,102,0,0.20), rgba(0,150,0,0.28), rgba(0,102,0,0.20))', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite', wordBreak:'break-all' }}>
                {result.tokenId}
              </div>
              <div style={{ color:'rgba(255,255,255,0.22)', fontSize:'10px', lineHeight:'1.45', fontWeight:'500' }}>Cannot be traced to your identity</div>
              {result.alertSent && <div style={{ padding:'3px 10px', borderRadius:'6px', background:'rgba(239,68,68,0.14)', border:'1px solid rgba(239,68,68,0.25)', marginTop:'2px' }}><span style={{ color:'#fca5a5', fontSize:'10px', fontWeight:'700' }}>⚡ Security team alerted</span></div>}
            </div>
          </div>

          {/* WHAT TO DO NEXT */}
          <div style={{ borderRadius:'16px', overflow:'hidden', background:`rgba(${result.riskLevel === 'HIGH' ? '50,0,0' : result.riskLevel === 'MEDIUM' ? '40,20,0' : '0,30,8'},0.98)`, border:`1px solid ${config.border}`, backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:`0 6px 24px rgba(0,0,0,0.18)`, position:'relative' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg, ${config.accent}, ${config.accentDim}, transparent)` }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ padding:'14px 15px', position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'11px' }}>
                <div style={{ width:'30px', height:'30px', borderRadius:'9px', background:config.badgeBg, border:`1px solid ${config.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px', boxShadow:`0 2px 10px ${config.accent}20` }}>🚨</div>
                <div>
                  <div style={{ color:config.accentLight, fontWeight:'900', fontSize:'13px', letterSpacing:'-0.1px' }}>What to do next</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px', fontWeight:'500' }}>Follow immediately</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                {simpleActions.slice(0, 4).map((action, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'9px 10px', borderRadius:'9px', background:'rgba(255,255,255,0.05)', border:`1px solid ${config.border}` }}>
                    <div style={{ width:'19px', height:'19px', borderRadius:'6px', background:config.badgeBg, border:`1px solid ${config.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:'900', color:config.accentLight, flexShrink:0, marginTop:'1px', boxShadow:`0 1px 6px ${config.accent}18` }}>{i+1}</div>
                    <span style={{ color:'rgba(255,255,255,0.80)', fontSize:'11px', lineHeight:'1.55', fontWeight:'500' }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2: GPT (left) + Threat (right, narrower) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'11px', animation:'fadeUp 0.35s ease 0.08s both' }}>

          {/* GPT-4o Analysis — green themed */}
          <div style={{ borderRadius:'16px', overflow:'hidden', background:'rgba(0,18,5,0.98)', border:'1px solid rgba(34,197,94,0.20)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 6px 24px rgba(0,0,0,0.16)', position:'relative', display:'flex' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg, #22c55e, #16a34a, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ width:'4px', flexShrink:0, background:'linear-gradient(180deg, #22c55e, #15803d)', opacity:0.70, borderRadius:'16px 0 0 16px' }}/>
            <div style={{ flex:1, padding:'15px 18px 16px 14px', position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'13px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'rgba(34,197,94,0.14)', border:'1px solid rgba(34,197,94,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>🤖</div>
                <div>
                  <div style={{ color:'#4ade80', fontWeight:'800', fontSize:'13px' }}>GPT-4o Analysis</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px', fontWeight:'500' }}>AI threat detection results</div>
                </div>
                {/* Summary indicator */}
                <div style={{ marginLeft:'auto', padding:'3px 10px', borderRadius:'20px', background:'rgba(34,197,94,0.10)', border:'1px solid rgba(34,197,94,0.20)', fontSize:'10px', fontWeight:'700', color:'#4ade80' }}>
                  {analysisItems.filter(i => !i.value).length}/{analysisItems.length} Clear
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px' }}>
                {analysisItems.map((item, i) => (
                  <div key={i} style={{
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'9px 12px', borderRadius:'10px',
                    background: item.value ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.07)',
                    border: item.value ? '1px solid rgba(239,68,68,0.22)' : '1px solid rgba(34,197,94,0.16)',
                    boxShadow: item.value ? '0 2px 10px rgba(239,68,68,0.10)' : '0 2px 10px rgba(34,197,94,0.06)',
                  }}>
                    <span style={{ color:'rgba(255,255,255,0.65)', fontSize:'11px', fontWeight:'600' }}>{item.label}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:'4px', padding:'2px 8px', borderRadius:'20px', background: item.value ? 'rgba(239,68,68,0.18)' : 'rgba(34,197,94,0.14)', border: item.value ? '1px solid rgba(239,68,68,0.30)' : '1px solid rgba(34,197,94,0.28)', flexShrink:0 }}>
                      <div style={{ width:'4px', height:'4px', borderRadius:'50%', background: item.value ? '#ef4444' : '#22c55e' }}/>
                      <span style={{ fontSize:'10px', fontWeight:'800', color: item.value ? '#fca5a5' : '#4ade80' }}>{item.value ? 'Detected' : 'Clear'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Threat Indicators — red themed */}
          <div style={{ borderRadius:'16px', overflow:'hidden', background:'rgba(40,0,0,0.98)', border:'1px solid rgba(239,68,68,0.22)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 6px 24px rgba(0,0,0,0.16)', position:'relative', display:'flex' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg, #ef4444, #BB0000, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(239,68,68,0.07) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ width:'4px', flexShrink:0, background:'linear-gradient(180deg, #ef4444, #BB0000)', opacity:0.70, borderRadius:'16px 0 0 16px' }}/>
            <div style={{ flex:1, padding:'15px 18px 16px 14px', position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'13px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'rgba(239,68,68,0.16)', border:'1px solid rgba(239,68,68,0.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>⚠️</div>
                <div>
                  <div style={{ color:'#fca5a5', fontWeight:'800', fontSize:'13px' }}>Threat Indicators</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px', fontWeight:'500' }}>What triggered the alert</div>
                </div>
                <div style={{ marginLeft:'auto', padding:'3px 10px', borderRadius:'20px', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.22)', fontSize:'10px', fontWeight:'700', color:'#fca5a5' }}>
                  {result.reasons?.length || 0} found
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
                {result.reasons?.map((reason, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'9px', padding:'9px 12px', borderRadius:'10px', background:'rgba(239,68,68,0.09)', border:'1px solid rgba(239,68,68,0.18)', boxShadow:'0 2px 10px rgba(239,68,68,0.08)' }}>
                    <div style={{ width:'20px', height:'20px', borderRadius:'6px', background:'rgba(239,68,68,0.22)', border:'1px solid rgba(239,68,68,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:'900', color:'#fca5a5', flexShrink:0, marginTop:'1px', boxShadow:'0 1px 6px rgba(239,68,68,0.20)' }}>{i+1}</div>
                    <span style={{ color:'rgba(255,255,255,0.75)', fontSize:'11px', lineHeight:'1.55', fontWeight:'500' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Did You Know — full width amber ── */}
        <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(16,9,0,0.98)', border:'1px solid rgba(234,150,0,0.28)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 4px 18px rgba(0,0,0,0.14)', position:'relative', flexShrink:0, animation:'fadeUp 0.35s ease 0.16s both' }}>
          <div style={{ height:'3px', background:'linear-gradient(90deg, #ffd166, #ea9600, #ffd166)', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(234,150,0,0.07) 0%, transparent 50%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, rgba(234,150,0,0.40), transparent)' }}/>
          <div style={{ padding:'12px 20px', position:'relative', zIndex:1, display:'flex', gap:'14px', alignItems:'center' }}>
            <div style={{ width:'34px', height:'34px', borderRadius:'10px', background:'rgba(234,150,0,0.18)', border:'1px solid rgba(234,150,0,0.30)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0, boxShadow:'0 2px 10px rgba(234,150,0,0.18)' }}>💡</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'9px', fontWeight:'800', color:'#ffd166', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'3px' }}>🇰🇪 Did You Know? — Kenya Staff Security Tip</div>
              <p style={{ color:'rgba(255,255,255,0.80)', fontSize:'12px', lineHeight:'1.60', margin:0, fontWeight:'500' }}>{tipText}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Result;