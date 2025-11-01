function generateInvoice() {
  const number = document.getElementById('invoiceNumber').value;
  const date = document.getElementById('invoiceDate').value;
  const name = document.getElementById('clientName').value;
  const address = document.getElementById('clientAddress').value;
  const itemsRaw = document.getElementById('items').value.split('\n');
  const logoFile = document.getElementById('logoUpload').files[0];

  let logoHTML = '';
  if (logoFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      logoHTML = `<img src="${e.target.result}" style="max-width:150px;">`;
      renderInvoice();
    };
    reader.readAsDataURL(logoFile);
  } else {
    renderInvoice();
  }

  function renderInvoice() {
    let itemsHTML = '';
    itemsRaw.forEach(line => {
      const [desc, qty, price] = line.split('-');
      const subtotal = parseInt(qty) * parseInt(price);
      itemsHTML += `<tr><td>${desc}</td><td>${qty}</td><td>${price}</td><td>${subtotal}</td></tr>`;
    });

    const html = `
      ${logoHTML}
      <h2>INVOICE</h2>
      <p>No: ${number}</p><p>Tanggal: ${date}</p>
      <h3>Kepada: ${name}</h3><p>${address}</p>
      <table border="1" cellpadding="5">
        <tr><th>Deskripsi</th><th>Qty</th><th>Harga</th><th>Subtotal</th></tr>
        ${itemsHTML}
      </table>
    `;
    document.getElementById('invoicePreview').innerHTML = html;
    localStorage.setItem('lastInvoice', html);
  }
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
