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
      border: 'rgba(239,68,68,0.35)', glow: 'rgba(239,68,68,0.20)',
      label: 'High Risk Phishing Detected',
      sublabel: 'This email is dangerous. Delete it immediately and do not click any links or open attachments.',
      gaugeColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.18)',
      cardBg: 'rgba(45,0,0,0.99)', heroBg: 'rgba(55,0,0,0.99)',
    },
    MEDIUM: {
      accent: '#f59e0b', accentLight: '#fcd34d', accentDim: '#fbbf24',
      border: 'rgba(245,158,11,0.35)', glow: 'rgba(245,158,11,0.18)',
      label: 'Medium Risk — Exercise Caution',
      sublabel: 'This email looks suspicious. Do not click any links until you have confirmed the sender is legitimate.',
      gaugeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.18)',
      cardBg: 'rgba(38,18,0,0.99)', heroBg: 'rgba(48,22,0,0.99)',
    },
    LOW: {
      accent: '#22c55e', accentLight: '#4ade80', accentDim: '#4ade80',
      border: 'rgba(34,197,94,0.35)', glow: 'rgba(34,197,94,0.18)',
      label: 'Low Risk — Likely Safe',
      sublabel: 'This email shows weak threat signals and appears legitimate. Stay vigilant and verify if unsure.',
      gaugeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.18)',
      cardBg: 'rgba(0,28,8,0.99)', heroBg: 'rgba(0,36,10,0.99)',
    },
  };

  const config = riskConfig[result.riskLevel] || riskConfig.LOW;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference * (1 - scoreAnimated / 100);
  const handleHome = () => { clearReport(); navigate('/'); };

  const employeeTips = [
    "M-Pesa will NEVER ask for your PIN via email. If you receive such a request at work, delete it and alert your IT team immediately — this is a phishing attempt targeting bank employees.",
    "Your institution's IT team will never ask for your network password by email. Call your IT helpdesk directly using the internal number — never respond to such emails.",
    "KRA only contacts you through official channels at @kra.go.ke. Any email from a different domain claiming to be KRA asking you to click a link is a phishing attempt.",
    "As a finance or operations employee, always verify payment requests by calling the requester directly — never use any contact details found inside the email itself.",
    "Over 70% of cyber incidents in Kenyan financial institutions start with a phishing email to a staff member. Your vigilance today protects your colleagues and customers.",
    "Never access your work systems or M-Pesa business accounts through links in emails. Always type the address directly into your browser or use official saved bookmarks.",
  ];

  const tipText = result.didYouKnow
    ? `${result.didYouKnow} As a bank employee, always verify unexpected requests through official channels.`
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
    <div style={{ minHeight:'100vh', height:'100vh', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', opacity:visible?1:0, transition:'opacity 0.5s ease' }}>
      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.55}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
      `}</style>

      {/* BG */}
      <div style={{ position:'fixed', inset:0, zIndex:0, background:'#ffffff' }} />
      <div style={{ position:'fixed', inset:0, zIndex:1, background:'radial-gradient(ellipse 70% 65% at 50% 42%, rgba(248,250,248,1) 0%, rgba(244,246,244,0.95) 40%, rgba(236,240,236,0.80) 70%, rgba(220,226,220,0.50) 100%)' }} />
      <div style={{ position:'fixed', inset:0, zIndex:2, background:'linear-gradient(180deg, rgba(0,60,10,0.04) 0%, transparent 25%)' }} />
      <div style={{ position:'fixed', inset:0, zIndex:3, background:'linear-gradient(0deg, rgba(100,0,0,0.04) 0%, transparent 25%)' }} />
      <svg style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:4, pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 300 Q 200 180 500 320 T 1100 280" fill="none" stroke="rgba(0,100,30,0.04)" strokeWidth="1.5"/>
        <path d="M -100 500 Q 300 380 700 500 T 1400 460" fill="none" stroke="rgba(0,80,20,0.03)" strokeWidth="1"/>
        <circle cx="-60" cy="120" r="240" fill="none" stroke="rgba(0,100,30,0.035)" strokeWidth="1"/>
        <circle cx="110%" cy="85%" r="220" fill="none" stroke="rgba(140,0,0,0.035)" strokeWidth="1"/>
        <circle cx="8%" cy="22%" r="2.5" fill="rgba(0,100,30,0.08)"/>
        <circle cx="89%" cy="20%" r="2.5" fill="rgba(140,0,0,0.08)"/>
        <line x1="8%" y1="22%" x2="13%" y2="42%" stroke="rgba(0,100,30,0.05)" strokeWidth="0.7"/>
        <line x1="89%" y1="20%" x2="93%" y2="38%" stroke="rgba(140,0,0,0.05)" strokeWidth="0.7"/>
      </svg>
      <div style={{ position:'fixed', bottom:'-20px', right:0, width:'340px', height:'140px', zIndex:5, pointerEvents:'none', WebkitMaskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 35%, #000 100%)', maskImage:'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 35%, #000 100%)' }}>
        <svg width="100%" height="100%" viewBox="0 0 340 140" xmlns="http://www.w3.org/2000/svg" fill="#1a2a1a" opacity="0.07">
          <rect x="20" y="90" width="13" height="50"/><rect x="170" y="25" width="24" height="115"/>
          <rect x="100" y="58" width="17" height="82"/><rect x="225" y="42" width="20" height="98"/>
          <rect x="272" y="68" width="15" height="72"/><rect x="0" y="138" width="340" height="2"/>
        </svg>
      </div>

      {/* NAVBAR */}
      <nav style={{ position:'relative', zIndex:20, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', height:'52px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)', flexShrink:0 }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg, #BB0000 0%, #BB0000 33.33%, #1a1a1a 33.33%, #1a1a1a 66.66%, #006600 66.66%, #006600 100%)' }} />
        <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
          <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'linear-gradient(145deg, #cc0000, #7a0000)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(187,0,0,0.28)', flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/></svg>
          </div>
          <span style={{ fontSize:'17px', fontWeight:'800', letterSpacing:'-0.3px' }}><span style={{ color:'#111111' }}>Phish</span><span style={{ color:'#006600' }}>Ripoti</span></span>
        </div>
        <div style={{ display:'flex', gap:'6px' }}>
          <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{ padding:'5px 12px', borderRadius:'7px', fontWeight:'700', fontSize:'11px', color:'#fff', background:'linear-gradient(135deg, #BB0000, #880000)', border:'none', cursor:'pointer', boxShadow:'0 2px 8px rgba(187,0,0,0.28)', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-1px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>📧 Report Another</button>
          <button onClick={handleHome} style={{ padding:'5px 10px', borderRadius:'7px', fontWeight:'600', fontSize:'11px', color:'rgba(0,0,0,0.55)', background:'rgba(255,255,255,0.70)', border:'1px solid rgba(0,0,0,0.10)', cursor:'pointer', transition:'all 0.15s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.95)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.70)'}>← Home</button>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ flex:1, position:'relative', zIndex:10, padding:'10px 22px 10px', display:'flex', flexDirection:'column', gap:'9px', overflow:'hidden' }}>

        {/* ── ROW 1: HERO — full width, biggest card, centrepiece ── */}
        <div style={{ borderRadius:'18px', overflow:'hidden', background:config.heroBg, border:`1.5px solid ${config.border}`, backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:`0 12px 48px rgba(0,0,0,0.28), 0 0 0 1px ${config.glow}`, position:'relative', flexShrink:0, animation:'scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>
          {/* Shimmer top */}
          <div style={{ height:'4px', background:`linear-gradient(90deg, ${config.accent}, ${config.accentLight}, ${config.accent})`, backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}/>
          {/* Glass sheen */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)', pointerEvents:'none' }}/>
          {/* Abstract circles */}
          <svg style={{ position:'absolute', top:0, right:0, width:'300px', height:'100%', pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
            <circle cx="260" cy="50%" r="140" fill="none" stroke={`${config.accent}10`} strokeWidth="1"/>
            <circle cx="260" cy="50%" r="90" fill="none" stroke={`${config.accent}08`} strokeWidth="0.8"/>
            <circle cx="260" cy="50%" r="50" fill="none" stroke={`${config.accent}06`} strokeWidth="0.6"/>
          </svg>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, ${config.accent}50, transparent)` }}/>

          <div style={{ padding:'22px 32px 20px', position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'32px' }}>

            {/* BIG GAUGE — the centrepiece */}
            <div style={{ flexShrink:0, position:'relative' }}>
              <svg width="150" height="150" viewBox="0 0 140 140">
                {/* Outer glow ring */}
                <circle cx="70" cy="70" r="65" fill="none" stroke={`${config.gaugeColor}15`} strokeWidth="12"/>
                {/* Track */}
                <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10"/>
                {/* Progress */}
                <circle cx="70" cy="70" r="58" fill="none" stroke={config.gaugeColor} strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 70 70)"
                  style={{ transition:'stroke-dashoffset 0.1s linear', filter:`drop-shadow(0 0 8px ${config.gaugeColor}60)` }}/>
                {/* Inner ring */}
                <circle cx="70" cy="70" r="46" fill="none" stroke={config.gaugeColor} strokeWidth="0.8" opacity="0.12"/>
                {/* Score text */}
                <text x="70" y="62" textAnchor="middle" fill="white" fontSize="28" fontWeight="900" fontFamily="-apple-system,sans-serif">{scoreAnimated}%</text>
                <text x="70" y="78" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="-apple-system,sans-serif" letterSpacing="1.5">RISK SCORE</text>
              </svg>
            </div>

            {/* Risk info */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 13px', borderRadius:'20px', background:config.badgeBg, border:`1px solid ${config.border}`, marginBottom:'10px', boxShadow:`0 2px 12px ${config.accent}20` }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:config.accent, animation:'pulse 2s infinite', boxShadow:`0 0 6px ${config.accent}` }}/>
                <span style={{ fontSize:'11px', fontWeight:'900', color:config.accentLight, letterSpacing:'0.10em', textTransform:'uppercase' }}>{result.riskLevel} RISK DETECTED</span>
              </div>
              <h2 style={{ color:'#ffffff', fontWeight:'900', fontSize:'22px', margin:'0 0 8px', letterSpacing:'-0.5px', lineHeight:1.2 }}>{config.label}</h2>
              <p style={{ color:'rgba(255,255,255,0.52)', fontSize:'13px', lineHeight:'1.65', margin:'0 0 16px', maxWidth:'520px' }}>{config.sublabel}</p>
              <div style={{ display:'flex', gap:'7px', flexWrap:'wrap' }}>
                <div style={{ padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'600', background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.45)', border:'1px solid rgba(255,255,255,0.10)' }}>🤖 GPT-4o: {Math.round(result.riskScore * 0.7)}% weight</div>
                <div style={{ padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'600', background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.45)', border:'1px solid rgba(255,255,255,0.10)' }}>🔍 Safe Browsing: {Math.round(result.riskScore * 0.3)}% weight</div>
                {result.alertSent && <div style={{ padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'700', background:'rgba(239,68,68,0.18)', color:'#fca5a5', border:'1px solid rgba(239,68,68,0.30)' }}>⚡ IT security team alerted</div>}
              </div>
            </div>

            {/* Right: quick stats */}
            <div style={{ flexShrink:0, display:'flex', flexDirection:'column', gap:'8px', minWidth:'160px' }}>
              {[
                { label: 'Threats found', value: `${result.reasons?.length || 0}`, color: result.reasons?.length > 0 ? '#fca5a5' : '#4ade80', bg: result.reasons?.length > 0 ? 'rgba(239,68,68,0.14)' : 'rgba(34,197,94,0.12)', border: result.reasons?.length > 0 ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.22)' },
                { label: 'AI signals', value: `${analysisItems.filter(i=>i.value).length}/4 detected`, color: analysisItems.filter(i=>i.value).length > 0 ? '#fca5a5' : '#4ade80', bg: analysisItems.filter(i=>i.value).length > 0 ? 'rgba(239,68,68,0.14)' : 'rgba(34,197,94,0.12)', border: analysisItems.filter(i=>i.value).length > 0 ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.22)' },
                { label: 'Report status', value: 'Submitted', color: '#4ade80', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.22)' },
              ].map((stat,i) => (
                <div key={i} style={{ padding:'10px 14px', borderRadius:'11px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.10)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px' }}>
                  <span style={{ color:'rgba(255,255,255,0.42)', fontSize:'11px', fontWeight:'600' }}>{stat.label}</span>
                  <span style={{ padding:'2px 8px', borderRadius:'20px', background:stat.bg, border:`1px solid ${stat.border}`, fontSize:'10px', fontWeight:'800', color:stat.color, whiteSpace:'nowrap' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 2: Three equal columns — What to do | GPT | Threats ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'9px', flex:1, animation:'fadeUp 0.35s ease 0.08s both' }}>

          {/* WHAT TO DO NEXT */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:config.cardBg, border:`1px solid ${config.border}`, backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:`0 4px 20px rgba(0,0,0,0.16)`, position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg, ${config.accent}, ${config.accentDim}, transparent)` }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'4px', background:`linear-gradient(180deg, ${config.accent}, ${config.accent}88)`, opacity:0.70, borderRadius:'14px 0 0 14px' }}/>
            <div style={{ padding:'14px 15px 14px 13px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'12px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:config.badgeBg, border:`1px solid ${config.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', boxShadow:`0 2px 10px ${config.accent}20` }}>🚨</div>
                <div>
                  <div style={{ color:config.accentLight, fontWeight:'900', fontSize:'13px', letterSpacing:'-0.1px' }}>What to do next</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px' }}>Follow these steps immediately</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px', flex:1 }}>
                {simpleActions.slice(0,4).map((action,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'10px 11px', borderRadius:'9px', background:'rgba(255,255,255,0.05)', border:`1px solid ${config.border}`, flex:1 }}>
                    <div style={{ width:'20px', height:'20px', borderRadius:'6px', background:config.badgeBg, border:`1px solid ${config.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:'900', color:config.accentLight, flexShrink:0, marginTop:'1px', boxShadow:`0 1px 6px ${config.accent}18` }}>{i+1}</div>
                    <span style={{ color:'rgba(255,255,255,0.80)', fontSize:'12px', lineHeight:'1.55', fontWeight:'500' }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GPT-4o ANALYSIS */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(0,16,5,0.99)', border:'1px solid rgba(34,197,94,0.22)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 4px 20px rgba(0,0,0,0.16)', position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:'linear-gradient(90deg, #22c55e, #16a34a, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'4px', background:'linear-gradient(180deg, #22c55e, #15803d)', opacity:0.65, borderRadius:'14px 0 0 14px' }}/>
            <div style={{ padding:'14px 15px 14px 13px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'12px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'rgba(34,197,94,0.14)', border:'1px solid rgba(34,197,94,0.26)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>🤖</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:'#4ade80', fontWeight:'800', fontSize:'13px' }}>GPT-4o Analysis</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px' }}>AI threat detection</div>
                </div>
                <div style={{ padding:'3px 9px', borderRadius:'20px', background:'rgba(34,197,94,0.10)', border:'1px solid rgba(34,197,94,0.22)', fontSize:'10px', fontWeight:'700', color:'#4ade80', flexShrink:0 }}>
                  {analysisItems.filter(i=>!i.value).length}/{analysisItems.length} Clear
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px', flex:1 }}>
                {analysisItems.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:'9px', background:item.value?'rgba(239,68,68,0.11)':'rgba(34,197,94,0.07)', border:item.value?'1px solid rgba(239,68,68,0.20)':'1px solid rgba(34,197,94,0.14)', flex:1, position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:item.value?'#ef4444':'#22c55e', opacity:0.60 }}/>
                    <span style={{ color:'rgba(255,255,255,0.70)', fontSize:'12px', fontWeight:'600', paddingLeft:'6px' }}>{item.label}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:'4px', padding:'3px 9px', borderRadius:'6px', background:item.value?'rgba(239,68,68,0.20)':'rgba(34,197,94,0.16)', border:item.value?'1px solid rgba(239,68,68,0.32)':'1px solid rgba(34,197,94,0.28)', flexShrink:0 }}>
                      <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:item.value?'#ef4444':'#22c55e' }}/>
                      <span style={{ fontSize:'10px', fontWeight:'800', color:item.value?'#fca5a5':'#4ade80' }}>{item.value?'Detected':'Clear'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THREAT INDICATORS */}
          <div style={{ borderRadius:'14px', overflow:'hidden', background:'rgba(38,0,0,0.99)', border:'1px solid rgba(239,68,68,0.22)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 4px 20px rgba(0,0,0,0.16)', position:'relative', display:'flex', flexDirection:'column' }}>
            <div style={{ height:'3px', background:'linear-gradient(90deg, #ef4444, #BB0000, transparent)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, transparent 55%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'4px', background:'linear-gradient(180deg, #ef4444, #BB0000)', opacity:0.65, borderRadius:'14px 0 0 14px' }}/>
            <div style={{ padding:'14px 15px 14px 13px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'12px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'rgba(239,68,68,0.16)', border:'1px solid rgba(239,68,68,0.28)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>⚠️</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:'#fca5a5', fontWeight:'800', fontSize:'13px' }}>Threat Indicators</div>
                  <div style={{ color:'rgba(255,255,255,0.28)', fontSize:'10px' }}>What triggered the alert</div>
                </div>
                <div style={{ padding:'3px 9px', borderRadius:'20px', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.22)', fontSize:'10px', fontWeight:'700', color:'#fca5a5', flexShrink:0 }}>
                  {result.reasons?.length||0} found
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px', flex:1 }}>
                {result.reasons?.map((reason,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'9px', padding:'10px 12px', borderRadius:'9px', background:'rgba(239,68,68,0.09)', border:'1px solid rgba(239,68,68,0.17)', flex:1, position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:'#ef4444', opacity:0.55 }}/>
                    <div style={{ width:'20px', height:'20px', borderRadius:'6px', background:'rgba(239,68,68,0.22)', border:'1px solid rgba(239,68,68,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:'900', color:'#fca5a5', flexShrink:0, marginTop:'1px', paddingLeft:'3px' }}>{i+1}</div>
                    <span style={{ color:'rgba(255,255,255,0.78)', fontSize:'12px', lineHeight:'1.55', fontWeight:'500' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Did You Know — wide, second biggest ── */}
        <div style={{ borderRadius:'16px', overflow:'hidden', background:'rgba(14,8,0,0.99)', border:'1.5px solid rgba(234,150,0,0.30)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 6px 28px rgba(0,0,0,0.16), inset 0 1px 0 rgba(234,150,0,0.12)', position:'relative', flexShrink:0, animation:'fadeUp 0.35s ease 0.16s both' }}>
          <div style={{ height:'4px', background:'linear-gradient(90deg, #ffd166, #ea9600, #ffd166)', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(234,150,0,0.08) 0%, transparent 50%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, rgba(234,150,0,0.45), transparent)' }}/>
          <svg style={{ position:'absolute', top:0, right:0, width:'200px', height:'100%', pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
            <circle cx="170" cy="50%" r="90" fill="none" stroke="rgba(234,150,0,0.07)" strokeWidth="0.8"/>
            <circle cx="170" cy="50%" r="55" fill="none" stroke="rgba(234,150,0,0.05)" strokeWidth="0.6"/>
          </svg>
          <div style={{ padding:'16px 24px', position:'relative', zIndex:1, display:'flex', gap:'16px', alignItems:'center' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'13px', background:'rgba(234,150,0,0.20)', border:'1px solid rgba(234,150,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0, boxShadow:'0 4px 16px rgba(234,150,0,0.20)' }}>💡</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'9px', fontWeight:'900', color:'#ffd166', textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:'5px' }}>🇰🇪 Did You Know? — Kenya Staff Security Tip</div>
              <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'13px', lineHeight:'1.70', margin:0, fontWeight:'500' }}>{tipText}</p>
            </div>
          </div>
        </div>

        {/* ── ROW 4: Token + action buttons in one slim bar ── */}
        <div style={{ borderRadius:'13px', overflow:'hidden', background:'rgba(0,18,5,0.98)', border:'1px solid rgba(34,197,94,0.22)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', boxShadow:'0 4px 16px rgba(0,0,0,0.14)', position:'relative', flexShrink:0, animation:'fadeUp 0.35s ease 0.22s both' }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 55%)', pointerEvents:'none' }}/>
          <div style={{ padding:'11px 18px', position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'16px' }}>
            {/* Lock icon */}
            <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'rgba(34,197,94,0.14)', border:'1px solid rgba(34,197,94,0.26)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>🔐</div>
            {/* Token label + value */}
            <div style={{ flexShrink:0 }}>
              <div style={{ fontSize:'8px', fontWeight:'800', color:'rgba(74,222,128,0.45)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'3px' }}>Anonymous Report Token</div>
              <div style={{ fontFamily:'monospace', fontSize:'12px', fontWeight:'900', color:'#4ade80', letterSpacing:'0.08em', padding:'5px 12px', borderRadius:'7px', background:'rgba(0,102,0,0.22)', border:'1px solid rgba(34,197,94,0.30)', backgroundImage:'linear-gradient(90deg, rgba(0,102,0,0.22), rgba(0,150,0,0.28), rgba(0,102,0,0.22))', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}>
                {result.tokenId}
              </div>
            </div>
            {/* Divider */}
            <div style={{ width:'1px', height:'32px', background:'rgba(255,255,255,0.08)', flexShrink:0 }}/>
            <div style={{ color:'rgba(255,255,255,0.20)', fontSize:'10px', fontWeight:'500', flexShrink:0 }}>Cannot be traced to your identity</div>
            {result.alertSent && <div style={{ padding:'3px 9px', borderRadius:'5px', background:'rgba(239,68,68,0.14)', border:'1px solid rgba(239,68,68,0.24)', flexShrink:0 }}><span style={{ color:'#fca5a5', fontSize:'9px', fontWeight:'700' }}>⚡ Security team alerted</span></div>}
            {/* Spacer */}
            <div style={{ flex:1 }}/>
            {/* Action buttons */}
            <button onClick={() => navigate('/awareness')} style={{ padding:'8px 16px', borderRadius:'9px', fontWeight:'700', fontSize:'12px', color:'#fff', background:'linear-gradient(135deg, #006600, #004400)', border:'none', cursor:'pointer', boxShadow:'0 3px 12px rgba(0,102,0,0.30)', transition:'all 0.15s', flexShrink:0 }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-1px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>📚 Awareness Hub →</button>
            <button onClick={() => { clearReport(); navigate('/report/step1'); }} style={{ padding:'8px 16px', borderRadius:'9px', fontWeight:'700', fontSize:'12px', color:'#fff', background:'linear-gradient(135deg, #BB0000, #880000)', border:'none', cursor:'pointer', boxShadow:'0 3px 12px rgba(187,0,0,0.28)', transition:'all 0.15s', flexShrink:0 }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-1px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>📧 Report Another</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Result;