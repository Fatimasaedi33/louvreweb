const modelViewer = document.querySelector("model-viewer");
const loading = document.getElementById("loading");
const arButton = document.getElementById("arButton");

modelViewer.addEventListener('load', () => {
  modelViewer.quality = 'high';
  modelViewer.exposure = '1.2';
  modelViewer.shadowIntensity = '1.2';
  modelViewer.shadowSoftness = '0.6';

  const directionalLight = document.createElement('directional-light');
  directionalLight.setAttribute('color', '#ffffff');
  directionalLight.setAttribute('intensity', '0.5');
  modelViewer.appendChild(directionalLight);

  loading.style.display = 'none';

  // التحقق من دعم AR
  modelViewer.addEventListener('ar-status', (event) => {
    if (event.detail.status === 'ready') {
      arButton.style.display = 'block';  // يظهر الزر إذا كان AR مدعومًا
    } else if (event.detail.status === 'failed') {
      arButton.style.display = 'none';   // إخفاء الزر إذا فشل AR
    }
  });
});

modelViewer.addEventListener('progress', (event) => {
  loading.style.display = 'block';
  loading.textContent = `loading: ${Math.round(event.detail.totalProgress * 100)}%`;
});

function openAR() {
  if (modelViewer.activateAR) {
    modelViewer.activateAR().catch(error => {
      console.error("AR activation failed:", error);
    });
  }
}
