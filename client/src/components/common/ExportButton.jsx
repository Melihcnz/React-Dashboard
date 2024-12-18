import React from 'react';

const ExportButton = ({ tableName }) => {
  const handleExport = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/export/${tableName}`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Export hatası:', errorData);
        alert('Excel export işlemi başarısız oldu: ' + errorData.error);
        return;
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tableName}_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Export hatası:', error);
      alert('Excel export işlemi sırasında bir hata oluştu');
    }
  };

  return (
    <button onClick={handleExport} className="btn btn-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Excel'e Aktar
    </button>
  );
};

export default ExportButton;