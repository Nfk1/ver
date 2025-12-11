// Получаем ID товара из URL
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');

// Функция для загрузки данных и отображения товара
async function loadProduct() {
  try {
    // Загружаем данные из JSON
    const response = await fetch('items.json');
    if (!response.ok) throw new Error('Ошибка загрузки данных');

    const catalogData = await response.json();
    
    // Находим нужный товар по ID
    const product = catalogData.find(item => item.id == itemId);
    
    if (!product) {
      document.getElementById('productDetails').innerHTML =
        '<p>Товар не найден.</p>';
      return;
    }
    
    // Отображаем детали товара
    renderProductDetails(product);
    
  } catch (err) {
    console.error(err);
    document.getElementById('productDetails').innerHTML =
      '<p>Ошибка загрузки деталей товара.</p>';
  }
}

// Функция отображения деталей товара
function renderProductDetails(product) {
  const detailsContainer = document.getElementById('productDetails');
  
  // Формируем HTML с галереей
  const images = Array.isArray(product.images) ? product.images : [product.image];
  
  detailsContainer.innerHTML = `
    <div class="product-card">
      <!-- Галерея изображений -->
      <div class="gallery-container">
        <div class="main-image">
          <img src="${images[0]}" alt="${product.title}" class="product-image" id="mainImage">
        </div>
        <div class="thumbnails">
          ${images.map((img, index) => `
            <img 
              src="${img}"
              alt="Изображение ${index + 1}"
              class="thumbnail ${index === 0 ? 'active' : ''}"
              data-index="${index}"
            >
          `).join('')}
        </div>
      </div>

      <!-- Информация о товаре -->
      <div class="product-info">
        <h2>${product.title}</h2>
        <p class="description">${product.description || 'Нет описания'}</p>
        
        ${product.price ? `<p class="price">Цена: ${product.price}</p>` : ''}
        ${product.brand ? `<p><strong>Бренд:</strong> ${product.brand}</p>` : ''}
        ${product.model ? `<p><strong>Модель:</strong> ${product.model}</p>` : ''}
        
        <button onclick="window.history.back()">Вернуться к каталогу</button>
      </div>
    </div>
  `;

  // Инициализируем галерею после рендера
  initGallery(images);
}

// Запускаем загрузку при готовности страницы
document.addEventListener('DOMContentLoaded', loadProduct);
