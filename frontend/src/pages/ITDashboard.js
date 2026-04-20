import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
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
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const pieData = stats ? [
    { name: 'HIGH', value: stats.high, color: '#BB0000' },
    { name: 'MEDIUM', value: stats.medium, color: '#ea9600' },
    { name: 'LOW', value: stats.low, color: '#006600' }
  ].filter(d => d.value > 0) : [];

  const barData = reports.slice(0, 7).reverse().map((r, i) => ({
    name: `RPT-${i + 1}`, score: r.riskScore,
    fill: r.riskLevel === 'HIGH' ? '#BB0000' : r.riskLevel === 'MEDIUM' ? '#ea9600' : '#006600'
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0d0a' }}>
        <svg className="animate-spin" width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#BB0000" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <div className="flex h-1">
        <div className="flex-1 bg-red-700"></div>
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-green-800"></div>
      </div>
      <nav className="flex items-center justify-between px-8 h-14 bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V6L12 2z" fill="#BB0000"/>
          </svg>
          <span className="text-white font-bold text-base">PhishRipoti — IT Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs px-2 py-1 rounded border text-red-400"
            style={{ background: 'rgba(187,0,0,0.2)', borderColor: 'rgba(187,0,0,0.4)' }}>IT Manager</span>
          <span className="text-gray-500 text-sm">{manager?.email}</span>
          <button onClick={handleLogout}
            className="text-gray-400 border border-gray-700 rounded-lg px-4 py-1.5 text-sm hover:bg-gray-800 transition-all">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mb-6">
          <h2 className="text-white font-semibold text-xl mb-1">Security Dashboard</h2>
          <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} EAT</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm text-red-400 border border-red-900"
            style={{ background: 'rgba(187,0,0,0.1)' }}>{error}</div>
        )}

        {stats && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Total Reports', value: stats.total, color: 'text-white' },
              { label: 'HIGH Risk Alerts', value: stats.alertsSent, color: 'text-red-400', sub: 'via SendGrid' },
              { label: 'MEDIUM Risk', value: stats.medium, color: 'text-yellow-400' },
              { label: 'LOW Risk', value: stats.low, color: 'text-green-400' }
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
                <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-gray-500 text-xs">{s.label}</div>
                {s.sub && <div className="text-gray-600 text-xs mt-1">{s.sub}</div>}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mb-6">
          {['overview', 'reports', 'awareness'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
              style={{
                background: activeTab === tab ? '#BB0000' : '#1a1f1a',
                color: activeTab === tab ? '#fff' : '#8b949e',
                border: `1px solid ${activeTab === tab ? '#BB0000' : 'rgba(255,255,255,0.1)'}`
              }}>
              {tab === 'overview' ? 'Overview' : tab === 'reports' ? 'Reports' : 'Awareness Stats'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
              <div className="text-white font-semibold text-sm mb-4">Risk Tier Distribution</div>
              {pieData.length > 0 ? (
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="60%" height={180}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={index} fill={entry.color}/>)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1a1f1a', border: '1px solid #333', borderRadius: '8px' }}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {pieData.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div>
                        <span className="text-gray-400 text-xs">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <div className="text-gray-600 text-sm py-8 text-center">No reports yet</div>}
            </div>

            <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
              <div className="text-white font-semibold text-sm mb-4">Recent Report Risk Scores</div>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                    <XAxis dataKey="name" tick={{ fill: '#8b949e', fontSize: 10 }}/>
                    <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} domain={[0, 100]}/>
                    <Tooltip contentStyle={{ background: '#1a1f1a', border: '1px solid #333', borderRadius: '8px' }}/>
                    <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                      {barData.map((entry, index) => <Cell key={index} fill={entry.fill}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : <div className="text-gray-600 text-sm py-8 text-center">No reports yet</div>}
            </div>

            <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
              <div className="text-white font-semibold text-sm mb-4">Recent HIGH Risk Alerts</div>
              {reports.filter(r => r.riskLevel === 'HIGH').slice(0, 4).map((report, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                  <span className="text-gray-500 text-xs font-mono">{report.tokenId}</span>
                  <RiskBadge level={report.riskLevel}/>
                </div>
              ))}
              {reports.filter(r => r.riskLevel === 'HIGH').length === 0 && (
                <div className="text-gray-600 text-sm">No HIGH risk reports yet</div>
              )}
            </div>

            <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
              <div className="text-white font-semibold text-sm mb-4">Awareness Hub Summary</div>
              {awarenessStats ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Total quiz sessions</span>
                    <span className="text-white font-bold">{awarenessStats.totalSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Average improvement</span>
                    <span className="text-green-400 font-bold">+{awarenessStats.avgDelta} pts</span>
                  </div>
                </div>
              ) : <div className="text-gray-600 text-sm">No awareness sessions yet</div>}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="rounded-xl border border-gray-800 overflow-hidden" style={{ background: '#1a1f1a' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <div className="text-white font-semibold text-sm">Anonymised Reports</div>
              <button onClick={fetchData}
                className="text-xs text-gray-400 border border-gray-700 rounded px-3 py-1 hover:bg-gray-800 transition-all">
                Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    {['Token ID', 'Risk', 'Score', 'Dept', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left text-gray-500 text-xs font-medium px-5 py-3 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.slice(0, 20).map((report, i) => (
                    <tr key={i} className="border-b border-gray-900 hover:bg-gray-900 cursor-pointer transition-all"
                      onClick={() => navigate(`/it/report/${report.tokenId}`)}>
                      <td className="px-5 py-3 font-mono text-gray-400 text-xs">{report.tokenId}</td>
                      <td className="px-5 py-3"><RiskBadge level={report.riskLevel}/></td>
                      <td className="px-5 py-3 text-gray-400 text-xs">{report.riskScore}%</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">Stripped</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{formatDate(report.createdAt)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-1 rounded border ${
                          report.alertSent ? 'text-red-400 border-red-900 bg-red-900 bg-opacity-20' :
                          report.status === 'resolved' ? 'text-green-400 border-green-900 bg-green-900 bg-opacity-20' :
                          'text-yellow-400 border-yellow-900 bg-yellow-900 bg-opacity-20'
                        }`}>
                          {report.alertSent ? 'Alert Sent' : report.status === 'resolved' ? 'Resolved' : 'Under Review'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {reports.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-600 text-sm">No reports yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'awareness' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
                <div className="text-3xl font-bold text-green-400 mb-1">{awarenessStats?.totalSessions || 0}</div>
                <div className="text-gray-500 text-xs">Total Quiz Sessions</div>
              </div>
              <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
                <div className="text-3xl font-bold text-yellow-400 mb-1">+{awarenessStats?.avgDelta || 0}</div>
                <div className="text-gray-500 text-xs">Average Score Improvement</div>
              </div>
              <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
                <div className="text-3xl font-bold text-white mb-1">{Object.keys(awarenessStats?.byModule || {}).length}</div>
                <div className="text-gray-500 text-xs">Active Modules</div>
              </div>
            </div>
            <div className="rounded-xl p-5 border border-gray-800" style={{ background: '#1a1f1a' }}>
              <div className="text-white font-semibold text-sm mb-4">Module Breakdown</div>
              {awarenessStats && Object.entries(awarenessStats.byModule).map(([mod, data], i) => (
                <div key={i} className="py-3 border-b border-gray-800 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm">{mod}</span>
                    <span className="text-green-400 text-sm font-semibold">
                      avg +{data.count > 0 ? (data.totalDelta / data.count).toFixed(1) : 0} pts
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-xs">{data.count} sessions</span>
                    <div className="flex-1 rounded-full" style={{ height: '4px', background: '#0a0d0a' }}>
                      <div className="rounded-full" style={{
                        height: '4px', background: '#006600',
                        width: `${Math.min((data.count / (awarenessStats.totalSessions || 1)) * 100, 100)}%`
                      }}/>
                    </div>
                  </div>
                </div>
              ))}
              {(!awarenessStats || Object.keys(awarenessStats.byModule).length === 0) && (
                <div className="text-gray-600 text-sm">No awareness sessions recorded yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ITDashboard;
