const calculateBtn = document.getElementById('calculateBtn');
const estimateValue = document.getElementById('estimateValue');
const areaInput = document.getElementById('area');
const camerasInput = document.getElementById('cameras');
const objectTypeSelect = document.getElementById('objectType');
const leadForm = document.getElementById('leadForm');
const formNote = document.getElementById('formNote');

function formatCurrency(value) {
  return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
}

function getObjectMultiplier(type) {
  const map = {
    cottage: 1,
    house: 1.12,
    villa: 1.28,
  };
  return map[type] || 1;
}

function calculateEstimate() {
  const area = Number(areaInput.value) || 0;
  const cameras = Number(camerasInput.value) || 0;
  const type = objectTypeSelect.value;
  const baseAreaCost = 4200;
  const cameraCost = 46000;
  const multiplier = getObjectMultiplier(type);
  const estimate = Math.max(420000, Math.round((area * baseAreaCost + cameras * cameraCost) * multiplier));
  estimateValue.textContent = formatCurrency(estimate);
}

calculateBtn?.addEventListener('click', calculateEstimate);

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('leadName').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const address = document.getElementById('leadAddress').value.trim();

    if (!name || !phone || !address) {
      formNote.textContent = 'Пожалуйста, заполните имя, телефон и адрес объекта.';
      formNote.style.color = '#ff8c8c';
      return;
    }

    formNote.textContent = 'Спасибо! Заявка принята. Наш инженер свяжется с вами в течение часа.';
    formNote.style.color = '#5bf2d8';
    leadForm.reset();
    estimateValue.textContent = '—';
  });
}