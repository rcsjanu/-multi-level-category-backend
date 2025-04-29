import { Request, Response } from 'express';
import Category from '../models/Category';
import mongoose from 'mongoose';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parent, status } = req.body;
    const category = new Category({ name, parent, status });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    const categoryMap: any = {};

    categories.forEach((cat) => {
      categoryMap[String(cat._id)] = { ...cat.toObject(), children: [] };
    });

    const tree = [];
    categories.forEach((cat) => {
      if (cat.parent) {
        categoryMap[String(cat.parent)]?.children.push(categoryMap[String(cat._id)]);
      } else {
        tree.push(categoryMap[String(cat._id)]);
      }
    });

    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, status } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category)  res.status(404).json({ message: 'Category not found' });

    if (name) category.name = name;
    if (status && status !== category.status) {
      category.status = status;
      if (status === 'inactive') {
        await deactivateSubcategories(category._id as mongoose.Types.ObjectId);
      }
    }

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deactivateSubcategories = async (parentId: mongoose.Types.ObjectId) => {
  const subcategories = await Category.find({ parent: parentId });
  for (const sub of subcategories) {
    sub.status = 'inactive';
    await sub.save();
    await deactivateSubcategories(sub._id as mongoose.Types.ObjectId); // Recursive
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)  res.status(404).json({ message: 'Category not found' });

    // Reassign subcategories to parent
    await Category.updateMany(
      { parent: category._id },
      { parent: category.parent ? category.parent : null }
    );

    await category.deleteOne();
    res.json({ message: 'Category deleted and subcategories reassigned' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
