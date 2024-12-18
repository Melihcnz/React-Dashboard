// client/src/utils/chartDataHelpers.js
export const hesaplaMarkaFiyatları = (urunler) => {
    // Markaların ortalama fiyatlarını hesapla
    const markaFiyatları = urunler.reduce((acc, item) => {
      if (!acc[item.marka]) {
        acc[item.marka] = { toplamFiyat: 0, urunSayisi: 0 };
      }
      // String'i number'a çevir
      const fiyat = parseFloat(item.fiyat);
      acc[item.marka].toplamFiyat += fiyat;
      acc[item.marka].urunSayisi += 1;
      return acc;
    }, {});
  
    return Object.keys(markaFiyatları).map(marka => ({
      marka,
      ortalamaFiyat: markaFiyatları[marka].toplamFiyat / markaFiyatları[marka].urunSayisi
    }));
  };
  
  export const createMarkaFiyatChartData = (markaFiyatları) => ({
    labels: markaFiyatları.map(item => item.marka),
    datasets: [{
      label: 'Marka Ortalama Fiyatları',
      data: markaFiyatları.map(item => item.ortalamaFiyat),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 1,
      tension: 0.1
    }]
  });