export type Portfolio = {
  id: number;
  user_id: number;
  username: string;
  title: string;
  bio: string | null;
  avatar_path: string | null;
  created_at: Date;
  updated_at: Date;
};
