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
    level === 'HIGH' ? 'rgba(187,0,0,0.08)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.08)' : 'rgba(0,102,0,0.08)';

  const riskBorder = (level) =>
    level === 'HIGH' ? 'rgba(187,0,0,0.20)' : level === 'MEDIUM' ? 'rgba(217,119,6,0.20)' : 'rgba(0,102,0,0.20)';

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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <svg style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }}
            width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.08)" strokeWidth="3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: 'rgba(0,0,0,0.40)', fontSize: '14px' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f4f5f7' }}>

      {/* Kenyan flag stripe */}
      <div style={{ height: '3px', display: 'flex', flexShrink: 0 }}>
        <div style={{ flex: 1, background: '#BB0000' }}/>
        <div style={{ flex: 1, background: '#1a1a1a' }}/>
        <div style={{ flex: 1, background: '#006600' }}/>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '62px',
        background: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(145deg, #cc0000, #7a0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(187,0,0,0.30)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                  fill="rgba(255,255,255,0.95)"/>
              </svg>
            </div>
            <span style={{ fontSize: '17px', fontWeight: '800', letterSpacing: '-0.4px', color: '#111111' }}>
              Phish<span style={{ color: '#006600' }}>Ripoti</span>
            </span>
          </div>
          <div style={{ width: '1px', height: '18px', background: 'rgba(0,0,0,0.10)' }}/>
          <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Security Portal
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Live indicator */}
          {lastUpdated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600', boxShadow: '0 0 5px rgba(0,102,0,0.50)' }}/>
              <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '11px' }}>
                Updated {formatLastUpdated()}
              </span>
            </div>
          )}

          {/* Manager info */}
          {manager && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 12px', borderRadius: '8px',
              background: '#f8f9fa',
              border: '1px solid rgba(0,0,0,0.08)',
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
                <div style={{ color: '#111111', fontSize: '12px', fontWeight: '700', lineHeight: 1.2 }}>
                  {manager.name || 'IT Manager'}
                </div>
                <div style={{ color: 'rgba(0,0,0,0.38)', fontSize: '10px', lineHeight: 1.2 }}>
                  {manager.institution || 'Institution'}
                </div>
              </div>
            </div>
          )}

          <button onClick={fetchData} style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            color: 'rgba(0,0,0,0.45)', border: '1px solid rgba(0,0,0,0.10)',
            borderRadius: '8px', padding: '7px 13px', fontSize: '12px',
            background: 'transparent', cursor: 'pointer', transition: 'all 0.15s',
            fontWeight: '600',
          }}
            onMouseOver={e => e.currentTarget.style.background = '#f4f5f7'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            ↻ Refresh
          </button>

          <button onClick={handleLogout} style={{
            color: '#BB0000', border: '1px solid rgba(187,0,0,0.20)',
            borderRadius: '8px', padding: '7px 16px', fontSize: '12px',
            background: 'rgba(187,0,0,0.05)', cursor: 'pointer',
            transition: 'all 0.15s', fontWeight: '600',
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(187,0,0,0.10)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(187,0,0,0.05)'; }}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ color: '#111111', fontWeight: '800', fontSize: '22px', margin: '0 0 4px', letterSpacing: '-0.4px' }}>
              Security Dashboard
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.38)', fontSize: '13px', margin: 0 }}>
              {new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · East Africa Time
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '8px',
            background: 'rgba(0,102,0,0.07)',
            border: '1px solid rgba(0,102,0,0.18)',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#006600', boxShadow: '0 0 5px rgba(0,102,0,0.50)' }}/>
            <span style={{ color: '#006600', fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em' }}>
              SYSTEM ACTIVE
            </span>
          </div>
        </div>

        {error && (
          <div style={{
            marginBottom: '20px', padding: '12px 16px',
            background: 'rgba(187,0,0,0.06)', border: '1px solid rgba(187,0,0,0.20)',
            borderRadius: '10px', color: '#BB0000', fontSize: '13px',
          }}>{error}</div>
        )}

        {/* ── STAT CARDS ── */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Total Reports', value: stats.total, color: '#111111', accent: '#1a1a1a', icon: '📋', sub: 'All submissions', bg: '#ffffff', border: 'rgba(0,0,0,0.08)' },
              { label: 'HIGH Risk', value: stats.high || 0, color: '#BB0000', accent: '#BB0000', icon: '🚨', sub: `${stats.alertsSent || 0} alerts sent`, bg: '#ffffff', border: 'rgba(187,0,0,0.15)' },
              { label: 'MEDIUM Risk', value: stats.medium || 0, color: '#d97706', accent: '#d97706', icon: '⚠️', sub: 'Under review', bg: '#ffffff', border: 'rgba(217,119,6,0.15)' },
              { label: 'LOW Risk', value: stats.low || 0, color: '#006600', accent: '#006600', icon: '✓', sub: 'Resolved', bg: '#ffffff', border: 'rgba(0,102,0,0.15)' },
            ].map((s, i) => (
              <div key={i} style={{
                borderRadius: '14px', padding: '18px 20px',
                background: s.bg, border: `1px solid ${s.border}`,
                boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: s.accent, opacity: 0.7,
                }}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{s.icon}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize: '38px', fontWeight: '900', color: s.color, lineHeight: 1, marginBottom: '5px', letterSpacing: '-1px' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.32)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── TABS ── */}
        <div style={{
          display: 'flex', gap: '2px', marginBottom: '20px',
          background: 'rgba(0,0,0,0.05)',
          borderRadius: '11px', padding: '3px',
          width: 'fit-content',
          border: '1px solid rgba(0,0,0,0.07)',
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'reports', label: 'Reports' },
            { id: 'awareness', label: 'Awareness' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '8px 20px', borderRadius: '9px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              background: activeTab === tab.id ? '#BB0000' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'rgba(0,0,0,0.42)',
              border: 'none', transition: 'all 0.18s',
              boxShadow: activeTab === tab.id ? '0 2px 8px rgba(187,0,0,0.25)' : 'none',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Row 1 — 3 charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>

              {/* Pie */}
              <div style={{ borderRadius: '14px', padding: '20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#111111', fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>
                  Risk Distribution
                </div>
                {pieData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={index} fill={entry.color}/>)}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.10)', borderRadius: '8px', color: '#111', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}/>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                      {pieData.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}/>
                          <span style={{ color: 'rgba(0,0,0,0.50)', fontSize: '11px' }}>{item.name} <strong style={{ color: '#111' }}>{item.value}</strong></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <EmptyState />}
              </div>

              {/* Bar — risk scores */}
              <div style={{ borderRadius: '14px', padding: '20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#111111', fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>
                  Recent Risk Scores
                </div>
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={170}>
                    <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)"/>
                      <XAxis dataKey="name" tick={{ fill: 'rgba(0,0,0,0.35)', fontSize: 10 }}/>
                      <YAxis tick={{ fill: 'rgba(0,0,0,0.35)', fontSize: 10 }} domain={[0, 100]}/>
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.10)', borderRadius: '8px', color: '#111', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}/>
                      <Bar dataKey="score" radius={[5, 5, 0, 0]}>
                        {barData.map((entry, index) => <Cell key={index} fill={entry.fill}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState />}
              </div>

              {/* Department breakdown */}
              <div style={{ borderRadius: '14px', padding: '20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#111111', fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>
                  Reports by Department
                </div>
                {deptChartData.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {deptChartData.map((d, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '11px' }}>{d.dept}</span>
                          <span style={{ color: '#111', fontSize: '11px', fontWeight: '700' }}>{d.count}</span>
                        </div>
                        <div style={{ height: '5px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: '4px',
                            background: i === 0 ? '#BB0000' : i === 1 ? '#d97706' : '#006600',
                            width: `${(d.count / (deptChartData[0]?.count || 1)) * 100}%`,
                          }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState />}
              </div>
            </div>

            {/* Row 2 — threat timeline + awareness */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px' }}>

              {/* Threat timeline */}
              <div style={{ borderRadius: '14px', padding: '20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ color: '#111111', fontWeight: '700', fontSize: '13px' }}>Threat Timeline</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#006600', boxShadow: '0 0 4px rgba(0,102,0,0.50)' }}/>
                    <span style={{ color: 'rgba(0,0,0,0.30)', fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }}>LIVE</span>
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
                          padding: '10px 8px',
                          borderBottom: i < threatTimeline.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                          cursor: 'pointer', borderRadius: '8px',
                          transition: 'background 0.15s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background: riskColor(r.riskLevel),
                          flexShrink: 0,
                        }}/>
                        <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '11px', fontFamily: 'monospace', flexShrink: 0 }}>
                          {r.tokenId?.slice(0, 8)}...
                        </span>
                        <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '11px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.department || 'Unknown'}
                        </span>
                        <div style={{
                          padding: '2px 8px', borderRadius: '5px',
                          background: riskBg(r.riskLevel),
                          border: `1px solid ${riskBorder(r.riskLevel)}`,
                          fontSize: '10px', fontWeight: '700',
                          color: riskColor(r.riskLevel), flexShrink: 0,
                        }}>
                          {r.riskLevel}
                        </div>
                        <span style={{ color: 'rgba(0,0,0,0.25)', fontSize: '10px', flexShrink: 0 }}>
                          {formatDate(r.createdAt).split(',')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState />}
              </div>

              {/* Awareness summary */}
              <div style={{ borderRadius: '14px', padding: '20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#111111', fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>
                  Awareness Summary
                </div>
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
                        background: '#f8f9fa', border: '1px solid rgba(0,0,0,0.06)',
                      }}>
                        <span style={{ color: 'rgba(0,0,0,0.50)', fontSize: '12px' }}>{item.label}</span>
                        <span style={{ color: item.color, fontWeight: '800', fontSize: '18px' }}>{item.value}</span>
                      </div>
                    ))}

                    {/* Module breakdown */}
                    {awarenessStats.byModule && Object.entries(awarenessStats.byModule).slice(0, 3).map(([mod, data], i) => (
                      <div key={i} style={{ marginTop: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: 'rgba(0,0,0,0.50)', fontSize: '11px' }}>{mod}</span>
                          <span style={{ color: '#006600', fontSize: '11px', fontWeight: '600' }}>
                            {data.count} sessions
                          </span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', background: '#006600', borderRadius: '3px',
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
            {/* Search and filter */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '340px' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.28)', fontSize: '13px' }}>🔍</span>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by token ID or department..."
                  style={{
                    width: '100%', background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.10)',
                    borderRadius: '9px', color: '#111',
                    padding: '9px 14px 9px 34px', fontSize: '13px',
                    outline: 'none', boxSizing: 'border-box',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                />
              </div>

              {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
                <button key={level} onClick={() => setRiskFilter(level)} style={{
                  padding: '8px 14px', borderRadius: '8px', fontSize: '12px',
                  fontWeight: '600', cursor: 'pointer', border: '1px solid transparent',
                  background: riskFilter === level
                    ? level === 'HIGH' ? '#BB0000'
                      : level === 'MEDIUM' ? '#d97706'
                      : level === 'LOW' ? '#006600'
                      : '#111111'
                    : '#ffffff',
                  color: riskFilter === level ? '#fff' : 'rgba(0,0,0,0.45)',
                  borderColor: riskFilter === level ? 'transparent' : 'rgba(0,0,0,0.10)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s',
                }}>
                  {level}
                </button>
              ))}

              <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '12px', marginLeft: 'auto' }}>
                {filteredReports.length} of {reports.length}
              </span>

              <button onClick={fetchData} style={{
                fontSize: '12px', color: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(0,0,0,0.10)', borderRadius: '8px',
                padding: '8px 14px', background: '#ffffff', cursor: 'pointer',
                fontWeight: '600',
              }}>↻ Refresh</button>
            </div>

            {/* Table */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#ffffff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#f8f9fa' }}>
                      {['Token ID', 'Department', 'Risk', 'Score', 'Header', 'Date', 'Status'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', color: 'rgba(0,0,0,0.40)',
                          fontSize: '10px', fontWeight: '700', padding: '12px 18px',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.slice(0, 25).map((report, i) => (
                      <tr key={i}
                        onClick={() => navigate(`/it/report/${report.tokenId}`)}
                        style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'background 0.12s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '13px 18px', fontFamily: 'monospace', color: 'rgba(0,0,0,0.40)', fontSize: '12px' }}>
                          {report.tokenId?.slice(0, 12)}...
                        </td>
                        <td style={{ padding: '13px 18px', color: 'rgba(0,0,0,0.60)', fontSize: '12px' }}>
                          {report.department || '—'}
                        </td>
                        <td style={{ padding: '13px 18px' }}>
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '3px 9px', borderRadius: '5px',
                            background: riskBg(report.riskLevel),
                            border: `1px solid ${riskBorder(report.riskLevel)}`,
                          }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: riskColor(report.riskLevel) }}/>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: riskColor(report.riskLevel) }}>
                              {report.riskLevel}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '13px 18px', color: '#111', fontSize: '13px', fontWeight: '700' }}>
                          {report.riskScore}%
                        </td>
                        <td style={{ padding: '13px 18px' }}>
                          <span style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '5px',
                            background: report.emailHeader ? 'rgba(0,102,0,0.07)' : 'rgba(0,0,0,0.04)',
                            color: report.emailHeader ? '#006600' : 'rgba(0,0,0,0.30)',
                            border: report.emailHeader ? '1px solid rgba(0,102,0,0.18)' : '1px solid rgba(0,0,0,0.08)',
                            fontWeight: '600',
                          }}>
                            {report.emailHeader ? 'Provided' : 'None'}
                          </span>
                        </td>
                        <td style={{ padding: '13px 18px', color: 'rgba(0,0,0,0.35)', fontSize: '11px' }}>
                          {formatDate(report.createdAt)}
                        </td>
                        <td style={{ padding: '13px 18px' }}>
                          <span style={{
                            fontSize: '10px', padding: '3px 9px', borderRadius: '5px',
                            background: report.alertSent ? 'rgba(187,0,0,0.07)' : report.status === 'resolved' ? 'rgba(0,102,0,0.07)' : 'rgba(217,119,6,0.07)',
                            color: report.alertSent ? '#BB0000' : report.status === 'resolved' ? '#006600' : '#d97706',
                            border: report.alertSent ? '1px solid rgba(187,0,0,0.18)' : report.status === 'resolved' ? '1px solid rgba(0,102,0,0.18)' : '1px solid rgba(217,119,6,0.18)',
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
                          <div style={{ color: 'rgba(0,0,0,0.32)', fontSize: '13px' }}>No reports match your search</div>
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
                { label: 'Total Sessions', value: awarenessStats?.totalSessions || 0, color: '#006600', icon: '📊', sub: 'Staff trained' },
                { label: 'Avg Improvement', value: `+${awarenessStats?.avgDelta || 0} pts`, color: '#d97706', icon: '📈', sub: 'Knowledge gain' },
                { label: 'Active Modules', value: Object.keys(awarenessStats?.byModule || {}).length, color: '#111111', icon: '📚', sub: 'Training areas' },
              ].map((s, i) => (
                <div key={i} style={{
                  borderRadius: '14px', padding: '20px',
                  background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.color, opacity: 0.6 }}/>
                  <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.icon}</div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: s.color, marginBottom: '4px', letterSpacing: '-1px' }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.40)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: '600' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.25)', marginTop: '2px' }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: '14px', padding: '22px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ color: '#111111', fontWeight: '700', fontSize: '13px', marginBottom: '18px' }}>Module Performance</div>
              {awarenessStats && Object.entries(awarenessStats.byModule).length > 0 ? (
                Object.entries(awarenessStats.byModule).map(([mod, data], i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: 'rgba(0,0,0,0.60)', fontSize: '13px' }}>{mod}</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ color: '#006600', fontSize: '12px', fontWeight: '700' }}>
                          +{data.count > 0 ? (data.totalDelta / data.count).toFixed(1) : 0} pts avg
                        </span>
                        <span style={{ color: 'rgba(0,0,0,0.30)', fontSize: '12px' }}>
                          {data.count} sessions
                        </span>
                      </div>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #006600, #22c55e)',
                        borderRadius: '4px',
                        width: `${Math.min((data.count / (awarenessStats.totalSessions || 1)) * 100, 100)}%`,
                      }}/>
                    </div>
                  </div>
                ))
              ) : <EmptyState />}
            </div>
          </div>
        )}

        {/* Bottom */}
        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)',
            borderRadius: '9px', padding: '9px 18px',
            color: 'rgba(0,0,0,0.42)', fontSize: '12px', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.15s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
            onMouseOver={e => e.currentTarget.style.background = '#f4f5f7'}
            onMouseOut={e => e.currentTarget.style.background = '#ffffff'}>
            ← Back to PhishRipoti
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ message = 'No data yet' }) => (
  <div style={{ textAlign: 'center', padding: '28px 0' }}>
    <div style={{ fontSize: '22px', marginBottom: '8px', opacity: 0.3 }}>◎</div>
    <div style={{ color: 'rgba(0,0,0,0.28)', fontSize: '12px' }}>{message}</div>
  </div>
);

export default ITDashboard;