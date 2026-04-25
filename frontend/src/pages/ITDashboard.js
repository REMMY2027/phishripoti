import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { useAuth } from '../context/AuthContext';

const ITDashboard = () => {
  const navigate = useNavigate();
  const { token, manager, logout, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [awarenessStats, setAwarenessStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [secondsSince, setSecondsSince] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, reportsRes, awarenessRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/reports/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${process.env.REACT_APP_API_URL}/reports`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${process.env.REACT_APP_API_URL}/awareness/stats`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setStats(statsRes.data);
      setReports(reportsRes.data);
      setAwarenessStats(awarenessRes.data);
      setLastUpdated(new Date());
      setSecondsSince(0);
      setError('');
    } catch (err) {
      setError('Error loading dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/it/login'); return; }
    fetchData();
  }, []); // eslint-disable-line

  useEffect(() => {
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const tick = setInterval(() => setSecondsSince(s => s + 1), 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const handleLogout = () => { logout(); navigate('/it/login'); };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    if (secondsSince < 60) return `${secondsSince}s ago`;
    return `${Math.floor(secondsSince / 60)}m ago`;
  };

  const riskColor = (level) =>
    level === 'HIGH' ? '#BB0000' : level === 'MEDIUM' ? '#d97706' : '#006600';
  const riskBg = (level) =>
    level === 'HIGH' ? 'rgba(187,0,0,0.10)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.10)' : 'rgba(0,102,0,0.10)';
  const riskBorder = (level) =>
    level === 'HIGH' ? 'rgba(187,0,0,0.25)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.25)' : 'rgba(0,102,0,0.25)';

  const pieData = stats ? [
    { name: 'HIGH', value: stats.high || 0, color: '#BB0000' },
    { name: 'MEDIUM', value: stats.medium || 0, color: '#d97706' },
    { name: 'LOW', value: stats.low || 0, color: '#006600' },
  ].filter(d => d.value > 0) : [];

  const barData = reports.slice(0, 7).reverse().map((r, i) => ({
    name: `R${i + 1}`,
    score: r.riskScore,
    fill: r.riskLevel === 'HIGH' ? '#BB0000' : r.riskLevel === 'MEDIUM' ? '#d97706' : '#006600',
  }));

  const deptData = reports.reduce((acc, r) => {
    const dept = r.department || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});
  const deptChartData = Object.entries(deptData)
    .map(([dept, count]) => ({ dept: dept.split('/')[0].trim(), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const filteredReports = reports.filter(r => {
    const matchesSearch = searchQuery === '' ||
      r.tokenId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || r.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const threatTimeline = [...reports]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  // Shared styles
  const card = {
    borderRadius: '16px',
    background: '#f7f8f7',
    border: '1px solid rgba(0,0,0,0.09)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  };

  const tooltipStyle = {
    background: '#1a1a1a',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
  };

  const CardHeader = ({ title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
      <div style={{ width: '4px', height: '17px', borderRadius: '2px', background: '#BB0000' }}/>
      <span style={{ color: '#111111', fontWeight: '800', fontSize: '13px', letterSpacing: '-0.2px' }}>
        {title}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8ebe8' }}>
        <div style={{ textAlign: 'center' }}>
          <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
            width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.10)" strokeWidth="3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: 'rgba(0,0,0,0.42)', fontSize: '14px', fontWeight: '600' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#e8ebe8' }}>

      {/* Kenyan flag stripe */}
      <div style={{ height: '4px', display: 'flex', flexShrink: 0 }}>
        <div style={{ flex: 1, background: '#BB0000' }}/>
        <div style={{ flex: 1, background: '#1a1a1a' }}/>
        <div style={{ flex: 1, background: '#006600' }}/>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 36px', height: '68px',
        background: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.09)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'linear-gradient(145deg, #cc0000, #7a0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(187,0,0,0.30)',
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                  fill="rgba(255,255,255,0.95)"/>
              </svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.4px', color: '#111111' }}>
              Phish<span style={{ color: '#006600' }}>Ripoti</span>
            </span>
          </div>
          <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.10)' }}/>
          <span style={{
            color: 'rgba(0,0,0,0.40)', fontSize: '11px',
            fontWeight: '700', letterSpacing: '0.10em',
            textTransform: 'uppercase',
          }}>Security Portal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {lastUpdated && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '7px',
              background: 'rgba(0,102,0,0.07)',
              border: '1px solid rgba(0,102,0,0.14)',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}/>
              <span style={{ color: '#006600', fontSize: '11px', fontWeight: '700' }}>
                Live · {formatLastUpdated()}
              </span>
            </div>
          )}

          {manager && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '7px 13px', borderRadius: '10px',
              background: '#f4f5f4',
              border: '1px solid rgba(0,0,0,0.09)',
            }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #006600, #004400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: '800', color: '#fff', flexShrink: 0,
              }}>
                {manager.name?.charAt(0).toUpperCase() || 'M'}
              </div>
              <div>
                <div style={{ color: '#111111', fontSize: '12px', fontWeight: '800', lineHeight: 1.3 }}>
                  {manager.name || 'IT Manager'}
                </div>
                <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: '10px', lineHeight: 1.3 }}>
                  {manager.institution || 'Institution'}
                </div>
              </div>
            </div>
          )}

          <button onClick={fetchData} style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            color: 'rgba(0,0,0,0.52)', border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: '8px', padding: '8px 14px', fontSize: '12px',
            background: '#f4f5f4', cursor: 'pointer', transition: 'all 0.15s',
            fontWeight: '700',
          }}
            onMouseOver={e => e.currentTarget.style.background = '#ececec'}
            onMouseOut={e => e.currentTarget.style.background = '#f4f5f4'}>
            ↻ Refresh
          </button>

          <button onClick={handleLogout} style={{
            color: '#BB0000', border: '1px solid rgba(187,0,0,0.25)',
            borderRadius: '8px', padding: '8px 18px', fontSize: '12px',
            background: 'rgba(187,0,0,0.07)', cursor: 'pointer',
            transition: 'all 0.15s', fontWeight: '800',
          }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(187,0,0,0.13)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(187,0,0,0.07)'}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ color: '#111111', fontWeight: '900', fontSize: '26px', margin: '0 0 5px', letterSpacing: '-0.6px' }}>
              Security Dashboard
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '13px', margin: 0, fontWeight: '500' }}>
              {new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · East Africa Time
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '8px 16px', borderRadius: '9px',
            background: 'rgba(0,102,0,0.09)',
            border: '1px solid rgba(0,102,0,0.20)',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#006600' }}/>
            <span style={{ color: '#006600', fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em' }}>
              SYSTEM ACTIVE
            </span>
          </div>
        </div>

        {error && (
          <div style={{
            marginBottom: '20px', padding: '12px 16px',
            background: 'rgba(187,0,0,0.07)', border: '1px solid rgba(187,0,0,0.20)',
            borderRadius: '10px', color: '#BB0000', fontSize: '13px', fontWeight: '700',
          }}>{error}</div>
        )}

        {/* ── STAT CARDS ── */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'Total Reports', value: stats.total, color: '#111111', borderColor: '#333333', icon: '📋', sub: 'All time submissions' },
              { label: 'HIGH Risk', value: stats.high || 0, color: '#BB0000', borderColor: '#BB0000', icon: '🚨', sub: `${stats.alertsSent || 0} alerts sent` },
              { label: 'MEDIUM Risk', value: stats.medium || 0, color: '#d97706', borderColor: '#d97706', icon: '⚠️', sub: 'Under review' },
              { label: 'LOW Risk', value: stats.low || 0, color: '#006600', borderColor: '#006600', icon: '✓', sub: 'Resolved' },
            ].map((s, i) => (
              <div key={i} style={{
                borderRadius: '16px',
                background: '#f0f2f0',
                border: '1px solid rgba(0,0,0,0.09)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                overflow: 'hidden', display: 'flex',
              }}>
                <div style={{ width: '5px', flexShrink: 0, background: s.borderColor }}/>
                <div style={{ flex: 1, padding: '18px 18px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <span style={{ fontSize: '22px' }}>{s.icon}</span>
                    <span style={{
                      fontSize: '10px', color: 'rgba(0,0,0,0.55)',
                      textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: '800',
                    }}>{s.label}</span>
                  </div>
                  <div style={{
                    fontSize: '44px', fontWeight: '900', color: s.color,
                    lineHeight: 1, marginBottom: '6px', letterSpacing: '-2px',
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.50)', fontWeight: '600' }}>
                    {s.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TABS ── */}
        <div style={{
          display: 'flex', gap: '2px', marginBottom: '20px',
          background: 'rgba(0,0,0,0.08)',
          borderRadius: '12px', padding: '4px',
          width: 'fit-content',
          border: '1px solid rgba(0,0,0,0.08)',
        }}>
          {['Overview', 'Reports', 'Awareness'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{
              padding: '9px 22px', borderRadius: '9px',
              fontSize: '13px', fontWeight: '800', cursor: 'pointer',
              background: activeTab === tab.toLowerCase() ? '#BB0000' : 'transparent',
              color: activeTab === tab.toLowerCase() ? '#fff' : 'rgba(0,0,0,0.55)',
              border: 'none', transition: 'all 0.18s',
              boxShadow: activeTab === tab.toLowerCase() ? '0 2px 10px rgba(187,0,0,0.25)' : 'none',
              letterSpacing: '-0.1px',
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '16px' }}>

              {/* Pie */}
              <div style={{ ...card, padding: '22px' }}>
                <CardHeader title="Risk Distribution" />
                {pieData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={46} outerRadius={70} paddingAngle={3} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={index} fill={entry.color}/>)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle}/>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      {pieData.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }}/>
                          <span style={{ color: 'rgba(0,0,0,0.58)', fontSize: '11px', fontWeight: '700' }}>
                            {item.name} <strong style={{ color: '#111' }}>{item.value}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <EmptyState />}
              </div>

              {/* Bar */}
              <div style={{ ...card, padding: '22px' }}>
                <CardHeader title="Recent Risk Scores" />
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={185}>
                    <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)"/>
                      <XAxis dataKey="name" tick={{ fill: 'rgba(0,0,0,0.45)', fontSize: 10, fontWeight: 700 }}/>
                      <YAxis tick={{ fill: 'rgba(0,0,0,0.45)', fontSize: 10 }} domain={[0, 100]}/>
                      <Tooltip contentStyle={tooltipStyle}/>
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {barData.map((entry, index) => <Cell key={index} fill={entry.fill}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState />}
              </div>

              {/* Department */}
              <div style={{ ...card, padding: '22px' }}>
                <CardHeader title="Reports by Department" />
                {deptChartData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                    {deptChartData.map((d, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ color: 'rgba(0,0,0,0.68)', fontSize: '12px', fontWeight: '700' }}>{d.dept}</span>
                          <span style={{ color: '#111', fontSize: '12px', fontWeight: '900' }}>{d.count}</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: '4px',
                            background: i === 0 ? '#BB0000' : i === 1 ? '#d97706' : '#006600',
                            width: `${(d.count / (deptChartData[0]?.count || 1)) * 100}%`,
                            transition: 'width 0.5s ease',
                          }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState />}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>

              {/* Threat timeline */}
              <div style={{ ...card, padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '4px', height: '17px', borderRadius: '2px', background: '#BB0000' }}/>
                    <span style={{ color: '#111111', fontWeight: '800', fontSize: '13px' }}>Threat Timeline</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}/>
                    <span style={{ color: 'rgba(0,0,0,0.42)', fontSize: '10px', fontWeight: '800', letterSpacing: '0.06em' }}>LIVE</span>
                  </div>
                </div>
                {threatTimeline.length > 0 ? (
                  <div>
                    {threatTimeline.map((r, i) => (
                      <div
                        key={i}
                        onClick={() => navigate(`/it/report/${r.tokenId}`)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          padding: '10px 10px', borderRadius: '9px',
                          borderBottom: i < threatTimeline.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                          cursor: 'pointer', transition: 'background 0.14s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: riskColor(r.riskLevel), flexShrink: 0,
                        }}/>
                        <span style={{ color: 'rgba(0,0,0,0.48)', fontSize: '11px', fontFamily: 'monospace', flexShrink: 0, fontWeight: '600' }}>
                          {r.tokenId?.slice(0, 8)}...
                        </span>
                        <span style={{ color: 'rgba(0,0,0,0.70)', fontSize: '12px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '600' }}>
                          {r.department || 'Unknown'}
                        </span>
                        <div style={{
                          padding: '3px 9px', borderRadius: '5px',
                          background: riskBg(r.riskLevel),
                          border: `1px solid ${riskBorder(r.riskLevel)}`,
                          fontSize: '10px', fontWeight: '800',
                          color: riskColor(r.riskLevel), flexShrink: 0,
                          letterSpacing: '0.04em',
                        }}>
                          {r.riskLevel}
                        </div>
                        <span style={{ color: 'rgba(0,0,0,0.38)', fontSize: '10px', flexShrink: 0, fontWeight: '600' }}>
                          {formatDate(r.createdAt).split(',')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState />}
              </div>

              {/* Awareness summary */}
              <div style={{ ...card, padding: '22px' }}>
                <CardHeader title="Awareness Summary" />
                {awarenessStats ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'Total Sessions', value: awarenessStats.totalSessions, color: '#006600' },
                      { label: 'Avg Improvement', value: `+${awarenessStats.avgDelta} pts`, color: '#d97706' },
                      { label: 'Active Modules', value: Object.keys(awarenessStats.byModule || {}).length, color: '#111111' },
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 14px', borderRadius: '10px',
                        background: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.07)',
                      }}>
                        <span style={{ color: 'rgba(0,0,0,0.58)', fontSize: '12px', fontWeight: '700' }}>{item.label}</span>
                        <span style={{ color: item.color, fontWeight: '900', fontSize: '20px', letterSpacing: '-0.5px' }}>{item.value}</span>
                      </div>
                    ))}
                    {awarenessStats.byModule && Object.entries(awarenessStats.byModule).slice(0, 3).map(([mod, data], i) => (
                      <div key={i} style={{ marginTop: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '11px', fontWeight: '700' }}>{mod}</span>
                          <span style={{ color: '#006600', fontSize: '11px', fontWeight: '800' }}>{data.count} sessions</span>
                        </div>
                        <div style={{ height: '5px', background: 'rgba(0,0,0,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', background: 'linear-gradient(90deg, #006600, #22c55e)',
                            borderRadius: '3px',
                            width: `${Math.min((data.count / (awarenessStats.totalSessions || 1)) * 100, 100)}%`,
                          }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState />}
              </div>
            </div>
          </div>
        )}

        {/* ── REPORTS TAB ── */}
        {activeTab === 'reports' && (
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
                <span style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.30)', fontSize: '13px' }}>🔍</span>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by token ID or department..."
                  style={{
                    width: '100%', background: '#f0f2f0',
                    border: '1px solid rgba(0,0,0,0.10)',
                    borderRadius: '10px', color: '#111',
                    padding: '10px 14px 10px 36px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box', fontWeight: '600',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
                  <button key={level} onClick={() => setRiskFilter(level)} style={{
                    padding: '9px 16px', borderRadius: '9px', fontSize: '12px',
                    fontWeight: '800', cursor: 'pointer',
                    background: riskFilter === level
                      ? level === 'HIGH' ? '#BB0000'
                        : level === 'MEDIUM' ? '#d97706'
                        : level === 'LOW' ? '#006600'
                        : '#111111'
                      : '#f0f2f0',
                    color: riskFilter === level ? '#fff' : 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(0,0,0,0.10)',
                    boxShadow: riskFilter === level ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                    transition: 'all 0.15s',
                  }}>
                    {level}
                  </button>
                ))}
              </div>

              <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px', marginLeft: 'auto', fontWeight: '700' }}>
                {filteredReports.length} of {reports.length} reports
              </span>

              <button onClick={fetchData} style={{
                fontSize: '12px', color: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(0,0,0,0.12)', borderRadius: '9px',
                padding: '9px 16px', background: '#f0f2f0', cursor: 'pointer', fontWeight: '800',
              }}>↻ Refresh</button>
            </div>

            <div style={{ ...card }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#ebebeb' }}>
                      {['Token ID', 'Department', 'Risk', 'Score', 'Header', 'Date', 'Status'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', color: 'rgba(0,0,0,0.55)',
                          fontSize: '10px', fontWeight: '800', padding: '13px 20px',
                          textTransform: 'uppercase', letterSpacing: '0.09em',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.slice(0, 25).map((report, i) => (
                      <tr key={i}
                        onClick={() => navigate(`/it/report/${report.tokenId}`)}
                        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'background 0.12s' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '14px 20px', fontFamily: 'monospace', color: 'rgba(0,0,0,0.50)', fontSize: '12px', fontWeight: '600' }}>
                          {report.tokenId?.slice(0, 12)}...
                        </td>
                        <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.68)', fontSize: '12px', fontWeight: '700' }}>
                          {report.department || '—'}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '4px 10px', borderRadius: '6px',
                            background: riskBg(report.riskLevel),
                            border: `1px solid ${riskBorder(report.riskLevel)}`,
                          }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: riskColor(report.riskLevel) }}/>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: riskColor(report.riskLevel), letterSpacing: '0.04em' }}>
                              {report.riskLevel}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', color: '#111', fontSize: '14px', fontWeight: '900' }}>
                          {report.riskScore}%
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            fontSize: '10px', padding: '3px 9px', borderRadius: '5px',
                            background: report.emailHeader ? 'rgba(0,102,0,0.09)' : 'rgba(0,0,0,0.06)',
                            color: report.emailHeader ? '#006600' : 'rgba(0,0,0,0.38)',
                            border: report.emailHeader ? '1px solid rgba(0,102,0,0.20)' : '1px solid rgba(0,0,0,0.10)',
                            fontWeight: '800',
                          }}>
                            {report.emailHeader ? 'Provided' : 'None'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.45)', fontSize: '11px', fontWeight: '600' }}>
                          {formatDate(report.createdAt)}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            fontSize: '10px', padding: '4px 10px', borderRadius: '6px',
                            background: report.alertSent ? 'rgba(187,0,0,0.09)' : report.status === 'resolved' ? 'rgba(0,102,0,0.09)' : 'rgba(217,119,6,0.09)',
                            color: report.alertSent ? '#BB0000' : report.status === 'resolved' ? '#006600' : '#d97706',
                            border: report.alertSent ? '1px solid rgba(187,0,0,0.22)' : report.status === 'resolved' ? '1px solid rgba(0,102,0,0.22)' : '1px solid rgba(217,119,6,0.22)',
                            fontWeight: '800',
                          }}>
                            {report.alertSent ? 'Alert Sent' : report.status === 'resolved' ? 'Resolved' : 'Under Review'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredReports.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: '52px', textAlign: 'center' }}>
                          <div style={{ fontSize: '28px', marginBottom: '10px', opacity: 0.3 }}>🔍</div>
                          <div style={{ color: 'rgba(0,0,0,0.35)', fontSize: '13px', fontWeight: '700' }}>
                            No reports match your search
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── AWARENESS TAB ── */}
        {activeTab === 'awareness' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {[
                { label: 'Total Sessions', value: awarenessStats?.totalSessions || 0, color: '#006600', icon: '📊', sub: 'Staff trained', border: '#006600' },
                { label: 'Avg Improvement', value: `+${awarenessStats?.avgDelta || 0} pts`, color: '#d97706', icon: '📈', sub: 'Knowledge gain', border: '#d97706' },
                { label: 'Active Modules', value: Object.keys(awarenessStats?.byModule || {}).length, color: '#111111', icon: '📚', sub: 'Training areas', border: '#333333' },
              ].map((s, i) => (
                <div key={i} style={{
                  borderRadius: '16px', background: '#f0f2f0',
                  border: '1px solid rgba(0,0,0,0.09)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  overflow: 'hidden', display: 'flex',
                }}>
                  <div style={{ width: '5px', flexShrink: 0, background: s.border }}/>
                  <div style={{ flex: 1, padding: '20px' }}>
                    <div style={{ fontSize: '22px', marginBottom: '12px' }}>{s.icon}</div>
                    <div style={{ fontSize: '34px', fontWeight: '900', color: s.color, marginBottom: '4px', letterSpacing: '-1px' }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.38)', marginTop: '2px', fontWeight: '500' }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...card, padding: '24px' }}>
              <CardHeader title="Module Performance" />
              {awarenessStats && Object.entries(awarenessStats.byModule).length > 0 ? (
                Object.entries(awarenessStats.byModule).map(([mod, data], i) => (
                  <div key={i} style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                      <span style={{ color: 'rgba(0,0,0,0.68)', fontSize: '13px', fontWeight: '700' }}>{mod}</span>
                      <div style={{ display: 'flex', gap: '14px' }}>
                        <span style={{ color: '#006600', fontSize: '12px', fontWeight: '800' }}>
                          +{data.count > 0 ? (data.totalDelta / data.count).toFixed(1) : 0} pts avg
                        </span>
                        <span style={{ color: 'rgba(0,0,0,0.38)', fontSize: '12px', fontWeight: '700' }}>
                          {data.count} sessions
                        </span>
                      </div>
                    </div>
                    <div style={{ height: '7px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', background: 'linear-gradient(90deg, #006600, #22c55e)',
                        borderRadius: '4px',
                        width: `${Math.min((data.count / (awarenessStats.totalSessions || 1)) * 100, 100)}%`,
                        transition: 'width 0.5s ease',
                      }}/>
                    </div>
                  </div>
                ))
              ) : <EmptyState />}
            </div>
          </div>
        )}

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: '#f0f2f0', border: '1px solid rgba(0,0,0,0.10)',
            borderRadius: '9px', padding: '10px 20px',
            color: 'rgba(0,0,0,0.50)', fontSize: '12px', fontWeight: '800',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
            onMouseOver={e => e.currentTarget.style.background = '#e8ebe8'}
            onMouseOut={e => e.currentTarget.style.background = '#f0f2f0'}>
            ← Back to PhishRipoti
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ message = 'No data yet' }) => (
  <div style={{ textAlign: 'center', padding: '32px 0' }}>
    <div style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.25 }}>◎</div>
    <div style={{ color: 'rgba(0,0,0,0.35)', fontSize: '12px', fontWeight: '700' }}>{message}</div>
  </div>
);

export default ITDashboard;