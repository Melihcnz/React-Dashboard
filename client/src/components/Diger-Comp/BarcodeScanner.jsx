import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
        videoConstraints: true
      });

      scanner.render(success, error);

      function success(result) {
        scanner.clear();
        setScanResult(result);
        setIsScanning(false);
      }

      function error(err) {
        if (err.name === "NotReadableError") {
          console.log("Kamera başlatılamadı, ön kamera deneniyor...");
          scanner.clear();
          const newScanner = new Html5QrcodeScanner("reader", {
            qrbox: {
              width: 250,
              height: 250,
            },
            fps: 5,
            videoConstraints: {
              facingMode: { ideal: "environment" },
            }
          });
          newScanner.render(success, error);
        } else {
          console.warn(err);
        }
      }

      return () => {
        scanner.clear();
      };
    }
  }, [isScanning]);

  const startScanner = () => {
    setIsScanning(true);
    setScanResult("");
  };

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-bold">Barkod Okuyucu</h2>
      <div className="flex flex-col gap-4">
        {!isScanning && (
          <button
            onClick={startScanner}
            className="w-56 px-2 py-4 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Barkod Taramayı Başlat
          </button>
        )}

        {isScanning && (
          <div
            id="reader"
            className="w-full max-w-lg"
            style={{ minHeight: "400px" }}
          ></div>
        )}

        {scanResult && (
          <div className="p-4 mt-4 bg-green-100 border border-green-400 rounded">
            <p className="font-bold">Barkod Sonucu:</p>
            <p>{scanResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;