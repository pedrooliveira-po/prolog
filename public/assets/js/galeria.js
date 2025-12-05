// Seleciona todos os items da galeria na ordem correta
const galleryContainer = document.querySelector('.gallery');
const galleryItems = Array.from(galleryContainer.querySelectorAll('.gallery-item')).map(item => ({
    element: item.querySelector('img') || item.querySelector('video'),
    type: item.querySelector('img') ? 'image' : 'video'
}));

const overlay = document.getElementById('fullscreenOverlay');
const fullscreenImg = document.getElementById('fullscreenImg');
const fullscreenVideo = document.getElementById('fullscreenVideo');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Função para mostrar item em tela cheia
function showFullscreen(index) {
    const item = galleryItems[index];
    const isImage = item.type === 'image';
    const element = item.element;
    
    overlay.style.display = 'flex';
    
    if (isImage) {
        fullscreenVideo.style.display = 'none';
        fullscreenVideo.pause();
        fullscreenImg.style.display = 'block';
        fullscreenImg.src = element.src;
    } else {
        fullscreenImg.style.display = 'none';
        fullscreenVideo.style.display = 'block';
        fullscreenVideo.src = element.querySelector('source')?.src || element.src;
        fullscreenVideo.controls = true;
        fullscreenVideo.play().catch(() => {});
    }
}

// Fecha a visualização em tela cheia
function closeFullscreen() {
    overlay.style.display = 'none';
    fullscreenVideo.pause();
    fullscreenVideo.controls = false;
    fullscreenVideo.src = '';
    fullscreenImg.src = '';
}

// Navega entre os itens
function navigate(direction) {
    fullscreenVideo.pause();
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
    } else {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    }
    
    showFullscreen(currentIndex);
}

// Configura eventos de clique para todos os items da galeria
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    // Adiciona o evento de clique ao item da galeria inteiro
    item.addEventListener('click', () => {
        currentIndex = index;
        showFullscreen(index);
    });
});

closeBtn.addEventListener('click', closeFullscreen);
prevBtn.addEventListener('click', () => navigate('prev'));
nextBtn.addEventListener('click', () => navigate('next'));

// Controles do teclado
document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'flex') {
        if (e.key === 'ArrowLeft') navigate('prev');
        if (e.key === 'ArrowRight') navigate('next');
        if (e.key === 'Escape') closeFullscreen();
    }
});