import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import RiskBadge from '../components/RiskBadge';
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
        axios.get(`${process.env.REACT_APP_API_URL}/awareness/stats`, { headers: { Authorization: `Bearer ${token}` } })
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
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const refreshInterval = setInterval(fetchData, 60000);
    return () => clearInterval(refreshInterval);
  }, [fetchData]);

  // Last updated countdown
  useEffect(() => {
    const tick = setInterval(() => setSecondsSince(s => s + 1), 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const handleLogout = () => { logout(); navigate('/it/login'); };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    if (secondsSince < 60) return `${secondsSince}s ago`;
    return `${Math.floor(secondsSince / 60)}m ago`;
  };

  // Chart data
  const pieData = stats ? [
    { name: 'HIGH', value: stats.high, color: '#ef4444' },
    { name: 'MEDIUM', value: stats.medium, color: '#f59e0b' },
    { name: 'LOW', value: stats.low, color: '#22c55e' }
  ].filter(d => d.value > 0) : [];

  const barData = reports.slice(0, 7).reverse().map((r, i) => ({
    name: `R${i + 1}`,
    score: r.riskScore,
    fill: r.riskLevel === 'HIGH' ? '#ef4444' : r.riskLevel === 'MEDIUM' ? '#f59e0b' : '#22c55e'
  }));

  // Department breakdown
  const deptData = reports.reduce((acc, r) => {
    const dept = r.department || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});
  const deptChartData = Object.entries(deptData)
    .map(([dept, count]) => ({ dept: dept.split('/')[0].trim(), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Score distribution for awareness
  const scoreDistribution = [
    { range: '0-40%', count: 0, color: '#ef4444' },
    { range: '40-70%', count: 0, color: '#f59e0b' },
    { range: '70-100%', count: 0, color: '#22c55e' },
  ];

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = searchQuery === '' ||
      r.tokenId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || r.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  // Threat timeline — last 10 reports
  const threatTimeline = [...reports]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const riskColor = (level) =>
    level === 'HIGH' ? '#ef4444' : level === 'MEDIUM' ? '#f59e0b' : '#22c55e';

  const riskBg = (level) =>
    level === 'HIGH' ? 'rgba(239,68,68,0.10)' : level === 'MEDIUM' ? 'rgba(245,158,11,0.10)' : 'rgba(34,197,94,0.10)';

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050d05' }}>
        <div style={{ textAlign: 'center' }}>
          <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
            width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050d05' }}>

      {/* Kenyan flag stripe */}
      <div style={{ height: '3px', display: 'flex', flexShrink: 0 }}>
        <div style={{ flex: 1, background: '#BB0000' }}/>
        <div style={{ flex: 1, background: '#1A1A1A' }}/>
        <div style={{ flex: 1, background: '#006600' }}/>
      </div>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '62px',
        background: 'rgba(4,10,5,0.96)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(145deg, #cc0000, #7a0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(187,0,0,0.40)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="rgba(255,255,255,0.95)"/>
              </svg>
            </div>
            <span style={{ color: '#fff', fontWeight: '800', fontSize: '16px', letterSpacing: '-0.3px' }}>
              Phish<span style={{ color: '#22c55e' }}>Ripoti</span>
            </span>
          </div>
          <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.08)' }}/>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', letterSpacing: '0.04em' }}>
            SECURITY PORTAL
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Last updated */}
          {lastUpdated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}/>
              <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '11px' }}>
                Updated {formatLastUpdated()}
              </span>
            </div>
          )}

          {/* Manager info */}
          {manager && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 12px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #006600, #004400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '700', color: '#fff',
              }}>
                {manager.name?.charAt(0).toUpperCase() || 'M'}
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: '600', lineHeight: 1.2 }}>
                  {manager.name || 'IT Manager'}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', lineHeight: 1.2 }}>
                  {manager.institution || 'Institution'}
                </div>
              </div>
            </div>
          )}

          <button onClick={fetchData} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '8px', padding: '7px 14px', fontSize: '12px',
            background: 'transparent', cursor: 'pointer', transition: 'all 0.16s',
          }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            ↻ Refresh
          </button>

          <button onClick={handleLogout} style={{
            color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '8px', padding: '7px 16px', fontSize: '12px',
            background: 'transparent', cursor: 'pointer', transition: 'all 0.16s',
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(187,0,0,0.12)'; e.currentTarget.style.color = '#ff8080'; e.currentTarget.style.borderColor = 'rgba(187,0,0,0.25)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ color: '#ffffff', fontWeight: '800', fontSize: '22px', margin: '0 0 4px', letterSpacing: '-0.4px' }}>
              Security Dashboard
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: '13px', margin: 0 }}>
              {new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · East Africa Time
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 12px', borderRadius: '8px',
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.18)',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}/>
            <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em' }}>
              SYSTEM ACTIVE
            </span>
          </div>
        </div>

        {error && (
          <div style={{
            marginBottom: '20px', padding: '12px 16px',
            background: 'rgba(187,0,0,0.10)', border: '1px solid rgba(187,0,0,0.25)',
            borderRadius: '10px', color: '#ff8080', fontSize: '13px',
          }}>{error}</div>
        )}

        {/* ── STAT CARDS ── */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              {
                label: 'Total Reports',
                value: stats.total,
                color: '#ffffff',
                icon: '📋',
                bg: 'rgba(255,255,255,0.04)',
                border: 'rgba(255,255,255,0.08)',
                sub: 'All time submissions',
              },
              {
                label: 'HIGH Risk',
                value: stats.high || 0,
                color: '#ef4444',
                icon: '🚨',
                bg: 'rgba(239,68,68,0.08)',
                border: 'rgba(239,68,68,0.20)',
                sub: `${stats.alertsSent || 0} alerts sent`,
              },
              {
                label: 'MEDIUM Risk',
                value: stats.medium || 0,
                color: '#f59e0b',
                icon: '⚠️',
                bg: 'rgba(245,158,11,0.08)',
                border: 'rgba(245,158,11,0.20)',
                sub: 'Under review',
              },
              {
                label: 'LOW Risk',
                value: stats.low || 0,
                color: '#22c55e',
                icon: '✓',
                bg: 'rgba(34,197,94,0.08)',
                border: 'rgba(34,197,94,0.20)',
                sub: 'Resolved',
              },
            ].map((s, i) => (
              <div key={i} style={{
                borderRadius: '14px', padding: '18px 20px',
                background: s.bg,
                border: `1px solid ${s.border}`,
                backdropFilter: 'blur(12px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${s.color}44, ${s.color}22, transparent)`,
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{s.icon}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize: '38px', fontWeight: '900', color: s.color, lineHeight: 1, marginBottom: '6px', letterSpacing: '-1px' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── TABS ── */}
        <div style={{
          display: 'flex', gap: '2px', marginBottom: '20px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '11px', padding: '3px',
          width: 'fit-content',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '◈' },
            { id: 'reports', label: 'Reports', icon: '≡' },
            { id: 'awareness', label: 'Awareness', icon: '◉' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '8px 18px', borderRadius: '9px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              background: activeTab === tab.id ? '#BB0000' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.38)',
              border: 'none', transition: 'all 0.18s',
              display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: activeTab === tab.id ? '0 2px 10px rgba(187,0,0,0.30)' : 'none',
            }}>
              <span style={{ fontSize: '11px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Row 1 — charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>

              {/* Pie chart */}
              <div style={{ borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>◈</span> Risk Distribution
                </div>
                {pieData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={3} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={index} fill={entry.color}/>)}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#0d150d', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '8px', color: '#fff', fontSize: '12px' }}/>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
                      {pieData.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}/>
                          <span style={{ color: 'rgba(255,255,255,0.50)', fontSize: '11px' }}>{item.name} <strong style={{ color: '#fff' }}>{item.value}</strong></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <EmptyState message="No reports yet"/>}
              </div>

              {/* Bar chart — risk scores */}
              <div style={{ borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>◈</span> Recent Risk Scores
                </div>
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                      <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.28)', fontSize: 10 }}/>
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.28)', fontSize: 10 }} domain={[0, 100]}/>
                      <Tooltip contentStyle={{ background: '#0d150d', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '8px', color: '#fff', fontSize: '12px' }}/>
                      <Bar dataKey="score" radius={[5, 5, 0, 0]}>
                        {barData.map((entry, index) => <Cell key={index} fill={entry.fill}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState message="No reports yet"/>}
              </div>

              {/* Department breakdown */}
              <div style={{ borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>◈</span> Reports by Department
                </div>
                {deptChartData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {deptChartData.map((d, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: '11px' }}>{d.dept}</span>
                          <span style={{ color: '#fff', fontSize: '11px', fontWeight: '700' }}>{d.count}</span>
                        </div>
                        <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: '4px',
                            background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#22c55e',
                            width: `${(d.count / (deptChartData[0]?.count || 1)) * 100}%`,
                          }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState message="No reports yet"/>}
              </div>
            </div>

            {/* Row 2 — threat timeline + awareness summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px' }}>

              {/* Threat timeline */}
              <div style={{ borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>◈</span> Threat Timeline
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 5px #22c55e' }}/>
                    <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px' }}>LIVE</span>
                  </div>
                </div>
                {threatTimeline.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                    {threatTimeline.map((r, i) => (
                      <div
                        key={i}
                        onClick={() => navigate(`/it/report/${r.tokenId}`)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          padding: '10px 0',
                          borderBottom: i < threatTimeline.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseOver={e => e.currentTarget.style.paddingLeft = '6px'}
                        onMouseOut={e => e.currentTarget.style.paddingLeft = '0px'}
                      >
                        {/* Risk dot */}
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: riskColor(r.riskLevel),
                          boxShadow: `0 0 6px ${riskColor(r.riskLevel)}`,
                          flexShrink: 0,
                        }}/>
                        {/* Token */}
                        <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px', fontFamily: 'monospace', flexShrink: 0 }}>
                          {r.tokenId?.slice(0, 8)}...
                        </span>
                        {/* Department */}
                        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.department || 'Unknown dept'}
                        </span>
                        {/* Risk badge */}
                        <div style={{
                          padding: '2px 8px', borderRadius: '5px',
                          background: riskBg(r.riskLevel),
                          border: `1px solid ${riskColor(r.riskLevel)}33`,
                          fontSize: '10px', fontWeight: '700',
                          color: riskColor(r.riskLevel),
                          flexShrink: 0,
                        }}>
                          {r.riskLevel}
                        </div>
                        {/* Time */}
                        <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '10px', flexShrink: 0 }}>
                          {formatDate(r.createdAt).split(',')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState message="No threats recorded yet"/>}
              </div>

              {/* Awareness summary */}
              <div style={{ borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>◈</span> Awareness Summary
                </div>
                {awarenessStats ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'Total Sessions', value: awarenessStats.totalSessions, color: '#22c55e' },
                      { label: 'Avg Improvement', value: `+${awarenessStats.avgDelta} pts`, color: '#f59e0b' },
                      { label: 'Active Modules', value: Object.keys(awarenessStats.byModule || {}).length, color: '#ffffff' },
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 14px', borderRadius: '10px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <span style={{ color: 'rgba(255,255,255,0.50)', fontSize: '12px' }}>{item.label}</span>
                        <span style={{ color: item.color, fontWeight: '800', fontSize: '18px' }}>{item.value}</span>
                      </div>
                    ))}

                    {/* Score distribution */}
                    <div style={{ marginTop: '6px' }}>
                      <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                        Score Distribution
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {scoreDistribution.map((s, i) => (
                          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{
                              height: '40px', borderRadius: '6px',
                              background: `${s.color}18`,
                              border: `1px solid ${s.color}30`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              marginBottom: '4px',
                            }}>
                              <span style={{ color: s.color, fontWeight: '700', fontSize: '14px' }}>{s.count}</span>
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '9px' }}>{s.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : <EmptyState message="No awareness sessions yet"/>}
              </div>
            </div>
          </div>
        )}

        {/* ── REPORTS TAB ── */}
        {activeTab === 'reports' && (
          <div>
            {/* Search and filter bar */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '340px' }}>
                <span style={{
                  position: 'absolute', left: '12px', top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.25)', fontSize: '13px',
                }}>🔍</span>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by token ID or department..."
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '9px', color: '#fff',
                    padding: '9px 14px 9px 34px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Risk filter */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
                  <button key={level} onClick={() => setRiskFilter(level)} style={{
                    padding: '8px 14px', borderRadius: '8px', fontSize: '12px',
                    fontWeight: '600', cursor: 'pointer', border: 'none',
                    background: riskFilter === level
                      ? level === 'HIGH' ? '#ef4444'
                        : level === 'MEDIUM' ? '#f59e0b'
                        : level === 'LOW' ? '#22c55e'
                        : 'rgba(255,255,255,0.15)'
                      : 'rgba(255,255,255,0.05)',
                    color: riskFilter === level ? '#fff' : 'rgba(255,255,255,0.40)',
                    transition: 'all 0.15s',
                  }}>
                    {level}
                  </button>
                ))}
              </div>

              <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', marginLeft: 'auto' }}>
                {filteredReports.length} of {reports.length} reports
              </span>

              <button onClick={fetchData} style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.10)', borderRadius: '8px',
                padding: '8px 14px', background: 'transparent', cursor: 'pointer',
              }}>↻ Refresh</button>
            </div>

            {/* Table */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      {['Token ID', 'Department', 'Risk', 'Score', 'Header', 'Date', 'Status'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', color: 'rgba(255,255,255,0.28)',
                          fontSize: '10px', fontWeight: '700', padding: '12px 18px',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                          background: 'rgba(255,255,255,0.02)',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.slice(0, 25).map((report, i) => (
                      <tr key={i}
                        onClick={() => navigate(`/it/report/${report.tokenId}`)}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '13px 18px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>
                          {report.tokenId?.slice(0, 12)}...
                        </td>
                        <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.60)', fontSize: '12px' }}>
                          {report.department || '—'}
                        </td>
                        <td style={{ padding: '13px 18px' }}>
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '3px 9px', borderRadius: '5px',
                            background: riskBg(report.riskLevel),
                            border: `1px solid ${riskColor(report.riskLevel)}33`,
                          }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: riskColor(report.riskLevel) }}/>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: riskColor(report.riskLevel) }}>
                              {report.riskLevel}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: '600' }}>
                          {report.riskScore}%
                        </td>
                        <td style={{ padding: '13px 18px' }}>
                          <span style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '5px',
                            background: report.emailHeader ? 'rgba(34,197,94,0.10)' : 'rgba(255,255,255,0.04)',
                            color: report.emailHeader ? '#22c55e' : 'rgba(255,255,255,0.22)',
                            border: report.emailHeader ? '1px solid rgba(34,197,94,0.20)' : '1px solid rgba(255,255,255,0.07)',
                          }}>
                            {report.emailHeader ? 'Provided' : 'None'}
                          </span>
                        </td>
                        <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.30)', fontSize: '11px' }}>
                          {formatDate(report.createdAt)}
                        </td>
                        <td style={{ padding: '13px 18px' }}>
                          <span style={{
                            fontSize: '10px', padding: '3px 9px', borderRadius: '5px',
                            background: report.alertSent ? 'rgba(239,68,68,0.10)' : report.status === 'resolved' ? 'rgba(34,197,94,0.10)' : 'rgba(245,158,11,0.08)',
                            color: report.alertSent ? '#ef4444' : report.status === 'resolved' ? '#22c55e' : '#f59e0b',
                            border: report.alertSent ? '1px solid rgba(239,68,68,0.22)' : report.status === 'resolved' ? '1px solid rgba(34,197,94,0.22)' : '1px solid rgba(245,158,11,0.18)',
                            fontWeight: '600',
                          }}>
                            {report.alertSent ? 'Alert Sent' : report.status === 'resolved' ? 'Resolved' : 'Under Review'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredReports.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: '48px', textAlign: 'center' }}>
                          <div style={{ fontSize: '28px', marginBottom: '10px' }}>🔍</div>
                          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>No reports match your search</div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { label: 'Total Sessions', value: awarenessStats?.totalSessions || 0, color: '#22c55e', icon: '📊', sub: 'Staff trained' },
                { label: 'Avg Improvement', value: `+${awarenessStats?.avgDelta || 0} pts`, color: '#f59e0b', icon: '📈', sub: 'Knowledge gain' },
                { label: 'Active Modules', value: Object.keys(awarenessStats?.byModule || {}).length, color: '#ffffff', icon: '📚', sub: 'Training areas' },
              ].map((s, i) => (
                <div key={i} style={{
                  borderRadius: '14px', padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${s.color}44, transparent)`,
                  }}/>
                  <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.icon}</div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: s.color, marginBottom: '4px', letterSpacing: '-1px' }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.20)', marginTop: '2px' }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
              {/* Module breakdown */}
              <div style={{ borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>Module Performance</div>
                {awarenessStats && Object.entries(awarenessStats.byModule).length > 0 ? (
                  Object.entries(awarenessStats.byModule).map(([mod, data], i) => (
                    <div key={i} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>{mod}</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600' }}>
                            +{data.count > 0 ? (data.totalDelta / data.count).toFixed(1) : 0} pts
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
                            {data.count} sessions
                          </span>
                        </div>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #006600, #22c55e)',
                          borderRadius: '4px',
                          width: `${Math.min((data.count / (awarenessStats.totalSessions || 1)) * 100, 100)}%`,
                        }}/>
                      </div>
                    </div>
                  ))
                ) : <EmptyState message="No sessions recorded yet"/>}
              </div>

              {/* Score distribution */}
              <div style={{ borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>Score Distribution</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {scoreDistribution.map((s, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>{s.range}</span>
                        <span style={{ color: s.color, fontSize: '12px', fontWeight: '700' }}>{s.count} staff</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', background: s.color, borderRadius: '4px',
                          width: s.count > 0 ? `${(s.count / (awarenessStats?.totalSessions || 1)) * 100}%` : '0%',
                        }}/>
                      </div>
                    </div>
                  ))}
                </div>
                {(!awarenessStats || awarenessStats.totalSessions === 0) && (
                  <EmptyState message="No quiz data yet"/>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '9px', padding: '9px 18px',
            color: 'rgba(255,255,255,0.38)', fontSize: '12px',
            cursor: 'pointer', transition: 'all 0.16s',
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

// Empty state component
const EmptyState = ({ message }) => (
  <div style={{ textAlign: 'center', padding: '32px 0' }}>
    <div style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.4 }}>◎</div>
    <div style={{ color: 'rgba(255,255,255,0.22)', fontSize: '12px' }}>{message}</div>
  </div>
);

export default ITDashboard;