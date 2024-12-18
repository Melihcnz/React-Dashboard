// src/components/Products.jsx
import React, { useState, useEffect } from "react";

function Products() {
  const [veriler, setVeriler] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yeniUrun, setYeniUrun] = useState({
    name: "",
    price: "",
    rating: "",
    stockQuantity: "",
  });

  const getVeriler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/veriler");
      const jsonData = await response.json();
      setVeriler(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYeniUrun((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/veriler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yeniUrun),
      });

      if (response.ok) {
        getVeriler(); // Tabloyu güncelle
        setIsModalOpen(false); // Modalı kapat
        setYeniUrun({
          // Formu sıfırla
          name: "",
          price: "",
          rating: "",
          stockQuantity: "",
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/export/Products', {
        method: 'GET',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Products_${Date.now()}.xlsx`;
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
      {/* Tablo container'ı ile aynı genişlikte bir div */}
      <div className="flex items-center justify-center">
        <div className="w-full table-container">
          {/* Başlık ve Ekleme Butonu */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Ürünler</h2>
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
                Ürün Ekle
              </button>
            </div>
          </div>

          {/* Ürün Tablosu */}
          <table className="table w-full table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Ürün Adı</th>
                <th>Fiyat</th>
                <th>Değerlendirme</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              {veriler.map((veri) => (
                <tr key={veri.productId}>
                  <td>{veri.name}</td>
                  <td>{veri.price}</td>
                  <td>{veri.rating}</td>
                  <td>{veri.stockQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box">
            <h3 className="mb-4 text-lg font-bold">Yeni Ürün Ekle</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ürün Adı</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={yeniUrun.name}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fiyat</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={yeniUrun.price}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Değerlendirme</span>
                </label>
                <input
                  type="number"
                  name="rating"
                  value={yeniUrun.rating}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  min="0"
                  max="5"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stok Miktarı</span>
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={yeniUrun.stockQuantity}
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

export default Products;