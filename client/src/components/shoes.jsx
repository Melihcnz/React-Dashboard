import React, { useState, useEffect } from 'react';

function Shoes() {
  const [veriler, setVeriler] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yeniAyakkabi, setYeniAyakkabi] = useState({
    marka: "",
    ayakkab_numaras: "",
    fiyat_: "",
    fiyat_1: "",
    stok_says: "",
    indirim_oran_: "",
    tahmini_teslim_sresi_gn: "",
    sat_adedi: "",
    poplerlik_puan: ""
  });

  const getVeriler = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/shoes');
      const jsonData = await response.json();
      setVeriler(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYeniAyakkabi(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/imported_csv_1734296924183', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(yeniAyakkabi)
      });

      if (response.ok) {
        getVeriler();
        setIsModalOpen(false);
        setYeniAyakkabi({
          marka: "",
          ayakkab_numaras: "",
          fiyat_: "",
          fiyat_1: "",
          stok_says: "",
          indirim_oran_: "",
          tahmini_teslim_sresi_gn: "",
          sat_adedi: "",
          poplerlik_puan: ""
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/export/imported_csv_1734296924183', {
        method: 'GET',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Shoes_${Date.now()}.xlsx`;
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
            <h2 className="text-2xl font-bold">Ayakkabılar</h2>
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
                Ayakkabı Ekle
              </button>
            </div>
          </div>

          <table className="table w-full table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Marka</th>
                <th>Ayakkabı Numarası</th>
                <th>Fiyat(TL)</th>
                <th>Fiyat(USD)</th>
                <th>Stok Sayısı</th>
                <th>İndirim Oranı</th>
                <th>Tahmini Teslim Süresi (Gün)</th>
                <th>Satış Adeti</th>
                <th>Popülerlik Oranı</th>
              </tr>
            </thead>
            <tbody>
              {veriler.map(veri => (
                <tr key={veri.marka}>
                  <td>{veri.marka}</td>
                  <td>{veri.ayakkab_numaras}</td>
                  <td>{veri.fiyat_}</td>
                  <td>{veri.fiyat_1}</td>
                  <td>{veri.stok_says}</td>
                  <td>{veri.indirim_oran_}</td>
                  <td>{veri.tahmini_teslim_sresi_gn}</td>
                  <td>{veri.sat_adedi}</td>
                  <td>{veri.poplerlik_puan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 rounded-lg bg-base-200">
            <h3 className="mb-4 text-lg font-bold">Yeni Ayakkabı Ekle</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Marka</label>
                <input
                  type="text"
                  name="marka"
                  value={yeniAyakkabi.marka}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Ayakkabı Numarası</label>
                <input
                  type="number"
                  name="ayakkab_numaras"
                  value={yeniAyakkabi.ayakkab_numaras}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Fiyat (TL)</label>
                <input
                  type="number"
                  name="fiyat_"
                  value={yeniAyakkabi.fiyat_}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Fiyat (USD)</label>
                <input
                  type="number"
                  name="fiyat_1"
                  value={yeniAyakkabi.fiyat_1}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Stok Sayısı</label>
                <input
                  type="number"
                  name="stok_says"
                  value={yeniAyakkabi.stok_says}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">İndirim Oranı</label>
                <input
                  type="number"
                  name="indirim_oran_"
                  value={yeniAyakkabi.indirim_oran_}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Tahmini Teslim Süresi (Gün)</label>
                <input
                  type="number"
                  name="tahmini_teslim_sresi_gn"
                  value={yeniAyakkabi.tahmini_teslim_sresi_gn}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Satış Adedi</label>
                <input
                  type="number"
                  name="sat_adedi"
                  value={yeniAyakkabi.sat_adedi}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Popülerlik Puanı</label>
                <input
                  type="number"
                  name="poplerlik_puan"
                  value={yeniAyakkabi.poplerlik_puan}
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

export default Shoes;