// Configuración de corazones
const heartCount = 30; // Cantidad de corazones
const heartsContainer = document.querySelector('.hearts-container');

// Función para crear corazones estáticos (hojas del árbol)
function createStaticHearts() {
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const finalX = (Math.random() - 0.5) * 400;
        const finalY = (Math.random() - 0.7) * 300;
        const size = 15 + Math.random() * 15;
        const delay = Math.random() * 2;
        
        heart.style.setProperty('--final-x', `${finalX}px`);
        heart.style.setProperty('--final-y', `${finalY - 300}px`);
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Función para crear corazones que caen (efecto viento)
function createFallingHearts() {
    const fallingHeart = document.createElement('div');
    fallingHeart.classList.add('falling-heart');

    // Tamaño aleatorio
    const size = 10 + Math.random() * 15;
    fallingHeart.style.width = `${size}px`;
    fallingHeart.style.height = `${size}px`;

    // Posición inicial (en la copa del árbol)
    const startX = (window.innerWidth / 2) + (Math.random() - 0.5) * 200;
    const startY = (window.innerHeight / 2) - 150;

    // Posición final (más abajo y con desplazamiento horizontal)
    const endX = startX + (Math.random() - 0.5) * 300;
    const endY = startY + 300 + Math.random() * 200;

    // Duración de la caída
    const duration = 5 + Math.random() * 10;

    // Aplicar propiedades de animación
    fallingHeart.style.setProperty('--start-x', '0px');
    fallingHeart.style.setProperty('--start-y', '0px');
    fallingHeart.style.setProperty('--end-x', `${endX - startX}px`);
    fallingHeart.style.setProperty('--end-y', `${endY - startY}px`);
    fallingHeart.style.left = `${startX}px`;
    fallingHeart.style.top = `${startY}px`;
    fallingHeart.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(fallingHeart);

    // Eliminar el corazón después de que termine la animación
    setTimeout(() => {
        fallingHeart.remove();
    }, duration * 1000);
}

// Fecha en que comenzó el amor 
const startDate = new Date('2023-09-11T11:30:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    // Calcular días, horas, minutos y segundos
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Actualizar el DOM
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    createStaticHearts();
    updateCounter();
    setInterval(updateCounter, 1000);
    
    // Crear corazones que caen cada 800ms
    setInterval(createFallingHearts, 800);
    
    // Crear algunos corazones al inicio
    for (let i = 0; i < 5; i++) {
        setTimeout(createFallingHearts, i * 300);
    }
});