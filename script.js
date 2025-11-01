function generateInvoice() {
  const name = document.getElementById('clientName').value;
  const date = document.getElementById('invoiceDate').value;
  const items = document.getElementById('items').value.split('\n');
  let html = `<h2>Invoice untuk ${name}</h2><p>Tanggal: ${date}</p><ul>`;
  items.forEach(item => html += `<li>${item}</li>`);
  html += `</ul>`;
  document.getElementById('invoicePreview').innerHTML = html;
  localStorage.setItem('lastInvoice', html);
}

function exportPDF() {
  const doc = new jsPDF();
  doc.fromHTML(document.getElementById('invoicePreview').innerHTML, 15, 15);
  doc.save('invoice.pdf');
}

function exportWord() {
  const content = document.getElementById('invoicePreview').innerHTML;
  const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'invoice.doc';
  link.click();
}
