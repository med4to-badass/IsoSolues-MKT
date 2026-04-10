document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const filterContainer = document.getElementById('filter-container');
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    let allProducts = [];

    const fetchProducts = async () => {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allProducts = await response.json();
            setupFilters();
            displayProducts(allProducts);
        } catch (error) {
            console.error("Erro ao buscar os produtos:", error);
            productGrid.innerHTML = '<p>Não foi possível carregar os produtos.</p>';
        }
    };

    const displayProducts = (products) => {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.imagem_url}" alt="${product.nome}" class="product-image">
                <div class="product-info">
                    <h3>${product.nome}</h3>
                    <p>${product.descricao_curta}</p>
                    <button class="btn-details" data-id="${product.id}">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `).join('');
    };

    const setupFilters = () => {
        const categories = ['Todos', ...new Set(allProducts.map(p => p.categoria))];
        filterContainer.innerHTML = categories.map(cat => 
            `<button class="filter-btn ${cat === 'Todos' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
        ).join('');
    };

    const filterProducts = (category) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        document.querySelector(`.filter-btn[data-category="${category}"]`).classList.add('active');
        
        const filteredProducts = category === 'Todos' 
            ? allProducts 
            : allProducts.filter(p => p.categoria === category);
        
        productGrid.innerHTML = ''; // Limpa para efeito de animação
        setTimeout(() => displayProducts(filteredProducts), 50); // Pequeno delay
    };

    const openModal = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        modalBody.innerHTML = `
            <img src="${product.imagem_url}" alt="${product.nome}">
            <h2>${product.nome}</h2>
            <p>${product.descricao_curta}</p>
            <ul>
                ${product.especificacoes.map(spec => `<li><strong>${spec.titulo}:</strong> ${spec.valor}</li>`).join('')}
            </ul>
            <a href="#" class="btn-details">Solicitar Orçamento</a>
        `;
        modalContainer.classList.add('show');
    };

    const closeModal = () => {
        modalContainer.classList.remove('show');
    };

    // --- Event Listeners ---
    filterContainer.addEventListener('click', e => {
        if (e.target.classList.contains('filter-btn')) {
            filterProducts(e.target.dataset.category);
        }
    });

    productGrid.addEventListener('click', e => {
        if (e.target.classList.contains('btn-details')) {
            openModal(e.target.dataset.id);
        }
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', e => {
        if (e.target === modalContainer) closeModal(); // Fecha se clicar fora
    });

    fetchProducts();
});

