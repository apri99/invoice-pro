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
    <td class="no-print"><button onclick="removeItem(this)">🗑️</button></td>
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

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark')function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--color-header', '#1C1C1C');
    root.style.setProperty('--color-subheader', '#333333');
    root.style.setProperty('--color-highlight', '#FF6B6B');
    root.style.setProperty('--color-bg', '#121212');
    root.style.setProperty('--color-text', '#EEEEEE');
    root.style.setProperty('--color-border', '#444444');
    root.style.setProperty('--color-button', '#4CAF50');
  } else if (theme === 'promo') {
    root.style.setProperty('--color-header', '#FF9800');
    root.style.setProperty('--color-subheader', '#F57C00');
    root.style.setProperty('--color-highlight', '#D32F2F');
    root.style.setProperty('--color-bg', '#FFF3E0');
    root.style.setProperty('--color-text', '#212121');
    root.style.setProperty('--color-border', '#FFCC80');
    root.style.setProperty('--color-button', '#E64A19');
  } else {
    // Reset ke default
    root.style.setProperty('--color-header', '#2C3E50');
    root.style.setProperty('--color-subheader', '#34495E');
    root.style.setProperty('--color-highlight', '#E74C3C');
    root.style.setProperty('--color-bg', '#F9F9F9');
    root.style.setProperty('--color-text', '#2C3E50');
    root.style.setProperty('--color-border', '#BDC3C7');
    root.style.setProperty('--color-button', '#27AE60');
  }
}

function exportPDF() {
  const clone = document.querySelector('.invoice-container').cloneNode(true);
  clone.querySelectorAll('.no-print').forEach(el => el.remove());

  const tempDiv = document.createElement('div');
  tempDiv.style.display = 'none';
  tempDiv.appendChild(clone);
  document.body.appendChild(tempDiv);

  const doc = new jsPDF();
  doc.fromHTML(tempDiv.innerHTML, 15, 15);
  doc.save('invoice.pdf');

  document.body.removeChild(tempDiv);
}

function exportWord() {
  const clone = document.querySelector('.invoice-container').cloneNode(true);
  clone.querySelectorAll('.no-print').forEach(el => el.remove());

  const content = clone.innerHTML;
  const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'invoice.doc';
  link.click();
}
