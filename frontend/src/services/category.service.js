import api from './api';

export const categoryAPI = {
  getAll: async () => {
    const { data } = await api.get('/categories');
    return data;
  }
};
