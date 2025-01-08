let currentStep = 1;
const totalSteps = 5;

const form = document.getElementById('form');
const steps = document.querySelectorAll('.step');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const qrcodeContainer = document.getElementById('qrcode-container');
const qrcodeSection = document.getElementById('qrcode');
const restartButton = document.getElementById('restart');

function showStep(step) {
  steps.forEach((stepElement, index) => {
    stepElement.classList.toggle('hidden', index !== step - 1);
  });
  prevButton.disabled = step === 1;
  nextButton.textContent = step === totalSteps ? '生成二维码' : '下一步';
}

nextButton.addEventListener('click', () => {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  } else {
    const formData = {
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      education: document.getElementById('education').value,
      work: document.getElementById('work').value,
      purpose: document.getElementById('purpose').value,
      immigration: document.getElementById('immigration').value,
      savings: document.getElementById('savings').value,
      notes: document.getElementById('notes').value,
    };

    const jsonData = JSON.stringify(formData);
    qrcodeContainer.innerHTML = '';
    QRCode.toCanvas(qrcodeContainer, jsonData, { width: 200 }, (error) => {
      if (error) console.error(error);
    });

    form.classList.add('hidden');
    qrcodeSection.classList.remove('hidden');
  }
});

prevButton.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});

restartButton.addEventListener('click', () => {
  form.reset();
  qrcodeSection.classList.add('hidden');
  form.classList.remove('hidden');
  currentStep = 1;
  showStep(currentStep);
});

// Initialize
showStep(currentStep);
