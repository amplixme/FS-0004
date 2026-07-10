import {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory
} from '../services/category.service.js';

export async function list(req, res, next) {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const { name } = req.body;
    const category = await createCategory({ name });
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: { message: 'Categoría no encontrada' } });
    }

    const updated = await updateCategory(id, { name });
    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;

    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: { message: 'Categoría no encontrada' } });
    }

    if (category._count.posts > 0) {
      return res.status(409).json({ error: { message: 'No se puede eliminar una categoría con posts asociados' } });
    }

    await deleteCategory(id);
    return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
}
