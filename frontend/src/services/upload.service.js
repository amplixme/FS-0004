import api from './api.js';

export const uploadAPI = {
  uploadImage: async (file, onProgress) => {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    });
    return data.url;
  }
};
