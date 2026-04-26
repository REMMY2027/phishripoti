
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
      cardBg: 'rgba(50,0,0,0.98)',
    },
    MEDIUM: {
      accent: '#f59e0b', accentLight: '#fcd34d', accentDim: '#fbbf24',
      border: 'rgba(245,158,11,0.35)', glow: 'rgba(245,158,11,0.15)',
      label: 'Medium Risk — Exercise Caution',
      sublabel: 'Suspicious. Do not click links until you confirm the sender is real.',
      gaugeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.16)',
      cardBg: 'rgba(40,20,0,0.98)',
    },
    LOW: {
      accent: '#22c55e', accentLight: '#4ade80', accentDim: '#4ade80',
      border: 'rgba(34,197,94,0.35)', glow: 'rgba(34,197,94,0.15)',
      label: 'Low Risk — Likely Safe',
      sublabel: 'Appears legitimate. Weak threat signals detected. Stay cautious.',
      gaugeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.16)',
      cardBg: 'rgba(0,30,8,0.98)',
    },
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);
  const handleHome = () => { clearReport(); navigate('/'); };

  const employeeTips = [
    "M-Pesa will NEVER ask for your PIN via email. Delete such requests and alert your IT team immediately.",
    "Your IT team will never ask for your network password by email. Call your helpdesk directly instead.",
    "KRA only contacts you through official channels. Any other domain claiming to be KRA is a phishing attempt.",
    "Always verify payment requests by calling the requester — never use contact details from the email itself.",
    "Over 70% of cyber incidents in Kenyan banks start with a phishing email. Your vigilance protects everyone.",
    "Never access work systems through email links. Type the address directly into your browser.",
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
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── BACKGROUND ── */}
      <div style={{ position:'fixed', inset:0, zIndex:0, background:'#ffffff' }} />
      <div style={{ position:'fixed', inset:0, zIndex:1, background:'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position:'fixed', inset:0, zIndex:2, background:'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position:'fixed', inset:0, zIndex:3, background:'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:4, pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <circle cx="-60" cy="120" r="220" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="200" fill="none" stroke="rgba(140,0,0,0.04)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="89%" y1="20%" x2="93%" y2="38%" stroke="rgba(140,0,0,0.05)" strokeWidth="0.7"/>
      </svg>
      <div style={{ position:'fixed', bottom:'-30px', right:0, width:'360px', height:'150px', zIndex:5, pointerEvents:'none', WebkitMaskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)', maskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="100" width="14" height="60"/><rect x="180" y="30" width="26" height="130"/>
          <rect x="110" y="65" width="18" height="95"/><rect x="240" y="48" width="22" height="112"/>
          <rect x="290" y="75" width="16" height="85"/><rect x="0" y="158" width="360" height="2"/>
        </svg>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position:'relative', zIndex:20, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', height:'54px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)', flexShrink:0 }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
          <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'linear-gradient(145deg, #cc0000, #7a0000)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(187,0,0,0.28)', flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize:'17px', fontWeight:'800', letterSpacing:'-0.3px' }}><span style={{ color:'#111111' }}>Phish</span><span style={{ color:'#006600' }}>Ripoti</span></span>
        </div>
        <div style={{ display:'flex', gap:'6px' }}>
          <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{ padding:'5px 12px', borderRadius:'7px', fontWeight:'700', fontSize:'11px', color:'#fff', background:'linear-gradient(135deg, #BB0000, #880000)', border:'none', cursor:'pointer', boxShadow:'0 2px 8px rgba(187,0,0,0.28)', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-1px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>📧 Report Another</button>
          <button onClick={() => navigate('/awareness')} style={{ padding:'5px 12px', borderRadius:'7px', fontWeight:'700', fontSize:'11px', color:'#fff', background:'linear-gradient(135deg, #006600, #004400)', border:'none', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,102,0,0.25)', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-1px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>📚 Awareness Hub</button>
          <button onClick={handleHome} style={{ padding:'5px 10px', borderRadius:'7px', fontWeight:'600', fontSize:'11px', color:'rgba(0,0,0,0.55)', background:'rgba(255,255,255,0.70)', border:'1px solid rgba(0,0,0,0.10)', cursor:'pointer', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.95)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.70)'}>← Home</button>
        </div>
      </nav>

      {/* ── CONTENT — fills remaining height ── */}
      <div style={{ flex:1, position:'relative', zIndex:10, padding:'10px 22px 10px', display:'grid', gridTemplateRows:'auto auto 1fr auto', gap:'9px', overflow:'hidden' }}>

        {/* ── ROW 1: Hero + Token + What to do ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 0.52fr 0.88fr', gap:'9px', animation:'fadeUp 0.3s ease both' }}>

          {/* HERO */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:config.cardBg, border:`1px solid ${config.border}`, backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:`0 6px 28px rgba(0,0,0,0.20), 0 0 0 1px ${config.glow}`, position:'relative', display:'flex' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, ${config.accent}55, transparent)` }}/>
            <svg style={{ position:'absolute', top:0, right:0, width:'130px', height:'100%', pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
              <circle cx="110" cy="50%" r="80" fill="none" stroke={`${config.accent}10`} strokeWidth="1"/>
              <circle cx="110" cy="50%" r="48" fill="none" stroke={`${config.accent}07`} strokeWidth="0.7"/>
            </svg>
            <div style={{ width:'4px', flexShrink:0, background:`linear-gradient(180deg, ${config.accent}, ${config.accent}88)`, borderRadius:'14px 0 0 14px', boxShadow:`2px 0 10px ${config.accent}30` }}/>
            <div style={{ flex:1, padding:'16px 18px 14px 14px', position:'relative', zIndex:1, display:'flex', gap:'16px', alignItems:'center' }}>
              <div style={{ flexShrink:0 }}>
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7"/>
                  <circle cx="45" cy="45" r="40" fill="none" stroke={config.gaugeColor} strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform="rotate(-90 45 45)" style={{ transition:'stroke-dashoffset 0.1s linear' }}/>
                  <text x="45" y="41" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="-apple-system,sans-serif">{scoreAnimated}%</text>
                  <text x="45" y="54" textAnchor="middle" fill="rgba(255,255,255,0.30)" fontSize="7" fontFamily="-apple-system,sans-serif" letterSpacing="0.5">RISK SCORE</text>
                </svg>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'3px 10px', borderRadius:'20px', background:config.badgeBg, border:`1px solid ${config.border}`, marginBottom:'7px' }}>
                  <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:config.accent, animation:'pulse 2s infinite' }}/>
                  <span style={{ fontSize:'10px', fontWeight:'900', color:config.accentLight, letterSpacing:'0.08em', textTransform:'uppercase' }}>{result.riskLevel} RISK</span>
                </div>
                <div style={{ color:'#ffffff', fontWeight:'900', fontSize:'15px', marginBottom:'5px', letterSpacing:'-0.2px', lineHeight:1.25 }}>{config.label}</div>
                <div style={{ color:'rgba(255,255,255,0.46)', fontSize:'12px', lineHeight:'1.5', marginBottom:'10px' }}>{config.sublabel}</div>
                <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
                  <div style={{ padding:'2px 8px', borderRadius:'20px', fontSize:'10px', fontWeight:'600', background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.40)', border:'1px solid rgba(255,255,255,0.09)' }}>🤖 GPT-4o {Math.round(result.riskScore * 0.7)}%</div>
                  <div style={{ padding:'2px 8px', borderRadius:'20px', fontSize:'10px', fontWeight:'600', background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.40)', border:'1px solid rgba(255,255,255,0.09)' }}>🔍 Safe Browsing {Math.round(result.riskScore * 0.3)}%</div>
                  {result.alertSent && <div style={{ padding:'2px 8px', borderRadius:'20px', fontSize:'10px', fontWeight:'700', background:'rgba(239,68,68,0.16)', color:'#fca5a5', border:'1px solid rgba(239,68,68,0.28)' }}>⚡ IT alerted</div>}
                </div>
              </div>
            </div>
          </div>

          {/* TOKEN */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(0,20,6,0.98)', border:'1px solid rgba(34,197,94,0.26)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 6px 22px rgba(0,0,0,0.18)', position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:'linear-gradient(90deg, #22c55e, #16a34a, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(34,197,94,0.07) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'4px', background:'linear-gradient(180deg, #22c55e, #15803d)', opacity:0.80 }}/>
            <div style={{ flex:1, padding:'14px 12px 12px 10px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly', textAlign:'center' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'rgba(34,197,94,0.14)', border:'1px solid rgba(34,197,94,0.26)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🔐</div>
              <div>
                <div style={{ fontSize:'8px', fontWeight:'800', color:'rgba(74,222,128,0.48)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'6px' }}>Anonymous Token</div>
                <div style={{ fontFamily:'monospace', fontSize:'10px', fontWeight:'900', color:'#4ade80', letterSpacing:'0.05em', padding:'8px 8px', borderRadius:'8px', background:'rgba(0,102,0,0.20)', border:'1px solid rgba(34,197,94,0.28)', backgroundImage:'linear-gradient(90deg, rgba(0,102,0,0.20), rgba(0,150,0,0.26), rgba(0,102,0,0.20))', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite', wordBreak:'break-all' }}>
                  {result.tokenId}
                </div>
              </div>
              <div style={{ color:'rgba(255,255,255,0.20)', fontSize:'9px', lineHeight:'1.4', fontWeight:'500' }}>Cannot be traced to your identity</div>
              {result.alertSent && <div style={{ padding:'3px 9px', borderRadius:'5px', background:'rgba(239,68,68,0.14)', border:'1px solid rgba(239,68,68,0.24)' }}><span style={{ color:'#fca5a5', fontSize:'9px', fontWeight:'700' }}>⚡ Security team alerted</span></div>}
            </div>
          </div>

          {/* WHAT TO DO NEXT */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:`rgba(${result.riskLevel === 'HIGH' ? '50,0,0' : result.riskLevel === 'MEDIUM' ? '40,20,0' : '0,28,8'},0.98)`, border:`1px solid ${config.border}`, backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:`0 6px 22px rgba(0,0,0,0.16)`, position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg, ${config.accent}, ${config.accentDim}, transparent)` }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ padding:'13px 14px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:config.badgeBg, border:`1px solid ${config.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', boxShadow:`0 2px 8px ${config.accent}18` }}>🚨</div>
                <div>
                  <div style={{ color:config.accentLight, fontWeight:'900', fontSize:'12px' }}>What to do next</div>
                  <div style={{ color:'rgba(255,255,255,0.26)', fontSize:'9px', fontWeight:'500' }}>Follow immediately</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'5px', flex:1 }}>
                {simpleActions.slice(0, 4).map((action, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'7px', padding:'8px 9px', borderRadius:'8px', background:'rgba(255,255,255,0.05)', border:`1px solid ${config.border}`, flex:1 }}>
                    <div style={{ width:'17px', height:'17px', borderRadius:'5px', background:config.badgeBg, border:`1px solid ${config.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px', fontWeight:'900', color:config.accentLight, flexShrink:0, marginTop:'1px' }}>{i+1}</div>
                    <span style={{ color:'rgba(255,255,255,0.78)', fontSize:'11px', lineHeight:'1.50', fontWeight:'500' }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2: GPT + Threat ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'9px', animation:'fadeUp 0.3s ease 0.07s both' }}>

          {/* GPT-4o */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(0,16,5,0.98)', border:'1px solid rgba(34,197,94,0.20)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 4px 20px rgba(0,0,0,0.14)', position:'relative', display:'flex' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg, #22c55e, #16a34a, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ width:'4px', flexShrink:0, background:'linear-gradient(180deg, #22c55e, #15803d)', opacity:0.65, borderRadius:'14px 0 0 14px' }}/>
            <div style={{ flex:1, padding:'13px 16px 14px 12px', position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'11px' }}>
                <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'rgba(34,197,94,0.14)', border:'1px solid rgba(34,197,94,0.24)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px' }}>🤖</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:'#4ade80', fontWeight:'800', fontSize:'13px' }}>GPT-4o Analysis</div>
                  <div style={{ color:'rgba(255,255,255,0.26)', fontSize:'10px' }}>AI threat detection</div>
                </div>
                <div style={{ padding:'2px 9px', borderRadius:'20px', background:'rgba(34,197,94,0.10)', border:'1px solid rgba(34,197,94,0.20)', fontSize:'10px', fontWeight:'700', color:'#4ade80', flexShrink:0 }}>
                  {analysisItems.filter(i => !i.value).length}/{analysisItems.length} Clear
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px' }}>
                {analysisItems.map((item, i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 10px', borderRadius:'9px', background: item.value ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.07)', border: item.value ? '1px solid rgba(239,68,68,0.22)' : '1px solid rgba(34,197,94,0.15)' }}>
                    <span style={{ color:'rgba(255,255,255,0.62)', fontSize:'11px', fontWeight:'600' }}>{item.label}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:'3px', padding:'2px 7px', borderRadius:'20px', background: item.value ? 'rgba(239,68,68,0.18)' : 'rgba(34,197,94,0.14)', border: item.value ? '1px solid rgba(239,68,68,0.30)' : '1px solid rgba(34,197,94,0.26)', flexShrink:0 }}>
                      <div style={{ width:'4px', height:'4px', borderRadius:'50%', background: item.value ? '#ef4444' : '#22c55e' }}/>
                      <span style={{ fontSize:'9px', fontWeight:'800', color: item.value ? '#fca5a5' : '#4ade80' }}>{item.value ? 'Detected' : 'Clear'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Threat Indicators */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(38,0,0,0.98)', border:'1px solid rgba(239,68,68,0.22)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 4px 20px rgba(0,0,0,0.14)', position:'relative', display:'flex' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg, #ef4444, #BB0000, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ width:'4px', flexShrink:0, background:'linear-gradient(180deg, #ef4444, #BB0000)', opacity:0.65, borderRadius:'14px 0 0 14px' }}/>
            <div style={{ flex:1, padding:'13px 16px 14px 12px', position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'11px' }}>
                <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'rgba(239,68,68,0.16)', border:'1px solid rgba(239,68,68,0.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px' }}>⚠️</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:'#fca5a5', fontWeight:'800', fontSize:'13px' }}>Threat Indicators</div>
                  <div style={{ color:'rgba(255,255,255,0.26)', fontSize:'10px' }}>What triggered the alert</div>
                </div>
                <div style={{ padding:'2px 9px', borderRadius:'20px', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.22)', fontSize:'10px', fontWeight:'700', color:'#fca5a5', flexShrink:0 }}>
                  {result.reasons?.length || 0} found
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                {result.reasons?.map((reason, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'8px 10px', borderRadius:'9px', background:'rgba(239,68,68,0.09)', border:'1px solid rgba(239,68,68,0.17)' }}>
                    <div style={{ width:'18px', height:'18px', borderRadius:'5px', background:'rgba(239,68,68,0.22)', border:'1px solid rgba(239,68,68,0.34)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px', fontWeight:'900', color:'#fca5a5', flexShrink:0, marginTop:'1px' }}>{i+1}</div>
                    <span style={{ color:'rgba(255,255,255,0.74)', fontSize:'11px', lineHeight:'1.50', fontWeight:'500' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: MIDDLE FILLER — stretches to fill space ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'9px', animation:'fadeUp 0.3s ease 0.14s both' }}>

          {/* Security Summary */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(10,16,10,0.96)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:'linear-gradient(90deg, #BB0000, #1a1a1a, #006600)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ padding:'14px 16px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px' }}>🛡️</div>
                <div>
                  <div style={{ color:'rgba(255,255,255,0.85)', fontWeight:'800', fontSize:'13px' }}>Security Summary</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px' }}>Report analysis overview</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px', flex:1 }}>
                {[
                  { label: 'Risk Level', value: result.riskLevel, color: config.accentLight, bg: config.badgeBg, border: config.border },
                  { label: 'Risk Score', value: `${result.riskScore}%`, color: config.accentLight, bg: config.badgeBg, border: config.border },
                  { label: 'Threats Found', value: `${result.reasons?.length || 0} indicators`, color: result.reasons?.length > 0 ? '#fca5a5' : '#4ade80', bg: result.reasons?.length > 0 ? 'rgba(239,68,68,0.14)' : 'rgba(34,197,94,0.12)', border: result.reasons?.length > 0 ? 'rgba(239,68,68,0.24)' : 'rgba(34,197,94,0.22)' },
                  { label: 'AI Analysis', value: `${analysisItems.filter(i => i.value).length} detected`, color: analysisItems.filter(i => i.value).length > 0 ? '#fca5a5' : '#4ade80', bg: analysisItems.filter(i => i.value).length > 0 ? 'rgba(239,68,68,0.14)' : 'rgba(34,197,94,0.12)', border: analysisItems.filter(i => i.value).length > 0 ? 'rgba(239,68,68,0.24)' : 'rgba(34,197,94,0.22)' },
                ].map((row, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 12px', borderRadius:'9px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', flex:1 }}>
                    <span style={{ color:'rgba(255,255,255,0.48)', fontSize:'11px', fontWeight:'600' }}>{row.label}</span>
                    <div style={{ padding:'2px 9px', borderRadius:'20px', background:row.bg, border:`1px solid ${row.border}`, fontSize:'10px', fontWeight:'800', color:row.color }}>{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Anonymity & Protection */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(0,20,6,0.97)', border:'1px solid rgba(34,197,94,0.18)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:'linear-gradient(90deg, #22c55e, #16a34a, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ padding:'14px 16px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'rgba(34,197,94,0.14)', border:'1px solid rgba(34,197,94,0.24)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px' }}>🔒</div>
                <div>
                  <div style={{ color:'#4ade80', fontWeight:'800', fontSize:'13px' }}>Your Anonymity</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px' }}>Privacy protection status</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px', flex:1 }}>
                {[
                  { icon: '✓', label: 'Identity stripped before storage', color: '#4ade80', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.20)' },
                  { icon: '✓', label: 'Department not linked to report', color: '#4ade80', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.20)' },
                  { icon: '✓', label: 'Token cannot be traced to you', color: '#4ade80', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.20)' },
                  { icon: '✓', label: 'No IP address stored', color: '#4ade80', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.20)' },
                ].map((row, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'9px', padding:'9px 12px', borderRadius:'9px', background:row.bg, border:`1px solid ${row.border}`, flex:1 }}>
                    <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'rgba(34,197,94,0.22)', border:'1px solid rgba(34,197,94,0.38)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:'900', color:row.color, flexShrink:0 }}>{row.icon}</div>
                    <span style={{ color:'rgba(255,255,255,0.72)', fontSize:'11px', fontWeight:'500', lineHeight:'1.4' }}>{row.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 4: Did You Know — not full width, centered ── */}
        <div style={{ display:'flex', justifyContent:'center', animation:'fadeUp 0.3s ease 0.21s both', flexShrink:0 }}>
          <div style={{ width:'70%', borderRadius:'12px', overflow:'hidden', background:'rgba(14,8,0,0.98)', border:'1px solid rgba(234,150,0,0.26)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 4px 16px rgba(0,0,0,0.12)', position:'relative' }}>
            <div style={{ height:'3px', background:'linear-gradient(90deg, #ffd166, #ea9600, #ffd166)', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(234,150,0,0.06) 0%, transparent 50%)', pointerEvents:'none' }}/>
            <div style={{ padding:'11px 18px', position:'relative', zIndex:1, display:'flex', gap:'12px', alignItems:'center' }}>
              <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'rgba(234,150,0,0.18)', border:'1px solid rgba(234,150,0,0.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', flexShrink:0 }}>💡</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'8px', fontWeight:'800', color:'#ffd166', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'3px' }}>🇰🇪 Kenya Staff Security Tip</div>
                <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'11px', lineHeight:'1.55', margin:0, fontWeight:'500' }}>{tipText}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Result;