import api from './api.js';

export const categoryAPI = {
  getAll: async () => {
    try {
      const { data } = await api.get('/categories');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener categorías');
    }
  },
  create: async (categoryData) => {
    try {
      const { data } = await api.post('/categories', categoryData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear la categoría');
    }
  },
  update: async (id, categoryData) => {
    try {
      const { data } = await api.put(`/categories/${id}`, categoryData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar la categoría');
    }
  },
  delete: async (id) => {
    try {
      const { data } = await api.delete(`/categories/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar la categoría');
    }
  }
};
