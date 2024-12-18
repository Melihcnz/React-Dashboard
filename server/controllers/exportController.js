const Excel = require('exceljs');
const pool = require('../db');

const exportToExcel = async (req, res) => {
  try {
    const { tableName } = req.params;
    console.log('Export isteği alındı:', tableName);

    const result = await pool.query(`SELECT * FROM "${tableName}"`);
    
    if (!result.rows || result.rows.length === 0) {
      throw new Error('Tabloda veri bulunamadı');
    }

    const data = result.rows;
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(tableName);

    // Sütun başlıklarını ayarla
    const columns = Object.keys(data[0]).map(key => ({
      header: key,
      key: key,
      width: 20
    }));
    worksheet.columns = columns;

    // Verileri ekle
    worksheet.addRows(data);

    // Stil ayarları
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD3D3D3' }
    };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${tableName}_${Date.now()}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Excel export hatası:', error);
    res.status(500).json({ 
      error: error.message || 'Excel export işlemi başarısız oldu',
      detail: error.stack 
    });
  }
};

module.exports = { exportToExcel }; 