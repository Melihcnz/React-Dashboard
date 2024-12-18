// src/components/Tablo.jsx
import React, { useState, useEffect } from "react";

function Expenses() {
  const [veriler, setVeriler] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yeniGider, setYeniGider] = useState({
    category: "",
    amount: "",
    timestamp: new Date().toISOString().slice(0, 16)
  });

  const getVeriler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/veriler4");
      const jsonData = await response.json();
      setVeriler(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYeniGider(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/veriler4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yeniGider)
      });

      if (response.ok) {
        getVeriler();
        setIsModalOpen(false);
        setYeniGider({
          category: "",
          amount: "",
          timestamp: new Date().toISOString().slice(0, 16)
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/export/Expenses', {
        method: 'GET',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Expenses_${Date.now()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (error) {
      console.error('Export hatası:', error);
    }
  };

  useEffect(() => {
    getVeriler();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="w-full table-container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Giderler</h2>
            <div className="flex gap-2">
              <button onClick={handleExport} className="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Excel'e Aktar
              </button>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Gider Ekle
              </button>
            </div>
          </div>

          <table className="table w-full table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Gider ID</th>
                <th>Kategori</th>
                <th>Miktar</th>
                <th>Zaman Damgası</th>
              </tr>
            </thead>
            <tbody>
              {veriler.map(veri => (
                <tr key={veri.expenseId}>
                  <td>{veri.expenseId}</td>
                  <td>{veri.category}</td>
                  <td>{veri.amount}</td>
                  <td>{veri.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 rounded-lg bg-base-200">
            <h3 className="mb-4 text-lg font-bold">Yeni Gider Ekle</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Kategori</label>
                <input
                  type="text"
                  name="category"
                  value={yeniGider.category}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Miktar</label>
                <input
                  type="number"
                  name="amount"
                  value={yeniGider.amount}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Tarih</label>
                <input
                  type="datetime-local"
                  name="timestamp"
                  value={yeniGider.timestamp}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Ekle
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;