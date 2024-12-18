import React, { useState } from "react";
import axios from "axios";

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Lütfen bir CSV dosyası seçin");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(
        `Dosya başarıyla yüklendi! Oluşturulan tablo adı: ${response.data.tableName}`
      );
      setFile(null);
      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      setMessage("Hata: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-8 border-t">
      <h2 className="mb-6 text-xl font-bold">CSV Dosyası Yükleme</h2>
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full max-w-md p-2 border rounded"
          disabled={isLoading}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || isLoading}
        className={`
          px-4 py-2 rounded
          ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} 
          text-white font-medium
        `}
      >
        {isLoading ? "Yükleniyor..." : "Yükle"}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            message.startsWith("Hata")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default CsvUploader;