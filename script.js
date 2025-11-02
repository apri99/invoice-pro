document.getElementById('logoUpload').addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('logoPreview').innerHTML = `<img src="${e.target.result}" style="max-height:100px;">`;
  };
  reader.readAsDataURL(file);
});

function addItem() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td contenteditable="true">Deskripsi</td>
    <td contenteditable="true">100000</td>
    <td contenteditable="true">1</td>
    <td>Rp 100000</td>
    <td><button onclick="removeItem(this)">🗑️</button></td>
  `;
  document.querySelector('#itemTable tbody').appendChild(row);
  updateTotals();
}

function removeItem(btn) {
  btn.parentElement.parentElement.remove();
  updateTotals();
}

function updateTotals() {
  let subtotal = 0;
  document.querySelectorAll('#itemTable tbody tr').forEach(row => {
    const price = parseInt(row.children[1].innerText) || 0;
    const qty = parseInt(row.children[2].innerText) || 0;
    const total = price * qty;
    row.children[3].innerText = `Rp ${total}`;
    subtotal += total;
  });
  document.getElementById('subtotal').innerText = `Rp ${subtotal}`;
  const taxRate = parseInt(document.getElementById('tax').value) || 0;
  const total = subtotal + (subtotal * taxRate / 100);
  document.getElementById('total').innerText = `Rp ${total}`;
}

document.getElementById('tax').addEventListener('input', updateTotals);

function exportPDF() {
  const doc = new jsPDF();
  doc.fromHTML(document.querySelector('.invoice-container'), 15, 15);
  doc.save('invoice.pdf');
}

function exportWord() {
  const content = document.querySelector('.invoice-container').innerHTML;
  const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'invoice.doc';
  link.click();
}

