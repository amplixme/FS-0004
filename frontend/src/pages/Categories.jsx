import { useState, useEffect } from 'react';
import { categoryAPI } from '../services/category.service';
import ConfirmModal from '../components/common/ConfirmModal';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, categoryId: null });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryAPI.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(generateSlug(newName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !slug) return;

    try {
      if (editingId) {
        await categoryAPI.update(editingId, { name, slug });
      } else {
        await categoryAPI.create({ name, slug });
      }
      setName('');
      setSlug('');
      setEditingId(null);
      setError(null);
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Error al guardar la categoría');
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setSlug(category.slug);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setSlug('');
  };

  const confirmDelete = async () => {
    if (!deleteModal.categoryId) return;
    
    try {
      await categoryAPI.delete(deleteModal.categoryId);
      setDeleteModal({ isOpen: false, categoryId: null });
      setError(null);
      fetchCategories();
    } catch (err) {
      setDeleteModal({ isOpen: false, categoryId: null });
      if (err.message && err.message.includes('No se puede eliminar una categoría con posts asociados')) {
         setError('No se puede eliminar una categoría con posts asociados');
      } else {
         setError(err.message || 'Error al eliminar la categoría');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Gestión de Categorías</h1>
      
      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onRetry={() => setError(null)} />
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
            <input
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Programación"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 border rounded-lg hover:bg-slate-50 flex-1 sm:flex-none"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex-1 sm:flex-none"
            >
              {editingId ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center"><Spinner /></div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No hay categorías.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 font-medium text-slate-600">Nombre</th>
                <th className="px-6 py-4 font-medium text-slate-600">Slug</th>
                <th className="px-6 py-4 font-medium text-slate-600 w-32">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4">{cat.name}</td>
                  <td className="px-6 py-4 text-slate-500">{cat.slug}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, categoryId: cat.id })}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Eliminar Categoría"
        message="¿Estás seguro de que deseas eliminar esta categoría? Si tiene posts asociados, no podrás eliminarla."
        onCancel={() => setDeleteModal({ isOpen: false, categoryId: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Categories;
