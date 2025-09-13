// src/data/api.js
import { API_URL } from './config';

async function fetchWithTimeout(resource, { timeout = 8000, ...options } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(resource, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function getProducts(searchTerm = '') {
  try {
    // ALTERAÇÃO: Adicionado parâmetro de pesquisa para filtrar produtos
    // Motivo: Permitir buscar produtos por nome ou ID através da API
    let url = `${API_URL}/products`;
    if (searchTerm.trim()) {
      url += `?search=${encodeURIComponent(searchTerm)}`;
    }
    
    const res = await fetchWithTimeout(url, { timeout: 8000 });
    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json?.success) {
      const msg = json?.message || `Erro HTTP ${res.status}`;
      throw new Error(msg);
    }

    return json.data; // array de produtos
  } catch (err) {
    console.error('[getProducts] Falha ao buscar produtos:', err);
    throw err.name === 'AbortError'
      ? new Error('Tempo de conexão excedido. Verifique a rede/URL da API.')
      : err;
  }
}

// ALTERAÇÃO: Nova função para buscar produto por ID específico
// Motivo: Permitir pesquisa direta por ID do produto
export async function getProductById(id) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/products/${id}`, { timeout: 8000 });
    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json?.success) {
      const msg = json?.message || `Erro HTTP ${res.status}`;
      throw new Error(msg);
    }

    return json.data; // produto específico
  } catch (err) {
    console.error('[getProductById] Falha ao buscar produto:', err);
    throw err.name === 'AbortError'
      ? new Error('Tempo de conexão excedido. Verifique a rede/URL da API.')
      : err;
  }
}
