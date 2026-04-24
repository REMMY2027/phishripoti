import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import RiskBadge from '../components/RiskBadge';
import { useAuth } from '../context/AuthContext';

const ITDashboard = () => {
  const navigate = useNavigate();
  const { token, logout, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [awarenessStats, setAwarenessStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAuthenticated) { navigate('/it/login'); return; }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, reportsRes, awarenessRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/reports/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${process.env.REACT_APP_API_URL}/reports`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${process.env.REACT_APP_API_URL}/awareness/stats`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setStats(statsRes.data);
      setReports(reportsRes.data);
      setAwarenessStats(awarenessRes.data);
    } catch (err) {
      setError('Error loading dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/it/login'); };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const pieData = stats ? [
    { name: 'HIGH', value: stats.high, color: '#BB0000' },
    { name: 'MEDIUM', value: stats.medium, color: '#ea9600' },
    { name: 'LOW', value: stats.low, color: '#006600' }
  ].filter(d => d.value > 0) : [];

  const barData = reports.slice(0, 7).reverse().map((r, i) => ({
    name: `R${i + 1}`, score: r.riskScore,
    fill: r.riskLevel === 'HIGH' ? '#BB0000' : r.riskLevel === 'MEDIUM' ? '#ea9600' : '#006600'
  }));

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050d05' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
              width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050d05' }}>

      {/* Navbar */}
      <div style={{ height: '3px', display: 'flex' }}>
        <div style={{ flex: 1, background: '#BB0000' }}></div>
        <div style={{ flex: 1, background: '#1A1A1A' }}></div>
        <div style={{ flex: 1, background: '#006600' }}></div>
      </div>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '60px',
        background: 'rgba(5,13,5,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V6L12 2z" fill="#BB0000"/>
            <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '16px' }}>PhishRipoti</span>
          <div style={{
            width: '1px', height: '20px',
            background: 'rgba(255,255,255,0.1)'
          }}></div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Security Portal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', borderRadius: '20px',
            background: 'rgba(187,0,0,0.12)',
            border: '1px solid rgba(187,0,0,0.25)'
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#69db7c', boxShadow: '0 0 6px #69db7c' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>
              Admin logged in
            </span>
          </div>
          <button onClick={handleLogout} style={{
            color: 'rgba(255,255,255,0.45)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '7px 16px',
            fontSize: '13px', background: 'transparent',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>

        {/* Page header */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '24px', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Security Dashboard
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', margin: 0 }}>
            {new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · East Africa Time
          </p>
        </div>

        {error && (
          <div style={{
            marginBottom: '20px', padding: '12px 16px',
            background: 'rgba(187,0,0,0.1)', border: '1px solid rgba(187,0,0,0.25)',
            borderRadius: '10px', color: '#ff8080', fontSize: '13px'
          }}>{error}</div>
        )}

        {/* Stat cards */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
            {[
              { label: 'Total Reports', value: stats.total, color: '#ffffff', icon: '📋', bg: 'rgba(255,255,255,0.04)' },
              { label: 'HIGH Risk Alerts', value: stats.alertsSent, color: '#ff6666', icon: '🚨', bg: 'rgba(187,0,0,0.08)', border: 'rgba(187,0,0,0.2)' },
              { label: 'MEDIUM Risk', value: stats.medium, color: '#ffd166', icon: '⚠️', bg: 'rgba(234,150,0,0.08)', border: 'rgba(234,150,0,0.2)' },
              { label: 'LOW Risk', value: stats.low, color: '#69db7c', icon: '✓', bg: 'rgba(0,102,0,0.08)', border: 'rgba(0,102,0,0.2)' }
            ].map((s, i) => (
              <div key={i} style={{
                borderRadius: '16px', padding: '20px',
                background: s.bg || 'rgba(255,255,255,0.04)',
                border: `1px solid ${s.border || 'rgba(255,255,255,0.08)'}`,
                transition: 'transform 0.2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{s.icon}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize: '36px', fontWeight: '800', color: s.color, lineHeight: 1 }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
          {['overview', 'reports', 'awareness'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 20px', borderRadius: '10px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              background: activeTab === tab ? '#BB0000' : 'transparent',
              color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none', transition: 'all 0.2s', textTransform: 'capitalize'
            }}>
              {tab === 'overview' ? 'Overview' : tab === 'reports' ? 'Reports' : 'Awareness'}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && stats && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ borderRadius: '16px', padding: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}>Risk Tier Distribution</div>
              {pieData.length > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <ResponsiveContainer width="55%" height={180}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={75} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={index} fill={entry.color}/>)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0d150d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff' }}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pieData.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></div>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{item.name}: <strong style={{ color: '#fff' }}>{item.value}</strong></span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', padding: '40px 0', textAlign: 'center' }}>No reports yet</div>}
            </div>

            <div style={{ borderRadius: '16px', padding: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px', marginBottom: '20px' }}>Recent Risk Scores</div>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}/>
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} domain={[0, 100]}/>
                    <Tooltip contentStyle={{ background: '#0d150d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff' }}/>
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {barData.map((entry, index) => <Cell key={index} fill={entry.fill}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', padding: '40px 0', textAlign: 'center' }}>No reports yet</div>}
            </div>

            <div style={{ borderRadius: '16px', padding: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>Recent HIGH Risk Alerts</div>
              {reports.filter(r => r.riskLevel === 'HIGH').slice(0, 5).map((report, i) => (
                <div key={i} onClick={() => navigate(`/it/report/${report.tokenId}`)} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer'
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: 'monospace' }}>{report.tokenId}</span>
                  <RiskBadge level={report.riskLevel}/>
                </div>
              ))}
              {reports.filter(r => r.riskLevel === 'HIGH').length === 0 && (
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>No HIGH risk reports yet</div>
              )}
            </div>

            <div style={{ borderRadius: '16px', padding: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>Awareness Hub Summary</div>
              {awarenessStats ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,102,0,0.08)', border: '1px solid rgba(0,102,0,0.15)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Total quiz sessions</span>
                    <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '16px' }}>{awarenessStats.totalSessions}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,102,0,0.08)', border: '1px solid rgba(0,102,0,0.15)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Average improvement</span>
                    <span style={{ color: '#69db7c', fontWeight: '700', fontSize: '16px' }}>+{awarenessStats.avgDelta} pts</span>
                  </div>
                </div>
              ) : <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>No awareness sessions yet</div>}
            </div>
          </div>
        )}

        {/* Reports tab */}
        {activeTab === 'reports' && (
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px' }}>Anonymised Reports</span>
              <button onClick={fetchData} style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                padding: '6px 14px', background: 'transparent', cursor: 'pointer'
              }}>Refresh</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Token ID', 'Risk', 'Score', 'Header', 'Date', 'Status'].map(h => (
                      <th key={h} style={{ textAlign: 'left', color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: '600', padding: '12px 20px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.slice(0, 20).map((report, i) => (
                    <tr key={i} onClick={() => navigate(`/it/report/${report.tokenId}`)} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      cursor: 'pointer', transition: 'background 0.15s'
                    }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '14px 20px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{report.tokenId}</td>
                      <td style={{ padding: '14px 20px' }}><RiskBadge level={report.riskLevel}/></td>
                      <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{report.riskScore}%</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          fontSize: '11px', padding: '2px 8px', borderRadius: '6px',
                          background: report.emailHeader ? 'rgba(0,102,0,0.15)' : 'rgba(255,255,255,0.05)',
                          color: report.emailHeader ? '#69db7c' : 'rgba(255,255,255,0.25)',
                          border: report.emailHeader ? '1px solid rgba(0,102,0,0.25)' : '1px solid rgba(255,255,255,0.08)'
                        }}>
                          {report.emailHeader ? 'Provided' : 'None'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{formatDate(report.createdAt)}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          fontSize: '11px', padding: '3px 10px', borderRadius: '6px',
                          background: report.alertSent ? 'rgba(187,0,0,0.15)' : report.status === 'resolved' ? 'rgba(0,102,0,0.15)' : 'rgba(234,150,0,0.1)',
                          color: report.alertSent ? '#ff8080' : report.status === 'resolved' ? '#69db7c' : '#ffd166',
                          border: report.alertSent ? '1px solid rgba(187,0,0,0.25)' : report.status === 'resolved' ? '1px solid rgba(0,102,0,0.25)' : '1px solid rgba(234,150,0,0.2)'
                        }}>
                          {report.alertSent ? 'Alert Sent' : report.status === 'resolved' ? 'Resolved' : 'Under Review'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {reports.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>No reports yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Awareness tab */}
        {activeTab === 'awareness' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { label: 'Total Sessions', value: awarenessStats?.totalSessions || 0, color: '#69db7c', icon: '📊' },
                { label: 'Avg Improvement', value: `+${awarenessStats?.avgDelta || 0} pts`, color: '#ffd166', icon: '📈' },
                { label: 'Active Modules', value: Object.keys(awarenessStats?.byModule || {}).length, color: '#ffffff', icon: '📚' }
              ].map((s, i) => (
                <div key={i} style={{ borderRadius: '16px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '20px', marginBottom: '10px' }}>{s.icon}</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: s.color, marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: '16px', padding: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>Module Breakdown</div>
              {awarenessStats && Object.entries(awarenessStats.byModule).map(([mod, data], i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{mod}</span>
                    <span style={{ color: '#69db7c', fontSize: '13px', fontWeight: '600' }}>
                      +{data.count > 0 ? (data.totalDelta / data.count).toFixed(1) : 0} pts avg
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', background: '#006600', borderRadius: '6px',
                      width: `${Math.min((data.count / (awarenessStats.totalSessions || 1)) * 100, 100)}%`,
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', marginTop: '4px' }}>{data.count} sessions</div>
                </div>
              ))}
              {(!awarenessStats || Object.keys(awarenessStats.byModule).length === 0) && (
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>No sessions recorded yet</div>
              )}
            </div>
          </div>
        )}

        {/* Back button bottom */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '10px 20px',
            color: 'rgba(255,255,255,0.45)', fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
            ← Back to PhishRipoti
          </button>
        </div>
      </div>
    </div>
  );
};

export default ITDashboard;