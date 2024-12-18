// src/config/chartConfigs/colorMatchConfig.js
export const renkKodları = {
    'kırmızı': '#FF6384',
    'mavi': '#36A2EB',
    'sarı': '#FFCE56',
    'yeşil': '#4BC0C0',
    'mor': '#9966FF',
    'turuncu': '#FF9F40',
    'siyah': '#000000',
    'beyaz': '#FFFFFF',
    'gri': '#808080',
    // diğer renkler eklenebilir
  };
  
  export const getRenkKodu = (renk) => {
    return renkKodları[renk.toLowerCase()] || '#808080'; // varsayılan renk
  };