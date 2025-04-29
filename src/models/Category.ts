import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  status: 'active' | 'inactive';
  parent?: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
