import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AwarenessLearn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total, module, department } = location.state || {};
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeScenario, setActiveScenario] = useState(0);
  const [expandedPoint, setExpandedPoint] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/awareness/learning-content`,
        { module, department },
        { timeout: 60000 }
      );
      setContent(response.data);
    } catch (err) {
      setContent({
        keyPoints: [
          { title: 'Verify sender domains carefully', detail: 'Always check the full email address, not just the display name. Legitimate banks like KCB and Equity Bank will always send from their official domains like @kcbgroup.com or @equitybank.co.ke — never from free email services or slightly altered domains.' },
          { title: 'Never click links under pressure', detail: 'Phishing emails create artificial urgency — "Your account will be suspended in 24 hours." Legitimate institutions never require immediate action via email links. Always go directly to the official website by typing the URL.' },
          { title: 'No bank asks for your PIN via email', detail: 'This is a universal rule. No legitimate financial institution will ever ask for your PIN, password, or full account number via email. If you receive such a request, it is always a phishing attempt.' },
          { title: 'M-Pesa alerts come from official shortcodes', detail: 'Genuine Safaricom M-Pesa messages come from shortcode 22522. Any SMS or email claiming to be M-Pesa but coming from a phone number or generic email is fraudulent.' },
          { title: 'Report all suspicious emails immediately', detail: 'Using PhishRipoti, you can anonymously report any suspicious email. Early reporting helps your IT team protect the entire organisation before others fall victim to the same attack.' }
        ],
        scenarios: [
          { title: 'The KCB Account Suspension Email', description: 'You receive an email from security@kcb-alerts.net saying your account will be suspended unless you verify within 24 hours. The link goes to kcb-secure-verify.net.', redFlag: 'Official KCB emails come from @kcbgroup.com — not kcb-alerts.net.' },
          { title: 'The M-Pesa Reversal Scam', description: 'An email claims you sent KSh 5,000 by mistake and asks you to click a link to reverse the transaction using your M-Pesa PIN.', redFlag: 'M-Pesa reversals are done through the official app, never via email links.' },
          { title: 'The HR Payroll Update', description: 'An email from hr-payroll@company-updates.co asks you to update your bank account details for salary payment before end of month.', redFlag: 'HR payroll updates are always done through internal systems, never via unsolicited emails.' }
        ],
        keyTakeaways: [
          'Always verify the sender domain before clicking any link',
          'Never provide credentials, PINs or personal data via email',
          'Urgency and threats are classic phishing tactics',
          'Report all suspicious emails using PhishRipoti immediately'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTakePostAssessment = () => {
    navigate('/awareness/quiz', {
      state: {
        department,
        module,
        isPost: true,
        preScore: score,
        learningContent: content
      }
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 20px', display: 'block' }}
              width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#006600" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
              Generating learning content...
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
              GPT-4o is creating personalised content for {department}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const keyPoints = content?.keyPoints || [];
  const scenarios = content?.scenarios || [];
  const keyTakeaways = content?.keyTakeaways || [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d0a' }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1f0d 0%, #0a0d0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0'
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #006600, transparent)' }}></div>
        <div style={{ padding: '20px 40px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(0,102,0,0.15)',
                border: '1px solid rgba(0,102,0,0.35)',
                borderRadius: '10px', padding: '6px 14px', marginBottom: '10px'
              }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#69db7c', boxShadow: '0 0 6px #69db7c' }}></div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#69db7c', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Learning Content
                </span>
              </div>
              <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '20px', marginBottom: '4px' }}>
                {module}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                {department} · Pre-assessment score: {score}/{total} · Study this before your post-assessment
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '12px 18px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pre-score</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>{score}<span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>/{total}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <div style={{ maxWidth: '800px' }}>

          {/* Section 1: Key Points — Interactive accordion */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'rgba(0,102,0,0.2)', border: '1px solid rgba(0,102,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
              }}>📚</div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '16px' }}>Key Learning Points</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Click each point to expand the explanation</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {keyPoints.map((point, i) => {
                const isExpanded = expandedPoint === i;
                const title = typeof point === 'string' ? point : point.title;
                const detail = typeof point === 'string' ? null : point.detail;

                return (
                  <div
                    key={i}
                    onClick={() => setExpandedPoint(isExpanded ? null : i)}
                    style={{
                      borderRadius: '12px', overflow: 'hidden',
                      border: isExpanded
                        ? '1px solid rgba(0,102,0,0.4)'
                        : '1px solid rgba(255,255,255,0.07)',
                      transition: 'all 0.2s', cursor: 'pointer'
                    }}>
                    <div style={{
                      padding: '14px 18px',
                      background: isExpanded
                        ? 'rgba(0,102,0,0.12)'
                        : 'rgba(255,255,255,0.03)',
                      display: 'flex', alignItems: 'center', gap: '14px'
                    }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: isExpanded ? '#006600' : 'rgba(255,255,255,0.07)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: '800', flexShrink: 0,
                        color: isExpanded ? '#fff' : 'rgba(255,255,255,0.4)',
                        transition: 'all 0.2s'
                      }}>{i + 1}</div>
                      <span style={{
                        color: isExpanded ? '#69db7c' : '#ffffff',
                        fontWeight: '600', fontSize: '14px', flex: 1,
                        transition: 'color 0.2s'
                      }}>
                        {title}
                      </span>
                      <div style={{
                        color: 'rgba(255,255,255,0.25)', fontSize: '16px',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s'
                      }}>▾</div>
                    </div>

                    {isExpanded && detail && (
                      <div style={{
                        padding: '14px 18px 16px',
                        background: 'rgba(0,102,0,0.06)',
                        borderTop: '1px solid rgba(0,102,0,0.15)'
                      }}>
                        <p style={{
                          color: 'rgba(255,255,255,0.72)',
                          fontSize: '14px', lineHeight: '1.75', margin: 0
                        }}>
                          {detail}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Scenarios — Interactive tabs */}
          {scenarios.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: 'rgba(187,0,0,0.15)', border: '1px solid rgba(187,0,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
                }}>🎯</div>
                <div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '16px' }}>Real-World Scenarios</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Click each tab to explore different attack scenarios</div>
                </div>
              </div>

              {/* Scenario tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {scenarios.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScenario(i)}
                    style={{
                      padding: '8px 16px', borderRadius: '20px',
                      border: activeScenario === i
                        ? '1px solid rgba(187,0,0,0.5)'
                        : '1px solid rgba(255,255,255,0.08)',
                      background: activeScenario === i
                        ? 'rgba(187,0,0,0.15)'
                        : 'rgba(255,255,255,0.03)',
                      color: activeScenario === i ? '#ff8080' : 'rgba(255,255,255,0.45)',
                      fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    Scenario {i + 1}
                  </button>
                ))}
              </div>

              {/* Active scenario */}
              {scenarios[activeScenario] && (
                <div style={{
                  borderRadius: '14px', overflow: 'hidden',
                  border: '1px solid rgba(187,0,0,0.2)',
                  background: 'rgba(187,0,0,0.06)'
                }}>
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(187,0,0,0.1)',
                    background: 'rgba(187,0,0,0.08)'
                  }}>
                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px' }}>
                      {scenarios[activeScenario].title}
                    </div>
                  </div>
                  <div style={{ padding: '18px 20px' }}>
                    <p style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '14px', lineHeight: '1.75', margin: '0 0 16px'
                    }}>
                      {scenarios[activeScenario].description}
                    </p>
                    {scenarios[activeScenario].redFlag && (
                      <div style={{
                        padding: '12px 14px',
                        background: 'rgba(255,150,0,0.08)',
                        border: '1px solid rgba(255,150,0,0.2)',
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'flex-start', gap: '8px'
                      }}>
                        <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>💡</span>
                        <div>
                          <div style={{ fontSize: '10px', fontWeight: '700', color: '#ffd166', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>Key Insight</div>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6' }}>
                            {scenarios[activeScenario].redFlag}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 3: Key Takeaways */}
          {keyTakeaways.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: 'rgba(255,150,0,0.15)', border: '1px solid rgba(255,150,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
                }}>⚡</div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '16px' }}>Key Takeaways</div>
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'
              }}>
                {keyTakeaways.map((t, i) => (
                  <div key={i} style={{
                    padding: '14px 16px', borderRadius: '12px',
                    background: 'rgba(255,150,0,0.06)',
                    border: '1px solid rgba(255,150,0,0.15)',
                    display: 'flex', alignItems: 'flex-start', gap: '10px'
                  }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '6px',
                      background: 'rgba(255,150,0,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: '800', color: '#ffd166', flexShrink: 0
                    }}>{i + 1}</div>
                    <span style={{
                      fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: '1.6'
                    }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{
            padding: '24px', borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0,102,0,0.15), rgba(0,102,0,0.06))',
            border: '1px solid rgba(0,102,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>
                Ready for your post-assessment?
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                Questions will be based on the content you just studied. Try to beat your pre-assessment score of {score}/{total}.
              </div>
            </div>
            <button
              onClick={handleTakePostAssessment}
              style={{
                background: 'linear-gradient(135deg, #006600, #005000)',
                color: '#fff', border: 'none', borderRadius: '12px',
                padding: '14px 28px', fontSize: '14px', fontWeight: '700',
                cursor: 'pointer', whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(0,102,0,0.3)'
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}>
              Take Post-Assessment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwarenessLearn;