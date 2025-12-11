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
  
  detailsContainer.innerHTML = `
    <div class="product-card">
      <img src="${product.image}" alt="${product.title}" class="product-image">
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
}

// Запускаем загрузку при готовности страницы
document.addEventListener('DOMContentLoaded', loadProduct);
