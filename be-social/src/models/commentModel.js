import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Индекс для быстрого поиска по post_id
commentSchema.index({ post_id: 1 });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;



// import mongoose from 'mongoose';

// const commentSchema = new mongoose.Schema({
//   post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   comment_text: { type: String, required: true },
//   created_at: { type: Date, default: Date.now }
// });

// const Comment = mongoose.model('Comment', commentSchema);
// export default Comment;