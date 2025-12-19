async function loadProduct() {
  try {
    // 1. Получаем id из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
      throw new Error('Не указан ID товара в URL');
    }

    // 2. Загружаем данные
    const response = await fetch('items.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const dataArray = await response.json();
    
    // 3. Находим товар по id
    const data = dataArray.find(item => item.id === productId);
    
    if (!data) {
      throw new Error(`Товар с ID "${productId}" не найден`);
    }

    console.log('Выбранный товар:', data);

    // 4. Формируем HTML

    // Кнопки действий
    let buttonsHtml = '';
    if (Array.isArray(data.buttons) && data.buttons.length > 0) {
      buttonsHtml = data.buttons.map(btn => `
        <button onclick="window.location.href='${btn.action}'">
          ${btn.text}
        </button>
      `).join('');
    }

    // Таблица характеристик (в самом низу)
    let specsTableHtml = '';
    if (Array.isArray(data.tableSpecs) && data.tableSpecs.length > 0) {
      specsTableHtml = `
        <div class="specs-table">
          ${data.tableSpecs.map(category => `
            <div class="category">
              <h3>${category.category}</h3>
              <table>
                <tbody>
                  ${category.items.map(item => `
                    <tr>
                      <td class="label">${item.label}</td>
                      <td class="value">${item.value}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      specsTableHtml = '<p class="no-specs">Характеристики не указаны.</p>';
    }

    
    const main = document.getElementById('product-main');
main.innerHTML = `
  <div class="media-column">
    <picture>
      <img src="${data.image || ''}" alt="${data.title || ''}">
    </picture>
    <video id="product-video-embedded" controls style="display: none; width: 100%;">
    </video>
    <div class="buttons-container">
      ${buttonsHtml}
    </div>
  </div>
  <div class="specs-column">
    
    
    ${specsTableHtml}
  </div>
`;

// Видео (перемещаем в встроенный контейнер)
const embeddedVideo = document.getElementById('product-video-embedded');
if (data.video) {
  embeddedVideo.src = data.video;
  embeddedVideo.style.display = 'block';
  embeddedVideo.width = 1440;
} else {
  console.warn('Видео не указано для товара ID:', productId);
}


  } catch (err) {
    console.error('Ошибка загрузки продукта:', err);
    document.body.innerHTML = `
      <div style="color: red; padding: 20px;">
        <p><strong>Ошибка:</strong> ${err.message}</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadProduct);
