import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState({
    incidentType: '',
    department: '',
    senderEmail: '',
    subjectLine: '',
    suspiciousLinks: '',
    emailDescription: '',
    clickedAnything: 'no'
  });
  const [result, setResult] = useState(null);

  const updateReport = (data) => {
    setReportData(prev => ({ ...prev, ...data }));
  };

  const clearReport = () => {
    setReportData({
      incidentType: '',
      department: '',
      senderEmail: '',
      subjectLine: '',
      suspiciousLinks: '',
      emailDescription: '',
      clickedAnything: 'no'
    });
    setResult(null);
  };

  return (
    <ReportContext.Provider value={{ reportData, updateReport, result, setResult, clearReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);
