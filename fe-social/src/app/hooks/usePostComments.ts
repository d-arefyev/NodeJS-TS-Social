import { useState, useEffect } from "react";
import { $api } from "../api/api";

// Интерфейсы
interface CommentLike {
  userId: string;
  createdAt: string;
}

interface Comment {
  _id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  likesCount: number;
  likes: CommentLike[];
  user_name?: string;
  profile_image?: string;
}

interface StoredUserProfile {
  _id: string;
}

const usePostComments = (postId: string, storedUserProfile: StoredUserProfile | null) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [likesCount, setLikesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;
      try {
        const response = await $api.get(`/comment/${postId}`);
        const commentsData = response.data;

        const updatedComments = await Promise.all(
          commentsData.map(async (comment: Comment) => {
            if (!comment.user_name || !comment.profile_image) {
              const userResponse = await $api.get(`/user/${comment.user_id}`);
              comment.user_name = userResponse.data.user_name;
              comment.profile_image = userResponse.data.profile_image;
            }
            return comment;
          })
        );

        setComments(updatedComments);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await $api.post(`/comment/${postId}`, {
        userId: storedUserProfile?._id,
        comment_text: newComment,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    }
  };

  const handlePostLikeChangeRequest = async () => {
    if (!postId || !storedUserProfile?._id) {
      console.error("ID поста или пользователя отсутствуют");
      return;
    }

    try {
      const response = await $api.post(`/like-post/${postId}`, {
        userId: storedUserProfile._id,
      });

      if (typeof response.data.likes_count === "number") {
        setLikesCount(response.data.likes_count);
      } else {
        console.error(
          "Некорректный формат likes_count:",
          response.data.likes_count
        );
      }
    } catch (error) {
      console.error("Ошибка при изменении лайков поста:", error);
    }
  };

  const handleCommentLikeChange = async (commentId: string) => {
    if (!postId || !commentId || !storedUserProfile?._id) {
      console.error("ID поста, комментария или пользователя отсутствуют");
      return;
    }

    const comment = comments.find((c) => c._id === commentId);
    if (!comment) {
      console.error("Комментарий не найден");
      return;
    }

    const isLikedByUser = comment.likes.some(
      (like) => like.userId === storedUserProfile._id
    );

    try {
      let response;

      if (isLikedByUser) {
        response = await $api.delete(
          `/comment-likes/post/${postId}/comment/${commentId}`,
          {
            data: { userId: storedUserProfile._id },
          }
        );
      } else {
        response = await $api.post(
          `/comment-likes/post/${postId}/comment/${commentId}`,
          {
            userId: storedUserProfile._id,
          }
        );
      }

      if (typeof response.data.likes_count !== "number") {
        console.error("Неверный формат данных от сервера:", response.data);
        return;
      }

      setComments((prevComments) =>
        prevComments.map((c) =>
          c._id === commentId
            ? {
                ...c,
                likesCount: response.data.likes_count,
                likes: isLikedByUser
                  ? c.likes.filter((like) => like.userId !== storedUserProfile._id)
                  : [
                      ...c.likes,
                      { userId: storedUserProfile._id, createdAt: new Date().toISOString() },
                    ],
              }
            : c
        )
      );
    } catch (error) {
      console.error("Ошибка при изменении лайков комментария:", error);
    }
  };

  return {
    comments,
    newComment,
    setNewComment,
    likesCount,
    isLoading,
    handleAddComment,
    handlePostLikeChangeRequest,
    handleCommentLikeChange,
  };
};

export default usePostComments;
