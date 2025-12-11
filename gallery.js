function initGallery(images) {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;

  // Обработка клика по миниатюре
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentIndex = parseInt(thumb.dataset.index);
      mainImage.src = images[currentIndex];
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Открытие лайтбокса при клике на основное изображение
  mainImage.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImage.src = images[currentIndex];
  });

  // Закрытие лайтбокса
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // Переход к предыдущему фото
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
    updateThumbnailActiveState();
  });

  // Переход к следующему фото
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex];
    updateThumbnailActiveState();
  });

  // Обновление активной миниатюры в лайтбоксе
// Обновление активной миниатюры в лайтбоксе
function updateThumbnailActiveState() {
  thumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Закрытие лайтбокса при клике вне изображения
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// Обработка клавиш ← и → для навигации в лайтбоксе
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    switch (e.key) {
      case 'ArrowLeft':
        prevBtn.click();
        break;
      case 'ArrowRight':
        nextBtn.click();
        break;
      case 'Escape':
        closeBtn.click();
        break;
    }
  }
});

// Предотвращение прокрутки страницы при открытом лайтбоксе
lightbox.addEventListener('wheel', (e) => {
  e.preventDefault();
}, { passive: false });

// Адаптация под мобильные устройства (жесты)
let touchStartX = 0;
let touchEndX = 0;

lightboxImage.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

lightboxImage.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > 30) { // Минимальный порог для жеста
    if (diff > 0) {
      nextBtn.click(); // Свайп влево — следующее фото
    } else {
      prevBtn.click(); // Свайп вправо — предыдущее фото
    }
  }
}, { passive: true });
}
