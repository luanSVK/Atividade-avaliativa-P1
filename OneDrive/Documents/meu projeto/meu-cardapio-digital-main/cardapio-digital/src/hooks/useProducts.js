// src/hooks/useProducts.js
import { useEffect, useState, useCallback } from 'react';
import { getProducts, getProductById } from '../data/api';

export function useProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // ALTERAÇÃO: Função de busca que suporta pesquisa por nome ou ID
  // Motivo: Permitir filtrar produtos tanto por nome quanto por ID
  const search = useCallback(async (term = '') => {
    try {
      setLoading(true);
      setError('');
      
      if (!term.trim()) {
        // Se não há termo de busca, carrega todos os produtos
        const data = await getProducts();
        setItems(data);
      } else {
        // Verifica se o termo é um número (possível ID)
        const isNumeric = /^\d+$/.test(term.trim());
        
        if (isNumeric) {
          // Tenta buscar por ID específico
          try {
            const product = await getProductById(parseInt(term));
            setItems([product]);
          } catch (idError) {
            // Se não encontrar por ID, busca por nome
            const data = await getProducts(term);
            setItems(data);
          }
        } else {
          // Busca por nome
          const data = await getProducts(term);
          setItems(data);
        }
      }
    } catch (e) {
      setError(e.message || 'Falha ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, []);

  const load = useCallback(async () => {
    await search(searchTerm);
  }, [search, searchTerm]);

  useEffect(() => {
    load();
  }, [load]);

  // ALTERAÇÃO: Retorna também as funções de pesquisa
  // Motivo: Permitir controle da pesquisa a partir do componente
  return { 
    items, 
    loading, 
    error, 
    reload: load, 
    search,
    searchTerm,
    setSearchTerm
  };
}
