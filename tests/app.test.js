const {
    getCategories,
    filterByCategory,
    buildProductCard,
    buildModalContent,
    buildFilterButtons,
} = require('../app');

const mockProducts = [
    {
        id: 'placa-eps-t1',
        nome: 'Placa de EPS T1',
        categoria: 'Placas EPS',
        descricao_curta: 'Placa de isolamento térmico.',
        imagem_url: 'images/placa.png',
        especificacoes: [
            { titulo: 'Densidade', valor: 'T1' },
            { titulo: 'Espessura', valor: '50mm' },
        ],
    },
    {
        id: 'cola-fixa-tudo',
        nome: 'Cola Fixa Tudo',
        categoria: 'Insumos para Instalação',
        descricao_curta: 'Adesivo de alta performance.',
        imagem_url: 'images/cola.png',
        especificacoes: [
            { titulo: 'Rendimento', valor: '10m²' },
        ],
    },
    {
        id: 'fita-telada-45mm',
        nome: 'Fita Telada 45mm',
        categoria: 'Insumos para Instalação',
        descricao_curta: 'Fita de fibra de vidro.',
        imagem_url: 'images/fita.png',
        especificacoes: [
            { titulo: 'Largura', valor: '45mm' },
        ],
    },
];


describe('getCategories', () => {
    test('first element is always "Todos"', () => {
        expect(getCategories(mockProducts)[0]).toBe('Todos');
    });

    test('extracts unique categories — no duplicates', () => {
        const cats = getCategories(mockProducts);
        // "Insumos para Instalação" appears in two products but only once in result
        const instalacaoCount = cats.filter(c => c === 'Insumos para Instalação').length;
        expect(instalacaoCount).toBe(1);
    });

    test('contains all categories from products', () => {
        const cats = getCategories(mockProducts);
        expect(cats).toContain('Placas EPS');
        expect(cats).toContain('Insumos para Instalação');
    });

    test('total length is unique categories + 1 (for "Todos")', () => {
        expect(getCategories(mockProducts).length).toBe(3);
    });

    test('returns only ["Todos"] for empty products array', () => {
        expect(getCategories([])).toEqual(['Todos']);
    });

    test('single product gives ["Todos", category]', () => {
        const cats = getCategories([mockProducts[0]]);
        expect(cats).toEqual(['Todos', 'Placas EPS']);
    });
});


describe('filterByCategory', () => {
    test('"Todos" returns all products unchanged', () => {
        expect(filterByCategory(mockProducts, 'Todos')).toHaveLength(3);
    });

    test('filters to a specific category', () => {
        const result = filterByCategory(mockProducts, 'Placas EPS');
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('placa-eps-t1');
    });

    test('returns multiple products in the same category', () => {
        const result = filterByCategory(mockProducts, 'Insumos para Instalação');
        expect(result).toHaveLength(2);
    });

    test('returns empty array for unknown category', () => {
        expect(filterByCategory(mockProducts, 'Categoria Inexistente')).toHaveLength(0);
    });

    test('does not mutate the original array', () => {
        const original = [...mockProducts];
        filterByCategory(mockProducts, 'Placas EPS');
        expect(mockProducts).toHaveLength(original.length);
    });

    test('returns all products when category matches all', () => {
        const homogeneous = mockProducts.map(p => ({ ...p, categoria: 'EPS' }));
        expect(filterByCategory(homogeneous, 'EPS')).toHaveLength(3);
    });
});


describe('buildProductCard', () => {
    const product = mockProducts[0];

    test('includes product name', () => {
        expect(buildProductCard(product)).toContain('Placa de EPS T1');
    });

    test('includes short description', () => {
        expect(buildProductCard(product)).toContain('Placa de isolamento térmico.');
    });

    test('includes image src attribute', () => {
        expect(buildProductCard(product)).toContain('src="images/placa.png"');
    });

    test('includes image alt attribute with product name', () => {
        expect(buildProductCard(product)).toContain('alt="Placa de EPS T1"');
    });

    test('includes data-id attribute with product id', () => {
        expect(buildProductCard(product)).toContain('data-id="placa-eps-t1"');
    });

    test('has product-card class', () => {
        expect(buildProductCard(product)).toContain('product-card');
    });

    test('has btn-details button', () => {
        expect(buildProductCard(product)).toContain('btn-details');
    });

    test('returns a string', () => {
        expect(typeof buildProductCard(product)).toBe('string');
    });
});


describe('buildModalContent', () => {
    const product = mockProducts[0];

    test('includes product name in h2 tag', () => {
        expect(buildModalContent(product)).toContain('<h2>Placa de EPS T1</h2>');
    });

    test('includes all specification titles', () => {
        const html = buildModalContent(product);
        expect(html).toContain('Densidade');
        expect(html).toContain('Espessura');
    });

    test('includes all specification values', () => {
        const html = buildModalContent(product);
        expect(html).toContain('T1');
        expect(html).toContain('50mm');
    });

    test('renders correct number of list items', () => {
        const html = buildModalContent(product);
        const count = (html.match(/<li>/g) || []).length;
        expect(count).toBe(product.especificacoes.length);
    });

    test('includes image with correct alt', () => {
        expect(buildModalContent(product)).toContain('alt="Placa de EPS T1"');
    });

    test('includes solicitar orçamento link', () => {
        expect(buildModalContent(product)).toContain('Solicitar Orçamento');
    });

    test('returns a string', () => {
        expect(typeof buildModalContent(product)).toBe('string');
    });
});


describe('buildFilterButtons', () => {
    const categories = ['Todos', 'Placas EPS', 'Insumos para Instalação'];

    test('creates one button per category', () => {
        const html = buildFilterButtons(categories);
        const count = (html.match(/class="filter-btn/g) || []).length;
        expect(count).toBe(3);
    });

    test('"Todos" button has "active" class', () => {
        const html = buildFilterButtons(categories);
        expect(html).toContain('filter-btn active');
    });

    test('non-"Todos" buttons do not have "active" class', () => {
        const html = buildFilterButtons(categories);
        // Split buttons and find the Placas EPS one
        const parts = html.split('</button>');
        const placasBtn = parts.find(b => b.includes('Placas EPS'));
        expect(placasBtn).not.toContain('active');
    });

    test('each button has correct data-category attribute', () => {
        const html = buildFilterButtons(categories);
        expect(html).toContain('data-category="Todos"');
        expect(html).toContain('data-category="Placas EPS"');
        expect(html).toContain('data-category="Insumos para Instalação"');
    });

    test('returns empty string for empty categories', () => {
        expect(buildFilterButtons([])).toBe('');
    });

    test('only one button has active class even with many categories', () => {
        const manyCats = ['Todos', 'A', 'B', 'C', 'D'];
        const html = buildFilterButtons(manyCats);
        const activeCount = (html.match(/filter-btn active/g) || []).length;
        expect(activeCount).toBe(1);
    });
});
