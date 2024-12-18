import React from "react";
import BarcodeScanner from "./Diger-Comp/BarcodeScanner";
import CsvUploader from "./Diger-Comp/CsvUploader";

const Diger = () => {
  return (
    <div className="p-6">
      <BarcodeScanner />
      <CsvUploader />
    </div>
  );
};

export default Diger;