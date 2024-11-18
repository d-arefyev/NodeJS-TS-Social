import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profile_image: { type: String, required: true },  // Исправлено на 'required'
  image_url: { type: String, required: true },
  user_name: { type: String, required: true },
  caption: { type: String, default: '' },
  likes_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },  // Используйте это поле, если оно вам нужно, или просто полагаетесь на `timestamps`
}, { timestamps: true });  // Использование timestamps автоматически добавляет поля createdAt и updatedAt

// Опционально можно добавить индексы для оптимизации поиска
postSchema.index({ user_id: 1 });
postSchema.index({ likes_count: -1 });
postSchema.index({ comments_count: -1 });

const Post = mongoose.model('Post', postSchema);
export default Post;



// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   profile_image: { type: String, require: true },
//   image_url: { type: String, required: true },
//   user_name: { type: String, required: true },
//   caption: { type: String, default: '' },
//   likes_count: { type: Number, default: 0 },
//   comments_count: { type: Number, default: 0 },
//   created_at: { type: Date, default: Date.now }
// });

// const Post = mongoose.model('Post', postSchema);
// export default Post;