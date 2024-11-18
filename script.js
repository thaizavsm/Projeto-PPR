// Script para o site da cafeteria

// 1. Menu de Navegação Fixo e Ativo
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// 2. Filtro para o Cardápio
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Adiciona evento de clique para os botões de filtro
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        filterMenu(category);
    });
});

// 3. Modal de Produto
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close-modal');

function openModal(item) {
    const productName = item.querySelector('.product-name').innerText;
    const productDesc = item.querySelector('.product-desc').innerText;
    const productImage = item.querySelector('img').src;

    modalContent.innerHTML = `
        <h2>${productName}</h2>
        <img src="${productImage}" alt="${productName}">
        <p>${productDesc}</p>
    `;
    modal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Adiciona evento de clique para abrir modal em cada item do cardápio
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => openModal(item));
});

// 4. Mapa Interativo com Google Maps API
function initMap() {
    const location = { lat: -23.5505, lng: -46.6333 }; // Coordenadas de São Paulo
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
    });
    new google.maps.Marker({
        position: location,
        map: map,
        title: 'Nossa Cafeteria',
    });
}
