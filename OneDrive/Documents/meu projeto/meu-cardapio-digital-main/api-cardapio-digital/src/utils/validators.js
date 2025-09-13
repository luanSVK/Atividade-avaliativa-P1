export const isPositiveInt = (value) =>
    Number.isInteger(value) && value > 0;
  
  export const normalizeSku = (sku) =>
    String(sku || '').trim().toUpperCase();
  
export const validateNewProductPayload = (body) => {
  const errors = [];

  // ALTERAÇÃO: Removido a obrigatoriedade do ID no payload
  // Motivo: O ID agora será gerado automaticamente (auto increment)
  if (body.id !== undefined) errors.push('id não deve ser informado no payload (será gerado automaticamente).');

  if (!body.name || String(body.name).trim().length === 0) errors.push('name é obrigatório.');
  if (body.price === undefined || isNaN(Number(body.price))) errors.push('price é obrigatório e deve ser numérico.');
  if (!body.sku || String(body.sku).trim().length === 0) errors.push('sku é obrigatório.');

  return errors;
};  export const validateUpdateProductPayload = (body) => {
    const errors = [];
    if (body.id !== undefined) errors.push('id não pode ser alterado.');
    if (body.price !== undefined && isNaN(Number(body.price))) errors.push('price deve ser numérico.');
    return errors;
  };
  