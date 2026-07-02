let hotInstance = null;

function initializeGrids() {
  initializeMainGrid();
}

function initializeMainGrid() {
  const container = document.getElementById('grid');
  if (!container) return;
  
  const danhSáchThứ = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const dataBanĐầu = [];
  
  for (let i = 0; i < 60; i++) {
    let rowData = Array(8).fill('');
    let indexBuổi = Math.floor(i / 10);
    let dòngTrongBuổi = i % 10;
    
    if (dòngTrongBuổi === 0) rowData[0] = danhSáchThứ[indexBuổi] || '';
    else if (dòngTrongBuổi < 6) rowData[0] = (indexBuổi < 6 ? 'Sáng' : 'Chiều');
    
    rowData[1] = dòngTrongBuổi > 0 ? dòngTrongBuổi : '';
    rowData[7] = false;
    dataBanĐầu.push(rowData);
  }
  
  hotInstance = new Handsontable(container, {
    data: dataBanĐầu,
    licenseKey: 'non-commercial-and-evaluation',
    colHeaders: ['Thứ/Buổi', 'Tiết', 'Môn Học', 'Lớp', 'Tiết PPCT', 'Tên Bài Dạy', 'Điều chỉnh', 'Nghỉ'],
    columns: [
      { readOnly: true },
      { readOnly: true },
      { type: 'autocomplete', source: nguonDuLieuForm.monHoc || [], strict: false, allowInvalid: true },
      { type: 'autocomplete', source: nguonDuLieuForm.lopHoc || [], strict: false, allowInvalid: true },
      {},
      {},
      {},
      { type: 'checkbox', checkedTemplate: true, uncheckedTemplate: false }
    ],
    rowHeaders: true,
    width: '100%',
    stretchH: 'all',
    manualColumnResize: true,
    rowHeights: 21,
    fillHandle: true,
    minRows: 60,
    maxRows: 60,
    minCols: 8,
    maxCols: 8,
    enterBeginsEditing: false,
    autoWrapRow: true
  });
}

function getGridData() {
  if (!hotInstance) return [];
  return hotInstance.getSourceData();
}
