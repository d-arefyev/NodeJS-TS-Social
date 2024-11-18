import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Like', likeSchema);



// import mongoose from 'mongoose';

// const likeSchema = new mongoose.Schema({
//   post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   created_at: { type: Date, default: Date.now }
// });

// const Like = mongoose.model('Like', likeSchema);
// export default Like;