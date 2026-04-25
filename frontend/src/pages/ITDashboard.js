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
    level === 'HIGH' ? 'rgba(187,0,0,0.07)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.07)' : 'rgba(0,102,0,0.07)';

  const riskBorder = (level) =>
    level === 'HIGH' ? 'rgba(187,0,0,0.18)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.18)' : 'rgba(0,102,0,0.18)';

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

  // ── Shared card style ──
  const card = {
    borderRadius: '16px',
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.07)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    overflow: 'hidden',
  };

  const cardHeader = (title) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      marginBottom: '18px',
    }}>
      <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: '#BB0000' }}/>
      <span style={{ color: '#111111', fontWeight: '700', fontSize: '13px', letterSpacing: '-0.1px' }}>
        {title}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef0ee' }}>
        <div style={{ textAlign: 'center' }}>
          <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
            width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.08)" strokeWidth="3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: 'rgba(0,0,0,0.38)', fontSize: '14px' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#eef0ee' }}>

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
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
        flexShrink: 0,
      }}>
        {/* Left — brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'linear-gradient(145deg, #cc0000, #7a0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(187,0,0,0.28)',
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
          <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.09)' }}/>
          <span style={{
            color: 'rgba(0,0,0,0.32)', fontSize: '11px',
            fontWeight: '700', letterSpacing: '0.10em',
            textTransform: 'uppercase',
          }}>
            Security Portal
          </span>
        </div>

        {/* Right — status + manager + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          {/* Live indicator */}
          {lastUpdated && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 10px', borderRadius: '6px',
              background: 'rgba(0,102,0,0.06)',
              border: '1px solid rgba(0,102,0,0.12)',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}/>
              <span style={{ color: '#006600', fontSize: '11px', fontWeight: '600' }}>
                Live · {formatLastUpdated()}
              </span>
            </div>
          )}

          {/* Manager card */}
          {manager && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '7px 13px', borderRadius: '10px',
              background: '#f8f9f8',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #006600, #004400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: '800', color: '#fff',
                flexShrink: 0,
              }}>
                {manager.name?.charAt(0).toUpperCase() || 'M'}
              </div>
              <div>
                <div style={{ color: '#111111', fontSize: '12px', fontWeight: '700', lineHeight: 1.3 }}>
                  {manager.name || 'IT Manager'}
                </div>
                <div style={{ color: 'rgba(0,0,0,0.35)', fontSize: '10px', lineHeight: 1.3 }}>
                  {manager.institution || 'Institution'}
                </div>
              </div>
            </div>
          )}

          <button onClick={fetchData} style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            color: 'rgba(0,0,0,0.45)', border: '1px solid rgba(0,0,0,0.10)',
            borderRadius: '8px', padding: '8px 14px', fontSize: '12px',
            background: '#ffffff', cursor: 'pointer', transition: 'all 0.15s',
            fontWeight: '600', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
            onMouseOver={e => e.currentTarget.style.background = '#f4f5f4'}
            onMouseOut={e => e.currentTarget.style.background = '#ffffff'}>
            ↻ Refresh
          </button>

          <button onClick={handleLogout} style={{
            color: '#BB0000', border: '1px solid rgba(187,0,0,0.22)',
            borderRadius: '8px', padding: '8px 18px', fontSize: '12px',
            background: 'rgba(187,0,0,0.05)', cursor: 'pointer',
            transition: 'all 0.15s', fontWeight: '700',
            boxShadow: '0 1px 4px rgba(187,0,0,0.08)',
          }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(187,0,0,0.10)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(187,0,0,0.05)'}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px 40px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{
              color: '#111111', fontWeight: '900', fontSize: '26px',
              margin: '0 0 5px', letterSpacing: '-0.6px',
            }}>
              Security Dashboard
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.36)', fontSize: '13px', margin: 0 }}>
              {new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · East Africa Time
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '8px 16px', borderRadius: '9px',
            background: 'rgba(0,102,0,0.07)',
            border: '1px solid rgba(0,102,0,0.16)',
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
            background: 'rgba(187,0,0,0.06)', border: '1px solid rgba(187,0,0,0.18)',
            borderRadius: '10px', color: '#BB0000', fontSize: '13px', fontWeight: '600',
          }}>{error}</div>
        )}

        {/* ── STAT CARDS ── */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              {
                label: 'Total Reports',
                value: stats.total,
                color: '#111111',
                borderColor: '#1a1a1a',
                icon: '📋',
                sub: 'All time submissions',
              },
              {
                label: 'HIGH Risk',
                value: stats.high || 0,
                color: '#BB0000',
                borderColor: '#BB0000',
                icon: '🚨',
                sub: `${stats.alertsSent || 0} alerts sent`,
              },
              {
                label: 'MEDIUM Risk',
                value: stats.medium || 0,
                color: '#d97706',
                borderColor: '#d97706',
                icon: '⚠️',
                sub: 'Under review',
              },
              {
                label: 'LOW Risk',
                value: stats.low || 0,
                color: '#006600',
                borderColor: '#006600',
                icon: '✓',
                sub: 'Resolved',
              },
            ].map((s, i) => (
              <div key={i} style={{
                borderRadius: '16px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                overflow: 'hidden',
                display: 'flex',
              }}>
                {/* Left colour bar */}
                <div style={{
                  width: '5px', flexShrink: 0,
                  background: s.borderColor,
                  opacity: 0.75,
                }}/>
                <div style={{ flex: 1, padding: '18px 18px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <span style={{ fontSize: '22px' }}>{s.icon}</span>
                    <span style={{
                      fontSize: '10px', color: 'rgba(0,0,0,0.32)',
                      textTransform: 'uppercase', letterSpacing: '0.09em',
                      fontWeight: '700',
                    }}>{s.label}</span>
                  </div>
                  <div style={{
                    fontSize: '44px', fontWeight: '900', color: s.color,
                    lineHeight: 1, marginBottom: '6px', letterSpacing: '-2px',
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.30)', fontWeight: '500' }}>
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
          background: 'rgba(0,0,0,0.06)',
          borderRadius: '12px', padding: '4px',
          width: 'fit-content',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'reports', label: 'Reports' },
            { id: 'awareness', label: 'Awareness' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '9px 22px', borderRadius: '9px',
              fontSize: '13px', fontWeight: '700', cursor: 'pointer',
              background: activeTab === tab.id ? '#BB0000' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'rgba(0,0,0,0.40)',
              border: 'none', transition: 'all 0.18s',
              boxShadow: activeTab === tab.id ? '0 2px 10px rgba(187,0,0,0.22)' : 'none',
              letterSpacing: '-0.1px',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Row 1 — 3 charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '16px' }}>

              {/* Pie */}
              <div style={{ ...card, padding: '22px' }}>
                {cardHeader('Risk Distribution')}
                {pieData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={46} outerRadius={70} paddingAngle={3} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={index} fill={entry.color}/>)}
                        </Pie>
                        <Tooltip contentStyle={{
                          background: '#fff', border: '1px solid rgba(0,0,0,0.10)',
                          borderRadius: '8px', color: '#111', fontSize: '12px',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                        }}/>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      {pieData.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }}/>
                          <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '11px', fontWeight: '600' }}>
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
                {cardHeader('Recent Risk Scores')}
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={185}>
                    <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)"/>
                      <XAxis dataKey="name" tick={{ fill: 'rgba(0,0,0,0.30)', fontSize: 10, fontWeight: 600 }}/>
                      <YAxis tick={{ fill: 'rgba(0,0,0,0.30)', fontSize: 10 }} domain={[0, 100]}/>
                      <Tooltip contentStyle={{
                        background: '#fff', border: '1px solid rgba(0,0,0,0.10)',
                        borderRadius: '8px', color: '#111', fontSize: '12px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                      }}/>
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {barData.map((entry, index) => <Cell key={index} fill={entry.fill}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState />}
              </div>

              {/* Department */}
              <div style={{ ...card, padding: '22px' }}>
                {cardHeader('Reports by Department')}
                {deptChartData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {deptChartData.map((d, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '12px', fontWeight: '600' }}>{d.dept}</span>
                          <span style={{ color: '#111', fontSize: '12px', fontWeight: '800' }}>{d.count}</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
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

            {/* Row 2 — timeline + awareness */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>

              {/* Threat timeline */}
              <div style={{ ...card, padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: '#BB0000' }}/>
                    <span style={{ color: '#111111', fontWeight: '700', fontSize: '13px' }}>Threat Timeline</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600' }}/>
                    <span style={{ color: 'rgba(0,0,0,0.30)', fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em' }}>LIVE</span>
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
                          borderBottom: i < threatTimeline.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                          cursor: 'pointer', transition: 'background 0.14s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#f8f9f8'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: riskColor(r.riskLevel), flexShrink: 0,
                          boxShadow: `0 0 5px ${riskColor(r.riskLevel)}55`,
                        }}/>
                        <span style={{ color: 'rgba(0,0,0,0.32)', fontSize: '11px', fontFamily: 'monospace', flexShrink: 0 }}>
                          {r.tokenId?.slice(0, 8)}...
                        </span>
                        <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '12px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }}>
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
                        <span style={{ color: 'rgba(0,0,0,0.22)', fontSize: '10px', flexShrink: 0, fontWeight: '500' }}>
                          {formatDate(r.createdAt).split(',')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState />}
              </div>

              {/* Awareness summary */}
              <div style={{ ...card, padding: '22px' }}>
                {cardHeader('Awareness Summary')}
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
                        background: '#f8f9f8',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}>
                        <span style={{ color: 'rgba(0,0,0,0.48)', fontSize: '12px', fontWeight: '600' }}>{item.label}</span>
                        <span style={{ color: item.color, fontWeight: '900', fontSize: '20px', letterSpacing: '-0.5px' }}>{item.value}</span>
                      </div>
                    ))}

                    {awarenessStats.byModule && Object.entries(awarenessStats.byModule).slice(0, 3).map(([mod, data], i) => (
                      <div key={i} style={{ marginTop: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '11px', fontWeight: '600' }}>{mod}</span>
                          <span style={{ color: '#006600', fontSize: '11px', fontWeight: '700' }}>{data.count} sessions</span>
                        </div>
                        <div style={{ height: '5px', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #006600, #22c55e)',
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
            {/* Search and filter bar */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
                <span style={{
                  position: 'absolute', left: '13px', top: '50%',
                  transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.25)', fontSize: '13px',
                }}>🔍</span>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by token ID or department..."
                  style={{
                    width: '100%', background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.10)',
                    borderRadius: '10px', color: '#111',
                    padding: '10px 14px 10px 36px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                    fontWeight: '500',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
                  <button key={level} onClick={() => setRiskFilter(level)} style={{
                    padding: '9px 16px', borderRadius: '9px', fontSize: '12px',
                    fontWeight: '700', cursor: 'pointer',
                    background: riskFilter === level
                      ? level === 'HIGH' ? '#BB0000'
                        : level === 'MEDIUM' ? '#d97706'
                        : level === 'LOW' ? '#006600'
                        : '#111111'
                      : '#ffffff',
                    color: riskFilter === level ? '#fff' : 'rgba(0,0,0,0.42)',
                    border: riskFilter === level ? 'none' : '1px solid rgba(0,0,0,0.10)',
                    boxShadow: riskFilter === level ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
                    transition: 'all 0.15s',
                    letterSpacing: '0.02em',
                  }}>
                    {level}
                  </button>
                ))}
              </div>

              <span style={{ color: 'rgba(0,0,0,0.32)', fontSize: '12px', marginLeft: 'auto', fontWeight: '600' }}>
                {filteredReports.length} of {reports.length} reports
              </span>

              <button onClick={fetchData} style={{
                fontSize: '12px', color: 'rgba(0,0,0,0.42)',
                border: '1px solid rgba(0,0,0,0.10)', borderRadius: '9px',
                padding: '9px 16px', background: '#ffffff', cursor: 'pointer',
                fontWeight: '700', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>↻ Refresh</button>
            </div>

            {/* Table */}
            <div style={{ ...card }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#f8f9f8' }}>
                      {['Token ID', 'Department', 'Risk', 'Score', 'Header', 'Date', 'Status'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', color: 'rgba(0,0,0,0.35)',
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
                        style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'background 0.12s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#f8f9f8'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '14px 20px', fontFamily: 'monospace', color: 'rgba(0,0,0,0.38)', fontSize: '12px' }}>
                          {report.tokenId?.slice(0, 12)}...
                        </td>
                        <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.58)', fontSize: '12px', fontWeight: '600' }}>
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
                        <td style={{ padding: '14px 20px', color: '#111', fontSize: '14px', fontWeight: '800' }}>
                          {report.riskScore}%
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            fontSize: '10px', padding: '3px 9px', borderRadius: '5px',
                            background: report.emailHeader ? 'rgba(0,102,0,0.07)' : 'rgba(0,0,0,0.04)',
                            color: report.emailHeader ? '#006600' : 'rgba(0,0,0,0.28)',
                            border: report.emailHeader ? '1px solid rgba(0,102,0,0.16)' : '1px solid rgba(0,0,0,0.08)',
                            fontWeight: '700',
                          }}>
                            {report.emailHeader ? 'Provided' : 'None'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.32)', fontSize: '11px', fontWeight: '500' }}>
                          {formatDate(report.createdAt)}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            fontSize: '10px', padding: '4px 10px', borderRadius: '6px',
                            background: report.alertSent ? 'rgba(187,0,0,0.07)' : report.status === 'resolved' ? 'rgba(0,102,0,0.07)' : 'rgba(217,119,6,0.07)',
                            color: report.alertSent ? '#BB0000' : report.status === 'resolved' ? '#006600' : '#d97706',
                            border: report.alertSent ? '1px solid rgba(187,0,0,0.16)' : report.status === 'resolved' ? '1px solid rgba(0,102,0,0.16)' : '1px solid rgba(217,119,6,0.16)',
                            fontWeight: '700',
                          }}>
                            {report.alertSent ? 'Alert Sent' : report.status === 'resolved' ? 'Resolved' : 'Under Review'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredReports.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: '52px', textAlign: 'center' }}>
                          <div style={{ fontSize: '28px', marginBottom: '10px', opacity: 0.4 }}>🔍</div>
                          <div style={{ color: 'rgba(0,0,0,0.30)', fontSize: '13px', fontWeight: '600' }}>
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
                { label: 'Active Modules', value: Object.keys(awarenessStats?.byModule || {}).length, color: '#111111', icon: '📚', sub: 'Training areas', border: '#1a1a1a' },
              ].map((s, i) => (
                <div key={i} style={{
                  borderRadius: '16px', background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                  overflow: 'hidden', display: 'flex',
                }}>
                  <div style={{ width: '5px', flexShrink: 0, background: s.border, opacity: 0.75 }}/>
                  <div style={{ flex: 1, padding: '20px' }}>
                    <div style={{ fontSize: '22px', marginBottom: '12px' }}>{s.icon}</div>
                    <div style={{ fontSize: '34px', fontWeight: '900', color: s.color, marginBottom: '4px', letterSpacing: '-1px' }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.24)', marginTop: '2px' }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...card, padding: '24px' }}>
              {cardHeader('Module Performance')}
              {awarenessStats && Object.entries(awarenessStats.byModule).length > 0 ? (
                Object.entries(awarenessStats.byModule).map(([mod, data], i) => (
                  <div key={i} style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                      <span style={{ color: 'rgba(0,0,0,0.58)', fontSize: '13px', fontWeight: '600' }}>{mod}</span>
                      <div style={{ display: 'flex', gap: '14px' }}>
                        <span style={{ color: '#006600', fontSize: '12px', fontWeight: '800' }}>
                          +{data.count > 0 ? (data.totalDelta / data.count).toFixed(1) : 0} pts avg
                        </span>
                        <span style={{ color: 'rgba(0,0,0,0.28)', fontSize: '12px', fontWeight: '600' }}>
                          {data.count} sessions
                        </span>
                      </div>
                    </div>
                    <div style={{ height: '7px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #006600, #22c55e)',
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

        {/* Bottom */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)',
            borderRadius: '9px', padding: '10px 20px',
            color: 'rgba(0,0,0,0.40)', fontSize: '12px', fontWeight: '700',
            cursor: 'pointer', transition: 'all 0.15s',
            boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
          }}
            onMouseOver={e => e.currentTarget.style.background = '#f4f5f4'}
            onMouseOut={e => e.currentTarget.style.background = '#ffffff'}>
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
    <div style={{ color: 'rgba(0,0,0,0.25)', fontSize: '12px', fontWeight: '600' }}>{message}</div>
  </div>
);

export default ITDashboard;