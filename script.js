const calculateBtn = document.getElementById('calculateBtn');
const estimateValue = document.getElementById('estimateValue');
const areaInput = document.getElementById('area');
const camerasInput = document.getElementById('cameras');
const objectTypeSelect = document.getElementById('objectType');
const leadForm = document.getElementById('leadForm');
const formNote = document.getElementById('formNote');
const leadName = document.getElementById('leadName');
const leadPhone = document.getElementById('leadPhone');
const leadAddress = document.getElementById('leadAddress');
const leadComment = document.getElementById('leadComment');

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

function saveLeadData() {
  const leadData = {
    name: leadName.value.trim(),
    phone: leadPhone.value.trim(),
    address: leadAddress.value.trim(),
    comment: leadComment.value.trim(),
  };

  localStorage.setItem('safeHomeLead', JSON.stringify(leadData));
}

function loadLeadData() {
  const raw = localStorage.getItem('safeHomeLead');
  if (!raw) {
    return;
  }

  try {
    const data = JSON.parse(raw);
    if (data.name) leadName.value = data.name;
    if (data.phone) leadPhone.value = data.phone;
    if (data.address) leadAddress.value = data.address;
    if (data.comment) leadComment.value = data.comment;
  } catch (error) {
    console.warn('Не удалось загрузить данные заявки:', error);
  }
}

if (calculateBtn) {
  calculateBtn.addEventListener('click', calculateEstimate);
}

if (leadForm) {
  window.addEventListener('DOMContentLoaded', loadLeadData);

  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = leadName.value.trim();
    const phone = leadPhone.value.trim();
    const address = leadAddress.value.trim();

    if (!name || !phone || !address) {
      formNote.textContent = 'Пожалуйста, заполните имя, телефон и адрес объекта.';
      formNote.style.color = '#ff8c8c';
      return;
    }

    saveLeadData();
    formNote.textContent = 'Спасибо! Заявка принята. Наш инженер свяжется с вами в течение часа.';
    formNote.style.color = '#5bf2d8';
    leadForm.reset();
    estimateValue.textContent = '—';
  });
}
