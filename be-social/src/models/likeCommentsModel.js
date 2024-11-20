import mongoose from "mongoose";

const likeCommentSchema = new mongoose.Schema({
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

likeCommentSchema.index({ comment_id: 1, user_id: 1 }, { unique: true });

const LikeCommentModel = mongoose.model("LikeComment", likeCommentSchema);
export default LikeCommentModel;
