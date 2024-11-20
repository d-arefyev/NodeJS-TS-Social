// для ModalPost

export interface Comment {
  _id: string;            // Уникальный идентификатор комментария
  comment_text: string;   // Текст комментария
  profile_image?: string; // Профильное изображение (необязательное поле)
  created_at: string;     // Время создания комментария
  likesCount: number;     // Количество лайков
}
