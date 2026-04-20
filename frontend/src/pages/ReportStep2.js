import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NextStrip from '../components/NextStrip';
import { useReport } from '../context/ReportContext';

const departments = [
  'Retail Banking', 'Corporate Banking', 'Treasury',
  'Risk & Compliance', 'IT & Technology', 'Human Resources',
  'Finance & Accounts', 'Customer Service', 'Operations', 'Legal'
];

const ReportStep2 = () => {
  const navigate = useNavigate();
  const { reportData, updateReport } = useReport();
  const [selected, setSelected] = useState(reportData.department || '');

  const handleNext = () => {
    if (selected) {
      updateReport({ department: selected });
      navigate('/report/step3');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0d0a' }}>
      <Navbar />
      <div className="px-8 pt-8 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#333' }}></div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#333' }}></div>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-widest ml-1">Step 2 of 4</span>
        </div>
        <h2 className="text-white font-semibold text-2xl mb-2">Which department are you reporting from?</h2>
        <p className="text-gray-500 text-sm leading-relaxed">Your department helps us understand threat patterns. It is stripped before storage — never linked to your identity.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-2 gap-3 max-w-2xl">
          {departments.map((dept) => (
            <div key={dept} onClick={() => setSelected(dept)}
              className="rounded-xl p-4 cursor-pointer transition-all"
              style={{
                background: selected === dept ? 'rgba(187,0,0,0.12)' : '#1a1f1a',
                border: selected === dept ? '1px solid rgba(187,0,0,0.4)' : '1px solid rgba(255,255,255,0.06)',
              }}>
              <div style={{ color: selected === dept ? '#ff8080' : '#ffffff', fontWeight: '500', fontSize: '14px' }}>
                {dept}
              </div>
            </div>
          ))}
        </div>
      </div>

      <NextStrip
        steps={['Phishing Email', selected || 'Department', 'Email Details', 'Submit']}
        currentStep={1}
        onNext={handleNext}
        nextLabel="Next: Email Details →"
        nextDisabled={!selected}
      />
    </div>
  );
};

export default ReportStep2;
