const products = require('../products.json');

const REQUIRED_FIELDS = ['id', 'nome', 'categoria', 'descricao_curta', 'imagem_url', 'especificacoes'];

describe('products.json — top-level structure', () => {
    test('is a non-empty array', () => {
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
    });

    test('all product ids are unique', () => {
        const ids = products.map(p => p.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('products.json — required fields', () => {
    test.each(REQUIRED_FIELDS)('every product has the "%s" field', (field) => {
        products.forEach(product => {
            expect(product).toHaveProperty(field);
            expect(product[field]).not.toBeNull();
            expect(product[field]).not.toBeUndefined();
        });
    });
});

describe('products.json — field types and values', () => {
    test('every id is a non-empty string', () => {
        products.forEach(p => {
            expect(typeof p.id).toBe('string');
            expect(p.id.trim().length).toBeGreaterThan(0);
        });
    });

    test('every nome is a non-empty string', () => {
        products.forEach(p => {
            expect(typeof p.nome).toBe('string');
            expect(p.nome.trim().length).toBeGreaterThan(0);
        });
    });

    test('every categoria is a non-empty string', () => {
        products.forEach(p => {
            expect(typeof p.categoria).toBe('string');
            expect(p.categoria.trim().length).toBeGreaterThan(0);
        });
    });

    test('every descricao_curta is a non-empty string', () => {
        products.forEach(p => {
            expect(typeof p.descricao_curta).toBe('string');
            expect(p.descricao_curta.trim().length).toBeGreaterThan(0);
        });
    });

    test('every imagem_url is a non-empty string', () => {
        products.forEach(p => {
            expect(typeof p.imagem_url).toBe('string');
            expect(p.imagem_url.trim().length).toBeGreaterThan(0);
        });
    });

    test('every especificacoes is a non-empty array', () => {
        products.forEach(p => {
            expect(Array.isArray(p.especificacoes)).toBe(true);
            expect(p.especificacoes.length).toBeGreaterThan(0);
        });
    });

    test('every especificacao entry has titulo and valor as non-empty strings', () => {
        products.forEach(p => {
            p.especificacoes.forEach(spec => {
                expect(typeof spec.titulo).toBe('string');
                expect(spec.titulo.trim().length).toBeGreaterThan(0);
                expect(typeof spec.valor).toBe('string');
                expect(spec.valor.trim().length).toBeGreaterThan(0);
            });
        });
    });
});

describe('products.json — data integrity', () => {
    test('no product has an id that is just whitespace', () => {
        products.forEach(p => {
            expect(p.id.trim()).not.toBe('');
        });
    });

    test('ids contain only url-safe characters', () => {
        products.forEach(p => {
            // ids should be slug-style: lowercase letters, digits, hyphens
            expect(p.id).toMatch(/^[a-z0-9-]+$/);
        });
    });

    test('imagem_url paths start with "images/"', () => {
        products.forEach(p => {
            expect(p.imagem_url.startsWith('images/')).toBe(true);
        });
    });
});
